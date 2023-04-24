import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { ThreeMFLoader } from "three/examples/jsm/loaders/3MFLoader";
import { CubeTextureLoader } from "three";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";


const TestMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xb2ffc8,
  metalness: 0.25,
  roughness: 0.1,
  transparent: false,
  transmission: 0.99,
  clearcoat: 1.0,
  clearcoatRoughness: 0.25
});
const textureCube = new CubeTextureLoader();
const TestMaterialGreen = new THREE.MeshPhysicalMaterial({
  color: 0x000000,
  metalness: 0.25,
  roughness: 0.5,
  clearcoatRoughness: 0.25,
  transmission: 0.01
});
const TestMaterialRed = new THREE.MeshPhysicalMaterial({ color: 0xFF0000, vertexColors: false });



const light1 = new THREE.SpotLight(0xffffff, 1);
light1.position.set(-600, 1200, 1200);

const light2 = new THREE.SpotLight(0x02ffff, 1);
light2.position.set(800, -1500, 1100);

const ambientLight = new THREE.AmbientLight(0xffffff, 1); // soft white light
const hemiLight = new THREE.HemisphereLight(0x0000ff, 0x00ff00, 0.6);


export class StlRenderer {
  private scene: THREE.Scene;
  private camera: THREE.Camera;
  public renderer: THREE.WebGLRenderer;
  private  envMap;

  constructor() {

    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 70;
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(500, 500);
    this.renderer.outputEncoding = THREE.sRGBEncoding; //улучшает качество
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;

    let loader = new THREE.PMREMGenerator(this.renderer);

    new RGBELoader().load("/assets/3d/blouberg_sunrise_2_1k.hdr", (hdrmap: any)=> {
       const webGLRenderTarget = loader.fromCubemap(hdrmap);
      this.envMap = webGLRenderTarget.texture;

      console.log("LOADED")
    });

    this.scene = new THREE.Scene();
    // this.scene.add(ambientLight);//
    this.scene.add(light1);
    this.scene.add(light2);
    this.scene.add(hemiLight);
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;


  }

  loadStl(fileUrl: string) {
    const loader = new STLLoader();
    loader.load(
      fileUrl,
      (geometry) => {
        let cube = new THREE.Mesh(geometry, TestMaterialRed);
        cube.position.z = 1;
        this.scene.add(cube);

      });
  }

  load3MF(fileUrl: string) {
    const loader = new ThreeMFLoader();
    loader.load(
      fileUrl,
      (object) => {
        //  object.quaternion.setFromEuler( new THREE.Euler( - Math.PI / 2, 0, 0 ) ); 	// z-up conversion


        object.traverse((child)=> {
          if (child instanceof THREE.Mesh) {
            console.log("MAT", child.name);
            console.log("MAT", child.material);
            console.log("MAT", child.material.uuid);
            //child.material.color={isColor: true, r: 221, g: 1, b: 1}
            //  child.material = TestMaterialRed.clone();
            // console.log("MAT",child)
            //    child.castShadow = true;
            if (child.name == "body68314") {
              child.material.color = new THREE.Color(0, 1, 0);

            } else if (child.name == "body67351") {
              child.material.color = new THREE.Color(0, 0, 1);
            } else if (child.name == "body68855") {
               child.material= new THREE.MeshStandardMaterial({
                metalness: 1,
                roughness: 0.5 ,
              //  envMap :  this.envMap
              });
            } else {
              child.material.color = new THREE.Color(0.3, 0, 0);

          //    child.material.envMap =  this.envMap
            }



          }
          //

        });
        object.position.z = 1;
        // main.children[1].traverse( function (child ) {
        //   if ( child instanceof THREE.Mesh ) {
        //     child.material = TestMaterialRed;
        //   }
        // } );

        this.scene.add(object);
      });
  }


  render() {
    this.renderer.render(this.scene, this.camera);
  }

}


