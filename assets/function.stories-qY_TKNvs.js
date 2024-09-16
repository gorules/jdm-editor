import{j as a}from"./index-B6ko2aXS.js";import{r as x}from"./index-CDs2tPxN.js";import{F as o}from"./function-ucytLqtV.js";import{d as h}from"./libs-Tdb3HpoV.js";import"./extends-CCbyfPlC.js";import"./index-7f_Nov5Q.js";import"./iframe-C4Oaa8b5.js";import"../sb-preview/runtime.js";import"./index-CUd7pB-M.js";const S={performance:"2.820417ms",traceData:{log:[{lines:['"string"'],msSinceRun:1},{lines:['"numbers"',"1","2","3"],msSinceRun:1},{lines:['["array","of",{"multiple":true},1,"items"]'],msSinceRun:1},{lines:['{"1":true,"2":false,"3":5,"4":"object"}'],msSinceRun:1},{lines:['{"deeply":{"nested":{"flat":"test","object":{"withSome":{"keys":"123"}}}}}'],msSinceRun:1}]}},C={title:"Function",component:o,args:{disabled:!1,defaultValue:h,trace:S},argTypes:{value:{table:{disable:!0}}}},r={render:e=>a.jsx(o,{...e})},n={render:e=>{const[g,b]=x.useState(h);return a.jsx(o,{...e,value:g,onChange:b})}},t={args:{defaultValue:`import http from 'http';
import zen from 'zen';

export const handler = async (input) => {
  throw new Error('hello worldd');

  return input;
};
    `,error:{data:{nodeId:"6a5bc11c-41ef-43d5-b3ae-93c51ecebc19",source:`Error:5:9 hello worldd
    at handler (node:function1:5:9)
`}}},render:e=>a.jsx(o,{...e})};var s,c,u;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: args => {
    return <Function {...args} />;
  }
}`,...(u=(c=r.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};var l,d,i;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string>(defaultFunctionValue);
    return <Function {...args} value={value} onChange={setValue} />;
  }
}`,...(i=(d=n.parameters)==null?void 0:d.docs)==null?void 0:i.source}}};var m,p,f;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    defaultValue: \`import http from 'http';
import zen from 'zen';

export const handler = async (input) => {
  throw new Error('hello worldd');

  return input;
};
    \`,
    error: {
      data: {
        nodeId: '6a5bc11c-41ef-43d5-b3ae-93c51ecebc19',
        source: 'Error:5:9 hello worldd\\n    at handler (node:function1:5:9)\\n'
      }
    }
  },
  render: args => {
    return <Function {...args} />;
  }
}`,...(f=(p=t.parameters)==null?void 0:p.docs)==null?void 0:f.source}}};const I=["Uncontrolled","Controlled","WithError"];export{n as Controlled,r as Uncontrolled,t as WithError,I as __namedExportsOrder,C as default};
