const app = new Vue({
  el: '#vueapp',
  data: {
    errors: [],
    classes: [],
    matieres: [],
    sections: [],
    mat_sect: new MatiereSectionCollection(),
    selectedItem: {},
    selectedItemIndex: {},
    mode: 'list'
  },
  mounted: function () {
    this.fetchClasses();
    this.fetchMatieresSections();
  },
  methods: {
    fetchClasses: function () {
      return fetch('operations.php?cnt=classes')
        .then(response => response.json())
        .then(this.handleFetch)
        .then(data => {
          if (data.status == 'ok') {
            this.classes = data.data.classes;
          }
        });
    },
    /**
     * 
     * @param {json} data Le résultat d'un fetch
     */
    handleFetch: function(data) {
      if (data.status != 'ok') {
        throw data.errors;
      }
      return data;
    },
    /**
     * 
     * @param {String[]} errors 
     */
    handleErrors: function(errors) {
      this.errors = errors;
    },
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
    /**
     * Insérer une nouvelle MatiereSection
     * @param {MatiereSection} ms 
     */
    insertMatiere: function (ms) {
      let formData = new URLSearchParams();
      Object.entries(ms).forEach(arr => formData.append(arr[0], arr[1]));
      return fetch('operations.php?cnt=classes&act=insertMatiere',
        {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(this.handleFetch)
        .catch(this.handleErrors);
    },
    /**
     * Mettre à jour une matière dans la base de données
     */
    updateMatiereSection: function () {
      const idxNS = this.selectedItemIndex.idxNS;
      const idxMS = this.selectedItemIndex.idxMS;
      const oldItem = this.mat_sect.mat_sec[idxNS][idxMS];
      const newItem = this.selectedItem;
      this.mat_sect.update(idxNS, idxMS, newItem);
      this.onCancelClicked();
    },
    /**
     * Insérer une nouvelle matière dans la base de données
     */
    insertMatiereSection: function () {
      const newItem = this.selectedItem;
      this.errors = [];
      this.insertMatiere(newItem)
        .then(data => {
          if (data == null) {
            return;
          }
          console.log('Success: ', data);
          this.mat_sect.add(newItem);
          this.onCancelClicked();
        });
    },
    /**
     * Prévient l'utilisateur d'effectuer une nouvelle opération d'ajout ou 
     * de modification alors qu'une opération est en cours.
     * @returns boolean
     */
    preventSelection: function () {
      if (this.mode != 'list') {
        alert("Compléter l'opération d'édition en cours avant!");
        return true;
      }
      return false;
    },
    /**
     * Click sur un élément en vue de le modifier.
     * 
     * @param {number} idxNS 
     * @param {number} idxMS 
     * @returns 
     */
    onSelectItem: function (idxNS, idxMS) {
      if (this.preventSelection()) {
        return;
      }
      this.mode = 'edit';
      this.selectedItemIndex = { idxNS: idxNS, idxMS: idxMS };
      this.selectedItem = new MatiereSection(this.mat_sect.mat_sec[idxNS][idxMS]);
    },
    /**
     * Création d'une nouvelle matière
     */
    onNewItem: function () {
      if (this.preventSelection()) {
        return;
      }
      this.mode = 'new';
      this.selectedItemIndex = { idxNS: -1, idxMS: -1 };
      this.selectedItem = new MatiereSection();
    },
    /**
     * Remplit certains champs non touchés dans le formulaire :
     * - section, section_court
     * - matiere
     */
    fillMissingFields: function () {
      const section = this.sections.find(sect => this.selectedItem.id_section == sect.id);
      this.selectedItem.section = section.section;
      this.selectedItem.section_court = section.section_court;

      const matiere = this.matieres.find(mat => this.selectedItem.id_matiere == mat.id);
      this.selectedItem.matiere = matiere.matiere;
    },
    /**
     * Click sur le bouton Enregistrer
     */
    onSaveClicked: function () {
      this.fillMissingFields();
      if (this.mode == 'edit') {
        this.updateMatiereSection();
      } else if (this.mode == 'new') {
        this.insertMatiereSection();
      }
    },
    /**
     * Click sur le bouton Annuler
     */
    onCancelClicked: function () {
      this.mode = 'list';
      this.selectedItem = {};
    }
  }
});