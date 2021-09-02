const app = new Vue({
  el: "#vueapp",
  data: {
    mode: 'login',
    alerts: [],
    payload: [],
    token: '',
    eleve: null
  },
  mounted: function () {

  },
  methods: {
    /**
     * Connexion d'un utilisateur
     * @param {string} pseudo 
     * @param {string} pass 
     * @returns 
     */
    loginUser: function (pseudo, pass) {
      const formData = new URLSearchParams();
      formData.append('pseudo', pseudo);
      formData.append('pass', pass);
      return fetch(`operations.php?cnt=user&act=login`, {
        method: "POST",
        body: formData
      })
        .then(response => response.json())
        .then(this.handleFetch)
        .catch(this.handleErrors)
        .then(data => {
          if (data == null) {
            return;
          }
          this.token = data.data.token;
          this.payload = parseJwt(data.data.token);
          this.eleve = new Eleve(data.data.eleve);
          return this.token;
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
    onSetMode: function (mode) {
      this.mode = mode;
    },
    onLoginUser: function () {
      const pseudo = document.querySelector('#loginPseudo').value;
      const pass = document.querySelector('#loginPass').value;
      this.loginUser(pseudo, pass)
        .then(token => {
          if (token == null) {
            return;
          }
          console.log(token);
        });
    }
  }
});