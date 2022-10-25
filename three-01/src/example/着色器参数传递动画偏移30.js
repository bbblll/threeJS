import * as THREE from "three"
// import * as CANNON from "cannon-es"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import rawFragmentShader from "@/shader/raw/rawFragmentShader.glsl?raw"
import rawVertexShader from "@/shader/raw/rawVertexShader.glsl?raw"
import { Uniform } from "three";

// 设置x偏移
// 设置z偏移
// 设置x，z倾斜
// 设置余弦函数
// 传递uniform参数
// 设置平面段数
// 设置波动




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



const planeGeometry = new THREE.PlaneGeometry(30, 30, 200, 200);
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
console.log(plane)
plane.receiveShadow = true
// plane.rotation.x = -Math.PI / 2
scene.add(plane);


