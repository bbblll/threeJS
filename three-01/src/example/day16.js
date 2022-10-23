import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui';

const gui = new dat.GUI();
// 点球
// 纹理贴图
// 透明度贴图
// 关掉深度影响计算
// 叠加 blending

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
    const sphereGeo = new THREE.SphereGeometry(10, 24, 24)
    const pointsMaterial = new THREE.PointsMaterial({
        color: 0xff0000
    })
    let texture = loader.load("src/textures/particles/2.png")
    pointsMaterial.size = 0.5
    // 纹理贴图
    pointsMaterial.map = texture
    // 透明开启
    pointsMaterial.transparent = true
    // 透明度贴图
    pointsMaterial.alphaMap = texture
    //深度计算关闭
    pointsMaterial.depthWrite = false
    pointsMaterial.blending = THREE.AdditiveBlending
    const points = new THREE.Points(sphereGeo, pointsMaterial)
    scene.add(points)
}

