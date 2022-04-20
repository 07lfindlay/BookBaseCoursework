function SearchCheck(edges) {
  if (document.getElementById("radiusnumber").value > 0) {
    WideSearch(edges)
  } else {
    Search(edges)
  }
}


function Search(edges) {
  //Searches nodes for substrings
  var searchtext = document.getElementById('SearchBar').value;
  let nodes;
  fetch(`/Searcher?searchterms=${searchtext}`, {
      method: 'POST'
    })//Passes searchterm to python search query
    .then(data => data.json()).then(json => {
      console.log(json);
      nodes = json;//Gets nodes back from the python query
      console.log(nodes);
      console.log(typeof nodes)
      let newnodes = compile(nodes, [], true);
      let newedges = EdgeCompile(edges, [], true);
      console.log(newnodes)
      draw(newnodes, newedges);//Redraws graph with new nodes
    })
}


function WideSearch(edges) {
  var searchtext = document.getElementById('SearchBar').value;
  //console.log(searchtext);
  var radius = document.getElementById('radiusnumber').value; //Allows users to specify the number of relationships away from the searched node to display
  let nodes;
  fetch(`/WideSearcher?searchterms=${searchtext}&radius=${radius}`, {
      method: 'POST'
    })
    .then(data => data.json()).then(json => {
      console.log(json);
      nodes = json;
      console.log(nodes);
      console.log(typeof nodes)
      let newnodes = compile(nodes, [], true);
      console.log(newnodes)
      let newedges = EdgeCompile(edges, [], true);
      draw(newnodes, newedges);
    })
}

async function Filter() {
  var nodelist1 = [];//List of nodes to be displayed
  if (document.getElementById("texts").checked) {
    console.log("Text is checked")
    let textlist = await MakeQueryJS("Text")//Queries all Texts from the database
    nodelist1 = Merge(nodelist1, compile(textlist, [], true))
    console.log("nodelist w/ texts", nodelist1)
  }

  if (document.getElementById("genres").checked) {
    console.log("Genre is checked")
    let genrelist = await MakeQueryJS("Genre")//Queries all Genres from the database
    nodelist1 = Merge(nodelist1, compile(genrelist, [], true))
    console.log("nodelist w/ genres", nodelist1)
  }
  if (document.getElementById("writers").checked) {
    console.log("Writers is checked")
    let writerlist = await MakeQueryJS("Author") //Queries all Authors from the database
    nodelist1 = Merge(nodelist1, compile(writerlist, [], true))
    console.log("nodelist w/ writers", nodelist1)
  }

  console.log(nodelist1)
  return nodelist1
}

function Merge(first, second) {
  //Merges the distinct lists of entities into one nodelist
  console.log("merging", first, second)
  for (let i = 0; i < second.length; i++) {
    first.push(second[i]);
  }
  return first;
}

async function MakeQueryJS(FilterTerm) {
  // reformats the JSON to allow it to be displayed as a node
  let nodes;
  let newnodes;
  console.log("fetching", FilterTerm)
  nodes = await fetch(`/Filter?filterterm=${FilterTerm}`, {
      method: 'POST'
    })
    .then(data => data.json());
  return nodes

}


function ToggleBack(){
  document.body.classList.toggle('BackGround');
}