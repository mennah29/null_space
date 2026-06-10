// ═══════════════════════════════════════════════════════════════════
// SBME Course Tree — Main Application
// ═══════════════════════════════════════════════════════════════════

import {
    COURSES, PREREQUISITES, CATEGORIES, SEMESTERS,
    getCourseById, getPrerequisitesOf, getDependentsOf,
    getAllAncestors, getAllDescendants
} from './courseData.js';

// ── State ──
let cy = null;
let passedCourses = new Set();
let panicMode = false;
let selectedCourse = null;

// ── Persistence ──
function saveState() {
    localStorage.setItem('sbme_passed', JSON.stringify([...passedCourses]));
}
function loadState() {
    try {
        const saved = localStorage.getItem('sbme_passed');
        if (saved) passedCourses = new Set(JSON.parse(saved));
    } catch (e) { /* ignore */ }
}

// ── Landing page particles ──
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, particles = [];

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 60; i++) {
        particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 2 + 0.5,
            dx: (Math.random() - 0.5) * 0.4,
            dy: (Math.random() - 0.5) * 0.4,
            opacity: Math.random() * 0.5 + 0.1
        });
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);
        for (const p of particles) {
            p.x += p.dx; p.y += p.dy;
            if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
            if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 229, 204, ${p.opacity})`;
            ctx.fill();
        }
        // Connect nearby particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 229, 204, ${0.06 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(draw);
    }
    draw();
}

// ── Navigation ──
window.enterApp = function () {
    const landing = document.getElementById('landing');
    const app = document.getElementById('app');
    landing.classList.add('exit');
    setTimeout(() => {
        landing.style.display = 'none';
        app.classList.remove('hidden');
        app.classList.add('entering');
        if (!cy) initGraph();
        setTimeout(() => app.classList.remove('entering'), 600);
    }, 700);
};

window.goBack = function () {
    const landing = document.getElementById('landing');
    const app = document.getElementById('app');
    app.classList.add('hidden');
    landing.style.display = '';
    landing.classList.remove('exit');
};

// Swap Groups feature removed

// ── Panic Mode ──
window.togglePanicMode = function () {
    panicMode = !panicMode;
    const btn = document.getElementById('panicBtn');
    btn.classList.toggle('active', panicMode);
    if (!panicMode) {
        clearHighlights();
        applyPassedStyles();
    }
};

// ── Reset ──
window.resetAll = function () {
    passedCourses.clear();
    saveState();
    clearHighlights();
    applyPassedStyles();
    updateCourseInfo(null);
};

// ── Modal ──
window.closeModal = function () {
    document.getElementById('warningModal').classList.remove('show');
};

function showWarning(courseId, missingPrereqs) {
    const names = missingPrereqs.map(id => {
        const c = getCourseById(id);
        return c ? `${c.id} — ${c.name}` : id;
    }).join('<br>• ');
    document.getElementById('modalBody').innerHTML =
        `You must complete the following courses first:<br><br>• ${names}`;
    document.getElementById('warningModal').classList.add('show');
}

// ── Sidebar toggle ──
window.toggleSidebar = function () {
    document.getElementById('sidebar').classList.toggle('collapsed');
};

// ═══════════ COURSE POSITIONS ═══════════

function getEffectiveSemester(course) {
    return course.semester;
}

function getSemesterOrder() {
    return [1, 2, 3, 4, 'summer1', 5, 6, 'summer2', 7, 8];
}

function computePositions() {
    const semOrder = getSemesterOrder();
    const semGroups = {};

    for (const sem of semOrder) {
        semGroups[sem] = [];
    }

    for (const course of COURSES) {
        const effSem = getEffectiveSemester(course);
        if (semGroups[effSem]) {
            semGroups[effSem].push(course);
        }
    }

    const nodes = [];
    const ROW_GAP = 180;
    const COL_GAP = 200;

    for (let row = 0; row < semOrder.length; row++) {
        const sem = semOrder[row];
        const courses = semGroups[sem];
        const totalWidth = (courses.length - 1) * COL_GAP;
        const startX = -totalWidth / 2;

        for (let col = 0; col < courses.length; col++) {
            const c = courses[col];
            nodes.push({
                data: {
                    id: c.id,
                    label: `${c.id}\n${c.name}`,
                    code: c.id,
                    name: c.name,
                    ch: c.ch,
                    category: c.category,
                    semester: getEffectiveSemester(c),
                    semLabel: SEMESTERS.find(s => s.id === getEffectiveSemester(c))?.label || '',
                },
                position: {
                    x: startX + col * COL_GAP,
                    y: row * ROW_GAP + 80,
                },
            });
        }
    }

    return nodes;
}

// ═══════════ CYTOSCAPE INIT ═══════════

function initGraph() {
    const nodes = computePositions();
    const edges = PREREQUISITES.map(e => ({
        data: { id: `${e.from}->${e.to}`, source: e.from, target: e.to }
    }));

    cy = cytoscape({
        container: document.getElementById('cy'),
        elements: { nodes, edges },
        layout: { name: 'preset' },
        userZoomingEnabled: true,
        userPanningEnabled: true,
        minZoom: 0.25,
        maxZoom: 2.5,
        wheelSensitivity: 0.15,
        style: getCyStyle(),
    });

    // Event handlers
    cy.on('tap', 'node', onNodeClick);
    cy.on('dbltap', 'node', onNodeDoubleClick);
    cy.on('tap', evt => {
        if (evt.target === cy) {
            clearHighlights();
            applyPassedStyles();
            updateCourseInfo(null);
        }
    });

    // Apply initial state
    applyPassedStyles();

    // Fit view
    cy.fit(undefined, 60);
}

function rebuildGraph() {
    if (!cy) return;
    const nodes = computePositions();
    cy.nodes().forEach(node => {
        const match = nodes.find(n => n.data.id === node.id());
        if (match) {
            node.position(match.position);
            node.data('semester', match.data.semester);
            node.data('semLabel', match.data.semLabel);
        }
    });
    cy.fit(undefined, 60);
}

function getCyStyle() {
    return [
        // ── Default node ──
        {
            selector: 'node',
            style: {
                'label': 'data(label)',
                'text-wrap': 'wrap',
                'text-max-width': '140px',
                'text-valign': 'center',
                'text-halign': 'center',
                'font-family': 'Inter, sans-serif',
                'font-size': '12px',
                'font-weight': '600',
                'color': '#0a1628',
                'width': '160px',
                'height': '65px',
                'shape': 'round-rectangle',
                'background-color': '#BBDEFB',
                'border-width': '2px',
                'border-color': 'rgba(0, 0, 0, 0.12)',
                'border-opacity': 1,
                'padding': '8px',
                'transition-property': 'background-color, border-color, border-width, opacity',
                'transition-duration': '0.3s',
            }
        },
        // Category-specific colors
        ...Object.entries(CATEGORIES).map(([cat, info]) => ({
            selector: `node[category="${cat}"]`,
            style: { 'background-color': info.color, 'border-color': info.darkColor }
        })),
        // ── Default edge ──
        {
            selector: 'edge',
            style: {
                'width': 2,
                'line-color': 'rgba(0, 229, 204, 0.25)',
                'target-arrow-color': 'rgba(0, 229, 204, 0.4)',
                'target-arrow-shape': 'triangle',
                'arrow-scale': 1,
                'curve-style': 'bezier',
                'line-opacity': 0.5,
                'transition-property': 'line-color, target-arrow-color, width, line-opacity',
                'transition-duration': '0.3s',
            }
        },
        // ── Highlight classes ──
        {
            selector: 'node.selected',
            style: {
                'background-color': '#448AFF',
                'border-color': '#1565C0',
                'border-width': '3px',
                'color': '#ffffff',
                'shadow-blur': 15,
                'shadow-color': 'rgba(68, 138, 255, 0.5)',
                'shadow-opacity': 1,
                'z-index': 10,
            }
        },
        {
            selector: 'node.ancestor',
            style: {
                'background-color': '#FFD93D',
                'border-color': '#F9A825',
                'border-width': '3px',
                'color': '#1a1a1a',
                'shadow-blur': 12,
                'shadow-color': 'rgba(255, 217, 61, 0.4)',
                'shadow-opacity': 1,
            }
        },
        {
            selector: 'node.descendant',
            style: {
                'background-color': '#FF6B6B',
                'border-color': '#C62828',
                'border-width': '3px',
                'color': '#ffffff',
                'shadow-blur': 12,
                'shadow-color': 'rgba(255, 107, 107, 0.4)',
                'shadow-opacity': 1,
            }
        },
        {
            selector: 'node.passed',
            style: {
                'background-color': '#69F0AE',
                'border-color': '#2E7D32',
                'border-width': '3px',
                'color': '#0a1628',
                'shadow-blur': 10,
                'shadow-color': 'rgba(105, 240, 174, 0.3)',
                'shadow-opacity': 1,
            }
        },
        {
            selector: 'node.panic-drop',
            style: {
                'background-color': '#FF6B6B',
                'border-color': '#B71C1C',
                'border-width': '3px',
                'color': '#ffffff',
                'shadow-blur': 18,
                'shadow-color': 'rgba(255, 107, 107, 0.6)',
                'shadow-opacity': 1,
            }
        },
        {
            selector: 'node.dimmed',
            style: {
                'opacity': 0.3,
            }
        },
        {
            selector: 'edge.highlighted-ancestor',
            style: {
                'line-color': '#FFD93D',
                'target-arrow-color': '#FFD93D',
                'width': 3,
                'line-opacity': 0.9,
                'z-index': 5,
            }
        },
        {
            selector: 'edge.highlighted-descendant',
            style: {
                'line-color': '#FF6B6B',
                'target-arrow-color': '#FF6B6B',
                'width': 3,
                'line-opacity': 0.9,
                'z-index': 5,
            }
        },
        {
            selector: 'edge.panic-edge',
            style: {
                'line-color': '#FF6B6B',
                'target-arrow-color': '#FF6B6B',
                'width': 3.5,
                'line-opacity': 1,
                'z-index': 5,
            }
        },
        {
            selector: 'edge.dimmed',
            style: {
                'opacity': 0.12,
            }
        },
    ];
}

// ═══════════ INTERACTIONS ═══════════

function onNodeClick(evt) {
    const nodeId = evt.target.id();

    if (panicMode) {
        runPanicSimulation(nodeId);
        return;
    }

    selectedCourse = nodeId;
    clearHighlights();

    const ancestors = getAllAncestors(nodeId);
    const descendants = getAllDescendants(nodeId);

    // Dim everything first
    cy.elements().addClass('dimmed');

    // Highlight selected
    const selectedNode = cy.getElementById(nodeId);
    selectedNode.removeClass('dimmed').addClass('selected');

    // Highlight ancestors (yellow)
    ancestors.forEach(id => {
        const n = cy.getElementById(id);
        n.removeClass('dimmed').addClass('ancestor');
    });

    // Highlight descendants (red)
    descendants.forEach(id => {
        const n = cy.getElementById(id);
        n.removeClass('dimmed').addClass('descendant');
    });

    // Highlight edges
    cy.edges().forEach(edge => {
        const src = edge.source().id();
        const tgt = edge.target().id();
        if ((ancestors.has(src) || src === nodeId) && (ancestors.has(tgt) || tgt === nodeId)) {
            edge.removeClass('dimmed').addClass('highlighted-ancestor');
        } else if ((descendants.has(src) || src === nodeId) && (descendants.has(tgt) || tgt === nodeId)) {
            edge.removeClass('dimmed').addClass('highlighted-descendant');
        }
    });

    // Re-apply passed styles on top
    passedCourses.forEach(id => {
        const n = cy.getElementById(id);
        if (!n.hasClass('selected') && !n.hasClass('ancestor') && !n.hasClass('descendant')) {
            n.removeClass('dimmed').addClass('passed');
        }
    });

    updateCourseInfo(nodeId);
}

function onNodeDoubleClick(evt) {
    const nodeId = evt.target.id();
    togglePassed(nodeId);
}

function togglePassed(courseId) {
    if (passedCourses.has(courseId)) {
        passedCourses.delete(courseId);
    } else {
        // Check prerequisites
        const prereqs = getPrerequisitesOf(courseId);
        const missing = prereqs.filter(id => !passedCourses.has(id));
        if (missing.length > 0) {
            showWarning(courseId, missing);
            return;
        }
        passedCourses.add(courseId);
    }
    saveState();
    clearHighlights();
    applyPassedStyles();
    if (selectedCourse) updateCourseInfo(selectedCourse);
}

function applyPassedStyles() {
    if (!cy) return;
    cy.nodes().forEach(node => {
        node.removeClass('passed');
        if (passedCourses.has(node.id())) {
            node.addClass('passed');
        }
    });
}

function clearHighlights() {
    if (!cy) return;
    cy.elements().removeClass('dimmed selected ancestor descendant highlighted-ancestor highlighted-descendant panic-drop panic-edge');
}

// ── Panic simulation ──
function runPanicSimulation(courseId) {
    clearHighlights();

    const descendants = getAllDescendants(courseId);
    const affected = new Set([courseId, ...descendants]);

    // Dim everything
    cy.elements().addClass('dimmed');

    // Highlight affected courses
    affected.forEach(id => {
        const n = cy.getElementById(id);
        n.removeClass('dimmed').addClass('panic-drop');
    });

    // Highlight affected edges
    cy.edges().forEach(edge => {
        const src = edge.source().id();
        const tgt = edge.target().id();
        if (affected.has(src) && affected.has(tgt)) {
            edge.removeClass('dimmed').addClass('panic-edge');
        }
    });

    // Show info
    const course = getCourseById(courseId);
    const infoEl = document.getElementById('courseInfo');
    const totalAffectedCH = [...descendants].reduce((sum, id) => {
        const c = getCourseById(id);
        return sum + (c ? c.ch : 0);
    }, course ? course.ch : 0);

    infoEl.innerHTML = `
    <div class="course-info__code" style="color: var(--red);">⚠️ PANIC SIMULATION</div>
    <div class="course-info__name">${course ? course.name : courseId}</div>
    <div class="course-info__meta">
      <span class="meta-tag" style="border-color: var(--red); color: var(--red);">
        ${affected.size} courses affected
      </span>
      <span class="meta-tag" style="border-color: var(--red); color: var(--red);">
        ${totalAffectedCH} CH at risk
      </span>
    </div>
    <p class="course-info__hint" style="color: var(--red); opacity: 0.8;">
      Dropping/failing this course would cascade and lock all highlighted courses in red.
    </p>
  `;
}

// Progress tracking removed as per user request

// ═══════════ COURSE INFO PANEL ═══════════

function updateCourseInfo(courseId) {
    const el = document.getElementById('courseInfo');

    if (!courseId) {
        el.innerHTML = `
      <h3 class="course-info__title">Select a Course</h3>
      <p class="course-info__hint">Click any course node to view details, prerequisites, and dependents.</p>
    `;
        return;
    }

    const course = getCourseById(courseId);
    if (!course) return;

    const catInfo = CATEGORIES[course.category];
    const prereqs = getPrerequisitesOf(courseId);
    const dependents = getDependentsOf(courseId);
    const isPassed = passedCourses.has(courseId);
    const semLabel = SEMESTERS.find(s => s.id === getEffectiveSemester(course))?.label || '';

    el.innerHTML = `
    <div class="course-info__code">${course.id}</div>
    <div class="course-info__name">${course.name}</div>
    <div class="course-info__meta">
      <span class="meta-tag">
        <span class="meta-dot" style="background: ${catInfo.color}"></span>
        ${catInfo.label}
      </span>
      <span class="meta-tag">${course.ch} CH</span>
      <span class="meta-tag">${semLabel}</span>
    </div>
    <button class="dismiss-btn" style="width: 100%; text-align: center; margin-top: 0.5rem; 
      ${isPassed ? 'background: rgba(105,240,174,0.15); color: #69F0AE; border-color: rgba(105,240,174,0.3);' : ''}"
      onclick="window.__togglePassed('${courseId}')">
      ${isPassed ? '✅ Passed — Click to Undo' : '☐ Mark as Passed'}
    </button>
    ${prereqs.length > 0 ? `
      <div class="course-info__section">
        <div class="course-info__section-title">Prerequisites</div>
        <ul class="course-info__list prereq-list">
          ${prereqs.map(id => {
        const c = getCourseById(id);
        const check = passedCourses.has(id) ? '✅' : '⬜';
        return `<li>${check} ${id} — ${c ? c.name : '?'}</li>`;
    }).join('')}
        </ul>
      </div>
    ` : ''}
    ${dependents.length > 0 ? `
      <div class="course-info__section">
        <div class="course-info__section-title">Unlocks</div>
        <ul class="course-info__list dependent-list">
          ${dependents.map(id => {
        const c = getCourseById(id);
        return `<li>${id} — ${c ? c.name : '?'}</li>`;
    }).join('')}
        </ul>
      </div>
    ` : ''}
  `;
}

window.__togglePassed = togglePassed;

// ═══════════ SWAP UI INIT ═══════════
// Removed

// ═══════════ BOOT ═══════════

document.addEventListener('DOMContentLoaded', () => {
    loadState();
    initParticles();
});
