var e=Object.defineProperty,t=Object.defineProperties,r=Object.getOwnPropertyDescriptors,o=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable,s=(t,r,o)=>r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[r]=o,c=(e,t)=>{for(var r in t||(t={}))a.call(t,r)&&s(e,r,t[r]);if(o)for(var r of o(t))n.call(t,r)&&s(e,r,t[r]);return e};import{u as l,r as i,V as m,a as u,l as p,R as d,b as h,S as f,C as g,M as E,O as y,c as w,T as M,P as x,d as v,s as b,e as S,E as k,f as C,g as R,h as L}from"./vendor.7f6dea2e.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const r of e)if("childList"===r.type)for(const e of r.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const P={position:[0,0,0],velocity:[0,0,0],rotation:[0,0,0],mousePosition:[0,0,0],controls:{up:!1,down:!1,left:!1,right:!1,mouse:!1},isUnderWater:!0,damping:.75,uuid:"",cannonApi:null},A=e=>e*(Math.PI/180),z=e=>e/(1+Math.abs(e)),I=e=>{const t=i.exports.useRef();return u((()=>{const{position:e}=P;t.current.envMapIntensity=e[1]>0?1:1+.1*e[1],t.current.clearcoat=e[1]>0?1:1+.1*e[1],t.current.reflectivity=e[1]>0?.3:.3+.1*e[1],t.current.roughness=e[1]>-3?.7:.7-.1*e[1]})),d.createElement("meshPhysicalMaterial",{ref:t,attach:"material",flatShading:!1,specular:"#ffffff",roughness:.7,reflectivity:.3,metalness:.5,clearcoat:1,clearcoatRoughness:.2,color:e.color||"purple"})},B=e=>{const t=i.exports.useRef(),r=i.exports.useRef(),o=i.exports.useRef(),{abs:a,sin:n}=Math;return console.log("Tail"),u((e=>{const{velocity:s,position:c}=P,[l,i,m]=s,[u,p,d]=c,h=A(n(a(i)+a(p)+a(l)+a(u)+4*e.clock.getElapsedTime()));t.current.rotation.set(0,10*h,0),r.current.rotation.set(0,25*h,0),o.current.rotation.set(0,25*h,0)})),d.createElement("group",{ref:t,name:"tail"},d.createElement(h,{args:[1,.75,.6],position:[-.5,.05,0],radius:.2,smoothness:4,receiveShadow:!0,castShadow:!0},d.createElement(I,{color:e.color})),d.createElement("group",{ref:r,position:[-1,0,0]},d.createElement(h,{args:[.6,.6,.3],position:[-.1,0,0],radius:.05,smoothness:4,receiveShadow:!0,castShadow:!0},d.createElement(I,{color:e.color})),d.createElement("group",{ref:o,position:[-.4,0,0]},d.createElement(h,{args:[.75,.4,.1],position:[-.1,.15,0],radius:.05,smoothness:4,rotation:[0,0,-10],receiveShadow:!0,castShadow:!0},d.createElement(I,{color:e.color})),d.createElement(h,{args:[.75,.4,.1],position:[-.1,-.15,0],radius:.05,smoothness:4,rotation:[0,0,10],receiveShadow:!0,castShadow:!0},d.createElement(I,{color:e.color})))))},F=e=>{const o=i.exports.useRef(),a=new m;return u((t=>{const[r,n,s]=P.velocity,c=a.set(z(-.1*n),.1*z(-1*n)+.5,0);o.current.setRotationFromAxisAngle(c.normalize(),e.mirror?-10:.5)})),d.createElement("group",(n=c({},e),t(n,r({ref:o,name:"eyeball"}))),d.createElement(f,{position:[0,0,0],args:[.3],receiveShadow:!0,castShadow:!0},d.createElement(I,{translate:[0,10,.25],attach:"material",color:"#f3f3f3"})),d.createElement(f,{position:[0,0,.25],args:[.1],receiveShadow:!0,castShadow:!0},d.createElement(I,{translate:[0,10,.25],attach:"material",color:"black"})));var n},T=e=>{const[t,r]=l((()=>c({mass:1,position:[0,0,0],linearDamping:.75,linearFactor:[1,1,0],angularFactor:[0,0,0],args:[1],allowSleep:!1},e))),o=i.exports.useRef(),a=i.exports.useRef(),n=i.exports.useRef(),s=new m,{abs:f,sin:g,atan2:E}=Math;return console.log("Player"),i.exports.useLayoutEffect((()=>{P.uuid=t.current.uuid,P.cannonApi=r,console.count("subscribed");const e=r.velocity.subscribe((e=>{P.velocity=e})),o=r.position.subscribe((e=>{P.position=e})),a=r.linearDamping.subscribe((e=>{P.damping=e}));return()=>{console.count("unsubscribed"),e(),o(),a()}}),[]),u((e=>{let{controls:t,isUnderWater:c,position:l,velocity:i,mousePosition:m,damping:u}=P;const[d,h,y]=i,[w,M]=m,[x,v,b]=l;t.up&&c&&r.applyImpulse([0,.4,0],[0,0,0]),t.down&&c&&r.applyImpulse([0,-.4,0],[0,0,0]),t.right&&c&&r.applyImpulse([.4,0,0],[0,0,0]),t.left&&c&&r.applyImpulse([-.4,0,0],[0,0,0]),t.mouse&&c&&r.applyImpulse([.1*w,.1*M,0],[0,0,0]);const S=(c&&h)<-10?.99:c?.75:.01;r.linearDamping.set(p(u,S,.5)),!c&&v>10.25&&r.applyImpulse([0,-.5,0],[0,0,0]),v<9&&!c&&(c=!0),v<-9&&r.applyImpulse([0,.05,0],[0,0,0]),f(x)>100&&r.applyImpulse([-.01*x,0,0],[0,0,0]);const k=f(h)+f(v)+f(d)+f(x),C=-10*g(k+4*e.clock.getElapsedTime()),R={y:180*(.5*z(.5*d)-.5)+C,z:90*z(.2*h)},{rotation:L}=n.current;P.rotation=[L.x,L.y,L.z];const I=f(w)<3?E(w,f(M))-.5*Math.PI:A(w>0?1:-179),B=E(M,f(w)),F=p(L.y,t.mouse&c?I+A(C):A(R.y),.2),T=p(L.z,t.mouse&c?B:A(R.z),.05);n.current.rotation.set(0,F,T),o.current.setRotationFromAxisAngle(s.lerp(s.set(z(1*h),-1,0),.25),.5),a.current.setRotationFromAxisAngle(s.lerp(s.set(-1*z(1*h),1,0),.25),.5)})),d.createElement("group",{ref:t,name:"player-physics-object"},d.createElement("group",{ref:n,name:"player-body-group"},d.createElement(h,{name:"player-body-main",args:[1.5,1.2,.8],position:[.25,.1,0],radius:.2,smoothness:4,receiveShadow:!0,castShadow:!0},d.createElement(I,{color:e.color})),d.createElement(h,{name:"player-body-mouth",args:[.7,.5,.8],position:[.8,-.25,0],rotation:[0,0,0],radius:.2,smoothness:6,receiveShadow:!0,castShadow:!0},d.createElement(I,{color:e.color})),d.createElement(h,{name:"player-dorsal-fin",args:[.5,.5,.05],name:"dorsal-fin",position:[.25,.7,0],radius:.05,smoothness:4,rotation:[0,0,10],receiveShadow:!0,castShadow:!0},d.createElement(I,{color:e.color})),d.createElement(h,{ref:o,name:"player-left-fin",args:[.5,.1,.6],position:[-0,-.25,.4],radius:.05,smoothness:4,receiveShadow:!0,castShadow:!0},d.createElement(I,{color:e.color})),d.createElement(h,{ref:a,name:"player-right-fin",args:[.5,.1,.6],position:[-0,-.25,-.4],radius:.05,smoothness:4,receiveShadow:!0,castShadow:!0},d.createElement(I,{color:e.color})),d.createElement(h,{name:"player-lips",args:[.1,.1,.5],position:[1.11,-.3,0],radius:.05,smoothness:4,receiveShadow:!0,castShadow:!0},d.createElement(I,{color:"#2e2929"})),d.createElement(F,{name:"player-left-eye",position:[.6,.1,.35]}),d.createElement(F,{name:"player-right-eye",position:[.6,.1,-.35],mirror:!0}),d.createElement(B,{name:"player-tail-group",color:e.color})))},U=e=>{const t=i.exports.useRef(),r=i.exports.useRef(!1),o=i.exports.useRef(new g("hsl(228, 90%, 50%)")),a=i.exports.useRef(new g("hsl(342, 80%, 37%)")),n=e.size||.5,[s,m]=l((()=>c({mass:.2*n,position:e.position,linearDamping:.7,linearFactor:[1,1,0],args:[n],allowSleep:!0,sleepSpeedLimit:.25,onCollide:e=>{r.current=!r.current}},e)));return u((({clock:e})=>{r.current?t.current.color.lerpHSL(a.current,.05):t.current.color.lerpHSL(o.current,.05)})),console.log("Ball"),d.createElement("group",{ref:s},d.createElement(f,{position:[0,0,0],args:[n],receiveShadow:!0,castShadow:!0},d.createElement(E,{ref:t,attach:"material",color:"hsl(340, 88%, 60%)",metalness:1,specular:"#0068b3",roughness:.7,reflectivity:.5,clearcoat:.5,clearcoatRoughness:.2})))},O={fogColor:"#4898e8",groundBaseColor:"#164f6e",waterHeight:10};var G="/swimmy-fish/assets/rock-surface-texture.f82e8530.png",j="/swimmy-fish/assets/rock-surface-normalmap.f2aa5bfb.png";const H=e=>{console.log("Sphere");const t=w(M,G),r=w(M,j);return d.createElement(d.Fragment,null,d.createElement("sphereGeometry",{args:6*(.5*Math.random()+.75)}),d.createElement("meshPhongMaterial",{attach:"material",color:O.groundBaseColor,shininess:0,map:t,displacementMap:r,displacementScale:2,displacementBias:0,normalMap:r,normalScale:[.2,.2],roughnessMap:t}))},W=e=>{const t=i.exports.useRef(),r=i.exports.useRef(Array.from(Array(20)).map((e=>[Math.random()-.5,Math.random(),Math.random()]))),o=i.exports.useRef(new y),a=i.exports.useRef(r.current.map(((e,t)=>({positionX:300*e[0],positionZ:-100*e[1]-10,rotationY:e[2]}))),[]);return i.exports.useLayoutEffect((()=>{a.current.forEach(((e,r)=>{const{positionX:a,positionZ:n,rotationY:s}=e;o.current.rotation.set(-1,0,-.5),o.current.position.set(a*(Math.random()+.5),.05*Math.abs(a)-15,n),o.current.scale.set(1+.01*Math.abs(a),1+.01*Math.abs(a),1+.01*Math.abs(a)),o.current.updateMatrix(),t.current.setMatrixAt(r,o.current.matrix)})),t.current.instanceMatrix.needsUpdate=!0}),[]),d.createElement("group",null,d.createElement("instancedMesh",{ref:t,args:[null,null,a.current.length]},d.createElement(H,null)))};const X=e=>{const t=w(M,"/swimmy-fish/assets/seaweed-03.744e9700.png");t.offset.set(0,-1),t.repeat.set(1,2);const r=i.exports.useRef(Array.from(Array(1e3)).map((e=>[Math.random()-.5,Math.random(),.5*Math.random()]))),o=i.exports.useRef(),a=i.exports.useRef(new y),n=i.exports.useRef(r.current.map(((e,t)=>({positionX:200*e[0],positionZ:-180*e[1]+10,rotationY:e[2]}))),[]);i.exports.useLayoutEffect((()=>{n.current.forEach(((e,t)=>{const{positionX:r,positionZ:n,rotationY:s}=e,c=Math.random()*Math.random()*2+.2;e.position=[r,-10,n-100*Math.sin(t)],a.current.position.set(...e.position),e.scale=[c,c,1],a.current.scale.set(...e.scale),a.current.updateMatrix(),o.current.setMatrixAt(t,a.current.matrix)})),o.current.instanceMatrix.needsUpdate=!0}),[]);const{sin:s}=Math;return u((e=>{n.current.forEach(((t,r)=>{const n=.1*s(e.clock.elapsedTime+.03*t.position[0]);a.current.scale.set(...t.scale),a.current.position.set(...t.position),a.current.rotation.set(1*n,-2*n,n),a.current.updateMatrix(),o.current.setMatrixAt(r,a.current.matrix)})),o.current.instanceMatrix.needsUpdate=!0})),d.createElement("instancedMesh",{ref:o,args:[null,null,n.current.length]},d.createElement("planeGeometry",{args:[6,6]}),d.createElement("meshLambertMaterial",{attach:"material",color:O.groundBaseColor,transparent:!0,alphaTest:.5,map:t}))},Y=e=>{console.log("Plane");const t=w(M,"/swimmy-fish/assets/seaweed-02.923a931a.png");return t.offset.set(0,-1),t.repeat.set(1,2),d.createElement(d.Fragment,null,d.createElement("planeGeometry",{args:[3,12]}),d.createElement("meshLambertMaterial",{attach:"material",color:O.groundBaseColor,transparent:!0,alphaTest:.5,map:t}))},Z=e=>{const t=i.exports.useRef(Array.from(Array(500)).map(((e,t)=>[Math.sin(t)-.5,Math.random(),Math.random()]))),r=i.exports.useRef(),o=i.exports.useRef(new y),a=i.exports.useRef(t.current.map(((e,t)=>({positionX:200*e[0],positionZ:-180*e[1]+10,rotationY:e[2]}))),[]);i.exports.useLayoutEffect((()=>{a.current.forEach(((e,t)=>{const{positionX:a,positionZ:n,rotationY:s}=e,c=Math.random()*Math.random()*2+.2;e.position=[a,-10,n-100*Math.sin(t)],o.current.position.set(...e.position),e.scale=[c,c+(Math.random()-.5),1],o.current.scale.set(...e.scale),o.current.updateMatrix(),r.current.setMatrixAt(t,o.current.matrix)})),r.current.instanceMatrix.needsUpdate=!0}),[]);const{sin:n}=Math;return u((e=>{a.current.forEach(((t,a)=>{const s=.1*n(e.clock.elapsedTime+.03*t.position[0]);o.current.scale.set(...t.scale),o.current.position.set(...t.position),o.current.rotation.set(1*s,-2*s,s),o.current.updateMatrix(),r.current.setMatrixAt(a,o.current.matrix)})),r.current.instanceMatrix.needsUpdate=!0})),d.createElement("instancedMesh",{ref:r,args:[null,null,a.current.length]},d.createElement(Y,null))},D=()=>(console.log("seaweed"),d.createElement(d.Fragment,null,d.createElement(Z,null),d.createElement(X,null)));const N=e=>{console.log("Plane");const t=w(M,"/swimmy-fish/assets/rocks-02.56b2e4e4.png");return d.createElement("mesh",{position:[-10,-7,-130]},d.createElement("planeGeometry",{args:[400,18]}),d.createElement("meshLambertMaterial",{attach:"material",color:O.groundBaseColor,transparent:!0,alphaTest:.5,map:t}))},q=e=>{console.log("Plane");const t=w(M,"/swimmy-fish/assets/rocks-01.9aa0aff5.png");return d.createElement("mesh",{position:[25,-9,-80]},d.createElement("planeGeometry",{args:[20,10]}),d.createElement("meshLambertMaterial",{attach:"material",color:O.groundBaseColor,transparent:!0,alphaTest:.5,map:t}))},V=e=>(console.log("BackgroundImages"),d.createElement("group",null,d.createElement(q,null),d.createElement(N,null))),K=e=>{const[t]=v((()=>c({rotation:[-Math.PI/2,0,0],position:[0,O.waterHeight,0],isTrigger:!0,onCollide:e=>{const{body:t}=e,r=P.uuid;t.uuid===r&&(P.isUnderWater=!0)}},e)));return console.log("Water surface"),d.createElement("mesh",{ref:t},d.createElement("planeBufferGeometry",{attach:"geometry",args:[1e3,1e3]}),d.createElement("meshBasicMaterial",{attach:"material",color:"#303d75",transparent:!0,opacity:.25}))},J=e=>{const[t]=v((()=>c({rotation:[-Math.PI/-2,0,0],position:[0,O.waterHeight,-125],isTrigger:!0,onCollide:e=>{const{body:t,contact:r}=e,o=P.uuid,a=P.cannonApi,{velocity:n}=P;t.uuid===o&&(P.isUnderWater=!1,a.applyImpulse([.2*n[0],.2*n[1],0],[0,0,0]))}},e))),r=w(M,"/swimmy-fish/assets/caustics-bw.dd31a2b8.png");return r.offset.set(0,1),r.repeat.set(100,30),console.log("emissiveMap --\x3e",r),u((({clock:e})=>{const{geometry:r}=t.current,{position:o}=r.attributes,a=o.array.map(((t,r)=>(r-2)%3==0?t+.01*Math.sin((o.array[r+1]*r||0)+e.getElapsedTime()):t));o.array=a,o.needsUpdate=!0,r.computeVertexNormals()})),console.log("Ceiling"),d.createElement("mesh",{ref:t,position:[0,O.waterHeight,-100]},d.createElement("planeBufferGeometry",{attach:"geometry",args:[800,300,80,30]}),d.createElement("meshPhongMaterial",{shininess:100,color:"#587fad",emissive:"#9aede5",emissiveMap:r,emissiveIntensity:.75,side:2}))},Q=e=>d.createElement("mesh",{rotation:[A(0),0,0],position:[0,0,-200]},d.createElement("planeBufferGeometry",{attach:"geometry",args:[1e3,30]}),d.createElement("meshBasicMaterial",{color:"#e3f6ff"})),$=e=>{const[t]=v((()=>c({rotation:[-Math.PI/2,0,0],position:[0,-10,0]},e))),r=w(M,G),o=w(M,j);return d.createElement("mesh",{ref:t},d.createElement("planeBufferGeometry",{attach:"geometry",args:[1e3,1e3,400,400]}),d.createElement("meshPhongMaterial",{attach:"material",color:O.groundBaseColor,shininess:0,map:r,displacementMap:o,displacementScale:4,displacementBias:-2,normalMap:o,normalScale:[.2,.2],roughnessMap:r}))},_=e=>(console.log("Scene"),d.createElement(d.Fragment,null,d.createElement(x,{gravity:[0,0,0],broadphase:"SAP",defaultContactMaterial:{contactEquationRelaxation:4,friction:.001},allowSleep:!0},d.createElement(K,null),d.createElement(J,null),d.createElement(T,{color:"#e07e28"}),d.createElement(U,{position:[5,0,0],size:.75}),d.createElement(U,{position:[6,2,0],size:.25}),d.createElement(U,{position:[6,2,0],size:.25}),d.createElement(U,{position:[6,2,0],size:.25}),d.createElement(U,{position:[6,2,0],size:.2}),d.createElement(U,{position:[6,2,0],size:.15}),d.createElement(U,{position:[6,2,0],size:.35}),d.createElement(U,{position:[6,2,0],size:.25}),d.createElement(U,{position:[-2,-5,0]}),d.createElement(U,{position:[-3,-3,0],size:1.2}),d.createElement(U,{position:[-7,-5,0],size:.8}),d.createElement(W,null),d.createElement(D,null),d.createElement(V,null),d.createElement(Q,null),d.createElement($,null)))),ee=e=>(console.log("Controls"),i.exports.useEffect((()=>{const{controls:e}=P,t=t=>{38===t.keyCode||87===t.keyCode||32===t.keyCode?e.up=!0:37===t.keyCode||65===t.keyCode?e.left=!0:39===t.keyCode||68===t.keyCode?e.right=!0:40===t.keyCode||83===t.keyCode?e.down=!0:t.keyCode},r=t=>{38===t.keyCode||87===t.keyCode||32===t.keyCode?e.up=!1:37===t.keyCode||65===t.keyCode?e.left=!1:39===t.keyCode||68===t.keyCode?e.right=!1:40===t.keyCode||83===t.keyCode?e.down=!1:t.keyCode},o=()=>{e.mouse=!0},a=()=>{e.mouse=!1};return window.addEventListener("keydown",t),window.addEventListener("keyup",r),window.addEventListener("mousedown",o),window.addEventListener("mouseup",a),window.addEventListener("touchstart",o),window.addEventListener("touchend",a),()=>{window.removeEventListener("keydown",t),window.removeEventListener("keyup",r),window.removeEventListener("mousedown",o),window.removeEventListener("mouseup",a),window.removeEventListener("touchstart",o),window.removeEventListener("touchend",a)}}),[]),u((e=>{const{mouse:t,viewport:r}=e,o=t.x*r.width/2,a=t.y*r.height/2;P.mousePosition=[o,a,0]})),null),te=()=>{console.log("lighting");const e=i.exports.useRef(),t=i.exports.useRef(),r=i.exports.useRef(new g);return u((()=>{const{isUnderWater:t}=P;e.current.intensity=p(e.current.intensity,t?.1:.5,.1),e.current.color.lerp(t?r.current.set("#ffffff"):r.current.set("#ffdb4a"),.1)})),d.createElement(d.Fragment,null,d.createElement("ambientLight",{ref:e,intensity:.1,color:"white"}),d.createElement("spotLight",{ref:t,position:[0,200,-300],angle:.3,intensity:10,distance:500,decay:3,penumbra:1,color:"white"}))};function re({count:e,mouse:t}){const r=i.exports.useRef(),{sin:o,cos:a,random:n}=Math,s=i.exports.useMemo((()=>new y),[]),c=i.exports.useMemo((()=>{const t=[];for(let r=0;r<e;r++){const e=100*n(),r=10+n(),o=.01,a=200*n()-100,s=12*n()-10,c=150*n()-100;t.push({t:e,factor:r,speed:o,xFactor:a,yFactor:s,zFactor:c,mx:0,my:0})}return t}),[e,n]);return u((e=>{c.forEach(((t,n)=>{let{t:c,factor:l,speed:i,xFactor:m,yFactor:u,zFactor:p}=t;c=t.t+=.5*i,t.mx+=.001*(0-t.mx),t.my+=.001*(-0-t.my),s.position.set(t.mx/10*1+m+a(.05*e.clock.elapsedTime)+10*o(.05*e.clock.elapsedTime),t.my/10+u+o(.01*c*l)+a(.5*c)*l/10,p),s.updateMatrix(),r.current.setMatrixAt(n,s.matrix)})),r.current.instanceMatrix.needsUpdate=!0})),d.createElement(d.Fragment,null,d.createElement("instancedMesh",{ref:r,args:[null,null,e]},d.createElement("sphereGeometry",{args:[.05]}),d.createElement("meshLambertMaterial",{attach:"material",color:"#275e5c"})))}const oe=b.div`
  width: 100vw;
  height: 100vh;
  user-select: none;
