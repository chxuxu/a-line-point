import {Scene,Line,Point,Actor} from "../src/core";
import "./index.less";
let scene=new Scene();
let line=new Line();


let point1=new Point(0);
line.addPoint(point1);
let point2=new Point(2000);
line.addPoint(point2);
let point3=new Point(3000);
line.addPoint(point3);
let actor1=new Actor(document.getElementById("actor1"),{
  0:{top:-100,left:-100,backgroundColor:"#339933"},
  2000:{top:500,left:300,backgroundColor:"#33ff33"},
  3000:{top:100,left:500,backgroundColor:"#3333ff"}
});
let actor2=new Actor(document.getElementById("actor2"),{
  0:{top:-10,left:-10,backgroundColor:"#ff3333"},
  2000:{top:500,left:500,backgroundColor:"#33ff33"},
  3000:{top:100,left:100,backgroundColor:"#33ffff"}
});
line.addActor(actor1);
line.addActor(actor2);
scene.addLine(line);
//console.log(scene);


// scene.newLine({
//   points:[{
//     time:0,
//     actors:[
//       {target:document.getElementById("actor1"),styles:{top:0,left:0}},
//       {target:document.getElementById("actor2"),styles:{top:100,left:100}}
//     ]
//   },{
//     time:1000,
//     actors:[
//       actor1.clone({top:500,left:500,backgroundColor:"#00ff00"}),
//       actor2.clone({top:300,left:400,backgroundColor:"#00ff00"})
//     ]
//   },{
//     time:2000,
//     actors:[
//       {target:document.getElementById("actor1"),styles:{top:10,left:10,backgroundColor:"#ff0000"}},
//       {target:document.getElementById("actor2"),styles:{top:100,left:100,backgroundColor:"#ff0000"}}
//     ]
//   }]
// });
// scene.newLine({
//   points:[{
//     time:0,
//     actors:[
//       {target:document.getElementById("actor3"),styles:{top:500,left:0}},
//       {target:document.getElementById("actor4"),styles:{top:100,left:100}}
//     ]
//   },{
//     time:1000,
//     actors:[
//       {target:document.getElementById("actor3"),styles:{top:5,left:0}},
//       {target:document.getElementById("actor4"),styles:{top:1,left:100}}
//     ]
//   },{
//     time:2000,
//     actors:[
//       {target:document.getElementById("actor3"),styles:{top:10,left:510,backgroundColor:"#ff0000"}},
//       {target:document.getElementById("actor4"),styles:{top:100,left:400,backgroundColor:"#ff0000"}}
//     ]
//   }]
// });

console.log(scene);
scene.play();