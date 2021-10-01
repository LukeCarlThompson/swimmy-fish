var e=Object.defineProperty,t=Object.defineProperties,o=Object.getOwnPropertyDescriptors,r=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable,s=(t,o,r)=>o in t?e(t,o,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[o]=r,l=(e,t)=>{for(var o in t||(t={}))n.call(t,o)&&s(e,o,t[o]);if(r)for(var o of r(t))a.call(t,o)&&s(e,o,t[o]);return e},c=(e,r)=>t(e,o(r));import{c as i,u as m,r as u,V as p,a as d,R as E,b as f,S as g,d as h,P as y,e as b,s as w,C as v,f as k,g as S}from"./vendor.09b55727.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const M=i((e=>({position:[0,0,0],velocity:[0,0,0],rotation:[0,0,0],mousePosition:[0,0,0],controls:{up:!1,down:!1,left:!1,right:!1,mouse:!1}}))),C=e=>e*(Math.PI/180),L=e=>e/(1+Math.abs(e)),x=e=>E.createElement("meshPhongMaterial",{attach:"material",flatShading:!1,specular:"#eff41c",color:e.color||"purple"}),P=e=>{const t=u.exports.useRef(),o=u.exports.useRef(),r=u.exports.useRef();return d((e=>{const[n,a,s]=M.getState().velocity,[l,c,i]=M.getState().position,m=C(Math.sin(Math.abs(a)+Math.abs(c)+Math.abs(n)+Math.abs(l)+4*e.clock.getElapsedTime()));t.current.rotation.set(0,10*m,0),o.current.rotation.set(0,25*m,0),r.current.rotation.set(0,25*m,0)})),E.createElement("group",{ref:t},E.createElement(f,{args:[1,.75,.6],position:[-.5,.05,0],radius:.2,smoothness:4},E.createElement(x,{color:e.color})),E.createElement("group",{ref:o,position:[-1,0,0]},E.createElement(f,{args:[.6,.6,.3],position:[-.1,0,0],radius:.05,smoothness:4},E.createElement(x,{color:e.color})),E.createElement("group",{ref:r,position:[-.4,0,0]},E.createElement(f,{args:[.75,.4,.1],position:[-.1,.15,0],radius:.05,smoothness:4,rotation:[0,0,-10]},E.createElement(x,{color:e.color})),E.createElement(f,{args:[.75,.4,.1],position:[-.1,-.15,0],radius:.05,smoothness:4,rotation:[0,0,10]},E.createElement(x,{color:e.color})))))},R=e=>{const t=u.exports.useRef(),o=new p;return d((r=>{const[n,a,s]=M.getState().velocity,l=o.lerp(o.set(L(-.1*a),.1*L(-1*a)+.5,0),.25);t.current.setRotationFromAxisAngle(l.normalize(),e.mirror?-10:.5)})),E.createElement("group",c(l({},e),{ref:t}),E.createElement(g,{position:[0,0,0],args:[.3]},E.createElement(x,{translate:[0,10,.25],attach:"material",color:"#f3f3f3"})),E.createElement(g,{position:[0,0,.25],args:[.1]},E.createElement(x,{translate:[0,10,.25],attach:"material",color:"black"})))},z=e=>{const[t,o]=m((()=>l({mass:1,position:[0,0,0],linearDamping:.5,linearFactor:[1,1,0],angularFactor:[1,1,0]},e))),r=u.exports.useRef(),n=u.exports.useRef(),a=new p,s=u.exports.useRef([0,0,0]),c=u.exports.useRef([0,0,0]),i=u.exports.useRef([0,0,0]);return console.log("Player"),u.exports.useEffect((()=>{console.count("subscribed");const e=o.velocity.subscribe((e=>{s.current=e})),t=o.position.subscribe((e=>{c.current=e})),r=o.rotation.subscribe((e=>{i.current=e}));return()=>{console.count("unsubscribed"),e(),t(),r()}}),[]),d((e=>{const{controls:t}=M.getState(),[l,m,u]=s.current,[p,d]=M.getState().mousePosition,[E,f,g]=c.current;t.up&&o.velocity.set(l,m+.2,u),t.down&&o.velocity.set(l,m-.2,u),t.right&&o.velocity.set(l+.5,m,u),t.left&&o.velocity.set(l-.5,m,u),t.mouse&&o.velocity.set(l+.1*p,m+.1*d,u);const h=-10*Math.sin(Math.abs(m)+Math.abs(f)+Math.abs(l)+Math.abs(E)+4*e.clock.getElapsedTime()),y=a.lerp(a.set(0,C(180*(.5*L(.2*l)-.5)+h),C(90*L(.2*m))),.1);o.rotation.set(0,y.y,y.z),M.setState({rotation:i.current}),M.setState({velocity:s.current}),M.setState({position:c.current}),r.current.setRotationFromAxisAngle(a.lerp(a.set(L(1*m),-1,0),.25),.5),n.current.setRotationFromAxisAngle(a.lerp(a.set(-1*L(1*m),1,0),.25),.5)})),E.createElement("group",{ref:t},E.createElement(f,{args:[1.5,1.2,.8],position:[.25,.1,0],radius:.2,smoothness:4},E.createElement(x,{color:e.color})),E.createElement(f,{args:[.7,.5,.8],position:[.8,-.25,0],rotation:[0,0,0],radius:.1,smoothness:6},E.createElement(x,{color:e.color})),E.createElement(f,{args:[.5,.5,.05],position:[.25,.7,0],radius:.05,smoothness:4,rotation:[0,0,10]},E.createElement(x,{color:e.color})),E.createElement(f,{ref:r,args:[.5,.1,.6],position:[-0,-.25,.4],radius:.05,smoothness:4},E.createElement(x,{color:e.color})),E.createElement(f,{ref:n,args:[.5,.1,.6],position:[-0,-.25,-.4],radius:.05,smoothness:4},E.createElement(x,{color:e.color})),E.createElement(f,{args:[.1,.1,.5],position:[1.15,-.4,0],radius:.05,smoothness:4},E.createElement("meshPhysicalMaterial",{attach:"material",color:"black"})),E.createElement(R,{position:[.6,.1,.35]}),E.createElement(R,{position:[.6,.1,-.35],mirror:!0}),E.createElement(P,{color:e.color}))},A=e=>E.createElement("meshLambertMaterial",{attach:"material",flatShading:!1,specular:"#eff41c",color:e.color||"purple"}),O=e=>{const t=e.size||.5,[o,r]=h((()=>l({mass:.2*t,position:e.position,linearDamping:.9,linearFactor:[1,1,0],args:t},e)));return console.log("Ball"),E.createElement("group",{ref:o},E.createElement(g,{position:[0,0,0],args:[t]},E.createElement(A,{translate:[0,0,0],attach:"material",color:"#dd9beb"})))},j=e=>E.createElement("meshLambertMaterial",{attach:"material",flatShading:!1,specular:"#eff41c",color:"green"}),F=e=>{const t=u.exports.useRef(Math.random()+.5);return console.log("Pillar"),E.createElement("mesh",c(l({},e),{scale:1}),E.createElement("coneGeometry",{args:[t.current,100*t.current,5]}),E.createElement(j,null))},I=e=>{const t=u.exports.useRef(Array.from(Array(20)).map((e=>[Math.random()-.5,Math.random(),Math.random()])));return E.createElement("group",null,t.current.map(((e,t)=>{const o=100*e[0],r=-100*e[1]+10,n=e[2];return E.createElement(F,{key:t,position:[o,0,r],rotation:[0,n,0]})})))},N=e=>{const[t]=b((()=>l({rotation:[-Math.PI/2,0,0],position:[0,-10,0]},e)));return E.createElement("mesh",{ref:t,receiveShadow:!0},E.createElement("planeBufferGeometry",{attach:"geometry",args:[1e3,1e3]}),E.createElement("shadowMaterial",{attach:"material",color:"#171717"}),E.createElement("meshStandardMaterial",{color:"#615637"}))},B=e=>(console.log("Scene"),E.createElement(E.Fragment,null,E.createElement(y,{gravity:[0,0,0],tolerance:.1},E.createElement(z,{color:"#e65b05"}),E.createElement(O,{position:[5,0,0],size:.75}),E.createElement(O,{position:[6,2,0],size:.25}),E.createElement(O,{position:[6,2,0],size:.25}),E.createElement(O,{position:[6,2,0],size:.25}),E.createElement(O,{position:[6,2,0],size:.2}),E.createElement(O,{position:[6,2,0],size:.15}),E.createElement(O,{position:[6,2,0],size:.35}),E.createElement(O,{position:[6,2,0],size:.25}),E.createElement(O,{position:[-2,-5,0]}),E.createElement(O,{position:[-3,-3,0],size:1.2}),E.createElement(O,{position:[-7,-5,0],size:.8}),E.createElement(I,null),E.createElement(N,null)))),D=e=>(console.log("Controls"),u.exports.useEffect((()=>{const e=e=>{38===e.keyCode||87===e.keyCode||32===e.keyCode?M.setState({controls:{up:!0}}):37===e.keyCode||65===e.keyCode?M.setState({controls:{left:!0}}):39===e.keyCode||68===e.keyCode?M.setState({controls:{right:!0}}):40===e.keyCode||83===e.keyCode?M.setState({controls:{down:!0}}):e.keyCode},t=e=>{38===e.keyCode||87===e.keyCode||32===e.keyCode?M.setState({controls:{up:!1}}):37===e.keyCode||65===e.keyCode?M.setState({controls:{left:!1}}):39===e.keyCode||68===e.keyCode?M.setState({controls:{right:!1}}):40===e.keyCode||83===e.keyCode?M.setState({controls:{down:!1}}):e.keyCode},o=()=>{M.setState({controls:{mouse:!0}})},r=()=>{M.setState({controls:{mouse:!1}})};return window.addEventListener("keydown",e),window.addEventListener("keyup",t),window.addEventListener("mousedown",o),window.addEventListener("mouseup",r),window.addEventListener("touchstart",o),window.addEventListener("touchend",r),()=>{window.removeEventListener("keydown",e),window.removeEventListener("keyup",t),window.removeEventListener("mousedown",o),window.removeEventListener("mouseup",r),window.removeEventListener("touchstart",o),window.removeEventListener("touchend",r)}}),[]),d((e=>{const{mouse:t,viewport:o}=e,r=t.x*o.width/2,n=t.y*o.height/2;M.setState({mousePosition:[r,n,0]})})),null),G=()=>(console.log("lighting"),E.createElement(E.Fragment,null,E.createElement("ambientLight",{intensity:.5,color:"#bfefff"}),E.createElement("spotLight",{position:[0,100,-200],angle:.2,intensity:5,distance:300,decay:1,penumbra:1,color:"#fffb8a"}),E.createElement("pointLight",{position:[0,100,-10],decay:10,color:"#fffb8a",intensity:1}))),T=w.div`
  width: 100vw;
  height: 100vh;
  user-select: none;
`,q=()=>(console.log("Camera movement"),d((e=>{const[t,o,r]=M.getState().position,[n,a,s]=M.getState().velocity,l=t+.1*n,c=o+.1*a;e.camera.lookAt(l,.65*c,0),e.camera.position.y=.25*c,e.camera.position.x=l,e.camera.position.z=20,e.camera.updateProjectionMatrix()})),null),K=()=>(console.log("Scene mounted"),E.createElement(T,null,E.createElement(v,{shadows:!0,colorManagement:!0,camera:{position:[0,0,20],fov:45,far:300,near:.1}},E.createElement(G,null),E.createElement(B,null),E.createElement("fog",{attach:"fog",args:["#547f91",0,200]}),E.createElement("color",{attach:"background",args:"#547f91"}),E.createElement(q,null),E.createElement(D,null),E.createElement(k,{showPanel:0,className:"stats"}))));S.render(E.createElement(E.StrictMode,null,E.createElement(K,null)),document.getElementById("root"));