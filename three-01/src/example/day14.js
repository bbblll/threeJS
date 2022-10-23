import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui';

const gui = new dat.GUI();
// 点光源，聚光灯2
// 点光源，目标
// 衰减
// 渲染机，物理模式下



const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(-50, 50, 0)
const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({
    logarithmicDepthBuffer: true,
    antialias: true
})
renderer.shadowMap.enabled = true
renderer.physicallyCorrectLights = true

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

let sphere
function addSphere() {
    const sphereGeo = new THREE.SphereGeometry(1, 64, 64)
    const standardMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff
    })
    sphere = new THREE.Mesh(sphereGeo, standardMaterial)
    sphere.castShadow = true
    scene.add(sphere)

    // gui.add(sphere.position, "x",0,1)

}

function addLight() {
    const envLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(envLight)
    // 设置直线光
    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.target = sphere
    spotLight.position.set(5, 5, 5)
    spotLight.castShadow = true
    //越大效果越好
    spotLight.shadow.radius = 5
    //设置阴影分辨率
    spotLight.shadow.mapSize.set(1024, 1024)
    // 投影属性
    gui.add(spotLight, "angle", 0, 10)
    gui.add(spotLight, "distance", 0, 100)
    gui.add(spotLight, "decay", 0, 10)
    gui.add(spotLight, "penumbra", 0, 1)

    scene.add(spotLight);
}
function addplane() {
    const geometry = new THREE.PlaneGeometry(30, 30);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(geometry, material);
    plane.position.set(0, 0, -1)
    plane.receiveShadow = true
    scene.add(plane);
}