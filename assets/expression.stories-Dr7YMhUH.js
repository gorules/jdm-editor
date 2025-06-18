import{j as r}from"./index-CQHSiloJ.js";import{f as p}from"./index-D5UsiwoX.js";import{r as l}from"./index-DQDNmYQF.js";import{E as t}from"./expression-yA6m6Y6f.js";import"./index-DYVtDik4.js";import"./confirm-action-Cza2f3LO.js";import"./AntdIcon-D6ykz6_U.js";import"./wasm-x_N3mga8.js";import"./ce-preview-CycYJSbp.js";const o=[{id:"1",key:"customer.fullName",value:'customer.firstName + " " + customer.lastName'},{id:"2",key:"customer.isPremium",value:'contains(customer.tags, "premium")'},{id:"3",key:"customer.purchaseTotals",value:"sum(map(customer.purchases, #.amount))"}],h={title:"Expression",component:t,args:{configurable:!0,disabled:!1,defaultValue:o,onChange:p()},argTypes:{manager:{table:{disable:!0}},value:{table:{disable:!0}}}},n=({children:e})=>r.jsx("div",{style:{maxWidth:900},children:e}),s={render:e=>r.jsx(n,{children:r.jsx(t,{...e})})},a={render:e=>{const[u,m]=l.useState(o);return r.jsx(n,{children:r.jsx(t,{value:u,onChange:m,...e})})}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: args => {
    return <StoryWrapper>
        <Expression {...args} />
      </StoryWrapper>;
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState(expressionDefault);
    return <StoryWrapper>
        <Expression value={value} onChange={setValue} {...args} />
      </StoryWrapper>;
  }
}`,...a.parameters?.docs?.source}}};const E=["Uncontrolled","Controlled"];export{a as Controlled,s as Uncontrolled,E as __namedExportsOrder,h as default};
