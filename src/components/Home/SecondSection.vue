<template>
  <v-carousel

      cycle
      height="400"
      hide-delimiter-background
      show-arrows-on-hover

      v-model="model">
    <v-carousel-item
        v-for="(color, i) in colors"
        :key="color"
    >
      <v-sheet
          :color="color"
          height="100%"
          tile
      >
        <v-row
            class="fill-height"
            align="center"
            justify="center"
        >
          <div class="display-3">
            Slide {{ i + 1 }}
          </div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
name: "SecondSection",
  data: () => ({
    model: 0,
    colors: [
      'primary',
      'secondary',
      'yellow darken-2',
      'red',
      'orange',
    ],
  }),
}
</script>

<style scoped>

</style>