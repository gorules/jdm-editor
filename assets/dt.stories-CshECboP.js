import{j as t}from"./index-CQHSiloJ.js";import{f}from"./index-D5UsiwoX.js";import{r as s}from"./index-DQDNmYQF.js";import{c as p,H as h}from"./confirm-action-C-ZPzkj0.js";import{D as i}from"./dt-DirZpegV.js";import{C as b}from"./index-DKO4XAzh.js";import"./index-DYVtDik4.js";import"./AntdIcon-BaFxb7gP.js";import"./wasm-CV8Fw14A.js";import"./ce-preview-D4sMzfhR.js";import"./index.module-ZOgNCbuj.js";const m={hitPolicy:"first",inputs:[{id:"HVo_JpALi8",field:"cart.weight",name:"Cart Weight (Kg)"},{id:"HW6mSVfLbs",field:"customer.country",name:"Customer Country"}],outputs:[{field:"shippingFee",id:"3EGDrV0ssV",name:"Shipping Fee"}],rules:[{_id:"qMpJEvcau6",_description:"If weight is above 40kg and country is US, fee is 40",HVo_JpALi8:"> 40",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"40"},{_id:"KC6KqcWiOX",_description:"If weight is above 40kg and any other country, fee is 50",HVo_JpALi8:"> 40",HW6mSVfLbs:"","3EGDrV0ssV":"50"},{_id:"k-zEFSTe7b",_description:"if weight is between 20 and 40kg and country US, fee is 30",HVo_JpALi8:"[20..40]",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"30"},{_id:"c_8VkmGZ_C",_description:"if weight is between 20 and 40kg and any other country, fee is 32",HVo_JpALi8:"[20..40]",HW6mSVfLbs:"","3EGDrV0ssV":"32"},{_id:"e_MyQeTS3V",_description:"if weight is bellow 20kg and country US, fee is 25",HVo_JpALi8:"< 20",HW6mSVfLbs:'"US"',"3EGDrV0ssV":"25"},{_id:"_iU8FNLxHb",_description:"if weight is bellow 20kg, fee is 30",HVo_JpALi8:"< 20",HW6mSVfLbs:"","3EGDrV0ssV":"30"}]},g=[{field:"cart",name:"Cart",items:[{field:"cart.total",name:"Total"},{field:"cart.weight",name:"Weight"}]},{field:"customer",name:"Customer",items:[{field:"customer.country",name:"Country"}]}],V=()=>{const e=[];for(let n=1e4;n>0;n--)e.push({_id:`${n}`,_description:`${n} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,HVo_JpALi8:`> ${n}`,HW6mSVfLbs:'"US"',"3EGDrV0ssV":`${n}`});return e},E={title:"Decision Table",component:i,argTypes:{configurable:{control:"boolean"},disabled:{control:"boolean"},inputData:{control:"object"},cellRenderer:{control:!1}},args:{inputsSchema:g,configurable:!0,disabled:!1,inputData:{cart:{weight:100,total:100},customer:{country:"US",firstName:"John",lastName:"Doe"}},onChange:f()}},l={render:e=>{const[n,a]=s.useState(m),r=s.useMemo(()=>p(h),[]);return s.useEffect(()=>{e.value&&a(e.value)},[e.value]),t.jsx("div",{style:{height:"100%"},children:t.jsx(i,{...e,value:n,manager:r,onChange:o=>{console.log(o),a(o),e?.onChange?.(o)},inputsSchema:g,tableHeight:"100%"})})}},u={render:e=>{const n=s.useMemo(()=>p(h),[]);return t.jsx("div",{style:{height:"100%"},children:t.jsx(i,{...e,manager:n,defaultValue:m,onChange:a=>{console.log(a),e?.onChange?.(a)},inputsSchema:g,tableHeight:"100%"})})}},c={render:e=>{const[n,a]=s.useState();return t.jsx("div",{children:t.jsx(i,{...e,tableHeight:"100%",value:n,onChange:r=>a(r),cellRenderer:r=>r?.column?.field==="output"?t.jsx("div",{tabIndex:1,style:{paddingLeft:"1rem"},children:t.jsx(b,{disabled:r.disabled,checked:r.value==="true",onChange:o=>{r.onChange(`${o?.target?.checked}`)},children:"Enabled"})}):null})})}},d={render:e=>{const[n,a]=s.useState({...m,rules:V()});return t.jsx("div",{style:{height:"100%"},children:t.jsx(i,{...e,value:n,onChange:a,tableHeight:"100%"})})}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
