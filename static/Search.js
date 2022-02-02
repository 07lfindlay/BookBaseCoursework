
function Search() {
    var searchtext = document.getElementById('SearchBar').value;
    //console.log(searchtext);
    let nodes;
    fetch(`/Searcher?searchterms=${searchtext}`, {method: 'POST'})
        .then(data => data.json()).then(json => {console.log(json);
            nodes = json;
            console.log(nodes);
            console.log(typeof nodes)
            let newnodes = compile(nodes, [], true);
            console.log(newnodes)
            draw(newnodes, []);

        })



}

async function Filter(){
    var nodelist1 =[];
    if (document.getElementById("texts").checked) {
        console.log("Text is checked")
        let textlist = await MakeQueryJS("Text")
        nodelist1 = Merge(nodelist1, compile(textlist, [], true))
        console.log("nodelist w/ texts", nodelist1)
    }

    if (document.getElementById("genres").checked) {
        console.log("Genre is checked")
        let genrelist = await MakeQueryJS("Genre")
        nodelist1 = Merge(nodelist1, compile(genrelist, [], true))
        console.log("nodelist w/ genres", nodelist1)
    }
    if (document.getElementById("writers").checked) {
        console.log("Writers is checked")
        let writerlist = await MakeQueryJS("Author")
        nodelist1 = Merge(nodelist1, compile(writerlist, [], true))
        console.log("nodelist w/ writers", nodelist1)
    }
    console.log(nodelist1)
    return nodelist1
}

function Merge(first, second){
    console.log("merging", first, second)
  for(let i=0; i<second.length; i++) {
    first.push(second[i]);
  }
  return first;
}

async function MakeQueryJS(FilterTerm){
    let nodes;
    let newnodes;
    console.log("fetching", FilterTerm)
    nodes = await fetch(`/Filter?filterterm=${FilterTerm}`, {method: 'POST'})
        .then(data => data.json());
        /**.then(json => {console.log(json);
            nodes = json;
            console.log("Fnodes", nodes);
            newnodes = compile(nodes, [], true);
            console.log("Fnewnodes", newnodes)
            return newnodes;
        })**/
        return nodes

}
