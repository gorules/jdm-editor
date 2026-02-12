import{j as a}from"./index-CQHSiloJ.js";import{f as b}from"./index-D5UsiwoX.js";import{r as i}from"./index-DQDNmYQF.js";import{c as v,H as f}from"./expression-DZXkK6qR.js";import{J as S}from"./focus-helper-ZxZ0PQkW.js";import{D as o,C as V}from"./dg-ByBjAICX.js";import"./index-DYVtDik4.js";import"./index-BPZMdQjL.js";import"./index-CMwgERd7.js";import"./index-Bc_E4zOA.js";import"./ce-base-WZGwKeKc.js";import"./ce-preview-CIH6EqRd.js";import"./Overflow-BaFppTl7.js";import"./AntdIcon-BVylpbbH.js";import"./expression-builder-D6cHjOBB.js";import"./standard-expression-builder-0Gn6QVNj.js";import"./function-CiaOffue.js";import"./iframe-CTPj7P8y.js";const l={hitPolicy:"first",inputs:[{id:"HVo_JpALi8",field:"cart.weight",name:"Cart Weight (Kg)"},{id:"HW6mSVfLbs",field:"customer.country",name:"Customer Country"}],outputs:[{field:"shippingFee",id:"3EGDrV0ssV",name:"Shipping Fee"}],rules:[{_id:"qMpJEvcau6",_description:"If weight is above 40kg and country is US, fee is 40",HVo_JpALi8:"> 40",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"40"},{_id:"KC6KqcWiOX",_description:"If weight is above 40kg and any other country, fee is 50",HVo_JpALi8:"> 40",HW6mSVfLbs:"","3EGDrV0ssV":"50"},{_id:"k-zEFSTe7b",_description:"if weight is between 20 and 40kg and country US, fee is 30",HVo_JpALi8:"[20..40]",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"30"},{_id:"c_8VkmGZ_C",_description:"if weight is between 20 and 40kg and any other country, fee is 32",HVo_JpALi8:"[20..40]",HW6mSVfLbs:"","3EGDrV0ssV":"32"},{_id:"e_MyQeTS3V",_description:"if weight is bellow 20kg and country US, fee is 25",HVo_JpALi8:"< 20",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"25"},{_id:"_iU8FNLxHb",_description:"if weight is bellow 20kg, fee is 30",HVo_JpALi8:"< 20",HW6mSVfLbs:"","3EGDrV0ssV":"30"}]},u=[{field:"cart",name:"Cart",items:[{field:"cart.total",name:"Total"},{field:"cart.weight",name:"Weight"}]},{field:"customer",name:"Customer",items:[{field:"customer.country",name:"Country"}]}],C=()=>{const e=[];for(let n=1e4;n>0;n--)e.push({_id:`${n}`,_description:`${n} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,HVo_JpALi8:`> ${n}`,HW6mSVfLbs:'"US"',"3EGDrV0ssV":`${n}`});return e},G={title:"Decision Table",component:o,argTypes:{permission:{control:"select",options:["edit:full","edit:rules","edit:values"]},mode:{control:"select",options:["dev","business"]},disabled:{control:"boolean"},cellRenderer:{control:!1}},args:{inputsSchema:u,permission:"edit:full",mode:"dev",disabled:!1,onChange:b()}},c={render:e=>{const[n,s]=i.useState(l),r=i.useMemo(()=>v(f),[]);return i.useEffect(()=>{e.value&&s(e.value)},[e.value]),a.jsx("div",{style:{height:"100%"},children:a.jsx(o,{...e,value:n,manager:r,onChange:t=>{console.log(t),s(t),e?.onChange?.(t)},inputsSchema:u,tableHeight:"100%"})})}},d={render:e=>{const n=i.useMemo(()=>v(f),[]);return a.jsx("div",{style:{height:"100%"},children:a.jsx(o,{...e,manager:n,defaultValue:l,onChange:s=>{console.log(s),e?.onChange?.(s)},inputsSchema:u,tableHeight:"100%"})})}},g={render:e=>{const[n,s]=i.useState();return a.jsx("div",{children:a.jsx(o,{...e,tableHeight:"100%",value:n,onChange:r=>s(r),cellRenderer:r=>r?.column?.field==="output"?a.jsx("div",{tabIndex:1,style:{paddingLeft:"1rem"},children:a.jsx(V,{disabled:r.disabled,checked:r.value==="true",onChange:t=>{r.onChange(`${t?.target?.checked}`)},children:"Enabled"})}):null})})}},m={render:e=>{const[n,s]=i.useState({...l,rules:C()});return a.jsx("div",{style:{height:"100%"},children:a.jsx(o,{...e,value:n,onChange:s,tableHeight:"100%"})})}},p={args:{mode:"business"},render:e=>{const[n,s]=i.useState(l),r=i.useMemo(()=>v(f),[]);return a.jsx("div",{style:{height:"100%"},children:a.jsx(o,{...e,value:n,manager:r,onChange:t=>{console.log(t),s(t),e?.onChange?.(t)},inputsSchema:u,tableHeight:"100%"})})}},D={country:[{label:"United States",value:"US"},{label:"Canada",value:"CA"},{label:"Mexico",value:"MX"},{label:"United Kingdom",value:"UK"}],orderStatus:[{label:"Pending",value:"pending"},{label:"Processing",value:"processing"},{label:"Shipped",value:"shipped"},{label:"Delivered",value:"delivered"},{label:"Cancelled",value:"cancelled"}]},y={...l,inputs:[{id:"HVo_JpALi8",field:"cart.weight",name:"Cart Weight (Kg)",fieldType:{type:"number"}},{id:"HW6mSVfLbs",field:"customer.country",name:"Customer Country",fieldType:{type:"string",enum:{type:"ref",ref:"country"}}}]},h={args:{mode:"business"},render:e=>{const[n,s]=i.useState(y),r=i.useMemo(()=>v(f),[]);return a.jsx(S,{dictionaries:D,children:a.jsx("div",{style:{height:"100%"},children:a.jsx(o,{...e,value:n,manager:r,onChange:t=>{console.log(t),s(t),e?.onChange?.(t)},inputsSchema:u,tableHeight:"100%"})})})}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    mode: 'business'
  },
  render: args => {
    const [value, setValue] = useState<any>(shippingFeesDefault);
    const manager = useMemo(() => {
      return createDragDropManager(HTML5Backend);
    }, []);
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
}`,...p.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    mode: 'business'
  },
  render: args => {
    const [value, setValue] = useState<any>(shippingFeesWithDictionaries);
    const manager = useMemo(() => {
      return createDragDropManager(HTML5Backend);
    }, []);
    return <JdmConfigProvider dictionaries={DICTIONARIES}>
        <div style={{
        height: '100%'
      }}>
          <DecisionTable {...args} value={value} manager={manager} onChange={val => {
          console.log(val);
          setValue(val);
          args?.onChange?.(val);
        }} inputsSchema={inputSchemaDefault} tableHeight='100%' />
        </div>
      </JdmConfigProvider>;
  }
}`,...h.parameters?.docs?.source}}};const K=["Controlled","Uncontrolled","CustomRenderer","StressTest","BusinessMode","BusinessModeDictionaries"];export{p as BusinessMode,h as BusinessModeDictionaries,c as Controlled,g as CustomRenderer,m as StressTest,d as Uncontrolled,K as __namedExportsOrder,G as default};
