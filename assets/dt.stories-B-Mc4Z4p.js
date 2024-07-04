import{j as s}from"./index-B6ko2aXS.js";import{r as o}from"./index-CDs2tPxN.js";import{D as l,c as T,H as k}from"./dg-Dak_JmlZ.js";import{C as E}from"./index-DiBj3S__.js";import"./extends-CCbyfPlC.js";import"./index-7f_Nov5Q.js";import"./index-PP-caPqo.js";import"./libs-wFGM0RW6.js";import"./ce-1EWFs3kT.js";import"./iframe-CkO7XtU2.js";import"../sb-preview/runtime.js";const p={hitPolicy:"first",inputs:[{id:"HVo_JpALi8",type:"expression",field:"cart.weight",name:"Cart Weight (Kg)"},{id:"HW6mSVfLbs",type:"expression",field:"customer.country",name:"Customer Country"}],outputs:[{field:"shippingFee",id:"3EGDrV0ssV",name:"Shipping Fee",type:"expression"}],rules:[{_id:"qMpJEvcau6",_description:"If weight is above 40kg and country is US, fee is 40",HVo_JpALi8:"> 40",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"40"},{_id:"KC6KqcWiOX",_description:"If weight is above 40kg and any other country, fee is 50",HVo_JpALi8:"> 40",HW6mSVfLbs:"","3EGDrV0ssV":"50"},{_id:"k-zEFSTe7b",_description:"if weight is between 20 and 40kg and country US, fee is 30",HVo_JpALi8:"[20..40]",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"30"},{_id:"c_8VkmGZ_C",_description:"if weight is between 20 and 40kg and any other country, fee is 32",HVo_JpALi8:"[20..40]",HW6mSVfLbs:"","3EGDrV0ssV":"32"},{_id:"e_MyQeTS3V",_description:"if weight is bellow 20kg and country US, fee is 25",HVo_JpALi8:"< 20",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"25"},{_id:"_iU8FNLxHb",_description:"if weight is bellow 20kg, fee is 30",HVo_JpALi8:"< 20",HW6mSVfLbs:"","3EGDrV0ssV":"30"}]},g=[{field:"cart",name:"Cart",items:[{field:"cart.total",name:"Total"},{field:"cart.weight",name:"Weight"}]},{field:"customer",name:"Customer",items:[{field:"customer.country",name:"Country"}]}],j=()=>{const e=[];for(let n=1e4;n>0;n--)e.push({_id:`${n}`,_description:`${n} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,HVo_JpALi8:`> ${n}`,HW6mSVfLbs:'"US"',"3EGDrV0ssV":`${n}`});return e},q={title:"Decision Table",component:l,argTypes:{configurable:{control:"boolean"},disabled:{control:"boolean"},cellRenderer:{control:!1}},args:{inputsSchema:g,configurable:!0,disabled:!1}},u={render:e=>{const[n,a]=o.useState(p),t=o.useMemo(()=>T(k),[]);return o.useEffect(()=>{e.value&&a(e.value)},[e.value]),s.jsx("div",{style:{height:"100%"},children:s.jsx(l,{...e,value:n,manager:t,onChange:r=>{var i;console.log(r),a(r),(i=e==null?void 0:e.onChange)==null||i.call(e,r)},inputsSchema:g,tableHeight:"100%"})})}},c={render:e=>{const n=o.useMemo(()=>T(k),[]);return s.jsx("div",{style:{height:"100%"},children:s.jsx(l,{...e,manager:n,defaultValue:p,onChange:a=>{var t;console.log(a),(t=e==null?void 0:e.onChange)==null||t.call(e,a)},inputsSchema:g,tableHeight:"100%"})})}},d={render:e=>{const[n,a]=o.useState();return s.jsx("div",{children:s.jsx(l,{...e,tableHeight:"100%",value:n,onChange:t=>a(t),cellRenderer:t=>{var r;return((r=t==null?void 0:t.column)==null?void 0:r.field)==="output"?s.jsx("div",{tabIndex:1,style:{paddingLeft:"1rem"},children:s.jsx(E,{disabled:t.disabled,checked:t.value==="true",onChange:i=>{var h;t.onChange(`${(h=i==null?void 0:i.target)==null?void 0:h.checked}`)},children:"Enabled"})}):null}})})}},m={render:e=>{const[n,a]=o.useState({...p,rules:j()});return s.jsx("div",{style:{height:"100%"},children:s.jsx(l,{...e,value:n,onChange:a,tableHeight:"100%"})})}};var f,b,V;u.parameters={...u.parameters,docs:{...(f=u.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
}`,...(V=(b=u.parameters)==null?void 0:b.docs)==null?void 0:V.source}}};var v,S,C;c.parameters={...c.parameters,docs:{...(v=c.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(C=(S=c.parameters)==null?void 0:S.docs)==null?void 0:C.source}}};var D,H,y;d.parameters={...d.parameters,docs:{...(D=d.parameters)==null?void 0:D.docs,source:{originalSource:`{
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
}`,...(y=(H=d.parameters)==null?void 0:H.docs)==null?void 0:y.source}}};var _,x,L;m.parameters={...m.parameters,docs:{...(_=m.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<DecisionTableType>({
      ...shippingFeesDefault,
      rules: stressRules()
    });
    return <div style={{
      height: '100%'
    }}>
        <DecisionTable {...args} value={value} onChange={setValue} tableHeight='100%' />
      </div>;
  }
}`,...(L=(x=m.parameters)==null?void 0:x.docs)==null?void 0:L.source}}};const B=["Controlled","Uncontrolled","CustomRenderer","StressTest"];export{u as Controlled,d as CustomRenderer,m as StressTest,c as Uncontrolled,B as __namedExportsOrder,q as default};
