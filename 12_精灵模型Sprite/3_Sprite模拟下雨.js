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
  // 创建精灵模型对象，不需要几何体geometry参数
// const sprite = new THREE.Sprite(spriteMaterial);

const group = new THREE.Group();
for (let i = 0; i < 16000; i++) {
    // 精灵模型共享材质
    const sprite = new THREE.Sprite(spriteMaterial);
    group.add(sprite);
    sprite.scale.set(1, 1, 1);
    // 设置精灵模型位置，在长方体空间上上随机分布
    const x = 1000 * (Math.random() - 0.5);
    const y = 600 * Math.random();
    const z = 1000 * (Math.random() - 0.5);
    sprite.position.set(x, y, z)
}





const planeGeomtry = new THREE.BoxGeometry(800,20,800)
const planeMaterial = new THREE.MeshLambertMaterial({
    color:'green'
})
const mesh = new THREE.Mesh(geometry,material)
const mesh2 = new THREE.Mesh(planeGeomtry,planeMaterial)
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
scene.add(group)
scene.add(mesh)
scene.add(mesh2)
scene.add(camera)
scene.add(axes)
scene.add(directLight)
const renderer = new THREE.WebGLRenderer()

renderer.setSize(width,height)
// 设置渲染器，允许光源阴影渲染
renderer.shadowMap.enabled = true; 

renderer.render(scene,camera)
const clock = new THREE.Clock();
function loop() {
    // loop()两次执行时间间隔
    const t = clock.getDelta();
    group.children.forEach(sprite => {
        // 雨滴的y坐标每次减t*60
        sprite.position.y -= t*60;
        if (sprite.position.y < 0) {
            sprite.position.y = 600;
        }
    });
    renderer.render(scene,camera)
    requestAnimationFrame(loop);
}
loop();
const orbit = new OrbitControls(camera,renderer.domElement)
orbit.addEventListener('change',()=>{
    renderer.render(scene,camera)
})


document.body.appendChild(renderer.domElement)