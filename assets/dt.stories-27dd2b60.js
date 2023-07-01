import{_ as ke,u as Se,c as Ee,d as G,f as K,g as z,h as be,i as ve,o as De,k as q,F as we,D as He,l as V,j as u}from"./dt-11665ec9.js";import{r}from"./index-32a56c20.js";import{_ as Oe}from"./extends-b84940d4.js";import"./_commonjsHelpers-042e6b4d.js";import"./v4-a960c1f4.js";var $e=["prefixCls","className","style","checked","disabled","defaultChecked","type","onChange"],Ne=r.forwardRef(function(e,a){var o,t=e.prefixCls,n=t===void 0?"rc-checkbox":t,O=e.className,b=e.style,_=e.checked,v=e.disabled,m=e.defaultChecked,p=m===void 0?!1:m,C=e.type,k=C===void 0?"checkbox":C,l=e.onChange,S=ke(e,$e),g=r.useRef(null),s=Se(p,{value:_}),x=Ee(s,2),E=x[0],D=x[1];r.useImperativeHandle(a,function(){return{focus:function(){var c;(c=g.current)===null||c===void 0||c.focus()},blur:function(){var c;(c=g.current)===null||c===void 0||c.blur()},input:g.current}});var y=G(n,O,(o={},K(o,"".concat(n,"-checked"),E),K(o,"".concat(n,"-disabled"),v),o)),d=function(c){v||("checked"in e||D(c.target.checked),l==null||l({target:z(z({},e),{},{type:k,checked:c.target.checked}),stopPropagation:function(){c.stopPropagation()},preventDefault:function(){c.preventDefault()},nativeEvent:c.nativeEvent}))};return r.createElement("span",{className:y,style:b},r.createElement("input",Oe({},S,{className:"".concat(n,"-input"),ref:g,onChange:d,disabled:v,checked:!!E,type:k})),r.createElement("span",{className:"".concat(n,"-inner")}))}),Pe=globalThis&&globalThis.__rest||function(e,a){var o={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&a.indexOf(t)<0&&(o[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(e);n<t.length;n++)a.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(e,t[n])&&(o[t[n]]=e[t[n]]);return o};const Ce=r.createContext(null),Le=(e,a)=>{var{defaultValue:o,children:t,options:n=[],prefixCls:O,className:b,rootClassName:_,style:v,onChange:m}=e,p=Pe(e,["defaultValue","children","options","prefixCls","className","rootClassName","style","onChange"]);const{getPrefixCls:C,direction:k}=r.useContext(be),[l,S]=r.useState(p.value||o||[]),[g,s]=r.useState([]);r.useEffect(()=>{"value"in p&&S(p.value||[])},[p.value]);const x=()=>n.map(i=>typeof i=="string"||typeof i=="number"?{label:i,value:i}:i),E=i=>{s(w=>w.filter(H=>H!==i))},D=i=>{s(w=>[].concat(q(w),[i]))},y=i=>{const w=l.indexOf(i.value),H=q(l);w===-1?H.push(i.value):H.splice(w,1),"value"in p||S(H);const B=x();m==null||m(H.filter(A=>g.includes(A)).sort((A,ye)=>{const Ve=B.findIndex(F=>F.value===A),_e=B.findIndex(F=>F.value===ye);return Ve-_e}))},d=C("checkbox",O),h=`${d}-group`,[c,f]=ve(d),j=De(p,["value","disabled"]);n&&n.length>0&&(t=x().map(i=>r.createElement(xe,{prefixCls:d,key:i.value.toString(),disabled:"disabled"in i?i.disabled:p.disabled,value:i.value,checked:l.includes(i.value),onChange:i.onChange,className:`${h}-item`,style:i.style},i.label)));const M={toggleOption:y,value:l,disabled:p.disabled,name:p.name,registerValue:D,cancelValue:E},W=G(h,{[`${h}-rtl`]:k==="rtl"},b,_,f);return c(r.createElement("div",Object.assign({className:W,style:v},j,{ref:a}),r.createElement(Ce.Provider,{value:M},t)))},Te=r.forwardRef(Le),Re=r.memo(Te);var Ie=globalThis&&globalThis.__rest||function(e,a){var o={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&a.indexOf(t)<0&&(o[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(e);n<t.length;n++)a.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(e,t[n])&&(o[t[n]]=e[t[n]]);return o};const Ge=(e,a)=>{var o,{prefixCls:t,className:n,rootClassName:O,children:b,indeterminate:_=!1,style:v,onMouseEnter:m,onMouseLeave:p,skipGroup:C=!1,disabled:k}=e,l=Ie(e,["prefixCls","className","rootClassName","children","indeterminate","style","onMouseEnter","onMouseLeave","skipGroup","disabled"]);const{getPrefixCls:S,direction:g}=r.useContext(be),s=r.useContext(Ce),{isFormItemInput:x}=r.useContext(we),E=r.useContext(He),D=(o=(s==null?void 0:s.disabled)||k)!==null&&o!==void 0?o:E,y=r.useRef(l.value);r.useEffect(()=>{s==null||s.registerValue(l.value)},[]),r.useEffect(()=>{if(!C)return l.value!==y.current&&(s==null||s.cancelValue(y.current),s==null||s.registerValue(l.value),y.current=l.value),()=>s==null?void 0:s.cancelValue(l.value)},[l.value]);const d=S("checkbox",t),[h,c]=ve(d),f=Object.assign({},l);s&&!C&&(f.onChange=function(){l.onChange&&l.onChange.apply(l,arguments),s.toggleOption&&s.toggleOption({label:b,value:l.value})},f.name=s.name,f.checked=s.value.includes(l.value));const j=G({[`${d}-wrapper`]:!0,[`${d}-rtl`]:g==="rtl",[`${d}-wrapper-checked`]:f.checked,[`${d}-wrapper-disabled`]:D,[`${d}-wrapper-in-form-item`]:x},n,O,c),M=G({[`${d}-indeterminate`]:_},c),W=_?"mixed":void 0;return h(r.createElement("label",{className:j,style:v,onMouseEnter:m,onMouseLeave:p},r.createElement(Ne,Object.assign({"aria-checked":W},f,{prefixCls:d,className:M,disabled:D,ref:a})),b!==void 0&&r.createElement("span",null,b)))},je=r.forwardRef(Ge),xe=je,U=xe;U.Group=Re;U.__ANT_CHECKBOX=!0;const Me=U,J={hitPolicy:"first",inputs:[{id:"HVo_JpALi8",type:"expression",field:"cart.weight",name:"Cart Weight (Kg)"},{id:"HW6mSVfLbs",type:"expression",field:"customer.country",name:"Customer Country"}],outputs:[{field:"shippingFee",id:"3EGDrV0ssV",name:"Shipping Fee",type:"expression"}],rules:[{_id:"qMpJEvcau6",_description:"If weight is above 40kg and country is US, fee is 40",HVo_JpALi8:"> 40",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"40"},{_id:"KC6KqcWiOX",_description:"If weight is above 40kg and any other country, fee is 50",HVo_JpALi8:"> 40",HW6mSVfLbs:"","3EGDrV0ssV":"50"},{_id:"k-zEFSTe7b",_description:"if weight is between 20 and 40kg and country US, fee is 30",HVo_JpALi8:"[20..40]",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"30"},{_id:"c_8VkmGZ_C",_description:"if weight is between 20 and 40kg and any other country, fee is 32",HVo_JpALi8:"[20..40]",HW6mSVfLbs:"","3EGDrV0ssV":"32"},{_id:"e_MyQeTS3V",_description:"if weight is bellow 20kg and country US, fee is 25",HVo_JpALi8:"< 20",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"25"},{_id:"_iU8FNLxHb",_description:"if weight is bellow 20kg, fee is 30",HVo_JpALi8:"< 20",HW6mSVfLbs:"","3EGDrV0ssV":"30"}]},$=[{field:"cart",name:"Cart",items:[{field:"cart.total",name:"Total"},{field:"cart.weight",name:"Weight"}]},{field:"customer",name:"Customer",items:[{field:"customer.country",name:"Country"}]}],We=()=>{const e=[];for(let a=1e4;a>0;a--)e.push({_id:`${a}`,_description:`${a} description`,HVo_JpALi8:`> ${a}`,HW6mSVfLbs:'"US"',"3EGDrV0ssV":`${a}`});return e},Ke={title:"Decision Table",component:V,argTypes:{configurable:{control:"boolean"},disabled:{control:"boolean"},cellRenderer:{control:!1}},args:{inputsSchema:$,configurable:!0,disabled:!1}},N={render:e=>u("div",{children:u(V,{defaultValue:J,...e,tableHeight:"500px"})})},P={render:e=>{const[a,o]=r.useState(J);return u("div",{children:u(V,{...e,tableHeight:"500px",value:a,onChange:t=>o(t)})})}},L={render:e=>u("div",{children:u(V,{...e,tableHeight:"500px",mountDialogsOnBody:!1})})},T={render:e=>u("div",{children:u(V,{...e,tableHeight:"500px"})})},R={render:e=>u("div",{children:u(V,{...e,tableHeight:"500px",cellRenderer:a=>{var o;return((o=a==null?void 0:a.column)==null?void 0:o.field)==="output"?u("div",{tabIndex:1,style:{paddingLeft:"1rem"},children:u(Me,{disabled:a.disabled,checked:a.value==="true",onChange:t=>{var n;a.onChange(`${(n=t==null?void 0:t.target)==null?void 0:n.checked}`)},children:"Enabled"})}):null}})})},I={render:e=>u("div",{children:u(V,{...e,tableHeight:"500px",defaultValue:{...J,rules:We()}})})};var X,Q,Z;$.parameters={...$.parameters,docs:{...(X=$.parameters)==null?void 0:X.docs,source:{originalSource:`[{
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
}]`,...(Z=(Q=$.parameters)==null?void 0:Q.docs)==null?void 0:Z.source}}};var Y,ee,te;N.parameters={...N.parameters,docs:{...(Y=N.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: args => {
    return <div>
        <DecisionTable defaultValue={shippingFeesDefault} {...args} tableHeight='500px' />
      </div>;
  }
}`,...(te=(ee=N.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};var ne,re,ae;P.parameters={...P.parameters,docs:{...(ne=P.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<DecisionTableProps>(shippingFeesDefault);
    return <div>
        <DecisionTable {...args} tableHeight='500px' value={value} onChange={val => setValue(val)} />
      </div>;
  }
}`,...(ae=(re=P.parameters)==null?void 0:re.docs)==null?void 0:ae.source}}};var se,oe,le;L.parameters={...L.parameters,docs:{...(se=L.parameters)==null?void 0:se.docs,source:{originalSource:`{
  render: args => {
    return <div>
        <DecisionTable {...args} tableHeight='500px' mountDialogsOnBody={false} />
      </div>;
  }
}`,...(le=(oe=L.parameters)==null?void 0:oe.docs)==null?void 0:le.source}}};var ie,ce,de;T.parameters={...T.parameters,docs:{...(ie=T.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  render: args => <div>
      <DecisionTable {...args} tableHeight='500px' />
    </div>
}`,...(de=(ce=T.parameters)==null?void 0:ce.docs)==null?void 0:de.source}}};var ue,pe,fe;R.parameters={...R.parameters,docs:{...(ue=R.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  render: args => <div>
      <DecisionTable {...args} tableHeight='500px' cellRenderer={props => {
      if (props?.column?.field === 'output') {
        return <div tabIndex={1} style={{
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
}`,...(fe=(pe=R.parameters)==null?void 0:pe.docs)==null?void 0:fe.source}}};var me,ge,he;I.parameters={...I.parameters,docs:{...(me=I.parameters)==null?void 0:me.docs,source:{originalSource:`{
  render: args => <div>
      <DecisionTable {...args} tableHeight='500px' defaultValue={{
      ...shippingFeesDefault,
      rules: stressRules()
    }} />
    </div>
}`,...(he=(ge=I.parameters)==null?void 0:ge.docs)==null?void 0:he.source}}};const ze=["inputSchemaDefault","Uncontrolled","Controlled","NonBodyDialogsMount","Empty","CustomRenderer","StressTest"];export{P as Controlled,R as CustomRenderer,T as Empty,L as NonBodyDialogsMount,I as StressTest,N as Uncontrolled,ze as __namedExportsOrder,Ke as default,$ as inputSchemaDefault};
//# sourceMappingURL=dt.stories-27dd2b60.js.map
