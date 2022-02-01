
function Search() {
    var data = $.post('/Searcher', {
            SearchTerms: document.getElementById('SearchBar')
        });
    console.log(data);
    nodes = [];
    nodes = compile(data, nodes, "stuff");
    console.log(nodes);
    draw(nodes, []);

}


    /**.done(function(response) {
                $(destElem).text(response['text'])
            }).fail(function() {
                $(destElem).text("{{ _('Error: Could not contact server.') }}");
            });**/

