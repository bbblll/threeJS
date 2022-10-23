import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui';

const gui = new dat.GUI();
// 阴影，
// 设置阴影贴图的分辨率（光），mapsize
// 设置阴影贴图模糊率（光），radius
// 设置平行光投影相机属性（6个）,camera
// 利用dat.gui控制相机投影near属性,
// onchange,更新相机属性

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

function addSphere() {
    const sphereGeo = new THREE.SphereGeometry(1, 64, 64)
    const standardMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff
    })
    const sphere = new THREE.Mesh(sphereGeo, standardMaterial)
    sphere.castShadow = true
    scene.add(sphere)

}

function addLight() {
    const envLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(envLight)
    // 设置直线光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 20)
    directionalLight.castShadow = true
    //越大效果越好
    directionalLight.shadow.radius = 10
    //设置阴影分辨率
    directionalLight.shadow.mapSize.set(1024, 1024)
    // 投影属性
    directionalLight.shadow.camera.near = 1
    directionalLight.shadow.camera.far = 50
    directionalLight.shadow.camera.right = 5
    directionalLight.shadow.camera.top = 5
    directionalLight.shadow.camera.bottom = -5
    directionalLight.shadow.camera.left = -5

    gui
        .add(directionalLight.shadow.camera, "right",
            1, //最小
            170, //最大
            0.1 //每一个值
        )
        .onChange(() => {
            directionalLight.shadow.camera.updateProjectionMatrix()
        })

    scene.add(directionalLight);
}
function addplane() {
    const geometry = new THREE.PlaneGeometry(10, 10);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(geometry, material);
    plane.position.set(0, 0, -2)
    plane.receiveShadow = true
    scene.add(plane);
}