const app = new Vue({
  el: '#vueapp',
  data: {
    classes: [],
    matieres: [],
    sections: [],
    matieres_sections: [],
    niveaux_sections: [],
    selectedMatiereSection: {}
  },
  mounted: function () {
    this.fetchClasses();
    this.fetchMatieresSections();
  },
  methods: {
    fetchClasses: function () {
      return fetch('operations.php?cnt=classes')
        .then(response => response.json())
        .then(data => {
          if (data.status == 'ok') {
            this.classes = data.data.classes;
          }
        });
    },
    fetchMatieresSections: function () {
      return fetch('operations.php?cnt=classes&act=matieresSections')
        .then(response => response.json())
        .then(data => {
          if (data.status == 'ok') {
            this.matieres = data.data.matieres
              .map(mat => {
                return {
                  id: +mat.id,
                  matiere: mat.matiere
                };
              });
            this.sections = data.data.sections
              .map(sec => {
                return {
                  id: +sec.id,
                  section: sec.section,
                  section_court: sec.section_court
                };
              });
            this.matieres_sections = data.data.matieres_sections
              .map(ms => {
                return {
                  id_section: +ms.id_section,
                  id_matiere: +ms.id_matiere,
                  niveau: +ms.niveau,
                  categorie: ms.categorie,
                  coef: +ms.coef,
                  matiere: ms.matiere,
                  section: ms.section,
                  section_court: ms.section_court
                }
              });

            // extraire les champs niveau et section dans un tableau
            // puis supprimer les doublons
            this.niveaux_sections = this.matieres_sections
              .map(ms => {
                return [ms.niveau, ms.section];
              })
            this.niveaux_sections = this.niveaux_sections
              .filter((ns, idx) =>
                this.niveaux_sections
                  .findIndex(ons => ons[0] == ns[0] && ons[1] == ns[1]) == idx);

            // Ordonner les matieres_sections par niveau et section
            this.matieres_sections = this.niveaux_sections
              .map(ns => this.matieres_sections.filter(ms => ms.niveau == ns[0] && ms.section == ns[1]));
          }
        });
    },
    selectMatiereSection: function (ms) {
      this.selectedMatiereSection = ms;
    }
  }
});