var ss = SpreadsheetApp.getActiveSpreadsheet(), 
      s = ss.getActiveSheet(); 

function getData() {
  var result = [];
  var range = s.getDataRange();
  var values = range.getValues();
    let wcol = 1;
    var groupsArray  = []
  for (var groups = 2; groups<values[0].length;  groups++){
      groupsArray.push(values[0][groups]);
  }
   result.push(groupsArray);
  for (var i = 0; i < values[0].length-2; i++) {
    let dayStr = 1; 
    let dayCol = 0;
    let wst = 1;
    
    var group = [];

    for(var days = 0; days<6; days++) {
      var row  = [];
      row.push(values[dayStr][dayCol]);
      for (var j = 0; j < 9; j++) {
        
        row.push(values[wst][1]);
        if (values[wst][wcol+1].length >0){
          var r = values[wst][wcol+1];
              if (r.includes("https")){
                r = r.replace(/https/g, "\nhttps");
              } 
              if (r.includes(".,")){
               r = r.replace(/.,/g, "");
              } 
         var substrings = r.split("\n");
         row.push(substrings)
        }
        else{

        row.push(values[wst][wcol+1]);
        }
        wst++;
        dayStr++;
      }
     // console.log(row);
      group.push(row);
    }
    dayCol++;
    wcol++;
  result.push(group);
  console.log(group);
  }
 // console.log(result);
  return result;
}


function doGet() {
  var data = getData();
  if(!data) {
    data = '';
  }
  return ContentService.createTextOutput(
    JSON.stringify({'result': data})).setMimeType(ContentService.MimeType.JSON);
}