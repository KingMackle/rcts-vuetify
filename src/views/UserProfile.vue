<template>
    <v-container class="container">
          <v-avatar id="v-avatar" :color="randomColor()">
            <span id= "headline" class="white--text headline">{{initials}}</span>
          </v-avatar>
          <br><br>
          <v-text-field
            class="v-text-field"
            v-model="form.name"
            label="Name"
            readonly>
          </v-text-field>
          <v-text-field
            v-model="form.email"
            label="Email"
            readonly>
          </v-text-field>
          <v-text-field
            v-model="form.id"
            label="ID"
            readonly>
          </v-text-field>
          <v-text-field
            v-model="form.location"
            label="Location"
            readonly>
          </v-text-field>
          <v-text-field
            v-if="currentUser.type === 'trainer'"
            v-model="currentUser.experienceLevel"
            label="Experience Level"
            readonly>
          </v-text-field>
          <v-text-field
            v-if="currentUser.type === 'trainee'"
            v-model="currentUser.educationBackground"
            label="Education Background"
            readonly>
          </v-text-field>
    </v-container>
</template>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
  }
  .v-text-field {
    width: 40%;
    max-width: 100%;
  }
  .v-avatar {
        width: 96px !important;
        height: 96px !important;
  }
</style>

<script>
  import { State } from "@/state";
  export default {
    pageTitle: 'User Profile',
    data () {
      return {
        currentUser: State.currentUser,
        form: {
            name: State.currentUser.name,
            email: State.currentUser.email,
            id: State.currentUser.id,
            location: State.currentUser.location
        },
      }
    },
    computed: {
        initials: function () {
            return this.currentUser.name.replace(/[^a-zA-Z- ]/g, "").match(/\b\w/g).join('').toUpperCase();
        }
    },
    methods: {
      randomColor() {
        let colors = ['000000','3C00E0','0069c0','cddc39', 'f57f17', '4dd0e1', 'ff3d00', '546e7a', 'ff4081', 'ea80fc', '9c27b0', 'f50057', '3F51B5',
        '795548', 'FF5722', 'FBC02D', 'FFA000', 'FFEB3B']

        return '#' + colors[Math.floor(Math.random() * colors.length)];
      }
    }
  }
</script>