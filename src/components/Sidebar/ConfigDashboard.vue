<template>
  <div class="configure-separator">
    <h1>HEY!</h1>
    <table :id="gridChooser.tableId" class="grid-chooser">
      <tr v-for="(x,index) in gridChooser.numRows" :key="index">
        <td v-for="(y,index) in gridChooser.numCols" :key="index">
          <div @mouseover="hoverFX(x,y)"
               @click="selectGrid(x,y)">
          </div>
        </td>
      </tr>
    </table>
    <table :id="gridLayout.tableId">
      <tr v-for="(x,index) in gridLayout.numRows" :key="index">
        <td v-for="(y,index) in gridLayout.numCols" :key="index">
        </td>
      </tr>
    </table>
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
        numRows: 5,
        numCols: 5
      },
      gridLayout:
      {
        tableId: "gridConfigTable",
        numRows: 0,
        numCols: 0
      }
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

    }
  }
}
</script>

<style scoped lang="scss">

@import './table-merger/table-merger.css';

.configure-separator
{
  width: 90%;
  height: 90%;
}

table.grid-chooser
{
  table-layout: fixed;
  width: 90%;
  height: 25%;
  cursor: pointer;
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

</style>
