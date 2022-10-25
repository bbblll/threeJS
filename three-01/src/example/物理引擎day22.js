import * as THREE from "three"
import * as CANNON from "cannon-es"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

//创建物理事件
// 添加重力9.8，y方向
// 创建物理事件小球（形状，位置，重量，材质）
// World.step 更新物理引擎
// 更新位置 

// 相机
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

const sphereWorldShape = new CANNON.Sphere(2)
const sphereBody = new CANNON.Body({
    shape: sphereWorldShape,
    material: new CANNON.Material(),
    position: new CANNON.Vec3(0, 0, 0),
    mass: 1
})
world.addBody(sphereBody)


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


