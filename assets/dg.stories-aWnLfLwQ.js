import{_ as R,j as t}from"./wrapNativeSuper-ezTqcbMv.js";import{u as T,a as z,G as j,D as i,c as F,R as M,b as O,l as P}from"./dg-D_z4U5us.js";import{r as s}from"./index-uubelm5h.js";import{I as E,t as q,z as C,T as I,N as c}from"./wasm-BzMe9OGP.js";import{C as $}from"./ce-BoqshRsp.js";import{B}from"./button-zjAeNXid.js";import{R as K,F as w,S as Q,a as X}from"./dt-BPpaSnrI.js";import{C as Z}from"./index-B8PwPEYv.js";import{R as Y}from"./index.module-Cvh_1lhR.js";import"./confirm-action-CpLZVOF0.js";import"./index-BK_xiHMm.js";import"./expression-BIc7f0A8.js";import"./function-OU79uNYI.js";import"./iframe-CgFIVr5W.js";import"../sb-preview/runtime.js";import"./index-TW2i6qtr.js";import"./_commonjs-dynamic-modules-TDtrdbi3.js";var ee={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M908 640H804V488c0-4.4-3.6-8-8-8H548v-96h108c8.8 0 16-7.2 16-16V80c0-8.8-7.2-16-16-16H368c-8.8 0-16 7.2-16 16v288c0 8.8 7.2 16 16 16h108v96H228c-4.4 0-8 3.6-8 8v152H116c-8.8 0-16 7.2-16 16v288c0 8.8 7.2 16 16 16h288c8.8 0 16-7.2 16-16V656c0-8.8-7.2-16-16-16H292v-88h440v88H620c-8.8 0-16 7.2-16 16v288c0 8.8 7.2 16 16 16h288c8.8 0 16-7.2 16-16V656c0-8.8-7.2-16-16-16zm-564 76v168H176V716h168zm84-408V140h168v168H428zm420 576H680V716h168v168z"}}]},name:"apartment",theme:"outlined"},ne=function(n,o){return s.createElement(E,R({},n,{ref:o,icon:ee}))},te=s.forwardRef(ne),oe={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M917.7 148.8l-42.4-42.4c-1.6-1.6-3.6-2.3-5.7-2.3s-4.1.8-5.7 2.3l-76.1 76.1a199.27 199.27 0 00-112.1-34.3c-51.2 0-102.4 19.5-141.5 58.6L432.3 308.7a8.03 8.03 0 000 11.3L704 591.7c1.6 1.6 3.6 2.3 5.7 2.3 2 0 4.1-.8 5.7-2.3l101.9-101.9c68.9-69 77-175.7 24.3-253.5l76.1-76.1c3.1-3.2 3.1-8.3 0-11.4zM769.1 441.7l-59.4 59.4-186.8-186.8 59.4-59.4c24.9-24.9 58.1-38.7 93.4-38.7 35.3 0 68.4 13.7 93.4 38.7 24.9 24.9 38.7 58.1 38.7 93.4 0 35.3-13.8 68.4-38.7 93.4zm-190.2 105a8.03 8.03 0 00-11.3 0L501 613.3 410.7 523l66.7-66.7c3.1-3.1 3.1-8.2 0-11.3L441 408.6a8.03 8.03 0 00-11.3 0L363 475.3l-43-43a7.85 7.85 0 00-5.7-2.3c-2 0-4.1.8-5.7 2.3L206.8 534.2c-68.9 69-77 175.7-24.3 253.5l-76.1 76.1a8.03 8.03 0 000 11.3l42.4 42.4c1.6 1.6 3.6 2.3 5.7 2.3s4.1-.8 5.7-2.3l76.1-76.1c33.7 22.9 72.9 34.3 112.1 34.3 51.2 0 102.4-19.5 141.5-58.6l101.9-101.9c3.1-3.1 3.1-8.2 0-11.3l-43-43 66.7-66.7c3.1-3.1 3.1-8.2 0-11.3l-36.6-36.2zM441.7 769.1a131.32 131.32 0 01-93.4 38.7c-35.3 0-68.4-13.7-93.4-38.7a131.32 131.32 0 01-38.7-93.4c0-35.3 13.7-68.4 38.7-93.4l59.4-59.4 186.8 186.8-59.4 59.4z"}}]},name:"api",theme:"outlined"},ae=function(n,o){return s.createElement(E,R({},n,{ref:o,icon:oe}))},se=s.forwardRef(ae);const f=e=>({kind:e.kind,icon:e.icon,color:e.color,displayName:e.displayName,group:e.group,shortDescription:e.shortDescription,generateNode:e.generateNode||(({index:n})=>({name:`${e.kind||e.displayName}${n}`})),onNodeAdd:e.onNodeAdd,renderNode:e.renderNode?e.renderNode:({id:n,specification:o,data:a,selected:r})=>{const[d,m]=s.useState(!1),{token:h}=q.useToken(),{updateNode:H}=T(),A=z(u=>(u.decisionGraph?.nodes||[]).find(l=>l.id===n))?.content?.config;return t.jsx(j,{id:n,specification:o,name:a.name,isSelected:r,noBodyPadding:!0,handleLeft:e.handleLeft,handleRight:e.handleRight,actions:e?.inputs?[t.jsx(B,{type:"text",style:{marginLeft:"auto",transform:d?"rotate(180deg)":void 0},onClick:()=>m(u=>!u),children:t.jsx(K,{})},"edit-table")]:void 0,children:d&&e?.inputs&&t.jsx(w,{className:"grl-dn__cn__form",layout:"vertical",initialValues:A,onValuesChange:(u,l)=>{H(n,g=>(g.content.config=l,g))},children:(e?.inputs||[]).map(({name:u,control:l,label:g})=>{const U=C({control:l}).with({control:"text"},()=>t.jsx($,{type:"template"})).with({control:"bool"},()=>t.jsx(Z,{children:t.jsx(I.Text,{style:{fontSize:h.fontSizeSM},children:g})})).exhaustive(),W=C({control:l}).with({control:"bool"},()=>null).otherwise(()=>t.jsx(I.Text,{style:{fontSize:h.fontSizeSM},children:g})),J=C({control:l}).with({control:"bool"},()=>"checked").otherwise(()=>{});return t.jsx(w.Item,{name:u,label:W,valuePropName:J,style:{marginBottom:4},children:U},u)})})})}}),k={nodes:[{id:"ca98730e-a40f-4601-98cc-b5a57429596d",type:"inputNode",position:{x:70,y:250},name:"Request"},{id:"c5e747fe-b74b-4b74-9fd0-bfd7d67007c3",type:"outputNode",position:{x:670,y:250},name:"Response"},{id:"359173d8-0068-45f8-bb71-8240ad73201d",type:"decisionTableNode",position:{x:370,y:250},name:"decisionTableNode 1",content:{hitPolicy:"first",inputs:[{id:"HVo_JpALi8",field:"cart.weight",name:"Cart Weight (Kg)"},{id:"HW6mSVfLbs",field:"customer.country",name:"Customer Country"}],outputs:[{field:"shippingFee",id:"3EGDrV0ssV",name:"Shipping Fee"}],rules:[{_id:"qMpJEvcau6",_description:"If weight is above 40kg and country is US, fee is 40",HVo_JpALi8:"> 40",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"40"},{_id:"KC6KqcWiOX",_description:"If weight is above 40kg and any other country, fee is 50",HVo_JpALi8:"> 40",HW6mSVfLbs:"","3EGDrV0ssV":"50"},{_id:"k-zEFSTe7b",_description:"if weight is between 20 and 40kg and country US, fee is 30",HVo_JpALi8:"[20..40]",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"30"},{_id:"c_8VkmGZ_C",_description:"if weight is between 20 and 40kg and any other country, fee is 32",HVo_JpALi8:"[20..40]",HW6mSVfLbs:"","3EGDrV0ssV":"32"},{_id:"e_MyQeTS3V",_description:"if weight is bellow 20kg and country US, fee is 25",HVo_JpALi8:"< 20",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"25"},{_id:"_iU8FNLxHb",_description:"if weight is bellow 20kg, fee is 30",HVo_JpALi8:"< 20",HW6mSVfLbs:"","3EGDrV0ssV":"30"}]}},{type:"expressionNode",content:{expressions:[{id:"2e32e45f-e8a2-4f07-8bd8-ba3cdaf6010b",key:"10",value:"false"},{id:"2e32e45f-e8a2-4f07-8bd8-ba3cdaf6010a",key:"1",value:"true"},{id:"a400f63d-5344-4c06-883f-9c6728afa207",key:"4",value:"true"},{id:"8513b4f9-f821-40af-bf63-d4ff70b26499",key:"2",value:"false"},{id:"27146595-f319-4474-95aa-914e7e434997",key:"3",value:"true"},{id:"6e78d69d-1068-4216-bb72-5bce60a0e822",key:"5",value:"'1 + 1'"}],passThrough:!0,inputField:null,outputPath:null,executionMode:"single"},id:"a750cebf-ca75-4acd-a272-7040626abd73",name:"expression1",position:{x:355,y:75}}],edges:[{id:"1d5f4787-4c86-4ed9-99dc-1a3159f65d89",sourceId:"ca98730e-a40f-4601-98cc-b5a57429596d",type:"edge",targetId:"359173d8-0068-45f8-bb71-8240ad73201d"},{id:"c5d49d3a-fdfd-4f4b-8838-791cee4d4a55",sourceId:"359173d8-0068-45f8-bb71-8240ad73201d",type:"edge",targetId:"c5e747fe-b74b-4b74-9fd0-bfd7d67007c3"}]},re={nodes:[{id:"ca98730e-a40f-4601-98cc-b5a57429596d",type:"inputNode",position:{x:70,y:250},name:"Request"},{id:"c5e747fe-b74b-4b74-9fd0-bfd7d67007c3",type:"outputNode",position:{x:675,y:250},name:"Response"},{id:"a70ede61-ba67-46fb-af25-c2d22afb2f0e",type:"customNode",name:"pingNode1",position:{x:375,y:250},content:{kind:"pingNode",config:{}}}],edges:[{id:"d306fcd9-5d16-4f15-8677-c59098db5bfe",sourceId:"ca98730e-a40f-4601-98cc-b5a57429596d",type:"edge",targetId:"a70ede61-ba67-46fb-af25-c2d22afb2f0e"},{id:"a1a64d21-4248-45cd-8502-30d47ac685d0",sourceId:"a70ede61-ba67-46fb-af25-c2d22afb2f0e",type:"edge",targetId:"c5e747fe-b74b-4b74-9fd0-bfd7d67007c3"}]},de={nodes:[{id:"ca98730e-a40f-4601-98cc-b5a57429596d",type:"inputNode",position:{x:70,y:250},name:"Request"},{id:"c5e747fe-b74b-4b74-9fd0-bfd7d67007c3",type:"outputNode",position:{x:675,y:250},name:"Response"},{id:"a70ede61-ba67-46fb-af25-c2d22afb2f0e",type:"customNode",name:"inputsNode1",position:{x:375,y:250},content:{kind:"inputsNode",config:{"hello.nested.something":"My",second:"Name",checkbox:!0}}}],edges:[{id:"d306fcd9-5d16-4f15-8677-c59098db5bfe",sourceId:"ca98730e-a40f-4601-98cc-b5a57429596d",type:"edge",targetId:"a70ede61-ba67-46fb-af25-c2d22afb2f0e"},{id:"a1a64d21-4248-45cd-8502-30d47ac685d0",sourceId:"a70ede61-ba67-46fb-af25-c2d22afb2f0e",type:"edge",targetId:"c5e747fe-b74b-4b74-9fd0-bfd7d67007c3"}]},ie={nodes:[{id:"ca98730e-a40f-4601-98cc-b5a57429596d",type:"inputNode",position:{x:70,y:250},name:"Request"},{id:"c5e747fe-b74b-4b74-9fd0-bfd7d67007c3",type:"outputNode",position:{x:685,y:250},name:"Response"},{id:"dc75f8e9-ea03-4de1-b48a-1d5b52076c66",type:"customNode",name:"pingNode1",position:{x:380,y:205},content:{kind:"pingNode",config:{}}},{id:"c25d895a-826d-4e8b-9477-cd5b368fe3e6",type:"customNode",name:"Test Node",position:{x:380,y:300},content:{kind:"unknownNode",config:{}}}],edges:[{id:"f9695843-7e91-4e93-b92e-8611e40dc1b7",sourceId:"ca98730e-a40f-4601-98cc-b5a57429596d",type:"edge",targetId:"c25d895a-826d-4e8b-9477-cd5b368fe3e6"},{id:"fe2781c3-4495-4c01-9cf7-253954afc753",sourceId:"ca98730e-a40f-4601-98cc-b5a57429596d",type:"edge",targetId:"dc75f8e9-ea03-4de1-b48a-1d5b52076c66"},{id:"04bfffb2-2cca-407a-b8d6-dc0f8431253c",sourceId:"dc75f8e9-ea03-4de1-b48a-1d5b52076c66",type:"edge",targetId:"c5e747fe-b74b-4b74-9fd0-bfd7d67007c3"},{id:"3f382611-9a8d-4405-ae80-0e607bb97f42",sourceId:"c25d895a-826d-4e8b-9477-cd5b368fe3e6",type:"edge",targetId:"c5e747fe-b74b-4b74-9fd0-bfd7d67007c3"}]},L={nodes:[{id:"ca98730e-a40f-4601-98cc-b5a57429596d",type:"inputNode",position:{x:100,y:250},name:"Request"},{id:"359173d8-0068-45f8-bb71-8240ad73201d",type:"decisionTableNode",position:{x:370,y:250},name:"decisionTableNode 1",content:{hitPolicy:"first",inputs:[{id:"HVo_JpALi8",field:"cart.weight",name:"Cart Weight (Kg)"},{id:"HW6mSVfLbs",field:"customer.country",name:"Customer Country"}],outputs:[{field:"shippingFee",id:"3EGDrV0ssV",name:"Shipping Fee"}],rules:[{_id:"qMpJEvcau6",_description:"If weight is above 40kg and country is US, fee is 40",HVo_JpALi8:"> 40",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"40"},{_id:"KC6KqcWiOX",_description:"If weight is above 40kg and any other country, fee is 50",HVo_JpALi8:"> 40",HW6mSVfLbs:"","3EGDrV0ssV":"50"},{_id:"k-zEFSTe7b",_description:"if weight is between 20 and 40kg and country US, fee is 30",HVo_JpALi8:"[20..40]",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"30"},{_id:"c_8VkmGZ_C",_description:"if weight is between 20 and 40kg and any other country, fee is 32",HVo_JpALi8:"[20..40]",HW6mSVfLbs:"","3EGDrV0ssV":"32"},{_id:"e_MyQeTS3V",_description:"if weight is bellow 20kg and country US, fee is 25",HVo_JpALi8:"< 20",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"25"},{_id:"_iU8FNLxHb",_description:"if weight is bellow 20kg, fee is 30",HVo_JpALi8:"< 20",HW6mSVfLbs:"","3EGDrV0ssV":"30"}],passThrough:!0}},{type:"functionNode",content:{source:`import zen from 'zen';

/** @type {Handler} **/
export const handler = async (input) => {
  return input;
};
`},id:"8d5b53f6-7186-4c7b-a36a-c6bd75e77d47",name:"function1",position:{x:640,y:250}}],edges:[{id:"1d5f4787-4c86-4ed9-99dc-1a3159f65d89",sourceId:"ca98730e-a40f-4601-98cc-b5a57429596d",type:"edge",targetId:"359173d8-0068-45f8-bb71-8240ad73201d"},{id:"1ccd67b7-6ca2-410e-86cc-43ceaa832772",sourceId:"359173d8-0068-45f8-bb71-8240ad73201d",type:"edge",targetId:"8d5b53f6-7186-4c7b-a36a-c6bd75e77d47"}]},we={title:"Decision Graph",component:i,argTypes:{},args:{}},y={render:e=>{const[n,o]=s.useState(k);return t.jsx("div",{style:{height:"100%"},children:t.jsx(i,{...e,value:n,onChange:a=>{console.log(a),o?.(a)}})})}},v={render:e=>t.jsx("div",{style:{height:"100%"},children:t.jsx(i,{...e,defaultValue:k,onChange:n=>{e?.onChange?.(n)}})})},V={render:e=>{const[n,o]=s.useState(k);return t.jsx("div",{style:{height:"100%"},children:t.jsx(i,{...e,value:n,onChange:a=>{o?.(a)},disabled:!0})})}},p=[{type:"decisionNode",displayName:"Decision",shortDescription:"Execute decisions",icon:t.jsx(te,{}),generateNode:()=>({name:"myDecision"}),renderNode:({specification:e,id:n,selected:o,data:a})=>t.jsx(j,{id:n,specification:e,name:a.name,isSelected:o,children:t.jsx(Q,{placeholder:"Select decision from list"})})}],N={render:e=>{const n=s.useRef(null),[o,a]=s.useState();return t.jsx("div",{style:{height:"100%"},children:t.jsx(i,{...e,ref:n,value:o,onChange:r=>a(r),components:p})})}},b=[f({kind:"pingNode",displayName:"Ping",group:"ping",shortDescription:"Used for ping"}),f({kind:"pongNode",displayName:"Pong",group:"ping",shortDescription:"Used for pong"}),f({kind:"rightHandleNode",group:"integrations",displayName:"Right Handle",icon:t.jsx(Y,{}),handleLeft:!1}),f({kind:"leftHandleNode",group:"integrations",displayName:"Left Handle",icon:t.jsx(X,{}),handleRight:!1}),f({kind:"inputsNode",group:"inputs",displayName:"Inputs Form",shortDescription:"With inputs map form",icon:t.jsx(se,{}),inputs:[{control:"text",name:"hello.nested.something",label:"First"},{control:"text",name:"second",label:"Second"},{control:"bool",name:"checkbox",label:"Checkbox"}]})],S={render:e=>{const n=s.useRef(null),[o,a]=s.useState(re);return t.jsx("div",{style:{height:"100%"},children:t.jsx(i,{customNodes:b,...e,ref:n,value:o,onChange:r=>a(r),components:p})})}},x={render:e=>{const n=s.useRef(null),[o,a]=s.useState(de);return t.jsx("div",{style:{height:"100%"},children:t.jsx(i,{customNodes:b,...e,ref:n,value:o,onChange:r=>a(r),components:p})})}},ce=[f({kind:"pingNode",displayName:"Ping",group:"ping",shortDescription:"Used for ping"})],D={render:e=>{const n=s.useRef(null),[o,a]=s.useState(ie);return t.jsx("div",{style:{height:"100%"},children:t.jsx(i,{customNodes:ce,...e,ref:n,value:o,onChange:r=>a(r),components:p})})}},_={render:()=>t.jsx(pe,{})},G={render:e=>{const[n,o]=s.useState(L),a=s.useRef(null),r=e?.enableDiff,d=s.useMemo(()=>r?F(n,L,{customNodes:b,components:p}):n,[n,r,b,p]);return t.jsx("div",{style:{height:"100%"},children:t.jsx(i,{ref:a,value:d,disabled:r,onChange:m=>{e?.enableDiff||o(m)},customNodes:b,components:p})})},argTypes:{enableDiff:{control:{type:"boolean"}}}},ue=e=>{try{return JSON.parse(e??"")}catch{return e}},le=e=>C(e).with({data:{type:c.optional(c.string),source:c.optional(c.string),nodeId:c.optional(c.string),trace:c.optional(c._)}},({data:n})=>{const o={title:n.type,message:ue(n.source),data:{nodeId:n.nodeId}};return{error:o,result:{trace:n.trace,result:{error:o},performance:""}}}).otherwise(()=>{}),pe=()=>{const[e,n]=s.useState(k),[o,a]=s.useState(),r=s.useMemo(()=>[{id:"simulator",title:"Simulator",icon:t.jsx(M,{}),hideHeader:!0,renderPanel:()=>t.jsx(O,{defaultRequest:P.stringify({customer:{country:"US"},cart:{weight:50}},null,2),onRun:async({graph:d,context:m})=>{try{const H=await(await fetch("https://editor.gorules.io/api/simulate",{method:"POST",body:JSON.stringify({content:d,context:m}),headers:{"content-type":"application/json"}})).json();a({result:H})}catch(h){a(le(h))}},onClear:()=>{}})}],[]);return t.jsx("div",{style:{height:"100%"},children:t.jsx(i,{value:e,onPanelsChange:d=>{console.log(d)},simulate:o,defaultActivePanel:"simulator",panels:r,onChange:d=>{n?.(d)}})})};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<any>(defaultGraph);
    return <div style={{
      height: '100%'
    }}>
        <DecisionGraph {...args} value={value} onChange={val => {
        console.log(val);
        setValue?.(val);
      }} />
      </div>;
  }
}`,...y.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: args => {
    return <div style={{
      height: '100%'
    }}>
        <DecisionGraph {...args} defaultValue={defaultGraph} onChange={val => {
        args?.onChange?.(val);
      }} />
      </div>;
  }
}`,...v.parameters?.docs?.source}}};V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
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
}`,...V.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: args => {
    const ref = useRef<GraphRef>(null);
    const [value, setValue] = useState<any>();
    return <div style={{
      height: '100%'
    }}>
        <DecisionGraph {...args} ref={ref} value={value} onChange={val => setValue(val)} components={components} />
      </div>;
  }
}`,...N.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: args => {
    const ref = useRef<GraphRef>(null);
    const [value, setValue] = useState<any>(defaultGraphCustomNode);
    return <div style={{
      height: '100%'
    }}>
        <DecisionGraph customNodes={customNodes} {...args} ref={ref} value={value} onChange={val => setValue(val)} components={components} />
      </div>;
  }
}`,...S.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: args => {
    const ref = useRef<GraphRef>(null);
    const [value, setValue] = useState<any>(defaultGraphInputsFormCustomNode);
    return <div style={{
      height: '100%'
    }}>
        <DecisionGraph customNodes={customNodes} {...args} ref={ref} value={value} onChange={val => setValue(val)} components={components} />
      </div>;
  }
}`,...x.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: args => {
    const ref = useRef<GraphRef>(null);
    const [value, setValue] = useState<any>(defaultGraphUnknownNode);
    return <div style={{
      height: '100%'
    }}>
        <DecisionGraph customNodes={unknownCustomNodes} {...args} ref={ref} value={value} onChange={val => setValue(val)} components={components} />
      </div>;
  }
}`,...D.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <DecisionGraphWithSimulator />
}`,..._.parameters?.docs?.source}}};G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
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
}`,...G.parameters?.docs?.source}}};const Le=["Controlled","Uncontrolled","Disabled","Extended","CustomNode","InputFormCustomNode","UnknownCustomNode","Simulator","Diff"];export{y as Controlled,S as CustomNode,G as Diff,V as Disabled,N as Extended,x as InputFormCustomNode,_ as Simulator,v as Uncontrolled,D as UnknownCustomNode,Le as __namedExportsOrder,we as default};
