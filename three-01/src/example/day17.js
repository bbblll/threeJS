import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui';

const gui = new dat.GUI();
// 设置几何缓冲区
// 随机设置5000个顶点
// 随机设置颜色
// 启用着色器
// 关掉材质里的颜色


const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(20, 20, 20)
const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({
    logarithmicDepthBuffer: true,
    antialias: true
})
const loader = new THREE.TextureLoader()


//初始化函数
export function init() {
    document.querySelector("#scene").appendChild(
        renderer.domElement
    )
    const orbitControls = new OrbitControls(
        camera, renderer.domElement
    )
    const axes = new THREE.AxesHelper(10)
    scene.add(axes)
    function anime() {
        requestAnimationFrame(anime)
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.render(scene, camera)
    }
    anime()
    addSphere()
}


function addSphere() {
    const count = 5000
    const bufferGeometry = new THREE.BufferGeometry();

    const position = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
        position[i] = Math.random() * 50 - 25
        colors[i] = Math.random()
    }

    // itemSize = 3 因为每个顶点都是一个三元组。
    bufferGeometry.setAttribute('position', new THREE.BufferAttribute(position, 3));
    bufferGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));


    let texture = loader.load("src/textures/particles/1.png")
    const pointsMaterial = new THREE.PointsMaterial({
        // color: 0xff0000,
        map: texture,
        size: 0.5,
        transparent: true,
        alphaMap: texture,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true
    })

    const points = new THREE.Points(bufferGeometry, pointsMaterial)
    scene.add(points)
}

