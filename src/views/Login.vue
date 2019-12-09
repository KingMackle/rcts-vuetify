<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Remote CPR Training System</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form :v-model="valid" ref="form" lazy-validation autocomplete="off">
              <v-text-field
                id="email"
                label="Email Address"
                name="email"
                prepend-icon="mdi-email"
                type="text"
                v-model="email"
                :rules="[rules.required]"
                required
                @keyup.enter="logIn"/>

              <v-text-field
                id="password"
                label="Password"
                name="password"
                v-model="password"
                prepend-icon="mdi-lock"
                :append-icon="unmask ? 'mdi-eye' : 'mdi-eye-off'"
                :type="unmask ? 'text' : 'password'"
                :rules="[rules.required]"
                @click:append="unmask = !unmask"
                required
                @keyup.enter="logIn"/>
            </v-form>
            <v-subheader class="red--text" v-show="!isValidUser">Email address and Password do not match!</v-subheader>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="logIn">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { State } from "@/state";
export default {
  name: "Login",
  data() {
    return {
      unmask: false,
      valid: true,
      isValidUser: true,
      email: "",
      password: "",
      rules: {
        required: value => (!!value && !!value.trim()) || "Required",
        email: value =>
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
            value
          ) || "Email address is not valid",
        password: value =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(
            value
          ) || "Password doesn't meet password standards"
      }
    };
  },
  methods: {
    logIn() {
      if (this.$refs.form.validate()) {
        let currentUser = State.users.filter(
          function(user) {
            return user.email === this.email && user.password === this.password;
          }.bind(this)
        );
        if (currentUser.length > 0) {
          State.currentUser = currentUser;
          this.isValidUser = true;
          this.$router.push(this.$route.query.redirect);
        } else {
          this.isValidUser = false;
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>