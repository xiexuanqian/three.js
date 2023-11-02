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

// // p1、p3轨迹线起始点坐标
// const p1 = new THREE.Vector3(-100, 0, -100);
// const p3 = new THREE.Vector3(100, 0, 100);
// // 计算p1和p3的中点坐标
// const x2 = (p1.x + p3.x)/2;
// const z2 = (p1.z + p3.z)/2;
// const h = 50;
// const p2 = new THREE.Vector3(x2, h, z2);

// const arr = [p1, p2, p3];
// // 三维样条曲线
// const curve = new THREE.CatmullRomCurve3(arr);

// p1、p3轨迹线起始点坐标
const p1 = new THREE.Vector3(-100, 0, -100);
const p3 = new THREE.Vector3(100, 0, 100);
// 计算p1和p3的中点坐标
const x2 = (p1.x + p3.x)/2;
const z2 = (p1.z + p3.z)/2;
const h = 100;
const p2 = new THREE.Vector3(x2, h, z2);
// 三维二次贝赛尔曲线
const curve = new THREE.QuadraticBezierCurve3(p1, p2, p3);


geometry.setFromPoints(curve.getPoints(50))
const geometry2 = geometry.clone()
geometry2.setFromPoints([p1,p2,p3])

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

// scene.add(point)
scene.add(point2)
scene.add(line)
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