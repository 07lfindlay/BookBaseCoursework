function compile(stuff, nodelist, isJson) {
  console.log(typeof stuff);
  console.log("compiling ", stuff);
  var DoneId = [];
  var count;

  if (isJson) {
    count = objLength(stuff);
  } else {
    count = stuff.length
  }
  console.log(count);
  for (let i = 0; i < count; i++) {
    if (!DoneId.includes(stuff[i].id)) {
      nodelist.push({
        'id': stuff[i]['id'],
        'shape': "circularImage",
        'image': stuff[i]['image'],
        'label': stuff[i]['name'],
        'fixed': false,
        'url': stuff[i]['type'] + '/' + stuff[i]['name'],
        'color': {
          'border': '#0b343f'
        }
      });
      DoneId.push(stuff[i]['id']);
    }
  }
  console.log("end of compile nodelist", nodelist);
  return nodelist;
}

//Found Function
function objLength(obj) {
  var i = 0;
  for (var x in obj) {
    if (obj.hasOwnProperty(x)) {
      i++;
    }
  }

  return i;
}

function EdgeCompile(edges, edgelist, isJson) {
  if (isJson) {
    count = objLength(edges);
  } else {
    count = edges.length
  }

  for (let j = 0; j < count; j++) {
    console.log("j,st", edges[j]['r.start']);
    edgelist.push({
      'from': edges[j]['r.start'],
      'to': edges[j]['r.end'],
      'label': edges[j]['r.nature'],
      'color': edges[j]['r.colour']
    });
  }

  return edgelist
}

async function OverCompile(nodes, edges) {
  var nodelist2 = await Filter();
  console.log("nodelist", nodelist2)
  console.log("edgelist", edges)
  var edgelist = [];
  let edgelist2 = EdgeCompile(edges, edgelist, false);
  console.log("Nodelist, Edgelist", nodelist2, edgelist2)
  draw(nodelist2, edgelist2)
}

function draw(nodelist, edgelist) {
  console.log("Currently Drawing with ", nodelist);
  var container = document.getElementById("mynetwork");
  var nodes = new vis.DataSet(nodelist);
  var edges = new vis.DataSet(edgelist);
  var data = {
    nodes: nodes,
    edges: edges
  };
  var options = {
    height: '100%',
    width: "100%",
    nodes: {
      borderWidth: 7,
      size: 42,
      color: "#000000",
      font: {
        face: "Times New Roman",
        color: "black",
        strokeWidth: 1,
        strokeColor: "#ffffff",
        shadow: "orange",
      }
    },
    edges: {
      color: {
        color: "#ffffff",
        highlight: "#A22"
      },
      font:{
        color: "#2f2e2e",
      },
      width: 5,
      length: 350,
      hoverWidth: 0.05
    },
     physics: {
       stabilization: {
         fit: true
       }
     }

  };
  var network = new vis.Network(container, data, options);
  network.on("selectNode", function(params) {
    if (params.nodes.length === 1) {
      var node = nodes.get(params.nodes[0]);
      window.open(node.url, "_blank");
    }
    network.unselectAll();
  });
}
