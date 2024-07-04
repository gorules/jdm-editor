import{j as i}from"./index-B6ko2aXS.js";import{r as f}from"./index-CDs2tPxN.js";import{Function as n}from"./index-bVMCi9PG.js";import{d as m}from"./libs-wFGM0RW6.js";import"./extends-CCbyfPlC.js";import"./index-7f_Nov5Q.js";import"./index-CUd7pB-M.js";const g={performance:"2.820417ms",traceData:{log:[{lines:['"string"'],msSinceRun:1},{lines:['"numbers"',"1","2","3"],msSinceRun:1},{lines:['["array","of",{"multiple":true},1,"items"]'],msSinceRun:1},{lines:['{"1":true,"2":false,"3":5,"4":"object"}'],msSinceRun:1},{lines:['{"deeply":{"nested":{"flat":"test","object":{"withSome":{"keys":"123"}}}}}'],msSinceRun:1}]}},v={title:"Function",component:n,args:{disabled:!1,defaultValue:m,trace:g},argTypes:{value:{table:{disable:!0}}}},e={render:t=>i.jsx(n,{...t})},r={render:t=>{const[d,p]=f.useState(m);return i.jsx(n,{...t,value:d,onChange:p})}};var s,a,o;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: args => {
    return <Function {...args} />;
  }
}`,...(o=(a=e.parameters)==null?void 0:a.docs)==null?void 0:o.source}}};var u,l,c;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string>(defaultFunctionValue);
    return <Function {...args} value={value} onChange={setValue} />;
  }
}`,...(c=(l=r.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};const y=["Uncontrolled","Controlled"];export{r as Controlled,e as Uncontrolled,y as __namedExportsOrder,v as default};
