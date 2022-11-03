import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import rawFragmentShader from "@/shader/raw/rawFragmentShader.glsl?raw"
import rawVertexShader from "@/shader/raw/rawVertexShader.glsl?raw"
import * as dat from 'dat.gui';
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
// const gui = new dat.GUI();


// 导入RGBloader(1)
// 导入GLTFloader(2)
// 纹理映射，圆柱映射(3)
// texture.mapping = THREE.EquirectangularReflectionMapping;
// 异步导入环境纹理(4)
// 设置背景，环境(5)
// 设置render的编码为sRGBEncoding(6)
// 设置render的色调映射tonemapping，为电影级别(7)
// 设置曝光程度tonemappingexposure，（环境亮度）(8)

// 使用GLTFloader加载glb模型文件，
// 将gltf的scene加入环境

// blender设置平滑着色，法相（自动光滑）

// 取出灯盒子，设置纹理shaderMaterial
// 设置红色纹理

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
    // logarithmicDepthBuffer: true,
    antialias: true,
    alpha: true
})
renderer.shadowMap.enabled = true
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 0.1


const clock = new THREE.Clock()

const rgbLoader = new RGBELoader()
rgbLoader.loadAsync("src/blender_model/003.hdr").then((texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping
    scene.environment = texture
    scene.background = texture
})
//初始化函数
export function init() {


    document.querySelector("#scene").appendChild(
        renderer.domElement
    )
    const controller = new OrbitControls(camera, renderer.domElement)
    // const axes = new THREE.AxesHelper(10)
    // scene.add(axes)
    function anime() {
        requestAnimationFrame(anime)
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.render(scene, camera)
    }
    anime()
}
// 材质
const flyLightMaterial = new THREE.ShaderMaterial({
    vertexShader: rawVertexShader,
    fragmentShader: rawFragmentShader,
    side: THREE.DoubleSide,
});

// 导入飞灯
const gltfLoader = new GLTFLoader()
gltfLoader.load("src/blender_model/flyLight.glb", (gltf) => {
    console.log(gltf)
    gltf.scene.children[1].material = flyLightMaterial
    scene.add(gltf.scene)
})






