<template>
  <div class="dashboard">
    <table>
      <tbody>
        <tr v-for="(x,xIndex) in getGridLayout.length" :key="xIndex">
          <td :ref="'td_' + xIndex + '' + yIndex" v-for="(y,yIndex) in getGridLayout[xIndex].length" 
              v-if="getGridLayout[xIndex][yIndex].display !== 'none'"
              :key="yIndex"
              :panelId ="getGridLayout[xIndex][yIndex].panelId"
              :rowSpan="getGridLayout[xIndex][yIndex].rowSpan"
              :colSpan="getGridLayout[xIndex][yIndex].colSpan">
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
import 'vue-c3/docs/src/c3.min.css';
//Getters
import { mapGetters } from 'vuex';

export default {
  name: 'dashboard',
  components: { VueC3 },
  data()
  {
    return{
      handlers: [],
      iterator: 1
    }
  },
  created: function()
  {
    this.resetHandlers();
    window.addEventListener('resize',this.resizeCells);
  },
  mounted: function()
  {
    this.generateC3();
  },
  beforeDestroy: function()
  {
    window.removeEventListener('resize',this.resizeCells);
  },
  computed:
  {
    ...mapGetters(['getGridLayout','getPanelsConfig'])
  },
  methods:
  {
    resetHandlers: function()
    {  
      for(var x=0; x < this.getGridLayout.length; x++)
      {
        if(!Array.isArray(this.handlers[x])) //if array does not exist
          this.handlers[x] = [];

        for(var y=0; y < this.getGridLayout[x].length; y++)
        {
          if(!this.handlers[x][y]) //if object does not exist
            this.handlers[x][y] = new Vue();
        }
      }
    },
    hideCells: function(bool)
    {
      var cells = this.$refs;

      //hide content
      for(var name in cells)
      {
        if(!cells[name][0])
          continue;
        
        var cell = cells[name][0];
        
        bool ? cell.classList.add('hide') : cell.classList.remove('hide');
      }
    },
    resizeCells: function()
    {
      var cells = this.$refs;

      //hide content
      this.hideCells(true);

       for(var x=0; x < this.handlers.length; x++)
          for(var y=0; y < this.handlers[x].length; y++)
          {

            if(!cells["td_" + x + y])
              continue;

            //get cell
            var cell = cells["td_" + x + y][0];

            if(!cell)
              continue;

            function resize(chart)
            {
              chart.resize({
                height: cell.clientHeight * 0.9,
                width: cell.clientWidth * 0.9
              });
            }

            this.handlers[x][y].$emit('dispatch', resize);
          }

      //unhide content
      this.hideCells(false);
    },
    generateC3: function()
    {
      var cells = this.$refs;

      //hide content
      this.hideCells(true);

      for(var x=0; x < this.handlers.length; x++)
          for(var y=0; y < this.handlers[x].length; y++)
          {

            if(!cells["td_" + x + y])
              continue;

            //get cell
            var cell = cells["td_" + x + y][0];

            if(!cell)
              continue;

            //get config
            let panelId = cell.getAttribute("panelId");

            if(!panelId)
              continue;

            var config = this.getPanelsConfig[panelId];

            var options = 
            {
              size:
              {
                height: cell.clientHeight * 0.9,
                width: cell.clientWidth * 0.9
              },
              data: config.c3.data //TODO: EXTEND OPTIONS VAR WITH CONFIG
            }

            this.handlers[x][y].$emit('init',options);
          }

          //unhide content
          this.hideCells(false);

          this.iterator++;
    }
  },
  watch:
  {
    getGridLayout: function()
    {
      //reset & read gridLayout config
      this.resetHandlers();
      //wait for dom to render and then generate C3
      this.$nextTick(function() 
                    { 
                      this.generateC3();
                    });
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

table td > div, table td > div > svg
{
  margin: auto;
  max-width: 1000% !important;
  max-height: 90% !important;
}

table td.hide > div
{
  display: none !important;
}

</style>
