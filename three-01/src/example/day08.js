import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 置换贴图，高度贴图
// 设置段数（必须）
// 设置影响程度

// 粗糙度设置（1）
// 粗糙度贴图（2）
// 可叠加

// 金属度设置（1）
// 金属度贴图（2）
// 可叠加

// 法相贴图（决定反射光方向）

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
    addLight()
}

function addcube() {
    const doorTexture = textureLoader.load("src/textures/door/color.jpg")
    const doorAlphaTexture = textureLoader.load("src/textures/door/alpha.jpg")
    const doorAoTexture = textureLoader.load("src/textures/door/ambientOcclusion.jpg")
    const doorHeightTexture = textureLoader.load("src/textures/door/height.jpg")
    const roughNessTexture = textureLoader.load("src/textures/door/roughness.jpg")
    const metalTexture = textureLoader.load("src/textures/door/metalness.jpg")
    const normalTexture = textureLoader.load("src/textures/door/normal.jpg")




    const material = new THREE.MeshStandardMaterial({
        color: "#ffff00",
        map: doorTexture,
        alphaMap: doorAlphaTexture,
        transparent: true,
        side: THREE.DoubleSide,
        aoMap: doorAoTexture,
        aoMapIntensity: 0.5,
        displacementMap: doorHeightTexture,
        displacementScale: 2,
        // 粗糙度
        roughness: 2,
        // 粗糙度贴图
        roughnessMap: roughNessTexture,
        // 金属度
        metalness: 1,
        metalnessMap: metalTexture,
        // 法相
        normalMap: normalTexture

    })

    const materialMesh = new THREE.Mesh(
        new THREE.BoxGeometry(20, 20, 20, 50, 50),
        material
    )

    //添加单面门
    const planeGeometry = new THREE.PlaneGeometry(10, 10, 100, 100);
    let uvs = planeGeometry.attributes.uv.array;
    planeGeometry.setAttribute('uv2', new THREE.BufferAttribute(uvs, 2));

    const plane = new THREE.Mesh(planeGeometry, material);
    plane.position.set(20, 0, 0)
    scene.add(plane);


    scene.add(materialMesh)
}

function addLight() {
    // const envLight = new THREE.AmbientLight(0xffffff, 1)
    // scene.add(envLight)
    // 设置直线光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(50, 50, 50)
    scene.add(directionalLight);
}