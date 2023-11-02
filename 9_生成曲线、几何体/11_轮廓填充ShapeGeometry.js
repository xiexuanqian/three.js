import * as THREE from 'three'
import {OrbitControls } from 'three/addons/controls/OrbitControls.js'
// 引入dat.gui.js的一个类GUI
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import Stats from 'three/addons/libs/stats.module.js'
const width = window.innerWidth
const height = window.innerHeight
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(30,width/height,1,3000)
// 一组二维向量表示一个多边形轮廓坐标
const pointsArr = [
    new THREE.Vector2(-50, -50),
    new THREE.Vector2(-60, 0),
    new THREE.Vector2(0, 50),
    new THREE.Vector2(60, 0),
    new THREE.Vector2(50, -50),
]
// Shape表示一个平面多边形轮廓,参数是二维向量构成的数组pointsArr
const shape = new THREE.Shape(pointsArr);

const geometry = new THREE.ShapeGeometry(shape);

const material = new THREE.MeshLambertMaterial({
    color:0xfffff,
    // wireframe:true,
    side:THREE.DoubleSide
});


const envLight = new THREE.AmbientLight('red',100)

// const point = new THREE.Points(pointGeo,points)
// const line = new THREE.Line(pointGeo,material)
const mesh = new THREE.Mesh(geometry,material)

camera.position.set(0,0,200)
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