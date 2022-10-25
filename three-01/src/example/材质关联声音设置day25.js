import * as THREE from "three"
import * as CANNON from "cannon-es"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 弹性设置

// 小球材质sphere
// 地板材质floor
// 关联材质，摩檫力friction,弹力restitution
// 将关联添加到世界
// 声音从零开始播放（设置播放时间）



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
    logarithmicDepthBuffer: true,
    antialias: true,
    alpha: true
})
renderer.shadowMap.enabled = true
// 物理引擎
const world = new CANNON.World()
world.gravity.set(0, -9.8, 0)
//小球
const sphereWorldShape = new CANNON.Sphere(2)
const sphereWorldMaterial = new CANNON.Material("sphere")
const sphereBody = new CANNON.Body({
    shape: sphereWorldShape,
    material: sphereWorldMaterial,
    position: new CANNON.Vec3(0, 0, 0),
    mass: 1
})
world.addBody(sphereBody)
function hintEvent(e) {
    let strance = e.contact.getImpactVelocityAlongNormal()
    if (strance > 1) {
        const hintVoice = new Audio("src/audio/hint.mp3")
        // 设置声音起始位置
        hintVoice.currentTime = strance > 5 ? 0 : 0.1
        hintVoice.play()
    }

}
sphereBody.addEventListener("collide", hintEvent)
//平面
const planeWorldShape = new CANNON.Plane(30, 30)
const floorWorldMatrial = new CANNON.Material("floor")
const planeBody = new CANNON.Body({
    shape: planeWorldShape,
    mass: 0,
    material: floorWorldMatrial,
    position: new CANNON.Vec3(0, -10, 0)
})
//旋转
planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2)
world.addBody(planeBody)

//关联材质
const contactMaterial = new CANNON.ContactMaterial(
    floorWorldMatrial, sphereWorldMaterial, {
    // 摩檫力
    friction: 0.1,
    // 弹力
    restitution: 0.7
}
)
world.addContactMaterial(contactMaterial)



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
        let deltaTime = clock.getDelta()
        world.step(1 / 120, deltaTime)
        sphere.position.copy(sphereBody.position)

        requestAnimationFrame(anime)
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.render(scene, camera)
    }
    anime()
}

const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.castShadow = true
scene.add(sphere);

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xdddddd, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true
plane.rotation.x = Math.PI / 2
plane.position.y = -10
scene.add(plane);

const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
// directionalLight.position.set(-10, 10, 0)
directionalLight.castShadow = true
scene.add(directionalLight);


