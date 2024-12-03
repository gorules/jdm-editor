import{_ as P,j as r}from"./wrapNativeSuper-ezTqcbMv.js";import{a as A,p as m,b as v,u as $,d as H,D as z,f as L,g as K,P as U,R as W,h as F,H as G,i as J}from"./diff-icon-DPBf0RNA.js";import{r as u,R as w}from"./index-uubelm5h.js";import{I as Q,T as x,i as q,d as X}from"./wasm-Bx8laepE.js";import{c as h}from"./ce-CtUDvOBw.js";import{B as _}from"./button-C0wn-hKP.js";var Y={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"}}]},name:"menu",theme:"outlined"},Z=function(a,n){return u.createElement(Q,P({},a,{ref:n,icon:Y}))},ee=u.forwardRef(Z);const b=w.createContext({}),R=(e={})=>({id:crypto.randomUUID(),key:"",value:"",...e}),j=({children:e})=>{const a=u.useMemo(()=>A(n=>({configurable:!0,disabled:!1,addRowAbove:(s=0)=>{n(m(i=>(i.expressions.splice(s,0,R()),i)))},addRowBelow:s=>{n(m(i=>(s=s??i.expressions.length-1,i.expressions.splice(s+1,0,R()),i)))},expressions:[],setExpressions:s=>{n({expressions:s})},swapRows:(s,i)=>{n(m(o=>{const[d]=o.expressions.splice(s,1);return o.expressions.splice(i,0,d),o}))},removeRow:s=>{n(m(i=>(i.expressions.splice(s,1),i)))},updateRow:(s,i)=>{n(m(o=>(o.expressions[s]={...o.expressions[s],...i},o)))}})),[]);return r.jsx(b.Provider,{value:a,children:e})};function g(e,a=v){return w.useContext(b)(e,a)}const E=()=>w.useContext(b);j.__docgenInfo={description:"",methods:[],displayName:"ExpressionStoreProvider"};const re=({value:e,onChange:a,defaultValue:n=[],configurable:s=!0,disabled:i=!1})=>{const o=u.useRef(!1),d=E(),{setExpressions:t,expressions:l}=g(({setExpressions:f,expressions:p})=>({setExpressions:f,expressions:p}));return u.useEffect(()=>{d.setState({configurable:s,disabled:i})},[s,i]),u.useEffect(()=>{if(a)return d.subscribe((f,p)=>{v(f.expressions,p.expressions)||a?.(f.expressions)})},[d,a]),u.useEffect(()=>{o.current&&e&&!v(e,l)&&t(e)},[e]),u.useEffect(()=>{e?t(e):n&&t(n),o.current=!0},[]),null},D=({expression:e,index:a,variableType:n})=>{const s=u.useRef(null),{updateRow:i,removeRow:o,swapRows:d,disabled:t,configurable:l}=g(({updateRow:c,removeRow:N,swapRows:C,disabled:B,configurable:O})=>({updateRow:c,removeRow:N,swapRows:C,disabled:B,configurable:O})),f=c=>{i(a,c)},p=()=>{o(a)},[{isDropping:y,direction:k},I]=$({accept:"row",collect:c=>({isDropping:c.isOver({shallow:!0}),direction:(c.getDifferenceFromInitialOffset()?.y||0)>0?"down":"up"}),drop:c=>{d(c.index,a)}}),[{isDragging:M},S,V]=H({canDrag:l&&!t,item:()=>({...e,index:a}),type:"row",collect:c=>({isDragging:c.isDragging()})});return V(I(s)),r.jsxs("div",{ref:s,className:h("expression-list-item","expression-list__item",y&&k==="down"&&"dropping-down",y&&k==="up"&&"dropping-up",e?._diff?.status&&`expression-list__item--${e?._diff?.status}`),style:{opacity:M?.5:1},children:[r.jsx("div",{ref:S,className:"expression-list-item__drag","aria-disabled":!l||t,children:e?._diff?.status?r.jsx(z,{status:e?._diff?.status,style:{fontSize:16}}):r.jsx(ee,{})}),r.jsx("div",{children:r.jsx(L,{placeholder:"Key",readOnly:!l||t,displayDiff:e?._diff?.fields?.key?.status==="modified",previousValue:e?._diff?.fields?.key?.previousValue,value:e?.key,onChange:c=>f({key:c.target.value}),autoComplete:"off"})}),r.jsxs("div",{className:"expression-list-item__code",children:[r.jsx(K,{placeholder:"Expression",maxRows:9,disabled:t,value:e?.value,displayDiff:e?._diff?.fields?.value?.status==="modified",previousValue:e?._diff?.fields?.value?.previousValue,onChange:c=>f({value:c}),variableType:n}),r.jsx(se,{expression:e})]}),r.jsx("div",{children:r.jsx(U,{title:"Remove selected row?",okText:"Remove",onConfirm:p,disabled:!l||t,children:r.jsx(_,{type:"text",icon:r.jsx(W,{}),danger:!0,disabled:!l||t})})})]})},se=({expression:e})=>{const{trace:a}=g(({traceData:n})=>({trace:n?.[e.key]?.result}));return a?r.jsx("div",{className:"expression-list-item__resultOverlay",children:r.jsxs(x.Text,{ellipsis:{tooltip:a},style:{maxWidth:120},children:["= ",a]})}):null};D.__docgenInfo={description:"",methods:[],displayName:"ExpressionItem",props:{expression:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  id: string;
  key: string;
  value: string;
  _diff?: DiffMetadata;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"key",value:{name:"string",required:!0}},{key:"value",value:{name:"string",required:!0}},{key:"_diff",value:{name:"signature",type:"object",raw:`{
  status?: DiffStatus;
  previousValue?: T;
  previousIndex?: number;
  currentIndex?: number;
  fields?: Record<string, DiffMetadata>;
}`,signature:{properties:[{key:"status",value:{name:"union",raw:"'added' | 'removed' | 'modified' | 'unchanged' | 'moved'",elements:[{name:"literal",value:"'added'"},{name:"literal",value:"'removed'"},{name:"literal",value:"'modified'"},{name:"literal",value:"'unchanged'"},{name:"literal",value:"'moved'"}],required:!1}},{key:"previousValue",value:{name:"T",required:!1}},{key:"previousIndex",value:{name:"number",required:!1}},{key:"currentIndex",value:{name:"number",required:!1}},{key:"fields",value:{name:"Record",elements:[{name:"string"},{name:"DiffMetadata"}],raw:"Record<string, DiffMetadata>",required:!1}}]},required:!1}}]}},description:""},index:{required:!0,tsType:{name:"number"},description:""},variableType:{required:!1,tsType:{name:"VariableType"},description:""}}};const T=({})=>{const{expressions:e,addRowBelow:a,configurable:n,disabled:s,inputVariableType:i}=g(({expressions:t,addRowBelow:l,configurable:f,disabled:p,inputVariableType:y})=>({expressions:t,addRowBelow:l,configurable:f,disabled:p,inputVariableType:y}),v),[o,d]=u.useState();return u.useEffect(()=>{if(!q()||!i)return;const t=i.clone();e.filter(l=>l.key.length>0).forEach(l=>{const f=t.calculateType(l.value);t.set(`$.${l.key}`,f)}),d(t)},[e,i]),r.jsxs("div",{className:"expression-list",children:[r.jsxs("div",{className:h("expression-list__item","expression-list__item--heading"),children:[r.jsx("div",{}),r.jsx(x.Text,{type:"secondary",children:"Key"}),r.jsx(x.Text,{type:"secondary",children:"Expression"}),r.jsx("div",{})]}),(e||[]).map((t,l)=>r.jsx(D,{expression:t,index:l,variableType:o},t.id)),n&&!s&&r.jsx("div",{className:"expression-list__button-wrapper",children:r.jsx(_,{className:"expression-list__button",icon:r.jsx(F,{}),type:"link",onClick:()=>a(),children:"Add row"})})]})};T.__docgenInfo={description:"",methods:[],displayName:"ExpressionList"};const ae=({manager:e,traceData:a,inputData:n,...s})=>{const[i,o]=u.useState(!1),d=u.useRef(null);u.useEffect(()=>{o(!0)},[]);const t=u.useMemo(()=>e?{manager:e}:{backend:G,options:{rootElement:d.current}},[d.current,e]);return r.jsx("div",{ref:d,children:d.current&&r.jsx(J,{...t,children:r.jsxs(j,{children:[r.jsx(re,{...s}),r.jsx(T,{}),r.jsx(ne,{traceData:a,inputData:n})]})})})},ne=({traceData:e,inputData:a})=>{const n=E();return u.useEffect(()=>{const s=n.getState();v(s,e)||n.setState({traceData:e})},[e]),u.useEffect(()=>{q()&&n.setState({inputVariableType:X(a)})},[a]),null};ae.__docgenInfo={description:"",methods:[],displayName:"Expression",props:{manager:{required:!1,tsType:{name:"DragDropManager"},description:""},traceData:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"signature",type:"object",raw:"{ result: unknown }",signature:{properties:[{key:"result",value:{name:"unknown",required:!0}}]}}],raw:"Record<string, { result: unknown }>"},description:""},inputData:{required:!1,tsType:{name:"unknown"},description:""},configurable:{required:!1,tsType:{name:"boolean"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},defaultValue:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  id: string;
  key: string;
  value: string;
  _diff?: DiffMetadata;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"key",value:{name:"string",required:!0}},{key:"value",value:{name:"string",required:!0}},{key:"_diff",value:{name:"signature",type:"object",raw:`{
  status?: DiffStatus;
  previousValue?: T;
  previousIndex?: number;
  currentIndex?: number;
  fields?: Record<string, DiffMetadata>;
}`,signature:{properties:[{key:"status",value:{name:"union",raw:"'added' | 'removed' | 'modified' | 'unchanged' | 'moved'",elements:[{name:"literal",value:"'added'"},{name:"literal",value:"'removed'"},{name:"literal",value:"'modified'"},{name:"literal",value:"'unchanged'"},{name:"literal",value:"'moved'"}],required:!1}},{key:"previousValue",value:{name:"T",required:!1}},{key:"previousIndex",value:{name:"number",required:!1}},{key:"currentIndex",value:{name:"number",required:!1}},{key:"fields",value:{name:"Record",elements:[{name:"string"},{name:"DiffMetadata"}],raw:"Record<string, DiffMetadata>",required:!1}}]},required:!1}}]}}],raw:"ExpressionEntry[]"},description:""},value:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  id: string;
  key: string;
  value: string;
  _diff?: DiffMetadata;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"key",value:{name:"string",required:!0}},{key:"value",value:{name:"string",required:!0}},{key:"_diff",value:{name:"signature",type:"object",raw:`{
  status?: DiffStatus;
  previousValue?: T;
  previousIndex?: number;
  currentIndex?: number;
  fields?: Record<string, DiffMetadata>;
}`,signature:{properties:[{key:"status",value:{name:"union",raw:"'added' | 'removed' | 'modified' | 'unchanged' | 'moved'",elements:[{name:"literal",value:"'added'"},{name:"literal",value:"'removed'"},{name:"literal",value:"'modified'"},{name:"literal",value:"'unchanged'"},{name:"literal",value:"'moved'"}],required:!1}},{key:"previousValue",value:{name:"T",required:!1}},{key:"previousIndex",value:{name:"number",required:!1}},{key:"currentIndex",value:{name:"number",required:!1}},{key:"fields",value:{name:"Record",elements:[{name:"string"},{name:"DiffMetadata"}],raw:"Record<string, DiffMetadata>",required:!1}}]},required:!1}}]}}],raw:"ExpressionEntry[]"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: ExpressionEntry[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  id: string;
  key: string;
  value: string;
  _diff?: DiffMetadata;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"key",value:{name:"string",required:!0}},{key:"value",value:{name:"string",required:!0}},{key:"_diff",value:{name:"signature",type:"object",raw:`{
  status?: DiffStatus;
  previousValue?: T;
  previousIndex?: number;
  currentIndex?: number;
  fields?: Record<string, DiffMetadata>;
}`,signature:{properties:[{key:"status",value:{name:"union",raw:"'added' | 'removed' | 'modified' | 'unchanged' | 'moved'",elements:[{name:"literal",value:"'added'"},{name:"literal",value:"'removed'"},{name:"literal",value:"'modified'"},{name:"literal",value:"'unchanged'"},{name:"literal",value:"'moved'"}],required:!1}},{key:"previousValue",value:{name:"T",required:!1}},{key:"previousIndex",value:{name:"number",required:!1}},{key:"currentIndex",value:{name:"number",required:!1}},{key:"fields",value:{name:"Record",elements:[{name:"string"},{name:"DiffMetadata"}],raw:"Record<string, DiffMetadata>",required:!1}}]},required:!1}}]}}],raw:"ExpressionEntry[]"},name:"value"}],return:{name:"void"}}},description:""}}};export{ae as E};