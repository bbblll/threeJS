import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
//今天遇到的问题，没有设置相机位置，导致看不到东西
//querySelector必须在所有东西渲染出来才能使用
//添加控制器，有特俗的库，参数camera，renderer.dam
//THREE.Color的使用，输入三个0-1的值


// 创建一个场景
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75, //视野角度，所能看到的范围
    window.innerWidth / window.innerHeight, //长宽比
    0.1, //最近截面
    1000//最远截面
);
camera.position.set(-50, 50, 130)
//添加渲染
const renderer = new THREE.WebGLRenderer();

export function init() {
    for (let i = 0; i < 30; i++) {
        let arr = []
        for (let j = 0; j < 9; j++) {
            arr.push(Math.random() * 5)
        }
        addGeo(arr)
    }
    // addcube()
    const axes = new THREE.AxesHelper(50)
    scene.add(axes)
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector("#scene").appendChild(renderer.domElement);
    //
    const camControl = new OrbitControls(camera, renderer.domElement)
    //添加渲染
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        camera.aspect = window.innerWidth / window.innerHeight //长宽比
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
    }
    animate();
}

function addGeo(arr) {
    const geometry = new THREE.BufferGeometry();
    // 一次用三个点
    const vertices = new Float32Array(arr);
    // itemSize = 3 因为每个顶点都是一个三元组。
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    let color = new THREE.Color(
        Math.random(),
        Math.random(),
        Math.random())
    const material = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.5
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh)
}

function addcube() {
    //添加立方体
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    console.log(cube)
    scene.add(cube);
}

