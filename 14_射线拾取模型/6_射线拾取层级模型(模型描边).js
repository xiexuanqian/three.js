import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
// 引入渲染器通道RenderPass
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
// 引入OutlinePass通道
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';



import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import Stats from 'three/addons/libs/stats.module.js'

import TWEEN from '@tweenjs/tween.js';
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

const group = new THREE.Group()
group.add(mesh, mesh2)
const envLight = new THREE.AmbientLight(0xfffff, 100)

camera.position.set(0, 100, 500)
camera.lookAt(0, 0, 0)

const axes = new THREE.AxesHelper(300)
scene.add(group)
scene.add(camera)
scene.add(axes)
scene.add(envLight)
const renderer = new THREE.WebGLRenderer()

renderer.setSize(width, height)
renderer.shadowMap.enabled = true;

renderer.render(scene, camera)
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
// 多个模型对象
outlinePass.selectedObjects = [group.children];
// 设置OutlinePass通道
composer.addPass(outlinePass);


const orbit = new OrbitControls(camera, renderer.domElement)
orbit.addEventListener('change', () => {
    renderer.render(scene, camera)
})

document.body.appendChild(renderer.domElement)

// 画布跟随窗口变化
window.onresize = function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera)
};
// 渲染循环
function render() {
    composer.render();
    requestAnimationFrame(render);
}
const arr = []
const names = []
renderer.domElement.addEventListener('click', function (event) {
    const px = event.offsetX;
    const py = event.offsetY;
    // 需要重新计算
    const x = (px / window.innerWidth) * 2 - 1;
    const y = -(py / window.innerHeight) * 2 + 1;
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
    const intersects = raycaster.intersectObjects(group.children);
    

    if (intersects.length > 0) {

        // 连续点击，只选中一个
        outlinePass.selectedObjects = [intersects[0].object];
        renderer.render(scene, camera)
        // // 连续点击，选中多个
        // if(names.indexOf(intersects[0].object.name) ===-1){
        //     names.push(intersects[0].object.name)
        //     arr.push(intersects[0].object)

        // }
        // outlinePass.selectedObjects = [...arr];
        // renderer.render(scene, camera)

    }

    render();
})











