import{j as i}from"./index-C1fuRcQE.js";import{r as f}from"./index-CDs2tPxN.js";import{Function as n}from"./index-BH0_PTVQ.js";import{d as m}from"./libs-yWqHcJcJ.js";import"./extends-CCbyfPlC.js";import"./index-7f_Nov5Q.js";import"./stack--Pxx56R-.js";import"./index-CUd7pB-M.js";import"./button-DP1-t7AX.js";const g={performance:"2.820417ms",traceData:{log:[{lines:['"string"'],msSinceRun:1},{lines:['"numbers"',"1","2","3"],msSinceRun:1},{lines:['["array","of",{"multiple":true},1,"items"]'],msSinceRun:1},{lines:['{"1":true,"2":false,"3":5,"4":"object"}'],msSinceRun:1},{lines:['{"deeply":{"nested":{"flat":"test","object":{"withSome":{"keys":"123"}}}}}'],msSinceRun:1}]}},C={title:"Function",component:n,args:{disabled:!1,defaultValue:m,trace:g},argTypes:{value:{table:{disable:!0}}}},e={render:t=>i.jsx(n,{...t})},r={render:t=>{const[p,d]=f.useState(m);return i.jsx(n,{...t,value:p,onChange:d})}};var s,a,o;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: args => {
    return <Function {...args} />;
  }
}`,...(o=(a=e.parameters)==null?void 0:a.docs)==null?void 0:o.source}}};var u,l,c;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string>(defaultFunctionValue);
    return <Function {...args} value={value} onChange={setValue} />;
  }
}`,...(c=(l=r.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};const h=["Uncontrolled","Controlled"];export{r as Controlled,e as Uncontrolled,h as __namedExportsOrder,C as default};
