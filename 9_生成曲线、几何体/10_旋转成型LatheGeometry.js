import * as THREE from 'three'
import {OrbitControls } from 'three/addons/controls/OrbitControls.js'
// 引入dat.gui.js的一个类GUI
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import Stats from 'three/addons/libs/stats.module.js'
const width = window.innerWidth
const height = window.innerHeight
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(30,width/height,1,3000)

// // Vector2表示的三个点坐标，三个点构成的轮廓相当于两端直线相连接
// const pointsArr = [
//     new THREE.Vector2(50, 60),
//     new THREE.Vector2(25, 0),
//     new THREE.Vector2(50, -60)
// ];
// // LatheGeometry：pointsArr轮廓绕y轴旋转生成几何体曲面
// // pointsArr：旋转几何体的旋转轮廓形状
// // 0, Math.PI：旋转的开始角度和结束角度
// const geometry = new THREE.LatheGeometry(pointsArr, 30,0, 2*Math.PI);

// 通过三个点定义一个二维样条曲线
const curve = new THREE.SplineCurve([
    new THREE.Vector2(50, 60),
    new THREE.Vector2(25, 0),
    new THREE.Vector2(50, -60)
]);
//曲线上获取点,作为旋转几何体的旋转轮廓
const pointsArr = curve.getPoints(50); 
console.log('旋转轮廓数据',pointsArr);
// LatheGeometry：pointsArr轮廓绕y轴旋转生成几何体曲面
const geometry = new THREE.LatheGeometry(pointsArr, 30);

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