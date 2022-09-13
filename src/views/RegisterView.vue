<template>
  <v-container class="mt-10">
    <v-row justify="center">
      <v-col class="d-flex flex-column justify-center align-center">
        <form>
            <h1 class="grey--text">Register</h1>

          <v-text-field
            v-model="name"
            prepend-icon="mdi-account-circle"
            :error-messages="nameErrors"
            :counter="10"
            label="Name"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="email"
            prepend-icon="mdi-email"
            :error-messages="emailErrors"
            label="E-mail"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="password"
            prepend-icon="mdi-eye-off"
            :error-messages="passwordErrors"
            label="Password"
            required
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
          ></v-text-field>
          <v-checkbox
            v-model="checkbox"
            :error-messages="checkboxErrors"
            label="agree to term and conditions"
            required
            @change="$v.checkbox.$touch()"
            @blur="$v.checkbox.$touch()"
          ></v-checkbox>
          <v-card flat min-width="330" class="ma-3">
            <vue-recaptcha
              ref="recaptcha"
              :loadRecaptchaScript="true"
              :sitekey="sitekey"
              @verify="verify"
              @expired="expired"
            ></vue-recaptcha>
          </v-card>
          <v-btn
            :disabled="$v.$invalid || !isCaptchaVerified"
            class="mr-4"
            @click="submit"
          >
            Register
          </v-btn>
          <v-btn @click="clear"> clear </v-btn>
        </form>
        <v-row class="ma-4">
          <span>You have already an account? &nbsp;</span>
          <router-link to="/login"> login</router-link>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
    /**
 * Register page
 *
 * @author Shahrokh elmi
 */
import VueRecaptcha from "vue-recaptcha";

import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  email,
  minLength,
} from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  name: "Register",
  components: {
    VueRecaptcha,
  },

  validations: {
    name: { required, maxLength: maxLength(10) },
    password: { required, minLength: minLength(4) },
    email: { required, email },
    checkbox: {
      checked(val) {
        return val;
      },
    },
  },

  data: () => ({
    name: "",
    email: "",
    checkbox: false,
    password: null,
    isCaptchaVerified: false,
    sitekey:'6LdLcu0hAAAAAIGW_yfuLWmRKCk4jKhlYeuSywS-'
  }),

  computed: {
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked && errors.push("You must agree to continue!");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("Name must be at least 4 characters long");
      !this.$v.password.required && errors.push("Password is required.");
      return errors;
    },
  },

  methods: {
    submit() {
      this.$v.$touch();
      this.$store
      .dispatch('doRegister',
      {
        email:this.email,
        password:this.password
      }
      )
      .then(()=>this.$router.push('/'))
      .catch((e)=>{
        this.$store.dispatch('snackBarContent', e.message)
        this.expired()
      })
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.password = null;
      this.email = "";
      this.select = null;
      this.checkbox = false;
    },
    verify(response) {
      this.isCaptchaVerified = true;
      // setTimeout(() => {
      //   this.$refs.recaptcha.reset();
      // }, 1200);
    },
    expired() {
      this.$refs.recaptcha.reset();
      this.isCaptchaVerified = false;
    },
  },
};
</script>
