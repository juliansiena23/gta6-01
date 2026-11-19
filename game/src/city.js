import * as THREE from 'three';
import {seededRandom} from './math.js';
const palette=['#df9c69','#d6ba8d','#a6aaa0','#c78362','#e2c99c','#92a9a2','#d8a87e','#b8b09a','#c77f68','#e5d2ad'];
const glass=['#96bbb8','#6f9697','#a4c4bc','#748f91'];
const mat=(color,roughness=.88,extra={})=>new THREE.MeshStandardMaterial({color,roughness,...extra});
const boxGeo=new THREE.BoxGeometry(1,1,1);
const m={road:mat('#343b3b'),side:mat('#b9ad91'),sand:mat('#ddc993'),mark:mat('#e8d8a8'),roof:mat('#a6a08d'),palm:mat('#745e43'),leaf:mat('#527c63'),park:mat('#93ad7a'),water:mat('#53a4a5',.3,{metalness:.15}),door:mat('#594f43')};
function cube(parent,material,pos,scale,rot=0){const o=new THREE.Mesh(boxGeo,material);o.position.set(...pos);o.scale.set(...scale);o.rotation.y=rot;o.castShadow=true;o.receiveShadow=true;parent.add(o);return o}
function building(scene,rng,x,z,w,d,h,index){const root=new THREE.Group();root.position.set(x,0,z);scene.add(root);cube(root,mat(palette[index%palette.length]),[0,h/2,0],[w,h,d]);cube(root,m.roof,[0,h+.08,0],[w+.2,.16,d+.2]);const floors=Math.max(1,Math.floor(h/3.4)), across=Math.max(2,Math.floor(w/2.8)),deep=Math.max(2,Math.floor(d/3));const wx=mat(glass[index%glass.length],.38,{metalness:.06,emissive:glass[index%glass.length],emissiveIntensity:.08});for(let row=1;row<floors;row++){const y=row*3.15+.6;for(let col=0;col<across;col++){const xx=-w/2+(col+.5)*w/across;cube(root,wx,[xx,y,d/2+.012],[Math.min(1.1,w/across*.48),1.05,.045]);cube(root,wx,[xx,y,-d/2-.012],[Math.min(1.1,w/across*.48),1.05,.045])}for(let col=0;col<deep;col++){const zz=-d/2+(col+.5)*d/deep;cube(root,wx,[w/2+.012,y,zz],[.045,1.05,Math.min(1.1,d/deep*.46)]);cube(root,wx,[-w/2-.012,y,zz],[.045,1.05,Math.min(1.1,d/deep*.46)])}}if(h>10&&rng()>.35)cube(root,m.roof,[0,h+.55,0],[w*.3,.8,d*.24]);if(rng()>.45)cube(root,m.door,[0,1.2,d/2+.03],[1.2,2.4,.08])}
function palm(scene,x,z,s=1){const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.17*s,.28*s,4.6*s,7),m.palm);trunk.position.set(x,2.3*s,z);trunk.rotation.z=-.08;trunk.castShadow=true;scene.add(trunk);const crown=new THREE.Group();crown.position.set(x,4.45*s,z);scene.add(crown);for(let k=0;k<7;k++){const f=new THREE.Mesh(new THREE.ConeGeometry(.35*s,3.1*s,5),m.leaf);f.position.set(Math.cos(k/7*Math.PI*2)*1.2*s,.12*s,Math.sin(k/7*Math.PI*2)*1.2*s);f.rotation.z=Math.PI/2+Math.sin(k/7*Math.PI*2)*.5;f.rotation.y=-k/7*Math.PI*2;f.scale.set(1,.5,1);f.castShadow=true;crown.add(f)}}
function lamp(scene,x,z,rot=0){const pole=new THREE.Mesh(new THREE.CylinderGeometry(.06,.09,5,6),mat('#55594f'));pole.position.set(x,2.5,z);scene.add(pole);cube(scene,mat('#f2e3ba',.5,{emissive:'#ffe2a1',emissiveIntensity:.55}),[x+Math.sin(rot)*.45,5,z+Math.cos(rot)*.45],[.8,.13,.28],rot)}
function bench(scene,x,z){cube(scene,mat('#82674d'),[x,.55,z],[2,.13,.48]);cube(scene,mat('#82674d'),[x,.9,z-.18],[2,.65,.12]);for(const dx of [-.7,.7])cube(scene,mat('#48453d'),[x+dx,.25,z],[.12,.55,.14])}
function mark(scene,x,z,w,d){cube(scene,m.mark,[x,.078,z],[w,.025,d])}
export function buildCity(scene,seed=1){const rng=seededRandom(seed);scene.background=new THREE.Color('#98c6d0');scene.fog=new THREE.Fog('#b5d1cc',125,330);cube(scene,mat('#d0c4a7'),[0,-.2,0],[340,.4,340]);for(let k=-3;k<=3;k++){const p=k*44;cube(scene,m.road,[p,.035,0],[9,.07,320]);cube(scene,m.road,[0,.035,p],[320,.07,9]);for(let side of [-1,1]){cube(scene,m.side,[p+side*7.1,.08,0],[3,.16,320]);cube(scene,m.side,[0,.08,p+side*7.1],[320,.16,3])}for(let t=-7;t<=7;t++){if(k!==0){mark(scene,p-.8,t*20,.13,7);mark(scene,p+.8,t*20,.13,7);mark(scene,t*20,p-.8,7,.13);mark(scene,t*20,p+.8,7,.13)}}}for(let a=-3;a<=3;a++)for(let b=-3;b<=3;b++){const x=a*44,z=b*44;for(let t=-3;t<=3;t++){mark(scene,x+t*1.35,z+7.8,.72,.18);mark(scene,x+t*1.35,z-7.8,.72,.18);mark(scene,x+7.8,z+t*1.35,.18,.72);mark(scene,x-7.8,z+t*1.35,.18,.72)}if(rng()<.15){cube(scene,m.park,[x,.02,z],[27,.08,27]);for(let q=0;q<5;q++)palm(scene,x+(rng()-.5)*20,z+(rng()-.5)*19,.78+rng()*.35);if(rng()>.45)bench(scene,x+2,z-2);continue}const count=1+Math.floor(rng()*3);for(let q=0;q<count;q++){const w=9+rng()*8,d=9+rng()*8,px=x+(rng()-.5)*18,pz=z+(rng()-.5)*18,h=6+rng()*21;if(px<112)building(scene,rng,px,pz,w,d,h,a*7+b+q)}if(Math.abs(x)<115){if(rng()>.25){palm(scene,x-11,z-11,.7);palm(scene,x+11,z+10,.66)}if(rng()>.55)lamp(scene,x+9,z-10,rng()*6.28)}}cube(scene,mat('#cfb982'),[142,.03,0],[11,.12,320]);cube(scene,mat('#ddc98d'),[150,.025,0],[8,.1,320]);cube(scene,m.water,[177,-.15,0],[47,.12,360]);for(let z=-145;z<=145;z+=22){palm(scene,137,z,.82);if(z%44===0)bench(scene,151,z-5)}cube(scene,mat('#987d5c'),[173,.25,-30],[34,.5,8]);for(let x=160;x<=187;x+=9)for(const z of [-33,-27]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.2,.23,2,7),mat('#755c43'));p.position.set(x,0,z);scene.add(p)}for(let z=-30;z<=-18;z+=4)lamp(scene,184,z,Math.PI/2);cube(scene,m.park,[-103,.02,-99],[32,.08,31]);for(const x of [-114,-104,-94])for(const z of [-109,-99,-89])palm(scene,x,z,.8);const ring=new THREE.Mesh(new THREE.TorusGeometry(4,.35,8,28),mat('#cf7351',.48));ring.position.set(-103,3,-99);scene.add(ring);return{roadSpacing:44,roadWidth:9,coastX:142,seed}}

// City windows and walls never move. Batch repeated boxes by material instead
// of issuing thousands of draw calls for the same unit cube every frame.
export function batchCityGeometry(scene){
 scene.updateMatrixWorld(true);
 const batches=new Map();
 scene.traverse(object=>{
  if(!object.isMesh||object.geometry!==boxGeo)return;
  if(!batches.has(object.material))batches.set(object.material,[]);
  batches.get(object.material).push(object);
 });
 for(const [material,objects] of batches){
  if(objects.length<2)continue;
  const batch=new THREE.InstancedMesh(boxGeo,material,objects.length);
  objects.forEach((object,index)=>{batch.setMatrixAt(index,object.matrixWorld);object.removeFromParent()});
  batch.castShadow=true;batch.receiveShadow=true;
  batch.computeBoundingSphere();scene.add(batch);
 }
}
