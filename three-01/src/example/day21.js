import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui';

const gui = new dat.GUI();
// 创建1000个立方体
// 设置材质为网格
// 设置两种材质（白，红）
// 创建投射光线对象
// 计算鼠标向量（three.vector2）
// 将向量,相机传给投射光线(raycaster)


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
// const loader = new THREE.TextureLoader()
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

let cubeArr = []
const meshBasicMaterial = new THREE.MeshBasicMaterial({
    wireframe: true
})
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const redMeshBasicMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
})

function addSphere() {
    for (let i = -5; i < 5; i++) {
        for (let j = -5; j < 5; j++) {
            for (let k = -5; k < 5; k++) {
                let cube = new THREE.Mesh(
                    boxGeometry,
                    meshBasicMaterial
                )
                cubeArr.push(cube)
                cube.position.set(i, j, k)
                scene.add(cube)
            }
        }
    }
}

const raycaster = new THREE.Raycaster();// 创建投影
const pointer = new THREE.Vector2();// 存储鼠标位置
let intersects = []
function onPointerMove(event) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;//x轴归一化
    pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;//y轴归一化
    raycaster.setFromCamera(pointer, camera);
    intersects = raycaster.intersectObjects(cubeArr); // 将所有对象传给投影
    if (intersects.length != 0) {
        intersects[0].object.material = redMeshBasicMaterial
    }
}

window.addEventListener("mouseup", onPointerMove);
