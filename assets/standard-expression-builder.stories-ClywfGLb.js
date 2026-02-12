import{j as r}from"./index-CQHSiloJ.js";import{f as v}from"./index-D5UsiwoX.js";import{r as b}from"./index-DQDNmYQF.js";import{S as m}from"./standard-expression-builder-0Gn6QVNj.js";import"./index-DYVtDik4.js";import"./focus-helper-ZxZ0PQkW.js";import"./index-BPZMdQjL.js";import"./Overflow-BaFppTl7.js";import"./ce-base-WZGwKeKc.js";const A={title:"StandardExpressionBuilder",component:m,parameters:{layout:"padded"},argTypes:{value:{type:"string"},disabled:{type:"boolean"},onChange:{table:{disable:!0}}},args:{disabled:!1,onChange:v()}},a=e=>{const[g,y]=b.useState(e.value);return r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16},children:[r.jsx("div",{style:{width:300,border:"1px solid #e5e7eb",borderRadius:4,padding:8},children:r.jsx(m,{...e,value:g,onChange:y})}),r.jsxs("div",{style:{fontFamily:"monospace",fontSize:12,color:"#666"},children:["Value: ",g||"(empty)"]})]})},s={args:{fieldType:{type:"auto"}},render:e=>r.jsx(a,{...e,value:"customer.discount * 0.1"})},t={args:{fieldType:{type:"string"}},render:e=>r.jsx(a,{...e,value:'"Hello World"'})},n={args:{fieldType:{type:"string",enum:{type:"inline",values:[{label:"United States",value:"us"},{label:"Canada",value:"ca"},{label:"Mexico",value:"mx"}]}}},render:e=>r.jsx(a,{...e,value:'"us"'})},o={args:{fieldType:{type:"string-array"}},render:e=>r.jsx(a,{...e,value:'["tag1", "tag2"]'})},l={args:{fieldType:{type:"string-array",enum:{type:"inline",values:[{label:"Red",value:"red"},{label:"Green",value:"green"},{label:"Blue",value:"blue"}]}}},render:e=>r.jsx(a,{...e,value:'["red", "blue"]'})},p={args:{fieldType:{type:"number"}},render:e=>r.jsx(a,{...e,value:"42"})},d={args:{fieldType:{type:"boolean"}},render:e=>r.jsx(a,{...e,value:"true"})},u={args:{fieldType:{type:"date"}},render:e=>r.jsx(a,{...e,value:"d('2024-06-15')"})},i={args:{fieldType:{type:"number"}},render:e=>r.jsx(a,{...e,value:"price * quantity"})},c={args:{disabled:!0,fieldType:{type:"string"}},render:e=>r.jsx(a,{...e,value:'"Disabled"'})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    fieldType: {
      type: 'auto'
    }
  },
  render: args => <Wrapper {...args} value='customer.discount * 0.1' />
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    fieldType: {
      type: 'string'
    }
  },
  render: args => <Wrapper {...args} value='"Hello World"' />
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    fieldType: {
      type: 'string',
      enum: {
        type: 'inline',
        values: [{
          label: 'United States',
          value: 'us'
        }, {
          label: 'Canada',
          value: 'ca'
        }, {
          label: 'Mexico',
          value: 'mx'
        }]
      }
    }
  },
  render: args => <Wrapper {...args} value='"us"' />
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    fieldType: {
      type: 'string-array'
    }
  },
  render: args => <Wrapper {...args} value='["tag1", "tag2"]' />
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    fieldType: {
      type: 'string-array',
      enum: {
        type: 'inline',
        values: [{
          label: 'Red',
          value: 'red'
        }, {
          label: 'Green',
          value: 'green'
        }, {
          label: 'Blue',
          value: 'blue'
        }]
      }
    }
  },
  render: args => <Wrapper {...args} value='["red", "blue"]' />
}`,...l.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    fieldType: {
      type: 'number'
    }
  },
  render: args => <Wrapper {...args} value='42' />
}`,...p.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    fieldType: {
      type: 'boolean'
    }
  },
  render: args => <Wrapper {...args} value='true' />
}`,...d.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    fieldType: {
      type: 'date'
    }
  },
  render: args => <Wrapper {...args} value="d('2024-06-15')" />
}`,...u.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    fieldType: {
      type: 'number'
    }
  },
  render: args => <Wrapper {...args} value='price * quantity' />
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    fieldType: {
      type: 'string'
    }
  },
  render: args => <Wrapper {...args} value='"Disabled"' />
}`,...c.parameters?.docs?.source}}};const B=["Auto","StringType","StringEnum","StringArrayType","StringArrayEnum","NumberType","BooleanType","DateType","ExpressionMode","Disabled"];export{s as Auto,d as BooleanType,u as DateType,c as Disabled,i as ExpressionMode,p as NumberType,l as StringArrayEnum,o as StringArrayType,n as StringEnum,t as StringType,B as __namedExportsOrder,A as default};
