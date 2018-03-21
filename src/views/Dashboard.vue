<template>
  <div class="dashboard">
    <table>
      <tbody>
        <tr v-for="(x,xIndex) in getGridLayout.length" :key="xIndex">
          <td v-for="(y,yIndex) in getGridLayout[xIndex].length" 
              :key="yIndex"
              :rowSpan="getGridLayout[xIndex][yIndex].rowSpan"
              :colSpan="getGridLayout[xIndex][yIndex].colSpan"
              :style="{ display: getGridLayout[xIndex][yIndex].display }">
              <vue-c3 :handler="handlers[xIndex][yIndex]"></vue-c3>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Vue from 'vue'
//C3
import VueC3 from 'vue-c3'
require('vue-c3/docs/src/c3.min.css');
//Getters
import { mapGetters } from 'vuex';

export default {
  name: 'dashboard',
  components: { VueC3 },
  data()
  {
    return{
      handlers: []
    }
  },
  created: function()
  {
    this.resetHandlers();
  },
  mounted: function()
  {
    this.generateC3();
  },
  computed:
  {
    ...mapGetters(['getGridLayout'])
  },
  methods:
  {
    resetHandlers: function()
    {
      this.handlers = [];

      for(var x=0; x < this.getGridLayout.length; x++)
      {
        this.handlers[x] = [];
        for(var y=0; y < this.getGridLayout[x].length; y++)
          this.handlers[x][y] = new Vue();
      }
    },
    generateC3: function()
    {
      const options = 
      {
        data: 
        {
            columns: 
            [
              ['data1', 2, 4, 1, 5, 2, 1],
              ['data2', 7, 2, 4, 6, 10, 1]
            ],
          }
      }

      for(var x=0; x < this.handlers.length; x++)
          for(var y=0; y < this.handlers[x].length; y++)
            this.handlers[x][y].$emit('init',options);
      }
  },
  watch:
  {
    getGridLayout: function()
    {
      //reset & read gridLayout config
      this.resetHandlers();
      //wait for dom to render and generate C3
      this.$nextTick(function() { this.generateC3(); });
    }
  }
}
</script>

<style lang="scss" scoped>

.dashboard
{
  height: 100%;
  width: 100%;
}

table
{
  height: 100%;
  width: 100%;
  border-spacing: 20px;
}

table td
{
  border-radius: 5px;
  background-color: #344555;
  box-shadow: 0px 0px 7px 4px $box-shadow-color;
}

</style>
