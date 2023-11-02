import * as THREE from 'three'
import {OrbitControls } from 'three/addons/controls/OrbitControls.js'
// 引入dat.gui.js的一个类GUI
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import Stats from 'three/addons/libs/stats.module.js'
const width = window.innerWidth
const height = window.innerHeight
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(30,width/height,1,3000)



// const shape = new THREE.Shape();
// const path = new THREE.Path();
// console.log('currentPoint',shape.currentPoint);

// const shape = new THREE.Shape();
// shape.moveTo(10,0);
// console.log('currentPoint',shape.currentPoint);

const shape = new THREE.Shape();
shape.moveTo(10,0);//.currentPoint变为(10,0)
// 绘制直线线段，起点(10,0)，结束点(100,0)
shape.lineTo(100,0);


// const shape = new THREE.Shape();
// shape.moveTo(10, 0); //.currentPoint变为(10,0)
// // 绘制直线线段，起点(10,0)，结束点(100,0)
// shape.lineTo(100, 0);//.currentPoint变为(100, 0)
// shape.lineTo(100, 100);//.currentPoint变为(100, 100)
// shape.lineTo(10, 100);//.currentPoint变为(10, 100)


// ShapeGeometry填充Shape获得一个平面几何体
const geometry = new THREE.ShapeGeometry(shape);


// const material = new THREE.MeshBasicMaterial({
//     color:0xfffff,
//     // wireframe:true,
//     side:THREE.DoubleSide
// });
const material = new THREE.LineBasicMaterial({
    color:0xfffff
});


const envLight = new THREE.AmbientLight('red',100)


// const mesh = new THREE.Mesh(geometry,material)
const mesh = new THREE.Line(shape.getPoints(10),material)

camera.position.set(0,0,400)
camera.lookAt(0,0,0)

const axes = new THREE.AxesHelper(300)

// scene.add(point)
// scene.add(line)
scene.add(mesh)
scene.add(envLight)

scene.add(camera)
scene.add(axes)
const renderer = new THREE.WebGLRenderer()

renderer.setSize(width,height)

renderer.render(scene,camera)

const orbit = new OrbitControls(camera,renderer.domElement)
orbit.addEventListener('change',()=>{
    renderer.render(scene,camera)
})


document.body.appendChild(renderer.domElement)