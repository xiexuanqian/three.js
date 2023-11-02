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


// const arc = new THREE.EllipseCurve(0, 0, 100, 50);
// const arc = new THREE.ArcCurve(0, 0, 100, 0, 2 * Math.PI);
// 半圆弧
// const arc = new THREE.ArcCurve(0, 0, 100, 0, Math.PI);
// 四分之一圆弧
const arc = new THREE.ArcCurve(0, 0, 100, 0, Math.PI/2);



geometry.setFromPoints(arc.getSpacedPoints(50))

const points = new THREE.PointsMaterial({
    color:'red',
    size:10
})

const material = new THREE.LineBasicMaterial({
    color:0xfffff
})

const point = new THREE.Points(geometry,points)
const line = new THREE.LineCurve(geometry,material)

camera.position.set(0,0,200)
camera.lookAt(0,0,0)

const axes = new THREE.AxesHelper(300)

scene.add(point)
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