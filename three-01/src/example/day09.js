import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 图片加载
// 图片加载时调用函数
// 图片加载进度
// 图片加载完成
// 图片记载错误
// 设置纹理加载管理
// 添加div，显示加载进度

const div = document.createElement("div")
div.style.width = "100px"
div.style.height = "100px"
div.style.position = "fixed"
div.style.right = "20px"
div.style.top = "20px"
div.style.color = "0xfff"
document.body.appendChild(div)

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(-50, 50, 0)
const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer()

// 加载管理器
const manager = new THREE.LoadingManager();
manager.onProgress = function (
    url,
    itemsLoaded, //已加载个数
    itemsTotal //总个数
) {
    div.innerHTML = (100 * itemsLoaded / itemsTotal).toFixed(2) + "%"
    console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');

};
const textureLoader = new THREE.TextureLoader(manager)

//初始化函数
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