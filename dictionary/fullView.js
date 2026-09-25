var params = new URLSearchParams(document.location.search);
var entry = params.get("word");
// console.log(entry);
var heading = document.getElementById("entry");
heading.innerHTML = entry;
