var params = new URLSearchParams(document.location.search);
var entry = params.get("word");
// console.log(entry);
var heading = document.getElementById("entry");
heading.innerHTML = entry;

document.title = `${entry} - Vòkhá'ábzhá`;

var type = document.getElementById("speechPart");
var desc = document.getElementById("desc");
var example = document.getElementById("example");

fetch("../words.json")
.then(data => data.json())
.then(json => {
  var sorted = json.words.sort((a,b) =>  a.numVal[0] - b.numVal[0]);
  sorted.forEach(word => {
    if (word.entry == entry){
      type.innerHTML = word.speechPart.term;      
      desc.innerHTML = word.desc;
      example.innerHTML = word.example.en+" - "+word.example.vb;

      var grammar = document.getElementById(word.speechPart.term);
      if (grammar != null){
        grammar.style.display = "block";
      }
    }
  });
});
