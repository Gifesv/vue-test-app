<template>
  <div
    v-if="isOpen"
    @click="close"
    class="v-forms flex justify-center backdrop"
  >
    <div
      @click.stop
      class="rounded-lg absolute lg:top-[40%] md:top-[40%] sm:top-[17%] bg-white"
    >
      <form
        name="form"
        method="post"
        class="p-5 lg:max-w-[850px] md:max-w-[669px] sm:w-[355px] lg:w-[850px] md:w-[669px]"
      >
        <p class="text-[24px] leading-6 brand-medium pb-5">Заказать звонок</p>
        <div
          class="grid grid-rows-2 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-x-6 lg:gap-y-0 md:gap-y-5 sm:gap-y-5 items-center"
        >
          <div class="">
            <label class="brand-medium" for="name">Имя*</label>
            <span class="error" v-if="v$.name.$error"> Обязательное поле</span>
            <br />
            <input
              v-model="state.name"
              type="text"
              placeholder="Иван Иванов"
              class="border-2 brand-regular mt-1 rounded-md py-2 w-[100%]"
            />
          </div>
          <div>
            <label class="brand-medium" for="phone">Телефон*</label>
            <span class="error" v-if="v$.phone.$error"> Обязательное поле</span>
            <br />
            <input
              v-model="state.phone"
              v-maska="'+7 (###) ###-##-##'"
              type="text"
              placeholder="+7 (___) ___-__-__"
              class="border-2 brand-regular mt-1 rounded-md py-2 w-[100%]"
            />
          </div>
          <div>
            <label class="brand-medium" for="email">Email*</label>
            <span class="error" v-if="v$.email.$error"> Обязательное поле</span>
            <br />
            <input
              v-model="state.email"
              type="email"
              placeholder="you@example.com"
              class="border-2 brand-regular mt-1 rounded-md py-2 w-[100%]"
            />
          </div>
          <div
            class="lg:col-start-4 lg:col-span-1 md:col-start-1 md:col-span-2"
          >
            <label class="brand-medium" for="city">Город*</label> <br />
            <select
              :value="selected"
              @input="onSelect($event)"
              name=""
              id=""
              class="border-2 brand-regular mt-1 rounded-md h-[44px] w-[100%]"
            >
              <option :value="city.name" :key="city.id" v-for="city in cities">
                {{ city.name }}
              </option>
            </select>
          </div>
          <input
            @click.prevent="submitForm"
            type="submit"
            class="bg-[#16A34A] hover:bg-green-800 text-white rounded-lg py-2.5 self-end lg:col-start-4 md:cold-start-3"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import axios from "axios";

export default {
  setup() {
    const state = reactive({
      name: "",
      phone: "",
      email: "",
    });

    const rules = computed(() => {
      return {
        name: { required },
        phone: { required, minLength: minLength(18) },
        email: { required, email },
      };
    });

    const v$ = useValidate(rules, state);

    return {
      state,
      v$,
    };
  },
  name: "v-forms",
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    selected: {
      type: String,
    },
  },
  emits: {
    close: null,
    hideForm: null,
    "update:selected": null,
  },
  methods: {
    async submitForm() {
      const state = await this.v$.$validate();

      if (state) {
        const formData = {
          name: this.state.name,
          phone: "+" + this.state.phone.replace(/\D/g, ""),
          email: this.state.email,
          city_id: this.$store.state.cities.find(
            (city) => city.name === this.selected
          ).id,
        };
        this.$store.state.requestCompleted = false;
        axios
          .post("http://hh.autodrive-agency.ru/test-tasks/front/task-7/", {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            city_id: formData.city_id,
          })
          .then((response) => {
            this.$store.state.data = response;
          })
          .catch((e) => {
            this.$store.state.errors = e;
          })
          .finally(() => {
            this.$store.state.requestCompleted = true;
          });
        this.clearForm();
      }
    },
    clearForm() {
      this.$emit("hideForm", false);
      this.state.name = "";
      this.v$.name.$dirty = false;
      this.state.phone = "";
      this.v$.phone.$dirty = false;
      this.state.email = "";
      this.v$.email.$dirty = false;
    },
    onSelect(event) {
      this.$emit("update:selected", event.target.value);
    },
    close() {
      this.$emit("close");
    },
  },
  computed: {
    cities() {
      return this.$store.state.cities;
    },
  },
};
</script>