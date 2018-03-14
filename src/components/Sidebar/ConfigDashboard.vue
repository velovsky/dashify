<template>
  <div class="configure-separator">
    <div class="configure-content">
      <h2>Dashboard Setup</h2>
      <table 
        :id="gridChooser.tableId" 
        :style="{ width: gridChooser.numRows * gridChooser.cellWidth + 'px', height: gridChooser.numRows * gridChooser.cellWidth + 'px'}"  
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
          <tr v-for="(x,index) in gridLayout.numRows" :key="index">
            <td v-for="(y,index) in gridLayout.numCols" 
              :key="index"
              @click="selectedCell">
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="config-menu">
      <button v-for="(config,index) in configs" 
              :key="index"
              @click="config.clickClb">
        {{ config.uiName }}
      </button>
    </div>
  </div>
</template>

<script>
import jQuery from 'jquery'
import tableMerger from './table-merger/table-merger.js'

export default {
  name: 'configdashboard',
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
        {uiName: "SAVE", mdlIcon: "", clickClb: this.test}
      ]
    }
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
      this.gridLayout.numRows = x;
      this.gridLayout.numCols = y;
    },
    selectedCell: function(event)
    {
      event.currentTarget.classList.toggle('selected');
    },
    merge: function()
    {
      console.log(this);
      tableMerger.table_merger('#'+this.gridLayout.tableId);
    },
    test: function()
    {
      console.log("OK");
    }
  }
}
</script>

<style scoped lang="scss">

@import './table-merger/table-merger.css';

$config-menu-height: 50px;

.configure-separator
{
  width: 100%;
  height: 100%;
}

.configure-separator .configure-content
{
  height: calc( 100% - #{$config-menu-height});
  overflow-x: hidden;
  overflow-y: auto;
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
  border-color: $thirdary-color;
}

//Grid Layout
table.grid-layout
{
  @extend %table-setup;
  margin-top: 20px;
  border-spacing: 10px;
  border-collapse: separate;
  width: 98%;
  height: 300px;
}

table.grid-layout td
{
  text-align: center;
  border: 1px solid $main-text-color;
}

table.grid-layout td.selected
{
  border-color: $thirdary-color;
}

</style>
