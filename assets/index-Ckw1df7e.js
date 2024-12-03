import{R as X,r as l}from"./index-uubelm5h.js";import{C as T,F as J,D as Q,u as F,c as A,o as U,_ as D}from"./wasm-Bx8laepE.js";import{u as L,C as Y}from"./dt-CvjH0IWh.js";import{T as Z,W as ee}from"./button-C0wn-hKP.js";const q=X.createContext(null);var te=function(a,u){var o={};for(var e in a)Object.prototype.hasOwnProperty.call(a,e)&&u.indexOf(e)<0&&(o[e]=a[e]);if(a!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,e=Object.getOwnPropertySymbols(a);n<e.length;n++)u.indexOf(e[n])<0&&Object.prototype.propertyIsEnumerable.call(a,e[n])&&(o[e[n]]=a[e[n]]);return o};const se=(a,u)=>{var o;const{prefixCls:e,className:n,rootClassName:V,children:p,indeterminate:h=!1,style:E,onMouseEnter:b,onMouseLeave:i,skipGroup:y=!1,disabled:S}=a,r=te(a,["prefixCls","className","rootClassName","children","indeterminate","style","onMouseEnter","onMouseLeave","skipGroup","disabled"]),{getPrefixCls:O,direction:N,checkbox:d}=l.useContext(T),t=l.useContext(q),{isFormItemInput:P}=l.useContext(J),w=l.useContext(Q),x=(o=t?.disabled||S)!==null&&o!==void 0?o:w,f=l.useRef(r.value);l.useEffect(()=>{t?.registerValue(r.value)},[]),l.useEffect(()=>{if(!y)return r.value!==f.current&&(t?.cancelValue(f.current),t?.registerValue(r.value),f.current=r.value),()=>t?.cancelValue(r.value)},[r.value]);const c=O("checkbox",e),g=F(c),[j,k,_]=L(c,g),m=Object.assign({},r);t&&!y&&(m.onChange=function(){r.onChange&&r.onChange.apply(r,arguments),t.toggleOption&&t.toggleOption({label:p,value:r.value})},m.name=t.name,m.checked=t.value.includes(r.value));const I=A(`${c}-wrapper`,{[`${c}-rtl`]:N==="rtl",[`${c}-wrapper-checked`]:m.checked,[`${c}-wrapper-disabled`]:x,[`${c}-wrapper-in-form-item`]:P},d?.className,n,V,_,g,k),$=A({[`${c}-indeterminate`]:h},Z,k),G=h?"mixed":void 0;return j(l.createElement(ee,{component:"Checkbox",disabled:x},l.createElement("label",{className:I,style:Object.assign(Object.assign({},d?.style),E),onMouseEnter:b,onMouseLeave:i},l.createElement(Y,Object.assign({"aria-checked":G},m,{prefixCls:c,className:$,disabled:x,ref:u})),p!==void 0&&l.createElement("span",null,p))))},z=l.forwardRef(se);var ae=function(a,u){var o={};for(var e in a)Object.prototype.hasOwnProperty.call(a,e)&&u.indexOf(e)<0&&(o[e]=a[e]);if(a!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,e=Object.getOwnPropertySymbols(a);n<e.length;n++)u.indexOf(e[n])<0&&Object.prototype.propertyIsEnumerable.call(a,e[n])&&(o[e[n]]=a[e[n]]);return o};const le=l.forwardRef((a,u)=>{const{defaultValue:o,children:e,options:n=[],prefixCls:V,className:p,rootClassName:h,style:E,onChange:b}=a,i=ae(a,["defaultValue","children","options","prefixCls","className","rootClassName","style","onChange"]),{getPrefixCls:y,direction:S}=l.useContext(T),[r,O]=l.useState(i.value||o||[]),[N,d]=l.useState([]);l.useEffect(()=>{"value"in i&&O(i.value||[])},[i.value]);const t=l.useMemo(()=>n.map(s=>typeof s=="string"||typeof s=="number"?{label:s,value:s}:s),[n]),P=s=>{d(v=>v.filter(C=>C!==s))},w=s=>{d(v=>[].concat(D(v),[s]))},x=s=>{const v=r.indexOf(s.value),C=D(r);v===-1?C.push(s.value):C.splice(v,1),"value"in i||O(C),b?.(C.filter(R=>N.includes(R)).sort((R,W)=>{const H=t.findIndex(M=>M.value===R),K=t.findIndex(M=>M.value===W);return H-K}))},f=y("checkbox",V),c=`${f}-group`,g=F(f),[j,k,_]=L(f,g),m=U(i,["value","disabled"]),I=n.length?t.map(s=>l.createElement(z,{prefixCls:f,key:s.value.toString(),disabled:"disabled"in s?s.disabled:i.disabled,value:s.value,checked:r.includes(s.value),onChange:s.onChange,className:`${c}-item`,style:s.style,title:s.title,id:s.id,required:s.required},s.label)):e,$={toggleOption:x,value:r,disabled:i.disabled,name:i.name,registerValue:w,cancelValue:P},G=A(c,{[`${c}-rtl`]:S==="rtl"},p,h,_,g,k);return j(l.createElement("div",Object.assign({className:G,style:E},m,{ref:u}),l.createElement(q.Provider,{value:$},I)))}),B=z;B.Group=le;B.__ANT_CHECKBOX=!0;export{B as C};
