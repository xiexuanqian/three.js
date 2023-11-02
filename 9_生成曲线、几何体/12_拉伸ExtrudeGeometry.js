import * as THREE from 'three'
import {OrbitControls } from 'three/addons/controls/OrbitControls.js'
// 引入dat.gui.js的一个类GUI
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import Stats from 'three/addons/libs/stats.module.js'
const width = window.innerWidth
const height = window.innerHeight
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(30,width/height,1,3000)
// Shape表示一个平面多边形轮廓
const shape = new THREE.Shape([
    // 按照特定顺序，依次书写多边形顶点坐标
    new THREE.Vector2(-50, -50), //多边形起点
    new THREE.Vector2(-50, 50),
    new THREE.Vector2(50, 50),
    new THREE.Vector2(50, -50),
]);
// //拉伸造型
// const geometry = new THREE.ExtrudeGeometry(
//     shape, //二维轮廓
//     {
//         depth: 20, //拉伸长度
//     }
// );

const data = {
    depth: 20,
    bevelThickness: 10, //倒角尺寸:拉伸方向
    bevelSize: 10, //倒角尺寸:垂直拉伸方向
    bevelSegments: 20, //倒圆角：倒角细分精度，默认3
}
const geometry = new THREE.ExtrudeGeometry(
    shape,
    data
);

const gui = new GUI()
gui.domElement.style.right = '0px'
gui.domElement.style.width = '300px';


console.log(geometry)



const material = new THREE.MeshLambertMaterial({
    color:0xfffff,
    // wireframe:true,
    side:THREE.DoubleSide
});


const envLight = new THREE.AmbientLight('red',100)

// const point = new THREE.Points(pointGeo,points)
// const line = new THREE.Line(pointGeo,material)
const mesh = new THREE.Mesh(geometry,material)

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

console.log(geometry.parameters.options)
geometry.parameters.options.depth=1000
// gui.add(geometry.data,'bevelSize',0,100)
// gui.add(geometry.parameters.options,'bevelThickness',0,100)
// gui.add(geometry.parameters.options,'depth',0,100)

document.body.appendChild(renderer.domElement)