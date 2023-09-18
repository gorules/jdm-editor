import{_ as he,u as ge,a as ve,c as R,b as J,d as B,C as le,F as be,D as Ce,T as ye,W as xe,o as Ve,e as K,j as h}from"./index-f9942fbd.js";import{r as n,R as Se}from"./index-f15177ee.js";import{c as oe,H as ie}from"./autosize-text-area-0b51e74b.js";import{u as ce,D as T}from"./dt-70cff9b5.js";import{a as _e}from"./extends-0ea0fc03.js";import"./_commonjsHelpers-de833af9.js";import"./v4-a960c1f4.js";import"./stack-efa65be7.js";var ke=["prefixCls","className","style","checked","disabled","defaultChecked","type","title","onChange"],Ee=n.forwardRef(function(e,r){var s,t=e.prefixCls,a=t===void 0?"rc-checkbox":t,m=e.className,p=e.style,S=e.checked,y=e.disabled,b=e.defaultChecked,f=b===void 0?!1:b,x=e.type,_=x===void 0?"checkbox":x,i=e.title,C=e.onChange,w=he(e,ke),u=n.useRef(null),l=ge(f,{value:S}),k=ve(l,2),E=k[0],V=k[1];n.useImperativeHandle(r,function(){return{focus:function(){var c;(c=u.current)===null||c===void 0||c.focus()},blur:function(){var c;(c=u.current)===null||c===void 0||c.blur()},input:u.current}});var g=R(a,m,(s={},J(s,"".concat(a,"-checked"),E),J(s,"".concat(a,"-disabled"),y),s)),d=function(c){y||("checked"in e||V(c.target.checked),C==null||C({target:B(B({},e),{},{type:_,checked:c.target.checked}),stopPropagation:function(){c.stopPropagation()},preventDefault:function(){c.preventDefault()},nativeEvent:c.nativeEvent}))};return n.createElement("span",{className:g,title:i,style:p},n.createElement("input",_e({},w,{className:"".concat(a,"-input"),ref:u,onChange:d,disabled:y,checked:!!E,type:_})),n.createElement("span",{className:"".concat(a,"-inner")}))});const De=Se.createContext(null),ue=De;var He=globalThis&&globalThis.__rest||function(e,r){var s={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.indexOf(t)<0&&(s[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,t=Object.getOwnPropertySymbols(e);a<t.length;a++)r.indexOf(t[a])<0&&Object.prototype.propertyIsEnumerable.call(e,t[a])&&(s[t[a]]=e[t[a]]);return s};const Oe=(e,r)=>{var s;const{prefixCls:t,className:a,rootClassName:m,children:p,indeterminate:S=!1,style:y,onMouseEnter:b,onMouseLeave:f,skipGroup:x=!1,disabled:_}=e,i=He(e,["prefixCls","className","rootClassName","children","indeterminate","style","onMouseEnter","onMouseLeave","skipGroup","disabled"]),{getPrefixCls:C,direction:w,checkbox:u}=n.useContext(le),l=n.useContext(ue),{isFormItemInput:k}=n.useContext(be),E=n.useContext(Ce),V=(s=(l==null?void 0:l.disabled)||_)!==null&&s!==void 0?s:E,g=n.useRef(i.value);n.useEffect(()=>{l==null||l.registerValue(i.value)},[]),n.useEffect(()=>{if(!x)return i.value!==g.current&&(l==null||l.cancelValue(g.current),l==null||l.registerValue(i.value),g.current=i.value),()=>l==null?void 0:l.cancelValue(i.value)},[i.value]);const d=C("checkbox",t),[D,c]=ce(d),v=Object.assign({},i);l&&!x&&(v.onChange=function(){i.onChange&&i.onChange.apply(i,arguments),l.toggleOption&&l.toggleOption({label:p,value:i.value})},v.name=l.name,v.checked=l.value.includes(i.value));const M=R(`${d}-wrapper`,{[`${d}-rtl`]:w==="rtl",[`${d}-wrapper-checked`]:v.checked,[`${d}-wrapper-disabled`]:V,[`${d}-wrapper-in-form-item`]:k},u==null?void 0:u.className,a,m,c),G=R({[`${d}-indeterminate`]:S},ye,c),I=S?"mixed":void 0;return D(n.createElement(xe,{component:"Checkbox",disabled:V},n.createElement("label",{className:M,style:Object.assign(Object.assign({},u==null?void 0:u.style),y),onMouseEnter:b,onMouseLeave:f},n.createElement(Ee,Object.assign({"aria-checked":I},v,{prefixCls:d,className:G,disabled:V,ref:r})),p!==void 0&&n.createElement("span",null,p))))},we=n.forwardRef(Oe),de=we;var Te=globalThis&&globalThis.__rest||function(e,r){var s={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.indexOf(t)<0&&(s[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,t=Object.getOwnPropertySymbols(e);a<t.length;a++)r.indexOf(t[a])<0&&Object.prototype.propertyIsEnumerable.call(e,t[a])&&(s[t[a]]=e[t[a]]);return s};const Le=(e,r)=>{const{defaultValue:s,children:t,options:a=[],prefixCls:m,className:p,rootClassName:S,style:y,onChange:b}=e,f=Te(e,["defaultValue","children","options","prefixCls","className","rootClassName","style","onChange"]),{getPrefixCls:x,direction:_}=n.useContext(le),[i,C]=n.useState(f.value||s||[]),[w,u]=n.useState([]);n.useEffect(()=>{"value"in f&&C(f.value||[])},[f.value]);const l=n.useMemo(()=>a.map(o=>typeof o=="string"||typeof o=="number"?{label:o,value:o}:o),[a]),k=o=>{u(H=>H.filter(O=>O!==o))},E=o=>{u(H=>[].concat(K(H),[o]))},V=o=>{const H=i.indexOf(o.value),O=K(i);H===-1?O.push(o.value):O.splice(H,1),"value"in f||C(O),b==null||b(O.filter(j=>w.includes(j)).sort((j,fe)=>{const me=l.findIndex(W=>W.value===j),pe=l.findIndex(W=>W.value===fe);return me-pe}))},g=x("checkbox",m),d=`${g}-group`,[D,c]=ce(g),v=Ve(f,["value","disabled"]),M=a.length?l.map(o=>n.createElement(de,{prefixCls:g,key:o.value.toString(),disabled:"disabled"in o?o.disabled:f.disabled,value:o.value,checked:i.includes(o.value),onChange:o.onChange,className:`${d}-item`,style:o.style,title:o.title},o.label)):t,G={toggleOption:V,value:i,disabled:f.disabled,name:f.name,registerValue:E,cancelValue:k},I=R(d,{[`${d}-rtl`]:_==="rtl"},p,S,c);return D(n.createElement("div",Object.assign({className:I,style:y},v,{ref:r}),n.createElement(ue.Provider,{value:G},M)))},$e=n.forwardRef(Le),Ne=n.memo($e),A=de;A.Group=Ne;A.__ANT_CHECKBOX=!0;const Pe=A,F={hitPolicy:"first",inputs:[{id:"HVo_JpALi8",type:"expression",field:"cart.weight",name:"Cart Weight (Kg)"},{id:"HW6mSVfLbs",type:"expression",field:"customer.country",name:"Customer Country"}],outputs:[{field:"shippingFee",id:"3EGDrV0ssV",name:"Shipping Fee",type:"expression"}],rules:[{_id:"qMpJEvcau6",_description:"If weight is above 40kg and country is US, fee is 40",HVo_JpALi8:"> 40",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"40"},{_id:"KC6KqcWiOX",_description:"If weight is above 40kg and any other country, fee is 50",HVo_JpALi8:"> 40",HW6mSVfLbs:"","3EGDrV0ssV":"50"},{_id:"k-zEFSTe7b",_description:"if weight is between 20 and 40kg and country US, fee is 30",HVo_JpALi8:"[20..40]",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"30"},{_id:"c_8VkmGZ_C",_description:"if weight is between 20 and 40kg and any other country, fee is 32",HVo_JpALi8:"[20..40]",HW6mSVfLbs:"","3EGDrV0ssV":"32"},{_id:"e_MyQeTS3V",_description:"if weight is bellow 20kg and country US, fee is 25",HVo_JpALi8:"< 20",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"25"},{_id:"_iU8FNLxHb",_description:"if weight is bellow 20kg, fee is 30",HVo_JpALi8:"< 20",HW6mSVfLbs:"","3EGDrV0ssV":"30"}]},U=[{field:"cart",name:"Cart",items:[{field:"cart.total",name:"Total"},{field:"cart.weight",name:"Weight"}]},{field:"customer",name:"Customer",items:[{field:"customer.country",name:"Country"}]}],Re=()=>{const e=[];for(let r=1e4;r>0;r--)e.push({_id:`${r}`,_description:`${r} description`,HVo_JpALi8:`> ${r}`,HW6mSVfLbs:'"US"',"3EGDrV0ssV":`${r}`});return e},Je={title:"Decision Table",component:T,argTypes:{configurable:{control:"boolean"},disabled:{control:"boolean"},cellRenderer:{control:!1}},args:{inputsSchema:U,configurable:!0,disabled:!1}},L={render:e=>{const[r,s]=n.useState(F),t=n.useMemo(()=>oe(ie),[]);return n.useEffect(()=>{e.value&&s(e.value)},[e.value]),h("div",{style:{height:"100%"},children:h(T,{...e,value:r,manager:t,onChange:a=>{var m;console.log(a),s(a),(m=e==null?void 0:e.onChange)==null||m.call(e,a)},inputsSchema:U,tableHeight:"100%"})})}},$={render:e=>{const r=n.useMemo(()=>oe(ie),[]);return h("div",{style:{height:"100%"},children:h(T,{...e,manager:r,defaultValue:F,onChange:s=>{var t;console.log(s),(t=e==null?void 0:e.onChange)==null||t.call(e,s)},inputsSchema:U,tableHeight:"100%"})})}},N={render:e=>{const[r,s]=n.useState();return h("div",{children:h(T,{...e,tableHeight:"100%",value:r,onChange:t=>s(t),cellRenderer:t=>{var a;return((a=t==null?void 0:t.column)==null?void 0:a.field)==="output"?h("div",{tabIndex:1,style:{paddingLeft:"1rem"},children:h(Pe,{disabled:t.disabled,checked:t.value==="true",onChange:m=>{var p;t.onChange(`${(p=m==null?void 0:m.target)==null?void 0:p.checked}`)},children:"Enabled"})}):null}})})}},P={render:e=>{const[r,s]=n.useState({...F,rules:Re()});return h("div",{style:{height:"100%"},children:h(T,{...e,value:r,onChange:t=>{s(t)},tableHeight:"100%"})})}};var z,q,X;L.parameters={...L.parameters,docs:{...(z=L.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<any>(shippingFeesDefault);
    const manager = useMemo(() => {
      return createDragDropManager(HTML5Backend);
    }, []);
    useEffect(() => {
      if (args.value) {
        setValue(args.value);
      }
    }, [args.value]);
    return <div style={{
      height: '100%'
    }}>
        <DecisionTable {...args} value={value} manager={manager} onChange={val => {
        console.log(val);
        setValue(val);
        args?.onChange?.(val);
      }} inputsSchema={inputSchemaDefault} tableHeight='100%' />
      </div>;
  }
}`,...(X=(q=L.parameters)==null?void 0:q.docs)==null?void 0:X.source}}};var Q,Z,Y;$.parameters={...$.parameters,docs:{...(Q=$.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: args => {
    const manager = useMemo(() => {
      return createDragDropManager(HTML5Backend);
    }, []);
    return <div style={{
      height: '100%'
    }}>
        <DecisionTable {...args} manager={manager} defaultValue={shippingFeesDefault} onChange={val => {
        console.log(val);
        args?.onChange?.(val);
      }} inputsSchema={inputSchemaDefault} tableHeight='100%' />
      </div>;
  }
}`,...(Y=(Z=$.parameters)==null?void 0:Z.docs)==null?void 0:Y.source}}};var ee,te,ne;N.parameters={...N.parameters,docs:{...(ee=N.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<DecisionTableType>();
    return <div>
        <DecisionTable {...args} tableHeight='100%' value={value} onChange={val => setValue(val)} cellRenderer={props => {
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
}`,...(ne=(te=N.parameters)==null?void 0:te.docs)==null?void 0:ne.source}}};var ae,se,re;P.parameters={...P.parameters,docs:{...(ae=P.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<DecisionTableType>({
      ...shippingFeesDefault,
      rules: stressRules()
    });
    return <div style={{
      height: '100%'
    }}>
        <DecisionTable {...args} value={value} onChange={val => {
        setValue(val);
      }} tableHeight='100%' />
      </div>;
  }
}`,...(re=(se=P.parameters)==null?void 0:se.docs)==null?void 0:re.source}}};const Be=["Controlled","Uncontrolled","CustomRenderer","StressTest"];export{L as Controlled,N as CustomRenderer,P as StressTest,$ as Uncontrolled,Be as __namedExportsOrder,Je as default};
//# sourceMappingURL=dt.stories-657ad8aa.js.map
