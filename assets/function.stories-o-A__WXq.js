import{j as a}from"./wrapNativeSuper-CEh6UYuW.js";import{f as s}from"./index-BGHfnJZS.js";import{r as i}from"./index-CTjT7uj6.js";import{F as o}from"./function-CAy4iguo.js";import{d as c}from"./monaco-DnbjSuiY.js";import"./iframe-Cp72JKWs.js";import"../sb-preview/runtime.js";import"./index.module-BlUlgRCo.js";import"./wasm-DSB3Eh-p.js";import"./index-BuEDxqVA.js";import"./button-DEUXPxaj.js";import"./index-DsiOjm5Y.js";const d={performance:"2.820417ms",traceData:{log:[{lines:['"string"'],msSinceRun:1},{lines:['"numbers"',"1","2","3"],msSinceRun:1},{lines:['["array","of",{"multiple":true},1,"items"]'],msSinceRun:1},{lines:['{"1":true,"2":false,"3":5,"4":"object"}'],msSinceRun:1},{lines:['{"deeply":{"nested":{"flat":"test","object":{"withSome":{"keys":"123"}}}}}'],msSinceRun:1},{lines:['"Error: failed to evaluate function"'],msSinceRun:1}]}},F={title:"Function",component:o,args:{disabled:!1,defaultValue:c,trace:d,inputData:{customer:{firstName:"John",lastName:"Doe"}},onMonacoReady:s(),onChange:s()},argTypes:{disabled:{control:"boolean"},defaultValue:{control:"text"},inputData:{control:"object"},value:{table:{disable:!0}}}},r={render:e=>a.jsx(o,{...e})},n={render:e=>{const[l,u]=i.useState(c);return a.jsx(o,{...e,value:l,onChange:u})}},t={args:{defaultValue:`import http from 'http';
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
}`,...t.parameters?.docs?.source}}};const R=["Uncontrolled","Controlled","WithError"];export{n as Controlled,r as Uncontrolled,t as WithError,R as __namedExportsOrder,F as default};
