import{j as a}from"./jsx-runtime-QvZ8i92b.js";import{r as l}from"./index-uubelm5h.js";import{F as o}from"./function-I1kfu2ox.js";import{d as s}from"./libs-BAoTL49l.js";import"./iframe-ByyYn7rB.js";import"../sb-preview/runtime.js";import"./index-TW2i6qtr.js";import"./index-DHssZ0Ax.js";import"./index-BK_xiHMm.js";const d={performance:"2.820417ms",traceData:{log:[{lines:['"string"'],msSinceRun:1},{lines:['"numbers"',"1","2","3"],msSinceRun:1},{lines:['["array","of",{"multiple":true},1,"items"]'],msSinceRun:1},{lines:['{"1":true,"2":false,"3":5,"4":"object"}'],msSinceRun:1},{lines:['{"deeply":{"nested":{"flat":"test","object":{"withSome":{"keys":"123"}}}}}'],msSinceRun:1}]}},w={title:"Function",component:o,args:{disabled:!1,defaultValue:s,trace:d,inputData:{customer:{firstName:"John",lastName:"Doe"}}},argTypes:{value:{table:{disable:!0}}}},r={render:e=>a.jsx(o,{...e})},n={render:e=>{const[c,u]=l.useState(s);return a.jsx(o,{...e,value:c,onChange:u})}},t={args:{defaultValue:`import http from 'http';
import zen from 'zen';

export const handler = async (input) => {
  throw new Error('hello worldd');

  return input;
};
    `,error:{data:{nodeId:"6a5bc11c-41ef-43d5-b3ae-93c51ecebc19",source:`Error:5:9 hello worldd
    at handler (node:function1:5:9)
`}}},render:e=>a.jsx(o,{...e})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: args => {
    return <Function {...args} />;
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string>(defaultFunctionValue);
    return <Function {...args} value={value} onChange={setValue} />;
  }
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};const E=["Uncontrolled","Controlled","WithError"];export{n as Controlled,r as Uncontrolled,t as WithError,E as __namedExportsOrder,w as default};
