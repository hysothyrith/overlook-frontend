/* eslint-disable @typescript-eslint/camelcase */
import router from "@/router";
import axios from "axios";
import Vue from "vue";

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
        Vue.notify({
          group: "ovl-notification-center",
          title: "Sign-In Successfull",
          type: "success",
          text: "Welcome back to Overlook."
        });
        router.back();
      } else {
        Vue.notify({
          group: "ovl-notification-center",
          title: "Sorry",
          type: "error",
          text: "Your credentials do not match our records. Please try again."
        });
        credentials.password = "";
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
      try {
        const response = await axios.post("register", form);

        if (response.data.success) {
          commit("SET_TOKEN", response.data.data.access_token);
          commit("SET_USER", response.data.data.customer);
          Vue.notify({
            group: "ovl-notification-center",
            title: "Registration Successfull",
            type: "success",
            text: "Welcome to the Overlook hotels."
          });
          router.back();
        } else {
          Vue.notify({
            group: "ovl-notification-center",
            title: "Sorry, registration failed",
            type: "error",
            text:
              "There is already an Overlook account with this email address."
          });
        }
      } catch (error) {
        Vue.notify({
          group: "ovl-notification-center",
          title: "Sorry, registration failed",
          type: "error",
          text:
            "Please complete the form to register for an Overlook account. Your password should be 8 characters or longer."
        });
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
