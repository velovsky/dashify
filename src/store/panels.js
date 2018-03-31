/**
 * List of available panels
 */

export default
{
 list: 
 [
  {id: "reg", uiName: "Regional tendency"},
  {id: "wea", uiName: "Weather forecast"}
 ],
 config:
 {
  "reg":
  {
    c3:
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
  },
  "wea":
  {
    c3:
    {
      data:
      {
        columns: 
        [
          ['data1', 2, 4, 1, 5, 2, 1],
          ['data2', 7, 2, 4, 6, 10, 1],
          ['data3', 14, 12, 14, 16, 110, 11]
        ],
      }
    }
  }
},
 backgrounds:
 [
   {color:"", uiName: "Default"},
   {color:"red", uiName:"Red"},
   {color:"yellow", uiName: "Yellow"},
   {color:"green", uiname:"Green"}
 ]
}