
function Search() {
    var searchtext = document.getElementById('SearchBar').value; //Get value from SearchBar text field
    //console.log(searchtext);
    let nodes;
    fetch(`/Searcher?searchterms=${searchtext}`, {method: 'POST'}) //Send a request to the Flask function under '/Searcher', passing the search value as arg.
        .then(data => data.json()).then(json => {console.log(json);
            nodes = json; // set nodes value to the value returned by the '/Searcher' function
            console.log(nodes);
            console.log(typeof nodes)
            let newnodes = compile(nodes, [], "stuff", true); //Convert the nodes into a format that can be drawn
            console.log(newnodes)
            draw(newnodes, []); //Update the graph, drawing only the searched nodes

        })
}
