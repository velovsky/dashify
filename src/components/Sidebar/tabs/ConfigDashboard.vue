<template>
  <div class="configure-separator">
    <!-- <div class="configure-content"> -->
    <vue-scrollbar class="configure-content" ref="scrollbar"> 
        <div style="min-width:100%">
          <h2>Dashboard Setup</h2>
          <table 
            :id="gridChooser.tableId" 
            :style="{ width: gridChooser.numRows * gridChooser.cellWidth + 'px',
            height: gridChooser.numRows * gridChooser.cellWidth + 'px'}"  
            class="grid-chooser">
            <tr v-for="(x,index) in gridChooser.numRows" :key="index">
              <td v-for="(y,index) in gridChooser.numCols" :key="index">
                <div @mouseover="hoverFX(x,y)"
                    @click="selectGrid(x,y)">
                </div>
              </td>
            </tr>
          </table>
          <table :id="gridLayout.tableId" class="grid-layout">
            <tbody>
              <tr v-for="(x,xIndex) in gridLayout.numRows" :key="xIndex">
                <td v-for="(y,yIndex) in gridLayout.numCols" 
                  :key="yIndex"
                  @click="selectedCell">
                </td>
              </tr>
            </tbody>
          </table>
      </div>
    </vue-scrollbar>
    <!-- </div> -->
    <div class="config-menu">
      <MdcButton v-ripple raised primary
              v-for="(config,index) in configs" 
              :key="index"
              @click="config.clickClb">
        {{ config.uiName }}
      </MdcButton>
    </div>
  </div>
</template>

<script>
import VueScrollbar from 'vue2-scrollbar'
import 'vue2-scrollbar/dist/style/vue2-scrollbar.css'
import jQuery from 'jquery'
import tableMerger from './table-merger/table-merger.js'
//Getters
import { mapGetters } from 'vuex';

export default {
  name: 'configdashboard',
  components: { VueScrollbar },
  data()
  {
    return{
      gridChooser: 
      {
        tableId: "gridChooserTable",
        cellWidth: 28, //px
        numRows: 4,
        numCols: 4
      },
      gridLayout:
      {
        tableId: "gridConfigTable",
        numRows: 0,
        numCols: 0
      },
      configs:
      [
        {uiName: "MERGE", mdlIcon: "", clickClb: this.merge},
        {uiName: "SAVE", mdlIcon: "", clickClb: this.save}
      ]
    }
  },
  created: function()
  {
    //restore grid state for config
    if(this.getGridLayout.length === 0)
      return;

    this.gridLayout.numRows = this.getGridLayout.length;
    this.gridLayout.numCols = this.getGridLayout[0].length;
  },
  mounted: function()
  {
    //set merge state
    var layoutTable = document.getElementById(this.gridLayout.tableId);
    var tr = jQuery(layoutTable).find("tr");
    for(var i=0; i < tr.length; i++)
    {
      var cells = jQuery(tr[i]).find("td");
      for(var j=0; j < cells.length; j++)
      {
        cells[j].setAttribute("rowSpan",this.getGridLayout[i][j].rowSpan);
        cells[j].setAttribute("colSpan",this.getGridLayout[i][j].colSpan);
        cells[j].style.display = this.getGridLayout[i][j].display;
      }
    }
  },
  computed:
  {
    ...mapGetters(['getGridLayout'])
  },
  methods:
  {
    hoverFX: function(x,y)
    {
      var table = document.getElementById(this.gridChooser.tableId); //get table
      jQuery(table).find("td").removeClass("selected"); //remove selected
      var tr = table.children;

      //update selected nodes
      for(var i=0; i < x; i++)
      {
        var td = tr[i].children;
        for(var j=0; j < y; j++)
        {
          td[j].classList.add("selected");
        }
      }
    },
    selectGrid: function(x,y)
    {
      //reset table state
      var layoutTable = document.getElementById(this.gridLayout.tableId);
      tableMerger.restoreOriginal(layoutTable);

      this.gridLayout.numRows = x;
      this.gridLayout.numCols = y;
    },
    selectedCell: function(event)
    {
      event.currentTarget.classList.toggle('selected');
    },
    merge: function()
    {
      var layoutTable = document.getElementById(this.gridLayout.tableId);
      tableMerger.merge(layoutTable);
    },
    save: function()
    {
      if(this.gridLayout.numRows === 0 || this.gridLayout.numCols === 0)
        return; //ignore

      //reset
      var currentConfig = [];

      var layoutTable = document.getElementById(this.gridLayout.tableId);
      var tr = jQuery(layoutTable).find("tr");

      for(var i=0; i < tr.length; i++) //row
      {
        var row = [];
        var cells = jQuery(tr[i]).find("td");
        
        for(var j=0; j < cells.length; j++) //cells
        {
          var obj = { cellIndex: undefined, rowSpan: undefined, colSpan: undefined, panelId: undefined, display: "none" };
          
          for(var prop in obj)
            obj[prop] = cells[j][prop];
          
          obj.display = getComputedStyle(cells[j], null).display;

          row.push(obj);
        }
        currentConfig.push(row);
      }
      //update state
      this.$store.commit('updateGridLayoutConfig',currentConfig);
      //go to dashboard
      this.$router.push({ name: 'Dashboard' });
    }
  }
}
</script>

<style scoped lang="scss">

@import './table-merger/table-merger.css';

$config-menu-height: 60px;

.configure-separator
{
  width: 100%;
  height: 100%;
}

.configure-separator .configure-content
{
  max-height: calc( 100% - #{$config-menu-height});
  background-color: inherit;
  // overflow-x: hidden;
  // overflow-y: hidden;
}

.configure-separator .config-menu
{
  max-height: $config-menu-height;
  margin-top: 15px;
  text-align: center;
}

.configure-separator .config-menu button
{
  width: 45%;
}

.configure-separator .config-menu button:nth-child(1)
{
  margin-right: 5%;
}

%table-setup
{
  table-layout: fixed;
  margin: auto;
  cursor: pointer;
}

//Grid Chooser
table.grid-chooser
{
  @extend %table-setup;
}

table.grid-chooser td div
{
  padding: 8px;
  margin: 2px;
  border: 1px solid $main-text-color;
}

table.grid-chooser td.selected div,
table.grid-chooser td div:hover
{
  border-color: $secondary-color;
}

//Grid Layout
table.grid-layout
{
  @extend %table-setup;
  margin-top: 15px;
  border-spacing: 10px;
  border-collapse: separate;
  width: 98%;
  height: 300px;
}

table.grid-layout td
{
  @include fade-in-animation($sidebar-table-config-time);
  text-align: center;
  border: 1px solid $main-text-color;
}

table.grid-layout td.selected
{
  border-color: $secondary-color;
}

</style>
