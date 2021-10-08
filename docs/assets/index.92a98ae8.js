var e=Object.defineProperty,t=Object.defineProperties,r=Object.getOwnPropertyDescriptors,o=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable,s=(t,r,o)=>r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[r]=o,i=(e,t)=>{for(var r in t||(t={}))a.call(t,r)&&s(e,r,t[r]);if(o)for(var r of o(t))n.call(t,r)&&s(e,r,t[r]);return e};import{u as c,r as l,V as m,a as u,l as p,R as d,b as h,S as E,C as f,c as g,M as y,O as w,d as M,T as x,P as v,e as b,s as S,f as k,E as L,g as C,h as R,i as P}from"./vendor.320085d7.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const r of e)if("childList"===r.type)for(const e of r.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const A={position:[0,0,0],velocity:[0,0,0],rotation:[0,0,0],mousePosition:[0,0,0],controls:{up:!1,down:!1,left:!1,right:!1,mouse:!1},isUnderWater:!0,damping:.75,uuid:"",cannonApi:null},z=e=>e*(Math.PI/180),F=e=>e/(1+Math.abs(e)),I=e=>d.createElement("meshPhysicalMaterial",{attach:"material",flatShading:!1,specular:"#eff41c",roughness:.7,reflectivity:1,metalness:1,clearcoat:1,clearcoatRoughness:.2,color:e.color||"purple"}),G=e=>{const t=l.exports.useRef(),r=l.exports.useRef(),o=l.exports.useRef(),{abs:a,sin:n}=Math;return console.log("Tail"),u((e=>{const{velocity:s,position:i}=A,[c,l,m]=s,[u,p,d]=i,h=z(n(a(l)+a(p)+a(c)+a(u)+4*e.clock.getElapsedTime()));t.current.rotation.set(0,10*h,0),r.current.rotation.set(0,25*h,0),o.current.rotation.set(0,25*h,0)})),d.createElement("group",{ref:t,name:"tail"},d.createElement(h,{args:[1,.75,.6],position:[-.5,.05,0],radius:.2,smoothness:4,receiveShadow:!0,castShadow:!0},d.createElement(I,{color:e.color})),d.createElement("group",{ref:r,position:[-1,0,0]},d.createElement(h,{args:[.6,.6,.3],position:[-.1,0,0],radius:.05,smoothness:4,receiveShadow:!0,castShadow:!0},d.createElement(I,{color:e.color})),d.createElement("group",{ref:o,position:[-.4,0,0]},d.createElement(h,{args:[.75,.4,.1],position:[-.1,.15,0],radius:.05,smoothness:4,rotation:[0,0,-10],receiveShadow:!0,castShadow:!0},d.createElement(I,{color:e.color})),d.createElement(h,{args:[.75,.4,.1],position:[-.1,-.15,0],radius:.05,smoothness:4,rotation:[0,0,10],receiveShadow:!0,castShadow:!0},d.createElement(I,{color:e.color})))))},O=e=>{const o=l.exports.useRef(),a=new m;return u((t=>{const[r,n,s]=A.velocity,i=a.set(F(-.1*n),.1*F(-1*n)+.5,0);o.current.setRotationFromAxisAngle(i.normalize(),e.mirror?-10:.5)})),d.createElement("group",(n=i({},e),t(n,r({ref:o,name:"eyeball"}))),d.createElement(E,{position:[0,0,0],args:[.3],receiveShadow:!0,castShadow:!0},d.createElement(I,{translate:[0,10,.25],attach:"material",color:"#f3f3f3"})),d.createElement(E,{position:[0,0,.25],args:[.1],receiveShadow:!0,castShadow:!0},d.createElement(I,{translate:[0,10,.25],attach:"material",color:"black"})));var n},T=e=>{const[t,r]=c((()=>i({mass:1,position:[0,0,0],linearDamping:.75,linearFactor:[1,1,0],angularFactor:[1,1,0],allowSleep:!1},e))),o=l.exports.useRef(),a=l.exports.useRef(),n=new m,{abs:s,sin:E,atan2:f}=Math;return console.log("Player"),l.exports.useLayoutEffect((()=>{A.uuid=t.current.uuid,A.cannonApi=r,console.count("subscribed");const e=r.velocity.subscribe((e=>{A.velocity=e})),o=r.position.subscribe((e=>{A.position=e})),a=r.rotation.subscribe((e=>{A.rotation=e})),n=r.linearDamping.subscribe((e=>{A.damping=e}));return()=>{console.count("unsubscribed"),e(),o(),a(),n()}}),[]),u((e=>{let{controls:t,isUnderWater:i,position:c,rotation:l,velocity:m,mousePosition:u,damping:d}=A;const[h,f,g]=m,[y,w]=u,[M,x,v]=c;t.up&&i&&r.applyImpulse([0,.4,0],[0,0,0]),t.down&&i&&r.applyImpulse([0,-.4,0],[0,0,0]),t.right&&i&&r.applyImpulse([.4,0,0],[0,0,0]),t.left&&i&&r.applyImpulse([-.4,0,0],[0,0,0]),t.mouse&&i&&r.applyImpulse([.1*y,.1*w,0],[0,0,0]);const b=(i&&f)<-10?.99:i?.75:.01;r.linearDamping.set(p(d,b,.5)),!i&&x>10.25&&r.applyImpulse([0,-.5,0],[0,0,0]),x<9&&!i&&(i=!0),x<-9&&r.applyImpulse([0,.05,0],[0,0,0]);const S=-10*E(s(f)+s(x)+s(h)+s(M)+4*e.clock.getElapsedTime()),k={y:z(180*(.5*F(.5*h)-.5)+S),z:z(90*F(.2*f))};r.rotation.set(0,k.y,k.z),o.current.setRotationFromAxisAngle(n.lerp(n.set(F(1*f),-1,0),.25),.5),a.current.setRotationFromAxisAngle(n.lerp(n.set(-1*F(1*f),1,0),.25),.5)})),d.createElement("group",{ref:t,name:"player"},d.createElement(h,{args:[1.5,1.2,.8],position:[.25,.1,0],radius:.2,smoothness:4,receiveShadow:!0,castShadow:!0},d.createElement(I,{color:e.color})),d.createElement(h,{args:[.7,.5,.8],position:[.8,-.25,0],rotation:[0,0,0],radius:.2,smoothness:6,receiveShadow:!0,castShadow:!0},d.createElement(I,{color:e.color})),d.createElement(h,{args:[.5,.5,.05],name:"dorsal-fin",position:[.25,.7,0],radius:.05,smoothness:4,rotation:[0,0,10],receiveShadow:!0,castShadow:!0},d.createElement(I,{color:e.color})),d.createElement(h,{ref:o,name:"right-fin",args:[.5,.1,.6],position:[-0,-.25,.4],radius:.05,smoothness:4,receiveShadow:!0,castShadow:!0},d.createElement(I,{color:e.color})),d.createElement(h,{ref:a,name:"left-fin",args:[.5,.1,.6],position:[-0,-.25,-.4],radius:.05,smoothness:4,receiveShadow:!0,castShadow:!0},d.createElement(I,{color:e.color})),d.createElement(h,{name:"lips",args:[.1,.1,.5],position:[1.11,-.3,0],radius:.05,smoothness:4,receiveShadow:!0,castShadow:!0},d.createElement(I,{color:"#2e2929"})),d.createElement(O,{position:[.6,.1,.35]}),d.createElement(O,{position:[.6,.1,-.35],mirror:!0}),d.createElement(G,{color:e.color}))},U=e=>{const t=l.exports.useRef(),r=l.exports.useRef(!1),o=l.exports.useRef(new f("hsl(340, 88%, 45%)")),a=l.exports.useRef(new f("hsl(220, 87%, 30%)")),n=e.size||.5,[s,c]=g((()=>i({mass:.2*n,position:e.position,linearDamping:.7,linearFactor:[1,1,0],args:n,allowSleep:!0,sleepSpeedLimit:.25,onCollide:e=>{r.current=!r.current}},e)));return u((({clock:e})=>{r.current?t.current.color.lerpHSL(a.current,.05):t.current.color.lerpHSL(o.current,.05)})),console.log("Ball"),d.createElement("group",{ref:s},d.createElement(E,{position:[0,0,0],args:[n],receiveShadow:!0,castShadow:!0},d.createElement(y,{ref:t,attach:"material",color:"hsl(340, 88%, 60%)",metalness:1,specular:"#0068b3",roughness:.7,reflectivity:.5,clearcoat:.5,clearcoatRoughness:.2})))},j="#4898e8",B="#164f6e",W=e=>(console.log("Sphere"),d.createElement(d.Fragment,null,d.createElement("sphereGeometry",{args:8*(.5*Math.random()+.75)}),d.createElement("meshLambertMaterial",{attach:"material",color:B}))),D=e=>{const t=l.exports.useRef(),r=l.exports.useRef(Array.from(Array(20)).map((e=>[Math.random()-.5,Math.random(),Math.random()]))),o=l.exports.useRef(new w),a=l.exports.useRef(r.current.map(((e,t)=>({positionX:100*e[0],positionZ:-100*e[1]+10,rotationY:e[2]}))),[]);return l.exports.useLayoutEffect((()=>{a.current.forEach(((e,r)=>{const{positionX:a,positionZ:n,rotationY:s}=e,i=.5*Math.random()+.5;o.current.position.set(a*(Math.random()+.5),-15,n*(Math.random()+.75)),o.current.scale.set(1,i,1),o.current.updateMatrix(),t.current.setMatrixAt(r,o.current.matrix)})),t.current.instanceMatrix.needsUpdate=!0}),[]),d.createElement("group",null,d.createElement("instancedMesh",{ref:t,args:[null,null,a.current.length]},d.createElement(W,null)),d.createElement("mesh",{position:[-30,-13,-100],rotation:[0,0,0]},d.createElement("icosahedronGeometry",{args:25}),d.createElement("meshLambertMaterial",{attach:"material",color:B})),d.createElement("mesh",{position:[-40,-15,-40],rotation:[10*Math.random(),10*Math.random(),10*Math.random()]},d.createElement("icosahedronGeometry",{args:15}),d.createElement("meshLambertMaterial",{attach:"material",color:B})),d.createElement("mesh",{position:[10,-10,-10],rotation:[10*Math.random(),10*Math.random(),10*Math.random()]},d.createElement("icosahedronGeometry",{args:5}),d.createElement("meshLambertMaterial",{attach:"material",color:B})),d.createElement("mesh",{position:[20,-10,-25],rotation:[10*Math.random(),10*Math.random(),10*Math.random()]},d.createElement("dodecahedronGeometry",{args:5}),d.createElement("meshLambertMaterial",{attach:"material",color:B})))};const N=e=>{console.log("Plane");const t=M(x,"/swimmy-fish/assets/seaweed-100w.344c6dd9.png");return t.offset.set(0,-1),t.repeat.set(1,2),d.createElement(d.Fragment,null,d.createElement("planeGeometry",{args:[3,12]}),d.createElement("meshLambertMaterial",{attach:"material",color:B,transparent:!0,alphaTest:.5,map:t}))},X=e=>{const t=l.exports.useRef(Array.from(Array(200)).map((e=>[Math.random()-.5,Math.random(),Math.random()]))),r=l.exports.useRef(),o=l.exports.useRef(new w),a=l.exports.useRef(t.current.map(((e,t)=>({positionX:100*e[0],positionZ:-100*e[1]+10,rotationY:e[2]}))),[]);l.exports.useLayoutEffect((()=>{a.current.forEach(((e,t)=>{const{positionX:a,positionZ:n,rotationY:s}=e,i=2*Math.random();e.position=[a,-10,n>-1&&n<2?n:n-100*Math.random()],o.current.position.set(...e.position),e.scale=[i,i,1],o.current.scale.set(...e.scale),o.current.updateMatrix(),r.current.setMatrixAt(t,o.current.matrix)})),r.current.instanceMatrix.needsUpdate=!0}),[]);const{sin:n}=Math;return u((e=>{a.current.forEach(((t,a)=>{const s=.1*n(e.clock.elapsedTime+.03*t.position[0]);o.current.scale.set(...t.scale),o.current.position.set(...t.position),o.current.rotation.set(1*s,-2*s,s),o.current.updateMatrix(),r.current.setMatrixAt(a,o.current.matrix)})),r.current.instanceMatrix.needsUpdate=!0})),d.createElement("instancedMesh",{ref:r,args:[null,null,a.current.length]},d.createElement(N,null))},Y=e=>{const[t]=b((()=>i({rotation:[-Math.PI/2,0,0],position:[0,10,0],isTrigger:!0,onCollide:e=>{const{body:t}=e,r=A.uuid;t.uuid===r&&(A.isUnderWater=!0)}},e)));return console.log("Water surface"),d.createElement("mesh",{ref:t},d.createElement("planeBufferGeometry",{attach:"geometry",args:[1e3,1e3]}),d.createElement("meshBasicMaterial",{attach:"material",transparent:!0,opacity:0}))},Z=e=>{const[t]=b((()=>i({rotation:[-Math.PI/-2,0,0],position:[0,10,-125],isTrigger:!0,onCollide:e=>{const{body:t,contact:r}=e,o=A.uuid,a=A.cannonApi,{velocity:n}=A;t.uuid===o&&(A.isUnderWater=!1,a.applyImpulse([.2*n[0],.2*n[1],0],[0,0,0]))}},e)));return console.log("Ceiling"),d.createElement("mesh",{ref:t,position:[0,10,-100]},d.createElement("planeBufferGeometry",{attach:"geometry",args:[1e3,300]}),d.createElement("meshPhysicalMaterial",{attach:"material",specular:"white",roughness:.3,reflectivity:1,metalness:.5,clearcoat:1,clearcoatRoughness:.15,color:B,side:2}))},q=e=>d.createElement("mesh",{rotation:[z(0),0,0],position:[0,0,-200]},d.createElement("planeBufferGeometry",{attach:"geometry",args:[1e3,20]}),d.createElement("meshBasicMaterial",{color:"#356375"})),H=e=>{const[t]=b((()=>i({rotation:[-Math.PI/2,0,0],position:[0,-10,0]},e)));return d.createElement("mesh",{ref:t},d.createElement("planeBufferGeometry",{attach:"geometry",args:[1e3,1e3]}),d.createElement("meshLambertMaterial",{attach:"material",color:B}))},K=e=>(console.log("Scene"),d.createElement(d.Fragment,null,d.createElement(v,{gravity:[0,0,0],broadphase:"SAP",defaultContactMaterial:{contactEquationRelaxation:4,friction:.001},allowSleep:!0},d.createElement(Y,null),d.createElement(Z,null),d.createElement(T,{color:"#e07e28"}),d.createElement(U,{position:[5,0,0],size:.75}),d.createElement(U,{position:[6,2,0],size:.25}),d.createElement(U,{position:[6,2,0],size:.25}),d.createElement(U,{position:[6,2,0],size:.25}),d.createElement(U,{position:[6,2,0],size:.2}),d.createElement(U,{position:[6,2,0],size:.15}),d.createElement(U,{position:[6,2,0],size:.35}),d.createElement(U,{position:[6,2,0],size:.25}),d.createElement(U,{position:[-2,-5,0]}),d.createElement(U,{position:[-3,-3,0],size:1.2}),d.createElement(U,{position:[-7,-5,0],size:.8}),d.createElement(D,null),d.createElement(X,null),d.createElement(q,null),d.createElement(H,null)))),V=e=>(console.log("Controls"),l.exports.useEffect((()=>{const{controls:e}=A,t=t=>{38===t.keyCode||87===t.keyCode||32===t.keyCode?e.up=!0:37===t.keyCode||65===t.keyCode?e.left=!0:39===t.keyCode||68===t.keyCode?e.right=!0:40===t.keyCode||83===t.keyCode?e.down=!0:t.keyCode},r=t=>{38===t.keyCode||87===t.keyCode||32===t.keyCode?e.up=!1:37===t.keyCode||65===t.keyCode?e.left=!1:39===t.keyCode||68===t.keyCode?e.right=!1:40===t.keyCode||83===t.keyCode?e.down=!1:t.keyCode},o=()=>{e.mouse=!0},a=()=>{e.mouse=!1};return window.addEventListener("keydown",t),window.addEventListener("keyup",r),window.addEventListener("mousedown",o),window.addEventListener("mouseup",a),window.addEventListener("touchstart",o),window.addEventListener("touchend",a),()=>{window.removeEventListener("keydown",t),window.removeEventListener("keyup",r),window.removeEventListener("mousedown",o),window.removeEventListener("mouseup",a),window.removeEventListener("touchstart",o),window.removeEventListener("touchend",a)}}),[]),u((e=>{const{mouse:t,viewport:r}=e,o=t.x*r.width/2,a=t.y*r.height/2;A.mousePosition=[o,a,0]})),null),J=()=>{console.log("lighting");const e=l.exports.useRef();return u((()=>{const{isUnderWater:t}=A;e.current.intensity=p(e.current.intensity,t?.1:2,.1)})),d.createElement(d.Fragment,null,d.createElement("ambientLight",{ref:e,intensity:.1,color:"white"}),d.createElement("spotLight",{position:[0,200,-300],angle:.3,intensity:10,distance:500,decay:3,penumbra:1,color:"white"}))};function Q({count:e,mouse:t}){const r=l.exports.useRef(),{sin:o,cos:a,random:n}=Math,s=l.exports.useMemo((()=>new w),[]),i=l.exports.useMemo((()=>{const t=[];for(let r=0;r<e;r++){const e=100*n(),r=10+n(),o=.01,a=200*n()-100,s=12*n()-10,i=150*n()-100;t.push({t:e,factor:r,speed:o,xFactor:a,yFactor:s,zFactor:i,mx:0,my:0})}return t}),[e,n]);return u((e=>{i.forEach(((t,n)=>{let{t:i,factor:c,speed:l,xFactor:m,yFactor:u,zFactor:p}=t;i=t.t+=.5*l,t.mx+=.001*(0-t.mx),t.my+=.001*(-0-t.my),s.position.set(t.mx/10*1+m+a(.05*e.clock.elapsedTime)+10*o(.05*e.clock.elapsedTime),t.my/10+u+o(.01*i*c)+a(.5*i)*c/10,p),s.updateMatrix(),r.current.setMatrixAt(n,s.matrix)})),r.current.instanceMatrix.needsUpdate=!0})),d.createElement(d.Fragment,null,d.createElement("instancedMesh",{ref:r,args:[null,null,e]},d.createElement("sphereGeometry",{args:[.05]}),d.createElement("meshLambertMaterial",{attach:"material",color:"#275e5c"})))}const $=S.div`
  width: 100vw;
  height: 100vh;
  user-select: none;
