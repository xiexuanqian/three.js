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

const R = 80;//圆弧半径
const H = 200;//直线部分高度
// 直线1
const line1 = new THREE.LineCurve(new THREE.Vector2(R, H), new THREE.Vector2(R, 0));
// 圆弧
const arc = new THREE.ArcCurve(0, 0, R, 0, Math.PI, true);
// 直线2
const line2 = new THREE.LineCurve(new THREE.Vector2(-R, 0), new THREE.Vector2(-R, H));

// CurvePath创建一个组合曲线对象
const CurvePath = new THREE.CurvePath();
//line1, arc, line2拼接出来一个U型轮廓曲线，注意顺序
CurvePath.curves.push(line1, arc, line2);
// CurvePath.curves.push(line1, line2, arc);

geometry.setFromPoints(CurvePath.getPoints(50))

const points = new THREE.PointsMaterial({
    color:'red',
    size:10
})

const material = new THREE.LineBasicMaterial({
    color:0xfffff
})

const point = new THREE.Points(geometry,points)
const line = new THREE.Line(geometry,material)

camera.position.set(0,0,200)
camera.lookAt(0,0,0)

const axes = new THREE.AxesHelper(300)

// scene.add(point)
scene.add(line)

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