<template>
      <vue-recaptcha
              ref="recaptcha"
              :loadRecaptchaScript="true"
              :sitekey="sitekey"
              @verify="verify"
              @expired="expired"
            >
            </vue-recaptcha>
</template>

<script>
import VueRecaptcha from "vue-recaptcha";

export default {
  name: "recaptcha",
  components:{VueRecaptcha},
  data(){return {sitekey:'6LdLcu0hAAAAAIGW_yfuLWmRKCk4jKhlYeuSywS-'}},
  props:['resetCaptcha'],
  emits:['refreshCaptchaStatus'],
  watch:{
    resetCaptcha(newValue){
        if(newValue) this.expired()
    }
  },
  methods: {
    verify(response) {
      this.captcha = true;
    },
    expired() {
      this.$refs.recaptcha.reset();
      this.$emit('refreshCaptchaStatus')
    },
  },
};
</script>
