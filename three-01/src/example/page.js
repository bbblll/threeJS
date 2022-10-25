import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui';
import { gsap } from "gsap";

// const gui = new dat.GUI();
// 3d效果的页面
// 四个页面
// 渲染背景透明alpha
// 去掉鼠标控制
// 调整立方体大小
// 添加立方体组
// 设置立方体组旋转

// 将第二个物体放在下面
// 计算滚动
// 移动相机

// 添加小球
// 设置相对位置
// 设置整体来回摇晃
// 设置页面高度


const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    500
);
camera.position.set(15, 10, 15)
camera.lookAt(-1, 0, -1)
const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({
    alpha: true,
    logarithmicDepthBuffer: true,
    antialias: true,
})
renderer.shadowMap.enabled = true

const clock = new THREE.Clock()

//初始化函数
export function init() {
    document.querySelector("#scene").appendChild(
        renderer.domElement
    )
    // const orbitControls = new OrbitControls(
    //     camera, renderer.domElement
    // )
    // const axes = new THREE.AxesHelper(10)
    // scene.add(axes)
    addSphere()
    addpage2()
    addSpaningBall()

    function anime() {
        let time = clock.getElapsedTime()

        light.position.x = Math.sin(time) * 6 //旋转
        light.position.z = Math.cos(time) * 6
        smallBall.position.x = Math.sin(time) * 6
        smallBall.position.z = Math.cos(time) * 6

        light.position.y = Math.cos(time * 4) + 6 //弹跳
        smallBall.position.y = Math.cos(time * 4) + 6

        camera.position.x = 15 + Math.atan(mouse_X * 6)
        camera.position.z = 15 - Math.atan(mouse_X * 6)
        // camera.position.x = 15 + mouse_X * 6
        // camera.position.z = 15 - mouse_X * 6

        requestAnimationFrame(anime)
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.render(scene, camera)
    }
    anime()

}

let cubeArr = []
const cubeGroup = new THREE.Group()
const meshBasicMaterial = new THREE.MeshBasicMaterial({
    wireframe: true
})
const boxGeometry = new THREE.BoxGeometry(2, 2, 2)
const redMeshBasicMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
})

function addSphere() {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            for (let k = 0; k < 5; k++) {
                let cube = new THREE.Mesh(
                    boxGeometry,
                    meshBasicMaterial
                )
                cubeArr.push(cube)
                cube.position.set(i * 2 - 4, j * 2 - 4, k * 2 - 4)
                cubeGroup.add(cube)
            }
        }
    }
    gsap.to(cubeGroup.rotation, {
        x: "+=" + Math.PI * 4,
        y: "+=" + Math.PI * 2,
        duration: 24,
        repeat: -1,
        ease: "none"
    })
    scene.add(cubeGroup)
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

//第二个页面
const group2 = new THREE.Group()

function addTrangle() {
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.PointsMaterial({
        size: 0.05,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide
    });
    const vertices = new Float32Array(9);
    for (let i = 0; i < 9; i++) {
        vertices[i] = Math.random() * 10 - 5
    }
    material.color = new THREE.Color(
        Math.random(),
        Math.random(),
        Math.random()
    )
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    const points = new THREE.Mesh(geometry, material);
    return points
}

function addpage2() {
    for (let i = 0; i < 50; i++) {
        group2.add(addTrangle())
    }
    group2.position.y = -50
    // gui.add(camera.position, "y", -45, 45, 1)
    gsap.to(group2.rotation, {
        x: "+=" + Math.PI * 4,
        y: "+=" + Math.PI * 2,
        duration: 24,
        repeat: -1,
        ease: "none"
    })
    scene.add(group2)
}


// 相机移动
window.addEventListener("scroll", () => {
    camera.position.y = -(window.scrollY / window.innerHeight) * 50 + 10
})

// 添加小球
let smallBall
let light
const group3 = new THREE.Group()

function addSpaningBall() {
    const planeGeometry = new THREE.PlaneGeometry(15, 15);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = Math.PI / 2
    plane.receiveShadow = true
    group3.add(plane);

    const sphereGeometry = new THREE.SphereGeometry(2, 64, 64);
    const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.y = 2
    sphere.castShadow = true
    group3.add(sphere);

    light = new THREE.PointLight(0xffffff, 0.3, 100);
    light.position.set(6, 6, 0);
    light.castShadow = true
    group3.add(light);

    const ballGeometry = new THREE.SphereGeometry(0.2, 64, 64);
    const ballMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    smallBall = new THREE.Mesh(ballGeometry, ballMaterial);
    smallBall.position.set(6, 6, 0);
    group3.add(smallBall);

    const envlight = new THREE.AmbientLight(0x404040, 0.6); // soft white light
    group3.add(envlight);

    group3.position.y = -100
    gsap.to(group3.rotation, {
        x: "+=" + 0.1,
        y: "+=" + 0.1,
        duration: 3,
        repeat: -1,
        ease: "power3.inOut",
        yoyo: true
    })
    scene.add(group3)
}

//鼠标摇晃
let mouse_X = 0
window.addEventListener("mousemove", (event) => {
    mouse_X = (event.clientX / window.innerWidth) - 0.5
    // console.log(window.clientX)
})




