<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app v-if="state.currentUser">
      <v-list dense>
        <template v-for="tab in tabs">
          <v-list-item :key="tab.text" link @click="tab.path !== $route.path && $router.push(tab.path)">
            <v-list-item-action>
              <v-icon>{{ tab.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ tab.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        <template v-if="state.currentUser">
        <v-divider></v-divider>
        <v-list-item link @click="logOut">
            <v-list-item-action>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Log Out</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
      </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app dark v-if="state.currentUser">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span>{{$route.name}}</span>
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <router-view/>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { State } from "@/state";

export default {
  data: () => ({
    dialog: false,
    drawer: null
  }),
  computed: {
    state () {
      return State
    },
    tabs () {
      return this.$router.options.routes
        .filter(function (route) {
          if (route.name && route.icon && route.showInNavBar) {
            if (route.meta && route.meta.requiresAuth && !this.state.currentUser) {
              // don't show this route
              return false
            }
            // fall through
            return true
          } else {
            return false
          }
        }.bind(this))
    }
  },
  methods: {
    logOut () {
      this.state.currentUser = undefined;
      this.$router.go("/");
    }
  }
};
</script>

<style>
html {
  overflow-y: auto !important;
}

.row {
    margin-right: 0px !important;
}
</style>