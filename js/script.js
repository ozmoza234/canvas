//global var for height and Width
let width = window.innerWidth;
let height = window.innerHeight;

//Stage Creation
var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height,
});

//Layer Creation
var layer = new Konva.Layer();
stage.add(layer);

//Ruangan Creation
var ruangan = new Konva.Rect({
    x:200,
    y:5,
    width: 700,
    height: 300,
    fillEnabled: false,
    fill:'white',
    stroke: 'black',
    strokeWidth: 10,
    opacity: 1,
});
var watermark = new Konva.Text({
    x: ruangan.width() / 2 + 200,
    y: ruangan.height() / 2,
    text: 'Ruangan Produksi',
    fontSize: 30,
    fontFamily: 'Calibri',
    fill: 'green',
    id: 'watermark',
    opacity: 0.3,
});
watermark.offsetX(watermark.width() / 2);

//Mesin Creation

function addCut(layer){
  var scale = 1;
  var group = new Konva.Group({
    draggable: true,
  });
  group.on('mouseover', function(){
    document.body.style.cursor = 'move';
  });
  group.on('mouseout', function(){
      document.body.style.cursor = 'default';
  });
  var mesin1 = new Konva.Rect({
      x:220,
      y:20,
      width: 100,
      height: 50,
      fill: 'red',
      name: 'rect',
      shadowBlur: 10,
      cornerRadius: 10,
      draggable: true,
      scale: {
        x: scale,
        y: scale,
      },
      startScale: scale,
  });
  group.add(mesin1);
  var nmmesin1 = new Konva.Text({
      x: 220,
      y: 20,
      text: "\nMesin Cutting",
      fontSize: 11,
      fontFamily: "Calibri",
      fill: '#555',
      name: 'rect',
      width: 100,
      height: 50,
      align: 'center',
      scale: {
        x: scale,
        y: scale,
      },
      startScale: scale,
  });
  group.add(nmmesin1);
  var kursi1 = new Konva.Rect({
      x:245,
      y:70,
      width: 50,
      height: 25,
      fill: 'red',
      name:'rect',
      shadowBlur: 10,
      cornerRadius: 10,
      draggable: true,
      scale: {
        x: scale,
        y: scale,
      },
      startScale: scale,
  });
  group.add(kursi1);
  layer.add(group);
};

function addFinish (layer) {
  var scale = 1;
  var group2 = new Konva.Group({
    draggable: true,
  });
  group2.on('mouseover', function(){
    document.body.style.cursor = 'move';
  });
  group2.on('mouseout', function(){
      document.body.style.cursor = 'default';
  });
  var mesin2 = new Konva.Rect({
    x:440,
    y:20,
    width: 100,
    height: 50,
    fill: 'yellow',
    name: 'rect',
    shadowBlur: 10,
    cornerRadius: 10,
    draggable: false,
    scale: {
      x: scale,
      y: scale,
    },
    startScale: scale,
  });
  group2.add(mesin2);
  var nmmesin2 = new Konva.Text({
      x: 440,
      y: 20,
      text: "\nMesin Finishing",
      fontSize: 11,
      fontFamily: "Calibri",
      fill: '#555',
      name: 'rect',
      width: 100,
      height: 50,
      align: 'center',
      scale: {
        x: scale,
        y: scale,
      },
      startScale: scale,
  });
  group2.add(nmmesin2);
  var kursi2 = new Konva.Rect({
      x:465,
      y:70,
      width: 50,
      height: 25,
      fill: 'yellow',
      name:'rect',
      shadowBlur: 10,
      cornerRadius: 10,
      draggable: false,
      scale: {
        x: scale,
        y: scale,
      },
      startScale: scale,
  });
  group2.add(kursi2);
  layer.add(group2);
};


//Calling in!
layer.add(ruangan);
layer.add(watermark);

//Transformer Creation
var tr = new Konva.Transformer({
    centeredScaling: true,
    rotationSnaps: [0, 90, 180, 270],
    resizeEnabled: true,
    borderEnabled: true,
    anchorSize: 10,
    anchorStroke: 'blue',
    rotateAnchorOffset: 20,
});
layer.add(tr);

//select all
// tr.nodes([group, group2]);

// add a new feature, lets add ability to draw selection rectangle
var selectionRectangle = new Konva.Rect({
    fill: 'rgba(0,0,255,0.5)',
    visible: false,
  });
layer.add(selectionRectangle);
var x1, y1, x2, y2;
stage.on('mousedown touchstart', (e) => {
    // do nothing if we mousedown on any shape
    if (e.target !== stage) {
      return;
    }
    e.evt.preventDefault();
    x1 = stage.getPointerPosition().x;
    y1 = stage.getPointerPosition().y;
    x2 = stage.getPointerPosition().x;
    y2 = stage.getPointerPosition().y;

    selectionRectangle.visible(true);
    selectionRectangle.width(0);
    selectionRectangle.height(0);
});
stage.on('mousemove touchmove', (e) => {
    // do nothing if we didn't start selection
    if (!selectionRectangle.visible()) {
      return;
    }
    e.evt.preventDefault();
    x2 = stage.getPointerPosition().x;
    y2 = stage.getPointerPosition().y;

    selectionRectangle.setAttrs({
      x: Math.min(x1, x2),
      y: Math.min(y1, y2),
      width: Math.abs(x2 - x1),
      height: Math.abs(y2 - y1),
    });
});
stage.on('mouseup touchend', (e) => {
    // do nothing if we didn't start selection
    if (!selectionRectangle.visible()) {
      return;
    }
    e.evt.preventDefault();
    // update visibility in timeout, so we can check it in click event
    setTimeout(() => {
      selectionRectangle.visible(false);
    });
  // });
    var shapes = stage.find('.rect');
    var box = selectionRectangle.getClientRect();
    var selected = shapes.filter((shape) =>
      Konva.Util.haveIntersection(box, shape.getClientRect())
    );
    tr.nodes(selected);
});

  // clicks should select/deselect shapes
stage.on('click tap', function (e) {
    // if we are selecting with rect, do nothing
    if (selectionRectangle.visible()) {
      return;
    }

    // if click on empty area - remove all selections
    if (e.target === stage) {
      tr.nodes([]);
      return;
    }

    // do nothing if clicked NOT on our rectangles
    if (!e.target.hasName('rect')) {
      return;
    }

    // do we pressed shift or ctrl?
    const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
    const isSelected = tr.nodes().indexOf(e.target) >= 0;

    if (!metaPressed && !isSelected) {
      // if no key pressed and the node is not selected
      // select just one
      tr.nodes([e.target]);
    } else if (metaPressed && isSelected) {
      // if we pressed keys and node was selected
      // we need to remove it from selection:
      const nodes = tr.nodes().slice(); // use slice to have new copy of array
      // remove node from array
      nodes.splice(nodes.indexOf(e.target), 1);
      tr.nodes(nodes);
    } else if (metaPressed && !isSelected) {
      // add the node into selection
      const nodes = tr.nodes().concat([e.target]);
      tr.nodes(nodes);
    }
});
//Non-Konva Script!

//View Mouse Coordinate
// document.addEventListener("mousemove",function(event){         
//     var x = event.clientX;
//     var y = event.clientY;
//     document.getElementById('position').innerHTML 
//         = "[ X = "+ x +" ] [ Y =  "+ y +" ]";
// }); 

