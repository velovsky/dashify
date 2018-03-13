<template>
  <div class="configure-separator">
    <h1>HEY!</h1>
    <table class="grid-chooser">
      <tr v-for="(n,index) in gridChooser.numRows" :key="index">
        <td v-for="(n,index) in gridChooser.numCols" :key="index">
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import tableMerger from './table-merger/table-merger.js';

export default {
  name: 'configdashboard',
  data()
  {
    return{
      gridChooser: 
      {
        numRows: 5,
        numCols: 5
      }
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
  width: 85%;
  height: 25%;
  cursor: pointer;
}

table.grid-chooser td
{
  padding: 2px;
  border: 1px solid #ccc;
}

</style>
