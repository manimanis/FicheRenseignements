const app = new Vue({
  el: "#vueapp",
  data: {
    fiche: new FicheRenseignement(),
    alerts: [],
    classes: [],
    minDateNaiss: '',
    maxDateNaiss: ''
  },
  created: function () {
    this.fiche.other_infos
      .createIfNotExists('Adresse Postale')
      .createIfNotExists('Passe Temps')
      .createIfNotExists('Qualités')
      .createIfNotExists('Défauts')
      .createIfNotExists('Classe de l\'année dernière')
      .createIfNotExists('Classe', '4EXP1')
      .createIfNotExists("Moyenne Annuelle")
      .createIfNotExists("Note Français")
      .createIfNotExists("Note Informatique")
      .createIfNotExists("Note Mathématiques");
  },
  mounted: function () {
    this.defaultValues();
    this.fetchClasses();
  },
  methods: {
    defaultValues: function () {
      const dt = new Date();
      const minYear = dt.getFullYear() - 25;
      const maxYear = dt.getFullYear() - 14;
      this.minDateNaiss = minYear + '-01-01';
      this.maxDateNaiss = maxYear + '-01-01';

      this.fiche.other_infos
        .setInfo('Adresse Postale', 'Route de la plage - Hammam-Sousse')
        .setInfo('Passe Temps', 'Programmation')
        .setInfo('Qualités', 'Aucune')
        .setInfo('Défauts', 'Beaucoup')
        .setInfo('Classe de l\'année dernière', '3EXP1')
        .setInfo('Classe', '4EXP1')
        .setInfo("Moyenne Annuelle", '13.20')
        .setInfo("Note Français", '12')
        .setInfo("Note Informatique", '18.5')
        .setInfo("Note Mathématiques", '14');
      
      this.fiche.nom_prenom = 'nom prénom';
      this.fiche.date_naiss = `${randomInt(minYear, maxYear)}-${('0' + randomInt(1, 12)).substr(0, 2)}-${('0' + randomInt(1, 28)).substr(0, 2)}`;
      this.fiche.genre = ["G", "F"][randomInt(0, 1)];
      this.fiche.email = "mmmm@yahoo.fr";
    },
    fetchClasses: function () {
      return fetch(`operations.php?cnt=fiche&act=listeClasses&annee_scolaire=${this.fiche.annee_scolaire}`)
        .then(response => response.json())
        .then(this.handleFetch)
        // .catch(this.handleErrors)
        .then(data => {
          if (data == null) {
            return
          }
          this.classes = data.data.classes
            .map(cl => new Classe(cl));
        });
    },
    insertFicheRenseignements: function (fiche) {
      const formData = this.serializeFicheRenseignements(fiche);
      return fetch(`operations.php?cnt=fiche&act=insertNew&annee_scolaire=${this.fiche.annee_scolaire}`, {
        method: "POST",
        body: formData
      })
        .then(response => response.json())
        .then(this.handleFetch)
        // .catch(this.handleErrors)
        .then(data => {
          if (data == null) {
            return
          }
          console.log(data);
        });
    },
    /**
     * Affiche un message d'alerte
     * @param {string} type 
     * @param {string} msg 
     */
    addAlertMessage: function (type, msg) {
      const idx = this.alerts.length;
      this.alerts.push({ alType: type, alMsg: msg });
      setTimeout(() => this.clearAlertMessage(0), 3000);
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
    validateForm: function () {
      const form = document.querySelector('#fiche');
      // form.classList.remove('was-validated');
      const isValid = form.checkValidity();
      form.classList.add('was-validated');
      return isValid;
    },
    /**
     * Return an URL formatted data for the object values
     * @param {FicheRenseignement} fiche 
     * @returns 
     */
    serializeFicheRenseignements: function (fiche) {
      let formData = new URLSearchParams();
      Object.entries(fiche).forEach(arr => {
        if (arr[0] != 'other_infos' && arr[0] != 'classe') {
          formData.append(arr[0], arr[1])
        }
      });
      fiche.other_infos.getAll()
        .forEach(ie => Object.entries(ie)
          .forEach(arr => formData.append('oi_' + arr[0] + '[]', arr[1]))
        );
      formData.append('id_classe', this.fiche.classe.id_classe);
      return formData;
    },
    fillMissingValues: function() {
      const selectedClasse = this.fiche.other_infos.getInfo('Classe');
      this.fiche.classe = this.classes.find(cl => cl.classe == selectedClasse);
    },
    /**
     * Evènement lorsque l'élève soumet sa fiche de renseignements
     */
    onSubmit: function () {
      this.fillMissingValues();
      if (this.validateForm()) {
        this.insertFicheRenseignements(this.fiche);
      }
    }
  }
});