import{j as o}from"./index-CQHSiloJ.js";import{u as P,a as q,G as W,F as U,C as $,R as K,_ as w,N as f,o as B,i as Q,e as X,d as Z,f as Y,s as ee,b as m,c as te,l as ne,g as se,h as oe,j as ae}from"./dg-DtOqCax1.js";import{r as i}from"./index-DQDNmYQF.js";import{t as ie,z as v,T as O,N as g}from"./wasm-DXDqwy_F.js";import{C as re}from"./ce-preview-Bggm5qF5.js";import{I as J,B as de}from"./AntdIcon-CryBA4gb.js";import{S as ce}from"./expression-BMQcg-vu.js";import"./index-DYVtDik4.js";import"./function-CSBvrvHb.js";import"./iframe-WM6WQ283.js";var ue={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M908 640H804V488c0-4.4-3.6-8-8-8H548v-96h108c8.8 0 16-7.2 16-16V80c0-8.8-7.2-16-16-16H368c-8.8 0-16 7.2-16 16v288c0 8.8 7.2 16 16 16h108v96H228c-4.4 0-8 3.6-8 8v152H116c-8.8 0-16 7.2-16 16v288c0 8.8 7.2 16 16 16h288c8.8 0 16-7.2 16-16V656c0-8.8-7.2-16-16-16H292v-88h440v88H620c-8.8 0-16 7.2-16 16v288c0 8.8 7.2 16 16 16h288c8.8 0 16-7.2 16-16V656c0-8.8-7.2-16-16-16zm-564 76v168H176V716h168zm84-408V140h168v168H428zm420 576H680V716h168v168z"}}]},name:"apartment",theme:"outlined"},fe={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M917.7 148.8l-42.4-42.4c-1.6-1.6-3.6-2.3-5.7-2.3s-4.1.8-5.7 2.3l-76.1 76.1a199.27 199.27 0 00-112.1-34.3c-51.2 0-102.4 19.5-141.5 58.6L432.3 308.7a8.03 8.03 0 000 11.3L704 591.7c1.6 1.6 3.6 2.3 5.7 2.3 2 0 4.1-.8 5.7-2.3l101.9-101.9c68.9-69 77-175.7 24.3-253.5l76.1-76.1c3.1-3.2 3.1-8.3 0-11.4zM769.1 441.7l-59.4 59.4-186.8-186.8 59.4-59.4c24.9-24.9 58.1-38.7 93.4-38.7 35.3 0 68.4 13.7 93.4 38.7 24.9 24.9 38.7 58.1 38.7 93.4 0 35.3-13.8 68.4-38.7 93.4zm-190.2 105a8.03 8.03 0 00-11.3 0L501 613.3 410.7 523l66.7-66.7c3.1-3.1 3.1-8.2 0-11.3L441 408.6a8.03 8.03 0 00-11.3 0L363 475.3l-43-43a7.85 7.85 0 00-5.7-2.3c-2 0-4.1.8-5.7 2.3L206.8 534.2c-68.9 69-77 175.7-24.3 253.5l-76.1 76.1a8.03 8.03 0 000 11.3l42.4 42.4c1.6 1.6 3.6 2.3 5.7 2.3s4.1-.8 5.7-2.3l76.1-76.1c33.7 22.9 72.9 34.3 112.1 34.3 51.2 0 102.4-19.5 141.5-58.6l101.9-101.9c3.1-3.1 3.1-8.2 0-11.3l-43-43 66.7-66.7c3.1-3.1 3.1-8.2 0-11.3l-36.6-36.2zM441.7 769.1a131.32 131.32 0 01-93.4 38.7c-35.3 0-68.4-13.7-93.4-38.7a131.32 131.32 0 01-38.7-93.4c0-35.3 13.7-68.4 38.7-93.4l59.4-59.4 186.8 186.8-59.4 59.4z"}}]},name:"api",theme:"outlined"};function E(){return E=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var n in s)Object.prototype.hasOwnProperty.call(s,n)&&(e[n]=s[n])}return e},E.apply(this,arguments)}const le=(e,t)=>i.createElement(J,E({},e,{ref:t,icon:ue})),pe=i.forwardRef(le);function A(){return A=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var n in s)Object.prototype.hasOwnProperty.call(s,n)&&(e[n]=s[n])}return e},A.apply(this,arguments)}const me=(e,t)=>i.createElement(J,A({},e,{ref:t,icon:fe})),he=i.forwardRef(me),y=e=>({kind:e.kind,icon:e.icon,color:e.color,displayName:e.displayName,group:e.group,shortDescription:e.shortDescription,generateNode:e.generateNode||(({index:t})=>({name:`${e.kind||e.displayName}${t}`})),onNodeAdd:e.onNodeAdd,renderNode:e.renderNode?e.renderNode:({id:t,specification:s,data:n,selected:d})=>{const[c,a]=i.useState(!1),{token:r}=ie.useToken(),{updateNode:u}=P(),l=q(h=>(h.decisionGraph?.nodes||[]).find(p=>p.id===t))?.content?.config;return o.jsx(W,{id:t,specification:s,name:n.name,isSelected:d,noBodyPadding:!0,handleLeft:e.handleLeft,handleRight:e.handleRight,actions:e?.inputs?[o.jsx(de,{type:"text",style:{marginLeft:"auto",transform:c?"rotate(180deg)":void 0},onClick:()=>a(h=>!h),children:o.jsx(K,{})},"edit-table")]:void 0,children:c&&e?.inputs&&o.jsx(U,{className:"grl-dn__cn__form",layout:"vertical",initialValues:l,onValuesChange:(h,p)=>{u(t,V=>(V.content.config=p,V))},children:(e?.inputs||[]).map(({name:h,control:p,label:V})=>{const F=v({control:p}).with({control:"text"},()=>o.jsx(re,{type:"template"})).with({control:"bool"},()=>o.jsx($,{children:o.jsx(O.Text,{style:{fontSize:r.fontSizeSM},children:V})})).exhaustive(),M=v({control:p}).with({control:"bool"},()=>null).otherwise(()=>o.jsx(O.Text,{style:{fontSize:r.fontSizeSM},children:V})),z=v({control:p}).with({control:"bool"},()=>"checked").otherwise(()=>{});return o.jsx(U.Item,{name:h,label:M,valuePropName:z,style:{marginBottom:4},children:F},h)})})})}}),ge=(e,t,s)=>{const n=be(e?.nodes??[],t?.nodes??[],s),d=ye(e?.edges??[],t?.edges??[]);return{nodes:n,edges:d}},be=(e,t,s)=>{const n=s?.components||[],d=s?.customNodes||[],c=new Map;return(e||[]).forEach(a=>{const r=(t||[]).find(u=>u.id===a.id);if(!r)c.set(a.id,{...a,_diff:{status:"added"}});else{const u={};(r.position.x!==a.position.x||r.position.y!==a.position.y)&&w.set(u,"position",{status:"moved",previousValue:r.position}),r.name!==a.name&&w.set(u,"name",{status:"modified",previousValue:r.name});const C=v([a.type,r.type]).with([f.Output,f.Output],()=>B?.getDiffContent?.(a?.content,r?.content)).with([f.Input,f.Input],()=>Q?.getDiffContent?.(a?.content,r?.content)).with([f.Expression,f.Expression],()=>X?.getDiffContent?.(a?.content,r?.content)).with([f.DecisionTable,f.DecisionTable],()=>Z?.getDiffContent?.(a?.content,r?.content)).with([f.Function,f.Function],()=>{const l=Y?.getDiffContent?.(a?.content,r?.content);return v(a?.content).with(g.string,()=>(l?._diff?.fields?.source?.status==="modified"&&w.set(u,"content",{status:"modified",previousValue:l?._diff?.fields?.source?.previousValue}),l?.source)).otherwise(()=>l)}).with([f.Switch,f.Switch],()=>ee?.getDiffContent?.(a?.content,r?.content)).otherwise(()=>{const l=n.find(p=>p.type===a.type);if(l)return l?.getDiffContent?.(a?.content,r?.content);const h=d.find(p=>a?.type==="customNode"&&a?.content?.kind===p?.kind);return h?h?.calculateDiff?.(a?.content,r?.content):null});Object.keys(u||{}).filter(l=>l!=="position").length>0||C?._diff?.status==="modified"?c.set(a.id,{...a,content:C??a.content,_diff:{status:"modified",fields:u}}):Object.keys(u||{}).length===1&&u?.position?.status==="moved"?c.set(a.id,{...a,content:C??a.content,_diff:{status:"moved",fields:u}}):c.set(a.id,{...a,_diff:{status:"unchanged"}})}}),(t||[]).forEach(a=>{c.has(a.id)||c.set(a.id,{...a,_diff:{status:"removed"}})}),Array.from(c.values())},ye=(e,t)=>{const s=new Map;return(e||[]).forEach(n=>{(t||[]).find(c=>c.id===n.id)?s.set(n.id,{...n,_diff:{status:"unchanged"}}):s.set(n.id,{...n,_diff:{status:"added"}})}),(t||[]).forEach(n=>{s.has(n.id)||s.set(n.id,{...n,_diff:{status:"removed"}})}),Array.from(s.values())},x={nodes:[{id:"ca98730e-a40f-4601-98cc-b5a57429596d",type:"inputNode",position:{x:70,y:250},name:"Request"},{id:"c5e747fe-b74b-4b74-9fd0-bfd7d67007c3",type:"outputNode",position:{x:670,y:250},name:"Response"},{id:"359173d8-0068-45f8-bb71-8240ad73201d",type:"decisionTableNode",position:{x:370,y:250},name:"decisionTableNode 1",content:{hitPolicy:"first",inputs:[{id:"HVo_JpALi8",field:"cart.weight",name:"Cart Weight (Kg)"},{id:"HW6mSVfLbs",field:"customer.country",name:"Customer Country"}],outputs:[{field:"shippingFee",id:"3EGDrV0ssV",name:"Shipping Fee"}],rules:[{_id:"qMpJEvcau6",_description:"If weight is above 40kg and country is US, fee is 40",HVo_JpALi8:"> 40",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"40"},{_id:"KC6KqcWiOX",_description:"If weight is above 40kg and any other country, fee is 50",HVo_JpALi8:"> 40",HW6mSVfLbs:"","3EGDrV0ssV":"50"},{_id:"k-zEFSTe7b",_description:"if weight is between 20 and 40kg and country US, fee is 30",HVo_JpALi8:"[20..40]",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"30"},{_id:"c_8VkmGZ_C",_description:"if weight is between 20 and 40kg and any other country, fee is 32",HVo_JpALi8:"[20..40]",HW6mSVfLbs:"","3EGDrV0ssV":"32"},{_id:"e_MyQeTS3V",_description:"if weight is bellow 20kg and country US, fee is 25",HVo_JpALi8:"< 20",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"25"},{_id:"_iU8FNLxHb",_description:"if weight is bellow 20kg, fee is 30",HVo_JpALi8:"< 20",HW6mSVfLbs:"","3EGDrV0ssV":"30"}]}},{type:"expressionNode",content:{expressions:[{id:"2e32e45f-e8a2-4f07-8bd8-ba3cdaf6010b",key:"10",value:"false"},{id:"2e32e45f-e8a2-4f07-8bd8-ba3cdaf6010a",key:"1",value:"true"},{id:"a400f63d-5344-4c06-883f-9c6728afa207",key:"4",value:"true"},{id:"8513b4f9-f821-40af-bf63-d4ff70b26499",key:"2",value:"false"},{id:"27146595-f319-4474-95aa-914e7e434997",key:"3",value:"true"},{id:"6e78d69d-1068-4216-bb72-5bce60a0e822",key:"5",value:"'1 + 1'"}],passThrough:!0,inputField:null,outputPath:null,executionMode:"single"},id:"a750cebf-ca75-4acd-a272-7040626abd73",name:"expression1",position:{x:370,y:145}}],edges:[{id:"1d5f4787-4c86-4ed9-99dc-1a3159f65d89",sourceId:"ca98730e-a40f-4601-98cc-b5a57429596d",type:"edge",targetId:"359173d8-0068-45f8-bb71-8240ad73201d"},{id:"c5d49d3a-fdfd-4f4b-8838-791cee4d4a55",sourceId:"359173d8-0068-45f8-bb71-8240ad73201d",type:"edge",targetId:"c5e747fe-b74b-4b74-9fd0-bfd7d67007c3"},{id:"9600509a-8f11-44eb-a835-5f0b5e6e91a5",sourceId:"ca98730e-a40f-4601-98cc-b5a57429596d",type:"edge",targetId:"a750cebf-ca75-4acd-a272-7040626abd73"},{id:"6e763bcd-af53-41d3-8434-aded3f664384",sourceId:"a750cebf-ca75-4acd-a272-7040626abd73",type:"edge",targetId:"c5e747fe-b74b-4b74-9fd0-bfd7d67007c3"}]},ve={nodes:[{id:"ca98730e-a40f-4601-98cc-b5a57429596d",type:"inputNode",position:{x:70,y:250},name:"Request"},{id:"c5e747fe-b74b-4b74-9fd0-bfd7d67007c3",type:"outputNode",position:{x:675,y:250},name:"Response"},{id:"a70ede61-ba67-46fb-af25-c2d22afb2f0e",type:"customNode",name:"pingNode1",position:{x:375,y:250},content:{kind:"pingNode",config:{}}}],edges:[{id:"d306fcd9-5d16-4f15-8677-c59098db5bfe",sourceId:"ca98730e-a40f-4601-98cc-b5a57429596d",type:"edge",targetId:"a70ede61-ba67-46fb-af25-c2d22afb2f0e"},{id:"a1a64d21-4248-45cd-8502-30d47ac685d0",sourceId:"a70ede61-ba67-46fb-af25-c2d22afb2f0e",type:"edge",targetId:"c5e747fe-b74b-4b74-9fd0-bfd7d67007c3"}]},Ve={nodes:[{id:"ca98730e-a40f-4601-98cc-b5a57429596d",type:"inputNode",position:{x:70,y:250},name:"Request"},{id:"c5e747fe-b74b-4b74-9fd0-bfd7d67007c3",type:"outputNode",position:{x:675,y:250},name:"Response"},{id:"a70ede61-ba67-46fb-af25-c2d22afb2f0e",type:"customNode",name:"inputsNode1",position:{x:375,y:250},content:{kind:"inputsNode",config:{"hello.nested.something":"My",second:"Name",checkbox:!0}}}],edges:[{id:"d306fcd9-5d16-4f15-8677-c59098db5bfe",sourceId:"ca98730e-a40f-4601-98cc-b5a57429596d",type:"edge",targetId:"a70ede61-ba67-46fb-af25-c2d22afb2f0e"},{id:"a1a64d21-4248-45cd-8502-30d47ac685d0",sourceId:"a70ede61-ba67-46fb-af25-c2d22afb2f0e",type:"edge",targetId:"c5e747fe-b74b-4b74-9fd0-bfd7d67007c3"}]},Se={nodes:[{id:"ca98730e-a40f-4601-98cc-b5a57429596d",type:"inputNode",position:{x:70,y:250},name:"Request"},{id:"c5e747fe-b74b-4b74-9fd0-bfd7d67007c3",type:"outputNode",position:{x:685,y:250},name:"Response"},{id:"dc75f8e9-ea03-4de1-b48a-1d5b52076c66",type:"customNode",name:"pingNode1",position:{x:380,y:205},content:{kind:"pingNode",config:{}}},{id:"c25d895a-826d-4e8b-9477-cd5b368fe3e6",type:"customNode",name:"Test Node",position:{x:380,y:300},content:{kind:"unknownNode",config:{}}}],edges:[{id:"f9695843-7e91-4e93-b92e-8611e40dc1b7",sourceId:"ca98730e-a40f-4601-98cc-b5a57429596d",type:"edge",targetId:"c25d895a-826d-4e8b-9477-cd5b368fe3e6"},{id:"fe2781c3-4495-4c01-9cf7-253954afc753",sourceId:"ca98730e-a40f-4601-98cc-b5a57429596d",type:"edge",targetId:"dc75f8e9-ea03-4de1-b48a-1d5b52076c66"},{id:"04bfffb2-2cca-407a-b8d6-dc0f8431253c",sourceId:"dc75f8e9-ea03-4de1-b48a-1d5b52076c66",type:"edge",targetId:"c5e747fe-b74b-4b74-9fd0-bfd7d67007c3"},{id:"3f382611-9a8d-4405-ae80-0e607bb97f42",sourceId:"c25d895a-826d-4e8b-9477-cd5b368fe3e6",type:"edge",targetId:"c5e747fe-b74b-4b74-9fd0-bfd7d67007c3"}]},T={nodes:[{id:"ca98730e-a40f-4601-98cc-b5a57429596d",type:"inputNode",position:{x:100,y:250},name:"Request"},{id:"359173d8-0068-45f8-bb71-8240ad73201d",type:"decisionTableNode",position:{x:370,y:250},name:"decisionTableNode 1",content:{hitPolicy:"first",inputs:[{id:"HVo_JpALi8",field:"cart.weight",name:"Cart Weight (Kg)"},{id:"HW6mSVfLbs",field:"customer.country",name:"Customer Country"}],outputs:[{field:"shippingFee",id:"3EGDrV0ssV",name:"Shipping Fee"}],rules:[{_id:"qMpJEvcau6",_description:"If weight is above 40kg and country is US, fee is 40",HVo_JpALi8:"> 40",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"40"},{_id:"KC6KqcWiOX",_description:"If weight is above 40kg and any other country, fee is 50",HVo_JpALi8:"> 40",HW6mSVfLbs:"","3EGDrV0ssV":"50"},{_id:"k-zEFSTe7b",_description:"if weight is between 20 and 40kg and country US, fee is 30",HVo_JpALi8:"[20..40]",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"30"},{_id:"c_8VkmGZ_C",_description:"if weight is between 20 and 40kg and any other country, fee is 32",HVo_JpALi8:"[20..40]",HW6mSVfLbs:"","3EGDrV0ssV":"32"},{_id:"e_MyQeTS3V",_description:"if weight is bellow 20kg and country US, fee is 25",HVo_JpALi8:"< 20",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"25"},{_id:"_iU8FNLxHb",_description:"if weight is bellow 20kg, fee is 30",HVo_JpALi8:"< 20",HW6mSVfLbs:"","3EGDrV0ssV":"30"}],passThrough:!0}},{type:"functionNode",content:{source:`import zen from 'zen';

/** @type {Handler} **/
export const handler = async (input) => {
  return input;
};
`},id:"8d5b53f6-7186-4c7b-a36a-c6bd75e77d47",name:"function1",position:{x:640,y:250}}],edges:[{id:"1d5f4787-4c86-4ed9-99dc-1a3159f65d89",sourceId:"ca98730e-a40f-4601-98cc-b5a57429596d",type:"edge",targetId:"359173d8-0068-45f8-bb71-8240ad73201d"},{id:"1ccd67b7-6ca2-410e-86cc-43ceaa832772",sourceId:"359173d8-0068-45f8-bb71-8240ad73201d",type:"edge",targetId:"8d5b53f6-7186-4c7b-a36a-c6bd75e77d47"}]},Ae={title:"Decision Graph",component:m,argTypes:{},args:{}},N={render:e=>{const[t,s]=i.useState(x);return o.jsx("div",{style:{height:"100%"},children:o.jsx(m,{...e,value:t,onChange:n=>s?.(n)})})}},_={render:e=>o.jsx("div",{style:{height:"100%"},children:o.jsx(m,{...e,defaultValue:x,onChange:t=>{e?.onChange?.(t)}})})},D={render:e=>{const[t,s]=i.useState(x);return o.jsx("div",{style:{height:"100%"},children:o.jsx(m,{...e,value:t,onChange:n=>{s?.(n)},disabled:!0})})}},b=[{type:"decisionNode",displayName:"Decision",shortDescription:"Execute decisions",icon:o.jsx(pe,{}),generateNode:()=>({name:"myDecision"}),renderNode:({specification:e,id:t,selected:s,data:n})=>o.jsx(W,{id:t,specification:e,name:n.name,isSelected:s,children:o.jsx(ce,{placeholder:"Select decision from list"})})}],G={render:e=>{const t=i.useRef(null),[s,n]=i.useState();return o.jsx("div",{style:{height:"100%"},children:o.jsx(m,{...e,ref:t,value:s,onChange:d=>n(d),components:b})})}},S=[y({kind:"pingNode",displayName:"Ping",group:"ping",shortDescription:"Used for ping"}),y({kind:"pongNode",displayName:"Pong",group:"ping",shortDescription:"Used for pong"}),y({kind:"rightHandleNode",group:"integrations",displayName:"Right Handle",icon:o.jsx(oe,{}),handleLeft:!1}),y({kind:"leftHandleNode",group:"integrations",displayName:"Left Handle",icon:o.jsx(ae,{}),handleRight:!1}),y({kind:"inputsNode",group:"inputs",displayName:"Inputs Form",shortDescription:"With inputs map form",icon:o.jsx(he,{}),inputs:[{control:"text",name:"hello.nested.something",label:"First"},{control:"text",name:"second",label:"Second"},{control:"bool",name:"checkbox",label:"Checkbox"}]})],I={render:e=>{const t=i.useRef(null),[s,n]=i.useState(ve);return o.jsx("div",{style:{height:"100%"},children:o.jsx(m,{customNodes:S,...e,ref:t,value:s,onChange:d=>n(d),components:b})})}},j={render:e=>{const t=i.useRef(null),[s,n]=i.useState(Ve);return o.jsx("div",{style:{height:"100%"},children:o.jsx(m,{customNodes:S,...e,ref:t,value:s,onChange:d=>n(d),components:b})})}},xe=[y({kind:"pingNode",displayName:"Ping",group:"ping",shortDescription:"Used for ping"})],k={render:e=>{const t=i.useRef(null),[s,n]=i.useState(Se);return o.jsx("div",{style:{height:"100%"},children:o.jsx(m,{customNodes:xe,...e,ref:t,value:s,onChange:d=>n(d),components:b})})}},H={render:()=>o.jsx(_e,{})},L={render:e=>{const[t,s]=i.useState(T),n=i.useRef(null),d=e?.enableDiff,c=i.useMemo(()=>d?ge(t,T,{customNodes:S,components:b}):t,[t,d,S,b]);return o.jsx("div",{style:{height:"100%"},children:o.jsx(m,{ref:n,value:c,disabled:d,onChange:a=>{e?.enableDiff||s(a)},customNodes:S,components:b})})},argTypes:{enableDiff:{control:{type:"boolean"}}}},Ce=e=>{try{return JSON.parse(e??"")}catch{return e}},Ne=(e,t)=>v(t).with({data:{type:g.optional(g.string),source:g.optional(g.string),nodeId:g.optional(g.string),trace:g.optional(g._)}},({data:s})=>{const n={title:s.type,message:Ce(s.source),data:{nodeId:s.nodeId}};return{error:n,result:{trace:s.trace,result:{error:n},performance:"",snapshot:e}}}).otherwise(()=>{}),_e=()=>{const[e,t]=i.useState(x),[s,n]=i.useState(),d=i.useMemo(()=>[{id:"simulator",title:"Simulator",icon:o.jsx(se,{}),hideHeader:!0,renderPanel:()=>o.jsx(te,{defaultRequest:ne.stringify({customer:{country:"US"},cart:{weight:50}},null,2),onRun:async({graph:c,context:a})=>{try{const u=await(await fetch("https://editor.gorules.io/api/simulate",{method:"POST",body:JSON.stringify({content:c,context:a}),headers:{"content-type":"application/json"}})).json();n({result:{...u,snapshot:c}})}catch(r){n(Ne(c,r))}},onClear:()=>{}})}],[]);return o.jsx("div",{style:{height:"100%"},children:o.jsx(m,{value:e,simulate:s,defaultActivePanel:"simulator",panels:d,onChange:c=>{t?.(c)}})})},R={args:{viewConfig:{enabled:!0,description:"Configure business rules for your decision model",permissions:{"359173d8-0068-45f8-bb71-8240ad73201d":"edit:values","a750cebf-ca75-4acd-a272-7040626abd73":"edit:values"}},viewConfigCta:"Configure"},render:e=>{const[t,s]=i.useState(x);return o.jsx("div",{style:{height:"100%"},children:o.jsx(m,{...e,value:t,onChange:n=>s?.(n)})})}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<any>(defaultGraph);
    return <div style={{
      height: '100%'
    }}>
        <DecisionGraph {...args} value={value} onChange={val => setValue?.(val)} />
      </div>;
  }
}`,...N.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: args => {
    return <div style={{
      height: '100%'
    }}>
        <DecisionGraph {...args} defaultValue={defaultGraph} onChange={val => {
        args?.onChange?.(val);
      }} />
      </div>;
  }
}`,..._.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<any>(defaultGraph);
    return <div style={{
      height: '100%'
    }}>
        <DecisionGraph {...args} value={value} onChange={val => {
        setValue?.(val);
      }} disabled />
      </div>;
  }
}`,...D.parameters?.docs?.source}}};G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: args => {
    const ref = useRef<GraphRef>(null);
    const [value, setValue] = useState<any>();
    return <div style={{
      height: '100%'
    }}>
        <DecisionGraph {...args} ref={ref} value={value} onChange={val => setValue(val)} components={components} />
      </div>;
  }
}`,...G.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: args => {
    const ref = useRef<GraphRef>(null);
    const [value, setValue] = useState<any>(defaultGraphCustomNode);
    return <div style={{
      height: '100%'
    }}>
        <DecisionGraph customNodes={customNodes} {...args} ref={ref} value={value} onChange={val => setValue(val)} components={components} />
      </div>;
  }
}`,...I.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: args => {
    const ref = useRef<GraphRef>(null);
    const [value, setValue] = useState<any>(defaultGraphInputsFormCustomNode);
    return <div style={{
      height: '100%'
    }}>
        <DecisionGraph customNodes={customNodes} {...args} ref={ref} value={value} onChange={val => setValue(val)} components={components} />
      </div>;
  }
}`,...j.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: args => {
    const ref = useRef<GraphRef>(null);
    const [value, setValue] = useState<any>(defaultGraphUnknownNode);
    return <div style={{
      height: '100%'
    }}>
        <DecisionGraph customNodes={unknownCustomNodes} {...args} ref={ref} value={value} onChange={val => setValue(val)} components={components} />
      </div>;
  }
}`,...k.parameters?.docs?.source}}};H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: () => <DecisionGraphWithSimulator />
}`,...H.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<any>(diffGraph);
    const ref = useRef<DecisionGraphRef>(null);
    const enableDiff = (args as any)?.enableDiff;
    const innerValue = useMemo(() => {
      if (enableDiff) return calculateDiffGraph(value, diffGraph, {
        customNodes,
        components
      });
      return value;
    }, [value, enableDiff, customNodes, components]);
    return <div style={{
      height: '100%'
    }}>
        <DecisionGraph ref={ref} value={innerValue} disabled={enableDiff} onChange={val => {
        if (!(args as any)?.enableDiff) {
          setValue(val);
        }
      }} customNodes={customNodes} components={components} />
      </div>;
  },
  argTypes: {
    enableDiff: {
      control: {
        type: 'boolean'
      }
    }
  } as any
}`,...L.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    viewConfig: {
      enabled: true,
      description: 'Configure business rules for your decision model',
      permissions: {
        '359173d8-0068-45f8-bb71-8240ad73201d': 'edit:values',
        'a750cebf-ca75-4acd-a272-7040626abd73': 'edit:values'
      }
    },
    viewConfigCta: 'Configure'
  },
  render: args => {
    const [value, setValue] = useState<any>(defaultGraph);
    return <div style={{
      height: '100%'
    }}>
        <DecisionGraph {...args} value={value} onChange={val => setValue?.(val)} />
      </div>;
  }
}`,...R.parameters?.docs?.source}}};const Ue=["Controlled","Uncontrolled","Disabled","Extended","CustomNode","InputFormCustomNode","UnknownCustomNode","Simulator","Diff","View"];export{N as Controlled,I as CustomNode,L as Diff,D as Disabled,G as Extended,j as InputFormCustomNode,H as Simulator,_ as Uncontrolled,k as UnknownCustomNode,R as View,Ue as __namedExportsOrder,Ae as default};
