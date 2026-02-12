import{j as r}from"./index-CQHSiloJ.js";import{f as W}from"./index-D5UsiwoX.js";import{r as j}from"./index-DQDNmYQF.js";import{J as D}from"./focus-helper-ZxZ0PQkW.js";import{E as S}from"./expression-builder-D6cHjOBB.js";import"./index-DYVtDik4.js";import"./index-BPZMdQjL.js";import"./Overflow-BaFppTl7.js";import"./ce-base-WZGwKeKc.js";import"./index-Bc_E4zOA.js";const N={title:"ExpressionBuilder",component:S,parameters:{layout:"padded"},argTypes:{value:{type:"string"},disabled:{type:"boolean"},fieldType:{control:{type:"object"}},onChange:{table:{disable:!0}}},args:{disabled:!1,onChange:W()}},a=e=>{const[s,x]=j.useState(e.value);return r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16},children:[r.jsx(S,{...e,value:s,onChange:x}),r.jsxs("div",{style:{fontFamily:"monospace",fontSize:12,color:"#666"},children:["Expression: ",s||"(empty)"]})]})},n={render:e=>r.jsx(a,{...e,value:""})},o={args:{fieldType:{type:"string"}},render:e=>r.jsx(a,{...e,value:'"hello"'})},t={args:{fieldType:{type:"number"}},render:e=>r.jsx(a,{...e,value:"42"})},l={args:{fieldType:{type:"boolean"}},render:e=>r.jsx(a,{...e,value:"true"})},p={args:{fieldType:{type:"date"}},render:e=>r.jsx(a,{...e,value:'d($).isAfter("2024-01-01")'})},d={args:{fieldType:{type:"string",enum:{type:"inline",values:[{label:"Pending",value:"pending"},{label:"Processing",value:"processing"},{label:"Shipped",value:"shipped"},{label:"Delivered",value:"delivered"},{label:"Cancelled",value:"cancelled"}]}}},render:e=>r.jsx(a,{...e,value:'"pending"'})},E={orderStatus:[{label:"Pending",value:"pending"},{label:"Processing",value:"processing"},{label:"Shipped",value:"shipped"},{label:"Delivered",value:"delivered"},{label:"Cancelled",value:"cancelled"}],country:[{label:"United States",value:"us"},{label:"Canada",value:"ca"},{label:"Mexico",value:"mx"}]},h=e=>{const[s,x]=j.useState(e.value);return r.jsx(D,{dictionaries:E,children:r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16},children:[r.jsx(S,{...e,value:s,onChange:x}),r.jsxs("div",{style:{fontFamily:"monospace",fontSize:12,color:"#666"},children:["Expression: ",s||"(empty)"]})]})})},i={args:{fieldType:{type:"string",enum:{type:"ref",ref:"orderStatus"}}},render:e=>r.jsx(h,{...e,value:'"pending"'})},u={args:{fieldType:{type:"string",enum:{type:"ref",ref:"country",loose:!0}}},render:e=>r.jsx(h,{...e,value:'"us"'})},c={args:{fieldType:{type:"string",enum:{type:"inline",loose:!0,values:[{label:"Small",value:"sm"},{label:"Medium",value:"md"},{label:"Large",value:"lg"}]}}},render:e=>r.jsx(a,{...e,value:'"sm"'})},m={args:{fieldType:{type:"date"}},render:e=>r.jsx(a,{...e,value:'d($).isSame("2024-06-15", "month")'})},g={args:{fieldType:{type:"date"}},render:e=>r.jsx(a,{...e,value:"d($).hour() * 60 + d($).minute() > 9 * 60 + 0"})},y={args:{fieldType:{type:"date"}},render:e=>r.jsx(a,{...e,value:"d($).weekday() in [1, 2, 3, 4, 5]"})},v={args:{fieldType:{type:"date"}},render:e=>r.jsx(a,{...e,value:"d($).quarter() in [1, 2]"})},f={args:{fieldType:{type:"number"}},render:e=>r.jsx(a,{...e,value:"[10..100]"})},T={render:e=>r.jsx(a,{...e,value:"$ > 10 and $ < 100"})},b={args:{disabled:!0},render:e=>r.jsx(a,{...e,value:'"hello"'})};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: args => <Wrapper {...args} value='' />
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    fieldType: {
      type: 'string'
    }
  },
  render: args => <Wrapper {...args} value='"hello"' />
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    fieldType: {
      type: 'number'
    }
  },
  render: args => <Wrapper {...args} value='42' />
}`,...t.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    fieldType: {
      type: 'boolean'
    }
  },
  render: args => <Wrapper {...args} value='true' />
}`,...l.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    fieldType: {
      type: 'date'
    }
  },
  render: args => <Wrapper {...args} value='d($).isAfter("2024-01-01")' />
}`,...p.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    fieldType: {
      type: 'string',
      enum: {
        type: 'inline',
        values: [{
          label: 'Pending',
          value: 'pending'
        }, {
          label: 'Processing',
          value: 'processing'
        }, {
          label: 'Shipped',
          value: 'shipped'
        }, {
          label: 'Delivered',
          value: 'delivered'
        }, {
          label: 'Cancelled',
          value: 'cancelled'
        }]
      }
    }
  },
  render: args => <Wrapper {...args} value='"pending"' />
}`,...d.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    fieldType: {
      type: 'string',
      enum: {
        type: 'ref',
        ref: 'orderStatus'
      }
    }
  },
  render: args => <DictWrapper {...args} value='"pending"' />
}`,...i.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    fieldType: {
      type: 'string',
      enum: {
        type: 'ref',
        ref: 'country',
        loose: true
      }
    }
  },
  render: args => <DictWrapper {...args} value='"us"' />
}`,...u.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    fieldType: {
      type: 'string',
      enum: {
        type: 'inline',
        loose: true,
        values: [{
          label: 'Small',
          value: 'sm'
        }, {
          label: 'Medium',
          value: 'md'
        }, {
          label: 'Large',
          value: 'lg'
        }]
      }
    }
  },
  render: args => <Wrapper {...args} value='"sm"' />
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    fieldType: {
      type: 'date'
    }
  },
  render: args => <Wrapper {...args} value='d($).isSame("2024-06-15", "month")' />
}`,...m.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    fieldType: {
      type: 'date'
    }
  },
  render: args => <Wrapper {...args} value='d($).hour() * 60 + d($).minute() > 9 * 60 + 0' />
}`,...g.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    fieldType: {
      type: 'date'
    }
  },
  render: args => <Wrapper {...args} value='d($).weekday() in [1, 2, 3, 4, 5]' />
}`,...y.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    fieldType: {
      type: 'date'
    }
  },
  render: args => <Wrapper {...args} value='d($).quarter() in [1, 2]' />
}`,...v.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    fieldType: {
      type: 'number'
    }
  },
  render: args => <Wrapper {...args} value='[10..100]' />
}`,...f.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: args => <Wrapper {...args} value='$ > 10 and $ < 100' />
}`,...T.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true
  },
  render: args => <Wrapper {...args} value='"hello"' />
}`,...b.parameters?.docs?.source}}};const q=["AutoType","StringType","NumberType","BooleanType","DateType","EnumType","DictionaryEnum","DictionaryEnumLoose","InlineEnumLoose","DateWithGranularity","TimeComparison","DayOfWeek","Quarter","Interval","CustomExpression","Disabled"];export{n as AutoType,l as BooleanType,T as CustomExpression,p as DateType,m as DateWithGranularity,y as DayOfWeek,i as DictionaryEnum,u as DictionaryEnumLoose,b as Disabled,d as EnumType,c as InlineEnumLoose,f as Interval,t as NumberType,v as Quarter,o as StringType,g as TimeComparison,q as __namedExportsOrder,N as default};
