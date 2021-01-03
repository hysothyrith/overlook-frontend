/* eslint-disable @typescript-eslint/camelcase */
import router from "@/router";
import axios from "axios";

export default {
  namespaced: true,
  state: {
    token: null,
    user: null
  },

  getters: {
    authenticated(state: UserState) {
      return state.token && state.user;
    },

    user(state: UserState) {
      return state.user;
    }
  },

  mutations: {
    SET_TOKEN(state: UserState, token: string) {
      state.token = token;
    },
    SET_USER(state: UserState, user: User) {
      state.user = user;
    }
  },

  actions: {
    async signIn({ commit, dispatch }: any, credentials: SignInCredential) {
      const response = await axios.post("login", credentials);

      if (response.data.success) {
        commit("SET_TOKEN", response.data.data.access_token);
        commit("SET_USER", response.data.data.customer);
      } else {
        console.log("Login failed");
        dispatch("invalidateToken");
      }
    },

    async attemptReauthentication({ commit }: any) {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      if (token && user) {
        commit("SET_TOKEN", token);
        commit("SET_USER", JSON.parse(user));
      }
    },

    async signOut({ dispatch }: any) {
      await axios.post("logout");
      dispatch("invalidateToken");
      router.push({ name: "Home" });
    },

    async register({ commit }: any, form: Registration) {
      const response = await axios.post("register", form);

      if (response.data.success) {
        commit("SET_TOKEN", response.data.data.access_token);
        commit("SET_USER", response.data.data.customer);
      } else {
        console.log("Registration failed");
      }
    },

    invalidateToken({ commit }: any) {
      commit("SET_TOKEN", null);
      commit("SET_USER", null);
    },

    updateUser({ commit }: any, user: any) {
      commit("SET_USER", user);
    }
  }
};
