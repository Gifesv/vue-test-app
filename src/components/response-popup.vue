<template>
  <div
    v-if="isOpen && $store.state.requestCompleted"
    @click="close"
    class="response-popup backdrop"
  >
    <div class="flex justify-center" @click.stop>
      <div
        v-if="this.$store.state.data.data"
        class="rounded-lg absolute top-[40%] bg-white"
        v-html="this.$store.state.data.data"
      ></div>
      <div
        v-else
        class="rounded-lg absolute top-[40%] bg-white"
        v-html="this.$store.state.errors.response.data"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "response-popup",
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
  emits: {
    close: null,
  },
};
</script>