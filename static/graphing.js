function compile(stuff, nodelist, type, isJson){
    //This function takes a raw list of node data and converts it into a format that the draw() function can parse
    console.log(typeof stuff); 
    console.log("compiling ",stuff);;
    var count;
    if (isJson){
        count = objLength(stuff); //JSON has no inherent length property, so length must be calculated
    }
    else{
        count = stuff.length
    }
    console.log(count);
    for (let i= 0; i < count; i++) {
        console.log(stuff[i]);
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
function objLength(obj){
  var i=0;
  for (var x in obj){
    if(obj.hasOwnProperty(x)){
      i++;
    }
  }
  return i;
}

function OverCompile(books,  writer, wrote, influences, genre, genrelinks) {

    var nodelist = [];

    if (document.getElementById("texts").checked) {
        nodelist = compile(books, nodelist, 'texts', false);
    }
    if (document.getElementById("writers").checked) {
        nodelist = compile(writer, nodelist, 'writers', false);
    }
    if (document.getElementById("genres").checked) {
        nodelist = compile(genre, nodelist, 'genres', false);
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
    //This takes a list of nodes, and a list of edges and renders the graph within the 'mynetwork' container
    console.log("Currently Drawing with ", nodelist);
    var container = document.getElementById("mynetwork");
      var nodes = new vis.DataSet(nodelist);
      var edges = new vis.DataSet(edgelist);
      var data = {
        nodes: nodes,
        edges: edges
      };

      var options = {
          //style options for nodes
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
            //style options for edges
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
