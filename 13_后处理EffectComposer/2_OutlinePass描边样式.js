import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
// 引入渲染器通道RenderPass
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
// 引入OutlinePass通道
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
import Stats from 'three/addons/libs/stats.module.js'
import TWEEN from '@tweenjs/tween.js';

console.log(EffectComposer,RenderPass,OutlinePass)
const width = window.innerWidth
const height = window.innerHeight
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000)

const geometry = new THREE.BoxGeometry(50, 100, 50)
const material = new THREE.MeshLambertMaterial({
    color: 'blue'
})
const mesh = new THREE.Mesh(geometry, material)
mesh.name = '长方体'
const geometry2 = new THREE.BoxGeometry(50, 50, 50)
const material2 = new THREE.MeshLambertMaterial({
    color: 'green'
})
mesh.position.set(-50, 0, 0)
const mesh2 = new THREE.Mesh(geometry2, material2)
mesh2.name = '正方体'
mesh2.position.set(60, 0, 0)

const envLight = new THREE.AmbientLight(0xfffff, 100)

camera.position.set(0, 100, 500)
camera.lookAt(0, 0, 0)

const axes = new THREE.AxesHelper(300)
scene.add(mesh)
scene.add(mesh2)
scene.add(camera)
scene.add(axes)
scene.add(envLight)
const renderer = new THREE.WebGLRenderer()
// 创建后处理对象EffectComposer，WebGL渲染器作为参数
const composer = new EffectComposer(renderer);
// 创建一个渲染器通道，场景和相机作为参数
const renderPass = new RenderPass(scene, camera);
// 设置renderPass通道
composer.addPass(renderPass);
// OutlinePass第一个参数v2的尺寸和canvas画布保持一致
const v2 = new THREE.Vector2(window.innerWidth, window.innerHeight);
// const v2 = new THREE.Vector2(800, 600);
const outlinePass = new OutlinePass(v2, scene, camera);
// // 一个模型对象
// outlinePass.selectedObjects = [mesh];
// 多个模型对象
outlinePass.selectedObjects = [mesh,mesh2];

//模型描边颜色，默认白色         
// outlinePass.visibleEdgeColor.set(0xffff00); 
//高亮发光描边厚度
outlinePass.edgeThickness = 1; 
//高亮描边发光强度
outlinePass.edgeStrength = 2; 
 //模型闪烁频率控制，默认0不闪烁
outlinePass.pulsePeriod = 1;

//模型边缘高亮边框颜色，默认白色  
outlinePass.visibleEdgeColor.set(0xffff00);

// 设置OutlinePass通道
composer.addPass(outlinePass);



renderer.setSize(width, height)
renderer.shadowMap.enabled = true;

renderer.render(scene, camera)

const orbit = new OrbitControls(camera, renderer.domElement)
orbit.addEventListener('change', () => {
    renderer.render(scene, camera)
})

document.body.appendChild(renderer.domElement)

// 渲染循环
function render() {
    composer.render();
    // renderer.render(scene, camera);
    requestAnimationFrame(render);
}
render();

