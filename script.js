// https://api.openweathermap.org/data/2.5/onecall?lat=47.3686498&lon=8.5391825&units=metric&exclude=minutely,alerts&appid=80e12c050ce340a2726151ba3bc13d55

let queryUrl = "https://api.openweathermap.org/data/2.5/onecall?";
let lat = "lat=47.3686498&";
let lon = "lon=-96.1103&";
let apiOptions = "units=metric&exclude=minutely,alerts&";
let apiKey = "appid=80e12c050ce340a2726151ba3bc13d55";
let file = queryUrl + lat + lon + apiOptions + apiKey;

fetch(file)
  .then((response) => response.json())
  .then((data) => {
    let main = data.current.weather[0].main;
    let temp = Math.round(data.current.temp);
    console.log(main);
    console.log(temp);
    console.log(data.timezone);
    if (main == "Clear") {
      sunny(temp, data.timezone);
    } else if (
      main == "Clouds" ||
      main == "Fog" ||
      main == "Mist" ||
      main == "Smoke" ||
      main == "Haze" ||
      main == "Dust" ||
      main == "Sand" ||
      main == "Ash" ||
      main == "Squall"
    ) {
      sunny(temp, data.timezone);
    } else if (main == "Rain" || main == "Drizzle" || main == "Thunderstorm") {
      rain(temp, data.timezone);
    } else if (main == "Snow") {
      snow(temp, data.timezone);
    }
  });

const renderer = new THREE.WebGLRenderer();
const camera = new THREE.PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
const scene = new THREE.Scene();

import { FontLoader } from "./FontLoader.js";
import { TextGeometry } from "./TextGeometry.js";
const loader = new FontLoader();
let frame = 0;
let frame3 = 0;
let Mesh;
let light;

function load(temp, timezone) {
  loader.load("resources/Lato Black_Regular.json", function (font) {
    const geometry = new TextGeometry(
      temp.toString() + "C°                      " + timezone,
      {
        font: font,
        size: 0.05,
        height: 0.01,
      }
    );
    const textMesh = new THREE.Mesh(geometry, [
      new THREE.MeshBasicMaterial({ color: 0xffffff }),
      new THREE.MeshPhongMaterial({ color: 0xffffff }),
    ]);
    textMesh.castShadow = true;
    textMesh.position.y = -0.46;
    textMesh.position.z = 0.79;
    textMesh.position.x = -0.5;
    textMesh.rotation.y = 0;
    //textMesh.rotation.x = -0.3;
    scene.add(textMesh);

    // let x = Math.sin((frame * Math.PI) / 500) * 3.8;
    // let z = Math.cos((frame * Math.PI) / 500) * 3.8;
    // textMesh.position.set(x-1.5, 0.1, z-3.4);
  });

  loader.load("resources/Lato Black_Regular.json", function (font) {
    const geometry = new TextGeometry(
      temp.toString() + "C°                      " + timezone,
      {
        font: font,
        size: 0.05,
        height: 0.01,
      }
    );
    const textMesh = new THREE.Mesh(geometry, [
      new THREE.MeshBasicMaterial({ color: 0xffffff }),
      new THREE.MeshPhongMaterial({ color: 0xffffff }),
    ]);
    textMesh.castShadow = true;
    textMesh.position.y = -0.46;
    textMesh.position.z = 0.5;
    textMesh.position.x = 0.78;
    textMesh.rotation.y = 1.573;
    //textMesh.rotation.x = -0.3;
    scene.add(textMesh);

    // let x = Math.sin((frame * Math.PI) / 500) * 3.8;
    // let z = Math.cos((frame * Math.PI) / 500) * 3.8;
    // textMesh.position.set(x-1.5, 0.1, z-3.4);
  });
  loader.load("resources/Lato Black_Regular.json", function (font) {
    const geometry = new TextGeometry(
      temp.toString() + "C°                      " + timezone,
      {
        font: font,
        size: 0.05,
        height: 0.01,
      }
    );
    const textMesh = new THREE.Mesh(geometry, [
      new THREE.MeshBasicMaterial({ color: 0xffffff }),
      new THREE.MeshPhongMaterial({ color: 0xffffff }),
    ]);
    textMesh.castShadow = true;
    textMesh.position.y = -0.46;
    textMesh.position.z = -0.78;
    textMesh.position.x = 0.5;
    textMesh.rotation.y = 3.15;
    //textMesh.rotation.x = -0.3;
    scene.add(textMesh);

    // let x = Math.sin((frame * Math.PI) / 500) * 3.8;
    // let z = Math.cos((frame * Math.PI) / 500) * 3.8;
    // textMesh.position.set(x-1.5, 0.1, z-3.4);
  });
  loader.load("resources/Lato Black_Regular.json", function (font) {
    const geometry = new TextGeometry(
      temp.toString() + "C°                      " + timezone,
      {
        font: font,
        size: 0.05,
        height: 0.01,
      }
    );
    const textMesh = new THREE.Mesh(geometry, [
      new THREE.MeshBasicMaterial({ color: 0xffffff }),
      new THREE.MeshPhongMaterial({ color: 0xffffff }),
    ]);
    textMesh.castShadow = true;
    textMesh.position.y = -0.46;
    textMesh.position.z = -0.5;
    textMesh.position.x = -0.79;
    textMesh.rotation.y = -1.573;
    //textMesh.rotation.x = -0.3;
    scene.add(textMesh);

    // let x = Math.sin((frame * Math.PI) / 500) * 3.8;
    // let z = Math.cos((frame * Math.PI) / 500) * 3.8;
    // textMesh.position.set(x-1.5, 0.1, z-3.4);
  });
}

