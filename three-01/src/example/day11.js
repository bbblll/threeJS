import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader"
// 添加场景 scene.env（所有物体，默认环境贴图）/scene.background（背景）
// 也可以使用一张的图（专门拍摄）
// 什么是hdr，整合多种曝光度的图片（不同曝光度能看到的东西不一样），有更好的视觉效果，图像更大
// hdr需要使用RGB加载，图像较大，使用异步加载
// 设置纹理模式，经纬模式（默认立方体模式）

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
const rgbELoader = new RGBELoader()
rgbELoader.loadAsync("src/textures/hdr/003.hdr").then(texture => {
    texture.mapping = THREE.EquirectangularReflectionMapping
    scene.background = texture
    scene.environment = texture
})

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
    // 背景
    // scene.background = envTexture
    // 默认环境贴图
    // scene.environment = envTexture
    const sphereGeo = new THREE.SphereGeometry(20, 64, 64)
    const standardMaterial = new THREE.MeshStandardMaterial({
        // envMap: envTexture,
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