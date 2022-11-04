import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import * as dat from 'dat.gui';
// import { gsap } from "gsap";
// const gui = new dat.GUI();
import vertexShader from "@/shader/basic point/basicVertexShader.glsl?raw"
import fragmentShader from "@/shader/basic point/basicFragmentShader.glsl?raw"

// 创建缓冲区集合体
// 设置位置
// 点材质
// 点
// 设置着色器材质
// 导入片元着色器，点着色器
// 点着色器，设置点大小



const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    500
);
camera.position.set(5, 5, 5)
// camera.lookAt(1, 1, 1)
// 场景
const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({
    // logarithmicDepthBuffer: true,
    antialias: true,
    alpha: true
})
renderer.shadowMap.enabled = true


const clock = new THREE.Clock()
//初始化函数
export function init() {
    document.querySelector("#scene").appendChild(
        renderer.domElement
    )
    const controller = new OrbitControls(camera, renderer.domElement)

    const axes = new THREE.AxesHelper(10)
    scene.add(axes)
    function anime() {
        requestAnimationFrame(anime)
        controller.update()
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.render(scene, camera)
    }
    anime()
}

const bufferGeometry = new THREE.BufferGeometry();
const pointVertices = new Float32Array([0.0, 0.0, 0.0]);

bufferGeometry.setAttribute('position', new THREE.BufferAttribute(pointVertices, 3));
// const pointMaterial = new THREE.PointsMaterial({
//     size: 1,
//     color: 0xff0000,

// })

const pointMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader
})
const Point = new THREE.Points(bufferGeometry, pointMaterial)
scene.add(Point)
