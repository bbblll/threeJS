import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui';

const gui = new dat.GUI();
// 设置弯曲程度
// 添加随机数（xyz）
// 点中间集中
// 设置初始颜色
// 设置结束颜色
// 设置混合颜色
// 添加颜色数组


const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    500
);
camera.position.set(0, 20, 0)
const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({
    logarithmicDepthBuffer: true,
    antialias: true
})
const loader = new THREE.TextureLoader()
// const clock = new THREE.Clock()

//初始化函数
export function init() {
    document.querySelector("#scene").appendChild(
        renderer.domElement
    )
    const orbitControls = new OrbitControls(
        camera, renderer.domElement
    )
    const axes = new THREE.AxesHelper(10)
    // scene.add(axes)
    addSphere()

    function anime() {
        requestAnimationFrame(anime)
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.render(scene, camera)
    }
    anime()

}

const parameter = {
    count: 10000,
    size: 0.3,
    radius: 13,
    branch: 3,
    color: "#ff6030",
    Scale: 0.1,
    endColor: "#1b3984"
}


function addSphere() {
    const bufferGeometry = new THREE.BufferGeometry();

    const position = new Float32Array(parameter.count * 3);
    const colors = new Float32Array(parameter.count * 3);

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

    }

    // itemSize = 3 因为每个顶点都是一个三元组。
    bufferGeometry.setAttribute('position', new THREE.BufferAttribute(position, 3));
    bufferGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));


    let texture = loader.load(`src/textures/particles/1.png`)
    const pointsMaterial = new THREE.PointsMaterial({
        // color: new THREE.Color(parameter.color),
        map: texture,
        size: parameter.size,
        sizeAttenuation: true,
        transparent: true,
        alphaMap: texture,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true
    })

    const points = new THREE.Points(bufferGeometry, pointsMaterial)
    scene.add(points)
    return points
}

