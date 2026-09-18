fetch("../words.json")
.then(data => data.json())
.then(json => {
  var sorted = json.words.sort((a,b) =>  a.numVal[0] - b.numVal[0]); // sort by first letter
  for (var i = 0; i < 35; i++){ // repeat for every first letter
    var table = document.getElementById(String(i));
    var section = [];

    sorted.forEach(entry => { // creates a section w only words that start w the same letter
      if (entry.numVal[0] == i){
        section.push(entry);
      }
    });

    section = section.sort((a,b) => a.numVal[1] - b.numVal[1]); // sort section by second letter
    // var wordList = [];
    // section.forEach(entry => {
    //   wordList.push(entry.numVal); // get only the arrays of numerical values
    //   console.log(wordList);
    // });
    // var longest = wordList.reduce((a, b) => a.length > b.length ? a : b); // find the longest word
    // var collected = [];
    // var smallSec = [];

    // for (var x = 1; x < longest.length; x++){ // repeat until there's no letters left
    //   smallSec = []; // empties the tracker
    //   for (var j = 0; j < 35; j++){
    //     section.forEach(entry => { 
    //       if (entry.numVal[x] == j){
    //         smallSec.push(entry); // get a list of only words that have the same next letter (x)
    //       }
    //     });
    //     smallSec = smallSec.sort((a,b) => a.numVal[x+1] - b.numVal[x+1]); // sort by same letter after (x+1)
    //   }
    //   smallSec.forEach(entry => { // appends the words to the beginning
    //     collected.push(entry);
    //   });
    // }
    // section = collected;

    // making arrays to use in the function that makes the tables
    var wordList = [];
    var keyList = [];
    var descList = [];
    section.forEach(entry => {
      wordList.push(entry.entry);
      // console.log(entry.entry);
      keyList.push(entry.speechPart.key);
      descList.push(entry.desc);
    });
    
    makeTable(wordList, keyList, descList, table);    
  }
});

function makeTable(arrE, arrK, arrD, place){
  var lineEntry = 0;
  var lineInfo = 0;
  var text = "<table>";
  // place.innerHTML += "<table>";

  while (lineInfo < arrE.length){
    text += "<tr class='entry'>";
    for (var i = 0; i < 3; i++){
      if (arrE[i+lineEntry] === undefined){
        break;
      }
      text += "<td>"+arrE[i+lineEntry]+"</td>";
      // console.log(arrE[lineEntry]);
    }
    lineEntry+= 3;
    
    text += "</tr><tr>";
    for (var i = 0; i < 3; i++){
      if (arrE[i+lineInfo] === undefined){
        break;
      }
      text += "<td>"+arrK[i+lineInfo]+". "+arrD[i+lineInfo]+"</td>";
    }
    lineInfo+= 3;
    
    text += "</tr>";
  }

  text += "</table>";
  place.innerHTML = text;
}
