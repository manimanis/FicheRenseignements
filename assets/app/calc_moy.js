const app = new Vue({
  el: '#vueapp',
  data: {
    classes: [],
    matieres: [],
    sections: [],
    mat_sect: new MatiereSectionCollection(),
    notes: [],
    idxNiveau: -1,
    total: 0
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
    getMatieres: function (idxNS) {
      return 
    },
    onSelectNiveau: function (event) {
      this.idxNiveau = event.target.value;
      this.notes = this.mat_sect.mat_sec[this.idxNiveau].map((ms, idx) => (idx < this.notes.length) ? this.notes[idx] : 0);
    }
  }
});