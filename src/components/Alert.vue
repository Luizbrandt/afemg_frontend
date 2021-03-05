<template>
  <div>
    <v-snackbar
      rounded="lg"
      :color="color"
      v-model="snackbar"
      :timeout="timeout"
      elevation="12"
      absolute
      top
    >
      <v-container>
      <v-row justify="center" align="center">
        <v-icon class="vertical">{{ icon }}</v-icon>
        <span class="bloco text-justify">{{ text }}</span>
        <v-btn title="Fechar" dark icon text @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-row>
      </v-container>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data: () => ({
    top: true,
    snackbar: false,
    timeout: -1,
    text: "",
    color: "",
    icon: "mdi-alert-circle-outline",
  }),

  methods: {
    showMsg: function (text, color, timeout = 3000) {
      this.snackbar = true;
      this.text = text;
      this.color = color;
      this.timeout = timeout;
      switch (this.color) {
        case "warning":
          this.icon = "mdi-alert-outline";
          break;
        case "error":
          this.icon = "mdi-alert-octagon-outline";
          break;
        case "success":
          this.icon = "mdi-checkbox-marked-circle-outline";
          break;
        case "Info":
          this.icon = "mdi-information-outline";
          break;
        default:
          this.icon = "mdi-alert-circle-outline";
      }
    },
  },
};
</script>

<style scoped>
.bloco {
  display: block;
  margin: 5px;
  margin-top: 7px;
}
.vertical {
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 5px;
  margin-right: 5px;
}
</style>