`,ae=()=>(console.log("Camera movement"),u((e=>{const[t,r,o]=P.position,[a,n,s]=P.velocity,c=p(e.camera.position.x,t+.1*a,.5),l=r+.1*n>11?11:r+.1*n>-9?r+.1*n:-9,i=p(e.camera.position.y,l,.5),m=p(e.camera.position.y,r+.1*n,.7);e.camera.lookAt(c,m,0),e.camera.position.y=i,e.camera.position.x=c,e.camera.position.z=20,e.camera.updateProjectionMatrix()})),null),ne=()=>{const e=i.exports.useRef(),{waterHeight:t,fogColor:r}=O;return u((({camera:r})=>{r.position.y>t?e.current.far=1e3:e.current.far=200})),d.createElement("fog",{ref:e,attach:"fog",args:[r,0,200]})},se=()=>(console.log("Scene mounted"),d.createElement(oe,null,d.createElement(S,{mode:"concurrent",colorManagement:!0,camera:{position:[0,0,20],fov:45,far:230,near:.1}},d.createElement(i.exports.Suspense,{fallback:null},d.createElement(k,{files:"./blue-env-02.hdr"})),d.createElement(i.exports.Suspense,{fallback:null},d.createElement(te,null),d.createElement(_,null),d.createElement(C,{azimuth:0,turbidity:5,rayleigh:0,inclination:.8,sunPosition:[.1,5,-5],distance:1e4}),d.createElement(re,{count:1e3,mouse:{current:[0,0]}})),d.createElement(ne,null),d.createElement("color",{attach:"background",args:O.fogColor}),d.createElement(ae,null),d.createElement(ee,null),d.createElement(R,{showPanel:0,className:"stats"}))));L.render(d.createElement(d.StrictMode,null,d.createElement(se,null)),document.getElementById("root"));
