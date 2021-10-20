/*document.addEventListener('DOMContentLoaded', function() {
  var image3 = 'https://upload.wikimedia.org/wikipedia/commons/a/ab/JoyceUlysses2.jpg';
  var container = document.querySelector('#graph');
  var nodes = new vis.DataSet([
{
  id: 1,
  shape: 'circularImage',
  image: 'https://i.guim.co.uk/img/media/fa5c01599c7fa657c2c5b8aa501143c55b5cb89e/0_347_2346_1407/master/2346.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=96cb6381e98c6c249e108162b784bbb2',
  label: 'James Joyce',
  fixed: true
},
{
  id: 2,
  shape: 'circularImage',
  image: 'https://lenguajecss.com/img/css3-logo.png',
  label: 'CSS3',
  fixed: true
},
{
  id: 3,
  shape: 'circularImage',
  image: 'image',
  label: 'A Portrait of the Artist as a Young Man',
  fixed: true
},
{
  id: 4,
  shape: 'circularImage',
  image: 'http://www.freeiconspng.com/uploads/less-icon-17.png',
  label: 'LESS',
  fixed: true
},
{
  id: 5,
  shape: 'circularImage',
  image: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Joyce_-_Dubliners%2C_1914_-_3690390_F.jpg',
  label: 'Dubliners',
  fixed: true
},
{
  id: 6,
  shape: 'circularImage',
  image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/This_Side_of_Paradise_Cover_1920_Retouched.jpg/1200px-This_Side_of_Paradise_Cover_1920_Retouched.jpg',
  label: 'This Side of Paradise',
  fixed: true
},
{
  id: 7,
  shape: 'circularImage',
  image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/PostCSS_Logo.svg/2000px-PostCSS_Logo.svg.png',
  label: 'Odyssey',
  fixed: true
},
{
  id: 8,
  shape: 'circularImage',
  image: image3,
  label: 'Ulysses',
  fixed: true,
  url: 'https://en.wikipedia.org/wiki/Ulysses_(novel)'
}
    ]);
var edges = new vis.DataSet(
[
      {id: 1, from: 1, to: 8, label: "WROTE"},
      {from: 1, to: 3},
      {from: 2, to: 4},
      {from: 1, to: 5},
      {from: 3, to: 6},
      {from: 2, to: 7},
      {from: 2, to: 8}
    ]);
  var data = {
    nodes: nodes,
    edges:  edges }

  var options = {
    nodes: {
      borderWidth:0,
      size:42,
      color: {
        border: '#222',
        background: 'transparent'
      },
      font: {
        color: '#111',
        face: 'Helvetic',
        size: 16,
        strokeWidth: 1,
        strokeColor: '#222'
      }
    },
    edges: {
      color: {
        color: '#CCC',
        highlight: '#A22'
      },
      width: 5,
      length: 275,
      hoverWidth: .05
    }
  }

  var network = new vis.Network(container, data, options);
  network.on("selectNode", function (params) {
        if (params.nodes.length === 1) {
            var node = nodes.get(params.nodes[0]);
            window.open(node.url, '_blank')
        }
    network.unselectAll();
  });

});*/
