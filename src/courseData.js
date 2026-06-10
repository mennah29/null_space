export const CATEGORIES = {
  BS: { label: 'Basic Science', color: '#64B5F6', darkColor: '#1565C0' },
  UR: { label: 'University Requirement', color: '#CE93D8', darkColor: '#7B1FA2' },
  FR: { label: 'Faculty Requirement', color: '#B0BEC5', darkColor: '#546E7A' }, // Grey in PDF
  DR: { label: 'Discipline Requirement', color: '#FFCC80', darkColor: '#E65100' }, // Orange in PDF
  PR: { label: 'Program Requirement', color: '#A5D6A7', darkColor: '#2E7D32' },  // Green in PDF
  EL: { label: 'Elective', color: '#FFF59D', darkColor: '#F9A825' }, // Yellow in PDF
};

export const SEMESTERS = [
  { id: 1, label: 'Preparatory Fall', short: 'Prep Sem 1' },
  { id: 2, label: 'Preparatory Spring', short: 'Prep Sem 2' },
  { id: 3, label: '1st Year Fall', short: '1st Yr Sem 1' },
  { id: 4, label: '1st Year Spring', short: '1st Yr Sem 2' },
  { id: 'summer1', label: '1st Year Summer', short: '1st Yr Sum' },
  { id: 5, label: '2nd Year Fall', short: '2nd Yr Sem 1' },
  { id: 6, label: '2nd Year Spring', short: '2nd Yr Sem 2' },
  { id: 'summer2', label: '2nd Year Summer', short: '2nd Yr Sum' },
  { id: 7, label: '3rd Year Fall', short: '3rd Yr Sem 1' },
  { id: 8, label: '3rd Year Spring', short: '3rd Yr Sem 2' },
];

