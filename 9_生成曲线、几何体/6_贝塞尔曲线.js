import * as THREE from 'three'
import {OrbitControls } from 'three/addons/controls/OrbitControls.js'
// 引入dat.gui.js的一个类GUI
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import Stats from 'three/addons/libs/stats.module.js'
const width = window.innerWidth
const height = window.innerHeight
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(30,width/height,1,3000)

const geometry = new THREE.BufferGeometry()

// p1、p2、p3表示三个点坐标
// p1、p3是曲线起始点，p2是曲线的控制点
// const p1 = new THREE.Vector2(-80, 0);
// const p2 = new THREE.Vector2(20, 100);
// const p3 = new THREE.Vector2(80, 0);
// // 二维二次贝赛尔曲线
// const curve = new THREE.QuadraticBezierCurve(p1, p2, p3);

// // p1、p2、p3表示三个点坐标
// const p1 = new THREE.Vector3(-80, 0, 0);
// const p2 = new THREE.Vector3(20, 100, 0);
// const p3 = new THREE.Vector3(80, 0, 100);
// // 三维二次贝赛尔曲线
// const curve = new THREE.QuadraticBezierCurve3(p1, p2, p3);

// // p1、p2、p3、p4表示4个点坐标
// // p1、p4是曲线起始点，p2、p3是曲线的控制点
// const p1 = new THREE.Vector2(-80, 0);
// const p2 = new THREE.Vector2(-40, 50);
// const p3 = new THREE.Vector2(50, 50);
// const p4 = new THREE.Vector2(80, 0);

// // 二维三次贝赛尔曲线
// const curve = new THREE.CubicBezierCurve(p1, p2, p3, p4);

const p1 = new THREE.Vector3(-80, 0, 0);
const p2 = new THREE.Vector3(-40, 50, 0);
const p3 = new THREE.Vector3(50, 50, 0);
const p4 = new THREE.Vector3(80, 0, 100);
// 三维三次贝赛尔曲线
const curve = new THREE.CubicBezierCurve3(p1, p2, p3, p4);

geometry.setFromPoints(curve.getSpacedPoints(50))
const geometry2 = geometry.clone()
// geometry2.setFromPoints([p1,p2,p3]) //二次贝赛尔曲线
geometry2.setFromPoints([p1,p2,p3,p4]) //三次贝赛尔曲线


const points = new THREE.PointsMaterial({
    color:'red',
    size:10
})

const material = new THREE.LineBasicMaterial({
    color:0xfffff
})

const point = new THREE.Points(geometry,points)
const line = new THREE.Line(geometry,material)
const point2 = new THREE.Points(geometry2,points)
const line2 = new THREE.Line(geometry2,material)

camera.position.set(0,0,200)
camera.lookAt(0,0,0)

const axes = new THREE.AxesHelper(300)

scene.add(point)
scene.add(line)
scene.add(point2)
scene.add(line2)
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