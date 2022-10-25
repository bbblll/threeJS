import * as THREE from "three"
// import * as CANNON from "cannon-es"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 创建着色器材质（顶点着色器vertexShader，片元着色器fragmentShade）
// 顶点着色器，设置顶点（转化4维）
// 片元着色器设置（四个浮点数）



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


// const clock = new THREE.Clock()
//初始化函数
export function init() {
    document.querySelector("#scene").appendChild(
        renderer.domElement
    )
    const controller = new OrbitControls(camera, renderer.domElement)
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
}



const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.ShaderMaterial({
    vertexShader: `
    void main()
         {
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
         }
    `,
    fragmentShader: `
    void main()
         {
            gl_FragColor = vec4(1.0,0.0,0.0,0.2);
         }
    `
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true
// plane.rotation.x = -Math.PI / 2
scene.add(plane);


