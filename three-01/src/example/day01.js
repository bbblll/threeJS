import * as THREE from "three"
//导入控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Water } from "three/examples/jsm/objects/Water2"
// 导入模型
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
// 导入解压
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader"



const scene = new THREE.Scene()
// 初始化相机,透视相机，
const camera = new THREE.PerspectiveCamera(
    75,//角度
    window.innerWidth / innerHeight,
    0.1,//最小距离
    2000//最大距离
)
const renderer = new THREE.WebGLRenderer({
    //设置抗锯齿
    antialias: true,
    //对数缓冲，解决闪烁问题
    logarithmicDepthBuffer: true
})
export function init() {
    // 初始化场景

    // 设置相机位置
    camera.position.set(-50, 50, 130)
    // 更新摄像头宽高比例,这里设置的和视角比例一样
    camera.aspect = window.innerWidth / innerHeight
    //更新摄像头投影矩阵(和上一句绑定)
    camera.updateProjectionMatrix();
    //添加摄像机
    scene.add(camera)
    //设置输出环境的编码
    renderer.outputEncoding = THREE.sRGBEncoding;
    //设置渲染器宽高
    renderer.setSize(window.innerWidth, window.innerHeight)
    //监听屏幕大小，修改宽高
    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
    })
    //
    document.querySelector("#scene").appendChild(renderer.domElement)
    // 实例化控制器
    // const controller = new OrbitControls(camera, renderer.domElement)
}
export function render() {
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}
//添加平面
export function addplane() {
    const planeGeometry = new THREE.PlaneGeometry(20, 20);
    const planeMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial)
    scene.add(plane)
}
//添加坐标系
export function addAxes() {
    const axes = new THREE.AxesHelper(30)
    scene.add(axes)
}

//创建一个巨大的天空球体
export function createSky() {
    // 材质
    const skyMaterial = new THREE.MeshBasicMaterial({
        //有缝合线，需要特殊的摄像机
        map: new THREE.TextureLoader().load("src/image/sky.png")
    })
    const skyMesh = new THREE.Mesh(
        //形状
        new THREE.SphereGeometry(1000, 100, 100)
            .scale(1, 1, -1),
        skyMaterial
    )
    scene.add(skyMesh)
    //添加hdr纹理
    rgbeLoader("src/image/050.hdr")
    // // 添加视频
    // const video = document.createElement("video")
    // video.src = "src/image/sky.png"
    // // 视频循环播放
    // video.loop = true
    // // 添加鼠标移动事件
    // window.addEventListener("mousemove", () => {
    //     // 如果视频暂停
    //     if (video.paused) {
    //         video.play();
    //         // 添加视频纹理
    //         skyMaterial.map = new THREE.VideoTexture(video)
    //         skyMaterial.map.needsUpdate = true
    //     }
    // })
}

//创建水面
export function createPool() {
    //300的圆，分成64块(多边形)
    const waterGeometry = new THREE.CircleGeometry(300, 60);
    const water = new Water(waterGeometry, {
        // 纹理宽高
        textureHeight: 1024,
        textureWidth: 1024,
        // 颜色
        color: 0xeeeeff,
        // 水流方向
        flowDirection: new THREE.Vector2(1, 1),
        // 波纹大小
        scale: 1
    })
    water.position.y = 3
    water.rotation.x = -Math.PI / 2
    scene.add(water)
}


export function addIsland() {
    // 实例化
    const loader = new GLTFLoader();
    // 解压
    const dracoloader = new DRACOLoader()
    dracoloader.setDecoderPath("src/draco/")//解压后放在哪里
    //添加解压
    loader.setDRACOLoader(dracoloader)
    // 加载模型
    loader.load("src/model/island2.glb", (gltf) => {
        // const island = gltf.scene;
        // island.position.y = -50
        // scene.add(island)
        scene.add(gltf.scene)
    })

}

//添加控制
export function addControl() {
    // 实例化控制器
    const controller = new OrbitControls(camera, renderer.domElement)
}

//添加hdr背景
function rgbeLoader(path) {
    const hdrLoader = new RGBELoader()
    hdrLoader.loadAsync(path).then((texture) => {
        // 球形
        texture.mapping = THREE.EquirectangularReflectionMapping
        // 背景环境
        scene.background = texture
        scene.environment = texture
    })
}

//添加平行光
export function addlight() {
    const light = THREE.DirectionalLight(0xffffff, 1)
    light.position.set(-100, 100, 50)
    scene.add(light)
}


