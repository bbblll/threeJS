import * as THREE from "three"
import { Material } from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 阴影，
// 可以产生阴影（平行光，点光源，聚光灯）
// 不可产生阴影（环境光）
// 基础材质，不受光照影响(所以不能接收阴影)

// 渲染器开启光照计算
// 光源开启投射阴影
// 设置物体投射阴影
// 设置物体（参照）接收阴影

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(-50, 50, 0)
const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer()
renderer.shadowMap.enabled = true

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
    addplane()
    addLight()
}

function addSphere() {
    const sphereGeo = new THREE.SphereGeometry(1, 64, 64)
    const standardMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff
    })
    const sphere = new THREE.Mesh(sphereGeo, standardMaterial)
    sphere.castShadow = true
    scene.add(sphere)

}

function addLight() {
    const envLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(envLight)
    // 设置直线光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 20)
    directionalLight.castShadow = true
    scene.add(directionalLight);
}
function addplane() {
    const geometry = new THREE.PlaneGeometry(50, 50);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(geometry, material);
    plane.position.set(0, 0, -2)
    plane.receiveShadow = true
    scene.add(plane);
}