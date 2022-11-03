import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import rawFragmentShader from "@/shader/raw/rawFragmentShader.glsl?raw"
import rawVertexShader from "@/shader/raw/rawVertexShader.glsl?raw"
import * as dat from 'dat.gui';
// import { gsap } from "gsap";
const gui = new dat.GUI();


// 参数，频率，倍数
// uniform传参(噪音比例，噪音频率，xz比例，)
// gui（min，max，step，onchange）
// 材质允许透明


const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    500
);
camera.position.set(0, 0, 2)
// camera.lookAt(1, 1, 1)
// 场景
const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({
    // logarithmicDepthBuffer: true,
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
        shaderMaterial.uniforms.utime.value = clock.getElapsedTime()

        requestAnimationFrame(anime)
        controller.update()
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.render(scene, camera)
    }
    anime()
}

const param = {
    frequency: 23.0,
    scale: 0.08,
    xzscale: 1.0,
    xspeed: 0.0,
    yspeed: 0.0,
    uopacity: 1.0,

    nfrequency: 30.0,
    nscale: 0.10,
    nspeed: 1.0,

    highcolor: "#ff0000",
    lowcolor: "#ffff00"
}

// 材质
// uniform传参(噪音比例，噪音频率，xz比例，时间)
// x速度，y速度，噪声速度
const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
        xzfrequency: {
            value: param.frequency
        },
        hscale: {
            value: param.scale
        },
        nfrequency: {
            value: param.nfrequency
        },
        nscale: {
            value: param.nscale
        },
        xzscale: {
            value: param.xzscale
        },
        utime: {
            value: 0
        },
        xspeed: {
            value: param.xspeed
        },
        yspeed: {
            value: param.yspeed
        },
        nspeed: {
            value: param.nspeed
        },
        uopacity: {
            value: param.uopacity
        },
        highcolor: {
            value: new THREE.Color(param.highcolor)
        },
        lowcolor: {
            value: new THREE.Color(param.lowcolor)
        },
    },
    vertexShader: rawVertexShader,
    fragmentShader: rawFragmentShader,
    side: THREE.DoubleSide,
    transparent: true
});



const xzFolder = gui.addFolder("xz")
xzFolder.add(param, "frequency", 5.0, 40.0, 1).onChange(() => {
    shaderMaterial.uniforms.xzfrequency.value = param.frequency
})
xzFolder.add(param, "scale", 0.05, 0.1, 0.001).onChange(() => {
    shaderMaterial.uniforms.hscale.value = param.scale
})
xzFolder.add(param, "xzscale", 0.5, 5.0, 0.1).onChange(() => {
    shaderMaterial.uniforms.xzscale.value = param.xzscale
})
xzFolder.add(param, "xspeed", 0.0, 5.0, 0.01).onChange(() => {
    shaderMaterial.uniforms.xspeed.value = param.xspeed
})
xzFolder.add(param, "yspeed", 0.0, 5.0, 0.01).onChange(() => {
    shaderMaterial.uniforms.yspeed.value = param.yspeed
})
xzFolder.add(param, "uopacity", 0.1, 2.0, 0.01).onChange(() => {
    shaderMaterial.uniforms.uopacity.value = param.uopacity
})


const noiseFolder = gui.addFolder("noise")
noiseFolder.add(param, "nfrequency", 5.0, 40.0, 0.1).onChange(() => {
    shaderMaterial.uniforms.nfrequency.value = param.nfrequency
})
noiseFolder.add(param, "nscale", 0.001, 0.2, 0.0001).onChange(() => {
    shaderMaterial.uniforms.nscale.value = param.nscale
})
noiseFolder.add(param, "nspeed", 0.01, 2.0, 0.0001).onChange(() => {
    shaderMaterial.uniforms.nspeed.value = param.nspeed
})

const colorfolder = gui.addFolder("color")
colorfolder.addColor(param, "highcolor").onChange((value) => {
    shaderMaterial.uniforms.highcolor.value = new THREE.Color(value)
})
colorfolder.addColor(param, "lowcolor").onChange((value) => {
    shaderMaterial.uniforms.lowcolor.value = new THREE.Color(value)
})

const planeGeometry = new THREE.PlaneGeometry(1, 1, 512, 512)
const plane = new THREE.Mesh(
    planeGeometry,
    shaderMaterial,
)

scene.add(plane)

