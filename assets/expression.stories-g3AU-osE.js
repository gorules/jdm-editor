import{j as r}from"./index-CQHSiloJ.js";import{f as m}from"./index-D5UsiwoX.js";import{r as p}from"./index-DQDNmYQF.js";import{E as a}from"./expression-BUh5Vv-1.js";import"./index-DYVtDik4.js";import"./wasm-Wtxs8yHP.js";import"./AntdIcon-BDeMRzWn.js";import"./ce-preview-CZxWZ1mC.js";const o=[{id:"1",key:"customer.fullName",value:'customer.firstName + " " + customer.lastName'},{id:"2",key:"customer.isPremium",value:'contains(customer.tags, "premium")'},{id:"3",key:"customer.purchaseTotals",value:"sum(map(customer.purchases, #.amount))"}],S={title:"Expression",component:a,args:{disabled:!1,defaultValue:o,onChange:m(),permission:"edit:full"},argTypes:{permission:{control:"select",options:["edit:full","edit:values","view"]},manager:{table:{disable:!0}},value:{table:{disable:!0}}}},n=({children:e})=>r.jsx("div",{style:{maxWidth:900},children:e}),s={render:e=>r.jsx(n,{children:r.jsx(a,{...e})})},t={render:e=>{const[u,l]=p.useState(o);return r.jsx(n,{children:r.jsx(a,{value:u,onChange:l,...e})})}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};const h=["Uncontrolled","Controlled"];export{t as Controlled,s as Uncontrolled,h as __namedExportsOrder,S as default};
