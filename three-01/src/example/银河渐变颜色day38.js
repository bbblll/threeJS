import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import * as dat from 'dat.gui';
// import { gsap } from "gsap";
// const gui = new dat.GUI();
import vertexShader from "@/shader/basic point/basicVertexShader.glsl?raw"
import fragmentShader from "@/shader/basic point/basicFragmentShader.glsl?raw"

// 溜溜网古建筑模型
// 创建烟花类
// 点击创建烟花函数
// hsl设置颜色，360，100%，80%（颜色，纯度，亮度）
// 设置随机位置



const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    500
);
camera.position.set(5, 5, 5)
// camera.lookAt(1, 1, 1)
// 场景
const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({
    // logarithmicDepthBuffer: true,
    antialias: true,
    alpha: true
})
renderer.shadowMap.enabled = true
const loader = new THREE.TextureLoader()


const clock = new THREE.Clock()
//初始化函数
export function init() {
    document.querySelector("#scene").appendChild(
        renderer.domElement
    )
    const controller = new OrbitControls(camera, renderer.domElement)

    addSphere()
    const axes = new THREE.AxesHelper(10)
    scene.add(axes)
    function anime() {
        let time = clock.getElapsedTime()
        pointsMaterial.uniforms.utime.value = time
        requestAnimationFrame(anime)
        controller.update()
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.render(scene, camera)
    }
    anime()
}

// const bufferGeometry = new THREE.BufferGeometry();
// const pointVertices = new Float32Array([0.0, 0.0, 0.0]);

// bufferGeometry.setAttribute('position', new THREE.BufferAttribute(pointVertices, 3));

// const pointMaterial = new THREE.ShaderMaterial({
//     vertexShader: vertexShader,
//     fragmentShader: fragmentShader
// })
// const Point = new THREE.Points(bufferGeometry, pointMaterial)
// scene.add(Point)

const parameter = {
    count: 200,
    size: 0.3,
    radius: 13,
    branch: 4,
    color: "#ff6030",
    Scale: 0.1,
    endColor: "#1b3984"
}

let pointsMaterial
function addSphere() {
    const bufferGeometry = new THREE.BufferGeometry();

    const position = new Float32Array(parameter.count * 3);
    const colors = new Float32Array(parameter.count * 3);
    const textureIndex = new Float32Array(parameter.count);
    const aScale = new Float32Array(parameter.count);


    // const colors = new Float32Array(count * 3);
    const centerColor = new THREE.Color(parameter.color)
    const endColor = new THREE.Color(parameter.endColor)

    const max_distance = Math.pow(parameter.radius, 3) / 35
    for (let i = 0; i < parameter.count; i++) {
        let current = i * 3
        let angel = (i % parameter.branch) * (2 * Math.PI / parameter.branch)
        let distance = Math.random() * parameter.radius
        distance = Math.pow(distance, 3) / 35

        let randomX = Math.pow((Math.random() * 3 - 1.5), 3) * (max_distance + 20 - distance) / 25
        let randomY = Math.pow((Math.random() * 3 - 1.5), 3) * (max_distance + 20 - distance) / 25
        let randomZ = Math.pow((Math.random() * 3 - 1.5), 3) * (max_distance + 20 - distance) / 25

        position[current] = distance * Math.sin(angel + distance * parameter.Scale) + randomX
        position[current + 1] = 0 + randomY
        position[current + 2] = distance * Math.cos(angel + distance * parameter.Scale) + randomZ

        let starColor = centerColor.clone()
        starColor.lerp(endColor, distance / max_distance)
        colors[current] = starColor.r
        colors[current + 1] = starColor.g
        colors[current + 2] = starColor.b
        textureIndex[i] = i % 3 - 1;
        aScale[i] = Math.random() * 20;
    }

    // itemSize = 3 因为每个顶点都是一个三元组。
    bufferGeometry.setAttribute('position', new THREE.BufferAttribute(position, 3));
    bufferGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    bufferGeometry.setAttribute('textureIndex', new THREE.BufferAttribute(textureIndex, 1));
    bufferGeometry.setAttribute('aScale', new THREE.BufferAttribute(aScale, 1));



    let texture = loader.load(`src/textures/particles/10.png`)
    let texture1 = loader.load(`src/textures/particles/9.png`)
    let texture2 = loader.load(`src/textures/particles/11.png`)

    pointsMaterial = new THREE.ShaderMaterial({
        uniforms: {
            utexture: {
                value: texture
            },
            utexture1: {
                value: texture1
            },
            utexture2: {
                value: texture2
            },
            utime: {
                value: 0.0
            },
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true
    })

    const points = new THREE.Points(bufferGeometry, pointsMaterial)
    scene.add(points)
    return points
}

