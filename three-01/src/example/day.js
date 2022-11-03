import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import * as dat from 'dat.gui';
// import { gsap } from "gsap";
// const gui = new dat.GUI();
import { Water } from 'three/addons/objects/Water2.js';
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

// 加载RGBloader（hdr文件）
// GLTFloader（模型文件）
// 场景背景（异步加载）
// 设置纹理，柱型环绕
// 加载浴缸
// 将第二个物体的集合体给water
// 添加直线光


const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    500
);
camera.position.set(0, 5, 5)
// camera.lookAt(1, 1, 1)
// 场景
const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({
    // logarithmicDepthBuffer: true,
    antialias: true,
    alpha: true
})
renderer.shadowMap.enabled = true

const rgbLoader = new RGBELoader()
rgbLoader.loadAsync("src/textures/hdr/002.hdr").then((texture) => {
    texture.mapping = THREE.CubeReflectionMapping
    scene.background = texture
    scene.environment = texture
})

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



const gltfLoader = new GLTFLoader()
gltfLoader.load("src/model/yugang.glb", (gltf) => {
    // console.log(gltf.scene.children[0])
    const mesh1 = gltf.scene.children[1]
    const mesh0 = gltf.scene.children[0]
    mesh0.material.side = THREE.DoubleSide
    mesh0.position.y = 0.5
    scene.add(mesh0)

    const waterGeometry = mesh1.geometry
    const water = new Water(waterGeometry, {
        color: "#ffffff",//颜色
        scale: 3.0,//水纹大小
        flowDirection: new THREE.Vector2(0.0, 1),//水流方向
        // 细腻度
        textureWidth: 1024,
        textureHeight: 1024
    });
    scene.add(water)

})


// 加直射光
const light = new THREE.DirectionalLight(
    new THREE.Color("#ffffff"),
    0.5
)
scene.add(light)
