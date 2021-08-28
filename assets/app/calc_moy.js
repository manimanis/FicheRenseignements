const app = new Vue({
  el: '#vueapp',
  data: {
    classes: [],
    matieres: [],
    sections: [],
    mat_sect: new MatiereSectionCollection(),
    notes: [],
    idxNiveau: -1,
    total: 0,
    totalCoef: 0,
    totalMoy: 0,
    editMode: 'note'
  },
  mounted: function () {
    this.fetchMatieresSections();
  },
  methods: {
    /**
 * Télécharger toutes les données nécessaires pour la page
 * - Liste des matières
 * - Liste des sections
 * - Liste des matières/sections
 * @returns 
 */
    fetchMatieresSections: function () {
      return fetch('operations.php?cnt=classes&act=matieresSections')
        .then(response => response.json())
        .then(data => {
          if (data.status == 'ok') {
            this.matieres = data.data.matieres
              .map(mat => new Matiere(mat));
            this.sections = data.data.sections
              .map(sec => new Section(sec));
            this.mat_sect.addMany(data.data.matieres_sections
              .map(ms => new MatiereSection(ms))
            );
          }
        });
    },
    reclac: function () {
      const ms = this.mat_sect.mat_sec[this.idxNiveau];
      this.total = this.notes.reduce((pv, cv, idx) => pv + cv * ms[idx].coef, 0);
      this.totalCoef = ms.reduce((pv, cv) => pv + cv.coef, 0);
      this.totalMoy = (this.totalCoef == 0) ? 0 : (this.total / this.totalCoef);
    },
    onSelectNiveau: function (event) {
      this.idxNiveau = event.target.value;
      if (this.idxNiveau >= 0) {
        this.notes = this.mat_sect.mat_sec[this.idxNiveau].map((ms, idx) => (idx < this.notes.length) ? this.notes[idx] : 0);
        this.reclac();
      }
    },
    onBlurCoef: function (idx) {
      this.reclac();
    },
    onBlurNote: function (idx) {
      this.reclac();
    },
    onSelectEditMode: function (mode) {
      this.editMode = mode;
    }
  }
});