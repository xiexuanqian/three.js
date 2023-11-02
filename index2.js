import * as THREE from 'three'
import {OrbitControls } from 'three/addons/controls/OrbitControls.js'
// 引入dat.gui.js的一个类GUI
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import Stats from 'three/addons/libs/stats.module.js'
const width = window.innerWidth
const height = window.innerHeight
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(30,width/height,1,3000)



const geometry = new THREE.SphereGeometry(50, 50,50); 
// const geometry = new THREE.BufferGeometry(200, 100); 
// const vertices = new Float32Array([
//     -1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 1.0, 1.0, 0.0, -1.0, 1.0, 0,
//   ]);
//   // 创建顶点属性
//   geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
//   // 创建索引
//   const indices = new Uint16Array([0, 1, 2, 2, 3, 0]);
//   // 创建索引属性
//   geometry.setIndex(new THREE.BufferAttribute(indices, 1));
// const geometry = new THREE.SphereGeometry(100, 100,100); 
//纹理贴图加载器TextureLoader
const texLoader = new THREE.TextureLoader();
// .load()方法加载图像，返回一个纹理对象Texture
const texture = texLoader.load('./2.jpg');
// texture.offset.x +=0.5
texture.wrapS = THREE.RepeatWrapping
texture.wrapT = THREE.RepeatWrapping
texture.repeat.set(2,1)
// const material = new THREE.MeshPhysicalMaterial({
//     // 设置纹理贴图：Texture对象作为材质map属性的属性值
//     map: texture,//map表示材质的颜色贴图属性
// });
const material =new THREE.MeshStandardMaterial({
    metalness: 1.0,//金属度属性
})

// const uvs = new Float32Array([
//     0,0,
//     1,0,
//     1,1,
//     0,1
// ])

// geometry.attributes.uv = new THREE.BufferAttribute(uvs,2)

const mesh = new THREE.Mesh(geometry,material)
mesh.rotateZ(Math.PI)

const envLight = new THREE.PointLight('white',1)
envLight.position.set(100,100,100)
envLight.intensity=100

camera.position.set(0,0,200)
camera.lookAt(0,0,0)

const axes = new THREE.AxesHelper(300)

scene.add(mesh)
scene.add(camera)
scene.add(envLight)
scene.add(axes)
const renderer = new THREE.WebGLRenderer()

renderer.setSize(width,height)

renderer.render(scene,camera)

const orbit = new OrbitControls(camera,renderer.domElement)
orbit.addEventListener('change',()=>{
    renderer.render(scene,camera)
})

// 渲染循环
function render() {
    texture.offset.x +=0.001;//设置纹理动画：偏移量根据纹理和动画需要，设置合适的值
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
render();

document.body.appendChild(renderer.domElement)