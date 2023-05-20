import{_ as xe,u as ye,c as Ve,d as G,f as K,g as z,h as fe,i as me,o as _e,k as q,F as ke,D as Se,l as H,j as p}from"./dt-f4e36e09.js";import{r}from"./index-32a56c20.js";import{_ as Ee}from"./extends-b84940d4.js";import"./_commonjsHelpers-042e6b4d.js";import"./v4-a960c1f4.js";var we=["prefixCls","className","style","checked","disabled","defaultChecked","type","onChange"],De=r.forwardRef(function(e,a){var o,t=e.prefixCls,n=t===void 0?"rc-checkbox":t,O=e.className,v=e.style,V=e.checked,b=e.disabled,m=e.defaultChecked,d=m===void 0?!1:m,C=e.type,_=C===void 0?"checkbox":C,l=e.onChange,k=xe(e,we),g=r.useRef(null),s=ye(d,{value:V}),x=Ve(s,2),S=x[0],E=x[1];r.useImperativeHandle(a,function(){return{focus:function(){var c;(c=g.current)===null||c===void 0||c.focus()},blur:function(){var c;(c=g.current)===null||c===void 0||c.blur()},input:g.current}});var y=G(n,O,(o={},K(o,"".concat(n,"-checked"),S),K(o,"".concat(n,"-disabled"),b),o)),u=function(c){b||("checked"in e||E(c.target.checked),l==null||l({target:z(z({},e),{},{type:_,checked:c.target.checked}),stopPropagation:function(){c.stopPropagation()},preventDefault:function(){c.preventDefault()},nativeEvent:c.nativeEvent}))};return r.createElement("span",{className:y,style:v},r.createElement("input",Ee({},k,{className:"".concat(n,"-input"),ref:g,onChange:u,disabled:b,checked:!!S,type:_})),r.createElement("span",{className:"".concat(n,"-inner")}))}),He=globalThis&&globalThis.__rest||function(e,a){var o={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&a.indexOf(t)<0&&(o[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(e);n<t.length;n++)a.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(e,t[n])&&(o[t[n]]=e[t[n]]);return o};const ge=r.createContext(null),Oe=(e,a)=>{var{defaultValue:o,children:t,options:n=[],prefixCls:O,className:v,rootClassName:V,style:b,onChange:m}=e,d=He(e,["defaultValue","children","options","prefixCls","className","rootClassName","style","onChange"]);const{getPrefixCls:C,direction:_}=r.useContext(fe),[l,k]=r.useState(d.value||o||[]),[g,s]=r.useState([]);r.useEffect(()=>{"value"in d&&k(d.value||[])},[d.value]);const x=()=>n.map(i=>typeof i=="string"||typeof i=="number"?{label:i,value:i}:i),S=i=>{s(w=>w.filter(D=>D!==i))},E=i=>{s(w=>[].concat(q(w),[i]))},y=i=>{const w=l.indexOf(i.value),D=q(l);w===-1?D.push(i.value):D.splice(w,1),"value"in d||k(D);const J=x();m==null||m(D.filter(A=>g.includes(A)).sort((A,ve)=>{const be=J.findIndex(F=>F.value===A),Ce=J.findIndex(F=>F.value===ve);return be-Ce}))},u=C("checkbox",O),h=`${u}-group`,[c,f]=me(u),I=_e(d,["value","disabled"]);n&&n.length>0&&(t=x().map(i=>r.createElement(he,{prefixCls:u,key:i.value.toString(),disabled:"disabled"in i?i.disabled:d.disabled,value:i.value,checked:l.includes(i.value),onChange:i.onChange,className:`${h}-item`,style:i.style},i.label)));const j={toggleOption:y,value:l,disabled:d.disabled,name:d.name,registerValue:E,cancelValue:S},W=G(h,{[`${h}-rtl`]:_==="rtl"},v,V,f);return c(r.createElement("div",Object.assign({className:W,style:b},I,{ref:a}),r.createElement(ge.Provider,{value:j},t)))},$e=r.forwardRef(Oe),Pe=r.memo($e);var Le=globalThis&&globalThis.__rest||function(e,a){var o={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&a.indexOf(t)<0&&(o[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(e);n<t.length;n++)a.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(e,t[n])&&(o[t[n]]=e[t[n]]);return o};const Ne=(e,a)=>{var o,{prefixCls:t,className:n,rootClassName:O,children:v,indeterminate:V=!1,style:b,onMouseEnter:m,onMouseLeave:d,skipGroup:C=!1,disabled:_}=e,l=Le(e,["prefixCls","className","rootClassName","children","indeterminate","style","onMouseEnter","onMouseLeave","skipGroup","disabled"]);const{getPrefixCls:k,direction:g}=r.useContext(fe),s=r.useContext(ge),{isFormItemInput:x}=r.useContext(ke),S=r.useContext(Se),E=(o=(s==null?void 0:s.disabled)||_)!==null&&o!==void 0?o:S,y=r.useRef(l.value);r.useEffect(()=>{s==null||s.registerValue(l.value)},[]),r.useEffect(()=>{if(!C)return l.value!==y.current&&(s==null||s.cancelValue(y.current),s==null||s.registerValue(l.value),y.current=l.value),()=>s==null?void 0:s.cancelValue(l.value)},[l.value]);const u=k("checkbox",t),[h,c]=me(u),f=Object.assign({},l);s&&!C&&(f.onChange=function(){l.onChange&&l.onChange.apply(l,arguments),s.toggleOption&&s.toggleOption({label:v,value:l.value})},f.name=s.name,f.checked=s.value.includes(l.value));const I=G({[`${u}-wrapper`]:!0,[`${u}-rtl`]:g==="rtl",[`${u}-wrapper-checked`]:f.checked,[`${u}-wrapper-disabled`]:E,[`${u}-wrapper-in-form-item`]:x},n,O,c),j=G({[`${u}-indeterminate`]:V},c),W=V?"mixed":void 0;return h(r.createElement("label",{className:I,style:b,onMouseEnter:m,onMouseLeave:d},r.createElement(De,Object.assign({"aria-checked":W},f,{prefixCls:u,className:j,disabled:E,ref:a})),v!==void 0&&r.createElement("span",null,v)))},Te=r.forwardRef(Ne),he=Te,M=he;M.Group=Pe;M.__ANT_CHECKBOX=!0;const Re=M,U={hitPolicy:"first",inputs:[{id:"HVo_JpALi8",type:"expression",field:"cart.weight",name:"Cart Weight (Kg)"},{id:"HW6mSVfLbs",type:"expression",field:"customer.country",name:"Customer Country"}],outputs:[{field:"shippingFee",id:"3EGDrV0ssV",name:"Shipping Fee",type:"expression"}],rules:[{_id:"qMpJEvcau6",_description:"If weight is above 40kg and country is US, fee is 40",HVo_JpALi8:"> 40",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"40"},{_id:"KC6KqcWiOX",_description:"If weight is above 40kg and any other country, fee is 50",HVo_JpALi8:"> 40",HW6mSVfLbs:"","3EGDrV0ssV":"50"},{_id:"k-zEFSTe7b",_description:"if weight is between 20 and 40kg and country US, fee is 30",HVo_JpALi8:"[20..40]",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"30"},{_id:"c_8VkmGZ_C",_description:"if weight is between 20 and 40kg and any other country, fee is 32",HVo_JpALi8:"[20..40]",HW6mSVfLbs:"","3EGDrV0ssV":"32"},{_id:"e_MyQeTS3V",_description:"if weight is bellow 20kg and country US, fee is 25",HVo_JpALi8:"< 20",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"25"},{_id:"_iU8FNLxHb",_description:"if weight is bellow 20kg, fee is 30",HVo_JpALi8:"< 20",HW6mSVfLbs:"","3EGDrV0ssV":"30"}]},$=[{field:"cart",name:"Cart",items:[{field:"cart.total",name:"Total"},{field:"cart.weight",name:"Weight"}]},{field:"customer",name:"Customer",items:[{field:"customer.country",name:"Country"}]}],Ge=()=>{const e=[];for(let a=1e4;a>0;a--)e.push({_id:`${a}`,_description:`${a} description`,HVo_JpALi8:`> ${a}`,HW6mSVfLbs:'"US"',"3EGDrV0ssV":`${a}`});return e},Me={title:"Decision Table",component:H,argTypes:{configurable:{control:"boolean"},disabled:{control:"boolean"},cellRenderer:{control:!1}},args:{inputsSchema:$,configurable:!0,disabled:!1}},P={render:e=>p("div",{children:p(H,{defaultValue:U,...e,tableHeight:"500px"})})},L={render:e=>{const[a,o]=r.useState(U);return p("div",{children:p(H,{...e,tableHeight:"500px",value:a,onChange:t=>o(t)})})}},N={render:e=>p("div",{children:p(H,{...e,tableHeight:"500px"})})},T={render:e=>p("div",{children:p(H,{...e,tableHeight:"500px",cellRenderer:a=>{var o;return((o=a==null?void 0:a.column)==null?void 0:o.field)==="output"?p("div",{style:{paddingLeft:"1rem"},children:p(Re,{checked:a.value==="true",onChange:t=>{var n;a.onChange(`${(n=t==null?void 0:t.target)==null?void 0:n.checked}`)},children:"Enabled"})}):null}})})},R={render:e=>p("div",{children:p(H,{...e,tableHeight:"500px",defaultValue:{...U,rules:Ge()}})})};var B,X,Q;$.parameters={...$.parameters,docs:{...(B=$.parameters)==null?void 0:B.docs,source:{originalSource:`[{
  field: 'cart',
  name: 'Cart',
  items: [{
    field: 'cart.total',
    name: 'Total'
  }, {
    field: 'cart.weight',
    name: 'Weight'
  }]
}, {
  field: 'customer',
  name: 'Customer',
  items: [{
    field: 'customer.country',
    name: 'Country'
  }]
}]`,...(Q=(X=$.parameters)==null?void 0:X.docs)==null?void 0:Q.source}}};var Z,Y,ee;P.parameters={...P.parameters,docs:{...(Z=P.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  render: args => {
    return <div>
        <DecisionTable defaultValue={shippingFeesDefault} {...args} tableHeight='500px' />
      </div>;
  }
}`,...(ee=(Y=P.parameters)==null?void 0:Y.docs)==null?void 0:ee.source}}};var te,ne,re;L.parameters={...L.parameters,docs:{...(te=L.parameters)==null?void 0:te.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<DecisionTableProps>(shippingFeesDefault);
    return <div>
        <DecisionTable {...args} tableHeight='500px' value={value} onChange={val => setValue(val)} />
      </div>;
  }
}`,...(re=(ne=L.parameters)==null?void 0:ne.docs)==null?void 0:re.source}}};var ae,se,oe;N.parameters={...N.parameters,docs:{...(ae=N.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  render: args => <div>
      <DecisionTable {...args} tableHeight='500px' />
    </div>
}`,...(oe=(se=N.parameters)==null?void 0:se.docs)==null?void 0:oe.source}}};var le,ie,ce;T.parameters={...T.parameters,docs:{...(le=T.parameters)==null?void 0:le.docs,source:{originalSource:`{
  render: args => <div>
      <DecisionTable {...args} tableHeight='500px' cellRenderer={props => {
      if (props?.column?.field === 'output') {
        return <div style={{
          paddingLeft: '1rem'
        }}>
                <Checkbox checked={props.value === 'true'} onChange={e => {
            props.onChange(\`\${e?.target?.checked}\`);
          }}>
                  Enabled
                </Checkbox>
              </div>;
      }
      return null;
    }} />
    </div>
}`,...(ce=(ie=T.parameters)==null?void 0:ie.docs)==null?void 0:ce.source}}};var ue,de,pe;R.parameters={...R.parameters,docs:{...(ue=R.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  render: args => <div>
      <DecisionTable {...args} tableHeight='500px' defaultValue={{
      ...shippingFeesDefault,
      rules: stressRules()
    }} />
    </div>
}`,...(pe=(de=R.parameters)==null?void 0:de.docs)==null?void 0:pe.source}}};const Ue=["inputSchemaDefault","Uncontrolled","Controlled","Empty","CustomRenderer","StressTest"];export{L as Controlled,T as CustomRenderer,N as Empty,R as StressTest,P as Uncontrolled,Ue as __namedExportsOrder,Me as default,$ as inputSchemaDefault};
//# sourceMappingURL=dt.stories-96c4c81d.js.map
