import{_ as ge,u as he,c as ve,d as N,f as J,g as B,h as le,i as oe,o as be,k as K,F as Ce,D as xe,l as O,m as ie,j as f,H as ce}from"./dt-cccd43a8.js";import{r as n}from"./index-32a56c20.js";import{_ as ye}from"./extends-b84940d4.js";import"./_commonjsHelpers-042e6b4d.js";import"./v4-a960c1f4.js";var Ve=["prefixCls","className","style","checked","disabled","defaultChecked","type","onChange"],Se=n.forwardRef(function(e,r){var s,t=e.prefixCls,a=t===void 0?"rc-checkbox":t,m=e.className,p=e.style,S=e.checked,C=e.disabled,h=e.defaultChecked,d=h===void 0?!1:h,x=e.type,k=x===void 0?"checkbox":x,o=e.onChange,_=ge(e,Ve),v=n.useRef(null),l=he(d,{value:S}),y=ve(l,2),D=y[0],E=y[1];n.useImperativeHandle(r,function(){return{focus:function(){var c;(c=v.current)===null||c===void 0||c.focus()},blur:function(){var c;(c=v.current)===null||c===void 0||c.blur()},input:v.current}});var V=N(a,m,(s={},J(s,"".concat(a,"-checked"),D),J(s,"".concat(a,"-disabled"),C),s)),u=function(c){C||("checked"in e||E(c.target.checked),o==null||o({target:B(B({},e),{},{type:k,checked:c.target.checked}),stopPropagation:function(){c.stopPropagation()},preventDefault:function(){c.preventDefault()},nativeEvent:c.nativeEvent}))};return n.createElement("span",{className:V,style:p},n.createElement("input",ye({},_,{className:"".concat(a,"-input"),ref:v,onChange:u,disabled:C,checked:!!D,type:k})),n.createElement("span",{className:"".concat(a,"-inner")}))}),ke=globalThis&&globalThis.__rest||function(e,r){var s={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.indexOf(t)<0&&(s[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,t=Object.getOwnPropertySymbols(e);a<t.length;a++)r.indexOf(t[a])<0&&Object.prototype.propertyIsEnumerable.call(e,t[a])&&(s[t[a]]=e[t[a]]);return s};const ue=n.createContext(null),_e=(e,r)=>{var{defaultValue:s,children:t,options:a=[],prefixCls:m,className:p,rootClassName:S,style:C,onChange:h}=e,d=ke(e,["defaultValue","children","options","prefixCls","className","rootClassName","style","onChange"]);const{getPrefixCls:x,direction:k}=n.useContext(le),[o,_]=n.useState(d.value||s||[]),[v,l]=n.useState([]);n.useEffect(()=>{"value"in d&&_(d.value||[])},[d.value]);const y=()=>a.map(i=>typeof i=="string"||typeof i=="number"?{label:i,value:i}:i),D=i=>{l(H=>H.filter(w=>w!==i))},E=i=>{l(H=>[].concat(K(H),[i]))},V=i=>{const H=o.indexOf(i.value),w=K(o);H===-1?w.push(i.value):w.splice(H,1),"value"in d||_(w);const U=y();h==null||h(w.filter(G=>v.includes(G)).sort((G,pe)=>{const fe=U.findIndex(j=>j.value===G),me=U.findIndex(j=>j.value===pe);return fe-me}))},u=x("checkbox",m),b=`${u}-group`,[c,g]=oe(u),M=be(d,["value","disabled"]);a&&a.length>0&&(t=y().map(i=>n.createElement(de,{prefixCls:u,key:i.value.toString(),disabled:"disabled"in i?i.disabled:d.disabled,value:i.value,checked:o.includes(i.value),onChange:i.onChange,className:`${b}-item`,style:i.style},i.label)));const R={toggleOption:V,value:o,disabled:d.disabled,name:d.name,registerValue:E,cancelValue:D},I=N(b,{[`${b}-rtl`]:k==="rtl"},p,S,g);return c(n.createElement("div",Object.assign({className:I,style:C},M,{ref:r}),n.createElement(ue.Provider,{value:R},t)))},De=n.forwardRef(_e),Ee=n.memo(De);var He=globalThis&&globalThis.__rest||function(e,r){var s={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.indexOf(t)<0&&(s[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,t=Object.getOwnPropertySymbols(e);a<t.length;a++)r.indexOf(t[a])<0&&Object.prototype.propertyIsEnumerable.call(e,t[a])&&(s[t[a]]=e[t[a]]);return s};const we=(e,r)=>{var s,{prefixCls:t,className:a,rootClassName:m,children:p,indeterminate:S=!1,style:C,onMouseEnter:h,onMouseLeave:d,skipGroup:x=!1,disabled:k}=e,o=He(e,["prefixCls","className","rootClassName","children","indeterminate","style","onMouseEnter","onMouseLeave","skipGroup","disabled"]);const{getPrefixCls:_,direction:v}=n.useContext(le),l=n.useContext(ue),{isFormItemInput:y}=n.useContext(Ce),D=n.useContext(xe),E=(s=(l==null?void 0:l.disabled)||k)!==null&&s!==void 0?s:D,V=n.useRef(o.value);n.useEffect(()=>{l==null||l.registerValue(o.value)},[]),n.useEffect(()=>{if(!x)return o.value!==V.current&&(l==null||l.cancelValue(V.current),l==null||l.registerValue(o.value),V.current=o.value),()=>l==null?void 0:l.cancelValue(o.value)},[o.value]);const u=_("checkbox",t),[b,c]=oe(u),g=Object.assign({},o);l&&!x&&(g.onChange=function(){o.onChange&&o.onChange.apply(o,arguments),l.toggleOption&&l.toggleOption({label:p,value:o.value})},g.name=l.name,g.checked=l.value.includes(o.value));const M=N({[`${u}-wrapper`]:!0,[`${u}-rtl`]:v==="rtl",[`${u}-wrapper-checked`]:g.checked,[`${u}-wrapper-disabled`]:E,[`${u}-wrapper-in-form-item`]:y},a,m,c),R=N({[`${u}-indeterminate`]:S},c),I=S?"mixed":void 0;return b(n.createElement("label",{className:M,style:C,onMouseEnter:h,onMouseLeave:d},n.createElement(Se,Object.assign({"aria-checked":I},g,{prefixCls:u,className:R,disabled:E,ref:r})),p!==void 0&&n.createElement("span",null,p)))},Oe=n.forwardRef(we),de=Oe,A=de;A.Group=Ee;A.__ANT_CHECKBOX=!0;const Le=A,W={hitPolicy:"first",inputs:[{id:"HVo_JpALi8",type:"expression",field:"cart.weight",name:"Cart Weight (Kg)"},{id:"HW6mSVfLbs",type:"expression",field:"customer.country",name:"Customer Country"}],outputs:[{field:"shippingFee",id:"3EGDrV0ssV",name:"Shipping Fee",type:"expression"}],rules:[{_id:"qMpJEvcau6",_description:"If weight is above 40kg and country is US, fee is 40",HVo_JpALi8:"> 40",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"40"},{_id:"KC6KqcWiOX",_description:"If weight is above 40kg and any other country, fee is 50",HVo_JpALi8:"> 40",HW6mSVfLbs:"","3EGDrV0ssV":"50"},{_id:"k-zEFSTe7b",_description:"if weight is between 20 and 40kg and country US, fee is 30",HVo_JpALi8:"[20..40]",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"30"},{_id:"c_8VkmGZ_C",_description:"if weight is between 20 and 40kg and any other country, fee is 32",HVo_JpALi8:"[20..40]",HW6mSVfLbs:"","3EGDrV0ssV":"32"},{_id:"e_MyQeTS3V",_description:"if weight is bellow 20kg and country US, fee is 25",HVo_JpALi8:"< 20",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"25"},{_id:"_iU8FNLxHb",_description:"if weight is bellow 20kg, fee is 30",HVo_JpALi8:"< 20",HW6mSVfLbs:"","3EGDrV0ssV":"30"}]},F=[{field:"cart",name:"Cart",items:[{field:"cart.total",name:"Total"},{field:"cart.weight",name:"Weight"}]},{field:"customer",name:"Customer",items:[{field:"customer.country",name:"Country"}]}],Te=()=>{const e=[];for(let r=1e4;r>0;r--)e.push({_id:`${r}`,_description:`${r} description`,HVo_JpALi8:`> ${r}`,HW6mSVfLbs:'"US"',"3EGDrV0ssV":`${r}`});return e},Ie={title:"Decision Table",component:O,argTypes:{configurable:{control:"boolean"},disabled:{control:"boolean"},cellRenderer:{control:!1}},args:{inputsSchema:F,configurable:!0,disabled:!1}},L={render:e=>{const[r,s]=n.useState(W),t=n.useMemo(()=>ie(ce),[]);return f("div",{children:f(O,{...e,value:r,manager:t,onChange:a=>{s(a)},inputsSchema:F,tableHeight:"500px"})})}},T={render:e=>{const r=n.useMemo(()=>ie(ce),[]);return f("div",{children:f(O,{...e,manager:r,defaultValue:W,onChange:s=>{console.log(s)},inputsSchema:F,tableHeight:"500px"})})}},$={render:e=>{const[r,s]=n.useState();return f("div",{children:f(O,{...e,tableHeight:"500px",value:r,onChange:t=>s(t),cellRenderer:t=>{var a;return((a=t==null?void 0:t.column)==null?void 0:a.field)==="output"?f("div",{tabIndex:1,style:{paddingLeft:"1rem"},children:f(Le,{disabled:t.disabled,checked:t.value==="true",onChange:m=>{var p;t.onChange(`${(p=m==null?void 0:m.target)==null?void 0:p.checked}`)},children:"Enabled"})}):null}})})}},P={render:e=>{const[r,s]=n.useState({...W,rules:Te()});return f("div",{children:f(O,{...e,value:r,onChange:t=>{s(t)},tableHeight:"500px"})})}};var z,q,X;L.parameters={...L.parameters,docs:{...(z=L.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<any>(shippingFeesDefault);
    const manager = useMemo(() => {
      return createDragDropManager(HTML5Backend);
    }, []);
    return <div>
        <DecisionTable {...args} value={value} manager={manager} onChange={val => {
        setValue(val);
      }} inputsSchema={inputSchemaDefault} tableHeight='500px' />
      </div>;
  }
}`,...(X=(q=L.parameters)==null?void 0:q.docs)==null?void 0:X.source}}};var Q,Z,Y;T.parameters={...T.parameters,docs:{...(Q=T.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: args => {
    const manager = useMemo(() => {
      return createDragDropManager(HTML5Backend);
    }, []);
    return <div>
        <DecisionTable {...args} manager={manager} defaultValue={shippingFeesDefault} onChange={val => {
        console.log(val);
      }} inputsSchema={inputSchemaDefault} tableHeight='500px' />
      </div>;
  }
}`,...(Y=(Z=T.parameters)==null?void 0:Z.docs)==null?void 0:Y.source}}};var ee,te,ne;$.parameters={...$.parameters,docs:{...(ee=$.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<DecisionTableType>();
    return <div>
        <DecisionTable {...args} tableHeight='500px' value={value} onChange={val => setValue(val)} cellRenderer={props => {
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
      </div>;
  }
}`,...(ne=(te=$.parameters)==null?void 0:te.docs)==null?void 0:ne.source}}};var ae,re,se;P.parameters={...P.parameters,docs:{...(ae=P.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<DecisionTableType>({
      ...shippingFeesDefault,
      rules: stressRules()
    });
    return <div>
        <DecisionTable {...args} value={value} onChange={val => {
        setValue(val);
      }} tableHeight='500px' />
      </div>;
  }
}`,...(se=(re=P.parameters)==null?void 0:re.docs)==null?void 0:se.source}}};const Ge=["Controlled","Uncontrolled","CustomRenderer","StressTest"];export{L as Controlled,$ as CustomRenderer,P as StressTest,T as Uncontrolled,Ge as __namedExportsOrder,Ie as default};
//# sourceMappingURL=dt.stories-1dcaf7c7.js.map
