import accountService from "@/services/AccountService";
import cryptoService from "@/services/CryptoService";


export default{
     /**
     * POST request to services
     * sign up with new email and password
     * then add user to state
     *
     * @param credentials are email and password
     * @return promise contain response from backend
     */
    doRegister({ commit }, credentials) {
        return accountService
          .register(credentials)
          .then(({ data }) => commit("SET_USER_DATA", data))
          .catch((e) => {
            throw e;
          });
      },

      /**
     * POST request to services
     * new login with new email and password
     * then add user to state
     *
     * @param credentials are email and password
     * @return promise contain response from backend
     */
      doLogin({ commit }, credentials) {
        return accountService
          .login(credentials)
          .then(({ data }) => commit("SET_USER_DATA", data))
          .catch((e) => {
            throw e;
          });
      },
      
      doLogout({ commit }) {
        commit("CLEAR_USER_DATA");
      },
      fetchTableData({ commit }) {
        return cryptoService
          .fetchCryptoData()
          .then(({ data }) => commit("SET_CRYPTO_DATA", data))
          .catch((e) => {
            throw e;
          });
      },
      fetchUsersList({ commit }) {
        return accountService
          .users()
          .then(({ data }) => {
            commit("SET_USERS_LIST", data);
          })
          .catch((e) => {
            throw e;
          });
      },
      snackBarContent({ commit }, content) {
        commit("SET_SNACK_CONTENT", content);
      },
}