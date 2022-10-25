import * as THREE from "three"
// import * as CANNON from "cannon-es"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import rawFragmentShader from "@/shader/raw/rawFragmentShader.glsl?raw"
import rawVertexShader from "@/shader/raw/rawVertexShader.glsl?raw"

// 深入学习glsl

// 带蓝色的彩色画布
// x轴黑白渐变
// y轴黑白渐变
// 去摸，mod，设计百叶窗
// step，超过0，不超过1.0（斑马条纹）
// x条纹，y条纹。条纹相加
// 图形跑起来
// T字
// 对称渐变




const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    500
);
camera.position.set(20, 20, 20)
camera.lookAt(-1, -1, -1)
// 场景
const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({
    logarithmicDepthBuffer: true,
    antialias: true,
    alpha: true
})
renderer.shadowMap.enabled = true


const clock = new THREE.Clock()

// const textureLoader = new THREE.TextureLoader()
// const texture = textureLoader.load("src/image/8.png")
//初始化函数
export function init() {


    document.querySelector("#scene").appendChild(
        renderer.domElement
    )
    const controller = new OrbitControls(camera, renderer.domElement)
    const axes = new THREE.AxesHelper(10)
    scene.add(axes)
    function anime() {
        let time = clock.getElapsedTime()
        planeMaterial.uniforms.utime.value = time
        requestAnimationFrame(anime)
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.render(scene, camera)
    }
    anime()
}



const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.RawShaderMaterial({
    uniforms: {
        utime: {
            value: 0.0
        }
    },
    vertexShader: rawVertexShader,
    fragmentShader: rawFragmentShader,
    side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// console.log(plane)
plane.receiveShadow = true
// plane.rotation.x = -Math.PI / 2
scene.add(plane);


