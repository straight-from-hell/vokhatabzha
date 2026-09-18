fetch("../words.json")
.then(data => data.json())
.then(json => {
  var sorted = json.words.sort((a,b) =>  a.numVal[0] - b.numVal[0]); // sort by first letter
  for (var i = 0; i < 35; i++){ // repeat for every first letter
    var table = document.getElementById(String(i));
    var section = [];
    var longest = 0;

    sorted.forEach(entry => { // creates a section w only words that start w the same letter
      if (entry.numVal[0] == i){
        section.push(entry);
      }
    });

    section.forEach(entry => { // determines the longest word in the section
      if (entry.numVal.length > longest){
        longest = entry.numVal.length;
      }
    });

    // section = section.sort((a,b) => a.numVal[1] - b.numVal[1]); // sort section by second letter

    // loop to sort each section alphabetically
    // step 1: sort the larget unsorted section
    // step 2: collect all the words that have a matching letter in the same spot
    var base = section;
    base = base.sort((a,b) => a.numVal[1] - b.numVal[1]);
    var group = [];
    var storage = [];

    for (var j = 2; j <= longest; j++){
      for (var k = 0; k < 35; k++){ // for each numVal index, each letter has to be checked for duplicates
        base.forEach(entry => { 
          if (entry.numVal[j] == k){
            group.push(entry);
          }
        });

        group.forEach(word => { // add the group to storage
          storage.push(word);
        });
        group = []; // empty the group to reuse next iteration
      }

      base = storage;
    }


    // making arrays to use in the function that makes the tables
    var wordList = [];
    var keyList = [];
    var descList = [];
    base.forEach(entry => {
      wordList.push(entry.entry);
      keyList.push(entry.speechPart.key);
      descList.push(entry.desc);
    });
    
    makeTable(wordList, keyList, descList, table);    
  }
});

function makeTable(arrE, arrK, arrD, place){
  console.log(arrE);
  
  var lineEntry = 0;
  var lineInfo = 0;
  var text = "<table>";

  while (lineInfo < arrE.length){
    text += "<tr class='entry'>";
    for (var i = 0; i < 3; i++){
      if (arrE[i+lineEntry] === undefined){
        break;
      }
      text += "<td>"+arrE[i+lineEntry]+"</td>";
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
