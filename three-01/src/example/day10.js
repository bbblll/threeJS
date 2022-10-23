import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// cube纹理加载（环境贴图）
// 加载六张图
// 创建物体
// stand材质
// 灯光

//问题
// 加载纹理一定要拿一个新变量存起来使用，并不是load就可以了

const div = document.createElement("div")
div.style.width = "100px"
div.style.height = "100px"
div.style.position = "fixed"
div.style.right = "20px"
div.style.top = "20px"
div.style.color = "0xfff"
document.body.appendChild(div)

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(-50, 50, 0)
const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer()
const cubeTextureLoader = new THREE.CubeTextureLoader()


//初始化函数
export function init() {
    document.querySelector("#scene").appendChild(
        renderer.domElement
    )
    const orbitControls = new OrbitControls(
        camera, renderer.domElement
    )
    const axes = new THREE.AxesHelper(45)
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
    addLight()
}

function addSphere() {
    const envTexture = cubeTextureLoader.load([
        "src/textures/environmentMaps/1/px.jpg",
        "src/textures/environmentMaps/1/nx.jpg",
        "src/textures/environmentMaps/1/py.jpg",
        "src/textures/environmentMaps/1/ny.jpg",
        "src/textures/environmentMaps/1/pz.jpg",
        "src/textures/environmentMaps/1/nz.jpg"
    ])
    const sphereGeo = new THREE.SphereGeometry(20, 64, 64)
    const standardMaterial = new THREE.MeshStandardMaterial({
        envMap: envTexture,
        metalness: 0.7,
        roughness: 0.1
    })
    const sphere = new THREE.Mesh(sphereGeo, standardMaterial)
    scene.add(sphere)

}

function addLight() {
    const envLight = new THREE.AmbientLight(0xffffff, 1)
    scene.add(envLight)
    // 设置直线光
    //     const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    //     directionalLight.position.set(50, 50, 50)
    //     scene.add(directionalLight);
    // 
}