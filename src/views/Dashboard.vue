<template>
  <div>
    <h1>Homepage</h1>
    <table>
      <tbody>
        <tr v-for="(x,xIndex) in getGridLayout.length" :key="xIndex">
          <td v-for="(y,yIndex) in getGridLayout[xIndex].length" :key="yIndex">
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

table td
{
  border: 1px solid $main-text-color;
}

</style>
