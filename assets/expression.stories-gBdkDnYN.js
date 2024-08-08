import{j as e}from"./index-B6ko2aXS.js";import{r as S}from"./index-CDs2tPxN.js";import{E as o}from"./dg-9hEu4EBO.js";import"./extends-CCbyfPlC.js";import"./index-7f_Nov5Q.js";import"./index-PP-caPqo.js";import"./libs-Tdb3HpoV.js";import"./ce-BSC3Oh3j.js";import"./iframe-CFfteDf2.js";import"../sb-preview/runtime.js";const h=[{id:"1",key:"customer.fullName",value:'customer.firstName + " " + customer.lastName'},{id:"2",key:"customer.isPremium",value:'contains(customer.tags, "premium")'},{id:"3",key:"customer.purchaseTotals",value:"sum(map(customer.purchases, #.amount))"}],k={title:"Expression",component:o,args:{configurable:!0,disabled:!1,defaultValue:h},argTypes:{manager:{table:{disable:!0}},value:{table:{disable:!0}}}},n=({children:r})=>e.jsx("div",{style:{maxWidth:900},children:r}),s={render:r=>e.jsx(n,{children:e.jsx(o,{...r})})},t={render:r=>{const[f,y]=S.useState(h);return e.jsx(n,{children:e.jsx(o,{value:f,onChange:y,...r})})}},a={args:{traceData:{"customer.fullName":{result:'"John Doe"'},"customer.isPremium":{result:"true"},"customer.purchaseTotals":{result:"[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]"}}},render:r=>e.jsx(n,{children:e.jsx(o,{...r})})};var u,m,c;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: args => {
    return <StoryWrapper>
        <Expression {...args} />
      </StoryWrapper>;
  }
}`,...(c=(m=s.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};var l,p,i;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState(expressionDefault);
    return <StoryWrapper>
        <Expression value={value} onChange={setValue} {...args} />
      </StoryWrapper>;
  }
}`,...(i=(p=t.parameters)==null?void 0:p.docs)==null?void 0:i.source}}};var d,x,g;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
}`,...(g=(x=a.parameters)==null?void 0:x.docs)==null?void 0:g.source}}};const P=["Uncontrolled","Controlled","WithTrace"];export{t as Controlled,s as Uncontrolled,a as WithTrace,P as __namedExportsOrder,k as default};
