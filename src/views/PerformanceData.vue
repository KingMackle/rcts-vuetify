<template>
  <v-container class="grey lighten-5">
    <v-row justify="end">
      <v-col lg="12" md="12" sm="12" class="py-0">
        <v-btn id="pushBtn" color="success" class="mx-2" @click="pass">
          <v-icon left>mdi-check</v-icon>Pass
        </v-btn>
        <v-btn color="error" @click="fail">
          <v-icon left>mdi-close</v-icon>Fail
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="parameter in parameters"
        :lg="parameter.isLocation ? 'auto': 6"
        md="12"
        sm="12"
        :key="parameter.name">
        <parameter-card
          :name="parameter.name"
          :values="parameter.values"
          :unit="parameter.unit || ''"
          :isLocation="parameter.isLocation || false"
        ></parameter-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ParameterCard from "@/components/ParameterCard";
export default {
  name: "PerformanceData",
  components: {
    ParameterCard
  },
  props: {
    parameters: {
      type: Object,
      default: function() {
        return {
          cp: {
            name: "Compression Pressure",
            values: [],
            unit: "cm"
          },
          cd: {
            name: "Compression Depth",
            values: [],
            unit: "cm"
          },
          recoil: {
            name: "Recoil",
            values: [],
            unit: "cm"
          },
          location: {
            name: "Location",
            values: [],
            isLocation: true
          }
        };
      }
    }
  },
  methods: {
    pass() {
      this.$router.back();
    },
    fail() {
      this.$router.back();
    }
  }
};
</script>

<style scoped>

</style>