const renderer = new THREE.WebGLRenderer();
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
const scene = new THREE.Scene();
let frame = 0;
let Mesh;
let light;

let rain = [];

function init() {
    scene.background = new THREE.Color('grey');
   //camera.position.set(0, 10, 20);
    
    camera.lookAt(new THREE.Vector3(-2,10,4))
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

function setLight() {
    const color = 0xFFFFFF;
    const intensity = 1.5;
    const light = new THREE.DirectionalLight(color, intensity);
    const ambientlight = new THREE.AmbientLight( 0x404040 ); // soft white light
    light.position.set(50, 100, 100);
    light.target.position.set(0, 0, 0);
    scene.add(light);
    scene.add(light.target);
}

function loadGLTF() {
    let Loader = new THREE.GLTFLoader();

    Loader.load('./model/Modell.gltf', (gltf) => {
        Mesh = gltf.scene;
        Mesh.scale.set(0.2, 0.2, 0.2);
        scene.add(Mesh);
        camera.target = Mesh;
        Mesh.position.x = 0;
        Mesh.position.y = -0.4;
        Mesh.position.z = 0;
    });
}

function animate() {
    frame++;
    requestAnimationFrame(animate);
    if (Mesh && Mesh.rotation) {
        //Mesh.rotation.y -= 0.005;
        //Mesh.rotation.x = 0.4;
    }
    // if (frame > 50 && frame <= 75) {
    //     camera.position.set(5, 2.5 , 0)
    // } else if (frame > 75 && frame <= 100 ) {
    //     camera.position.set(3.8, 2.5, -3.8);
    // } else if (frame > 100 && frame <= 125){
    //     camera.position.set(0, 2.5 , -5);
    // } else if (frame > 125 && frame <= 150){
    //     camera.position.set(-3.8, 2.5 , -3.8)
    // } else if (frame > 150 && frame <= 175){
    //     camera.position.set(-5, 2.5 , 0)
    // } else if (frame > 175){
    //     camera.position.set(-3.8, 2.5 , 3.8)
    //     if(frame >= 200) frame = 0;
    // } else if (frame >= 0 && frame <= 25) {
    //     camera.position.set(0, 2.5, 5);
    // } else if (frame > 25 && frame <= 50){
    //     camera.position.set(3.8, 2.5, 3.8);
    // }

    let x = Math.sin(frame * Math.PI / 500) * 3.8;
    let z = Math.cos(frame * Math.PI / 500) * 3.8;
    camera.position.set(x, 2 , z)

    console.log(rain.length)

    camera.lookAt(new THREE.Vector3(0, 0, 0))
    initRain();
    rain.forEach((drop) => {
        if (drop.position.y > -0.5) {
            drop.position.y -= 0.02
        } else {
            rain = rain.filter(other => other != drop)
            drop.removeFromParent();
        }
    });
    renderer.render(scene, camera);
}

function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

function initRain() {
    let geometry = new THREE.TorusGeometry(0.005, 0.005, 10, 10);
    let material = new THREE.MeshBasicMaterial({ color: 0x000FF });
    let drop = new THREE.Mesh(geometry, material);

    drop.position.x = randomInRange(-0.75, 0.75);
    drop.position.y = 3;
    drop.position.z = randomInRange(-0.75, 0.75);
    scene.add(drop);
    rain.push(drop);

    rain.forEach(rainDrop => {
       // if (rainDrop.position.y <= 1) return;
    })
}


init();
initRain();
setLight();
loadGLTF();
animate();
