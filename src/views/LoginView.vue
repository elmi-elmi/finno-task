<template>
  <v-container>
    <v-row justify="center">
      <v-col class="d-flex flex-column justify-center align-center">
          <form>
            <h1 class="grey--text">Login</h1>
          
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
         
          <v-card flat min-width="330" class="ma-3">
            <vue-recaptcha
              ref="recaptcha"
              :loadRecaptchaScript="true"
              sitekey="6LdLcu0hAAAAAIGW_yfuLWmRKCk4jKhlYeuSywS-"
              @verify="verify"
              @expired="expired"
            ></vue-recaptcha>
          </v-card>
          <v-btn  class="mr-4" @click="submit"> Login </v-btn>
          <!-- <v-btn :disabled="$v.$invalid ||!captcha" class="mr-4" @click="submit"> Login </v-btn> -->
          <v-btn @click="clear"> clear </v-btn>
        </form>
        <v-row class="ma-4"> <span>Don't you have an account? &nbsp;</span>
        <router-link to="/register"> Register</router-link> 

        </v-row>
       
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import VueRecaptcha from "vue-recaptcha";

import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
} from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  name: "Login",
  components: {
    VueRecaptcha,
  },

  validations: {
    password: { required, minLength: minLength(4) },
    email: { required, email },
  },

  data: () => ({
    email: "",
    password: null,
    captcha:true
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
      .dispatch('doLogin',
      {
        email:this.email,
        password:this.password
      }
      )
      .then(()=>this.$router.push('/about'))
      .catch((e)=>{
        this.$store.dispatch('snackBarContent', e.message)
      })
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.password = null;
      this.email = "";
      this.checkbox = false;
    },
    verify(response) {
        console.log(response)
        this.captcha = true
    //   setTimeout(() => {
    //     this.$refs.recaptcha.reset();
    //   }, 1200);
    },
    expired() {
      this.$refs.recaptcha.reset();
    },
  },
};
</script>
