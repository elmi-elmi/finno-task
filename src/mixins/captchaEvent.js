export const captchaEvent = {
    data: () => ({
        isCaptchaVerified:false,
    
      }),
      methods:{
        verify() {
            this.isCaptchaVerified = true
        },
        expired() {
          this.$refs.recaptcha.reset();
          this.isCaptchaVerified = false;
    
        },
      }

}