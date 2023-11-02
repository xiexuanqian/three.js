import * as THREE from 'three'
import {OrbitControls } from 'three/addons/controls/OrbitControls.js'
// 引入dat.gui.js的一个类GUI
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import Stats from 'three/addons/libs/stats.module.js'
const width = window.innerWidth
const height = window.innerHeight
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(30,width/height,1,3000)

// 三维样条曲线
const arr = [
    new THREE.Vector3(-50, 20, 90),
    new THREE.Vector3(-10, 40, 40),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(60, -60, 0),
    new THREE.Vector3(70, 0, 80)
]
// const path = new THREE.CatmullRomCurve3(arr);

// p1、p2、p3表示三个点坐标
const p1 = new THREE.Vector3(-80, 0, 0);
const p2 = new THREE.Vector3(20, 100, 0);
const p3 = new THREE.Vector3(80, 0, 100);
// 三维二次贝赛尔曲线
const path = new THREE.QuadraticBezierCurve3(p1, p2, p3);


// path:路径   40：沿着轨迹细分数  2：管道半径   25：管道截面圆细分数
const geometry = new THREE.TubeGeometry(path, 1000, 2, 10000);
// const pointGeo = new THREE.BufferGeometry()
// pointGeo.setFromPoints(arr)

const points = new THREE.PointsMaterial({
    color:'purple',
    size:5
})

const material = new THREE.LineBasicMaterial({
    color:0xfffff
})
const material2 = new THREE.MeshLambertMaterial({
    color:'red',
    // side:THREE.DoubleSide
    side:THREE.FrontSide
})

const envLight = new THREE.AmbientLight('red',10)

// const point = new THREE.Points(pointGeo,points)
// const line = new THREE.Line(pointGeo,material)
const mesh = new THREE.Mesh(geometry,material2)

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