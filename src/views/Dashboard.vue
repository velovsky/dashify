<template>
  <div class="dashboard">
    <table>
      <tbody>
        <tr v-for="(x,xIndex) in getGridLayout.length" :key="xIndex">
          <td :ref="'td_' + xIndex + '' + yIndex" v-for="(y,yIndex) in getGridLayout[xIndex].length" 
              v-if="getGridLayout[xIndex][yIndex].display !== 'none'"
              :key="yIndex"
              :panelId="getGridLayout[xIndex][yIndex].panelId"
              :rowSpan="getGridLayout[xIndex][yIndex].rowSpan"
              :colSpan="getGridLayout[xIndex][yIndex].colSpan">
              <div v-if="getGridLayout[xIndex][yIndex].panelId" class="header">
                <div class="info">
                  <div class="circle"></div>
                  <span>{{ uiName(getGridLayout[xIndex][yIndex].panelId) }}</span>
                </div>
                <div class="more-options">
                  <span><i class="material-icons">more_horiz</i></span> <!-- TODO: menu -->
                </div>
              </div>
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
      handlers: []
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
    ...mapGetters(['getGridLayout','getPanelsConfig','getPanelsList'])
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
    uiName: function(panelId)
    {
      if(!panelId)
        return "N/A";
      
      var element = this.getPanelsList.find( (el) => el.id === panelId );
      return element.uiName.toUpperCase();
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

            var size = this.computeSize(cell);

            function resize(chart)
            {
              chart.resize({
                height: size.height,
                width: size.width
              });
            }

            this.handlers[x][y].$emit('dispatch', resize); //TODO: maybe (also) create method for c3 resize

            this.updateAxisTick(this.handlers[x][y]);
          }

      //unhide content
      this.hideCells(false);
    },
    updateAxisTick: function(handler)
    {
      var refHeight = 258; //px
      var tickY = 4;
      var refWidth = 500; //px
      var tickX = 5;

      function setTick(chart)
      {
        //y
        let newHeight = chart.internal.currentHeight;
        let newTickY = Math.floor( newHeight * tickY/refHeight );
        if(newTickY < 1) newTickY = 1;
        
        chart.internal.config.axis_y_tick_count = newTickY;
        chart.internal.config.axis_y_tick_format = chart.internal.d3.format('.0f');

        //x
        let newWidth = chart.internal.currentWidth;
        let newTickX = Math.floor( newWidth * tickX/refWidth );
        if(newTickX < 1) newTickX = 1;

        chart.internal.config.axis_x_tick_count = newTickX;
        chart.internal.config.axis_x_tick_format = chart.internal.d3.format('.1f');

        chart.flush(); //refresh
      }

      handler.$emit('dispatch', setTick);
    },
    computeSize: function(cell)
    {
      var _height = cell.clientHeight;
      var _width = cell.clientWidth - 10;

      //header: only affects height
      var header = cell.querySelector(".header");
      var style = header.currentStyle || window.getComputedStyle(header);
      _height -= ( parseInt(style.height) + parseInt(style.marginTop) + parseInt(style.marginBottom) );

      var size = 
      {
        height: _height,
        width: _width
      }

      return size;
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
              size: this.computeSize(cell)
            }

            options = Object.assign(config.c3,options); //extend

            this.handlers[x][y].$emit('init',options);
            this.updateAxisTick(this.handlers[x][y]);
          }

      //unhide content
      this.hideCells(false);
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

table td .header
{
  display: flex;
  justify-content: space-between;
  color: white;
  font-weight: 600;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 15px;
}

table .header .more-options
{
  color: $secondary-color;
  margin-right: 10px;
  cursor: pointer;
}

table .header .info
{
  display: flex;
}

table .header .info .circle
{
  width: 18px;
  height: 18px;
  background: $secondary-color;
  -moz-border-radius: 50px;
  -webkit-border-radius: 50px;
  border-radius: 10px;
  vertical-align: middle;
}

table .header .info span
{
  padding-left: 10px;
}

// table td > div, table td > div > svg
// {
//   margin: auto;
//   max-width: 1000% !important;
//   max-height: 90% !important;
// }

table td.hide > div:last-child
{
  display: none !important;
}

</style>
