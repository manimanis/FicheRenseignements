const app = new Vue({
  el: "#vueapp",
  data: {
    mode: 'login'
  },
  mounted: function () {

  },
  methods: {
    onSetMode: function (mode) {
      this.mode = mode;
    }
  }
});