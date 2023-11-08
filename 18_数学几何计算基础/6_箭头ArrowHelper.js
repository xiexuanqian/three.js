import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

const width = window.innerWidth
const height = window.innerHeight
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000)

const envLight = new THREE.AmbientLight(0xfffff, 100)

camera.position.set(0, 100, 500)
camera.lookAt(0, 0, 0)
const A = new THREE.Vector3(0, 30, 0);//A点
const B = new THREE.Vector3(80, 0, 0);//B点

// 绿色小球可视化A点位置
const AMesh = createSphereMesh(0x00ff00, 2);
AMesh.position.copy(A);
// 红色小球可视化B点位置
const BMesh = createSphereMesh(0xff0000, 2);
BMesh.position.copy(B);

const group = new THREE.Group();
group.add(AMesh, BMesh);

function createSphereMesh(color, R) {
    const geometry = new THREE.SphereGeometry(R);
    const material = new THREE.MeshLambertMaterial({
        color: color,
    });
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
}

// 绘制一个从A指向B的箭头
const AB = B.clone().sub(A);
const L = AB.length();//AB长度
const dir = AB.clone().normalize();//单位向量表示AB方向

// 生成箭头从A指向B
const arrowHelper = new THREE.ArrowHelper(dir, A, L)
group.add(arrowHelper);


const axes = new THREE.AxesHelper(300)
scene.add(camera)
scene.add(axes)
scene.add(envLight)
scene.add(group)

const renderer = new THREE.WebGLRenderer()
// width, height：canvas画布宽高度
renderer.setSize(width, height);
renderer.render(scene, camera);



document.body.appendChild(renderer.domElement)
const orbit = new OrbitControls(camera, renderer.domElement)
orbit.addEventListener('change', () => {
    renderer.render(scene, camera);
})
function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render)
}
render()