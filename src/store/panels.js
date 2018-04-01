/**
 * List of available panels
 */

 //Global c3 values
var _padding = 
{
  right: 35
}

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
          ['data2', 7, 2, 4, 6, 10, 1],
          ['data3', 14, 12, 14, 16, 110, 11],
          ['data4', 14, 12, 14, 16, 110, 11],
          ['data5', 14, 12, 14, 16, 110, 11],
          ['data6', 14, 12, 14, 16, 110, 11]
        ],
        type: 'area-spline'
      },
      point:
      {
        show: false
      },
      padding: _padding,
      color: 
      {
          pattern: ['#42b983','#3bafda','purple','orange','red','yellow','brown']
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
        type: 'area-spline'
      },
      grid: 
      {
        x: {
            show: true
        },
        y: {
            show: true
        }
      },
      point:
      {
        show: false
      },
      padding: _padding,
      color: 
      {
        pattern: ['#42b983','#3bafda','purple','orange','red','yellow','brown']
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