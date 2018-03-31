<template>
  <div class="configure-separator">
    <!-- <div class="configure-content"> -->
    <div class="overlay-page"
         v-if="page.overlayed">
    </div>
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
                  <div @click="configPanel">
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
      </div>
    </vue-scrollbar>
    <!-- </div> -->
    <div class="config-menu">
      <mdc-button raised
              v-for="(config,index) in configs" 
              :key="index"
              @click="config.clickClb">
        {{ config.uiName }}
      </mdc-button>
    </div>
    <div ref="popup" 
         style="display: none"
         class="panel-pop-up">
      <div class="window-ui">
        <mdc-button raised
          @click="page.popup.header.clickClb">
          <i class="material-icons">{{page.popup.header.mdlIcon}}</i>
        </mdc-button>
      </div>
      <div class="window-body">
        <mdc-select v-model="page.popup.body.selected" label="Select Panel">
          <mdc-option v-for="(list,index) in getPanelsList" :value="list.id" :key="index">
            {{ list.uiName }}
          </mdc-option>
        </mdc-select>
        <span>Selected: {{ page.popup.body.selected }}</span>
        <!-- <div>More Options....</div>
        <div class="radios">
          <mdc-radio v-model="answer" value="a" name="radios" label="Yes for sure"  />
          <mdc-radio v-model="answer" value="b" name="radios" label="definitely NO!" />
          <mdc-radio v-model="answer" value="c" name="radios" label="I guess"  checked />
        </div>
        <span>Answer: {{ answer }}</span> -->
      </div>
      <div class="window-submit">
        <mdc-button raised
          @click="page.popup.submit.clickClb">
            {{ page.popup.submit.uiName }}
        </mdc-button>
      </div>
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
      answer: '',
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
      ],
      page:
      {
        overlayed: false,
        popup: 
        {
          elementConfig: {},
          header: {uiName: "CLOSE", mdlIcon: "close", clickClb: this.closePanel},
          body: {selected: undefined},
          submit: {uiName: "SUBMIT", mdlIcon: "", clickClb: this.submitPanel}
        }
      }
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
    ...mapGetters(['getGridLayout','getPanelsList'])
  },
  methods:
  {
    configPanel: function(event)
    {
      event.stopPropagation();

      this.page.overlayed = true;

      //set overlay and pop up config window
      var popup = jQuery(this.$refs.popup);
      popup.fadeIn(500); //TODO: for some reason css fade in animation isn't working

      this.page.popup.elementConfig = event.currentTarget.parentElement; //assign td element to config menu
      this.page.popup.body.selected = this.page.popup.elementConfig.panelId;
    },
    submitPanel: function()
    {
      if(!this.page.popup.body.selected) //ignore TODO: emit warning => no panel selected
        return;

      //update panel config
      this.page.popup.elementConfig.panelId = this.page.popup.body.selected; //update panel ID

      //panel configed then fill it
      this.page.popup.elementConfig.querySelector("div").classList.add("filled");

      //close panel
      this.closePanel();
    },
    closePanel: function()
    {
      var popup = jQuery(this.$refs.popup);
      popup.fadeOut(500,function(){ this.page.overlayed = false }.bind(this)); //TODO: for some reason css fade in animation isn't working
    },
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
  height: calc( 100% - #{$config-menu-height});
  background-color: inherit;
  overflow-x: hidden;
  overflow-y: hidden;
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

table.grid-layout td div.filled
{
  background: linear-gradient(to top, $secondary-color 34%, $thirdary-color 65%);
}

table.grid-layout td div
{
  width: 10px;
  height: 10px;
  border: 1px solid $secondary-color;
  -moz-border-radius: 5px;
  background: linear-gradient(to top, rgba(0,0,0,0) 34%, $thirdary-color 65%);
  background-size: 100% 300%;
  background-position: left bottom;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: auto;
  transition: all 0.5s linear;
}

table.grid-layout td div:hover
{
  border-color: $thirdary-color;
  background-position: right top;
}

table.grid-layout td.selected
{
  border-color: $secondary-color;
}

//Pop UP
$header-height: 36px;
$submit-menu: 40px;

.panel-pop-up
{
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: #344555;
  position: fixed;
  top: 0%;
  left: 0%;
  margin-top: 10vh;
  margin-left: 18vw;
  height: 80vh;
  width: 72vw;
  z-index: 3;
}

.panel-pop-up .window-ui
{
  display: flex;
  flex-direction: row-reverse;
  height: $header-height;
  width: 100%;
}

.panel-pop-up .window-ui .mdc-button
{
  margin-right: 4px;
}

.panel-pop-up .window-ui i
{
  font-size: 26px;
  vertical-align: middle;
}

.panel-pop-up .window-body
{
  @extend %box-sizing-border;
  display: flex;
  flex-direction: column;
  padding: 10px;
  height: calc(100% - 20px - #{$header-height} - #{$submit-menu});
  width: 100%;
}

.panel-pop-up .window-body .radios
{
  display: flex;
  flex-wrap: wrap;
}

.panel-pop-up .window-submit
{
  display: flex;
  justify-content: center;
  height: $submit-menu;
  width: 100%;
}

.panel-pop-up .window-submit .mdc-button
{
  width: 60%;
}

//mdc override for pop-up
.panel-pop-up .mdc-select
{
  width: 50%;
}

.overlay-page
{
  @include background-overlay(2);
}

.mdc-select
{
  margin-bottom: 10px;
}

</style>
