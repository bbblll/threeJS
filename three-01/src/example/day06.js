import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
//alpha贴图，设置透明区域和非透明区域,黑白灰
//ao贴图，设置uv，设置ao贴图强度
//addattribute已经被启用，应该用setAttribute
//环境遮挡贴图

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
    const doorTexture = textureLoader.load("src/textures/door/color.jpg")
    //加载alpha纹理
    const doorAlphaTexture = textureLoader.load("src/textures/door/alpha.jpg")
    const doorAoTexture = textureLoader.load("src/textures/door/ambientOcclusion.jpg")

    const material = new THREE.MeshBasicMaterial({
        color: "#ffff00",
        map: doorTexture,
        //设置alpha纹理
        //需要打开transparent
        alphaMap: doorAlphaTexture,
        transparent: true,
        side: THREE.DoubleSide,
        aoMap: doorAoTexture,
        aoMapIntensity: 0.5
    })

    const materialMesh = new THREE.Mesh(
        new THREE.BoxGeometry(20, 20, 20),
        material
    )

    //添加单面门
    const planeGeometry = new THREE.PlaneGeometry(10, 10);
    let uvs = planeGeometry.attributes.uv.array;
    planeGeometry.setAttribute('uv2', new THREE.BufferAttribute(uvs, 2));

    const plane = new THREE.Mesh(planeGeometry, material);
    plane.position.set(0, 20, 0)
    scene.add(plane);


    scene.add(materialMesh)
}