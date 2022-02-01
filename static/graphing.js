function compile(stuff, nodelist, type){
    console.log(stuff);
    console.log(stuff.length);
    for (let i= 0; i < stuff.length; i++) {
    nodelist.push({
        'id': stuff[i]['id'],
        'shape': "circularImage",
        'image': stuff[i]['image'],
        'label': stuff[i]['name'],
        'fixed': false,
        'url': type + '/' + stuff[i]['name'],
        'color': {
            'border': '#00c5ff'
        }
    });
}
    console.log(nodelist);
    return nodelist;
}

function OverCompile(books,  writer, wrote, influences, genre, genrelinks) {

    var nodelist = [];

    if (document.getElementById("texts").checked) {
        nodelist = compile(books, nodelist, 'texts');
    }
    if (document.getElementById("writers").checked) {
        nodelist = compile(writer, nodelist, 'writers');
    }
    if (document.getElementById("genres").checked) {
        nodelist = compile(genre, nodelist, 'genres');
    }


    var edgelist = [];
    for (let j = 0; j < influences.length; j++) {
        edgelist.push(
            {
                'from': influences[j]['r.start'][0],
                'to': influences[j]['r.end'][0],
                'label': influences[j]['r.Influence'][0],
                'color': "#23a140"
            }
        );
    }
    for (let j = 0; j < wrote.length; j++) {
        edgelist.push(
            {'from': wrote[j]['r.start'], 'to': wrote[j]['r.end'], 'label': 'Wrote', 'color': "#1320c0"}
        );
    }

    for (let j = 0; j < genrelinks.length; j++) {
        edgelist.push(
            {'from': genrelinks[j]['r.start'], 'to': genrelinks[j]['r.end'], 'label': 'Genre', 'color': "#af9637"}
        );
    }
    draw(nodelist, edgelist)
}
function draw(nodelist, edgelist){
    console.log("Currently Drawing with{0}", nodelist);
    var container = document.getElementById("mynetwork");
      var nodes = new vis.DataSet(nodelist);
      var edges = new vis.DataSet(edgelist);
      var data = {
        nodes: nodes,
        edges: edges
      };

      var options = {
        nodes: {
          borderWidth: 7,
          size: 42,
          font: {
            color: "#111",
            face: "Helvetic",
            size: 16,
            strokeWidth: 1,
            strokeColor: "#222"
          }
        },
        edges: {
          color: {
            color: "#CCC",
            highlight: "#A22"
          },
          width: 5,
          length: 350,
          hoverWidth: 0.05
        }
      };

      var network = new vis.Network(container, data, options);
      network.on("selectNode", function (params) {
        if (params.nodes.length === 1) {
          var node = nodes.get(params.nodes[0]);
          window.open(node.url, "_blank");
        }
        network.unselectAll();
      });
}