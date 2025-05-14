import{j as r}from"./index-CQHSiloJ.js";import{f as p}from"./index-D5UsiwoX.js";import{r as l}from"./index-DQDNmYQF.js";import{E as a}from"./expression-D10bT1o0.js";import"./index-DYVtDik4.js";import"./confirm-action-DEx-FRUH.js";import"./AntdIcon-B_Vtuvge.js";import"./wasm-DczZnGsX.js";import"./ce-preview-0b39FdjA.js";const o=[{id:"1",key:"customer.fullName",value:'customer.firstName + " " + customer.lastName'},{id:"2",key:"customer.isPremium",value:'contains(customer.tags, "premium")'},{id:"3",key:"customer.purchaseTotals",value:"sum(map(customer.purchases, #.amount))"}],c={customer:{firstName:"John",lastName:"Doe",tags:["premium"],purchases:[{id:"",amount:100}]}},S={title:"Expression",component:a,args:{configurable:!0,disabled:!1,defaultValue:o,inputData:c,onChange:p()},argTypes:{inputData:{control:"object"},manager:{table:{disable:!0}},value:{table:{disable:!0}}}},n=({children:e})=>r.jsx("div",{style:{maxWidth:900},children:e}),s={render:e=>r.jsx(n,{children:r.jsx(a,{...e})})},t={render:e=>{const[u,m]=l.useState(o);return r.jsx(n,{children:r.jsx(a,{value:u,onChange:m,...e})})}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};const b=["Uncontrolled","Controlled"];export{t as Controlled,s as Uncontrolled,b as __namedExportsOrder,S as default};
