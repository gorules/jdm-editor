import{A as M,t as Y,j as n,T as C}from"./index-cEm7Zbb8.js";import{u as ee,a as ne,G as $,D as l,P as te,b as oe,l as ae}from"./dg-simulator-D_VLD0DB.js";import{r as s}from"./index-CDs2tPxN.js";import{$ as k,C as se}from"./ce-OG--LQx1.js";import{B as de}from"./button-CiSirhIM.js";import{F as G,S as ie,R as re,L as ce}from"./dt-Br9EttzE.js";import{C as le}from"./index-CmC4SzLn.js";import{D as ue}from"./stack-D_dPokdZ.js";import{_ as q}from"./extends-CCbyfPlC.js";import"./index-7f_Nov5Q.js";import"./useDrop-BusYVyUD.js";import"./expression-BHLK8bMd.js";import"./libs-B02soUkb.js";import"./iframe-B3ouzm9L.js";import"../sb-preview/runtime.js";import"./index-PP-caPqo.js";var pe={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M908 640H804V488c0-4.4-3.6-8-8-8H548v-96h108c8.8 0 16-7.2 16-16V80c0-8.8-7.2-16-16-16H368c-8.8 0-16 7.2-16 16v288c0 8.8 7.2 16 16 16h108v96H228c-4.4 0-8 3.6-8 8v152H116c-8.8 0-16 7.2-16 16v288c0 8.8 7.2 16 16 16h288c8.8 0 16-7.2 16-16V656c0-8.8-7.2-16-16-16H292v-88h440v88H620c-8.8 0-16 7.2-16 16v288c0 8.8 7.2 16 16 16h288c8.8 0 16-7.2 16-16V656c0-8.8-7.2-16-16-16zm-564 76v168H176V716h168zm84-408V140h168v168H428zm420 576H680V716h168v168z"}}]},name:"apartment",theme:"outlined"};const fe=pe;var me=function(o,t){return s.createElement(M,q({},o,{ref:t,icon:fe}))},he=s.forwardRef(me);const ge=he;var be={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M917.7 148.8l-42.4-42.4c-1.6-1.6-3.6-2.3-5.7-2.3s-4.1.8-5.7 2.3l-76.1 76.1a199.27 199.27 0 00-112.1-34.3c-51.2 0-102.4 19.5-141.5 58.6L432.3 308.7a8.03 8.03 0 000 11.3L704 591.7c1.6 1.6 3.6 2.3 5.7 2.3 2 0 4.1-.8 5.7-2.3l101.9-101.9c68.9-69 77-175.7 24.3-253.5l76.1-76.1c3.1-3.2 3.1-8.3 0-11.4zM769.1 441.7l-59.4 59.4-186.8-186.8 59.4-59.4c24.9-24.9 58.1-38.7 93.4-38.7 35.3 0 68.4 13.7 93.4 38.7 24.9 24.9 38.7 58.1 38.7 93.4 0 35.3-13.8 68.4-38.7 93.4zm-190.2 105a8.03 8.03 0 00-11.3 0L501 613.3 410.7 523l66.7-66.7c3.1-3.1 3.1-8.2 0-11.3L441 408.6a8.03 8.03 0 00-11.3 0L363 475.3l-43-43a7.85 7.85 0 00-5.7-2.3c-2 0-4.1.8-5.7 2.3L206.8 534.2c-68.9 69-77 175.7-24.3 253.5l-76.1 76.1a8.03 8.03 0 000 11.3l42.4 42.4c1.6 1.6 3.6 2.3 5.7 2.3s4.1-.8 5.7-2.3l76.1-76.1c33.7 22.9 72.9 34.3 112.1 34.3 51.2 0 102.4-19.5 141.5-58.6l101.9-101.9c3.1-3.1 3.1-8.2 0-11.3l-43-43 66.7-66.7c3.1-3.1 3.1-8.2 0-11.3l-36.6-36.2zM441.7 769.1a131.32 131.32 0 01-93.4 38.7c-35.3 0-68.4-13.7-93.4-38.7a131.32 131.32 0 01-38.7-93.4c0-35.3 13.7-68.4 38.7-93.4l59.4-59.4 186.8 186.8-59.4 59.4z"}}]},name:"api",theme:"outlined"};const ve=be;var ye=function(o,t){return s.createElement(M,q({},o,{ref:t,icon:ve}))},xe=s.forwardRef(ye);const Ne=xe,y={nodes:[{id:"ca98730e-a40f-4601-98cc-b5a57429596d",type:"inputNode",position:{x:70,y:250},name:"Request"},{id:"c5e747fe-b74b-4b74-9fd0-bfd7d67007c3",type:"outputNode",position:{x:670,y:250},name:"Response"},{id:"359173d8-0068-45f8-bb71-8240ad73201d",type:"decisionTableNode",position:{x:370,y:250},name:"decisionTableNode 1",content:{hitPolicy:"first",inputs:[{id:"HVo_JpALi8",type:"expression",field:"cart.weight",name:"Cart Weight (Kg)"},{id:"HW6mSVfLbs",type:"expression",field:"customer.country",name:"Customer Country"}],outputs:[{field:"shippingFee",id:"3EGDrV0ssV",name:"Shipping Fee",type:"expression"}],rules:[{_id:"qMpJEvcau6",_description:"If weight is above 40kg and country is US, fee is 40",HVo_JpALi8:"> 40",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"40"},{_id:"KC6KqcWiOX",_description:"If weight is above 40kg and any other country, fee is 50",HVo_JpALi8:"> 40",HW6mSVfLbs:"","3EGDrV0ssV":"50"},{_id:"k-zEFSTe7b",_description:"if weight is between 20 and 40kg and country US, fee is 30",HVo_JpALi8:"[20..40]",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"30"},{_id:"c_8VkmGZ_C",_description:"if weight is between 20 and 40kg and any other country, fee is 32",HVo_JpALi8:"[20..40]",HW6mSVfLbs:"","3EGDrV0ssV":"32"},{_id:"e_MyQeTS3V",_description:"if weight is bellow 20kg and country US, fee is 25",HVo_JpALi8:"< 20",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"25"},{_id:"_iU8FNLxHb",_description:"if weight is bellow 20kg, fee is 30",HVo_JpALi8:"< 20",HW6mSVfLbs:"","3EGDrV0ssV":"30"}]}}],edges:[{id:"1d5f4787-4c86-4ed9-99dc-1a3159f65d89",sourceId:"ca98730e-a40f-4601-98cc-b5a57429596d",type:"edge",targetId:"359173d8-0068-45f8-bb71-8240ad73201d"},{id:"c5d49d3a-fdfd-4f4b-8838-791cee4d4a55",sourceId:"359173d8-0068-45f8-bb71-8240ad73201d",type:"edge",targetId:"c5e747fe-b74b-4b74-9fd0-bfd7d67007c3"}]},Se={nodes:[{id:"ca98730e-a40f-4601-98cc-b5a57429596d",type:"inputNode",position:{x:70,y:250},name:"Request"},{id:"c5e747fe-b74b-4b74-9fd0-bfd7d67007c3",type:"outputNode",position:{x:675,y:250},name:"Response"},{id:"a70ede61-ba67-46fb-af25-c2d22afb2f0e",type:"customNode",name:"pingNode1",position:{x:375,y:250},content:{kind:"pingNode",config:{}}}],edges:[{id:"d306fcd9-5d16-4f15-8677-c59098db5bfe",sourceId:"ca98730e-a40f-4601-98cc-b5a57429596d",type:"edge",targetId:"a70ede61-ba67-46fb-af25-c2d22afb2f0e"},{id:"a1a64d21-4248-45cd-8502-30d47ac685d0",sourceId:"a70ede61-ba67-46fb-af25-c2d22afb2f0e",type:"edge",targetId:"c5e747fe-b74b-4b74-9fd0-bfd7d67007c3"}]},Ve={nodes:[{id:"ca98730e-a40f-4601-98cc-b5a57429596d",type:"inputNode",position:{x:70,y:250},name:"Request"},{id:"c5e747fe-b74b-4b74-9fd0-bfd7d67007c3",type:"outputNode",position:{x:685,y:250},name:"Response"},{id:"dc75f8e9-ea03-4de1-b48a-1d5b52076c66",type:"customNode",name:"pingNode1",position:{x:380,y:205},content:{kind:"pingNode",config:{}}},{id:"c25d895a-826d-4e8b-9477-cd5b368fe3e6",type:"customNode",name:"Test Node",position:{x:380,y:300},content:{kind:"unknownNode",config:{}}}],edges:[{id:"f9695843-7e91-4e93-b92e-8611e40dc1b7",sourceId:"ca98730e-a40f-4601-98cc-b5a57429596d",type:"edge",targetId:"c25d895a-826d-4e8b-9477-cd5b368fe3e6"},{id:"fe2781c3-4495-4c01-9cf7-253954afc753",sourceId:"ca98730e-a40f-4601-98cc-b5a57429596d",type:"edge",targetId:"dc75f8e9-ea03-4de1-b48a-1d5b52076c66"},{id:"04bfffb2-2cca-407a-b8d6-dc0f8431253c",sourceId:"dc75f8e9-ea03-4de1-b48a-1d5b52076c66",type:"edge",targetId:"c5e747fe-b74b-4b74-9fd0-bfd7d67007c3"},{id:"3f382611-9a8d-4405-ae80-0e607bb97f42",sourceId:"c25d895a-826d-4e8b-9477-cd5b368fe3e6",type:"edge",targetId:"c5e747fe-b74b-4b74-9fd0-bfd7d67007c3"}]},u=e=>({kind:e.kind,icon:e.icon,color:e.color,displayName:e.displayName,group:e.group,shortDescription:e.shortDescription,generateNode:e.generateNode||(({index:o})=>({name:`${e.kind||e.displayName}${o}`})),onNodeAdd:e.onNodeAdd,renderNode:e.renderNode?e.renderNode:({id:o,specification:t,data:a,selected:d})=>{var V;const[N,B]=s.useState(!1),{token:S}=Y.useToken(),{updateNode:K}=ee(),v=ne(i=>{var r;return(((r=i.decisionGraph)==null?void 0:r.nodes)||[]).find(c=>c.id===o)}),Q=(V=v==null?void 0:v.content)==null?void 0:V.config;return n.jsx($,{id:o,specification:t,name:a.name,isSelected:d,noBodyPadding:!0,handleLeft:e.handleLeft,handleRight:e.handleRight,actions:e!=null&&e.inputs?[n.jsx(de,{type:"link",style:{marginLeft:"auto",transform:N?"rotate(180deg)":void 0},onClick:()=>B(i=>!i),children:n.jsx(ue,{})},"edit-table")]:void 0,children:N&&(e==null?void 0:e.inputs)&&n.jsx(G,{className:"grl-dn__cn__form",layout:"vertical",initialValues:Q,onValuesChange:(i,r)=>{K(o,c=>(c.content.config=r,c))},children:((e==null?void 0:e.inputs)||[]).map(({name:i,control:r,label:c})=>{const X=k({control:r}).with({control:"text"},()=>n.jsx(se,{type:"template"})).with({control:"bool"},()=>n.jsx(le,{children:n.jsx(C.Text,{style:{fontSize:S.fontSizeSM},children:c})})).exhaustive(),Z=k({control:r}).with({control:"bool"},()=>null).otherwise(()=>n.jsx(C.Text,{style:{fontSize:S.fontSizeSM},children:c}));return n.jsx(G.Item,{name:i,label:Z,style:{marginBottom:4},children:X},i)})})})}}),Je={title:"Decision Graph",component:l,argTypes:{},args:{}},p={render:e=>{const[o,t]=s.useState(y);return n.jsx("div",{style:{height:"100%"},children:n.jsx(l,{...e,value:o,onChange:a=>{t==null||t(a)}})})}},f={render:e=>n.jsx("div",{style:{height:"100%"},children:n.jsx(l,{...e,defaultValue:y,onChange:o=>{var t;(t=e==null?void 0:e.onChange)==null||t.call(e,o)}})})},x=[{type:"decisionNode",displayName:"Decision",shortDescription:"Execute decisions",icon:n.jsx(ge,{}),generateNode:()=>({name:"myDecision"}),renderNode:({specification:e,id:o,selected:t,data:a})=>n.jsx($,{id:o,specification:e,name:a.name,isSelected:t,children:n.jsx(ie,{placeholder:"Select decision from list"})})}],m={render:e=>{const o=s.useRef(null),[t,a]=s.useState();return n.jsx("div",{style:{height:"100%"},children:n.jsx(l,{...e,ref:o,value:t,onChange:d=>a(d),components:x})})}},Ce=[u({kind:"pingNode",displayName:"Ping",group:"ping",shortDescription:"Used for ping"}),u({kind:"pongNode",displayName:"Pong",group:"ping",shortDescription:"Used for pong"}),u({kind:"rightHandleNode",group:"integrations",displayName:"Right Handle",icon:n.jsx(re,{}),handleLeft:!1}),u({kind:"leftHandleNode",group:"integrations",displayName:"Left Handle",icon:n.jsx(ce,{}),handleRight:!1}),u({kind:"inputsNode",group:"inputs",displayName:"Inputs Form",shortDescription:"With inputs map form",icon:n.jsx(Ne,{}),inputs:[{control:"text",name:"hello.nested.something",label:"First"},{control:"text",name:"second",label:"Second"},{control:"bool",name:"checkbox",label:"Checkbox"}]})],h={render:e=>{const o=s.useRef(null),[t,a]=s.useState(Se);return n.jsx("div",{style:{height:"100%"},children:n.jsx(l,{customNodes:Ce,...e,ref:o,value:t,onChange:d=>a(d),components:x})})}},ke=[u({kind:"pingNode",displayName:"Ping",group:"ping",shortDescription:"Used for ping"})],g={render:e=>{const o=s.useRef(null),[t,a]=s.useState(Ve);return n.jsx("div",{style:{height:"100%"},children:n.jsx(l,{customNodes:ke,...e,ref:o,value:t,onChange:d=>a(d),components:x})})}},Ge=[{id:"simulator",title:"Simulator",icon:n.jsx(te,{}),renderPanel:()=>n.jsx(oe,{defaultRequest:ae.stringify({age:20},null,2),onChange:e=>{console.log(e)},onRun:e=>{console.log(e)},onClear:()=>{}})}],b={render:e=>{const[o,t]=s.useState(y);return n.jsx("div",{style:{height:"100%"},children:n.jsx(l,{...e,value:o,onPanelsChange:a=>{console.log(a)},defaultActivePanel:"simulator",panels:Ge,onChange:a=>{t==null||t(a)}})})}};var _,j,D;p.parameters={...p.parameters,docs:{...(_=p.parameters)==null?void 0:_.docs,source:{originalSource:`{
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
}`,...(D=(j=p.parameters)==null?void 0:j.docs)==null?void 0:D.source}}};var H,L,R;f.parameters={...f.parameters,docs:{...(H=f.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: args => {
    return <div style={{
      height: '100%'
    }}>
        <DecisionGraph {...args} defaultValue={defaultGraph} onChange={val => {
        args?.onChange?.(val);
      }} />
      </div>;
  }
}`,...(R=(L=f.parameters)==null?void 0:L.docs)==null?void 0:R.source}}};var w,A,I;m.parameters={...m.parameters,docs:{...(w=m.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: args => {
    const ref = useRef<GraphRef>(null);
    const [value, setValue] = useState<any>();
    return <div style={{
      height: '100%'
    }}>
        <DecisionGraph {...args} ref={ref} value={value} onChange={val => setValue(val)} components={components} />
      </div>;
  }
}`,...(I=(A=m.parameters)==null?void 0:A.docs)==null?void 0:I.source}}};var E,O,U;h.parameters={...h.parameters,docs:{...(E=h.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: args => {
    const ref = useRef<GraphRef>(null);
    const [value, setValue] = useState<any>(defaultGraphCustomNode);
    return <div style={{
      height: '100%'
    }}>
        <DecisionGraph customNodes={customNodes} {...args} ref={ref} value={value} onChange={val => setValue(val)} components={components} />
      </div>;
  }
}`,...(U=(O=h.parameters)==null?void 0:O.docs)==null?void 0:U.source}}};var z,P,T;g.parameters={...g.parameters,docs:{...(z=g.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: args => {
    const ref = useRef<GraphRef>(null);
    const [value, setValue] = useState<any>(defaultGraphUnknownNode);
    return <div style={{
      height: '100%'
    }}>
        <DecisionGraph customNodes={unknownCustomNodes} {...args} ref={ref} value={value} onChange={val => setValue(val)} components={components} />
      </div>;
  }
}`,...(T=(P=g.parameters)==null?void 0:P.docs)==null?void 0:T.source}}};var W,J,F;b.parameters={...b.parameters,docs:{...(W=b.parameters)==null?void 0:W.docs,source:{originalSource:`{
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
}`,...(F=(J=b.parameters)==null?void 0:J.docs)==null?void 0:F.source}}};const Fe=["Controlled","Uncontrolled","Extended","CustomNode","UnknownCustomNode","Simulator"];export{p as Controlled,h as CustomNode,m as Extended,b as Simulator,f as Uncontrolled,g as UnknownCustomNode,Fe as __namedExportsOrder,Je as default};
