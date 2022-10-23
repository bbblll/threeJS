import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui';

const gui = new dat.GUI();
// 下载砖石图标
// 白色图标砖石
// 雪花
// 设置多雪花
// 设置相机最远距离（对画面进行裁剪）


const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    30
);
camera.position.set(0, 60, 0)
const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({
    logarithmicDepthBuffer: true,
    antialias: true
})
const loader = new THREE.TextureLoader()
const clock = new THREE.Clock()

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
    let points_1 = addSphere("15")
    let points_2 = addSphere("15")
    let points_3 = addSphere("15")


    function anime() {
        let time = clock.getElapsedTime()
        points_1.rotation.x = time * 0.02

        points_2.rotation.x = time * 0.03
        points_2.rotation.y = time * 0.005

        points_3.rotation.x = time * 0.05
        points_3.rotation.y = time * 0.03

        requestAnimationFrame(anime)
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.render(scene, camera)
    }
    anime()

}


function addSphere(url) {
    const count = 5000
    const bufferGeometry = new THREE.BufferGeometry();

    const position = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
        position[i] = Math.random() * 100 - 50
        colors[i] = Math.random()
    }

    // itemSize = 3 因为每个顶点都是一个三元组。
    bufferGeometry.setAttribute('position', new THREE.BufferAttribute(position, 3));
    bufferGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));


    let texture = loader.load(`src/textures/particles/${url}.png`)
    const pointsMaterial = new THREE.PointsMaterial({
        // color: 0xff0000,
        map: texture,
        size: 0.5,
        transparent: true,
        alphaMap: texture,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        // vertexColors: true
    })

    const points = new THREE.Points(bufferGeometry, pointsMaterial)
    scene.add(points)
    return points
}

