const app = new Vue({
  el: "#vueapp",
  data: {
    fiche: new FicheRenseignement(),
    alerts: [],
    classes: []
  },
  created: function () {
    this.fiche.other_infos
      .createIfNotExists('Adresse Postale')
      .createIfNotExists('Passe Temps')
      .createIfNotExists('Qualités')
      .createIfNotExists('Défauts')
      .createIfNotExists('Classe de l\'année dernière')
      .createIfNotExists('Classe')
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
          this.classes = data.data.classes;
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
    /**
     * Return an URL formatted data for the object values
     * @param {FicheRenseignement} fiche 
     * @returns 
     */
    serializeFicheRenseignements: function (fiche) {
      let formData = new URLSearchParams();
      Object.entries(fiche).forEach(arr => {
        if (arr[0] != 'other_infos') {
          formData.append(arr[0], arr[1])
        }
      });
      fiche.other_infos.getAll()
        .forEach(ie => Object.entries(ie)
          .forEach(arr => formData.append(arr[0] + '[]', arr[1]))
        );
      return formData;
    },
    /**
     * Evènement lorsque l'élève soumet sa fiche de renseignements
     */
    onSubmit: function () {
      this.insertFicheRenseignements(this.fiche);
    }
  }
});