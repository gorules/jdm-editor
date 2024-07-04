import{r,R as h}from"./index-CDs2tPxN.js";import{e as sn,h as Le,i as X,k as ln,l as cn,w as Y,m as Pe,n as me,c as I,C as _,p as Me,q as dn,s as un,r as J,v as mn,x as gn,L as pn,y as U,z as oe,B as He,E as W,G as hn,H as fn,I as yn,D as bn,J as vn,K as Sn,o as _e,A as Ae,M as Ge,N as wn,j as jn}from"./index-B6ko2aXS.js";import{R as Bn}from"./index-7f_Nov5Q.js";import{_ as We}from"./extends-CCbyfPlC.js";var F=sn({},Bn),xn=F.version,Cn=F.render,$n=F.unmountComponentAtNode,Q;try{var Dn=Number((xn||"").split(".")[0]);Dn>=18&&(Q=F.createRoot)}catch{}function Ee(e){var n=F.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;n&&ln(n)==="object"&&(n.usingClientEntryPoint=e)}var Z="__rc_react_root__";function Tn(e,n){Ee(!0);var t=n[Z]||Q(n);Ee(!1),t.render(e),n[Z]=t}function On(e,n){Cn(e,n)}function En(e,n){if(Q){Tn(e,n);return}On(e,n)}function In(e){return ce.apply(this,arguments)}function ce(){return ce=Le(X().mark(function e(n){return X().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.abrupt("return",Promise.resolve().then(function(){var i;(i=n[Z])===null||i===void 0||i.unmount(),delete n[Z]}));case 1:case"end":return o.stop()}},e)})),ce.apply(this,arguments)}function Rn(e){$n(e)}function Nn(e){return de.apply(this,arguments)}function de(){return de=Le(X().mark(function e(n){return X().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:if(Q===void 0){o.next=2;break}return o.abrupt("return",In(n));case 2:Rn(n);case 3:case"end":return o.stop()}},e)})),de.apply(this,arguments)}const zn=e=>{const{componentCls:n,colorPrimary:t}=e;return{[n]:{position:"absolute",background:"transparent",pointerEvents:"none",boxSizing:"border-box",color:`var(--wave-color, ${t})`,boxShadow:"0 0 0 0 currentcolor",opacity:.2,"&.wave-motion-appear":{transition:[`box-shadow 0.4s ${e.motionEaseOutCirc}`,`opacity 2s ${e.motionEaseOutCirc}`].join(","),"&-active":{boxShadow:"0 0 0 6px currentcolor",opacity:0},"&.wave-quick":{transition:[`box-shadow ${e.motionDurationSlow} ${e.motionEaseInOut}`,`opacity ${e.motionDurationSlow} ${e.motionEaseInOut}`].join(",")}}}}},Ln=cn("Wave",e=>[zn(e)]),qe="ant-wave-target";function Pn(e){const n=(e||"").match(/rgba?\((\d*), (\d*), (\d*)(, [\d.]*)?\)/);return n&&n[1]&&n[2]&&n[3]?!(n[1]===n[2]&&n[2]===n[3]):!0}function ie(e){return e&&e!=="#fff"&&e!=="#ffffff"&&e!=="rgb(255, 255, 255)"&&e!=="rgba(255, 255, 255, 1)"&&Pn(e)&&!/rgba\((?:\d*, ){3}0\)/.test(e)&&e!=="transparent"}function Mn(e){const{borderTopColor:n,borderColor:t,backgroundColor:o}=getComputedStyle(e);return ie(n)?n:ie(t)?t:ie(o)?o:null}function re(e){return Number.isNaN(e)?0:e}const Hn=e=>{const{className:n,target:t,component:o}=e,i=r.useRef(null),[a,s]=r.useState(null),[l,m]=r.useState([]),[d,c]=r.useState(0),[u,f]=r.useState(0),[R,y]=r.useState(0),[C,v]=r.useState(0),[D,S]=r.useState(!1),N={left:d,top:u,width:R,height:C,borderRadius:l.map(p=>`${p}px`).join(" ")};a&&(N["--wave-color"]=a);function E(){const p=getComputedStyle(t);s(Mn(t));const b=p.position==="static",{borderLeftWidth:T,borderTopWidth:j}=p;c(b?t.offsetLeft:re(-parseFloat(T))),f(b?t.offsetTop:re(-parseFloat(j))),y(t.offsetWidth),v(t.offsetHeight);const{borderTopLeftRadius:B,borderTopRightRadius:w,borderBottomLeftRadius:g,borderBottomRightRadius:L}=p;m([B,w,L,g].map(x=>re(parseFloat(x))))}if(r.useEffect(()=>{if(t){const p=Y(()=>{E(),S(!0)});let b;return typeof ResizeObserver<"u"&&(b=new ResizeObserver(E),b.observe(t)),()=>{Y.cancel(p),b==null||b.disconnect()}}},[]),!D)return null;const $=(o==="Checkbox"||o==="Radio")&&(t==null?void 0:t.classList.contains(qe));return r.createElement(Pe,{visible:!0,motionAppear:!0,motionName:"wave-motion",motionDeadline:5e3,onAppearEnd:(p,b)=>{var T;if(b.deadline||b.propertyName==="opacity"){const j=(T=i.current)===null||T===void 0?void 0:T.parentElement;Nn(j).then(()=>{j==null||j.remove()})}return!1}},(p,b)=>{let{className:T}=p;return r.createElement("div",{ref:me(i,b),className:I(n,{"wave-quick":$},T),style:N})})},_n=(e,n)=>{var t;const{component:o}=n;if(o==="Checkbox"&&!(!((t=e.querySelector("input"))===null||t===void 0)&&t.checked))return;const i=document.createElement("div");i.style.position="absolute",i.style.left="0px",i.style.top="0px",e==null||e.insertBefore(i,e==null?void 0:e.firstChild),En(r.createElement(Hn,Object.assign({},n,{target:e})),i)},An=_n,Gn=(e,n,t)=>{const{wave:o}=r.useContext(_),[,i,a]=Me(),s=dn(d=>{const c=e.current;if(o!=null&&o.disabled||!c)return;const u=c.querySelector(`.${qe}`)||c,{showEffect:f}=o||{};(f||An)(u,{className:n,token:i,component:t,event:d,hashId:a})}),l=r.useRef();return d=>{Y.cancel(l.current),l.current=Y(()=>{s(d)})}},Wn=Gn,qn=e=>{const{children:n,disabled:t,component:o}=e,{getPrefixCls:i}=r.useContext(_),a=r.useRef(null),s=i("wave"),[,l]=Ln(s),m=Wn(a,I(s,l),o);if(h.useEffect(()=>{const c=a.current;if(!c||c.nodeType!==1||t)return;const u=f=>{!mn(f.target)||!c.getAttribute||c.getAttribute("disabled")||c.disabled||c.className.includes("disabled")||c.className.includes("-leave")||m(f)};return c.addEventListener("click",u,!0),()=>{c.removeEventListener("click",u,!0)}},[t]),!h.isValidElement(n))return n??null;const d=un(n)?me(n.ref,a):a;return J(n,{ref:d})},Un=qn;var Fn=function(e,n){var t={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&n.indexOf(o)<0&&(t[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,o=Object.getOwnPropertySymbols(e);i<o.length;i++)n.indexOf(o[i])<0&&Object.prototype.propertyIsEnumerable.call(e,o[i])&&(t[o[i]]=e[o[i]]);return t};const Ue=r.createContext(void 0),Vn=e=>{const{getPrefixCls:n,direction:t}=r.useContext(_),{prefixCls:o,size:i,className:a}=e,s=Fn(e,["prefixCls","size","className"]),l=n("btn-group",o),[,,m]=Me();let d="";switch(i){case"large":d="lg";break;case"small":d="sm";break}const c=I(l,{[`${l}-${d}`]:d,[`${l}-rtl`]:t==="rtl"},a,m);return r.createElement(Ue.Provider,{value:i},r.createElement("div",Object.assign({},s,{className:c})))},Xn=Vn,Ie=/^[\u4e00-\u9fa5]{2}$/,ue=Ie.test.bind(Ie);function Kt(e){return e==="danger"?{danger:!0}:{type:e}}function Re(e){return typeof e=="string"}function ae(e){return e==="text"||e==="link"}function Yn(e,n){if(e==null)return;const t=n?" ":"";return typeof e!="string"&&typeof e!="number"&&Re(e.type)&&ue(e.props.children)?J(e,{children:e.props.children.split("").join(t)}):Re(e)?ue(e)?h.createElement("span",null,e.split("").join(t)):h.createElement("span",null,e):gn(e)?h.createElement("span",null,e):e}function Jn(e,n){let t=!1;const o=[];return h.Children.forEach(e,i=>{const a=typeof i,s=a==="string"||a==="number";if(t&&s){const l=o.length-1,m=o[l];o[l]=`${m}${i}`}else o.push(i);t=s}),h.Children.map(o,i=>Yn(i,n))}const Zn=r.forwardRef((e,n)=>{const{className:t,style:o,children:i,prefixCls:a}=e,s=I(`${a}-icon`,t);return h.createElement("span",{ref:n,className:s,style:o},i)}),Fe=Zn,Ne=r.forwardRef((e,n)=>{const{prefixCls:t,className:o,style:i,iconClassName:a,iconPosition:s="start"}=e,l=I(o,{[`${t}-loading-icon-end`]:s==="end",[`${t}-loading-icon`]:s==="start"});return h.createElement(Fe,{prefixCls:t,className:l,style:i,ref:n},h.createElement(pn,{className:a}))}),se=()=>({width:0,opacity:0,transform:"scale(0)"}),le=e=>({width:e.scrollWidth,opacity:1,transform:"scale(1)"}),Kn=e=>{const{prefixCls:n,loading:t,existIcon:o,className:i,style:a,iconPosition:s}=e,l=!!t;return o?h.createElement(Ne,{prefixCls:n,className:i,style:a,iconPosition:s}):h.createElement(Pe,{visible:l,motionName:`${n}-loading-icon-motion`,motionLeave:l,removeOnLeave:!0,onAppearStart:se,onAppearActive:le,onEnterStart:se,onEnterActive:le,onLeaveStart:le,onLeaveActive:se},(m,d)=>{let{className:c,style:u}=m;return h.createElement(Ne,{prefixCls:n,className:i,style:Object.assign(Object.assign({},a),u),ref:d,iconClassName:c,iconPosition:s})})},Qn=Kn,ze=(e,n)=>({[`> span, > ${e}`]:{"&:not(:last-child)":{[`&, & > ${e}`]:{"&:not(:disabled)":{borderInlineEndColor:n}}},"&:not(:first-child)":{[`&, & > ${e}`]:{"&:not(:disabled)":{borderInlineStartColor:n}}}}}),kn=e=>{const{componentCls:n,fontSize:t,lineWidth:o,groupBorderColor:i,colorErrorHover:a}=e;return{[`${n}-group`]:[{position:"relative",display:"inline-flex",[`> span, > ${n}`]:{"&:not(:last-child)":{[`&, & > ${n}`]:{borderStartEndRadius:0,borderEndEndRadius:0}},"&:not(:first-child)":{marginInlineStart:e.calc(o).mul(-1).equal(),[`&, & > ${n}`]:{borderStartStartRadius:0,borderEndStartRadius:0}}},[n]:{position:"relative",zIndex:1,"&:hover,\n          &:focus,\n          &:active":{zIndex:2},"&[disabled]":{zIndex:0}},[`${n}-icon-only`]:{fontSize:t}},ze(`${n}-primary`,i),ze(`${n}-danger`,a)]}},et=kn,Ve=e=>{const{paddingInline:n,onlyIconSize:t,paddingBlock:o}=e;return U(e,{buttonPaddingHorizontal:n,buttonPaddingVertical:o,buttonIconOnlyFontSize:t})},Xe=e=>{var n,t,o,i,a,s;const l=(n=e.contentFontSize)!==null&&n!==void 0?n:e.fontSize,m=(t=e.contentFontSizeSM)!==null&&t!==void 0?t:e.fontSize,d=(o=e.contentFontSizeLG)!==null&&o!==void 0?o:e.fontSizeLG,c=(i=e.contentLineHeight)!==null&&i!==void 0?i:oe(l),u=(a=e.contentLineHeightSM)!==null&&a!==void 0?a:oe(m),f=(s=e.contentLineHeightLG)!==null&&s!==void 0?s:oe(d);return{fontWeight:400,defaultShadow:`0 ${e.controlOutlineWidth}px 0 ${e.controlTmpOutline}`,primaryShadow:`0 ${e.controlOutlineWidth}px 0 ${e.controlOutline}`,dangerShadow:`0 ${e.controlOutlineWidth}px 0 ${e.colorErrorOutline}`,primaryColor:e.colorTextLightSolid,dangerColor:e.colorTextLightSolid,borderColorDisabled:e.colorBorder,defaultGhostColor:e.colorBgContainer,ghostBg:"transparent",defaultGhostBorderColor:e.colorBgContainer,paddingInline:e.paddingContentHorizontal-e.lineWidth,paddingInlineLG:e.paddingContentHorizontal-e.lineWidth,paddingInlineSM:8-e.lineWidth,onlyIconSize:e.fontSizeLG,onlyIconSizeSM:e.fontSizeLG-2,onlyIconSizeLG:e.fontSizeLG+2,groupBorderColor:e.colorPrimaryHover,linkHoverBg:"transparent",textHoverBg:e.colorBgTextHover,defaultColor:e.colorText,defaultBg:e.colorBgContainer,defaultBorderColor:e.colorBorder,defaultBorderColorDisabled:e.colorBorder,defaultHoverBg:e.colorBgContainer,defaultHoverColor:e.colorPrimaryHover,defaultHoverBorderColor:e.colorPrimaryHover,defaultActiveBg:e.colorBgContainer,defaultActiveColor:e.colorPrimaryActive,defaultActiveBorderColor:e.colorPrimaryActive,contentFontSize:l,contentFontSizeSM:m,contentFontSizeLG:d,contentLineHeight:c,contentLineHeightSM:u,contentLineHeightLG:f,paddingBlock:Math.max((e.controlHeight-l*c)/2-e.lineWidth,0),paddingBlockSM:Math.max((e.controlHeightSM-m*u)/2-e.lineWidth,0),paddingBlockLG:Math.max((e.controlHeightLG-d*f)/2-e.lineWidth,0)}},nt=e=>{const{componentCls:n,iconCls:t,fontWeight:o}=e;return{[n]:{outline:"none",position:"relative",display:"inline-block",fontWeight:o,whiteSpace:"nowrap",textAlign:"center",backgroundImage:"none",background:"transparent",border:`${W(e.lineWidth)} ${e.lineType} transparent`,cursor:"pointer",transition:`all ${e.motionDurationMid} ${e.motionEaseInOut}`,userSelect:"none",touchAction:"manipulation",color:e.colorText,"&:disabled > *":{pointerEvents:"none"},"> span":{display:"inline-block"},[`${n}-icon`]:{lineHeight:0,"&-end":{marginInlineStart:e.marginXS}},[`> ${t} + span, > span + ${t}`]:{marginInlineStart:e.marginXS},[`&:not(${n}-icon-only) > ${n}-icon`]:{[`&${n}-loading-icon, &:not(:last-child)`]:{marginInlineEnd:e.marginXS},[`&${n}-loading-icon-end`]:{marginInlineStart:e.marginXS}},"> a":{color:"currentColor"},"&:not(:disabled)":Object.assign({},hn(e)),[`&${n}-two-chinese-chars::first-letter`]:{letterSpacing:"0.34em"},[`&${n}-two-chinese-chars > *:not(${t})`]:{marginInlineEnd:"-0.34em",letterSpacing:"0.34em"},[`&-icon-only${n}-compact-item`]:{flex:"none"}}}},P=(e,n,t)=>({[`&:not(:disabled):not(${e}-disabled)`]:{"&:hover":n,"&:active":t}}),tt=e=>({minWidth:e.controlHeight,paddingInlineStart:0,paddingInlineEnd:0,borderRadius:"50%"}),ot=e=>({borderRadius:e.controlHeight,paddingInlineStart:e.calc(e.controlHeight).div(2).equal(),paddingInlineEnd:e.calc(e.controlHeight).div(2).equal()}),it=e=>({cursor:"not-allowed",borderColor:e.borderColorDisabled,color:e.colorTextDisabled,background:e.colorBgContainerDisabled,boxShadow:"none"}),q=(e,n,t,o,i,a,s,l)=>({[`&${e}-background-ghost`]:Object.assign(Object.assign({color:t||void 0,background:n,borderColor:o||void 0,boxShadow:"none"},P(e,Object.assign({background:n},s),Object.assign({background:n},l))),{"&:disabled":{cursor:"not-allowed",color:i||void 0,borderColor:a||void 0}})}),ge=e=>({[`&:disabled, &${e.componentCls}-disabled`]:Object.assign({},it(e))}),Ye=e=>Object.assign({},ge(e)),K=e=>({[`&:disabled, &${e.componentCls}-disabled`]:{cursor:"not-allowed",color:e.colorTextDisabled}}),Je=e=>Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},Ye(e)),{background:e.defaultBg,borderColor:e.defaultBorderColor,color:e.defaultColor,boxShadow:e.defaultShadow}),P(e.componentCls,{color:e.defaultHoverColor,borderColor:e.defaultHoverBorderColor,background:e.defaultHoverBg},{color:e.defaultActiveColor,borderColor:e.defaultActiveBorderColor,background:e.defaultActiveBg})),q(e.componentCls,e.ghostBg,e.defaultGhostColor,e.defaultGhostBorderColor,e.colorTextDisabled,e.colorBorder)),{[`&${e.componentCls}-dangerous`]:Object.assign(Object.assign(Object.assign({color:e.colorError,borderColor:e.colorError},P(e.componentCls,{color:e.colorErrorHover,borderColor:e.colorErrorBorderHover},{color:e.colorErrorActive,borderColor:e.colorErrorActive})),q(e.componentCls,e.ghostBg,e.colorError,e.colorError,e.colorTextDisabled,e.colorBorder)),ge(e))}),rt=e=>Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},Ye(e)),{color:e.primaryColor,background:e.colorPrimary,boxShadow:e.primaryShadow}),P(e.componentCls,{color:e.colorTextLightSolid,background:e.colorPrimaryHover},{color:e.colorTextLightSolid,background:e.colorPrimaryActive})),q(e.componentCls,e.ghostBg,e.colorPrimary,e.colorPrimary,e.colorTextDisabled,e.colorBorder,{color:e.colorPrimaryHover,borderColor:e.colorPrimaryHover},{color:e.colorPrimaryActive,borderColor:e.colorPrimaryActive})),{[`&${e.componentCls}-dangerous`]:Object.assign(Object.assign(Object.assign({background:e.colorError,boxShadow:e.dangerShadow,color:e.dangerColor},P(e.componentCls,{background:e.colorErrorHover},{background:e.colorErrorActive})),q(e.componentCls,e.ghostBg,e.colorError,e.colorError,e.colorTextDisabled,e.colorBorder,{color:e.colorErrorHover,borderColor:e.colorErrorHover},{color:e.colorErrorActive,borderColor:e.colorErrorActive})),ge(e))}),at=e=>Object.assign(Object.assign({},Je(e)),{borderStyle:"dashed"}),st=e=>Object.assign(Object.assign(Object.assign({color:e.colorLink},P(e.componentCls,{color:e.colorLinkHover,background:e.linkHoverBg},{color:e.colorLinkActive})),K(e)),{[`&${e.componentCls}-dangerous`]:Object.assign(Object.assign({color:e.colorError},P(e.componentCls,{color:e.colorErrorHover},{color:e.colorErrorActive})),K(e))}),lt=e=>Object.assign(Object.assign(Object.assign({},P(e.componentCls,{color:e.colorText,background:e.textHoverBg},{color:e.colorText,background:e.colorBgTextActive})),K(e)),{[`&${e.componentCls}-dangerous`]:Object.assign(Object.assign({color:e.colorError},K(e)),P(e.componentCls,{color:e.colorErrorHover,background:e.colorErrorBg},{color:e.colorErrorHover,background:e.colorErrorBgActive}))}),ct=e=>{const{componentCls:n}=e;return{[`${n}-default`]:Je(e),[`${n}-primary`]:rt(e),[`${n}-dashed`]:at(e),[`${n}-link`]:st(e),[`${n}-text`]:lt(e),[`${n}-ghost`]:q(e.componentCls,e.ghostBg,e.colorBgContainer,e.colorBgContainer,e.colorTextDisabled,e.colorBorder)}},pe=function(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"";const{componentCls:t,controlHeight:o,fontSize:i,lineHeight:a,borderRadius:s,buttonPaddingHorizontal:l,iconCls:m,buttonPaddingVertical:d}=e,c=`${t}-icon-only`;return[{[`${n}`]:{fontSize:i,lineHeight:a,height:o,padding:`${W(d)} ${W(l)}`,borderRadius:s,[`&${c}`]:{display:"inline-flex",alignItems:"center",justifyContent:"center",width:o,paddingInlineStart:0,paddingInlineEnd:0,[`&${t}-round`]:{width:"auto"},[m]:{fontSize:e.buttonIconOnlyFontSize}},[`&${t}-loading`]:{opacity:e.opacityLoading,cursor:"default"},[`${t}-loading-icon`]:{transition:`width ${e.motionDurationSlow} ${e.motionEaseInOut}, opacity ${e.motionDurationSlow} ${e.motionEaseInOut}`}}},{[`${t}${t}-circle${n}`]:tt(e)},{[`${t}${t}-round${n}`]:ot(e)}]},dt=e=>{const n=U(e,{fontSize:e.contentFontSize,lineHeight:e.contentLineHeight});return pe(n,e.componentCls)},ut=e=>{const n=U(e,{controlHeight:e.controlHeightSM,fontSize:e.contentFontSizeSM,lineHeight:e.contentLineHeightSM,padding:e.paddingXS,buttonPaddingHorizontal:e.paddingInlineSM,buttonPaddingVertical:e.paddingBlockSM,borderRadius:e.borderRadiusSM,buttonIconOnlyFontSize:e.onlyIconSizeSM});return pe(n,`${e.componentCls}-sm`)},mt=e=>{const n=U(e,{controlHeight:e.controlHeightLG,fontSize:e.contentFontSizeLG,lineHeight:e.contentLineHeightLG,buttonPaddingHorizontal:e.paddingInlineLG,buttonPaddingVertical:e.paddingBlockLG,borderRadius:e.borderRadiusLG,buttonIconOnlyFontSize:e.onlyIconSizeLG});return pe(n,`${e.componentCls}-lg`)},gt=e=>{const{componentCls:n}=e;return{[n]:{[`&${n}-block`]:{width:"100%"}}}},pt=He("Button",e=>{const n=Ve(e);return[nt(n),dt(n),ut(n),mt(n),gt(n),ct(n),et(n)]},Xe,{unitless:{fontWeight:!0,contentLineHeight:!0,contentLineHeightSM:!0,contentLineHeightLG:!0}});function ht(e,n){return{[`&-item:not(${n}-last-item)`]:{marginBottom:e.calc(e.lineWidth).mul(-1).equal()},"&-item":{"&:hover,&:focus,&:active":{zIndex:2},"&[disabled]":{zIndex:0}}}}function ft(e,n){return{[`&-item:not(${n}-first-item):not(${n}-last-item)`]:{borderRadius:0},[`&-item${n}-first-item:not(${n}-last-item)`]:{[`&, &${e}-sm, &${e}-lg`]:{borderEndEndRadius:0,borderEndStartRadius:0}},[`&-item${n}-last-item:not(${n}-first-item)`]:{[`&, &${e}-sm, &${e}-lg`]:{borderStartStartRadius:0,borderStartEndRadius:0}}}}function yt(e){const n=`${e.componentCls}-compact-vertical`;return{[n]:Object.assign(Object.assign({},ht(e,n)),ft(e.componentCls,n))}}const bt=e=>{const{componentCls:n,calc:t}=e;return{[n]:{[`&-compact-item${n}-primary`]:{[`&:not([disabled]) + ${n}-compact-item${n}-primary:not([disabled])`]:{position:"relative","&:before":{position:"absolute",top:t(e.lineWidth).mul(-1).equal(),insetInlineStart:t(e.lineWidth).mul(-1).equal(),display:"inline-block",width:e.lineWidth,height:`calc(100% + ${W(e.lineWidth)} * 2)`,backgroundColor:e.colorPrimaryHover,content:'""'}}},"&-compact-vertical-item":{[`&${n}-primary`]:{[`&:not([disabled]) + ${n}-compact-vertical-item${n}-primary:not([disabled])`]:{position:"relative","&:before":{position:"absolute",top:t(e.lineWidth).mul(-1).equal(),insetInlineStart:t(e.lineWidth).mul(-1).equal(),display:"inline-block",width:`calc(100% + ${W(e.lineWidth)} * 2)`,height:e.lineWidth,backgroundColor:e.colorPrimaryHover,content:'""'}}}}}}},vt=fn(["Button","compact"],e=>{const n=Ve(e);return[yn(n),yt(n),bt(n)]},Xe);var St=function(e,n){var t={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&n.indexOf(o)<0&&(t[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,o=Object.getOwnPropertySymbols(e);i<o.length;i++)n.indexOf(o[i])<0&&Object.prototype.propertyIsEnumerable.call(e,o[i])&&(t[o[i]]=e[o[i]]);return t};function wt(e){if(typeof e=="object"&&e){let n=e==null?void 0:e.delay;return n=!Number.isNaN(n)&&typeof n=="number"?n:0,{loading:n<=0,delay:n}}return{loading:!!e,delay:0}}const jt=h.forwardRef((e,n)=>{var t,o,i;const{loading:a=!1,prefixCls:s,type:l,danger:m,shape:d="default",size:c,styles:u,disabled:f,className:R,rootClassName:y,children:C,icon:v,iconPosition:D="start",ghost:S=!1,block:N=!1,htmlType:E="button",classNames:$,style:p={},autoInsertSpace:b}=e,T=St(e,["loading","prefixCls","type","danger","shape","size","styles","disabled","className","rootClassName","children","icon","iconPosition","ghost","block","htmlType","classNames","style","autoInsertSpace"]),j=l||"default",{getPrefixCls:B,direction:w,button:g}=r.useContext(_),L=(t=b??(g==null?void 0:g.autoInsertSpace))!==null&&t!==void 0?t:!0,x=B("btn",s),[fe,Ke,Qe]=pt(x),ke=r.useContext(bn),A=f??ke,en=r.useContext(Ue),G=r.useMemo(()=>wt(a),[a]),[M,ye]=r.useState(G.loading),[k,be]=r.useState(!1),H=me(n,r.createRef()),ve=r.Children.count(C)===1&&!v&&!ae(j);r.useEffect(()=>{let O=null;G.delay>0?O=setTimeout(()=>{O=null,ye(!0)},G.delay):ye(G.loading);function z(){O&&(clearTimeout(O),O=null)}return z},[G]),r.useEffect(()=>{if(!H||!H.current||!L)return;const O=H.current.textContent;ve&&ue(O)?k||be(!0):k&&be(!1)},[H]);const Se=O=>{const{onClick:z}=e;if(M||A){O.preventDefault();return}z==null||z(O)},{compactSize:nn,compactItemClassnames:we}=vn(x,w),tn={large:"lg",small:"sm",middle:void 0},je=Sn(O=>{var z,te;return(te=(z=c??nn)!==null&&z!==void 0?z:en)!==null&&te!==void 0?te:O}),Be=je&&tn[je]||"",xe=M?"loading":v,ee=_e(T,["navigate"]),Ce=I(x,Ke,Qe,{[`${x}-${d}`]:d!=="default"&&d,[`${x}-${j}`]:j,[`${x}-${Be}`]:Be,[`${x}-icon-only`]:!C&&C!==0&&!!xe,[`${x}-background-ghost`]:S&&!ae(j),[`${x}-loading`]:M,[`${x}-two-chinese-chars`]:k&&L&&!M,[`${x}-block`]:N,[`${x}-dangerous`]:!!m,[`${x}-rtl`]:w==="rtl"},we,R,y,g==null?void 0:g.className),$e=Object.assign(Object.assign({},g==null?void 0:g.style),p),on=D==="end"&&C&&C!==0&&xe,rn=I($==null?void 0:$.icon,(o=g==null?void 0:g.classNames)===null||o===void 0?void 0:o.icon,{[`${x}-icon-end`]:on}),an=Object.assign(Object.assign({},(u==null?void 0:u.icon)||{}),((i=g==null?void 0:g.styles)===null||i===void 0?void 0:i.icon)||{}),De=v&&!M?h.createElement(Fe,{prefixCls:x,className:rn,style:an},v):h.createElement(Qn,{existIcon:!!v,prefixCls:x,loading:!!M,iconPosition:D}),Te=C||C===0?Jn(C,ve&&L):null,Oe=(O,z)=>D==="start"?h.createElement(h.Fragment,null,O,z):h.createElement(h.Fragment,null,z,O);if(ee.href!==void 0)return fe(h.createElement("a",Object.assign({},ee,{className:I(Ce,{[`${x}-disabled`]:A}),href:A?void 0:ee.href,style:$e,onClick:Se,ref:H,tabIndex:A?-1:0}),Oe(De,Te)));let ne=h.createElement("button",Object.assign({},T,{type:E,className:Ce,style:$e,onClick:Se,disabled:A,ref:H}),Oe(De,Te),!!we&&h.createElement(vt,{key:"compact",prefixCls:x}));return ae(j)||(ne=h.createElement(Un,{component:"Button",disabled:!!M},ne)),fe(ne)}),he=jt;he.Group=Xn;he.__ANT_BUTTON=!0;const Qt=he;var Bt={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"}}]},name:"down",theme:"outlined"};const xt=Bt;var Ct=function(n,t){return r.createElement(Ae,We({},n,{ref:t,icon:xt}))},$t=r.forwardRef(Ct);const kt=$t;function Dt(e,n,t){var o=t||{},i=o.noTrailing,a=i===void 0?!1:i,s=o.noLeading,l=s===void 0?!1:s,m=o.debounceMode,d=m===void 0?void 0:m,c,u=!1,f=0;function R(){c&&clearTimeout(c)}function y(v){var D=v||{},S=D.upcomingOnly,N=S===void 0?!1:S;R(),u=!N}function C(){for(var v=arguments.length,D=new Array(v),S=0;S<v;S++)D[S]=arguments[S];var N=this,E=Date.now()-f;if(u)return;function $(){f=Date.now(),n.apply(N,D)}function p(){c=void 0}!l&&d&&!c&&$(),R(),d===void 0&&E>e?l?(f=Date.now(),a||(c=setTimeout(d?p:$,e))):$():a!==!0&&(c=setTimeout(d?p:$,d===void 0?e-E:e))}return C.cancel=y,C}function Tt(e,n,t){var o=t||{},i=o.atBegin,a=i===void 0?!1:i;return Dt(e,n,{debounceMode:a!==!1})}const Ot=new Ge("antSpinMove",{to:{opacity:1}}),Et=new Ge("antRotate",{to:{transform:"rotate(405deg)"}}),It=e=>{const{componentCls:n,calc:t}=e;return{[`${n}`]:Object.assign(Object.assign({},wn(e)),{position:"absolute",display:"none",color:e.colorPrimary,fontSize:0,textAlign:"center",verticalAlign:"middle",opacity:0,transition:`transform ${e.motionDurationSlow} ${e.motionEaseInOutCirc}`,"&-spinning":{position:"static",display:"inline-block",opacity:1},[`${n}-text`]:{fontSize:e.fontSize,paddingTop:t(t(e.dotSize).sub(e.fontSize)).div(2).add(2).equal()},"&-fullscreen":{position:"fixed",width:"100vw",height:"100vh",backgroundColor:e.colorBgMask,zIndex:e.zIndexPopupBase,inset:0,display:"flex",alignItems:"center",flexDirection:"column",justifyContent:"center",opacity:0,visibility:"hidden",transition:`all ${e.motionDurationMid}`,"&-show":{opacity:1,visibility:"visible"},[`${n}-dot ${n}-dot-item`]:{backgroundColor:e.colorWhite},[`${n}-text`]:{color:e.colorTextLightSolid}},"&-nested-loading":{position:"relative",[`> div > ${n}`]:{position:"absolute",top:0,insetInlineStart:0,zIndex:4,display:"block",width:"100%",height:"100%",maxHeight:e.contentHeight,[`${n}-dot`]:{position:"absolute",top:"50%",insetInlineStart:"50%",margin:t(e.dotSize).mul(-1).div(2).equal()},[`${n}-text`]:{position:"absolute",top:"50%",width:"100%",textShadow:`0 1px 2px ${e.colorBgContainer}`},[`&${n}-show-text ${n}-dot`]:{marginTop:t(e.dotSize).div(2).mul(-1).sub(10).equal()},"&-sm":{[`${n}-dot`]:{margin:t(e.dotSizeSM).mul(-1).div(2).equal()},[`${n}-text`]:{paddingTop:t(t(e.dotSizeSM).sub(e.fontSize)).div(2).add(2).equal()},[`&${n}-show-text ${n}-dot`]:{marginTop:t(e.dotSizeSM).div(2).mul(-1).sub(10).equal()}},"&-lg":{[`${n}-dot`]:{margin:t(e.dotSizeLG).mul(-1).div(2).equal()},[`${n}-text`]:{paddingTop:t(t(e.dotSizeLG).sub(e.fontSize)).div(2).add(2).equal()},[`&${n}-show-text ${n}-dot`]:{marginTop:t(e.dotSizeLG).div(2).mul(-1).sub(10).equal()}}},[`${n}-container`]:{position:"relative",transition:`opacity ${e.motionDurationSlow}`,"&::after":{position:"absolute",top:0,insetInlineEnd:0,bottom:0,insetInlineStart:0,zIndex:10,width:"100%",height:"100%",background:e.colorBgContainer,opacity:0,transition:`all ${e.motionDurationSlow}`,content:'""',pointerEvents:"none"}},[`${n}-blur`]:{clear:"both",opacity:.5,userSelect:"none",pointerEvents:"none","&::after":{opacity:.4,pointerEvents:"auto"}}},"&-tip":{color:e.spinDotDefault},[`${n}-dot`]:{position:"relative",display:"inline-block",fontSize:e.dotSize,width:"1em",height:"1em","&-item":{position:"absolute",display:"block",width:t(e.dotSize).sub(t(e.marginXXS).div(2)).div(2).equal(),height:t(e.dotSize).sub(t(e.marginXXS).div(2)).div(2).equal(),backgroundColor:e.colorPrimary,borderRadius:"100%",transform:"scale(0.75)",transformOrigin:"50% 50%",opacity:.3,animationName:Ot,animationDuration:"1s",animationIterationCount:"infinite",animationTimingFunction:"linear",animationDirection:"alternate","&:nth-child(1)":{top:0,insetInlineStart:0,animationDelay:"0s"},"&:nth-child(2)":{top:0,insetInlineEnd:0,animationDelay:"0.4s"},"&:nth-child(3)":{insetInlineEnd:0,bottom:0,animationDelay:"0.8s"},"&:nth-child(4)":{bottom:0,insetInlineStart:0,animationDelay:"1.2s"}},"&-spin":{transform:"rotate(45deg)",animationName:Et,animationDuration:"1.2s",animationIterationCount:"infinite",animationTimingFunction:"linear"}},[`&-sm ${n}-dot`]:{fontSize:e.dotSizeSM,i:{width:t(t(e.dotSizeSM).sub(t(e.marginXXS).div(2))).div(2).equal(),height:t(t(e.dotSizeSM).sub(t(e.marginXXS).div(2))).div(2).equal()}},[`&-lg ${n}-dot`]:{fontSize:e.dotSizeLG,i:{width:t(t(e.dotSizeLG).sub(e.marginXXS)).div(2).equal(),height:t(t(e.dotSizeLG).sub(e.marginXXS)).div(2).equal()}},[`&${n}-show-text ${n}-text`]:{display:"block"}})}},Rt=e=>{const{controlHeightLG:n,controlHeight:t}=e;return{contentHeight:400,dotSize:n/2,dotSizeSM:n*.35,dotSizeLG:t}},Nt=He("Spin",e=>{const n=U(e,{spinDotDefault:e.colorTextDescription});return[It(n)]},Rt);var zt=function(e,n){var t={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&n.indexOf(o)<0&&(t[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,o=Object.getOwnPropertySymbols(e);i<o.length;i++)n.indexOf(o[i])<0&&Object.prototype.propertyIsEnumerable.call(e,o[i])&&(t[o[i]]=e[o[i]]);return t};let V=null;function Lt(e,n){const{indicator:t}=n,o=`${e}-dot`;return t===null?null:r.isValidElement(t)?J(t,{className:I(t.props.className,o)}):r.isValidElement(V)?J(V,{className:I(V.props.className,o)}):r.createElement("span",{className:I(o,`${e}-dot-spin`)},r.createElement("i",{className:`${e}-dot-item`,key:1}),r.createElement("i",{className:`${e}-dot-item`,key:2}),r.createElement("i",{className:`${e}-dot-item`,key:3}),r.createElement("i",{className:`${e}-dot-item`,key:4}))}function Pt(e,n){return!!e&&!!n&&!isNaN(Number(n))}const Ze=e=>{const{prefixCls:n,spinning:t=!0,delay:o=0,className:i,rootClassName:a,size:s="default",tip:l,wrapperClassName:m,style:d,children:c,fullscreen:u=!1}=e,f=zt(e,["prefixCls","spinning","delay","className","rootClassName","size","tip","wrapperClassName","style","children","fullscreen"]),{getPrefixCls:R}=r.useContext(_),y=R("spin",n),[C,v,D]=Nt(y),[S,N]=r.useState(()=>t&&!Pt(t,o));r.useEffect(()=>{if(t){const g=Tt(o,()=>{N(!0)});return g(),()=>{var L;(L=g==null?void 0:g.cancel)===null||L===void 0||L.call(g)}}N(!1)},[o,t]);const E=r.useMemo(()=>typeof c<"u"&&!u,[c,u]),{direction:$,spin:p}=r.useContext(_),b=I(y,p==null?void 0:p.className,{[`${y}-sm`]:s==="small",[`${y}-lg`]:s==="large",[`${y}-spinning`]:S,[`${y}-show-text`]:!!l,[`${y}-fullscreen`]:u,[`${y}-fullscreen-show`]:u&&S,[`${y}-rtl`]:$==="rtl"},i,a,v,D),T=I(`${y}-container`,{[`${y}-blur`]:S}),j=_e(f,["indicator"]),B=Object.assign(Object.assign({},p==null?void 0:p.style),d),w=r.createElement("div",Object.assign({},j,{style:B,className:b,"aria-live":"polite","aria-busy":S}),Lt(y,e),l&&(E||u)?r.createElement("div",{className:`${y}-text`},l):null);return C(E?r.createElement("div",Object.assign({},j,{className:I(`${y}-nested-loading`,m,v,D)}),S&&r.createElement("div",{key:"loading"},w),r.createElement("div",{className:T,key:"container"},c)):w)};Ze.setDefaultIndicator=e=>{V=e};const eo=Ze;var Mt={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"defs",attrs:{},children:[{tag:"style",attrs:{}}]},{tag:"path",attrs:{d:"M840 192h-56v-72c0-13.3-10.7-24-24-24H168c-13.3 0-24 10.7-24 24v272c0 13.3 10.7 24 24 24h592c13.3 0 24-10.7 24-24V256h32v200H465c-22.1 0-40 17.9-40 40v136h-44c-4.4 0-8 3.6-8 8v228c0 .6.1 1.3.2 1.9A83.99 83.99 0 00457 960c46.4 0 84-37.6 84-84 0-2.1-.1-4.1-.2-6.1.1-.6.2-1.2.2-1.9V640c0-4.4-3.6-8-8-8h-44V520h351c22.1 0 40-17.9 40-40V232c0-22.1-17.9-40-40-40zM720 352H208V160h512v192zM477 876c0 11-9 20-20 20s-20-9-20-20V696h40v180z"}}]},name:"format-painter",theme:"outlined"};const Ht=Mt;var _t=function(n,t){return r.createElement(Ae,We({},n,{ref:t,icon:Ht}))},At=r.forwardRef(_t);const no=At;function Gt(e,n,t){var o=this,i=r.useRef(null),a=r.useRef(0),s=r.useRef(null),l=r.useRef([]),m=r.useRef(),d=r.useRef(),c=r.useRef(e),u=r.useRef(!0);c.current=e;var f=typeof window<"u",R=!n&&n!==0&&f;if(typeof e!="function")throw new TypeError("Expected a function");n=+n||0;var y=!!(t=t||{}).leading,C=!("trailing"in t)||!!t.trailing,v="maxWait"in t,D="debounceOnServer"in t&&!!t.debounceOnServer,S=v?Math.max(+t.maxWait||0,n):null;r.useEffect(function(){return u.current=!0,function(){u.current=!1}},[]);var N=r.useMemo(function(){var E=function(B){var w=l.current,g=m.current;return l.current=m.current=null,a.current=B,d.current=c.current.apply(g,w)},$=function(B,w){R&&cancelAnimationFrame(s.current),s.current=R?requestAnimationFrame(B):setTimeout(B,w)},p=function(B){if(!u.current)return!1;var w=B-i.current;return!i.current||w>=n||w<0||v&&B-a.current>=S},b=function(B){return s.current=null,C&&l.current?E(B):(l.current=m.current=null,d.current)},T=function B(){var w=Date.now();if(p(w))return b(w);if(u.current){var g=n-(w-i.current),L=v?Math.min(g,S-(w-a.current)):g;$(B,L)}},j=function(){if(f||D){var B=Date.now(),w=p(B);if(l.current=[].slice.call(arguments),m.current=o,i.current=B,w){if(!s.current&&u.current)return a.current=i.current,$(T,n),y?E(i.current):d.current;if(v)return $(T,n),E(i.current)}return s.current||$(T,n),d.current}};return j.cancel=function(){s.current&&(R?cancelAnimationFrame(s.current):clearTimeout(s.current)),a.current=0,l.current=i.current=m.current=s.current=null},j.isPending=function(){return!!s.current},j.flush=function(){return s.current?b(Date.now()):d.current},j},[y,v,n,S,C,R,f,D]);return N}function to(e,n,t){var o=t===void 0?{}:t,i=o.leading,a=o.trailing;return Gt(e,n,{maxWait:n,leading:i===void 0||i,trailing:a===void 0||a})}const Wt=e=>{const{horizontal:n,reversed:t,verticalAlign:o="start",horizontalAlign:i="start",gap:a=8,height:s="auto",width:l="100%",grow:m,style:d,...c}=e,u=r.useMemo(()=>n?t?"row-reverse":"row":t?"column-reverse":"column",[n,t]);return jn.jsx("div",{style:{display:"flex",flexDirection:u,justifyContent:n?i:o,alignItems:n?o:i,height:s,width:l,gap:a,flexGrow:m?1:void 0,...d},...c})};Wt.__docgenInfo={description:"",methods:[],displayName:"Stack",props:{horizontal:{required:!1,tsType:{name:"boolean"},description:""},reversed:{required:!1,tsType:{name:"boolean"},description:""},grow:{required:!1,tsType:{name:"boolean"},description:""},verticalAlign:{required:!1,tsType:{name:"union",raw:`| 'start'
| 'end'
| 'center'
| 'space-between'
| 'space-around'
| 'space-evenly'
| 'baseline'
| 'stretch'`,elements:[{name:"literal",value:"'start'"},{name:"literal",value:"'end'"},{name:"literal",value:"'center'"},{name:"literal",value:"'space-between'"},{name:"literal",value:"'space-around'"},{name:"literal",value:"'space-evenly'"},{name:"literal",value:"'baseline'"},{name:"literal",value:"'stretch'"}]},description:""},horizontalAlign:{required:!1,tsType:{name:"union",raw:`| 'start'
| 'end'
| 'center'
| 'space-between'
| 'space-around'
| 'space-evenly'
| 'baseline'
| 'stretch'`,elements:[{name:"literal",value:"'start'"},{name:"literal",value:"'end'"},{name:"literal",value:"'center'"},{name:"literal",value:"'space-between'"},{name:"literal",value:"'space-around'"},{name:"literal",value:"'space-evenly'"},{name:"literal",value:"'baseline'"},{name:"literal",value:"'stretch'"}]},description:""},gap:{required:!1,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:""},height:{required:!1,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:""},width:{required:!1,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:""}}};const qt=`declare namespace Big {
    type BigSource = number | string | Big;

    /**
     * GT = 1, EQ = 0, LT = -1
     */
    type Comparison = -1 | 0 | 1;

    /**
     * RoundDown = 0, RoundHalfUp = 1, RoundHalfEven = 2, RoundUp = 3
     */
    type RoundingMode = 0 | 1 | 2 | 3;

    interface BigConstructor {
        /**
         * Returns a new instance of a Big number object
         *
         * String values may be in exponential, as well as normal (non-exponential) notation.
         * There is no limit to the number of digits of a string value (other than that of Javascript's maximum array size), but the largest recommended exponent magnitude is 1e+6.
         * Infinity, NaN and hexadecimal literal strings, e.g. '0xff', are not valid.
         * String values in octal literal form will be interpreted as decimals, e.g. '011' is 11, not 9.
         *
         * @throws \`NaN\` on an invalid value.
         */
        new(value: BigSource): Big;

        /**
         * Returns a new instance of a Big number object
         *
         * String values may be in exponential, as well as normal (non-exponential) notation.
         * There is no limit to the number of digits of a string value (other than that of Javascript's maximum array size), but the largest recommended exponent magnitude is 1e+6.
         * Infinity, NaN and hexadecimal literal strings, e.g. '0xff', are not valid.
         * String values in octal literal form will be interpreted as decimals, e.g. '011' is 11, not 9.
         *
         * @throws \`NaN\` on an invalid value.
         */
        (value: BigSource): Big;

        /**
         * Create an additional Big number constructor
         *
         * Values created with the returned constructor will have a separate set of configuration values.
         * This can be used to create Big objects with different DP and RM values.
         * Big numbers created by different constructors can be used together in operations, and it is the DP and RM setting of the Big number that an operation is called upon that will apply.
         * In the interest of memory efficiency, all Big number constructors share the same prototype object,
         * so while the DP and RM (and any other own properties) of a constructor are isolated and untouchable by another, its prototype methods are not.
         */
        (): BigConstructor;

        /**
         * The maximum number of decimal places of the results of operations involving division.
         * It is relevant only to the div and sqrt methods, and the pow method when the exponent is negative.
         *
         * 0 to 1e+6 inclusive
         * Default value: 20
         */
        DP: number;
        /**
         * The rounding mode used in the above operations and by round, toExponential, toFixed and toPrecision.
         * Default value: 1
         */
        RM: number;
        /**
         * The negative exponent value at and below which toString returns exponential notation.
         *
         * -1e+6 to 0 inclusive
         * Default value: -7
         */
        NE: number;
        /**
         * The positive exponent value at and above which toString returns exponential notation.
         *
         * 0 to 1e+6 inclusive
         * Default value: 21
         */
        PE: number;
        /**
         * When set to true, an error will be thrown if a primitive number is passed to the Big constructor,
         * or if valueOf is called, or if toNumber is called on a Big which cannot be converted to a primitive number without a loss of precision.
         *
         * true|false
         * Default value: false
         */
        strict: boolean;

        /** Readonly rounding modes */

        /**
         * Rounds towards zero.
         * I.e. truncate, no rounding.
         */
        readonly roundDown: 0;
        /**
         * Rounds towards nearest neighbour.
         * If equidistant, rounds away from zero.
         */
        readonly roundHalfUp: 1;
        /**
         * Rounds towards nearest neighbour.
         * If equidistant, rounds towards even neighbour.
         */
        readonly roundHalfEven: 2;
        /**
         * Rounds away from zero.
         */
        readonly roundUp: 3;

        readonly Big: BigConstructor;
    }

    interface Big {
        /** Returns a Big number whose value is the absolute value, i.e. the magnitude, of this Big number. */
        abs(): Big;
        /**
         * Returns a Big number whose value is the value of this Big number plus n - alias for .plus().
         *
         * @throws \`NaN\` if n is invalid.
         */
        add(n: BigSource): Big;
        /**
         * Compare the values.
         *
         * @throws \`NaN\` if n is invalid.
         */
        cmp(n: BigSource): Comparison;
        /**
         * Returns a Big number whose value is the value of this Big number divided by n.
         *
         * If the result has more fraction digits than is specified by Big.DP, it will be rounded to Big.DP decimal places using rounding mode Big.RM.
         *
         * @throws \`NaN\` if n is invalid.
         * @throws \`±Infinity\` on division by zero.
         * @throws \`NaN\` on division of zero by zero.
         */
        div(n: BigSource): Big;
        /**
         * Returns true if the value of this Big equals the value of n, otherwise returns false.
         *
         * @throws \`NaN\` if n is invalid.
         */
        eq(n: BigSource): boolean;
        /**
         * Returns true if the value of this Big is greater than the value of n, otherwise returns false.
         *
         * @throws \`NaN\` if n is invalid.
         */
        gt(n: BigSource): boolean;
        /**
         * Returns true if the value of this Big is greater than or equal to the value of n, otherwise returns false.
         *
         * @throws \`NaN\` if n is invalid.
         */
        gte(n: BigSource): boolean;
        /**
         * Returns true if the value of this Big is less than the value of n, otherwise returns false.
         *
         * @throws \`NaN\` if n is invalid.
         */
        lt(n: BigSource): boolean;
        /**
         * Returns true if the value of this Big is less than or equal to the value of n, otherwise returns false.
         *
         * @throws \`NaN\` if n is invalid.
         */
        lte(n: BigSource): boolean;
        /**
         * Returns a Big number whose value is the value of this Big number minus n.
         *
         * @throws \`NaN\` if n is invalid.
         */
        minus(n: BigSource): Big;
        /**
         * Returns a Big number whose value is the value of this Big number modulo n, i.e. the integer remainder of dividing this Big number by n.
         *
         * The result will have the same sign as this Big number, and it will match that of Javascript's % operator (within the limits of its precision) and BigDecimal's remainder method.
         *
         * @throws \`NaN\` if n is negative or otherwise invalid.
         */
        mod(n: BigSource): Big;
        /**
         * Returns a Big number whose value is the value of this Big number times n - alias for .times().
         *
         * @throws \`NaN\` if n is invalid.
         */
        mul(n: BigSource): Big;
        /**
         * Return a new Big whose value is the value of this Big negated.
         */
        neg(): Big;
        /**
         * Returns a Big number whose value is the value of this Big number plus n.
         *
         * @throws \`NaN\` if n is invalid.
         */
        plus(n: BigSource): Big;
        /**
         * Returns a Big number whose value is the value of this Big number raised to the power exp.
         *
         * If exp is negative and the result has more fraction digits than is specified by Big.DP, it will be rounded to Big.DP decimal places using rounding mode Big.RM.
         *
         * @param exp The power to raise the number to, -1e+6 to 1e+6 inclusive
         * @throws \`!pow!\` if exp is invalid.
         *
         * Note: High value exponents may cause this method to be slow to return.
         */
        pow(exp: number): Big;
        /**
         * Return a new Big whose value is the value of this Big rounded to a maximum precision of sd
         * significant digits using rounding mode rm, or Big.RM if rm is not specified.
         *
         * @param sd Significant digits: integer, 1 to MAX_DP inclusive.
         * @param rm Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
         * @throws \`!prec!\` if sd is invalid.
         * @throws \`!Big.RM!\` if rm is invalid.
         */
        prec(sd: number, rm?: RoundingMode): Big;
        /**
         * Returns a Big number whose value is the value of this Big number rounded using rounding mode rm to a maximum of dp decimal places.
         *
         * @param dp Decimal places, 0 to 1e+6 inclusive
         * @param rm Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
         * @throws \`!round!\` if dp is invalid.
         * @throws \`!Big.RM!\` if rm is invalid.
         */
        round(dp?: number, rm?: RoundingMode): Big;
        /**
         * Returns a Big number whose value is the square root of this Big number.
         *
         * If the result has more fraction digits than is specified by Big.DP, it will be rounded to Big.DP decimal places using rounding mode Big.RM.
         *
         * @throws \`NaN\` if this Big number is negative.
         */
        sqrt(): Big;
        /**
         * Returns a Big number whose value is the value of this Big number minus n - alias for .minus().
         *
         * @throws \`NaN\` if n is invalid.
         */
        sub(n: BigSource): Big;
        /**
         * Returns a Big number whose value is the value of this Big number times n.
         *
         * @throws \`NaN\` if n is invalid.
         */
        times(n: BigSource): Big;
        /**
         * Returns a string representing the value of this Big number in exponential notation to a fixed number of decimal places dp.
         *
         * If the value of this Big number in exponential notation has more digits to the right of the decimal point than is specified by dp,
         * the return value will be rounded to dp decimal places using rounding mode Big.RM.
         *
         * If the value of this Big number in exponential notation has fewer digits to the right of the decimal point than is specified by dp, the return value will be appended with zeros accordingly.
         *
         * If dp is omitted, or is null or undefined, the number of digits after the decimal point defaults to the minimum number of digits necessary to represent the value exactly.
         *
         * @param dp Decimal places, 0 to 1e+6 inclusive
         * @param rm Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
         * @throws \`!toFix!\` if dp is invalid.
         */
        toExponential(dp?: number, rm?: RoundingMode): string;
        /**
         * Returns a string representing the value of this Big number in normal notation to a fixed number of decimal places dp.
         *
         * If the value of this Big number in normal notation has more digits to the right of the decimal point than is specified by dp,
         * the return value will be rounded to dp decimal places using rounding mode Big.RM.
         *
         * If the value of this Big number in normal notation has fewer fraction digits then is specified by dp, the return value will be appended with zeros accordingly.
         *
         * Unlike Number.prototype.toFixed, which returns exponential notation if a number is greater or equal to 1021, this method will always return normal notation.
         *
         * If dp is omitted, or is null or undefined, then the return value is simply the value in normal notation.
         * This is also unlike Number.prototype.toFixed, which returns the value to zero decimal places.
         *
         * @param dp Decimal places, 0 to 1e+6 inclusive
         * @param rm Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
         * @throws \`!toFix!\` if dp is invalid.
         */
        toFixed(dp?: number, rm?: RoundingMode): string;
        /**
         * Returns a string representing the value of this Big number to the specified number of significant digits sd.
         *
         * If the value of this Big number has more digits than is specified by sd, the return value will be rounded to sd significant digits using rounding mode Big.RM.
         *
         * If the value of this Big number has fewer digits than is specified by sd, the return value will be appended with zeros accordingly.
         *
         * If sd is less than the number of digits necessary to represent the integer part of the value in normal notation, then exponential notation is used.
         *
         * If sd is omitted, or is null or undefined, then the return value is the same as .toString().
         *
         * @param sd Significant digits, 1 to 1e+6 inclusive
         * @param rm Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
         * @throws \`!toPre!\` if sd is invalid.
         */
        toPrecision(sd?: number, rm?: RoundingMode): string;
        /**
         * Returns a string representing the value of this Big number.
         *
         * If this Big number has a positive exponent that is equal to or greater than 21, or a negative exponent equal to or less than -7, then exponential notation is returned.
         *
         * The point at which toString returns exponential rather than normal notation can be adjusted by changing
         * the value of Big.E_POS and Big.E_NEG. By default, Big numbers correspond to Javascript's number type in this regard.
         */
        toString(): string;
        /**
         * Returns a primitive number representing the value of this Big number.
         *
         * If Big.strict is true an error will be thrown if toNumber is called on a Big number which cannot be converted to a primitive number without a loss of precision.
         *
         * @since 6.0
         */
        toNumber(): number;
        /**
         * Returns a string representing the value of this Big number.
         *
         * If this Big number has a positive exponent that is equal to or greater than 21, or a negative exponent equal to or less than -7, then exponential notation is returned.
         *
         * The point at which toString returns exponential rather than normal notation can be adjusted by changing
         * the value of Big.E_POS and Big.E_NEG. By default, Big numbers correspond to Javascript's number type in this regard.
         */
        valueOf(): string;
        /**
         * Returns a string representing the value of this Big number.
         *
         * If this Big number has a positive exponent that is equal to or greater than 21, or a negative exponent equal to or less than -7, then exponential notation is returned.
         *
         * The point at which toString returns exponential rather than normal notation can be adjusted by changing
         * the value of Big.E_POS and Big.E_NEG. By default, Big numbers correspond to Javascript's number type in this regard.
         */
        toJSON(): string;
        /**
         * Returns an array of single digits
         */
        c: number[];
        /**
         * Returns the exponent, Integer, -1e+6 to 1e+6 inclusive
         */
        e: number;
        /**
         * Returns the sign, -1 or 1
         */
        s: number;
    }
}

// We want the exported symbol 'Big' to represent two things:
// - The Big interface, when used in a type context.
// - The BigConstructor instance, when used in a value context.
declare const Big: Big.BigConstructor;
type Big = Big.Big;

// The export is the same as type/value combo symbol 'Big'.
export = Big;
export as namespace Big;
`,Ut=`/// <reference path="./locale/index.d.ts" />

export = dayjs;

declare function dayjs (date?: dayjs.ConfigType): dayjs.Dayjs

declare function dayjs (date?: dayjs.ConfigType, format?: dayjs.OptionType, strict?: boolean): dayjs.Dayjs

declare function dayjs (date?: dayjs.ConfigType, format?: dayjs.OptionType, locale?: string, strict?: boolean): dayjs.Dayjs

declare namespace dayjs {
  interface ConfigTypeMap {
    default: string | number | Date | Dayjs | null | undefined
  }

  export type ConfigType = ConfigTypeMap[keyof ConfigTypeMap]

  export interface FormatObject { locale?: string, format?: string, utc?: boolean }

  export type OptionType = FormatObject | string | string[]

  export type UnitTypeShort = 'd' | 'D' | 'M' | 'y' | 'h' | 'm' | 's' | 'ms'

  export type UnitTypeLong = 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year' | 'date'

  export type UnitTypeLongPlural = 'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days' | 'months' | 'years' | 'dates'
  
  export type UnitType = UnitTypeLong | UnitTypeLongPlural | UnitTypeShort;

  export type OpUnitType = UnitType | "week" | "weeks" | 'w';
  export type QUnitType = UnitType | "quarter" | "quarters" | 'Q';
  export type ManipulateType = Exclude<OpUnitType, 'date' | 'dates'>;
  class Dayjs {
    constructor (config?: ConfigType)
    /**
     * All Day.js objects are immutable. Still, \`dayjs#clone\` can create a clone of the current object if you need one.
     * \`\`\`
     * dayjs().clone()// => Dayjs
     * dayjs(dayjs('2019-01-25')) // passing a Dayjs object to a constructor will also clone it
     * \`\`\`
     * Docs: https://day.js.org/docs/en/parse/dayjs-clone
     */
    clone(): Dayjs
    /**
     * This returns a \`boolean\` indicating whether the Day.js object contains a valid date or not.
     * \`\`\`
     * dayjs().isValid()// => boolean
     * \`\`\`
     * Docs: https://day.js.org/docs/en/parse/is-valid
     */
    isValid(): boolean
    /**
     * Get the year.
     * \`\`\`
     * dayjs().year()// => 2020
     * \`\`\`
     * Docs: https://day.js.org/docs/en/get-set/year
     */
    year(): number
    /**
     * Set the year.
     * \`\`\`
     * dayjs().year(2000)// => Dayjs
     * \`\`\`
     * Docs: https://day.js.org/docs/en/get-set/year
     */
    year(value: number): Dayjs
    /**
     * Get the month.
     *
     * Months are zero indexed, so January is month 0.
     * \`\`\`
     * dayjs().month()// => 0-11
     * \`\`\`
     * Docs: https://day.js.org/docs/en/get-set/month
     */
    month(): number
    /**
     * Set the month.
     *
     * Months are zero indexed, so January is month 0.
     *
     * Accepts numbers from 0 to 11. If the range is exceeded, it will bubble up to the next year.
     * \`\`\`
     * dayjs().month(0)// => Dayjs
     * \`\`\`
     * Docs: https://day.js.org/docs/en/get-set/month
     */
    month(value: number): Dayjs
    /**
     * Get the date of the month.
     * \`\`\`
     * dayjs().date()// => 1-31
     * \`\`\`
     * Docs: https://day.js.org/docs/en/get-set/date
     */
    date(): number
    /**
     * Set the date of the month.
     *
     * Accepts numbers from 1 to 31. If the range is exceeded, it will bubble up to the next months.
     * \`\`\`
     * dayjs().date(1)// => Dayjs
     * \`\`\`
     * Docs: https://day.js.org/docs/en/get-set/date
     */
    date(value: number): Dayjs
    /**
     * Get the day of the week.
     *
     * Returns numbers from 0 (Sunday) to 6 (Saturday).
     * \`\`\`
     * dayjs().day()// 0-6
     * \`\`\`
     * Docs: https://day.js.org/docs/en/get-set/day
     */
    day(): 0 | 1 | 2 | 3 | 4 | 5 | 6
    /**
     * Set the day of the week.
     *
     * Accepts numbers from 0 (Sunday) to 6 (Saturday). If the range is exceeded, it will bubble up to next weeks.
     * \`\`\`
     * dayjs().day(0)// => Dayjs
     * \`\`\`
     * Docs: https://day.js.org/docs/en/get-set/day
     */
    day(value: number): Dayjs
    /**
     * Get the hour.
     * \`\`\`
     * dayjs().hour()// => 0-23
     * \`\`\`
     * Docs: https://day.js.org/docs/en/get-set/hour
     */
    hour(): number
    /**
     * Set the hour.
     *
     * Accepts numbers from 0 to 23. If the range is exceeded, it will bubble up to the next day.
     * \`\`\`
     * dayjs().hour(12)// => Dayjs
     * \`\`\`
     * Docs: https://day.js.org/docs/en/get-set/hour
     */
    hour(value: number): Dayjs
    /**
     * Get the minutes.
     * \`\`\`
     * dayjs().minute()// => 0-59
     * \`\`\`
     * Docs: https://day.js.org/docs/en/get-set/minute
     */
    minute(): number
    /**
     * Set the minutes.
     *
     * Accepts numbers from 0 to 59. If the range is exceeded, it will bubble up to the next hour.
     * \`\`\`
     * dayjs().minute(59)// => Dayjs
     * \`\`\`
     * Docs: https://day.js.org/docs/en/get-set/minute
     */
    minute(value: number): Dayjs
    /**
     * Get the seconds.
     * \`\`\`
     * dayjs().second()// => 0-59
     * \`\`\`
     * Docs: https://day.js.org/docs/en/get-set/second
     */
    second(): number
    /**
     * Set the seconds.
     *
     * Accepts numbers from 0 to 59. If the range is exceeded, it will bubble up to the next minutes.
     * \`\`\`
     * dayjs().second(1)// Dayjs
     * \`\`\`
     */
    second(value: number): Dayjs
    /**
     * Get the milliseconds.
     * \`\`\`
     * dayjs().millisecond()// => 0-999
     * \`\`\`
     * Docs: https://day.js.org/docs/en/get-set/millisecond
     */
    millisecond(): number
    /**
     * Set the milliseconds.
     *
     * Accepts numbers from 0 to 999. If the range is exceeded, it will bubble up to the next seconds.
     * \`\`\`
     * dayjs().millisecond(1)// => Dayjs
     * \`\`\`
     * Docs: https://day.js.org/docs/en/get-set/millisecond
     */
    millisecond(value: number): Dayjs
    /**
     * Generic setter, accepting unit as first argument, and value as second, returns a new instance with the applied changes.
     *
     * In general:
     * \`\`\`
     * dayjs().set(unit, value) === dayjs()[unit](value)
     * \`\`\`
     * Units are case insensitive, and support plural and short forms.
     * \`\`\`
     * dayjs().set('date', 1)
     * dayjs().set('month', 3) // April
     * dayjs().set('second', 30)
     * \`\`\`
     * Docs: https://day.js.org/docs/en/get-set/set
     */
    set(unit: UnitType, value: number): Dayjs
    /**
     * String getter, returns the corresponding information getting from Day.js object.
     *
     * In general:
     * \`\`\`
     * dayjs().get(unit) === dayjs()[unit]()
     * \`\`\`
     * Units are case insensitive, and support plural and short forms.
     * \`\`\`
     * dayjs().get('year')
     * dayjs().get('month') // start 0
     * dayjs().get('date')
     * \`\`\`
     * Docs: https://day.js.org/docs/en/get-set/get
     */
    get(unit: UnitType): number
    /**
     * Returns a cloned Day.js object with a specified amount of time added.
     * \`\`\`
     * dayjs().add(7, 'day')// => Dayjs
     * \`\`\`
     * Units are case insensitive, and support plural and short forms.
     *
     * Docs: https://day.js.org/docs/en/manipulate/add
     */
    add(value: number, unit?: ManipulateType): Dayjs
    /**
     * Returns a cloned Day.js object with a specified amount of time subtracted.
     * \`\`\`
     * dayjs().subtract(7, 'year')// => Dayjs
     * \`\`\`
     * Units are case insensitive, and support plural and short forms.
     *
     * Docs: https://day.js.org/docs/en/manipulate/subtract
     */
    subtract(value: number, unit?: ManipulateType): Dayjs
    /**
     * Returns a cloned Day.js object and set it to the start of a unit of time.
     * \`\`\`
     * dayjs().startOf('year')// => Dayjs
     * \`\`\`
     * Units are case insensitive, and support plural and short forms.
     *
     * Docs: https://day.js.org/docs/en/manipulate/start-of
     */
    startOf(unit: OpUnitType): Dayjs
    /**
     * Returns a cloned Day.js object and set it to the end of a unit of time.
     * \`\`\`
     * dayjs().endOf('month')// => Dayjs
     * \`\`\`
     * Units are case insensitive, and support plural and short forms.
     *
     * Docs: https://day.js.org/docs/en/manipulate/end-of
     */
    endOf(unit: OpUnitType): Dayjs
    /**
     * Get the formatted date according to the string of tokens passed in.
     *
     * To escape characters, wrap them in square brackets (e.g. [MM]).
     * \`\`\`
     * dayjs().format()// => current date in ISO8601, without fraction seconds e.g. '2020-04-02T08:02:17-05:00'
     * dayjs('2019-01-25').format('[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]')// 'YYYYescape 2019-01-25T00:00:00-02:00Z'
     * dayjs('2019-01-25').format('DD/MM/YYYY') // '25/01/2019'
     * \`\`\`
     * Docs: https://day.js.org/docs/en/display/format
     */
    format(template?: string): string
    /**
     * This indicates the difference between two date-time in the specified unit.
     *
     * To get the difference in milliseconds, use \`dayjs#diff\`
     * \`\`\`
     * const date1 = dayjs('2019-01-25')
     * const date2 = dayjs('2018-06-05')
     * date1.diff(date2) // 20214000000 default milliseconds
     * date1.diff() // milliseconds to current time
     * \`\`\`
     *
     * To get the difference in another unit of measurement, pass that measurement as the second argument.
     * \`\`\`
     * const date1 = dayjs('2019-01-25')
     * date1.diff('2018-06-05', 'month') // 7
     * \`\`\`
     * Units are case insensitive, and support plural and short forms.
     *
     * Docs: https://day.js.org/docs/en/display/difference
     */
    diff(date?: ConfigType, unit?: QUnitType | OpUnitType, float?: boolean): number
    /**
     * This returns the number of **milliseconds** since the Unix Epoch of the Day.js object.
     * \`\`\`
     * dayjs('2019-01-25').valueOf() // 1548381600000
     * +dayjs(1548381600000) // 1548381600000
     * \`\`\`
     * To get a Unix timestamp (the number of seconds since the epoch) from a Day.js object, you should use Unix Timestamp \`dayjs#unix()\`.
     *
     * Docs: https://day.js.org/docs/en/display/unix-timestamp-milliseconds
     */
    valueOf(): number
    /**
     * This returns the Unix timestamp (the number of **seconds** since the Unix Epoch) of the Day.js object.
     * \`\`\`
     * dayjs('2019-01-25').unix() // 1548381600
     * \`\`\`
     * This value is floored to the nearest second, and does not include a milliseconds component.
     *
     * Docs: https://day.js.org/docs/en/display/unix-timestamp
     */
    unix(): number
    /**
     * Get the number of days in the current month.
     * \`\`\`
     * dayjs('2019-01-25').daysInMonth() // 31
     * \`\`\`
     * Docs: https://day.js.org/docs/en/display/days-in-month
     */
    daysInMonth(): number
    /**
     * To get a copy of the native \`Date\` object parsed from the Day.js object use \`dayjs#toDate\`.
     * \`\`\`
     * dayjs('2019-01-25').toDate()// => Date
     * \`\`\`
     */
    toDate(): Date
    /**
     * To serialize as an ISO 8601 string.
     * \`\`\`
     * dayjs('2019-01-25').toJSON() // '2019-01-25T02:00:00.000Z'
     * \`\`\`
     * Docs: https://day.js.org/docs/en/display/as-json
     */
    toJSON(): string
    /**
     * To format as an ISO 8601 string.
     * \`\`\`
     * dayjs('2019-01-25').toISOString() // '2019-01-25T02:00:00.000Z'
     * \`\`\`
     * Docs: https://day.js.org/docs/en/display/as-iso-string
     */
    toISOString(): string
    /**
     * Returns a string representation of the date.
     * \`\`\`
     * dayjs('2019-01-25').toString() // 'Fri, 25 Jan 2019 02:00:00 GMT'
     * \`\`\`
     * Docs: https://day.js.org/docs/en/display/as-string
     */
    toString(): string
    /**
     * Get the UTC offset in minutes.
     * \`\`\`
     * dayjs().utcOffset()
     * \`\`\`
     * Docs: https://day.js.org/docs/en/manipulate/utc-offset
     */
    utcOffset(): number
    /**
     * This indicates whether the Day.js object is before the other supplied date-time.
     * \`\`\`
     * dayjs().isBefore(dayjs('2011-01-01')) // default milliseconds
     * \`\`\`
     * If you want to limit the granularity to a unit other than milliseconds, pass it as the second parameter.
     * \`\`\`
     * dayjs().isBefore('2011-01-01', 'year')// => boolean
     * \`\`\`
     * Units are case insensitive, and support plural and short forms.
     *
     * Docs: https://day.js.org/docs/en/query/is-before
     */
    isBefore(date?: ConfigType, unit?: OpUnitType): boolean
    /**
     * This indicates whether the Day.js object is the same as the other supplied date-time.
     * \`\`\`
     * dayjs().isSame(dayjs('2011-01-01')) // default milliseconds
     * \`\`\`
     * If you want to limit the granularity to a unit other than milliseconds, pass it as the second parameter.
     * \`\`\`
     * dayjs().isSame('2011-01-01', 'year')// => boolean
     * \`\`\`
     * Docs: https://day.js.org/docs/en/query/is-same
     */
    isSame(date?: ConfigType, unit?: OpUnitType): boolean
    /**
     * This indicates whether the Day.js object is after the other supplied date-time.
     * \`\`\`
     * dayjs().isAfter(dayjs('2011-01-01')) // default milliseconds
     * \`\`\`
     * If you want to limit the granularity to a unit other than milliseconds, pass it as the second parameter.
     * \`\`\`
     * dayjs().isAfter('2011-01-01', 'year')// => boolean
     * \`\`\`
     * Units are case insensitive, and support plural and short forms.
     *
     * Docs: https://day.js.org/docs/en/query/is-after
     */
    isAfter(date?: ConfigType, unit?: OpUnitType): boolean

    locale(): string

    locale(preset: string | ILocale, object?: Partial<ILocale>): Dayjs
  }

  export type PluginFunc<T = unknown> = (option: T, c: typeof Dayjs, d: typeof dayjs) => void

  export function extend<T = unknown>(plugin: PluginFunc<T>, option?: T): Dayjs

  export function locale(preset?: string | ILocale, object?: Partial<ILocale>, isLocal?: boolean): string

  export function isDayjs(d: any): d is Dayjs

  export function unix(t: number): Dayjs

  const Ls : { [key: string] :  ILocale }
}
`,Ft=`/**
 * @param input
 * @param {{
 *  dayjs: import('dayjs')
 *  Big: import('big.js').BigConstructor
 * }} helpers
 */
const handler = (input, { dayjs, Big }) => {
  return input;
};
`,oo={dayjs:Ut,"big.js":qt},io=Ft;export{Qt as B,kt as D,no as F,Wt as S,qe as T,Un as W,Gt as a,eo as b,Kt as c,io as d,oo as e,to as f,En as r,Nn as u};
