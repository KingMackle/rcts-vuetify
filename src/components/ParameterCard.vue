<template>
  <v-card class="mx-auto" color="grey lighten-4">
    <template v-if="isLocation">
      <v-card-title>
        <v-row align="start">
          <div class="caption grey--text text-uppercase">{{name}}</div>
        </v-row>
      </v-card-title>
      <v-card-text>
          <v-sheet>
          <canvas id="canvas" ref="canvas" width="400px" height="400px"></canvas>
        </v-sheet>
      </v-card-text>
    </template>
    <template v-else>
      <v-card-title>
        <v-row align="start">
          <div class="caption grey--text text-uppercase">{{name}}</div>
          <v-spacer />
          <div class="ml-6">
            <span class="display-2 font-weight-black" v-text="avg || '—'"></span>
            <strong v-if="avg">{{unit}}</strong>
          </div>
        </v-row>
      </v-card-title>
              <v-card-text>
      <v-sheet color="transparent">
        <v-sparkline
          :key="String(avg)"
          :smooth="16"
          :gradient="gradient"
          :line-width="1"
          :value="values"
          stroke-linecap="round"
        ></v-sparkline>
      </v-sheet>
            </v-card-text>

    </template>
  </v-card>
</template>

<script>
export default {
    name: "ParameterCard",
  props: {
    name: String,
    values: Array,
    unit: String,
    isLocation: {
      type: Boolean,
      default: !false
    },
    run: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      gradient: ["#f72047", "#ffd200", "#1feaea"],
      interval: undefined,
      ctx: undefined
    };
  },

  computed: {
    avg() {
      const sum = this.values.reduce((acc, cur) => acc + cur, 0);
      const length = this.values.length;

      if (!sum && !length) return 0;

      return parseFloat((sum / length).toFixed(1));
    }
  },
  watch: {
    run: function(newVal, oldVal) {
      if (newVal === false) {
        clearInterval(this.interval);
        this.interval = undefined;
      } else if (!this.interval) {
        this.createInterval();
      }
    }
  },
  methods: {
    getCanvasContext() {
      if (!this.ctx) {
        this.ctx = this.$refs.canvas.getContext("2d");
      }
      return this.ctx;
    },
    createInterval() {
      if (this.run) {
        this.interval = setInterval(
          function() {
            let val = this.isLocation
              ? [this.getRandom(300, 100), this.getRandom(300, 100)]
              : this.getRandom(10);
            this.values.push(val);
            this.values.splice(0, Math.floor(this.values.length / 21));
            if (this.isLocation) {
                this.darwTicks();
            }
          }.bind(this),
          1000
        );
      }
    },
    darwTicks() {
      let context = this.getCanvasContext();
      context.clearRect(
        0,
        0,
        this.$refs.canvas.width,
        this.$refs.canvas.height
      );
      this.values.forEach(function(point) {
        //ctx.translate(canvas.width/4, canvas.height/4);
        context.beginPath();
        context.arc(point[0], point[1], 5, 0, 2 * Math.PI, false);
        context.fillStyle = "red";
        context.fill();
        context.closePath();
      });
    },
    getRandom(max, min = 0) {
        return parseFloat((Math.random() * (max - min) + min).toFixed(2));
    }
  },
  created() {
    this.values = this.values || [];
    this.createInterval();
  }
};
</script>

<style scoped>
#canvas {
  background-image: url(../assets/grid.png);
  background-size: cover;
}
</style>