let width = window.innerWidth;
let height = window.innerHeight;

var stage = new Konva.Stage({
    container: 'kontainer',
    width: width,
    height: height,
});

var layerMesin1 = new Konva.Layer({
    draggable: true,
});

layerMesin1.on('mouseover', function(){
    document.body.style.cursor = 'pointer';
});

layerMesin1.on('mouseout', function(){
    document.body.style.cursor = 'default';
});

var layer = new Konva.Layer();
            
// Shape diciptakan disini
var ruangan = new Konva.Rect({
    x:200,
    y:5,
    width: 700,
    height: 700,
    fill: 'white',
    stroke: 'black',
    strokeWidth: 10,
});

var kursi1 = new Konva.Rect({
    x:245,
    y:70,
    width: 50,
    height: 25,
    fill: 'red',
    shadowBlur: 10,
    cornerRadius: 10,
    // stroke: 'black',
    // strokeWidth: 10,
});

var rect3 = new Konva.Rect({
    x: 350,
    y: 20,
    width: 100,
    height: 100,
    fill: 'blue',
    shadowBlur: 10,
    cornerRadius: [50, 50, 0, 0],
});

var circle = new Konva.Circle({
    // x: stage.width()/2,
    // y: stage.height()/2,
    x: 520,
    y: 57,
    radius: 40,
    fill: 'red',
    storke: 'black',
    strokeWidth: 10,
    shadowBlur: 10,
});

var poly = new Konva.Line({
    points: [23, 20, 23, 160, 70, 93, 150, 109, 290, 139, 270, 93],
    fill: '#00D2FF',
    stroke: 'black',
    strokeWidth: 5,
    closed: true,
    });

var nmmesin1 = new Konva.Text({
    x: 220,
    y: 20,
    text: "\nMesin Cutting",
    fontSize: 11,
    fontFamily: "Calibri",
    fill: '#555',
    width: 100,
    height: 50,
    align: 'center',

});

var mesin1 = new Konva.Rect({
    x:220,
    y:20,
    width: 100,
    height: nmmesin1.height(),
    fill: 'red',
    shadowBlur: 10,
    cornerRadius: 10,
    // stroke: 'black',
    // strokeWidth: 10,
});

var watermark = new Konva.Text({
    x: ruangan.width() / 2 + 200,
    y: ruangan.height() / 2,
    text: 'Ruangan Produksi',
    fontSize: 30,
    fontFamily: 'Calibri',
    fill: 'green',
});

watermark.offsetX(watermark.width() / 2);

var tr1 = new Konva.Transformer({
    nodes: [layerMesin1],
    centeredScaling: true,
    rotationSnaps: [0, 90, 180, 270],
    resizeEnabled: false,
    borderEnabled: false,
    anchorSize: 5,
    anchorStroke: 'white',
    rotateAnchorOffset: 5,
});

// memasukan shape ke layer
layer.add(ruangan);
layerMesin1.add(mesin1);
layerMesin1.add(nmmesin1);
layerMesin1.add(kursi1);
layer.add(watermark);
layer.add(tr1);
// layer.add(rect3);
// layer.add(circle);
// layer.add(poly);

// memasukan layer ke stage
stage.add(layer);
stage.add(layerMesin1);

// menampilkan koordinat mouse
document.addEventListener("mousemove",function(event){         
    var x = event.clientX;
    var y = event.clientY;
    document.getElementById('position').innerHTML 
        = "[ X = "+ x +" ] [ Y =  "+ y +" ]";
}); 