import{j as i}from"./index-f9942fbd.js";import{r as f}from"./index-f15177ee.js";import{F as n}from"./function-9f4f5843.js";import{d as m}from"./libs-5f276d5d.js";import"./extends-0ea0fc03.js";import"./_commonjsHelpers-de833af9.js";import"./stack-efa65be7.js";import"./index-b7949e8c.js";const g={performance:"2.820417ms",traceData:{log:[{lines:['"string"'],msSinceRun:1},{lines:['"numbers"',"1","2","3"],msSinceRun:1},{lines:['["array","of",{"multiple":true},1,"items"]'],msSinceRun:1},{lines:['{"1":true,"2":false,"3":5,"4":"object"}'],msSinceRun:1},{lines:['{"deeply":{"nested":{"flat":"test","object":{"withSome":{"keys":"123"}}}}}'],msSinceRun:1}]}},y={title:"Function",component:n,args:{disabled:!1,defaultValue:m,trace:g},argTypes:{value:{table:{disable:!0}}}},e={render:t=>i(n,{...t})},r={render:t=>{const[d,p]=f.useState(m);return i(n,{...t,value:d,onChange:p})}};var a,s,o;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: args => {
    return <Function {...args} />;
  }
}`,...(o=(s=e.parameters)==null?void 0:s.docs)==null?void 0:o.source}}};var u,l,c;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string>(defaultFunctionValue);
    return <Function {...args} value={value} onChange={setValue} />;
  }
}`,...(c=(l=r.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};const C=["Uncontrolled","Controlled"];export{r as Controlled,e as Uncontrolled,C as __namedExportsOrder,y as default};
//# sourceMappingURL=function.stories-18f33059.js.map
