<template>
  <div class="dashboard">
    <!-- <h1>Homepage</h1> -->
    <table>
      <tbody>
        <tr v-for="(x,xIndex) in getGridLayout.length" :key="xIndex">
          <td v-for="(y,yIndex) in getGridLayout[xIndex].length" 
              :key="yIndex"
              :rowSpan="getGridLayout[xIndex][yIndex].rowSpan"
              :colSpan="getGridLayout[xIndex][yIndex].colSpan"
              :style="{ display: getGridLayout[xIndex][yIndex].display }">
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
//Getters
import { mapGetters } from 'vuex';

export default {
  name: 'dashboard',
  data()
  {
    return{

    }
  },
  computed:
  {
    ...mapGetters(['getGridLayout'])
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
