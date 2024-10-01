import{_ as I,j as n}from"./wrapNativeSuper-ezTqcbMv.js";import{a as U,b as z,G as R,F as G,d as r,S as F,R as P,f as T,g as W,h as J,l as M}from"./dg-C2qtbKUF.js";import{r as s}from"./index-uubelm5h.js";import{z as V,C as O}from"./ce-CbaIKUk6.js";import{I as j,t as $,T as k}from"./index-B27HMoH4.js";import{B as q,R as B}from"./libs-BxoMLv2W.js";import{C as K}from"./index-MXCneoEG.js";import"./index-D3eZ-H7s.js";import"./index-BK_xiHMm.js";import"./iframe-BwrgAho7.js";import"../sb-preview/runtime.js";var Q={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M908 640H804V488c0-4.4-3.6-8-8-8H548v-96h108c8.8 0 16-7.2 16-16V80c0-8.8-7.2-16-16-16H368c-8.8 0-16 7.2-16 16v288c0 8.8 7.2 16 16 16h108v96H228c-4.4 0-8 3.6-8 8v152H116c-8.8 0-16 7.2-16 16v288c0 8.8 7.2 16 16 16h288c8.8 0 16-7.2 16-16V656c0-8.8-7.2-16-16-16H292v-88h440v88H620c-8.8 0-16 7.2-16 16v288c0 8.8 7.2 16 16 16h288c8.8 0 16-7.2 16-16V656c0-8.8-7.2-16-16-16zm-564 76v168H176V716h168zm84-408V140h168v168H428zm420 576H680V716h168v168z"}}]},name:"apartment",theme:"outlined"},X=function(t,o){return s.createElement(j,I({},t,{ref:o,icon:Q}))},Z=s.forwardRef(X),Y={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M917.7 148.8l-42.4-42.4c-1.6-1.6-3.6-2.3-5.7-2.3s-4.1.8-5.7 2.3l-76.1 76.1a199.27 199.27 0 00-112.1-34.3c-51.2 0-102.4 19.5-141.5 58.6L432.3 308.7a8.03 8.03 0 000 11.3L704 591.7c1.6 1.6 3.6 2.3 5.7 2.3 2 0 4.1-.8 5.7-2.3l101.9-101.9c68.9-69 77-175.7 24.3-253.5l76.1-76.1c3.1-3.2 3.1-8.3 0-11.4zM769.1 441.7l-59.4 59.4-186.8-186.8 59.4-59.4c24.9-24.9 58.1-38.7 93.4-38.7 35.3 0 68.4 13.7 93.4 38.7 24.9 24.9 38.7 58.1 38.7 93.4 0 35.3-13.8 68.4-38.7 93.4zm-190.2 105a8.03 8.03 0 00-11.3 0L501 613.3 410.7 523l66.7-66.7c3.1-3.1 3.1-8.2 0-11.3L441 408.6a8.03 8.03 0 00-11.3 0L363 475.3l-43-43a7.85 7.85 0 00-5.7-2.3c-2 0-4.1.8-5.7 2.3L206.8 534.2c-68.9 69-77 175.7-24.3 253.5l-76.1 76.1a8.03 8.03 0 000 11.3l42.4 42.4c1.6 1.6 3.6 2.3 5.7 2.3s4.1-.8 5.7-2.3l76.1-76.1c33.7 22.9 72.9 34.3 112.1 34.3 51.2 0 102.4-19.5 141.5-58.6l101.9-101.9c3.1-3.1 3.1-8.2 0-11.3l-43-43 66.7-66.7c3.1-3.1 3.1-8.2 0-11.3l-36.6-36.2zM441.7 769.1a131.32 131.32 0 01-93.4 38.7c-35.3 0-68.4-13.7-93.4-38.7a131.32 131.32 0 01-38.7-93.4c0-35.3 13.7-68.4 38.7-93.4l59.4-59.4 186.8 186.8-59.4 59.4z"}}]},name:"api",theme:"outlined"},ee=function(t,o){return s.createElement(j,I({},t,{ref:o,icon:Y}))},ne=s.forwardRef(ee);const l=e=>({kind:e.kind,icon:e.icon,color:e.color,displayName:e.displayName,group:e.group,shortDescription:e.shortDescription,generateNode:e.generateNode||(({index:t})=>({name:`${e.kind||e.displayName}${t}`})),onNodeAdd:e.onNodeAdd,renderNode:e.renderNode?e.renderNode:({id:t,specification:o,data:a,selected:d})=>{const[S,D]=s.useState(!1),{token:C}=$.useToken(),{updateNode:H}=U(),w=z(i=>(i.decisionGraph?.nodes||[]).find(c=>c.id===t))?.content?.config;return n.jsx(R,{id:t,specification:o,name:a.name,isSelected:d,noBodyPadding:!0,handleLeft:e.handleLeft,handleRight:e.handleRight,actions:e?.inputs?[n.jsx(q,{type:"link",style:{marginLeft:"auto",transform:S?"rotate(180deg)":void 0},onClick:()=>D(i=>!i),children:n.jsx(B,{})},"edit-table")]:void 0,children:S&&e?.inputs&&n.jsx(G,{className:"grl-dn__cn__form",layout:"vertical",initialValues:w,onValuesChange:(i,c)=>{H(t,u=>(u.content.config=c,u))},children:(e?.inputs||[]).map(({name:i,control:c,label:u})=>{const L=V({control:c}).with({control:"text"},()=>n.jsx(O,{type:"template"})).with({control:"bool"},()=>n.jsx(K,{children:n.jsx(k.Text,{style:{fontSize:C.fontSizeSM},children:u})})).exhaustive(),A=V({control:c}).with({control:"bool"},()=>null).otherwise(()=>n.jsx(k.Text,{style:{fontSize:C.fontSizeSM},children:u})),E=V({control:c}).with({control:"bool"},()=>"checked").otherwise(()=>{});return n.jsx(G.Item,{name:i,label:A,valuePropName:E,style:{marginBottom:4},children:L},i)})})})}}),N={nodes:[{id:"ca98730e-a40f-4601-98cc-b5a57429596d",type:"inputNode",position:{x:70,y:250},name:"Request"},{id:"c5e747fe-b74b-4b74-9fd0-bfd7d67007c3",type:"outputNode",position:{x:670,y:250},name:"Response"},{id:"359173d8-0068-45f8-bb71-8240ad73201d",type:"decisionTableNode",position:{x:370,y:250},name:"decisionTableNode 1",content:{hitPolicy:"first",inputs:[{id:"HVo_JpALi8",field:"cart.weight",name:"Cart Weight (Kg)"},{id:"HW6mSVfLbs",field:"customer.country",name:"Customer Country"}],outputs:[{field:"shippingFee",id:"3EGDrV0ssV",name:"Shipping Fee"}],rules:[{_id:"qMpJEvcau6",_description:"If weight is above 40kg and country is US, fee is 40",HVo_JpALi8:"> 40",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"40"},{_id:"KC6KqcWiOX",_description:"If weight is above 40kg and any other country, fee is 50",HVo_JpALi8:"> 40",HW6mSVfLbs:"","3EGDrV0ssV":"50"},{_id:"k-zEFSTe7b",_description:"if weight is between 20 and 40kg and country US, fee is 30",HVo_JpALi8:"[20..40]",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"30"},{_id:"c_8VkmGZ_C",_description:"if weight is between 20 and 40kg and any other country, fee is 32",HVo_JpALi8:"[20..40]",HW6mSVfLbs:"","3EGDrV0ssV":"32"},{_id:"e_MyQeTS3V",_description:"if weight is bellow 20kg and country US, fee is 25",HVo_JpALi8:"< 20",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"25"},{_id:"_iU8FNLxHb",_description:"if weight is bellow 20kg, fee is 30",HVo_JpALi8:"< 20",HW6mSVfLbs:"","3EGDrV0ssV":"30"}]}}],edges:[{id:"1d5f4787-4c86-4ed9-99dc-1a3159f65d89",sourceId:"ca98730e-a40f-4601-98cc-b5a57429596d",type:"edge",targetId:"359173d8-0068-45f8-bb71-8240ad73201d"},{id:"c5d49d3a-fdfd-4f4b-8838-791cee4d4a55",sourceId:"359173d8-0068-45f8-bb71-8240ad73201d",type:"edge",targetId:"c5e747fe-b74b-4b74-9fd0-bfd7d67007c3"}]},te={nodes:[{id:"ca98730e-a40f-4601-98cc-b5a57429596d",type:"inputNode",position:{x:70,y:250},name:"Request"},{id:"c5e747fe-b74b-4b74-9fd0-bfd7d67007c3",type:"outputNode",position:{x:675,y:250},name:"Response"},{id:"a70ede61-ba67-46fb-af25-c2d22afb2f0e",type:"customNode",name:"pingNode1",position:{x:375,y:250},content:{kind:"pingNode",config:{}}}],edges:[{id:"d306fcd9-5d16-4f15-8677-c59098db5bfe",sourceId:"ca98730e-a40f-4601-98cc-b5a57429596d",type:"edge",targetId:"a70ede61-ba67-46fb-af25-c2d22afb2f0e"},{id:"a1a64d21-4248-45cd-8502-30d47ac685d0",sourceId:"a70ede61-ba67-46fb-af25-c2d22afb2f0e",type:"edge",targetId:"c5e747fe-b74b-4b74-9fd0-bfd7d67007c3"}]},oe={nodes:[{id:"ca98730e-a40f-4601-98cc-b5a57429596d",type:"inputNode",position:{x:70,y:250},name:"Request"},{id:"c5e747fe-b74b-4b74-9fd0-bfd7d67007c3",type:"outputNode",position:{x:675,y:250},name:"Response"},{id:"a70ede61-ba67-46fb-af25-c2d22afb2f0e",type:"customNode",name:"inputsNode1",position:{x:375,y:250},content:{kind:"inputsNode",config:{"hello.nested.something":"My",second:"Name",checkbox:!0}}}],edges:[{id:"d306fcd9-5d16-4f15-8677-c59098db5bfe",sourceId:"ca98730e-a40f-4601-98cc-b5a57429596d",type:"edge",targetId:"a70ede61-ba67-46fb-af25-c2d22afb2f0e"},{id:"a1a64d21-4248-45cd-8502-30d47ac685d0",sourceId:"a70ede61-ba67-46fb-af25-c2d22afb2f0e",type:"edge",targetId:"c5e747fe-b74b-4b74-9fd0-bfd7d67007c3"}]},ae={nodes:[{id:"ca98730e-a40f-4601-98cc-b5a57429596d",type:"inputNode",position:{x:70,y:250},name:"Request"},{id:"c5e747fe-b74b-4b74-9fd0-bfd7d67007c3",type:"outputNode",position:{x:685,y:250},name:"Response"},{id:"dc75f8e9-ea03-4de1-b48a-1d5b52076c66",type:"customNode",name:"pingNode1",position:{x:380,y:205},content:{kind:"pingNode",config:{}}},{id:"c25d895a-826d-4e8b-9477-cd5b368fe3e6",type:"customNode",name:"Test Node",position:{x:380,y:300},content:{kind:"unknownNode",config:{}}}],edges:[{id:"f9695843-7e91-4e93-b92e-8611e40dc1b7",sourceId:"ca98730e-a40f-4601-98cc-b5a57429596d",type:"edge",targetId:"c25d895a-826d-4e8b-9477-cd5b368fe3e6"},{id:"fe2781c3-4495-4c01-9cf7-253954afc753",sourceId:"ca98730e-a40f-4601-98cc-b5a57429596d",type:"edge",targetId:"dc75f8e9-ea03-4de1-b48a-1d5b52076c66"},{id:"04bfffb2-2cca-407a-b8d6-dc0f8431253c",sourceId:"dc75f8e9-ea03-4de1-b48a-1d5b52076c66",type:"edge",targetId:"c5e747fe-b74b-4b74-9fd0-bfd7d67007c3"},{id:"3f382611-9a8d-4405-ae80-0e607bb97f42",sourceId:"c25d895a-826d-4e8b-9477-cd5b368fe3e6",type:"edge",targetId:"c5e747fe-b74b-4b74-9fd0-bfd7d67007c3"}]},ye={title:"Decision Graph",component:r,argTypes:{},args:{}},p={render:e=>{const[t,o]=s.useState(N);return n.jsx("div",{style:{height:"100%"},children:n.jsx(r,{...e,value:t,onChange:a=>{o?.(a)}})})}},f={render:e=>n.jsx("div",{style:{height:"100%"},children:n.jsx(r,{...e,defaultValue:N,onChange:t=>{e?.onChange?.(t)}})})},m={render:e=>{const[t,o]=s.useState(N);return n.jsx("div",{style:{height:"100%"},children:n.jsx(r,{...e,value:t,onChange:a=>{o?.(a)},disabled:!0})})}},x=[{type:"decisionNode",displayName:"Decision",shortDescription:"Execute decisions",icon:n.jsx(Z,{}),generateNode:()=>({name:"myDecision"}),renderNode:({specification:e,id:t,selected:o,data:a})=>n.jsx(R,{id:t,specification:e,name:a.name,isSelected:o,children:n.jsx(F,{placeholder:"Select decision from list"})})}],g={render:e=>{const t=s.useRef(null),[o,a]=s.useState();return n.jsx("div",{style:{height:"100%"},children:n.jsx(r,{...e,ref:t,value:o,onChange:d=>a(d),components:x})})}},_=[l({kind:"pingNode",displayName:"Ping",group:"ping",shortDescription:"Used for ping"}),l({kind:"pongNode",displayName:"Pong",group:"ping",shortDescription:"Used for pong"}),l({kind:"rightHandleNode",group:"integrations",displayName:"Right Handle",icon:n.jsx(P,{}),handleLeft:!1}),l({kind:"leftHandleNode",group:"integrations",displayName:"Left Handle",icon:n.jsx(T,{}),handleRight:!1}),l({kind:"inputsNode",group:"inputs",displayName:"Inputs Form",shortDescription:"With inputs map form",icon:n.jsx(ne,{}),inputs:[{control:"text",name:"hello.nested.something",label:"First"},{control:"text",name:"second",label:"Second"},{control:"bool",name:"checkbox",label:"Checkbox"}]})],h={render:e=>{const t=s.useRef(null),[o,a]=s.useState(te);return n.jsx("div",{style:{height:"100%"},children:n.jsx(r,{customNodes:_,...e,ref:t,value:o,onChange:d=>a(d),components:x})})}},b={render:e=>{const t=s.useRef(null),[o,a]=s.useState(oe);return n.jsx("div",{style:{height:"100%"},children:n.jsx(r,{customNodes:_,...e,ref:t,value:o,onChange:d=>a(d),components:x})})}},se=[l({kind:"pingNode",displayName:"Ping",group:"ping",shortDescription:"Used for ping"})],v={render:e=>{const t=s.useRef(null),[o,a]=s.useState(ae);return n.jsx("div",{style:{height:"100%"},children:n.jsx(r,{customNodes:se,...e,ref:t,value:o,onChange:d=>a(d),components:x})})}},de=[{id:"simulator",title:"Simulator",icon:n.jsx(W,{}),renderPanel:()=>n.jsx(J,{defaultRequest:M.stringify({age:20},null,2),onChange:e=>{console.log(e)},onRun:e=>{console.log(e)},onClear:()=>{}})}],y={render:e=>{const[t,o]=s.useState(N);return n.jsx("div",{style:{height:"100%"},children:n.jsx(r,{...e,value:t,onPanelsChange:a=>{console.log(a)},defaultActivePanel:"simulator",panels:de,onChange:a=>{o?.(a)}})})}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<any>(defaultGraph);
    return <div style={{
      height: '100%'
    }}>
        <DecisionGraph {...args} value={value} onChange={val => {
        setValue?.(val);
      }} />
      </div>;
  }
}`,...p.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: args => {
    return <div style={{
      height: '100%'
    }}>
        <DecisionGraph {...args} defaultValue={defaultGraph} onChange={val => {
        args?.onChange?.(val);
      }} />
      </div>;
  }
}`,...f.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: args => {
    const ref = useRef<GraphRef>(null);
    const [value, setValue] = useState<any>();
    return <div style={{
      height: '100%'
    }}>
        <DecisionGraph {...args} ref={ref} value={value} onChange={val => setValue(val)} components={components} />
      </div>;
  }
}`,...g.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: args => {
    const ref = useRef<GraphRef>(null);
    const [value, setValue] = useState<any>(defaultGraphCustomNode);
    return <div style={{
      height: '100%'
    }}>
        <DecisionGraph customNodes={customNodes} {...args} ref={ref} value={value} onChange={val => setValue(val)} components={components} />
      </div>;
  }
}`,...h.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: args => {
    const ref = useRef<GraphRef>(null);
    const [value, setValue] = useState<any>(defaultGraphInputsFormCustomNode);
    return <div style={{
      height: '100%'
    }}>
        <DecisionGraph customNodes={customNodes} {...args} ref={ref} value={value} onChange={val => setValue(val)} components={components} />
      </div>;
  }
}`,...b.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: args => {
    const ref = useRef<GraphRef>(null);
    const [value, setValue] = useState<any>(defaultGraphUnknownNode);
    return <div style={{
      height: '100%'
    }}>
        <DecisionGraph customNodes={unknownCustomNodes} {...args} ref={ref} value={value} onChange={val => setValue(val)} components={components} />
      </div>;
  }
}`,...v.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<any>(defaultGraph);
    return <div style={{
      height: '100%'
    }}>
        <DecisionGraph {...args} value={value} onPanelsChange={val => {
        console.log(val);
      }} defaultActivePanel={'simulator'} panels={panels} onChange={val => {
        setValue?.(val);
      }} />
      </div>;
  }
}`,...y.parameters?.docs?.source}}};const Ne=["Controlled","Uncontrolled","Disabled","Extended","CustomNode","InputFormCustomNode","UnknownCustomNode","Simulator"];export{p as Controlled,h as CustomNode,m as Disabled,g as Extended,b as InputFormCustomNode,y as Simulator,f as Uncontrolled,v as UnknownCustomNode,Ne as __namedExportsOrder,ye as default};
