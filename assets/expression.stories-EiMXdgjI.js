import{j as r}from"./index-CQHSiloJ.js";import{f as p}from"./index-D5UsiwoX.js";import{r as l}from"./index-DQDNmYQF.js";import{E as o}from"./expression-Ciyl44UH.js";import"./index-DYVtDik4.js";import"./confirm-action-CdvarwV8.js";import"./AntdIcon-CfR_PgyU.js";import"./wasm-Di9DWol9.js";import"./ce-B6dXa3LS.js";const n=[{id:"1",key:"customer.fullName",value:'customer.firstName + " " + customer.lastName'},{id:"2",key:"customer.isPremium",value:'contains(customer.tags, "premium")'},{id:"3",key:"customer.purchaseTotals",value:"sum(map(customer.purchases, #.amount))"}],i={customer:{firstName:"John",lastName:"Doe",tags:["premium"],purchases:[{id:"",amount:100}]}},W={title:"Expression",component:o,args:{configurable:!0,disabled:!1,defaultValue:n,inputData:i,onChange:p()},argTypes:{inputData:{control:"object"},manager:{table:{disable:!0}},value:{table:{disable:!0}}}},u=({children:e})=>r.jsx("div",{style:{maxWidth:900},children:e}),s={render:e=>r.jsx(u,{children:r.jsx(o,{...e})})},t={render:e=>{const[m,c]=l.useState(n);return r.jsx(u,{children:r.jsx(o,{value:m,onChange:c,...e})})}},a={args:{traceData:{"customer.fullName":{result:'"John Doe"'},"customer.isPremium":{result:"true"},"customer.purchaseTotals":{result:"[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]"}}},render:e=>r.jsx(u,{children:r.jsx(o,{...e})})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: args => {
    return <StoryWrapper>
        <Expression {...args} />
      </StoryWrapper>;
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState(expressionDefault);
    return <StoryWrapper>
        <Expression value={value} onChange={setValue} {...args} />
      </StoryWrapper>;
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    traceData: {
      'customer.fullName': {
        result: '"John Doe"'
      },
      'customer.isPremium': {
        result: 'true'
      },
      'customer.purchaseTotals': {
        result: '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]'
      }
    }
  },
  render: args => {
    return <StoryWrapper>
        <Expression {...args} />
      </StoryWrapper>;
  }
}`,...a.parameters?.docs?.source}}};const v=["Uncontrolled","Controlled","WithTrace"];export{t as Controlled,s as Uncontrolled,a as WithTrace,v as __namedExportsOrder,W as default};
