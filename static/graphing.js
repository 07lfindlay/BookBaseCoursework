      function draw(books,  writer, wrote, influences) {
var container = document.getElementById("mynetwork");
var nodelist = [];

for (let i= 0; i < books.length; i++) {
    nodelist.push({
        'id': books[i]['id'],
        'shape': "circularImage",
        'image': books[i]['image'],
        'label': books[i]['name'],
        'fixed': false,
        'url': 'text/' + books[i]['name'],
        'color': {
            'border': '#00c5ff'
        }
    });
}
console.log(nodelist);
for (let b= 0; b < writer.length; b++) {
    nodelist.push({
        'id': writer[b]['id'],
        'shape': "circularImage",
        'image': writer[b]['image'],
        'label': writer[b]['name'],
        'fixed': false,
        'url': 'writer/' + writer[b]['name'],
        'color': {
            'border': '#f50404'
        },
        'shapeProperties': {
            'useBorderWithImage': true
        }
    });
}
var edgelist = [];
for (let j= 0; j < influences.length; j++) {
    edgelist.push(
        {'from': influences[j]['r.start'][0], 'to': influences[j]['r.end'][0], 'label': influences[j]['r.Influence'][0], 'color': "#23a140"}
    );
}
for (let j= 0; j < wrote.length; j++) {
    edgelist.push(
        {'from': wrote[j]['r.start'], 'to': wrote[j]['r.end'], 'label': 'Wrote', 'color': "#1320c0"}
    );
}

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