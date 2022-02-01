
function Search() {
    var searchtext = document.getElementById('SearchBar').value;
    console.log(searchtext);

    fetch(`/Searcher?searchterms=${searchtext}`, {method: 'POST'})
.then(data => data.json())
.then(json => console.log(json));
    /**var data = $.post('/Searcher', {
            SearchTerms: document.getElementById('SearchBar')
        });
    console.log(data);
    nodes = [];
    nodes = compile(data, nodes, "stuff");

    draw(nodes, []);**/

}


    /**.done(function(response) {
                $(destElem).text(response['text'])
            }).fail(function() {
                $(destElem).text("{{ _('Error: Could not contact server.') }}");
            });**/

