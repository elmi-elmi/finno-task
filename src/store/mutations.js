import axios from 'axios'
export default{
    SET_USER_DATA(state, userData) {
        state.user = userData;
        localStorage.setItem("user", JSON.stringify(userData));
        axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`
      },
      CLEAR_USER_DATA() {
        localStorage.removeItem("user");
        location.reload();
      },
      SET_CRYPTO_DATA(state, cryptoData) {
        state.cryptoData = cryptoData;
      },
      SET_USERS_LIST(state, usersList) {
        state.usersList = usersList;
      },
      SET_SNACK_CONTENT(state, content) {
        state.snackContent = content;
      },
}