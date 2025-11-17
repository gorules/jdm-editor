import{j as s}from"./index-CQHSiloJ.js";import{f}from"./index-D5UsiwoX.js";import{r as a}from"./index-DQDNmYQF.js";import{c as p,H as h}from"./expression-DSLvziV5.js";import{D as o,C as b}from"./dg-C3-v5nA5.js";import"./index-DYVtDik4.js";import"./wasm-kHnAwFPG.js";import"./AntdIcon-DRg7Yg7B.js";import"./ce-preview-BQpNd_JX.js";import"./function-NnSqQm-K.js";import"./iframe-Cx-CxS36.js";const m={hitPolicy:"first",inputs:[{id:"HVo_JpALi8",field:"cart.weight",name:"Cart Weight (Kg)"},{id:"HW6mSVfLbs",field:"customer.country",name:"Customer Country"}],outputs:[{field:"shippingFee",id:"3EGDrV0ssV",name:"Shipping Fee"}],rules:[{_id:"qMpJEvcau6",_description:"If weight is above 40kg and country is US, fee is 40",HVo_JpALi8:"> 40",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"40"},{_id:"KC6KqcWiOX",_description:"If weight is above 40kg and any other country, fee is 50",HVo_JpALi8:"> 40",HW6mSVfLbs:"","3EGDrV0ssV":"50"},{_id:"k-zEFSTe7b",_description:"if weight is between 20 and 40kg and country US, fee is 30",HVo_JpALi8:"[20..40]",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"30"},{_id:"c_8VkmGZ_C",_description:"if weight is between 20 and 40kg and any other country, fee is 32",HVo_JpALi8:"[20..40]",HW6mSVfLbs:"","3EGDrV0ssV":"32"},{_id:"e_MyQeTS3V",_description:"if weight is bellow 20kg and country US, fee is 25",HVo_JpALi8:"< 20",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"25"},{_id:"_iU8FNLxHb",_description:"if weight is bellow 20kg, fee is 30",HVo_JpALi8:"< 20",HW6mSVfLbs:"","3EGDrV0ssV":"30"}]},g=[{field:"cart",name:"Cart",items:[{field:"cart.total",name:"Total"},{field:"cart.weight",name:"Weight"}]},{field:"customer",name:"Customer",items:[{field:"customer.country",name:"Country"}]}],V=()=>{const e=[];for(let n=1e4;n>0;n--)e.push({_id:`${n}`,_description:`${n} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,HVo_JpALi8:`> ${n}`,HW6mSVfLbs:'"US"',"3EGDrV0ssV":`${n}`});return e},E={title:"Decision Table",component:o,argTypes:{permission:{control:"select",options:["edit:full","edit:rules","edit:values"]},disabled:{control:"boolean"},cellRenderer:{control:!1}},args:{inputsSchema:g,permission:"edit:full",disabled:!1,onChange:f()}},l={render:e=>{const[n,t]=a.useState(m),r=a.useMemo(()=>p(h),[]);return a.useEffect(()=>{e.value&&t(e.value)},[e.value]),s.jsx("div",{style:{height:"100%"},children:s.jsx(o,{...e,value:n,manager:r,onChange:i=>{console.log(i),t(i),e?.onChange?.(i)},inputsSchema:g,tableHeight:"100%"})})}},u={render:e=>{const n=a.useMemo(()=>p(h),[]);return s.jsx("div",{style:{height:"100%"},children:s.jsx(o,{...e,manager:n,defaultValue:m,onChange:t=>{console.log(t),e?.onChange?.(t)},inputsSchema:g,tableHeight:"100%"})})}},c={render:e=>{const[n,t]=a.useState();return s.jsx("div",{children:s.jsx(o,{...e,tableHeight:"100%",value:n,onChange:r=>t(r),cellRenderer:r=>r?.column?.field==="output"?s.jsx("div",{tabIndex:1,style:{paddingLeft:"1rem"},children:s.jsx(b,{disabled:r.disabled,checked:r.value==="true",onChange:i=>{r.onChange(`${i?.target?.checked}`)},children:"Enabled"})}):null})})}},d={render:e=>{const[n,t]=a.useState({...m,rules:V()});return s.jsx("div",{style:{height:"100%"},children:s.jsx(o,{...e,value:n,onChange:t,tableHeight:"100%"})})}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
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
}`,...u.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}};const j=["Controlled","Uncontrolled","CustomRenderer","StressTest"];export{l as Controlled,c as CustomRenderer,d as StressTest,u as Uncontrolled,j as __namedExportsOrder,E as default};
