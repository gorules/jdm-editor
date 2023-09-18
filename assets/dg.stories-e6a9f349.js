import{j as o}from"./index-f9942fbd.js";import{r as c}from"./index-f15177ee.js";import{D as l,A as S}from"./dg-9253ca88.js";import{F as D}from"./dt-53b081e5.js";import{I as G}from"./autosize-text-area-0b51e74b.js";import{v as E}from"./v4-a960c1f4.js";import"./extends-0ea0fc03.js";import"./_commonjsHelpers-de833af9.js";import"./stack-efa65be7.js";import"./libs-5f276d5d.js";import"./expression-4871a0b8.js";import"./iframe-543b2196.js";import"../sb-preview/runtime.js";const _={nodes:[{id:"ca98730e-a40f-4601-98cc-b5a57429596d",type:"inputNode",position:{x:70,y:250},name:"Request"},{id:"c5e747fe-b74b-4b74-9fd0-bfd7d67007c3",type:"outputNode",position:{x:570,y:250},name:"Response"},{id:"359173d8-0068-45f8-bb71-8240ad73201d",type:"decisionTableNode",position:{x:320,y:250},name:"decisionTableNode 1",content:{hitPolicy:"first",inputs:[{id:"HVo_JpALi8",type:"expression",field:"cart.weight",name:"Cart Weight (Kg)"},{id:"HW6mSVfLbs",type:"expression",field:"customer.country",name:"Customer Country"}],outputs:[{field:"shippingFee",id:"3EGDrV0ssV",name:"Shipping Fee",type:"expression"}],rules:[{_id:"qMpJEvcau6",_description:"If weight is above 40kg and country is US, fee is 40",HVo_JpALi8:"> 40",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"40"},{_id:"KC6KqcWiOX",_description:"If weight is above 40kg and any other country, fee is 50",HVo_JpALi8:"> 40",HW6mSVfLbs:"","3EGDrV0ssV":"50"},{_id:"k-zEFSTe7b",_description:"if weight is between 20 and 40kg and country US, fee is 30",HVo_JpALi8:"[20..40]",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"30"},{_id:"c_8VkmGZ_C",_description:"if weight is between 20 and 40kg and any other country, fee is 32",HVo_JpALi8:"[20..40]",HW6mSVfLbs:"","3EGDrV0ssV":"32"},{_id:"e_MyQeTS3V",_description:"if weight is bellow 20kg and country US, fee is 25",HVo_JpALi8:"< 20",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"25"},{_id:"_iU8FNLxHb",_description:"if weight is bellow 20kg, fee is 30",HVo_JpALi8:"< 20",HW6mSVfLbs:"","3EGDrV0ssV":"30"}]}}],edges:[{id:"1d5f4787-4c86-4ed9-99dc-1a3159f65d89",sourceId:"ca98730e-a40f-4601-98cc-b5a57429596d",type:"edge",targetId:"359173d8-0068-45f8-bb71-8240ad73201d"},{id:"c5d49d3a-fdfd-4f4b-8838-791cee4d4a55",sourceId:"359173d8-0068-45f8-bb71-8240ad73201d",type:"edge",targetId:"c5e747fe-b74b-4b74-9fd0-bfd7d67007c3"}]},T={title:"Decision Graph",component:l,argTypes:{},args:{}},s={render:e=>{const[t,i]=c.useState(_);return c.useEffect(()=>{e.value&&i(e.value)},[e.value]),o("div",{style:{height:"100%"},children:o(l,{...e,value:t,onChange:r=>{var n;console.log(r),i(r),(n=e==null?void 0:e.onChange)==null||n.call(e,r)}})})}},a={render:e=>o("div",{style:{height:"100%"},children:o(l,{...e,defaultValue:_,onChange:t=>{var i;console.log(t),(i=e==null?void 0:e.onChange)==null||i.call(e,t)}})})},d={render:e=>{const t=c.useRef(null),[i,r]=c.useState();return o("div",{style:{height:"100%"},children:o(l,{...e,ref:t,value:i,onChange:n=>r(n),components:[{name:"Decision",type:"decisionNode",onOpen:async n=>{console.log(n)},renderForm:({value:n,onChange:p})=>o(D.Item,{label:"Key",children:o(G,{placeholder:"Key",value:(n==null?void 0:n.key)||"",onChange:C=>{p({key:C.target.value})}})}),renderIcon:()=>o(S,{})}],onTabChange:n=>{console.log(n)},onAddNode:(n,p)=>{t.current.addNode({id:E(),type:n,position:p,name:"Decision",content:{key:"test"}})}})})}};var u,m,f;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<any>(defaultGraph);
    useEffect(() => {
      if (args.value) {
        setValue(args.value);
      }
    }, [args.value]);
    return <div style={{
      height: '100%'
    }}>
        <DecisionGraph {...args} value={value} onChange={val => {
        console.log(val);
        setValue(val);
        args?.onChange?.(val);
      }} />
      </div>;
  }
}`,...(f=(m=s.parameters)==null?void 0:m.docs)==null?void 0:f.source}}};var h,g,y;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: args => {
    return <div style={{
      height: '100%'
    }}>
        <DecisionGraph {...args} defaultValue={defaultGraph} onChange={val => {
        console.log(val);
        args?.onChange?.(val);
      }} />
      </div>;
  }
}`,...(y=(g=a.parameters)==null?void 0:g.docs)==null?void 0:y.source}}};var V,b,v;d.parameters={...d.parameters,docs:{...(V=d.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: args => {
    const ref = useRef<GraphRef>(null);
    const [value, setValue] = useState<any>();
    return <div style={{
      height: '100%'
    }}>
        <DecisionGraph {...args} ref={ref} value={value} onChange={val => setValue(val)} components={[{
        name: 'Decision',
        type: 'decisionNode',
        onOpen: async node => {
          console.log(node);
        },
        renderForm: ({
          value,
          onChange
        }) => <Form.Item label={'Key'}>
                  <Input placeholder={'Key'} value={value?.key || ''} onChange={e => {
            onChange({
              key: e.target.value
            });
          }} />
                </Form.Item>,
        renderIcon: () => <ApartmentOutlined />
      }]} onTabChange={e => {
        console.log(e);
      }} onAddNode={(type, position) => {
        ref!.current!.addNode!({
          id: v4(),
          type,
          position: (position as any),
          name: 'Decision',
          content: {
            key: 'test'
          }
        });
      }} />
      </div>;
  }
}`,...(v=(b=d.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};const O=["Controlled","Uncontrolled","Extended"];export{s as Controlled,d as Extended,a as Uncontrolled,O as __namedExportsOrder,T as default};
//# sourceMappingURL=dg.stories-e6a9f349.js.map
