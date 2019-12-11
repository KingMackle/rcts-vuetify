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
  props: {
    name: {
      type: String,
      default: "Compression Depth"
    },
    values: Array,
    isLocation: {
      type: Boolean,
      default: false
    },
    run: {
      type: Boolean,
      default: true
    },
    unit: String
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

      return Math.ceil(sum / length);
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
        this.ctx.translate(
          this.$refs.canvas.width / 2,
          this.$refs.canvas.height / 2
        );
      }
      return this.ctx;
    },
    createInterval() {
      if (this.run) {
        this.interval = setInterval(
          function() {
            let val = this.isLocation
              ? [parseInt(Math.random() * 40), parseInt(Math.random() * 40)]
              : parseInt(Math.random() * 10);
            this.values.push(val);
            this.values.splice(0, Math.floor(this.values.length / 21));
            this.darwTicks();
          }.bind(this),
          1000
        );
      }
    },
    darwTicks() {
      let context = this.getCanvasContext();
      context.save();
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(
        0,
        0,
        this.$refs.canvas.width,
        this.$refs.canvas.height
      );
      // Restore the transform
      context.restore();
      this.values.every(function(point) {
        //ctx.translate(canvas.width/4, canvas.height/4);
        context.beginPath();
        context.arc(point[0], point[1], 5, 0, 2 * Math.PI, false);
        context.fillStyle = "red";
        context.fill();
        context.closePath();
        return true;
      });
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