export const COURSES = [
  // ────────── Preparatory Fall ──────────
  { id: 'GENG001', name: 'Critical & Creative Thinking', ch: 2, semester: 1, category: 'UR' },
  { id: 'MTHG002', name: 'Calculus 1', ch: 3, semester: 1, category: 'BS' },
  { id: 'PHYG001', name: 'Mechanical properties of Matter, Waves and Thermodynamics', ch: 3, semester: 1, category: 'BS' },
  { id: 'EMCG001', name: 'Engineering Mechanics Statics', ch: 3, semester: 1, category: 'FR' },
  { id: 'INTG005', name: 'Introduction to Computer Science', ch: 3, semester: 1, category: 'FR' },
  { id: 'MTHG001', name: 'Algebra', ch: 2, semester: 1, category: 'BS' },
  { id: 'INTG001', name: 'Technical Drawing', ch: 2, semester: 1, category: 'FR' },

  // ────────── Preparatory Spring ──────────
  { id: 'GENG002', name: 'Societal Issues', ch: 2, semester: 2, category: 'UR' },
  { id: 'MTHG003', name: 'Calculus 2', ch: 3, semester: 2, category: 'BS' },
  { id: 'PHYG002', name: 'Electricity and Magnetism', ch: 3, semester: 2, category: 'BS' },
  { id: 'EMCG002', name: 'Engineering Mechanics Dynamics', ch: 3, semester: 2, category: 'FR' },
  { id: 'ENGG001', name: 'Applied and Modern Manufacturing Engineering', ch: 2, semester: 2, category: 'FR' },
  { id: 'EECG102', name: 'Intro to Computer Architecture', ch: 3, semester: 2, category: 'DR' }, // In PDF it looks orangeish/brown DR
  { id: 'CHEG001', name: 'Chemistry for Engineers', ch: 3, semester: 2, category: 'FR' },

  // ────────── 1st Year Fall ──────────
  { id: 'GENG111', name: '(UR1) Selected Topics 1', ch: 2, semester: 3, category: 'UR' },
  { id: 'MTHG102', name: 'Linear Algebra and Multivariable Integrals', ch: 3, semester: 3, category: 'BS' },
  { id: 'EECG101', name: 'Electrical Circuits', ch: 3, semester: 3, category: 'DR' },
  { id: 'SBEG107', name: 'Programming Principles', ch: 3, semester: 3, category: 'DR' },
  { id: 'SBEG101', name: 'Medical Physics', ch: 3, semester: 3, category: 'DR' },
  { id: 'SBEG103', name: 'Systems Physiology', ch: 3, semester: 3, category: 'DR' },
  { id: 'SBEG105', name: 'Intro to Imaging and Image-based Anatomy', ch: 2, semester: 3, category: 'DR' },

  // ────────── 1st Year Spring ──────────
  { id: 'MTHG103', name: 'Ordinary Differential Equations & Mathematical Transforms', ch: 3, semester: 4, category: 'BS' },
  { id: 'EECG103', name: 'Analog & Digital Electronics', ch: 3, semester: 4, category: 'DR' },
  { id: 'EPEG100', name: 'Introduction to Electrical Power and Machines Engineering', ch: 3, semester: 4, category: 'DR' },
  { id: 'SBEG102', name: 'Introduction to Medical Equipment', ch: 2, semester: 4, category: 'DR' },
  { id: 'SBEG104', name: 'Medical Data Structure', ch: 3, semester: 4, category: 'PR' },
  { id: 'SBEG106', name: 'Introduction to Biomechanics', ch: 3, semester: 4, category: 'DR' },
  { id: 'SBEG108', name: 'Numerical Methods in BME', ch: 3, semester: 4, category: 'PR' }, // Was DR before, but mostly Green/Orange in PDF. Let's say PR. Let's look closely... PDF shows green background. So PR.

  // ────────── 1st Year Summer ──────────
  { id: 'SBEG281', name: 'Industrial Training-1', ch: 1, semester: 'summer1', category: 'DR' },

  // ────────── 2nd Year Fall ──────────
  { id: 'GENG1XX', name: 'Restricted Elective-1', ch: 2, semester: 5, category: 'UR' },
  { id: 'MTHG202', name: 'Special Functions and Partial Diff Eqn.', ch: 2, semester: 5, category: 'BS' },
  { id: 'SBEG201', name: 'Biotransport', ch: 3, semester: 5, category: 'DR' },
  { id: 'SBEG203', name: 'Bio-Sensors', ch: 3, semester: 5, category: 'DR' },
  { id: 'SBEG207', name: 'Algorithms in Medical Applications', ch: 3, semester: 5, category: 'PR' },
  { id: 'SBEG209', name: 'Biostatistics', ch: 3, semester: 5, category: 'PR' },
  { id: 'SBEG205', name: 'Biological Signal Processing', ch: 3, semester: 5, category: 'PR' },

  // ────────── 2nd Year Spring ──────────
  { id: 'GENG2XX', name: 'Restricted Elective-2', ch: 2, semester: 6, category: 'UR' },
  { id: 'SBEG202', name: 'Clinical Engineering', ch: 3, semester: 6, category: 'PR' },
  { id: 'SBEG204', name: 'Bio-Measurements', ch: 3, semester: 6, category: 'DR' },
  { id: 'SBEG206', name: 'Biochemistry & Molecular Biology', ch: 3, semester: 6, category: 'FR' }, // Grey background in PDF
  { id: 'SBEG3XX_1', name: 'DISCIPLINE Elective-1', ch: 3, semester: 6, category: 'EL' },
  { id: 'SBEG3XX_2', name: 'DISCIPLINE Elective-2', ch: 3, semester: 6, category: 'EL' },
  { id: 'SBEG3XX_3', name: 'DISCIPLINE Elective-3', ch: 3, semester: 6, category: 'EL' },

  // ────────── 2nd Year Summer ──────────
  { id: 'SBEG282', name: 'Industrial Training-2', ch: 2, semester: 'summer2', category: 'DR' },

  // ────────── 3rd Year Fall ──────────
  { id: 'GENG2XX_FREE', name: 'Free Elective', ch: 2, semester: 7, category: 'UR' },
  { id: 'SBEG3XX_4', name: 'DISCIPLINE Elective-4', ch: 3, semester: 7, category: 'EL' },
  { id: 'SBEG3XX_5', name: 'DISCIPLINE Elective-5', ch: 3, semester: 7, category: 'EL' },
  { id: 'SBEG4XX_1', name: 'PROGRAM Elective-1', ch: 3, semester: 7, category: 'EL' },
  { id: 'SBEG4XX_2', name: 'PROGRAM Elective-2', ch: 3, semester: 7, category: 'EL' },
  { id: 'SBEG4XX_3', name: 'PROGRAM Elective-3', ch: 3, semester: 7, category: 'EL' },
  { id: 'SBEG481', name: 'Graduation Project 1', ch: 2, semester: 7, category: 'PR' },

  // ────────── 3rd Year Spring ──────────
  { id: 'GENG351', name: 'Selected Current Local Issues', ch: 1, semester: 8, category: 'UR' },
  { id: 'SBEG4XX_4', name: 'PROGRAM Elective-4', ch: 3, semester: 8, category: 'EL' },
  { id: 'SBEG4XX_5', name: 'PROGRAM Elective-5', ch: 3, semester: 8, category: 'EL' },
  { id: 'SBEG4XX_6', name: 'PROGRAM Elective-6', ch: 3, semester: 8, category: 'EL' },
  { id: 'SBEG4XX_7', name: 'PROGRAM Elective-7', ch: 3, semester: 8, category: 'EL' },
  { id: 'SBEG4XX_8', name: 'PROGRAM Elective-8', ch: 3, semester: 8, category: 'EL' },
  { id: 'SBEG482', name: 'Graduation Project 2', ch: 3, semester: 8, category: 'PR' },
];

