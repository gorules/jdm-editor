import{j as a}from"./index-CQHSiloJ.js";import{f as s}from"./index-D5UsiwoX.js";import{r as i}from"./index-DQDNmYQF.js";import{d as l,F as o}from"./function-ClZqL0CT.js";import"./index-DYVtDik4.js";import"./iframe-D7nvDjAb.js";import"./index-BPZMdQjL.js";import"./AntdIcon-BVylpbbH.js";import"./index-Bc_E4zOA.js";import"./Overflow-BaFppTl7.js";import"./index-CMwgERd7.js";const d={performance:"2.820417ms",traceData:{log:[{lines:['"string"'],msSinceRun:1},{lines:['"numbers"',"1","2","3"],msSinceRun:1},{lines:['["array","of",{"multiple":true},1,"items"]'],msSinceRun:1},{lines:['{"1":true,"2":false,"3":5,"4":"object"}'],msSinceRun:1},{lines:['{"deeply":{"nested":{"flat":"test","object":{"withSome":{"keys":"123"}}}}}'],msSinceRun:1},{lines:['"Error: failed to evaluate function"'],msSinceRun:1}]}},j={title:"Function",component:o,args:{disabled:!1,defaultValue:l,trace:d,inputData:{customer:{firstName:"John",lastName:"Doe"}},onMonacoReady:s(),onChange:s()},argTypes:{disabled:{control:"boolean"},defaultValue:{control:"text"},inputData:{control:"object"},value:{table:{disable:!0}},permission:{control:"select",options:["edit:full"]}}},r={render:e=>a.jsx(o,{...e})},n={render:e=>{const[c,u]=i.useState(l);return a.jsx(o,{...e,value:c,onChange:u})}},t={args:{defaultValue:`import http from 'http';
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
}`,...t.parameters?.docs?.source}}};const F=["Uncontrolled","Controlled","WithError"];export{n as Controlled,r as Uncontrolled,t as WithError,F as __namedExportsOrder,j as default};