function rain(temp, timezone) {
  let rain = [];

  function init() {
    scene.background = new THREE.Color("grey");

    camera.lookAt(new THREE.Vector3(-2, 10, 4));

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
  }

  function ambientlight() {
    const light = new THREE.AmbientLight(0x404040);
    scene.add(light);
  }

  function setLight() {
    const color = 0xffffff;
    const intensity = 1.5;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-20, 80, 30);
    light.target.position.set(0, 0, 0);
    light.target.Mesh;
    scene.add(light);
    scene.add(light.target);
  }

  function loadGLTF() {
    let Loader = new THREE.GLTFLoader();

    Loader.load("./model/rain.gltf", (gltf) => {
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
    frame3--;
    requestAnimationFrame(animate);

    let x = Math.sin((frame * Math.PI) / 500) * 3.8;
    let z = Math.cos((frame * Math.PI) / 500) * 3.8;
    camera.position.set(x, 2, z);

    camera.lookAt(new THREE.Vector3(0, 0, 0));
    initRain();
    initRain();
    rain.forEach((drop) => {
      if (drop.position.y > -0.5) {
        drop.position.y -= 0.04;
      } else {
        rain = rain.filter((other) => other != drop);
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
    let material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    let drop = new THREE.Mesh(geometry, material);

    drop.position.x = randomInRange(-0.75, 0.75);
    drop.position.y = 2;
    drop.position.z = randomInRange(-0.75, 0.75);
    scene.add(drop);
    rain.push(drop);

    rain.forEach((rainDrop) => {
      if (rainDrop.position.y <= 1) return;
    });
  }

  init(temp, timezone);
  initRain();
  setLight();
  loadGLTF();
  animate();
}

function snow(temp, timezone) {
  let rain = [];

  function init() {
    scene.background = new THREE.Color("grey");

    camera.lookAt(new THREE.Vector3(-2, 10, 4));

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
  }

  function ambientlight() {
    const light = new THREE.AmbientLight(0x404040);
    scene.add(light);
  }

  function setLight() {
    const color = 0xffffff;
    const intensity = 1.2;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-10, 30, 20);
    light.target.position.set(0, 0, 0);
    light.target.Mesh;
    scene.add(light);
    scene.add(light.target);
  }

  function loadGLTF() {
    let Loader = new THREE.GLTFLoader();

    Loader.load("./model/snow.gltf", (gltf) => {
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

    let x = Math.sin((frame * Math.PI) / 500) * 3.8;
    let z = Math.cos((frame * Math.PI) / 500) * 3.8;
    camera.position.set(x, 2, z);

    camera.lookAt(new THREE.Vector3(0, 0, 0));
    initRain();
    initRain();
    rain.forEach((drop) => {
      if (drop.position.y > -0.5) {
        drop.position.y -= 0.01;
      } else {
        rain = rain.filter((other) => other != drop);
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
    let material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    let drop = new THREE.Mesh(geometry, material);

    drop.position.x = randomInRange(-0.75, 0.75);
    drop.position.y = 2;
    drop.position.z = randomInRange(-0.75, 0.75);
    scene.add(drop);
    rain.push(drop);

    rain.forEach((rainDrop) => {
      if (rainDrop.position.y <= 1) return;
    });
  }

  load(temp, timezone);
  init();
  initRain();
  setLight();
  loadGLTF();
  animate();
}

function sunny(temp, timezone) {
  function init() {
    scene.background = new THREE.Color("grey");

    camera.lookAt(new THREE.Vector3(-2, 10, 4));

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
  }

  function ambientlight() {
    const light = new THREE.AmbientLight(0x404040);
    scene.add(light);
  }

  function setLight() {
    const color = 0xffffff;
    const intensity = 1.5;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-0.5, 1, -0.5);
    light.target.position.set(0, 0, 0);
    light.target.Mesh;
    scene.add(light);
    scene.add(light.target);
  }

  function loadGLTF() {
    let Loader = new THREE.GLTFLoader();

    Loader.load("./model/sunny.gltf", (gltf) => {
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

    let x = Math.sin((frame * Math.PI) / 500) * 3.8;
    let z = Math.cos((frame * Math.PI) / 500) * 3.8;
    camera.position.set(x, 2, z);

    camera.lookAt(new THREE.Vector3(0, 0, 0));

    renderer.render(scene, camera);
  }
  var lever = true;
  let frame2 = 0;
  function initsphere() {
    const geometry = new THREE.SphereGeometry(0.2, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sphere = new THREE.Mesh(geometry, material);

    scene.add(sphere);

    function anima() {
      if (lever == true) {
        frame2++;
      } else if (lever == false) {
        frame2--;
      }

      requestAnimationFrame(anima);

      let x = Math.sin((frame2 * Math.PI) / 1000) * 1.5;
      let y = Math.cos((frame2 * Math.PI) / 1000) * 1.2;
      sphere.position.set(x, y, 0);
      if (sphere.position.y <= -0.4 && lever == true) {
        lever = false;
      } else if (sphere.position.y <= -0.4 && lever == false) {
        lever = true;
      }
    }
    anima();
  }
  load(temp, timezone);
  init();
  initsphere();
  setLight();
  loadGLTF();
  animate();
  ambientlight();
}
