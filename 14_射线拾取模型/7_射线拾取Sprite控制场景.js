import * as THREE from 'three'
import {OrbitControls } from 'three/addons/controls/OrbitControls.js'
// 引入dat.gui.js的一个类GUI
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import Stats from 'three/addons/libs/stats.module.js'
const width = window.innerWidth
const height = window.innerHeight
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(30,width/height,1,3000)

const geometry = new THREE.BoxGeometry(50,100,50)
const material = new THREE.MeshLambertMaterial({
    color:'blue'
})

var texture = new THREE.TextureLoader().load("../2.jpg");
// 创建精灵材质对象SpriteMaterial
const spriteMaterial = new THREE.SpriteMaterial({
    // color:'purple',//设置颜色
    map:texture
  });
const sprite = new THREE.Sprite(spriteMaterial)
// 控制精灵大小
console.log('sprite.scale',sprite.scale);
sprite.scale.set(200, 200, 1); //只需要设置x、y两个分量就可以
sprite.position.set(0,50,0);


const planeGeomtry = new THREE.BoxGeometry(800,20,800)
const planeMaterial = new THREE.MeshLambertMaterial({
    color:'green'
})
const mesh = new THREE.Mesh(geometry,material)
const mesh2 = new THREE.Mesh(planeGeomtry,planeMaterial)
sprite.change = ()=>{
    mesh2.material.color.set('red');
}
mesh2.position.set(0,-60,0)
mesh2.receiveShadow = true
mesh.castShadow = true
const directLight = new THREE.DirectionalLight(0xfffff,100)
directLight.position.set(0,100,100)

directLight.castShadow = true
camera.position.set(500,500,500)
camera.lookAt(0,0,0)
// 设置三维场景计算阴影的范围
directLight.shadow.camera.left = -50;
directLight.shadow.camera.right = 50;
directLight.shadow.camera.top = 200;
directLight.shadow.camera.bottom = -100;
directLight.shadow.camera.near = 0.5;
directLight.shadow.camera.far = 600;


const axes = new THREE.AxesHelper(300)
scene.add(sprite)
// scene.add(mesh)
scene.add(mesh2)
scene.add(camera)
scene.add(axes)
scene.add(directLight)
const renderer = new THREE.WebGLRenderer()
renderer.render(scene,camera)
renderer.setSize(width,height)
// 设置渲染器，允许光源阴影渲染
renderer.shadowMap.enabled = true; 

renderer.render(scene,camera)
const orbit = new OrbitControls(camera,renderer.domElement)
renderer.render(scene,camera)
orbit.addEventListener('change',()=>{
    renderer.render(scene,camera)
})


document.body.appendChild(renderer.domElement)

renderer.domElement.addEventListener('click', function (event) {
    const px = event.offsetX;
    const py = event.offsetY;
    // 需要重新计算
    const x = (px / window.innerWidth) * 2 - 1;
    const y = -(py / window.innerHeight) * 2 + 1;
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
    const intersects = raycaster.intersectObjects([sprite]);
    

    if (intersects.length > 0) {
        intersects[0].object.change()
    }

    render();
})

function loop() {
   
    renderer.render(scene,camera)
    requestAnimationFrame(loop);
}
loop();