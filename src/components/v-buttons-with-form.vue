<template>
  <div class="v-buttons">
    <div
      class="container flex flex-col px-2 lg:px-20 lg:flex-row md:flex-row lg:justify-start md:justify-start md:px-10 gap-5 pt-5"
    >
      <v-btn class="bg-blue-500 hover:bg-blue-700" @click="sendName(0)"
        >Заказать в Москву</v-btn
      >
      <v-btn class="bg-[#0D9488] hover:bg-[#075852]" @click="sendName(1)"
        >Заказать в Санкт-Петербург</v-btn
      >
    </div>
    <v-forms
      :selected="selected"
      :is-open="isFormOpen"
      @close="closeForm"
      @hideForm="hideForm"
      @update:selected="selected = $event"
    />
    <responce-popup :is-open="isPopupOpen" @close="hidePopUp" />
  </div>
</template>

<script>
import VForms from "./v-forms.vue";
import ResponcePopup from "./response-popup.vue";
import VBtn from "./v-btn.vue";

export default {
  name: "v-buttons-with-form",
  data() {
    return {
      isFormOpen: false,
      isPopupOpen: false,
      selected: "",
    };
  },
  components: {
    VForms,
    ResponcePopup,
    VBtn,
  },
  methods: {
    hidePopUp() {
      this.isPopupOpen = false
    },
    closeForm() {
      this.isFormOpen = false
    },
    hideForm(data) {
      this.isFormOpen = data;
      this.isPopupOpen = true;
    },
    sendName(city_id) {
      this.isFormOpen = true;
      this.selected = this.$store.state.cities[city_id].name;
    },
  },
};
</script>