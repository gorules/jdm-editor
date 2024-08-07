import{j as r}from"./index-B6ko2aXS.js";import{r as g}from"./index-CDs2tPxN.js";import{E as a}from"./dg-Btw5GcXV.js";import"./extends-CCbyfPlC.js";import"./index-7f_Nov5Q.js";import"./index-PP-caPqo.js";import"./libs-Tdb3HpoV.js";import"./ce-BSC3Oh3j.js";import"./iframe-DjKxaveo.js";import"../sb-preview/runtime.js";const i=[{id:"1",key:"customer.fullName",value:'customer.firstName + " " + customer.lastName'},{id:"2",key:"customer.isPremium",value:'contains(customer.tags, "premium")'},{id:"3",key:"customer.purchaseTotals",value:"sum(map(customer.purchases, #.amount))"}],V={title:"Expression",component:a,args:{configurable:!0,disabled:!1,defaultValue:i},argTypes:{manager:{table:{disable:!0}},value:{table:{disable:!0}}}},c=({children:e})=>r.jsx("div",{style:{maxWidth:900},children:e}),s={render:e=>r.jsx(c,{children:r.jsx(a,{...e})})},t={render:e=>{const[d,x]=g.useState(i);return r.jsx(c,{children:r.jsx(a,{value:d,onChange:x,...e})})}};var o,n,u;s.parameters={...s.parameters,docs:{...(o=s.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: args => {
    return <StoryWrapper>
        <Expression {...args} />
      </StoryWrapper>;
  }
}`,...(u=(n=s.parameters)==null?void 0:n.docs)==null?void 0:u.source}}};var m,p,l;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState(expressionDefault);
    return <StoryWrapper>
        <Expression value={value} onChange={setValue} {...args} />
      </StoryWrapper>;
  }
}`,...(l=(p=t.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};const k=["Uncontrolled","Controlled"];export{t as Controlled,s as Uncontrolled,k as __namedExportsOrder,V as default};
