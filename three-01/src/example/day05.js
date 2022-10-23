import * as THREE from "three"
import { Scene } from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(-50, 50, 0)
const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer()
const textureLoader = new THREE.TextureLoader()


export function init() {
    document.querySelector("#scene").appendChild(
        renderer.domElement
    )
    const orbitControls = new OrbitControls(
        camera, renderer.domElement
    )
    const axes = new THREE.AxesHelper(45)
    scene.add(axes)
    function anime() {
        requestAnimationFrame(anime)
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.render(scene, camera)
    }
    anime()
    addcube()
}

function addcube() {
    // const doorTexture = textureLoader.load("src/textures/door/color.jpg")
    //设置相对位移
    // doorTexture.offset.set(0.5, 0.5)
    //设置旋转角度
    // doorTexture.center.set(0.5, 0.5)
    // doorTexture.rotation = Math.PI / 4
    // doorTexture.repeat.set(2, 3)
    //设置纹理重复的模式
    //wraps,wrapt的设置必须修改才能看见效果
    // doorTexture.wrapS = THREE.MirroredRepeatWrapping
    // doorTexture.wrapT = THREE.MirroredRepeatWrapping

    const texture = textureLoader.load("src/textures/minecraft.png")
    //过滤算法，默认取线性的效果
    //取线性，有模糊效果
    texture.minFilter = THREE.LinearFilter
    //去最近，显示会一块一块的
    texture.magFilter = THREE.NearestFilter
    const material = new THREE.MeshBasicMaterial({
        color: "#ffff00",
        map: texture
    })

    const materialMesh = new THREE.Mesh(
        new THREE.BoxGeometry(20, 20, 20),
        material
    )
    scene.add(materialMesh)
}