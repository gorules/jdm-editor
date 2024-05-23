import{j as i}from"./index-C-UwI2HO.js";import{r as f}from"./index-Dl6G-zuu.js";import{Function as n}from"./index-B01o1nfJ.js";import{d as m}from"./libs-C-Jjs7qp.js";import"./assertThisInitialized-B7W8eO4F.js";import"./index-Dpv8hMKE.js";import"./stack-DKfQIje1.js";import"./index-BQ5IbGbl.js";import"./button-DoK4wRRk.js";const g={performance:"2.820417ms",traceData:{log:[{lines:['"string"'],msSinceRun:1},{lines:['"numbers"',"1","2","3"],msSinceRun:1},{lines:['["array","of",{"multiple":true},1,"items"]'],msSinceRun:1},{lines:['{"1":true,"2":false,"3":5,"4":"object"}'],msSinceRun:1},{lines:['{"deeply":{"nested":{"flat":"test","object":{"withSome":{"keys":"123"}}}}}'],msSinceRun:1}]}},C={title:"Function",component:n,args:{disabled:!1,defaultValue:m,trace:g},argTypes:{value:{table:{disable:!0}}}},e={render:t=>i.jsx(n,{...t})},r={render:t=>{const[p,d]=f.useState(m);return i.jsx(n,{...t,value:p,onChange:d})}};var s,a,o;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: args => {
    return <Function {...args} />;
  }
}`,...(o=(a=e.parameters)==null?void 0:a.docs)==null?void 0:o.source}}};var u,l,c;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string>(defaultFunctionValue);
    return <Function {...args} value={value} onChange={setValue} />;
  }
}`,...(c=(l=r.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};const h=["Uncontrolled","Controlled"];export{r as Controlled,e as Uncontrolled,h as __namedExportsOrder,C as default};
