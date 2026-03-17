import{j as r}from"./index-CQHSiloJ.js";import{f as i}from"./index-D5UsiwoX.js";import{r as u}from"./index-DQDNmYQF.js";import{E as o}from"./expression-CtEFKwCp.js";import"./index-DYVtDik4.js";import"./index-Db3AC-qi.js";import"./index-CpcAuy2I.js";import"./index-gOoZ_Egx.js";import"./focus-helper-M8EkEbuV.js";import"./Overflow-I5dVxCrc.js";import"./ce-base-IpRu61NK.js";import"./ce-preview-CkA0BzEQ.js";import"./AntdIcon-y9lsgoav.js";import"./expression-builder-CQmKZj7V.js";import"./standard-expression-builder-dNINztK7.js";const a=[{id:"1",key:"customer.fullName",value:'customer.firstName + " " + customer.lastName'},{id:"2",key:"customer.isPremium",value:'contains(customer.tags, "premium")'},{id:"3",key:"customer.purchaseTotals",value:"sum(map(customer.purchases, #.amount))"}],V={title:"Expression",component:o,args:{disabled:!1,defaultValue:a,onChange:i(),permission:"edit:full"},argTypes:{permission:{control:"select",options:["edit:full","edit:values","view"]},manager:{table:{disable:!0}},value:{table:{disable:!0}}}},n=({children:e})=>r.jsx("div",{style:{maxWidth:900},children:e}),s={render:e=>r.jsx(n,{children:r.jsx(o,{...e})})},t={render:e=>{const[m,p]=u.useState(a);return r.jsx(n,{children:r.jsx(o,{value:m,onChange:p,...e})})}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};const k=["Uncontrolled","Controlled"];export{t as Controlled,s as Uncontrolled,k as __namedExportsOrder,V as default};
