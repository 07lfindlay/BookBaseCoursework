
function Search() {
    var searchtext = document.getElementById('SearchBar').value;
    //console.log(searchtext);
    let nodes;
    fetch(`/Searcher?searchterms=${searchtext}`, {method: 'POST'})
        .then(data => data.json()).then(json => {console.log(json);
            nodes = json;
            console.log(nodes);
            console.log(typeof nodes)
            let newnodes = compile(nodes, [], "stuff", true);
            console.log(newnodes)
            draw(newnodes, []);

        })




}
