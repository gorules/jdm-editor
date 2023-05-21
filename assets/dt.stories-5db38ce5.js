import{_ as xe,u as ye,c as Ve,d as G,f as K,g as z,h as fe,i as me,o as _e,k as q,F as ke,D as Se,l as H,j as p}from"./dt-c47e225b.js";import{r}from"./index-32a56c20.js";import{_ as Ee}from"./extends-b84940d4.js";import"./_commonjsHelpers-042e6b4d.js";import"./v4-a960c1f4.js";var we=["prefixCls","className","style","checked","disabled","defaultChecked","type","onChange"],De=r.forwardRef(function(e,a){var l,t=e.prefixCls,n=t===void 0?"rc-checkbox":t,O=e.className,b=e.style,V=e.checked,v=e.disabled,m=e.defaultChecked,u=m===void 0?!1:m,C=e.type,_=C===void 0?"checkbox":C,o=e.onChange,k=xe(e,we),g=r.useRef(null),s=ye(u,{value:V}),x=Ve(s,2),S=x[0],E=x[1];r.useImperativeHandle(a,function(){return{focus:function(){var c;(c=g.current)===null||c===void 0||c.focus()},blur:function(){var c;(c=g.current)===null||c===void 0||c.blur()},input:g.current}});var y=G(n,O,(l={},K(l,"".concat(n,"-checked"),S),K(l,"".concat(n,"-disabled"),v),l)),d=function(c){v||("checked"in e||E(c.target.checked),o==null||o({target:z(z({},e),{},{type:_,checked:c.target.checked}),stopPropagation:function(){c.stopPropagation()},preventDefault:function(){c.preventDefault()},nativeEvent:c.nativeEvent}))};return r.createElement("span",{className:y,style:b},r.createElement("input",Ee({},k,{className:"".concat(n,"-input"),ref:g,onChange:d,disabled:v,checked:!!S,type:_})),r.createElement("span",{className:"".concat(n,"-inner")}))}),He=globalThis&&globalThis.__rest||function(e,a){var l={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&a.indexOf(t)<0&&(l[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(e);n<t.length;n++)a.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(e,t[n])&&(l[t[n]]=e[t[n]]);return l};const ge=r.createContext(null),Oe=(e,a)=>{var{defaultValue:l,children:t,options:n=[],prefixCls:O,className:b,rootClassName:V,style:v,onChange:m}=e,u=He(e,["defaultValue","children","options","prefixCls","className","rootClassName","style","onChange"]);const{getPrefixCls:C,direction:_}=r.useContext(fe),[o,k]=r.useState(u.value||l||[]),[g,s]=r.useState([]);r.useEffect(()=>{"value"in u&&k(u.value||[])},[u.value]);const x=()=>n.map(i=>typeof i=="string"||typeof i=="number"?{label:i,value:i}:i),S=i=>{s(w=>w.filter(D=>D!==i))},E=i=>{s(w=>[].concat(q(w),[i]))},y=i=>{const w=o.indexOf(i.value),D=q(o);w===-1?D.push(i.value):D.splice(w,1),"value"in u||k(D);const J=x();m==null||m(D.filter(A=>g.includes(A)).sort((A,be)=>{const ve=J.findIndex(F=>F.value===A),Ce=J.findIndex(F=>F.value===be);return ve-Ce}))},d=C("checkbox",O),h=`${d}-group`,[c,f]=me(d),I=_e(u,["value","disabled"]);n&&n.length>0&&(t=x().map(i=>r.createElement(he,{prefixCls:d,key:i.value.toString(),disabled:"disabled"in i?i.disabled:u.disabled,value:i.value,checked:o.includes(i.value),onChange:i.onChange,className:`${h}-item`,style:i.style},i.label)));const j={toggleOption:y,value:o,disabled:u.disabled,name:u.name,registerValue:E,cancelValue:S},W=G(h,{[`${h}-rtl`]:_==="rtl"},b,V,f);return c(r.createElement("div",Object.assign({className:W,style:v},I,{ref:a}),r.createElement(ge.Provider,{value:j},t)))},$e=r.forwardRef(Oe),Pe=r.memo($e);var Le=globalThis&&globalThis.__rest||function(e,a){var l={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&a.indexOf(t)<0&&(l[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(e);n<t.length;n++)a.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(e,t[n])&&(l[t[n]]=e[t[n]]);return l};const Ne=(e,a)=>{var l,{prefixCls:t,className:n,rootClassName:O,children:b,indeterminate:V=!1,style:v,onMouseEnter:m,onMouseLeave:u,skipGroup:C=!1,disabled:_}=e,o=Le(e,["prefixCls","className","rootClassName","children","indeterminate","style","onMouseEnter","onMouseLeave","skipGroup","disabled"]);const{getPrefixCls:k,direction:g}=r.useContext(fe),s=r.useContext(ge),{isFormItemInput:x}=r.useContext(ke),S=r.useContext(Se),E=(l=(s==null?void 0:s.disabled)||_)!==null&&l!==void 0?l:S,y=r.useRef(o.value);r.useEffect(()=>{s==null||s.registerValue(o.value)},[]),r.useEffect(()=>{if(!C)return o.value!==y.current&&(s==null||s.cancelValue(y.current),s==null||s.registerValue(o.value),y.current=o.value),()=>s==null?void 0:s.cancelValue(o.value)},[o.value]);const d=k("checkbox",t),[h,c]=me(d),f=Object.assign({},o);s&&!C&&(f.onChange=function(){o.onChange&&o.onChange.apply(o,arguments),s.toggleOption&&s.toggleOption({label:b,value:o.value})},f.name=s.name,f.checked=s.value.includes(o.value));const I=G({[`${d}-wrapper`]:!0,[`${d}-rtl`]:g==="rtl",[`${d}-wrapper-checked`]:f.checked,[`${d}-wrapper-disabled`]:E,[`${d}-wrapper-in-form-item`]:x},n,O,c),j=G({[`${d}-indeterminate`]:V},c),W=V?"mixed":void 0;return h(r.createElement("label",{className:I,style:v,onMouseEnter:m,onMouseLeave:u},r.createElement(De,Object.assign({"aria-checked":W},f,{prefixCls:d,className:j,disabled:E,ref:a})),b!==void 0&&r.createElement("span",null,b)))},Te=r.forwardRef(Ne),he=Te,M=he;M.Group=Pe;M.__ANT_CHECKBOX=!0;const Re=M,U={hitPolicy:"first",inputs:[{id:"HVo_JpALi8",type:"expression",field:"cart.weight",name:"Cart Weight (Kg)"},{id:"HW6mSVfLbs",type:"expression",field:"customer.country",name:"Customer Country"}],outputs:[{field:"shippingFee",id:"3EGDrV0ssV",name:"Shipping Fee",type:"expression"}],rules:[{_id:"qMpJEvcau6",_description:"If weight is above 40kg and country is US, fee is 40",HVo_JpALi8:"> 40",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"40"},{_id:"KC6KqcWiOX",_description:"If weight is above 40kg and any other country, fee is 50",HVo_JpALi8:"> 40",HW6mSVfLbs:"","3EGDrV0ssV":"50"},{_id:"k-zEFSTe7b",_description:"if weight is between 20 and 40kg and country US, fee is 30",HVo_JpALi8:"[20..40]",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"30"},{_id:"c_8VkmGZ_C",_description:"if weight is between 20 and 40kg and any other country, fee is 32",HVo_JpALi8:"[20..40]",HW6mSVfLbs:"","3EGDrV0ssV":"32"},{_id:"e_MyQeTS3V",_description:"if weight is bellow 20kg and country US, fee is 25",HVo_JpALi8:"< 20",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"25"},{_id:"_iU8FNLxHb",_description:"if weight is bellow 20kg, fee is 30",HVo_JpALi8:"< 20",HW6mSVfLbs:"","3EGDrV0ssV":"30"}]},$=[{field:"cart",name:"Cart",items:[{field:"cart.total",name:"Total"},{field:"cart.weight",name:"Weight"}]},{field:"customer",name:"Customer",items:[{field:"customer.country",name:"Country"}]}],Ge=()=>{const e=[];for(let a=1e4;a>0;a--)e.push({_id:`${a}`,_description:`${a} description`,HVo_JpALi8:`> ${a}`,HW6mSVfLbs:'"US"',"3EGDrV0ssV":`${a}`});return e},Me={title:"Decision Table",component:H,argTypes:{configurable:{control:"boolean"},disabled:{control:"boolean"},cellRenderer:{control:!1}},args:{inputsSchema:$,configurable:!0,disabled:!1}},P={render:e=>p("div",{children:p(H,{defaultValue:U,...e,tableHeight:"500px"})})},L={render:e=>{const[a,l]=r.useState(U);return p("div",{children:p(H,{...e,tableHeight:"500px",value:a,onChange:t=>l(t)})})}},N={render:e=>p("div",{children:p(H,{...e,tableHeight:"500px"})})},T={render:e=>p("div",{children:p(H,{...e,tableHeight:"500px",cellRenderer:a=>{var l;return((l=a==null?void 0:a.column)==null?void 0:l.field)==="output"?p("div",{style:{paddingLeft:"1rem"},children:p(Re,{disabled:a.disabled,checked:a.value==="true",onChange:t=>{var n;a.onChange(`${(n=t==null?void 0:t.target)==null?void 0:n.checked}`)},children:"Enabled"})}):null}})})},R={render:e=>p("div",{children:p(H,{...e,tableHeight:"500px",defaultValue:{...U,rules:Ge()}})})};var B,X,Q;$.parameters={...$.parameters,docs:{...(B=$.parameters)==null?void 0:B.docs,source:{originalSource:`[{
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
}`,...(re=(ne=L.parameters)==null?void 0:ne.docs)==null?void 0:re.source}}};var ae,se,le;N.parameters={...N.parameters,docs:{...(ae=N.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  render: args => <div>
      <DecisionTable {...args} tableHeight='500px' />
    </div>
}`,...(le=(se=N.parameters)==null?void 0:se.docs)==null?void 0:le.source}}};var oe,ie,ce;T.parameters={...T.parameters,docs:{...(oe=T.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  render: args => <div>
      <DecisionTable {...args} tableHeight='500px' cellRenderer={props => {
      if (props?.column?.field === 'output') {
        return <div style={{
          paddingLeft: '1rem'
        }}>
                <Checkbox disabled={props.disabled} checked={props.value === 'true'} onChange={e => {
            props.onChange(\`\${e?.target?.checked}\`);
          }}>
                  Enabled
                </Checkbox>
              </div>;
      }
      return null;
    }} />
    </div>
}`,...(ce=(ie=T.parameters)==null?void 0:ie.docs)==null?void 0:ce.source}}};var de,ue,pe;R.parameters={...R.parameters,docs:{...(de=R.parameters)==null?void 0:de.docs,source:{originalSource:`{
  render: args => <div>
      <DecisionTable {...args} tableHeight='500px' defaultValue={{
      ...shippingFeesDefault,
      rules: stressRules()
    }} />
    </div>
}`,...(pe=(ue=R.parameters)==null?void 0:ue.docs)==null?void 0:pe.source}}};const Ue=["inputSchemaDefault","Uncontrolled","Controlled","Empty","CustomRenderer","StressTest"];export{L as Controlled,T as CustomRenderer,N as Empty,R as StressTest,P as Uncontrolled,Ue as __namedExportsOrder,Me as default,$ as inputSchemaDefault};
//# sourceMappingURL=dt.stories-5db38ce5.js.map