export const PREREQUISITES = [
  // ── PREPARATORY ──
  { from: 'MTHG002', to: 'MTHG003' }, // Calc 1 -> Calc 2
  { from: 'PHYG001', to: 'PHYG002' }, // Mechanics -> E&M
  { from: 'EMCG001', to: 'EMCG002' }, // Statics -> Dynamics

  // ── 1ST YEAR ──
  { from: 'MTHG001', to: 'MTHG102' }, // Algebra -> Lin Alg
  { from: 'MTHG002', to: 'MTHG102' }, // Calc 1 -> Lin Alg
  { from: 'PHYG002', to: 'EECG101' }, // E&M -> Circuits
  { from: 'INTG005', to: 'SBEG107' }, // CS -> Prog Principles
  { from: 'PHYG002', to: 'SBEG101' }, // E&M -> Med Physics
  { from: 'CHEG001', to: 'SBEG103' }, // Chem -> Physiology
  { from: 'SBEG101', to: 'SBEG105' }, // Physics -> Imaging 

  { from: 'MTHG003', to: 'MTHG103' }, // Calc 2 -> ODE
  { from: 'MTHG102', to: 'MTHG103' }, // Lin Alg -> ODE
  { from: 'EECG101', to: 'EECG103' }, // Circuits -> Electronics
  { from: 'EECG101', to: 'EPEG100' }, // Circuits -> Power
  { from: 'PHYG002', to: 'EPEG100' }, // E&M -> Power
  { from: 'SBEG101', to: 'SBEG102' }, // Med Physics -> Med Equip
  { from: 'EECG101', to: 'SBEG102' }, // Circuits -> Med Equip
  { from: 'SBEG107', to: 'SBEG104' }, // Prog -> Data Structures
  { from: 'EMCG001', to: 'SBEG106' }, // Statics -> Biomechanics
  { from: 'SBEG103', to: 'SBEG106' }, // Physio -> Biomechanics
  { from: 'SBEG107', to: 'SBEG108' }, // Prog -> Numerical
  { from: 'MTHG102', to: 'SBEG108' }, // Lin Alg -> Numerical

  // ── SUMMER 1 ──
  { from: 'SBEG102', to: 'SBEG281' }, // Med Equip -> Training 1

  // ── 2ND YEAR ──
  { from: 'MTHG103', to: 'MTHG202' }, // ODE -> Special Funcs
  { from: 'MTHG103', to: 'SBEG201' }, // ODE -> Biotransport
  { from: 'SBEG103', to: 'SBEG201' }, // Physio -> Biotransport
  { from: 'PHYG001', to: 'SBEG201' }, // Mech prop -> Biotransport
  { from: 'SBEG103', to: 'SBEG203' }, // Physio -> Biosensors
  { from: 'EECG103', to: 'SBEG203' }, // Electronics -> Biosensors
  { from: 'CHEG001', to: 'SBEG203' }, // Chem -> Biosensors
  { from: 'SBEG104', to: 'SBEG207' }, // Data Structures -> Algorithms
  { from: 'MTHG001', to: 'SBEG209' }, // Algebra -> Biostats
  { from: 'INTG005', to: 'SBEG209' }, // CS -> Biostats
  { from: 'MTHG103', to: 'SBEG205' }, // ODE -> Signals
  { from: 'SBEG107', to: 'SBEG205' }, // Prog -> Signals

  { from: 'SBEG102', to: 'SBEG202' }, // Med Equip -> Clinical Eng
  { from: 'SBEG201', to: 'SBEG202' }, // Biotransport -> Clinical Eng
  { from: 'SBEG203', to: 'SBEG204' }, // Biosensors -> Bio-Measurements
  { from: 'CHEG001', to: 'SBEG206' }, // Chem -> Biochem
  { from: 'SBEG103', to: 'SBEG206' }, // Physio -> Biochem

  // ── SUMMER 2 ──
  { from: 'SBEG202', to: 'SBEG282' }, // Clinical Eng -> Training 2
  { from: 'SBEG204', to: 'SBEG282' }, // Bio-Meas -> Training 2

  // ── 3RD YEAR ──
  { from: 'SBEG282', to: 'SBEG481' }, // Training 2 -> Project 1
  { from: 'SBEG481', to: 'SBEG482' }, // Project 1 -> Project 2
];

export function getTotalRequiredCH() {
  return COURSES.reduce((sum, c) => sum + c.ch, 0);
}

export function getCourseById(id) {
  return COURSES.find(c => c.id === id);
}

export function getPrerequisitesOf(courseId) {
  return PREREQUISITES.filter(e => e.to === courseId).map(e => e.from);
}

export function getDependentsOf(courseId) {
  return PREREQUISITES.filter(e => e.from === courseId).map(e => e.to);
}

export function getAllAncestors(courseId, visited = new Set()) {
  const prereqs = getPrerequisitesOf(courseId);
  for (const pid of prereqs) {
    if (!visited.has(pid)) {
      visited.add(pid);
      getAllAncestors(pid, visited);
    }
  }
  return visited;
}

export function getAllDescendants(courseId, visited = new Set()) {
  const deps = getDependentsOf(courseId);
  for (const did of deps) {
    if (!visited.has(did)) {
      visited.add(did);
      getAllDescendants(did, visited);
    }
  }
  return visited;
}
