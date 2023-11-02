import * as THREE from 'three'
import {OrbitControls } from 'three/addons/controls/OrbitControls.js'
// 引入dat.gui.js的一个类GUI
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import Stats from 'three/addons/libs/stats.module.js'
const width = window.innerWidth
const height = window.innerHeight
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(30,width/height,1,3000)

// 画一个圆弧
const geometry = new THREE.BufferGeometry()
const R = 50
const N = 25
const sp = 2*Math.PI/N

const arr = []
for(let i=0;i<N;i++){
    const angle = sp*i
    const x = R*Math.cos(angle)
    const y = R*Math.sin(angle)
    arr.push(x,y,0)
}

var vertices = new Float32Array(arr)

const attributes = new THREE.BufferAttribute(vertices,3)

geometry.attributes.position = attributes

const points = new THREE.PointsMaterial({
    color:'red',
    size:10
})

const material = new THREE.LineBasicMaterial({
    color:0xfffff
})

const point = new THREE.Points(geometry,points)
const line = new THREE.LineLoop(geometry,material)

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