import { createStore } from "vuex";

export default createStore({
  state: {
    FirstName: localStorage.getItem("first name"),
    id: localStorage.getItem("ID"),
    token: localStorage.getItem("token"),
    // base_url: "dev.growatpace.com",
    backend_base_url: "growatpace.com",
    frontend_base_url: "forum.growatpace.com",
    base_url: "growatpace.com",
  },

  mutations: {
    setUser(state, data) {
      state.user = data.first_name;
      state.id = data.id;
      state.token = data.token;
    },

    removeUser(state) {
      state.FirstName = null;
      state.id = null;
      console.log("logout", state.FirstName, state.id);
    },
    hideModall(state) {
      state.modal = true;
      state.removemodal = true;
    },
    removeModall(state) {
      state.modal = false;
      state.removemodal = false;
    },
  },

  actions: {
    loginUser({ commit }, response) {
      // console.log("Response", response);

      commit("setUser", response.data.data);

      window.location.replace("/");
    },

    logoutUser({ commit }) {
      // localStorage.clear();
      localStorage.removeItem("token");
      localStorage.removeItem("ID");
      localStorage.removeItem("first name");

      commit("removeUser");

      window.location.replace("/");
    },
  },
});
