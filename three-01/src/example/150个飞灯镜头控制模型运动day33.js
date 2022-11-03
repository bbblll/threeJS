import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import rawFragmentShader from "@/shader/raw/rawFragmentShader.glsl?raw"
import rawVertexShader from "@/shader/raw/rawVertexShader.glsl?raw"
// import * as dat from 'dat.gui';
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { gsap } from "gsap";
// const gui = new dat.GUI();


// gltf.scene.clone(true)复制150个飞灯
// 随机位置
// gsap设置旋转
// 随机上升，随机下降repeat，yoyo
// "+=" + Math.random() 随机位移.
// 设置control自动旋转，速度
// 更新control
// 设置仰望视角，polarAngle（最大，最小），垂直方向视角


const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    500
);
camera.position.set(-20, -100, -20)
// camera.lookAt(1, 1, 1)
// 场景
const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({
    // logarithmicDepthBuffer: true,
    antialias: true,
    alpha: true
})
renderer.shadowMap.enabled = true
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.LinearToneMapping
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
    controller.autoRotate = true
    controller.autoRotateSpeed = 0.3
    controller.maxPolarAngle = Math.PI - 1.0
    controller.minPolarAngle = Math.PI - 1.0

    // const axes = new THREE.AxesHelper(10)
    // scene.add(axes)
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
// 材质
const flyLightMaterial = new THREE.ShaderMaterial({
    vertexShader: rawVertexShader,
    fragmentShader: rawFragmentShader,
    side: THREE.DoubleSide,
});

// 导入飞灯
const gltfLoader = new GLTFLoader()
gltfLoader.load("src/blender_model/flyLight.glb", (gltf) => {
    gltf.scene.children[1].material = flyLightMaterial
    for (let i = 0; i < 200; i++) {
        createLight()
    }

    function createLight() {
        let flyLight_copy = gltf.scene.clone(true)
        flyLight_copy.position.set(
            (Math.random() - 0.5) * 600,
            Math.random() * 30 + 15,
            (Math.random() - 0.5) * 600,
        )
        gsap.to(flyLight_copy.rotation, {
            y: Math.PI * 2,
            delay: Math.random(),
            duration: 10,
            repeat: -1,
            ease: "none"
        })
        gsap.to(flyLight_copy.position, {
            y: "+=" + Math.random() * 20,
            duration: 5,
            delay: 5 * Math.random(),
            repeat: -1,
            yoyo: true

        })
        scene.add(flyLight_copy)
    }

})






