import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 修改着色器
// 获取着色器
// 替换着色器内容



const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    50000
);
camera.position.set(15, 15, 15)
// camera.lookAt(1, 1, 1)
// 场景
const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({
    // logarithmicDepthBuffer: true,
    antialias: true,
    alpha: true
})
renderer.shadowMap.enabled = true
// renderer.outputEncoding = THREE.sRGBEncoding
// renderer.toneMapping = THREE.LinearToneMapping
// renderer.toneMappingExposure = 0.1


const clock = new THREE.Clock()
let time = clock.getElapsedTime()

//初始化函数
export function init() {
    document.querySelector("#scene").appendChild(
        renderer.domElement
    )
    const controller = new OrbitControls(camera, renderer.domElement)

    const axes = new THREE.AxesHelper(10)
    scene.add(axes)
    function anime() {
        time = clock.getElapsedTime()
        basicUniforms.uTime.value = time
        requestAnimationFrame(anime)
        controller.update()
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.render(scene, camera)
    }
    anime()
}
const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide
})

const basicUniforms = {
    uTime: {
        value: 0
    }
}

material.onBeforeCompile = (shader, render) => {
    console.log(shader.fragmentShader)
    console.log(shader.vertexShader)
    console.log(shader.uniforms)

    shader.uniforms.uTime = basicUniforms.uTime
    shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        transformed.x += sin(uTime*2.0);
        transformed.y += cos(uTime*2.0);
        transformed.z += sin(uTime*4.0);
        `
    )
    shader.vertexShader = shader.vertexShader.replace(
        '#include <common>',
        `
        #include <common>
        uniform float uTime;
        `
    )
}
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    material
)
scene.add(cube)


