import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui';

const gui = new dat.GUI();
// 点光源
// 尝试衰减
// 设置小球
// 给小球加上光
// 小球圆周运动


const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(-50, 50, 0)
const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({
    logarithmicDepthBuffer: true,
    antialias: true
})
renderer.shadowMap.enabled = true
renderer.physicallyCorrectLights = true

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
    function anime() {
        let time = clock.getElapsedTime()
        smallBallMesh?.position.set(
            Math.cos(time) * 2,
            Math.sin(time) * 2,
            Math.sin(time * 2) * 1
        )
        requestAnimationFrame(anime)
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.render(scene, camera)
    }
    anime()
    addSphere()
    addplane()
    addLight()
}

let sphere
function addSphere() {
    const sphereGeo = new THREE.SphereGeometry(1, 64, 64)
    const standardMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff
    })
    sphere = new THREE.Mesh(sphereGeo, standardMaterial)
    sphere.castShadow = true
    scene.add(sphere)

    // gui.add(sphere.position, "x",0,1)

}

const clock = new THREE.Clock()
let smallBallMesh
function addLight() {
    const envLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(envLight)
    // 设置光点
    const smallBallGeo = new THREE.SphereGeometry(0.1, 20, 20)
    smallBallMesh = new THREE.Mesh(
        smallBallGeo,
        new THREE.MeshBasicMaterial({
            color: 0xff0000
        })
    )
    smallBallMesh.position.set(2, 2, 2)
    scene.add(smallBallMesh)

    const pointLight = new THREE.PointLight(0xff0000, 1);
    // pointLight.position.set(2, 2, 2)
    pointLight.castShadow = true
    //越大效果越好
    pointLight.shadow.radius = 5
    //设置阴影分辨率
    pointLight.shadow.mapSize.set(1024, 1024)
    // 投影属性
    gui.add(pointLight, "distance", 0, 100)
    gui.add(pointLight, "decay", 0, 10)

    smallBallMesh.add(pointLight);
}
function addplane() {
    const geometry = new THREE.PlaneGeometry(30, 30);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(geometry, material);
    plane.position.set(0, 0, -1)
    plane.receiveShadow = true
    scene.add(plane);
}