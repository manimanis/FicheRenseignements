const app = new Vue({
  el: '#vueapp',
  data: {
    classes: [],
    matieres: [],
    sections: [],
    mat_sect: new MatiereSectionCollection(),
    idxNiveau: -1,
    selectedItem: {},
    selectedItemIndex: {},
    selectedNiveauIndex: 0,
    selectedMatiereIndex: 0,
    alerts: [],
    dupItems: [],
    mode: 'list'
  },
  mounted: function () {
    this.fetchMatieresSections();
  },
  methods: {
    /**
     * Retourne la classe CSS pour le badge d'une matière
     * 
     * @param {MatiereSection} ms 
     */
    getClassBadge: function (ms) {
      return {
        'bg-danger': ms.categorie == 'PR',
        'bg-success': ms.categorie == 'OB',
        'bg-secondary': ms.categorie == 'OP'
      };
    },
    /**
     * Retourne l'objet MatiereSection qui a été sélectionné
     * 
     * @returns MatiereSection
     */
    getMatiere: function (idxNS, idxMS) {
      return this.mat_sect.mat_sec[idxNS][idxMS];
    },
    /**
     * Retourne l'objet Section qui a été sélectionné
     * 
     * @returns Section
     */
    getNiveau: function (idxNS) {
      return this.mat_sect.niv_sec[idxNS];
    },
    /**
     * Affiche un message d'alerte
     * @param {string} type 
     * @param {string} msg 
     */
    addAlertMessage: function(type, msg) {
      const idx = this.alerts.length;
      this.alerts.push({alType: type, alMsg: msg});
      setTimeout(()=> this.clearAlertMessage(0), 3000);
    },
    /**
     * Efface le message d'alerte d'indice indiqué
     * @param {number} idx
     */
    clearAlertMessage: function (idx) {
      this.alerts.splice(idx, 1);
    },
    /**
     * 
     * @param {json} data Le résultat d'un fetch
     */
    handleFetch: function (data) {
      if (data.status != 'ok') {
        throw data.errors;
      }
      return data;
    },
    /**
     * 
     * @param {String[]} errors 
     */
    handleErrors: function (errors) {
      for (let error of errors) {
        this.addAlertMessage('danger', error);
      }
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
     * Insérer plusieurs MatiereSection
     * @param {MatiereSection[]} arr 
     */
    insertManyMatieres: function (arr) {
      let formData = new URLSearchParams();
      arr.forEach(ms => Object.entries(ms).forEach(arr => formData.append(arr[0]+'[]', arr[1])));
      return fetch('operations.php?cnt=classes&act=insertManyMatieres',
        {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(this.handleFetch)
        .catch(this.handleErrors);
    },
    /**
     * Mettre à jour une MatiereSection
     * @param {MatiereSection} oms Ancienne matière
     * @param {MatiereSection} ms Nouvelle matière
     */
    updateMatiere: function (oms, ms) {
      let formData = new URLSearchParams();
      Object.entries(oms).forEach(arr => formData.append('o' + arr[0], arr[1]));
      Object.entries(ms).forEach(arr => formData.append(arr[0], arr[1]));
      return fetch('operations.php?cnt=classes&act=updateMatiere',
        {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(this.handleFetch)
        .catch(this.handleErrors);
    },
    /**
     * 
     * @param {MatiereSection} ms 
     * @returns 
     */
    deleteMatiere: function (ms) {
      let formData = new URLSearchParams();
      Object.entries(ms).forEach(arr => formData.append(arr[0], arr[1]));
      return fetch('operations.php?cnt=classes&act=deleteMatiere',
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
      const idxNS = this.selectedNiveauIndex;
      const idxMS = this.selectedMatiereIndex;
      const oldItem = this.mat_sect.mat_sec[idxNS][idxMS];
      const newItem = this.selectedItem;
      this.updateMatiere(oldItem, newItem)
        .then(data => {
          if (data == null) {
            return;
          }
          this.addAlertMessage('success', 'Modification effectuée avec succès!');
          this.mat_sect.update(idxNS, idxMS, newItem);
          this.onCancelClicked();
        });
    },
    /**
     * Insérer une nouvelle matière dans la base de données
     */
    insertMatiereSection: function () {
      const newItem = this.selectedItem;
      this.insertMatiere(newItem)
        .then(data => {
          if (data == null) {
            return;
          }
          this.addAlertMessage('success', 'Ajout effectué avec succès!');
          this.mat_sect.add(newItem);
          this.idxNiveau = this.mat_sect.findNiveau(newItem);
          this.onCancelClicked();
        });
    },
    /**
     * Insérer plusieurs matières section dans la base de données
     */
    insertMatiereSectionMany: function() {
      this.insertManyMatieres(this.dupItems)
        .then(data => {
          if (data == null) {
            return;
          }
          this.addAlertMessage('success', 'Ajout effectué avec succès!');
          this.mat_sect.addMany(this.dupItems);
          this.idxNiveau = this.mat_sect.findNiveau(this.dupItems[0]);
          this.onCancelDupClicked();
        });
    },
    /**
     * Supprimer une matière après confirmation
     */
    deleteMatiereSection: function () {
      const idxNS = this.selectedNiveauIndex;
      const idxMS = this.selectedMatiereIndex;
      const oldItem = this.mat_sect.mat_sec[idxNS][idxMS];
      this.deleteMatiere(oldItem)
        .then(data => {
          if (data == null) {
            return;
          }
          this.addAlertMessage('success', 'Suppression effectuée avec succès!');
          this.mat_sect.removeAt(idxNS, idxMS);
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
     * Sélectionner un niveau
     * @param {Event} event 
     */
    onSelectNiveau: function (event) {
      this.idxNiveau = event.target.value;
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
      this.selectedNiveauIndex = idxNS;
      this.selectedMatiereIndex = idxMS;
      // this.originalSelectedItem = new MatiereSection(this.mat_sect.mat_sec[idxNS][idxMS]);
      this.selectedItem = new MatiereSection(this.mat_sect.mat_sec[idxNS][idxMS]);
    },
    /**
     * Création d'une nouvelle matière
     */
    onNewItem: function (idxNS) {
      if (this.preventSelection()) {
        return;
      }
      if (idxNS == null) {
        idxNS = -1;
      }
      this.mode = 'new';
      this.selectedNiveauIndex = idxNS;
      this.selectedMatiereIndex = -1;
      if (idxNS == -1) {
        this.selectedItem = new MatiereSection();
      } else {
        this.selectedItem = new MatiereSection(this.mat_sect.mat_sec[idxNS][0]);
        this.selectedItem.defaultValues();
      }
    },
    /**
     * Dupliquer toutes les entrées d'un niveau
     * @param {number} idxNS 
     */
    onDuplicateNiveau: function(idxNS) {
      if (this.preventSelection()) {
        return;
      }
      this.mode = 'duplicate';
      this.dupItems = this.mat_sect.mat_sec[idxNS]
        .map(ms => new MatiereSection(ms));
    },
    /**
     * Supprimer l'élément indiqué
     * @param {number} idxNS 
     * @param {number} idxMS 
     */
    onDeleteItem: function (idxNS, idxMS) {
      if (this.preventSelection()) {
        return;
      }
      this.mode = "delete";
      this.selectedNiveauIndex = idxNS;
      this.selectedMatiereIndex = idxMS;
      // this.originalSelectedItem = new MatiereSection(this.mat_sect.mat_sec[idxNS][idxMS]);
      this.selectedItem = this.mat_sect.mat_sec[idxNS][idxMS];
    },
    onDeleteMatiere: function(idxDupItem) {
      if (confirm("Voulez vous supprimer cet élément ?")) {
        this.dupItems.splice(idxDupItem, 1);
      }
    },
    onAddMatiere: function () {
      this.dupItems.push(new MatiereSection());
    },
    /**
     * Remplit certains champs non touchés dans le formulaire :
     * - section, section_court
     * - matiere
     * 
     * @param {MatiereSection}
     */
    fillMissingFields: function (item) {
      const section = this.sections.find(sect => item.id_section == sect.id);
      item.section = section.section;
      item.section_court = section.section_court;

      const matiere = this.matieres.find(mat => item.id_matiere == mat.id);
      item.matiere = matiere.matiere;
    },
    /**
     * Remplit certains champs non touchés dans le formulaire :
     * - section, section_court
     * - matiere
     * 
     * @param {MatiereSection[]} arr 
     */
    fillMissingFieldsArray: function (arr, model) {
      for (let item of arr) {
        Object.entries(model).forEach(entry => {
          item[entry[0]] = entry[1];
        });
        this.fillMissingFields(item);
      }
    },
    /**
     * Click sur le bouton Enregistrer
     */
    onSaveClicked: function () {
      this.fillMissingFields(this.selectedItem);
      if (this.mode == 'edit') {
        this.updateMatiereSection();
      } else if (this.mode == 'new') {
        this.insertMatiereSection();
      } else if (this.mode == 'delete') {
        this.deleteMatiereSection();
      }
    },
    /**
     * Click sur le bouton Annuler
     */
    onCancelClicked: function () {
      this.mode = 'list';
      this.selectedItem = {};
    },
    /**
     * CLICK sur le bouton enregistrer
     */
    onSaveDupClicked: function() {
      this.fillMissingFieldsArray(this.dupItems, {
        niveau: this.dupItems[0].niveau,
        id_section: this.dupItems[0].id_section
      });
      if (this.mat_sect.findNiveau(this.dupItems[0]) != -1) {
        this.addAlertMessage('danger', 'Cette section existe déjà!');
        return;
      }
      this.insertMatiereSectionMany();
    },
    onCancelDupClicked: function() {
      this.mode = 'list';
      this.dupItems = [];
    }
  }
});