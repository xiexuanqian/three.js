import * as THREE from 'three'
import {OrbitControls } from 'three/addons/controls/OrbitControls.js'
// 引入dat.gui.js的一个类GUI
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import Stats from 'three/addons/libs/stats.module.js'
const width = window.innerWidth
const height = window.innerHeight
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(30,width/height,1,3000)


// 扫描轮廓：Shape表示一个平面多边形轮廓
const shape = new THREE.Shape([
    // 按照特定顺序，依次书写多边形顶点坐标
    new THREE.Vector2(0,0), //多边形起点
    new THREE.Vector2(0,10),
    new THREE.Vector2(10,10),
    new THREE.Vector2(10,0),
]);

// 扫描轨迹：创建轮廓的扫描轨迹(3D样条曲线)
const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3( -10, -50, -50 ),
    new THREE.Vector3( 10, 0, 0 ),
    new THREE.Vector3( 8, 50, 50 ),
    new THREE.Vector3( -5, 0, 100)
]);


//扫描造型：扫描默认没有倒角
const geometry = new THREE.ExtrudeGeometry(
    shape, //扫描轮廓
    {
        extrudePath:curve,//扫描轨迹
        steps:100//沿着路径细分精度，越大越光滑
    }
);



const material = new THREE.MeshLambertMaterial({
    color:0xfffff,
    // wireframe:true,
    side:THREE.DoubleSide
});


const envLight = new THREE.AmbientLight('red',100)


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


document.body.appendChild(renderer.domElement)