import{j as r}from"./index-f9942fbd.js";import{r as f}from"./index-f15177ee.js";import{E as t}from"./expression-4871a0b8.js";import"./extends-0ea0fc03.js";import"./_commonjsHelpers-de833af9.js";import"./autosize-text-area-0b51e74b.js";import"./v4-a960c1f4.js";const c=[{id:"1",key:"customer.fullName",value:'customer.firstName + " " + customer.lastName'},{id:"2",key:"customer.isPremium",value:'contains(customer.tags, "premium")'},{id:"3",key:"customer.purchaseTotals",value:"sum(map(customer.purchases, #.amount))"}],W={title:"Expression",component:t,args:{configurable:!0,disabled:!1,defaultValue:c},argTypes:{manager:{table:{disable:!0}},value:{table:{disable:!0}}}},i=({children:e})=>r("div",{style:{maxWidth:900},children:e}),s={render:e=>r(i,{children:r(t,{...e})})},a={render:e=>{const[d,g]=f.useState(c);return r(i,{children:r(t,{value:d,onChange:g,...e})})}};var o,n,u;s.parameters={...s.parameters,docs:{...(o=s.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: args => {
    return <StoryWrapper>
        <Expression {...args} />
      </StoryWrapper>;
  }
}`,...(u=(n=s.parameters)==null?void 0:n.docs)==null?void 0:u.source}}};var l,m,p;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState(expressionDefault);
    return <StoryWrapper>
        <Expression value={value} onChange={setValue} {...args} />
      </StoryWrapper>;
  }
}`,...(p=(m=a.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};const C=["Uncontrolled","Controlled"];export{a as Controlled,s as Uncontrolled,C as __namedExportsOrder,W as default};
//# sourceMappingURL=expression.stories-a04150ae.js.map