`,_=()=>(console.log("Camera movement"),u((e=>{const[t,r,o]=A.position,[a,n,s]=A.velocity,i=p(e.camera.position.x,t+.1*a,.7),c=r+.1*n>11?11:r+.1*n>-9?r+.1*n:-9,l=p(e.camera.position.y,c,.7),m=p(e.camera.position.y,r+.1*n,.7);e.camera.lookAt(i,m,0),e.camera.position.y=l,e.camera.position.x=i,e.camera.position.z=20,e.camera.updateProjectionMatrix()})),null),ee=()=>(console.log("Scene mounted"),d.createElement($,null,d.createElement(k,{mode:"concurrent",colorManagement:!0,camera:{position:[0,0,20],fov:45,far:230,near:.1}},d.createElement(l.exports.Suspense,{fallback:null},d.createElement(L,{preset:"forest"})),d.createElement(l.exports.Suspense,{fallback:null},d.createElement(J,null),d.createElement(K,null),d.createElement(C,{azimuth:0,turbidity:5,rayleigh:0,inclination:.8,sunPosition:[.1,5,-5],distance:1e4}),d.createElement(Q,{count:1e3,mouse:{current:[0,0]}})),d.createElement("fog",{attach:"fog",args:[j,0,200]}),d.createElement(_,null),d.createElement(V,null),d.createElement(R,{showPanel:0,className:"stats"}))));P.render(d.createElement(d.StrictMode,null,d.createElement(ee,null)),document.getElementById("root"));
