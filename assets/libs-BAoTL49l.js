import{r as i,R as h}from"./index-uubelm5h.js";import{e as W,i as en,j as ne,k as nn,l as En,m as On,w as te,n as tn,p as De,c as P,C as J,q as on,r as An,s as wn,v as Se,x as jn,y as Nn,R as Un,b as j,z as Bn,A as Mn,B as rn,E as an,_ as sn,G as Q,H as ye,J as dn,K as G,L as kn,M as Kn,N as $n,D as Fn,O as Vn,P as Ln,o as Hn,I as ln,d as un,Q as qn,S as pn,U as Wn}from"./index-DHssZ0Ax.js";import{R as Gn}from"./index-BK_xiHMm.js";import{j as Yn}from"./jsx-runtime-QvZ8i92b.js";var X=W({},Gn),Jn=X.version,Qn=X.render,Xn=X.unmountComponentAtNode,ae;try{var et=Number((Jn||"").split(".")[0]);et>=18&&(ae=X.createRoot)}catch{}function Le(e){var n=X.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;n&&nn(n)==="object"&&(n.usingClientEntryPoint=e)}var oe="__rc_react_root__";function nt(e,n){Le(!0);var t=n[oe]||ae(n);Le(!1),t.render(e),n[oe]=t}function tt(e,n){Qn(e,n)}function ot(e,n){if(ae){nt(e,n);return}tt(e,n)}function rt(e){return xe.apply(this,arguments)}function xe(){return xe=en(ne().mark(function e(n){return ne().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.abrupt("return",Promise.resolve().then(function(){var r;(r=n[oe])===null||r===void 0||r.unmount(),delete n[oe]}));case 1:case"end":return o.stop()}},e)})),xe.apply(this,arguments)}function at(e){Xn(e)}function st(e){return _e.apply(this,arguments)}function _e(){return _e=en(ne().mark(function e(n){return ne().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:if(ae===void 0){o.next=2;break}return o.abrupt("return",rt(n));case 2:at(n);case 3:case"end":return o.stop()}},e)})),_e.apply(this,arguments)}const it=e=>{const{componentCls:n,colorPrimary:t}=e;return{[n]:{position:"absolute",background:"transparent",pointerEvents:"none",boxSizing:"border-box",color:`var(--wave-color, ${t})`,boxShadow:"0 0 0 0 currentcolor",opacity:.2,"&.wave-motion-appear":{transition:[`box-shadow 0.4s ${e.motionEaseOutCirc}`,`opacity 2s ${e.motionEaseOutCirc}`].join(","),"&-active":{boxShadow:"0 0 0 6px currentcolor",opacity:0},"&.wave-quick":{transition:[`box-shadow ${e.motionDurationSlow} ${e.motionEaseInOut}`,`opacity ${e.motionDurationSlow} ${e.motionEaseInOut}`].join(",")}}}}},dt=En("Wave",e=>[it(e)]),cn=`${On}-wave-target`;function me(e){return e&&e!=="#fff"&&e!=="#ffffff"&&e!=="rgb(255, 255, 255)"&&e!=="rgba(255, 255, 255, 1)"&&!/rgba\((?:\d*, ){3}0\)/.test(e)&&e!=="transparent"}function lt(e){const{borderTopColor:n,borderColor:t,backgroundColor:o}=getComputedStyle(e);return me(n)?n:me(t)?t:me(o)?o:null}function fe(e){return Number.isNaN(e)?0:e}const ut=e=>{const{className:n,target:t,component:o}=e,r=i.useRef(null),[a,s]=i.useState(null),[l,d]=i.useState([]),[u,p]=i.useState(0),[c,y]=i.useState(0),[b,A]=i.useState(0),[w,z]=i.useState(0),[x,m]=i.useState(!1),g={left:u,top:c,width:b,height:w,borderRadius:l.map(T=>`${T}px`).join(" ")};a&&(g["--wave-color"]=a);function C(){const T=getComputedStyle(t);s(lt(t));const f=T.position==="static",{borderLeftWidth:R,borderTopWidth:S}=T;p(f?t.offsetLeft:fe(-parseFloat(R))),y(f?t.offsetTop:fe(-parseFloat(S))),A(t.offsetWidth),z(t.offsetHeight);const{borderTopLeftRadius:Z,borderTopRightRadius:v,borderBottomLeftRadius:N,borderBottomRightRadius:U}=T;d([Z,v,U,N].map(ee=>fe(parseFloat(ee))))}if(i.useEffect(()=>{if(t){const T=te(()=>{C(),m(!0)});let f;return typeof ResizeObserver<"u"&&(f=new ResizeObserver(C),f.observe(t)),()=>{te.cancel(T),f?.disconnect()}}},[]),!x)return null;const D=(o==="Checkbox"||o==="Radio")&&t?.classList.contains(cn);return i.createElement(tn,{visible:!0,motionAppear:!0,motionName:"wave-motion",motionDeadline:5e3,onAppearEnd:(T,f)=>{var R;if(f.deadline||f.propertyName==="opacity"){const S=(R=r.current)===null||R===void 0?void 0:R.parentElement;st(S).then(()=>{S?.remove()})}return!1}},(T,f)=>{let{className:R}=T;return i.createElement("div",{ref:De(r,f),className:P(n,R,{"wave-quick":D}),style:g})})},pt=(e,n)=>{var t;const{component:o}=n;if(o==="Checkbox"&&!(!((t=e.querySelector("input"))===null||t===void 0)&&t.checked))return;const r=document.createElement("div");r.style.position="absolute",r.style.left="0px",r.style.top="0px",e?.insertBefore(r,e?.firstChild),ot(i.createElement(ut,Object.assign({},n,{target:e})),r)},ct=(e,n,t)=>{const{wave:o}=i.useContext(J),[,r,a]=on(),s=An(u=>{const p=e.current;if(o?.disabled||!p)return;const c=p.querySelector(`.${cn}`)||p,{showEffect:y}=o||{};(y||pt)(c,{className:n,token:r,component:t,event:u,hashId:a})}),l=i.useRef();return u=>{te.cancel(l.current),l.current=te(()=>{s(u)})}},yt=e=>{const{children:n,disabled:t,component:o}=e,{getPrefixCls:r}=i.useContext(J),a=i.useRef(null),s=r("wave"),[,l]=dt(s),d=ct(a,P(s,l),o);if(h.useEffect(()=>{const p=a.current;if(!p||p.nodeType!==1||t)return;const c=y=>{!jn(y.target)||!p.getAttribute||p.getAttribute("disabled")||p.disabled||p.className.includes("disabled")||p.className.includes("-leave")||d(y)};return p.addEventListener("click",c,!0),()=>{p.removeEventListener("click",c,!0)}},[t]),!h.isValidElement(n))return n??null;const u=wn(n)?De(n.ref,a):a;return Se(n,{ref:u})};var mt=function(e,n){var t={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&n.indexOf(o)<0&&(t[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,o=Object.getOwnPropertySymbols(e);r<o.length;r++)n.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(t[o[r]]=e[o[r]]);return t};const yn=i.createContext(void 0),ft=e=>{const{getPrefixCls:n,direction:t}=i.useContext(J),{prefixCls:o,size:r,className:a}=e,s=mt(e,["prefixCls","size","className"]),l=n("btn-group",o),[,,d]=on();let u="";switch(r){case"large":u="lg";break;case"small":u="sm";break}const p=P(l,{[`${l}-${u}`]:u,[`${l}-rtl`]:t==="rtl"},a,d);return i.createElement(yn.Provider,{value:r},i.createElement("div",Object.assign({},s,{className:p})))},He=/^[\u4E00-\u9FA5]{2}$/,Ie=He.test.bind(He);function Oo(e){return e==="danger"?{danger:!0}:{type:e}}function qe(e){return typeof e=="string"}function ge(e){return e==="text"||e==="link"}function gt(e,n){if(e==null)return;const t=n?" ":"";return typeof e!="string"&&typeof e!="number"&&qe(e.type)&&Ie(e.props.children)?Se(e,{children:e.props.children.split("").join(t)}):qe(e)?Ie(e)?h.createElement("span",null,e.split("").join(t)):h.createElement("span",null,e):Nn(e)?h.createElement("span",null,e):e}function Tt(e,n){let t=!1;const o=[];return h.Children.forEach(e,r=>{const a=typeof r,s=a==="string"||a==="number";if(t&&s){const l=o.length-1,d=o[l];o[l]=`${d}${r}`}else o.push(r);t=s}),h.Children.map(o,r=>gt(r,n))}const mn=i.forwardRef((e,n)=>{const{className:t,style:o,children:r,prefixCls:a}=e,s=P(`${a}-icon`,t);return h.createElement("span",{ref:n,className:s,style:o},r)}),We=i.forwardRef((e,n)=>{const{prefixCls:t,className:o,style:r,iconClassName:a}=e,s=P(`${t}-loading-icon`,o);return h.createElement(mn,{prefixCls:t,className:s,style:r,ref:n},h.createElement(Un,{className:a}))}),Te=()=>({width:0,opacity:0,transform:"scale(0)"}),Ze=e=>({width:e.scrollWidth,opacity:1,transform:"scale(1)"}),Zt=e=>{const{prefixCls:n,loading:t,existIcon:o,className:r,style:a}=e,s=!!t;return o?h.createElement(We,{prefixCls:n,className:r,style:a}):h.createElement(tn,{visible:s,motionName:`${n}-loading-icon-motion`,motionLeave:s,removeOnLeave:!0,onAppearStart:Te,onAppearActive:Ze,onEnterStart:Te,onEnterActive:Ze,onLeaveStart:Ze,onLeaveActive:Te},(l,d)=>{let{className:u,style:p}=l;return h.createElement(We,{prefixCls:n,className:r,style:Object.assign(Object.assign({},a),p),ref:d,iconClassName:u})})},Ge=(e,n)=>({[`> span, > ${e}`]:{"&:not(:last-child)":{[`&, & > ${e}`]:{"&:not(:disabled)":{borderInlineEndColor:n}}},"&:not(:first-child)":{[`&, & > ${e}`]:{"&:not(:disabled)":{borderInlineStartColor:n}}}}}),ht=e=>{const{componentCls:n,fontSize:t,lineWidth:o,groupBorderColor:r,colorErrorHover:a}=e;return{[`${n}-group`]:[{position:"relative",display:"inline-flex",[`> span, > ${n}`]:{"&:not(:last-child)":{[`&, & > ${n}`]:{borderStartEndRadius:0,borderEndEndRadius:0}},"&:not(:first-child)":{marginInlineStart:e.calc(o).mul(-1).equal(),[`&, & > ${n}`]:{borderStartStartRadius:0,borderEndStartRadius:0}}},[n]:{position:"relative",zIndex:1,"&:hover, &:focus, &:active":{zIndex:2},"&[disabled]":{zIndex:0}},[`${n}-icon-only`]:{fontSize:t}},Ge(`${n}-primary`,r),Ge(`${n}-danger`,a)]}},I=Math.round;function he(e,n){const t=e.replace(/^[^(]*\((.*)/,"$1").replace(/\).*/,"").match(/\d*\.?\d+%?/g)||[],o=t.map(r=>parseFloat(r));for(let r=0;r<3;r+=1)o[r]=n(o[r]||0,t[r]||"",r);return t[3]?o[3]=t[3].includes("%")?o[3]/100:o[3]:o[3]=1,o}const Ye=(e,n,t)=>t===0?e:e/100;function q(e,n){const t=n||255;return e>t?t:e<0?0:e}class se{constructor(n){j(this,"isValid",!0),j(this,"r",0),j(this,"g",0),j(this,"b",0),j(this,"a",1),j(this,"_h",void 0),j(this,"_s",void 0),j(this,"_l",void 0),j(this,"_v",void 0),j(this,"_max",void 0),j(this,"_min",void 0),j(this,"_brightness",void 0);function t(o){return o[0]in n&&o[1]in n&&o[2]in n}if(n)if(typeof n=="string"){let r=function(a){return o.startsWith(a)};const o=n.trim();/^#?[A-F\d]{3,8}$/i.test(o)?this.fromHexString(o):r("rgb")?this.fromRgbString(o):r("hsl")?this.fromHslString(o):(r("hsv")||r("hsb"))&&this.fromHsvString(o)}else if(n instanceof se)this.r=n.r,this.g=n.g,this.b=n.b,this.a=n.a,this._h=n._h,this._s=n._s,this._l=n._l,this._v=n._v;else if(t("rgb"))this.r=q(n.r),this.g=q(n.g),this.b=q(n.b),this.a=typeof n.a=="number"?q(n.a,1):1;else if(t("hsl"))this.fromHsl(n);else if(t("hsv"))this.fromHsv(n);else throw new Error("@ant-design/fast-color: unsupported input "+JSON.stringify(n))}setR(n){return this._sc("r",n)}setG(n){return this._sc("g",n)}setB(n){return this._sc("b",n)}setA(n){return this._sc("a",n,1)}setHue(n){const t=this.toHsv();return t.h=n,this._c(t)}getLuminance(){function n(a){const s=a/255;return s<=.03928?s/12.92:Math.pow((s+.055)/1.055,2.4)}const t=n(this.r),o=n(this.g),r=n(this.b);return .2126*t+.7152*o+.0722*r}getHue(){if(typeof this._h>"u"){const n=this.getMax()-this.getMin();n===0?this._h=0:this._h=I(60*(this.r===this.getMax()?(this.g-this.b)/n+(this.g<this.b?6:0):this.g===this.getMax()?(this.b-this.r)/n+2:(this.r-this.g)/n+4))}return this._h}getSaturation(){if(typeof this._s>"u"){const n=this.getMax()-this.getMin();n===0?this._s=0:this._s=n/this.getMax()}return this._s}getLightness(){return typeof this._l>"u"&&(this._l=(this.getMax()+this.getMin())/510),this._l}getValue(){return typeof this._v>"u"&&(this._v=this.getMax()/255),this._v}getBrightness(){return typeof this._brightness>"u"&&(this._brightness=(this.r*299+this.g*587+this.b*114)/1e3),this._brightness}darken(n=10){const t=this.getHue(),o=this.getSaturation();let r=this.getLightness()-n/100;return r<0&&(r=0),this._c({h:t,s:o,l:r,a:this.a})}lighten(n=10){const t=this.getHue(),o=this.getSaturation();let r=this.getLightness()+n/100;return r>1&&(r=1),this._c({h:t,s:o,l:r,a:this.a})}mix(n,t=50){const o=this._c(n),r=t/100,a=l=>(o[l]-this[l])*r+this[l],s={r:I(a("r")),g:I(a("g")),b:I(a("b")),a:I(a("a")*100)/100};return this._c(s)}tint(n=10){return this.mix({r:255,g:255,b:255,a:1},n)}shade(n=10){return this.mix({r:0,g:0,b:0,a:1},n)}onBackground(n){const t=this._c(n),o=this.a+t.a*(1-this.a),r=a=>I((this[a]*this.a+t[a]*t.a*(1-this.a))/o);return this._c({r:r("r"),g:r("g"),b:r("b"),a:o})}isDark(){return this.getBrightness()<128}isLight(){return this.getBrightness()>=128}equals(n){return this.r===n.r&&this.g===n.g&&this.b===n.b&&this.a===n.a}clone(){return this._c(this)}toHexString(){let n="#";const t=(this.r||0).toString(16);n+=t.length===2?t:"0"+t;const o=(this.g||0).toString(16);n+=o.length===2?o:"0"+o;const r=(this.b||0).toString(16);if(n+=r.length===2?r:"0"+r,typeof this.a=="number"&&this.a>=0&&this.a<1){const a=I(this.a*255).toString(16);n+=a.length===2?a:"0"+a}return n}toHsl(){return{h:this.getHue(),s:this.getSaturation(),l:this.getLightness(),a:this.a}}toHslString(){const n=this.getHue(),t=I(this.getSaturation()*100),o=I(this.getLightness()*100);return this.a!==1?`hsla(${n},${t}%,${o}%,${this.a})`:`hsl(${n},${t}%,${o}%)`}toHsv(){return{h:this.getHue(),s:this.getSaturation(),v:this.getValue(),a:this.a}}toRgb(){return{r:this.r,g:this.g,b:this.b,a:this.a}}toRgbString(){return this.a!==1?`rgba(${this.r},${this.g},${this.b},${this.a})`:`rgb(${this.r},${this.g},${this.b})`}toString(){return this.toRgbString()}_sc(n,t,o){const r=this.clone();return r[n]=q(t,o),r}_c(n){return new this.constructor(n)}getMax(){return typeof this._max>"u"&&(this._max=Math.max(this.r,this.g,this.b)),this._max}getMin(){return typeof this._min>"u"&&(this._min=Math.min(this.r,this.g,this.b)),this._min}fromHexString(n){const t=n.replace("#","");function o(r,a){return parseInt(t[r]+t[a||r],16)}t.length<6?(this.r=o(0),this.g=o(1),this.b=o(2),this.a=t[3]?o(3)/255:1):(this.r=o(0,1),this.g=o(2,3),this.b=o(4,5),this.a=t[6]?o(6,7)/255:1)}fromHsl({h:n,s:t,l:o,a:r}){if(this._h=n%360,this._s=t,this._l=o,this.a=typeof r=="number"?r:1,t<=0){const y=I(o*255);this.r=y,this.g=y,this.b=y}let a=0,s=0,l=0;const d=n/60,u=(1-Math.abs(2*o-1))*t,p=u*(1-Math.abs(d%2-1));d>=0&&d<1?(a=u,s=p):d>=1&&d<2?(a=p,s=u):d>=2&&d<3?(s=u,l=p):d>=3&&d<4?(s=p,l=u):d>=4&&d<5?(a=p,l=u):d>=5&&d<6&&(a=u,l=p);const c=o-u/2;this.r=I((a+c)*255),this.g=I((s+c)*255),this.b=I((l+c)*255)}fromHsv({h:n,s:t,v:o,a:r}){this._h=n%360,this._s=t,this._v=o,this.a=typeof r=="number"?r:1;const a=I(o*255);if(this.r=a,this.g=a,this.b=a,t<=0)return;const s=n/60,l=Math.floor(s),d=s-l,u=I(o*(1-t)*255),p=I(o*(1-t*d)*255),c=I(o*(1-t*(1-d))*255);switch(l){case 0:this.g=c,this.b=u;break;case 1:this.r=p,this.b=u;break;case 2:this.r=u,this.b=c;break;case 3:this.r=u,this.g=p;break;case 4:this.r=c,this.g=u;break;case 5:default:this.g=u,this.b=p;break}}fromHsvString(n){const t=he(n,Ye);this.fromHsv({h:t[0],s:t[1],v:t[2],a:t[3]})}fromHslString(n){const t=he(n,Ye);this.fromHsl({h:t[0],s:t[1],l:t[2],a:t[3]})}fromRgbString(n){const t=he(n,(o,r)=>r.includes("%")?I(o/100*255):o);this.r=t[0],this.g=t[1],this.b=t[2],this.a=t[3]}}var bt=["b"],vt=["v"],be=function(n){return Math.round(Number(n||0))},xt=function(n){if(n instanceof se)return n;if(n&&nn(n)==="object"&&"h"in n&&"b"in n){var t=n,o=t.b,r=sn(t,bt);return W(W({},r),{},{v:o})}return typeof n=="string"&&/hsb/.test(n)?n.replace(/hsb/,"hsv"):n},Y=function(e){Bn(t,e);var n=Mn(t);function t(o){return rn(this,t),n.call(this,xt(o))}return an(t,[{key:"toHsbString",value:function(){var r=this.toHsb(),a=be(r.s*100),s=be(r.b*100),l=be(r.h),d=r.a,u="hsb(".concat(l,", ").concat(a,"%, ").concat(s,"%)"),p="hsba(".concat(l,", ").concat(a,"%, ").concat(s,"%, ").concat(d.toFixed(d===0?0:2),")");return d===1?u:p}},{key:"toHsb",value:function(){var r=this.toHsv(),a=r.v,s=sn(r,vt);return W(W({},s),{},{b:a,a:this.a})}}]),t}(se),_t=function(n){return n instanceof Y?n:new Y(n)};_t("#1677ff");const It=(e,n)=>e?.replace(/[^\w/]/g,"").slice(0,n?8:6)||"",Dt=(e,n)=>e?It(e,n):"";let St=function(){function e(n){rn(this,e);var t;if(this.cleared=!1,n instanceof e){this.metaColor=n.metaColor.clone(),this.colors=(t=n.colors)===null||t===void 0?void 0:t.map(r=>({color:new e(r.color),percent:r.percent})),this.cleared=n.cleared;return}const o=Array.isArray(n);o&&n.length?(this.colors=n.map(r=>{let{color:a,percent:s}=r;return{color:new e(a),percent:s}}),this.metaColor=new Y(this.colors[0].color.metaColor)):this.metaColor=new Y(o?"":n),(!n||o&&!this.colors)&&(this.metaColor=this.metaColor.setA(0),this.cleared=!0)}return an(e,[{key:"toHsb",value:function(){return this.metaColor.toHsb()}},{key:"toHsbString",value:function(){return this.metaColor.toHsbString()}},{key:"toHex",value:function(){return Dt(this.toHexString(),this.metaColor.a<1)}},{key:"toHexString",value:function(){return this.metaColor.toHexString()}},{key:"toRgb",value:function(){return this.metaColor.toRgb()}},{key:"toRgbString",value:function(){return this.metaColor.toRgbString()}},{key:"isGradient",value:function(){return!!this.colors&&!this.cleared}},{key:"getColors",value:function(){return this.colors||[{color:this,percent:0}]}},{key:"toCssString",value:function(){const{colors:t}=this;return t?`linear-gradient(90deg, ${t.map(r=>`${r.color.toRgbString()} ${r.percent}%`).join(", ")})`:this.metaColor.toRgbString()}},{key:"equals",value:function(t){return!t||this.isGradient()!==t.isGradient()?!1:this.isGradient()?this.colors.length===t.colors.length&&this.colors.every((o,r)=>{const a=t.colors[r];return o.percent===a.percent&&o.color.equals(a.color)}):this.toHexString()===t.toHexString()}}])}();const Pt=(e,n)=>{const{r:t,g:o,b:r,a}=e.toRgb(),s=new Y(e.toRgbString()).onBackground(n).toHsv();return a<=.5?s.v>.5:t*.299+o*.587+r*.114>192},fn=e=>{const{paddingInline:n,onlyIconSize:t,paddingBlock:o}=e;return Q(e,{buttonPaddingHorizontal:n,buttonPaddingVertical:o,buttonIconOnlyFontSize:t})},gn=e=>{var n,t,o,r,a,s;const l=(n=e.contentFontSize)!==null&&n!==void 0?n:e.fontSize,d=(t=e.contentFontSizeSM)!==null&&t!==void 0?t:e.fontSize,u=(o=e.contentFontSizeLG)!==null&&o!==void 0?o:e.fontSizeLG,p=(r=e.contentLineHeight)!==null&&r!==void 0?r:ye(l),c=(a=e.contentLineHeightSM)!==null&&a!==void 0?a:ye(d),y=(s=e.contentLineHeightLG)!==null&&s!==void 0?s:ye(u),b=Pt(new St(e.colorBgSolid),"#fff")?"#000":"#fff";return{fontWeight:400,defaultShadow:`0 ${e.controlOutlineWidth}px 0 ${e.controlTmpOutline}`,primaryShadow:`0 ${e.controlOutlineWidth}px 0 ${e.controlOutline}`,dangerShadow:`0 ${e.controlOutlineWidth}px 0 ${e.colorErrorOutline}`,primaryColor:e.colorTextLightSolid,dangerColor:e.colorTextLightSolid,borderColorDisabled:e.colorBorder,defaultGhostColor:e.colorBgContainer,ghostBg:"transparent",defaultGhostBorderColor:e.colorBgContainer,paddingInline:e.paddingContentHorizontal-e.lineWidth,paddingInlineLG:e.paddingContentHorizontal-e.lineWidth,paddingInlineSM:8-e.lineWidth,onlyIconSize:e.fontSizeLG,onlyIconSizeSM:e.fontSizeLG-2,onlyIconSizeLG:e.fontSizeLG+2,groupBorderColor:e.colorPrimaryHover,linkHoverBg:"transparent",textTextColor:e.colorText,textTextHoverColor:e.colorText,textTextActiveColor:e.colorText,textHoverBg:e.colorBgTextHover,defaultColor:e.colorText,defaultBg:e.colorBgContainer,defaultBorderColor:e.colorBorder,defaultBorderColorDisabled:e.colorBorder,defaultHoverBg:e.colorBgContainer,defaultHoverColor:e.colorPrimaryHover,defaultHoverBorderColor:e.colorPrimaryHover,defaultActiveBg:e.colorBgContainer,defaultActiveColor:e.colorPrimaryActive,defaultActiveBorderColor:e.colorPrimaryActive,solidTextColor:b,contentFontSize:l,contentFontSizeSM:d,contentFontSizeLG:u,contentLineHeight:p,contentLineHeightSM:c,contentLineHeightLG:y,paddingBlock:Math.max((e.controlHeight-l*p)/2-e.lineWidth,0),paddingBlockSM:Math.max((e.controlHeightSM-d*c)/2-e.lineWidth,0),paddingBlockLG:Math.max((e.controlHeightLG-u*y)/2-e.lineWidth,0)}},zt=e=>{const{componentCls:n,iconCls:t,fontWeight:o}=e;return{[n]:{outline:"none",position:"relative",display:"inline-flex",gap:e.marginXS,alignItems:"center",justifyContent:"center",fontWeight:o,whiteSpace:"nowrap",textAlign:"center",backgroundImage:"none",background:"transparent",border:`${G(e.lineWidth)} ${e.lineType} transparent`,cursor:"pointer",transition:`all ${e.motionDurationMid} ${e.motionEaseInOut}`,userSelect:"none",touchAction:"manipulation",color:e.colorText,"&:disabled > *":{pointerEvents:"none"},"> span":{display:"inline-block"},[`${n}-icon`]:{lineHeight:1},"> a":{color:"currentColor"},"&:not(:disabled)":Object.assign({},kn(e)),[`&${n}-two-chinese-chars::first-letter`]:{letterSpacing:"0.34em"},[`&${n}-two-chinese-chars > *:not(${t})`]:{marginInlineEnd:"-0.34em",letterSpacing:"0.34em"},"&-icon-end":{flexDirection:"row-reverse"}}}},Tn=(e,n,t)=>({[`&:not(:disabled):not(${e}-disabled)`]:{"&:hover":n,"&:active":t}}),Rt=e=>({minWidth:e.controlHeight,paddingInlineStart:0,paddingInlineEnd:0,borderRadius:"50%"}),Ct=e=>({borderRadius:e.controlHeight,paddingInlineStart:e.calc(e.controlHeight).div(2).equal(),paddingInlineEnd:e.calc(e.controlHeight).div(2).equal()}),Et=e=>({cursor:"not-allowed",borderColor:e.borderColorDisabled,color:e.colorTextDisabled,background:e.colorBgContainerDisabled,boxShadow:"none"}),Pe=(e,n,t,o,r,a,s,l)=>({[`&${e}-background-ghost`]:Object.assign(Object.assign({color:t||void 0,background:n,borderColor:o||void 0,boxShadow:"none"},Tn(e,Object.assign({background:n},s),Object.assign({background:n},l))),{"&:disabled":{cursor:"not-allowed",color:r||void 0,borderColor:a||void 0}})}),Ot=e=>({[`&:disabled, &${e.componentCls}-disabled`]:Object.assign({},Et(e))}),At=e=>({[`&:disabled, &${e.componentCls}-disabled`]:{cursor:"not-allowed",color:e.colorTextDisabled}}),ie=(e,n,t,o)=>{const a=o&&["link","text"].includes(o)?At:Ot;return Object.assign(Object.assign({},a(e)),Tn(e.componentCls,n,t))},ze=(e,n,t,o,r)=>({[`&${e.componentCls}-solid`]:Object.assign({color:n,background:t},ie(e,o,r))}),Re=(e,n,t,o,r)=>({[`&${e.componentCls}-outlined, &${e.componentCls}-dashed`]:Object.assign({borderColor:n,background:t},ie(e,o,r))}),Ce=e=>({[`&${e.componentCls}-dashed`]:{borderStyle:"dashed"}}),Ee=(e,n,t,o)=>({[`&${e.componentCls}-filled`]:Object.assign({boxShadow:"none",background:n},ie(e,t,o))}),V=(e,n,t,o,r)=>({[`&${e.componentCls}-${t}`]:Object.assign({color:n,boxShadow:"none"},ie(e,o,r,t))}),wt=e=>Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({color:e.defaultColor,boxShadow:e.defaultShadow},ze(e,e.solidTextColor,e.colorBgSolid,{background:e.colorBgSolidHover},{background:e.colorBgSolidActive})),Re(e,e.defaultBorderColor,e.defaultBg,{color:e.defaultHoverColor,borderColor:e.defaultHoverBorderColor,background:e.defaultHoverBg},{color:e.defaultActiveColor,borderColor:e.defaultActiveBorderColor,background:e.defaultActiveBg})),Ce(e)),Ee(e,e.colorFillTertiary,{background:e.colorFillSecondary},{background:e.colorFill})),V(e,e.textTextColor,"text",{color:e.textTextHoverColor,background:e.textHoverBg},{color:e.textTextActiveColor,background:e.colorBgTextActive})),V(e,e.textTextColor,"link",{color:e.colorLinkHover,background:e.linkHoverBg},{color:e.colorLinkActive})),Pe(e.componentCls,e.ghostBg,e.defaultGhostColor,e.defaultGhostBorderColor,e.colorTextDisabled,e.colorBorder)),jt=e=>Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({color:e.colorPrimary,boxShadow:e.primaryShadow},ze(e,e.primaryColor,e.colorPrimary,{background:e.colorPrimaryHover},{background:e.colorPrimaryActive})),Re(e,e.colorPrimary,e.colorBgContainer,{color:e.colorPrimaryTextHover,borderColor:e.colorPrimaryHover,background:e.colorBgContainer},{color:e.colorPrimaryTextActive,borderColor:e.colorPrimaryActive,background:e.colorBgContainer})),Ce(e)),Ee(e,e.colorPrimaryBg,{background:e.colorPrimaryBgHover},{background:e.colorPrimaryBorder})),V(e,e.colorPrimary,"text",{color:e.colorPrimaryTextHover,background:e.colorPrimaryBg},{color:e.colorPrimaryTextActive,background:e.colorPrimaryBorder})),V(e,e.colorPrimary,"link",{color:e.colorPrimaryTextHover,background:e.linkHoverBg},{color:e.colorPrimaryTextActive})),Pe(e.componentCls,e.ghostBg,e.colorPrimary,e.colorPrimary,e.colorTextDisabled,e.colorBorder,{color:e.colorPrimaryHover,borderColor:e.colorPrimaryHover},{color:e.colorPrimaryActive,borderColor:e.colorPrimaryActive})),Nt=e=>Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({color:e.colorError,boxShadow:e.dangerShadow},ze(e,e.dangerColor,e.colorError,{background:e.colorErrorHover},{background:e.colorErrorActive})),Re(e,e.colorError,e.colorBgContainer,{color:e.colorErrorHover,borderColor:e.colorErrorBorderHover},{color:e.colorErrorActive,borderColor:e.colorErrorActive})),Ce(e)),Ee(e,e.colorErrorBg,{background:e.colorErrorBgFilledHover},{background:e.colorErrorBgActive})),V(e,e.colorError,"text",{color:e.colorErrorHover,background:e.colorErrorBg},{color:e.colorErrorHover,background:e.colorErrorBgActive})),V(e,e.colorError,"link",{color:e.colorErrorHover},{color:e.colorErrorActive})),Pe(e.componentCls,e.ghostBg,e.colorError,e.colorError,e.colorTextDisabled,e.colorBorder,{color:e.colorErrorHover,borderColor:e.colorErrorHover},{color:e.colorErrorActive,borderColor:e.colorErrorActive})),Ut=e=>{const{componentCls:n}=e;return{[`${n}-default`]:wt(e),[`${n}-primary`]:jt(e),[`${n}-dangerous`]:Nt(e)}},Oe=function(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"";const{componentCls:t,controlHeight:o,fontSize:r,lineHeight:a,borderRadius:s,buttonPaddingHorizontal:l,iconCls:d,buttonPaddingVertical:u}=e,p=`${t}-icon-only`;return[{[n]:{fontSize:r,lineHeight:a,height:o,padding:`${G(u)} ${G(l)}`,borderRadius:s,[`&${p}`]:{width:o,paddingInline:0,[`&${t}-compact-item`]:{flex:"none"},[`&${t}-round`]:{width:"auto"},[d]:{fontSize:e.buttonIconOnlyFontSize}},[`&${t}-loading`]:{opacity:e.opacityLoading,cursor:"default"},[`${t}-loading-icon`]:{transition:`width ${e.motionDurationSlow} ${e.motionEaseInOut}, opacity ${e.motionDurationSlow} ${e.motionEaseInOut}`}}},{[`${t}${t}-circle${n}`]:Rt(e)},{[`${t}${t}-round${n}`]:Ct(e)}]},Bt=e=>{const n=Q(e,{fontSize:e.contentFontSize,lineHeight:e.contentLineHeight});return Oe(n,e.componentCls)},Mt=e=>{const n=Q(e,{controlHeight:e.controlHeightSM,fontSize:e.contentFontSizeSM,lineHeight:e.contentLineHeightSM,padding:e.paddingXS,buttonPaddingHorizontal:e.paddingInlineSM,buttonPaddingVertical:e.paddingBlockSM,borderRadius:e.borderRadiusSM,buttonIconOnlyFontSize:e.onlyIconSizeSM});return Oe(n,`${e.componentCls}-sm`)},kt=e=>{const n=Q(e,{controlHeight:e.controlHeightLG,fontSize:e.contentFontSizeLG,lineHeight:e.contentLineHeightLG,buttonPaddingHorizontal:e.paddingInlineLG,buttonPaddingVertical:e.paddingBlockLG,borderRadius:e.borderRadiusLG,buttonIconOnlyFontSize:e.onlyIconSizeLG});return Oe(n,`${e.componentCls}-lg`)},Kt=e=>{const{componentCls:n}=e;return{[n]:{[`&${n}-block`]:{width:"100%"}}}},$t=dn("Button",e=>{const n=fn(e);return[zt(n),Bt(n),Mt(n),kt(n),Kt(n),Ut(n),ht(n)]},gn,{unitless:{fontWeight:!0,contentLineHeight:!0,contentLineHeightSM:!0,contentLineHeightLG:!0}});function Ft(e,n){return{[`&-item:not(${n}-last-item)`]:{marginBottom:e.calc(e.lineWidth).mul(-1).equal()},"&-item":{"&:hover,&:focus,&:active":{zIndex:2},"&[disabled]":{zIndex:0}}}}function Vt(e,n){return{[`&-item:not(${n}-first-item):not(${n}-last-item)`]:{borderRadius:0},[`&-item${n}-first-item:not(${n}-last-item)`]:{[`&, &${e}-sm, &${e}-lg`]:{borderEndEndRadius:0,borderEndStartRadius:0}},[`&-item${n}-last-item:not(${n}-first-item)`]:{[`&, &${e}-sm, &${e}-lg`]:{borderStartStartRadius:0,borderStartEndRadius:0}}}}function Lt(e){const n=`${e.componentCls}-compact-vertical`;return{[n]:Object.assign(Object.assign({},Ft(e,n)),Vt(e.componentCls,n))}}const Ht=e=>{const{componentCls:n,calc:t}=e;return{[n]:{[`&-compact-item${n}-primary`]:{[`&:not([disabled]) + ${n}-compact-item${n}-primary:not([disabled])`]:{position:"relative","&:before":{position:"absolute",top:t(e.lineWidth).mul(-1).equal(),insetInlineStart:t(e.lineWidth).mul(-1).equal(),display:"inline-block",width:e.lineWidth,height:`calc(100% + ${G(e.lineWidth)} * 2)`,backgroundColor:e.colorPrimaryHover,content:'""'}}},"&-compact-vertical-item":{[`&${n}-primary`]:{[`&:not([disabled]) + ${n}-compact-vertical-item${n}-primary:not([disabled])`]:{position:"relative","&:before":{position:"absolute",top:t(e.lineWidth).mul(-1).equal(),insetInlineStart:t(e.lineWidth).mul(-1).equal(),display:"inline-block",width:`calc(100% + ${G(e.lineWidth)} * 2)`,height:e.lineWidth,backgroundColor:e.colorPrimaryHover,content:'""'}}}}}}},qt=Kn(["Button","compact"],e=>{const n=fn(e);return[$n(n),Lt(n),Ht(n)]},gn);var Wt=function(e,n){var t={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&n.indexOf(o)<0&&(t[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,o=Object.getOwnPropertySymbols(e);r<o.length;r++)n.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(t[o[r]]=e[o[r]]);return t};function Gt(e){if(typeof e=="object"&&e){let n=e?.delay;return n=!Number.isNaN(n)&&typeof n=="number"?n:0,{loading:n<=0,delay:n}}return{loading:!!e,delay:0}}const Yt={default:["default","outlined"],primary:["primary","solid"],dashed:["default","dashed"],link:["primary","link"],text:["default","text"]},Jt=h.forwardRef((e,n)=>{var t,o,r;const{loading:a=!1,prefixCls:s,color:l,variant:d,type:u,danger:p=!1,shape:c="default",size:y,styles:b,disabled:A,className:w,rootClassName:z,children:x,icon:m,iconPosition:g="start",ghost:C=!1,block:D=!1,htmlType:T="button",classNames:f,style:R={},autoInsertSpace:S}=e,Z=Wt(e,["loading","prefixCls","color","variant","type","danger","shape","size","styles","disabled","className","rootClassName","children","icon","iconPosition","ghost","block","htmlType","classNames","style","autoInsertSpace"]),v=u||"default",[N,U]=i.useMemo(()=>{if(l&&d)return[l,d];const O=Yt[v]||[];return p?["danger",O[1]]:O},[u,l,d,p]),K=N==="danger"?"dangerous":N,{getPrefixCls:M,direction:$,button:E}=i.useContext(J),de=(t=S??E?.autoInsertSpace)!==null&&t!==void 0?t:!0,_=M("btn",s),[Ae,xn,_n]=$t(_),In=i.useContext(Fn),L=A??In,Dn=i.useContext(yn),H=i.useMemo(()=>Gt(a),[a]),[k,we]=i.useState(H.loading),[le,je]=i.useState(!1),F=De(n,i.createRef()),Ne=i.Children.count(x)===1&&!m&&!ge(U);i.useEffect(()=>{let O=null;H.delay>0?O=setTimeout(()=>{O=null,we(!0)},H.delay):we(H.loading);function B(){O&&(clearTimeout(O),O=null)}return B},[H]),i.useEffect(()=>{if(!F||!F.current||!de)return;const O=F.current.textContent;Ne&&Ie(O)?le||je(!0):le&&je(!1)},[F]);const Ue=O=>{const{onClick:B}=e;if(k||L){O.preventDefault();return}B?.(O)},{compactSize:Sn,compactItemClassnames:Be}=Vn(_,$),Pn={large:"lg",small:"sm",middle:void 0},Me=Ln(O=>{var B,ce;return(ce=(B=y??Sn)!==null&&B!==void 0?B:Dn)!==null&&ce!==void 0?ce:O}),ke=Me&&Pn[Me]||"",zn=k?"loading":m,ue=Hn(Z,["navigate"]),Ke=P(_,xn,_n,{[`${_}-${c}`]:c!=="default"&&c,[`${_}-${K}`]:K,[`${_}-${U}`]:U,[`${_}-${ke}`]:ke,[`${_}-icon-only`]:!x&&x!==0&&!!zn,[`${_}-background-ghost`]:C&&!ge(U),[`${_}-loading`]:k,[`${_}-two-chinese-chars`]:le&&de&&!k,[`${_}-block`]:D,[`${_}-rtl`]:$==="rtl",[`${_}-icon-end`]:g==="end"},Be,w,z,E?.className),$e=Object.assign(Object.assign({},E?.style),R),Rn=P(f?.icon,(o=E?.classNames)===null||o===void 0?void 0:o.icon),Cn=Object.assign(Object.assign({},b?.icon||{}),((r=E?.styles)===null||r===void 0?void 0:r.icon)||{}),Fe=m&&!k?h.createElement(mn,{prefixCls:_,className:Rn,style:Cn},m):h.createElement(Zt,{existIcon:!!m,prefixCls:_,loading:k}),Ve=x||x===0?Tt(x,Ne&&de):null;if(ue.href!==void 0)return Ae(h.createElement("a",Object.assign({},ue,{className:P(Ke,{[`${_}-disabled`]:L}),href:L?void 0:ue.href,style:$e,onClick:Ue,ref:F,tabIndex:L?-1:0}),Fe,Ve));let pe=h.createElement("button",Object.assign({},Z,{type:T,className:Ke,style:$e,onClick:Ue,disabled:L,ref:F}),Fe,Ve,!!Be&&h.createElement(qt,{key:"compact",prefixCls:_}));return ge(U)||(pe=h.createElement(yt,{component:"Button",disabled:k},pe)),Ae(pe)}),Zn=Jt;Zn.Group=ft;Zn.__ANT_BUTTON=!0;var Qt={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"}}]},name:"down",theme:"outlined"},Xt=function(n,t){return i.createElement(ln,un({},n,{ref:t,icon:Qt}))},Ao=i.forwardRef(Xt);function eo(e,n,t){var o=t||{},r=o.noTrailing,a=r===void 0?!1:r,s=o.noLeading,l=s===void 0?!1:s,d=o.debounceMode,u=d===void 0?void 0:d,p,c=!1,y=0;function b(){p&&clearTimeout(p)}function A(z){var x=z||{},m=x.upcomingOnly,g=m===void 0?!1:m;b(),c=!g}function w(){for(var z=arguments.length,x=new Array(z),m=0;m<z;m++)x[m]=arguments[m];var g=this,C=Date.now()-y;if(c)return;function D(){y=Date.now(),n.apply(g,x)}function T(){p=void 0}!l&&u&&!p&&D(),b(),u===void 0&&C>e?l?(y=Date.now(),a||(p=setTimeout(u?T:D,e))):D():a!==!0&&(p=setTimeout(u?T:D,u===void 0?e-C:e))}return w.cancel=A,w}function no(e,n,t){var o={},r=o.atBegin,a=r===void 0?!1:r;return eo(e,n,{debounceMode:a!==!1})}const re=100,hn=re/5,bn=re/2-hn/2,ve=bn*2*Math.PI,Je=50,Qe=e=>{const{dotClassName:n,style:t,hasCircleCls:o}=e;return i.createElement("circle",{className:P(`${n}-circle`,{[`${n}-circle-bg`]:o}),r:bn,cx:Je,cy:Je,strokeWidth:hn,style:t})},to=e=>{let{percent:n,prefixCls:t}=e;const o=`${t}-dot`,r=`${o}-holder`,a=`${r}-hidden`,[s,l]=i.useState(!1);qn(()=>{n!==0&&l(!0)},[n!==0]);const d=Math.max(Math.min(n,100),0);if(!s)return null;const u={strokeDashoffset:`${ve/4}`,strokeDasharray:`${ve*d/100} ${ve*(100-d)/100}`};return i.createElement("span",{className:P(r,`${o}-progress`,d<=0&&a)},i.createElement("svg",{viewBox:`0 0 ${re} ${re}`,role:"progressbar","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":d},i.createElement(Qe,{dotClassName:o,hasCircleCls:!0}),i.createElement(Qe,{dotClassName:o,style:u})))};function oo(e){const{prefixCls:n,percent:t=0}=e,o=`${n}-dot`,r=`${o}-holder`,a=`${r}-hidden`;return i.createElement(i.Fragment,null,i.createElement("span",{className:P(r,t>0&&a)},i.createElement("span",{className:P(o,`${n}-dot-spin`)},[1,2,3,4].map(s=>i.createElement("i",{className:`${n}-dot-item`,key:s})))),i.createElement(to,{prefixCls:n,percent:t}))}function ro(e){const{prefixCls:n,indicator:t,percent:o}=e,r=`${n}-dot`;return t&&i.isValidElement(t)?Se(t,{className:P(t.props.className,r),percent:o}):i.createElement(oo,{prefixCls:n,percent:o})}const ao=new pn("antSpinMove",{to:{opacity:1}}),so=new pn("antRotate",{to:{transform:"rotate(405deg)"}}),io=e=>{const{componentCls:n,calc:t}=e;return{[n]:Object.assign(Object.assign({},Wn(e)),{position:"absolute",display:"none",color:e.colorPrimary,fontSize:0,textAlign:"center",verticalAlign:"middle",opacity:0,transition:`transform ${e.motionDurationSlow} ${e.motionEaseInOutCirc}`,"&-spinning":{position:"relative",display:"inline-block",opacity:1},[`${n}-text`]:{fontSize:e.fontSize,paddingTop:t(t(e.dotSize).sub(e.fontSize)).div(2).add(2).equal()},"&-fullscreen":{position:"fixed",width:"100vw",height:"100vh",backgroundColor:e.colorBgMask,zIndex:e.zIndexPopupBase,inset:0,display:"flex",alignItems:"center",flexDirection:"column",justifyContent:"center",opacity:0,visibility:"hidden",transition:`all ${e.motionDurationMid}`,"&-show":{opacity:1,visibility:"visible"},[n]:{[`${n}-dot-holder`]:{color:e.colorWhite},[`${n}-text`]:{color:e.colorTextLightSolid}}},"&-nested-loading":{position:"relative",[`> div > ${n}`]:{position:"absolute",top:0,insetInlineStart:0,zIndex:4,display:"block",width:"100%",height:"100%",maxHeight:e.contentHeight,[`${n}-dot`]:{position:"absolute",top:"50%",insetInlineStart:"50%",margin:t(e.dotSize).mul(-1).div(2).equal()},[`${n}-text`]:{position:"absolute",top:"50%",width:"100%",textShadow:`0 1px 2px ${e.colorBgContainer}`},[`&${n}-show-text ${n}-dot`]:{marginTop:t(e.dotSize).div(2).mul(-1).sub(10).equal()},"&-sm":{[`${n}-dot`]:{margin:t(e.dotSizeSM).mul(-1).div(2).equal()},[`${n}-text`]:{paddingTop:t(t(e.dotSizeSM).sub(e.fontSize)).div(2).add(2).equal()},[`&${n}-show-text ${n}-dot`]:{marginTop:t(e.dotSizeSM).div(2).mul(-1).sub(10).equal()}},"&-lg":{[`${n}-dot`]:{margin:t(e.dotSizeLG).mul(-1).div(2).equal()},[`${n}-text`]:{paddingTop:t(t(e.dotSizeLG).sub(e.fontSize)).div(2).add(2).equal()},[`&${n}-show-text ${n}-dot`]:{marginTop:t(e.dotSizeLG).div(2).mul(-1).sub(10).equal()}}},[`${n}-container`]:{position:"relative",transition:`opacity ${e.motionDurationSlow}`,"&::after":{position:"absolute",top:0,insetInlineEnd:0,bottom:0,insetInlineStart:0,zIndex:10,width:"100%",height:"100%",background:e.colorBgContainer,opacity:0,transition:`all ${e.motionDurationSlow}`,content:'""',pointerEvents:"none"}},[`${n}-blur`]:{clear:"both",opacity:.5,userSelect:"none",pointerEvents:"none","&::after":{opacity:.4,pointerEvents:"auto"}}},"&-tip":{color:e.spinDotDefault},[`${n}-dot-holder`]:{width:"1em",height:"1em",fontSize:e.dotSize,display:"inline-block",transition:`transform ${e.motionDurationSlow} ease, opacity ${e.motionDurationSlow} ease`,transformOrigin:"50% 50%",lineHeight:1,color:e.colorPrimary,"&-hidden":{transform:"scale(0.3)",opacity:0}},[`${n}-dot-progress`]:{position:"absolute",top:"50%",transform:"translate(-50%, -50%)",insetInlineStart:"50%"},[`${n}-dot`]:{position:"relative",display:"inline-block",fontSize:e.dotSize,width:"1em",height:"1em","&-item":{position:"absolute",display:"block",width:t(e.dotSize).sub(t(e.marginXXS).div(2)).div(2).equal(),height:t(e.dotSize).sub(t(e.marginXXS).div(2)).div(2).equal(),background:"currentColor",borderRadius:"100%",transform:"scale(0.75)",transformOrigin:"50% 50%",opacity:.3,animationName:ao,animationDuration:"1s",animationIterationCount:"infinite",animationTimingFunction:"linear",animationDirection:"alternate","&:nth-child(1)":{top:0,insetInlineStart:0,animationDelay:"0s"},"&:nth-child(2)":{top:0,insetInlineEnd:0,animationDelay:"0.4s"},"&:nth-child(3)":{insetInlineEnd:0,bottom:0,animationDelay:"0.8s"},"&:nth-child(4)":{bottom:0,insetInlineStart:0,animationDelay:"1.2s"}},"&-spin":{transform:"rotate(45deg)",animationName:so,animationDuration:"1.2s",animationIterationCount:"infinite",animationTimingFunction:"linear"},"&-circle":{strokeLinecap:"round",transition:["stroke-dashoffset","stroke-dasharray","stroke","stroke-width","opacity"].map(o=>`${o} ${e.motionDurationSlow} ease`).join(","),fillOpacity:0,stroke:"currentcolor"},"&-circle-bg":{stroke:e.colorFillSecondary}},[`&-sm ${n}-dot`]:{"&, &-holder":{fontSize:e.dotSizeSM}},[`&-sm ${n}-dot-holder`]:{i:{width:t(t(e.dotSizeSM).sub(t(e.marginXXS).div(2))).div(2).equal(),height:t(t(e.dotSizeSM).sub(t(e.marginXXS).div(2))).div(2).equal()}},[`&-lg ${n}-dot`]:{"&, &-holder":{fontSize:e.dotSizeLG}},[`&-lg ${n}-dot-holder`]:{i:{width:t(t(e.dotSizeLG).sub(e.marginXXS)).div(2).equal(),height:t(t(e.dotSizeLG).sub(e.marginXXS)).div(2).equal()}},[`&${n}-show-text ${n}-text`]:{display:"block"}})}},lo=e=>{const{controlHeightLG:n,controlHeight:t}=e;return{contentHeight:400,dotSize:n/2,dotSizeSM:n*.35,dotSizeLG:t}},uo=dn("Spin",e=>{const n=Q(e,{spinDotDefault:e.colorTextDescription});return[io(n)]},lo),po=200,Xe=[[30,.05],[70,.03],[96,.01]];function co(e,n){const[t,o]=i.useState(0),r=i.useRef(),a=n==="auto";return i.useEffect(()=>(a&&e&&(o(0),r.current=setInterval(()=>{o(s=>{const l=100-s;for(let d=0;d<Xe.length;d+=1){const[u,p]=Xe[d];if(s<=u)return s+l*p}return s})},po)),()=>{clearInterval(r.current)}),[a,e]),a?t:n}var yo=function(e,n){var t={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&n.indexOf(o)<0&&(t[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,o=Object.getOwnPropertySymbols(e);r<o.length;r++)n.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(t[o[r]]=e[o[r]]);return t};let vn;function mo(e,n){return!!e&&!!n&&!isNaN(Number(n))}const fo=e=>{var n;const{prefixCls:t,spinning:o=!0,delay:r=0,className:a,rootClassName:s,size:l="default",tip:d,wrapperClassName:u,style:p,children:c,fullscreen:y=!1,indicator:b,percent:A}=e,w=yo(e,["prefixCls","spinning","delay","className","rootClassName","size","tip","wrapperClassName","style","children","fullscreen","indicator","percent"]),{getPrefixCls:z,direction:x,spin:m}=i.useContext(J),g=z("spin",t),[C,D,T]=uo(g),[f,R]=i.useState(()=>o&&!mo(o,r)),S=co(f,A);i.useEffect(()=>{if(o){const M=no(r,()=>{R(!0)});return M(),()=>{var $;($=M?.cancel)===null||$===void 0||$.call(M)}}R(!1)},[r,o]);const Z=i.useMemo(()=>typeof c<"u"&&!y,[c,y]),v=P(g,m?.className,{[`${g}-sm`]:l==="small",[`${g}-lg`]:l==="large",[`${g}-spinning`]:f,[`${g}-show-text`]:!!d,[`${g}-rtl`]:x==="rtl"},a,!y&&s,D,T),N=P(`${g}-container`,{[`${g}-blur`]:f}),U=(n=b??m?.indicator)!==null&&n!==void 0?n:vn,ee=Object.assign(Object.assign({},m?.style),p),K=i.createElement("div",Object.assign({},w,{style:ee,className:v,"aria-live":"polite","aria-busy":f}),i.createElement(ro,{prefixCls:g,indicator:U,percent:S}),d&&(Z||y)?i.createElement("div",{className:`${g}-text`},d):null);return C(Z?i.createElement("div",Object.assign({},w,{className:P(`${g}-nested-loading`,u,D,T)}),f&&i.createElement("div",{key:"loading"},K),i.createElement("div",{className:N,key:"container"},c)):y?i.createElement("div",{className:P(`${g}-fullscreen`,{[`${g}-fullscreen-show`]:f},s,D,T)},K):K)};fo.setDefaultIndicator=e=>{vn=e};var go={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"defs",attrs:{},children:[{tag:"style",attrs:{}}]},{tag:"path",attrs:{d:"M840 192h-56v-72c0-13.3-10.7-24-24-24H168c-13.3 0-24 10.7-24 24v272c0 13.3 10.7 24 24 24h592c13.3 0 24-10.7 24-24V256h32v200H465c-22.1 0-40 17.9-40 40v136h-44c-4.4 0-8 3.6-8 8v228c0 .6.1 1.3.2 1.9A83.99 83.99 0 00457 960c46.4 0 84-37.6 84-84 0-2.1-.1-4.1-.2-6.1.1-.6.2-1.2.2-1.9V640c0-4.4-3.6-8-8-8h-44V520h351c22.1 0 40-17.9 40-40V232c0-22.1-17.9-40-40-40zM720 352H208V160h512v192zM477 876c0 11-9 20-20 20s-20-9-20-20V696h40v180z"}}]},name:"format-painter",theme:"outlined"},To=function(n,t){return i.createElement(ln,un({},n,{ref:t,icon:go}))},wo=i.forwardRef(To);function Zo(e,n,t){var o=this,r=i.useRef(null),a=i.useRef(0),s=i.useRef(null),l=i.useRef([]),d=i.useRef(),u=i.useRef(),p=i.useRef(e),c=i.useRef(!0);p.current=e;var y=typeof window<"u",b=!n&&n!==0&&y;if(typeof e!="function")throw new TypeError("Expected a function");n=+n||0;var A=!!(t=t||{}).leading,w=!("trailing"in t)||!!t.trailing,z="maxWait"in t,x="debounceOnServer"in t&&!!t.debounceOnServer,m=z?Math.max(+t.maxWait||0,n):null;i.useEffect(function(){return c.current=!0,function(){c.current=!1}},[]);var g=i.useMemo(function(){var C=function(Z){var v=l.current,N=d.current;return l.current=d.current=null,a.current=Z,u.current=p.current.apply(N,v)},D=function(Z,v){b&&cancelAnimationFrame(s.current),s.current=b?requestAnimationFrame(Z):setTimeout(Z,v)},T=function(Z){if(!c.current)return!1;var v=Z-r.current;return!r.current||v>=n||v<0||z&&Z-a.current>=m},f=function(Z){return s.current=null,w&&l.current?C(Z):(l.current=d.current=null,u.current)},R=function Z(){var v=Date.now();if(T(v))return f(v);if(c.current){var N=n-(v-r.current),U=z?Math.min(N,m-(v-a.current)):N;D(Z,U)}},S=function(){if(y||x){var Z=Date.now(),v=T(Z);if(l.current=[].slice.call(arguments),d.current=o,r.current=Z,v){if(!s.current&&c.current)return a.current=r.current,D(R,n),A?C(r.current):u.current;if(z)return D(R,n),C(r.current)}return s.current||D(R,n),u.current}};return S.cancel=function(){s.current&&(b?cancelAnimationFrame(s.current):clearTimeout(s.current)),a.current=0,l.current=r.current=d.current=s.current=null},S.isPending=function(){return!!s.current},S.flush=function(){return s.current?f(Date.now()):u.current},S},[A,z,n,m,w,b,y,x]);return g}function jo(e,n,t){var o=t===void 0?{}:t,r=o.leading,a=o.trailing;return Zo(e,n,{maxWait:n,leading:r===void 0||r,trailing:a===void 0||a})}const ho=e=>{const{horizontal:n,reversed:t,verticalAlign:o="start",horizontalAlign:r="start",gap:a=8,height:s="auto",width:l="100%",grow:d,style:u,...p}=e,c=i.useMemo(()=>n?t?"row-reverse":"row":t?"column-reverse":"column",[n,t]);return Yn.jsx("div",{style:{display:"flex",flexDirection:c,justifyContent:n?r:o,alignItems:n?o:r,height:s,width:l,gap:a,flexGrow:d?1:void 0,...u},...p})};ho.__docgenInfo={description:"",methods:[],displayName:"Stack",props:{horizontal:{required:!1,tsType:{name:"boolean"},description:""},reversed:{required:!1,tsType:{name:"boolean"},description:""},grow:{required:!1,tsType:{name:"boolean"},description:""},verticalAlign:{required:!1,tsType:{name:"union",raw:`| 'start'
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
| 'stretch'`,elements:[{name:"literal",value:"'start'"},{name:"literal",value:"'end'"},{name:"literal",value:"'center'"},{name:"literal",value:"'space-between'"},{name:"literal",value:"'space-around'"},{name:"literal",value:"'space-evenly'"},{name:"literal",value:"'baseline'"},{name:"literal",value:"'stretch'"}]},description:""},gap:{required:!1,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:""},height:{required:!1,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:""},width:{required:!1,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:""}}};const bo=`declare namespace Big {
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
`,vo=`/// <reference path="./locale/index.d.ts" />

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
`,xo=`import zen from 'zen';

/** @type {Handler} **/
export const handler = async (input) => {
  return input;
};
`,_o=`declare namespace console {
  function log(...args: any[]): void;
  async function sleep(durationMs: number): Promise<void>;
}

interface Config {
  readonly maxDepth: number;
  readonly iteration: number;
  readonly trace: boolean;
}

declare const config: Config;
`,Io=`declare class HttpResponse {
  readonly data: any;
  readonly headers: Record<string, string>;
  readonly status: number;
}

interface HttpConfig {
  headers?: Record<string, string>;
  params?: Record<string, string>;
  data?: any;
}

class Http {
  head(url: string, config?: HttpConfig): Promise<HttpResponse>;

  get(url: string, config?: HttpConfig): Promise<HttpResponse>;

  delete(url: string, config?: HttpConfig): Promise<HttpResponse>;

  post(url: string, data: any, config?: HttpConfig): Promise<HttpResponse>;

  patch(url: string, data: any, config?: HttpConfig): Promise<HttpResponse>;

  put(url: string, data: any, config?: HttpConfig): Promise<HttpResponse>;
}

export interface HttpStatic extends Http {}

declare const http: HttpStatic;
export default http;
`,Do=`interface EvaluateOptions {
  trace?: boolean;
}

interface EvaluateResponse {
  performance: string;
  result: any;
  trace?: any;
}

interface ZenModule {
  /**
   * Evaluates ZEN expression
   * @param expression
   * @param context Must contain '$' key
   */
  evaluateExpression(expression: string, context: any): any;

  /**
   * Evaluates ZEN unary expression
   * @param expression
   * @param context Must contain '$' key
   */
  evaluateUnaryExpression(expression: string, context: any): boolean;

  /**
   * Evaluates ZEN unary expression
   * @param key File key to be evaluated through DecisionLoader
   * @param context
   * @param opts
   */
  evaluate(key: string, context: any, opts?: EvaluateOptions): Promise<EvaluateResponse>;
}

declare const zenModule: ZenModule;

export default zenModule;
`,So=`declare type Primitive = string | number | symbol | bigint | boolean | null | undefined;
declare type Scalars = Primitive | Primitive[];

declare namespace util {
  type AssertEqual<T, U> = (<V>() => V extends T ? 1 : 2) extends <V>() => V extends U ? 1 : 2 ? true : false;
  export type isAny<T> = 0 extends 1 & T ? true : false;
  export const assertEqual: <A, B>(val: AssertEqual<A, B>) => AssertEqual<A, B>;
  export function assertIs<T>(_arg: T): void;
  export function assertNever(_x: never): never;
  export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
  export type OmitKeys<T, K extends string> = Pick<T, Exclude<keyof T, K>>;
  export type MakePartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
  export type Exactly<T, X> = T & Record<Exclude<keyof X, keyof T>, never>;
  export const arrayToEnum: <T extends string, U extends [T, ...T[]]>(items: U) => { [k in U[number]]: k };
  export const getValidEnumValues: (obj: any) => any[];
  export const objectValues: (obj: any) => any[];
  export const objectKeys: ObjectConstructor['keys'];
  export const find: <T>(arr: T[], checker: (arg: T) => any) => T | undefined;
  export type identity<T> = objectUtil.identity<T>;
  export type flatten<T> = objectUtil.flatten<T>;
  export type noUndefined<T> = T extends undefined ? never : T;
  export const isInteger: NumberConstructor['isInteger'];
  export function joinValues<T extends any[]>(array: T, separator?: string): string;
  export const jsonStringifyReplacer: (_: string, value: any) => any;
  export {};
}
declare namespace objectUtil {
  export type MergeShapes<U, V> = {
    [k in Exclude<keyof U, keyof V>]: U[k];
  } & V;
  type optionalKeys<T extends object> = {
    [k in keyof T]: undefined extends T[k] ? k : never;
  }[keyof T];
  type requiredKeys<T extends object> = {
    [k in keyof T]: undefined extends T[k] ? never : k;
  }[keyof T];
  export type addQuestionMarks<T extends object, _O = any> = {
    [K in requiredKeys<T>]: T[K];
  } & {
    [K in optionalKeys<T>]?: T[K];
  } & {
    [k in keyof T]?: unknown;
  };
  export type identity<T> = T;
  export type flatten<T> = identity<{
    [k in keyof T]: T[k];
  }>;
  export type noNeverKeys<T> = {
    [k in keyof T]: [T[k]] extends [never] ? never : k;
  }[keyof T];
  export type noNever<T> = identity<{
    [k in noNeverKeys<T>]: k extends keyof T ? T[k] : never;
  }>;
  export const mergeShapes: <U, T>(first: U, second: T) => T & U;
  export type extendShape<A extends object, B extends object> = {
    [K in keyof A as K extends keyof B ? never : K]: A[K];
  } & {
    [K in keyof B]: B[K];
  };
  export {};
}
declare const ZodParsedType: {
  function: 'function';
  number: 'number';
  string: 'string';
  nan: 'nan';
  integer: 'integer';
  float: 'float';
  boolean: 'boolean';
  date: 'date';
  bigint: 'bigint';
  symbol: 'symbol';
  undefined: 'undefined';
  null: 'null';
  array: 'array';
  object: 'object';
  unknown: 'unknown';
  promise: 'promise';
  void: 'void';
  never: 'never';
  map: 'map';
  set: 'set';
};
declare type ZodParsedType = keyof typeof ZodParsedType;
declare const getParsedType: (data: any) => ZodParsedType;

declare type allKeys<T> = T extends any ? keyof T : never;
declare type inferFlattenedErrors<T extends ZodType<any, any, any>, U = string> = typeToFlattenedError<TypeOf<T>, U>;
declare type typeToFlattenedError<T, U = string> = {
  formErrors: U[];
  fieldErrors: {
    [P in allKeys<T>]?: U[];
  };
};
declare const ZodIssueCode: {
  invalid_type: 'invalid_type';
  invalid_literal: 'invalid_literal';
  custom: 'custom';
  invalid_union: 'invalid_union';
  invalid_union_discriminator: 'invalid_union_discriminator';
  invalid_enum_value: 'invalid_enum_value';
  unrecognized_keys: 'unrecognized_keys';
  invalid_arguments: 'invalid_arguments';
  invalid_return_type: 'invalid_return_type';
  invalid_date: 'invalid_date';
  invalid_string: 'invalid_string';
  too_small: 'too_small';
  too_big: 'too_big';
  invalid_intersection_types: 'invalid_intersection_types';
  not_multiple_of: 'not_multiple_of';
  not_finite: 'not_finite';
};
declare type ZodIssueCode = keyof typeof ZodIssueCode;
declare type ZodIssueBase = {
  path: (string | number)[];
  message?: string;
};
interface ZodInvalidTypeIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.invalid_type;
  expected: ZodParsedType;
  received: ZodParsedType;
}
interface ZodInvalidLiteralIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.invalid_literal;
  expected: unknown;
  received: unknown;
}
interface ZodUnrecognizedKeysIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.unrecognized_keys;
  keys: string[];
}
interface ZodInvalidUnionIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.invalid_union;
  unionErrors: ZodError[];
}
interface ZodInvalidUnionDiscriminatorIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.invalid_union_discriminator;
  options: Primitive[];
}
interface ZodInvalidEnumValueIssue extends ZodIssueBase {
  received: string | number;
  code: typeof ZodIssueCode.invalid_enum_value;
  options: (string | number)[];
}
interface ZodInvalidArgumentsIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.invalid_arguments;
  argumentsError: ZodError;
}
interface ZodInvalidReturnTypeIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.invalid_return_type;
  returnTypeError: ZodError;
}
interface ZodInvalidDateIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.invalid_date;
}
declare type StringValidation =
  | 'email'
  | 'url'
  | 'emoji'
  | 'uuid'
  | 'nanoid'
  | 'regex'
  | 'cuid'
  | 'cuid2'
  | 'ulid'
  | 'datetime'
  | 'date'
  | 'time'
  | 'duration'
  | 'ip'
  | 'base64'
  | {
      includes: string;
      position?: number;
    }
  | {
      startsWith: string;
    }
  | {
      endsWith: string;
    };
interface ZodInvalidStringIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.invalid_string;
  validation: StringValidation;
}
interface ZodTooSmallIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.too_small;
  minimum: number | bigint;
  inclusive: boolean;
  exact?: boolean;
  type: 'array' | 'string' | 'number' | 'set' | 'date' | 'bigint';
}
interface ZodTooBigIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.too_big;
  maximum: number | bigint;
  inclusive: boolean;
  exact?: boolean;
  type: 'array' | 'string' | 'number' | 'set' | 'date' | 'bigint';
}
interface ZodInvalidIntersectionTypesIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.invalid_intersection_types;
}
interface ZodNotMultipleOfIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.not_multiple_of;
  multipleOf: number | bigint;
}
interface ZodNotFiniteIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.not_finite;
}
interface ZodCustomIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.custom;
  params?: {
    [k: string]: any;
  };
}
declare type DenormalizedError = {
  [k: string]: DenormalizedError | string[];
};
declare type ZodIssueOptionalMessage =
  | ZodInvalidTypeIssue
  | ZodInvalidLiteralIssue
  | ZodUnrecognizedKeysIssue
  | ZodInvalidUnionIssue
  | ZodInvalidUnionDiscriminatorIssue
  | ZodInvalidEnumValueIssue
  | ZodInvalidArgumentsIssue
  | ZodInvalidReturnTypeIssue
  | ZodInvalidDateIssue
  | ZodInvalidStringIssue
  | ZodTooSmallIssue
  | ZodTooBigIssue
  | ZodInvalidIntersectionTypesIssue
  | ZodNotMultipleOfIssue
  | ZodNotFiniteIssue
  | ZodCustomIssue;
declare type ZodIssue = ZodIssueOptionalMessage & {
  fatal?: boolean;
  message: string;
};
declare const quotelessJson: (obj: any) => string;
declare type recursiveZodFormattedError<T> = T extends [any, ...any[]]
  ? {
      [K in keyof T]?: ZodFormattedError<T[K]>;
    }
  : T extends any[]
    ? {
        [k: number]: ZodFormattedError<T[number]>;
      }
    : T extends object
      ? {
          [K in keyof T]?: ZodFormattedError<T[K]>;
        }
      : unknown;
declare type ZodFormattedError<T, U = string> = {
  _errors: U[];
} & recursiveZodFormattedError<NonNullable<T>>;
declare type inferFormattedError<T extends ZodType<any, any, any>, U = string> = ZodFormattedError<TypeOf<T>, U>;
declare class ZodError<T = any> extends Error {
  issues: ZodIssue[];
  get errors(): ZodIssue[];
  constructor(issues: ZodIssue[]);
  format(): ZodFormattedError<T>;
  format<U>(mapper: (issue: ZodIssue) => U): ZodFormattedError<T, U>;
  static create: (issues: ZodIssue[]) => ZodError<any>;
  static assert(value: unknown): asserts value is ZodError;
  toString(): string;
  get message(): string;
  get isEmpty(): boolean;
  addIssue: (sub: ZodIssue) => void;
  addIssues: (subs?: ZodIssue[]) => void;
  flatten(): typeToFlattenedError<T>;
  flatten<U>(mapper?: (issue: ZodIssue) => U): typeToFlattenedError<T, U>;
  get formErrors(): typeToFlattenedError<T, string>;
}
declare type stripPath<T extends object> = T extends any ? util.OmitKeys<T, 'path'> : never;
declare type IssueData = stripPath<ZodIssueOptionalMessage> & {
  path?: (string | number)[];
  fatal?: boolean;
};
declare type ErrorMapCtx = {
  defaultError: string;
  data: any;
};
declare type ZodErrorMap = (
  issue: ZodIssueOptionalMessage,
  _ctx: ErrorMapCtx,
) => {
  message: string;
};

declare const errorMap: ZodErrorMap;
//# sourceMappingURL=en.d.ts.map

declare function setErrorMap(map: ZodErrorMap): void;
declare function getErrorMap(): ZodErrorMap;

declare const makeIssue: (params: {
  data: any;
  path: (string | number)[];
  errorMaps: ZodErrorMap[];
  issueData: IssueData;
}) => ZodIssue;
declare type ParseParams = {
  path: (string | number)[];
  errorMap: ZodErrorMap;
  async: boolean;
};
declare type ParsePathComponent = string | number;
declare type ParsePath = ParsePathComponent[];
declare const EMPTY_PATH: ParsePath;
interface ParseContext {
  readonly common: {
    readonly issues: ZodIssue[];
    readonly contextualErrorMap?: ZodErrorMap;
    readonly async: boolean;
  };
  readonly path: ParsePath;
  readonly schemaErrorMap?: ZodErrorMap;
  readonly parent: ParseContext | null;
  readonly data: any;
  readonly parsedType: ZodParsedType;
}
declare type ParseInput = {
  data: any;
  path: (string | number)[];
  parent: ParseContext;
};
declare function addIssueToContext(ctx: ParseContext, issueData: IssueData): void;
declare type ObjectPair = {
  key: SyncParseReturnType<any>;
  value: SyncParseReturnType<any>;
};
declare class ParseStatus {
  value: 'aborted' | 'dirty' | 'valid';
  dirty(): void;
  abort(): void;
  static mergeArray(status: ParseStatus, results: SyncParseReturnType<any>[]): SyncParseReturnType;
  static mergeObjectAsync(
    status: ParseStatus,
    pairs: {
      key: ParseReturnType<any>;
      value: ParseReturnType<any>;
    }[],
  ): Promise<SyncParseReturnType<any>>;
  static mergeObjectSync(
    status: ParseStatus,
    pairs: {
      key: SyncParseReturnType<any>;
      value: SyncParseReturnType<any>;
      alwaysSet?: boolean;
    }[],
  ): SyncParseReturnType;
}
interface ParseResult {
  status: 'aborted' | 'dirty' | 'valid';
  data: any;
}
declare type INVALID = {
  status: 'aborted';
};
declare const INVALID: INVALID;
declare type DIRTY<T> = {
  status: 'dirty';
  value: T;
};
declare const DIRTY: <T>(value: T) => DIRTY<T>;
declare type OK<T> = {
  status: 'valid';
  value: T;
};
declare const OK: <T>(value: T) => OK<T>;
declare type SyncParseReturnType<T = any> = OK<T> | DIRTY<T> | INVALID;
declare type AsyncParseReturnType<T> = Promise<SyncParseReturnType<T>>;
declare type ParseReturnType<T> = SyncParseReturnType<T> | AsyncParseReturnType<T>;
declare const isAborted: (x: ParseReturnType<any>) => x is INVALID;
declare const isDirty: <T>(x: ParseReturnType<T>) => x is OK<T> | DIRTY<T>;
declare const isValid: <T>(x: ParseReturnType<T>) => x is OK<T>;
declare const isAsync: <T>(x: ParseReturnType<T>) => x is AsyncParseReturnType<T>;

declare namespace enumUtil {
  type UnionToIntersectionFn<T> = (T extends unknown ? (k: () => T) => void : never) extends (
    k: infer Intersection,
  ) => void
    ? Intersection
    : never;
  type GetUnionLast<T> = UnionToIntersectionFn<T> extends () => infer Last ? Last : never;
  type UnionToTuple<T, Tuple extends unknown[] = []> = [T] extends [never]
    ? Tuple
    : UnionToTuple<Exclude<T, GetUnionLast<T>>, [GetUnionLast<T>, ...Tuple]>;
  type CastToStringTuple<T> = T extends [string, ...string[]] ? T : never;
  export type UnionToTupleString<T> = CastToStringTuple<UnionToTuple<T>>;
  export {};
}

declare namespace errorUtil {
  type ErrMessage =
    | string
    | {
        message?: string;
      };
  const errToObj: (message?: ErrMessage | undefined) => {
    message?: string | undefined;
  };
  const toString: (message?: ErrMessage | undefined) => string | undefined;
}

declare namespace partialUtil {
  type DeepPartial<T extends ZodTypeAny> =
    T extends ZodObject<ZodRawShape>
      ? ZodObject<
          {
            [k in keyof T['shape']]: ZodOptional<DeepPartial<T['shape'][k]>>;
          },
          T['_def']['unknownKeys'],
          T['_def']['catchall']
        >
      : T extends ZodArray<infer Type, infer Card>
        ? ZodArray<DeepPartial<Type>, Card>
        : T extends ZodOptional<infer Type>
          ? ZodOptional<DeepPartial<Type>>
          : T extends ZodNullable<infer Type>
            ? ZodNullable<DeepPartial<Type>>
            : T extends ZodTuple<infer Items>
              ? {
                  [k in keyof Items]: Items[k] extends ZodTypeAny ? DeepPartial<Items[k]> : never;
                } extends infer PI
                ? PI extends ZodTupleItems
                  ? ZodTuple<PI>
                  : never
                : never
              : T;
}

interface RefinementCtx {
  addIssue: (arg: IssueData) => void;
  path: (string | number)[];
}
declare type ZodRawShape = {
  [k: string]: ZodTypeAny;
};
declare type ZodTypeAny = ZodType<any, any, any>;
declare type TypeOf<T extends ZodType<any, any, any>> = T['_output'];
declare type input<T extends ZodType<any, any, any>> = T['_input'];
declare type output<T extends ZodType<any, any, any>> = T['_output'];

declare type CustomErrorParams = Partial<util.Omit<ZodCustomIssue, 'code'>>;
interface ZodTypeDef {
  errorMap?: ZodErrorMap;
  description?: string;
}
declare type RawCreateParams =
  | {
      errorMap?: ZodErrorMap;
      invalid_type_error?: string;
      required_error?: string;
      message?: string;
      description?: string;
    }
  | undefined;
declare type ProcessedCreateParams = {
  errorMap?: ZodErrorMap;
  description?: string;
};
declare type SafeParseSuccess<Output> = {
  success: true;
  data: Output;
  error?: never;
};
declare type SafeParseError<Input> = {
  success: false;
  error: ZodError<Input>;
  data?: never;
};
declare type SafeParseReturnType<Input, Output> = SafeParseSuccess<Output> | SafeParseError<Input>;
declare abstract class ZodType<Output = any, Def extends ZodTypeDef = ZodTypeDef, Input = Output> {
  readonly _type: Output;
  readonly _output: Output;
  readonly _input: Input;
  readonly _def: Def;
  get description(): string | undefined;
  abstract _parse(input: ParseInput): ParseReturnType<Output>;
  _getType(input: ParseInput): string;
  _getOrReturnCtx(input: ParseInput, ctx?: ParseContext | undefined): ParseContext;
  _processInputParams(input: ParseInput): {
    status: ParseStatus;
    ctx: ParseContext;
  };
  _parseSync(input: ParseInput): SyncParseReturnType<Output>;
  _parseAsync(input: ParseInput): AsyncParseReturnType<Output>;
  parse(data: unknown, params?: Partial<ParseParams>): Output;
  safeParse(data: unknown, params?: Partial<ParseParams>): SafeParseReturnType<Input, Output>;
  parseAsync(data: unknown, params?: Partial<ParseParams>): Promise<Output>;
  safeParseAsync(data: unknown, params?: Partial<ParseParams>): Promise<SafeParseReturnType<Input, Output>>;
  /** Alias of safeParseAsync */
  spa: (data: unknown, params?: Partial<ParseParams> | undefined) => Promise<SafeParseReturnType<Input, Output>>;
  refine<RefinedOutput extends Output>(
    check: (arg: Output) => arg is RefinedOutput,
    message?: string | CustomErrorParams | ((arg: Output) => CustomErrorParams),
  ): ZodEffects<this, RefinedOutput, Input>;
  refine(
    check: (arg: Output) => unknown | Promise<unknown>,
    message?: string | CustomErrorParams | ((arg: Output) => CustomErrorParams),
  ): ZodEffects<this, Output, Input>;
  refinement<RefinedOutput extends Output>(
    check: (arg: Output) => arg is RefinedOutput,
    refinementData: IssueData | ((arg: Output, ctx: RefinementCtx) => IssueData),
  ): ZodEffects<this, RefinedOutput, Input>;
  refinement(
    check: (arg: Output) => boolean,
    refinementData: IssueData | ((arg: Output, ctx: RefinementCtx) => IssueData),
  ): ZodEffects<this, Output, Input>;
  _refinement(refinement: RefinementEffect<Output>['refinement']): ZodEffects<this, Output, Input>;
  superRefine<RefinedOutput extends Output>(
    refinement: (arg: Output, ctx: RefinementCtx) => arg is RefinedOutput,
  ): ZodEffects<this, RefinedOutput, Input>;
  superRefine(refinement: (arg: Output, ctx: RefinementCtx) => void): ZodEffects<this, Output, Input>;
  superRefine(refinement: (arg: Output, ctx: RefinementCtx) => Promise<void>): ZodEffects<this, Output, Input>;
  constructor(def: Def);
  optional(): ZodOptional<this>;
  nullable(): ZodNullable<this>;
  nullish(): ZodOptional<ZodNullable<this>>;
  array(): ZodArray<this>;
  promise(): ZodPromise<this>;
  or<T extends ZodTypeAny>(option: T): ZodUnion<[this, T]>;
  and<T extends ZodTypeAny>(incoming: T): ZodIntersection<this, T>;
  transform<NewOut>(transform: (arg: Output, ctx: RefinementCtx) => NewOut | Promise<NewOut>): ZodEffects<this, NewOut>;
  default(def: util.noUndefined<Input>): ZodDefault<this>;
  default(def: () => util.noUndefined<Input>): ZodDefault<this>;
  brand<B extends string | number | symbol>(brand?: B): ZodBranded<this, B>;
  catch(def: Output): ZodCatch<this>;
  catch(def: (ctx: { error: ZodError; input: Input }) => Output): ZodCatch<this>;
  describe(description: string): this;
  pipe<T extends ZodTypeAny>(target: T): ZodPipeline<this, T>;
  readonly(): ZodReadonly<this>;
  isOptional(): boolean;
  isNullable(): boolean;
}
declare type IpVersion = 'v4' | 'v6';
declare type ZodStringCheck =
  | {
      kind: 'min';
      value: number;
      message?: string;
    }
  | {
      kind: 'max';
      value: number;
      message?: string;
    }
  | {
      kind: 'length';
      value: number;
      message?: string;
    }
  | {
      kind: 'email';
      message?: string;
    }
  | {
      kind: 'url';
      message?: string;
    }
  | {
      kind: 'emoji';
      message?: string;
    }
  | {
      kind: 'uuid';
      message?: string;
    }
  | {
      kind: 'nanoid';
      message?: string;
    }
  | {
      kind: 'cuid';
      message?: string;
    }
  | {
      kind: 'includes';
      value: string;
      position?: number;
      message?: string;
    }
  | {
      kind: 'cuid2';
      message?: string;
    }
  | {
      kind: 'ulid';
      message?: string;
    }
  | {
      kind: 'startsWith';
      value: string;
      message?: string;
    }
  | {
      kind: 'endsWith';
      value: string;
      message?: string;
    }
  | {
      kind: 'regex';
      regex: RegExp;
      message?: string;
    }
  | {
      kind: 'trim';
      message?: string;
    }
  | {
      kind: 'toLowerCase';
      message?: string;
    }
  | {
      kind: 'toUpperCase';
      message?: string;
    }
  | {
      kind: 'datetime';
      offset: boolean;
      local: boolean;
      precision: number | null;
      message?: string;
    }
  | {
      kind: 'date';
      message?: string;
    }
  | {
      kind: 'time';
      precision: number | null;
      message?: string;
    }
  | {
      kind: 'duration';
      message?: string;
    }
  | {
      kind: 'ip';
      version?: IpVersion;
      message?: string;
    }
  | {
      kind: 'base64';
      message?: string;
    };
interface ZodStringDef extends ZodTypeDef {
  checks: ZodStringCheck[];
  typeName: ZodFirstPartyTypeKind.ZodString;
  coerce: boolean;
}
declare function datetimeRegex(args: { precision?: number | null; offset?: boolean; local?: boolean }): RegExp;
declare class ZodString extends ZodType<string, ZodStringDef, string> {
  _parse(input: ParseInput): ParseReturnType<string>;
  protected _regex(
    regex: RegExp,
    validation: StringValidation,
    message?: errorUtil.ErrMessage,
  ): ZodEffects<this, string, string>;
  _addCheck(check: ZodStringCheck): ZodString;
  email(message?: errorUtil.ErrMessage): ZodString;
  url(message?: errorUtil.ErrMessage): ZodString;
  emoji(message?: errorUtil.ErrMessage): ZodString;
  uuid(message?: errorUtil.ErrMessage): ZodString;
  nanoid(message?: errorUtil.ErrMessage): ZodString;
  cuid(message?: errorUtil.ErrMessage): ZodString;
  cuid2(message?: errorUtil.ErrMessage): ZodString;
  ulid(message?: errorUtil.ErrMessage): ZodString;
  base64(message?: errorUtil.ErrMessage): ZodString;
  ip(
    options?:
      | string
      | {
          version?: 'v4' | 'v6';
          message?: string;
        },
  ): ZodString;
  datetime(
    options?:
      | string
      | {
          message?: string | undefined;
          precision?: number | null;
          offset?: boolean;
          local?: boolean;
        },
  ): ZodString;
  date(message?: string): ZodString;
  time(
    options?:
      | string
      | {
          message?: string | undefined;
          precision?: number | null;
        },
  ): ZodString;
  duration(message?: errorUtil.ErrMessage): ZodString;
  regex(regex: RegExp, message?: errorUtil.ErrMessage): ZodString;
  includes(
    value: string,
    options?: {
      message?: string;
      position?: number;
    },
  ): ZodString;
  startsWith(value: string, message?: errorUtil.ErrMessage): ZodString;
  endsWith(value: string, message?: errorUtil.ErrMessage): ZodString;
  min(minLength: number, message?: errorUtil.ErrMessage): ZodString;
  max(maxLength: number, message?: errorUtil.ErrMessage): ZodString;
  length(len: number, message?: errorUtil.ErrMessage): ZodString;
  /**
   * @deprecated Use z.string().min(1) instead.
   * @see {@link ZodString.min}
   */
  nonempty(message?: errorUtil.ErrMessage): ZodString;
  trim(): ZodString;
  toLowerCase(): ZodString;
  toUpperCase(): ZodString;
  get isDatetime(): boolean;
  get isDate(): boolean;
  get isTime(): boolean;
  get isDuration(): boolean;
  get isEmail(): boolean;
  get isURL(): boolean;
  get isEmoji(): boolean;
  get isUUID(): boolean;
  get isNANOID(): boolean;
  get isCUID(): boolean;
  get isCUID2(): boolean;
  get isULID(): boolean;
  get isIP(): boolean;
  get isBase64(): boolean;
  get minLength(): number | null;
  get maxLength(): number | null;
  static create: (
    params?:
      | ({
          errorMap?: ZodErrorMap | undefined;
          invalid_type_error?: string | undefined;
          required_error?: string | undefined;
          message?: string | undefined;
          description?: string | undefined;
        } & {
          coerce?: true | undefined;
        })
      | undefined,
  ) => ZodString;
}
declare type ZodNumberCheck =
  | {
      kind: 'min';
      value: number;
      inclusive: boolean;
      message?: string;
    }
  | {
      kind: 'max';
      value: number;
      inclusive: boolean;
      message?: string;
    }
  | {
      kind: 'int';
      message?: string;
    }
  | {
      kind: 'multipleOf';
      value: number;
      message?: string;
    }
  | {
      kind: 'finite';
      message?: string;
    };
interface ZodNumberDef extends ZodTypeDef {
  checks: ZodNumberCheck[];
  typeName: ZodFirstPartyTypeKind.ZodNumber;
  coerce: boolean;
}
declare class ZodNumber extends ZodType<number, ZodNumberDef, number> {
  _parse(input: ParseInput): ParseReturnType<number>;
  static create: (
    params?:
      | ({
          errorMap?: ZodErrorMap | undefined;
          invalid_type_error?: string | undefined;
          required_error?: string | undefined;
          message?: string | undefined;
          description?: string | undefined;
        } & {
          coerce?: boolean | undefined;
        })
      | undefined,
  ) => ZodNumber;
  gte(value: number, message?: errorUtil.ErrMessage): ZodNumber;
  min: (value: number, message?: errorUtil.ErrMessage | undefined) => ZodNumber;
  gt(value: number, message?: errorUtil.ErrMessage): ZodNumber;
  lte(value: number, message?: errorUtil.ErrMessage): ZodNumber;
  max: (value: number, message?: errorUtil.ErrMessage | undefined) => ZodNumber;
  lt(value: number, message?: errorUtil.ErrMessage): ZodNumber;
  protected setLimit(kind: 'min' | 'max', value: number, inclusive: boolean, message?: string): ZodNumber;
  _addCheck(check: ZodNumberCheck): ZodNumber;
  int(message?: errorUtil.ErrMessage): ZodNumber;
  positive(message?: errorUtil.ErrMessage): ZodNumber;
  negative(message?: errorUtil.ErrMessage): ZodNumber;
  nonpositive(message?: errorUtil.ErrMessage): ZodNumber;
  nonnegative(message?: errorUtil.ErrMessage): ZodNumber;
  multipleOf(value: number, message?: errorUtil.ErrMessage): ZodNumber;
  step: (value: number, message?: errorUtil.ErrMessage | undefined) => ZodNumber;
  finite(message?: errorUtil.ErrMessage): ZodNumber;
  safe(message?: errorUtil.ErrMessage): ZodNumber;
  get minValue(): number | null;
  get maxValue(): number | null;
  get isInt(): boolean;
  get isFinite(): boolean;
}
declare type ZodBigIntCheck =
  | {
      kind: 'min';
      value: bigint;
      inclusive: boolean;
      message?: string;
    }
  | {
      kind: 'max';
      value: bigint;
      inclusive: boolean;
      message?: string;
    }
  | {
      kind: 'multipleOf';
      value: bigint;
      message?: string;
    };
interface ZodBigIntDef extends ZodTypeDef {
  checks: ZodBigIntCheck[];
  typeName: ZodFirstPartyTypeKind.ZodBigInt;
  coerce: boolean;
}
declare class ZodBigInt extends ZodType<bigint, ZodBigIntDef, bigint> {
  _parse(input: ParseInput): ParseReturnType<bigint>;
  static create: (
    params?:
      | ({
          errorMap?: ZodErrorMap | undefined;
          invalid_type_error?: string | undefined;
          required_error?: string | undefined;
          message?: string | undefined;
          description?: string | undefined;
        } & {
          coerce?: boolean | undefined;
        })
      | undefined,
  ) => ZodBigInt;
  gte(value: bigint, message?: errorUtil.ErrMessage): ZodBigInt;
  min: (value: bigint, message?: errorUtil.ErrMessage | undefined) => ZodBigInt;
  gt(value: bigint, message?: errorUtil.ErrMessage): ZodBigInt;
  lte(value: bigint, message?: errorUtil.ErrMessage): ZodBigInt;
  max: (value: bigint, message?: errorUtil.ErrMessage | undefined) => ZodBigInt;
  lt(value: bigint, message?: errorUtil.ErrMessage): ZodBigInt;
  protected setLimit(kind: 'min' | 'max', value: bigint, inclusive: boolean, message?: string): ZodBigInt;
  _addCheck(check: ZodBigIntCheck): ZodBigInt;
  positive(message?: errorUtil.ErrMessage): ZodBigInt;
  negative(message?: errorUtil.ErrMessage): ZodBigInt;
  nonpositive(message?: errorUtil.ErrMessage): ZodBigInt;
  nonnegative(message?: errorUtil.ErrMessage): ZodBigInt;
  multipleOf(value: bigint, message?: errorUtil.ErrMessage): ZodBigInt;
  get minValue(): bigint | null;
  get maxValue(): bigint | null;
}
interface ZodBooleanDef extends ZodTypeDef {
  typeName: ZodFirstPartyTypeKind.ZodBoolean;
  coerce: boolean;
}
declare class ZodBoolean extends ZodType<boolean, ZodBooleanDef, boolean> {
  _parse(input: ParseInput): ParseReturnType<boolean>;
  static create: (
    params?:
      | ({
          errorMap?: ZodErrorMap | undefined;
          invalid_type_error?: string | undefined;
          required_error?: string | undefined;
          message?: string | undefined;
          description?: string | undefined;
        } & {
          coerce?: boolean | undefined;
        })
      | undefined,
  ) => ZodBoolean;
}
declare type ZodDateCheck =
  | {
      kind: 'min';
      value: number;
      message?: string;
    }
  | {
      kind: 'max';
      value: number;
      message?: string;
    };
interface ZodDateDef extends ZodTypeDef {
  checks: ZodDateCheck[];
  coerce: boolean;
  typeName: ZodFirstPartyTypeKind.ZodDate;
}
declare class ZodDate extends ZodType<Date, ZodDateDef, Date> {
  _parse(input: ParseInput): ParseReturnType<this['_output']>;
  _addCheck(check: ZodDateCheck): ZodDate;
  min(minDate: Date, message?: errorUtil.ErrMessage): ZodDate;
  max(maxDate: Date, message?: errorUtil.ErrMessage): ZodDate;
  get minDate(): Date | null;
  get maxDate(): Date | null;
  static create: (
    params?:
      | ({
          errorMap?: ZodErrorMap | undefined;
          invalid_type_error?: string | undefined;
          required_error?: string | undefined;
          message?: string | undefined;
          description?: string | undefined;
        } & {
          coerce?: boolean | undefined;
        })
      | undefined,
  ) => ZodDate;
}
interface ZodSymbolDef extends ZodTypeDef {
  typeName: ZodFirstPartyTypeKind.ZodSymbol;
}
declare class ZodSymbol extends ZodType<symbol, ZodSymbolDef, symbol> {
  _parse(input: ParseInput): ParseReturnType<this['_output']>;
  static create: (params?: RawCreateParams) => ZodSymbol;
}
interface ZodUndefinedDef extends ZodTypeDef {
  typeName: ZodFirstPartyTypeKind.ZodUndefined;
}
declare class ZodUndefined extends ZodType<undefined, ZodUndefinedDef, undefined> {
  _parse(input: ParseInput): ParseReturnType<this['_output']>;
  params?: RawCreateParams;
  static create: (params?: RawCreateParams) => ZodUndefined;
}
interface ZodNullDef extends ZodTypeDef {
  typeName: ZodFirstPartyTypeKind.ZodNull;
}
declare class ZodNull extends ZodType<null, ZodNullDef, null> {
  _parse(input: ParseInput): ParseReturnType<this['_output']>;
  static create: (params?: RawCreateParams) => ZodNull;
}
interface ZodAnyDef extends ZodTypeDef {
  typeName: ZodFirstPartyTypeKind.ZodAny;
}
declare class ZodAny extends ZodType<any, ZodAnyDef, any> {
  _any: true;
  _parse(input: ParseInput): ParseReturnType<this['_output']>;
  static create: (params?: RawCreateParams) => ZodAny;
}
interface ZodUnknownDef extends ZodTypeDef {
  typeName: ZodFirstPartyTypeKind.ZodUnknown;
}
declare class ZodUnknown extends ZodType<unknown, ZodUnknownDef, unknown> {
  _unknown: true;
  _parse(input: ParseInput): ParseReturnType<this['_output']>;
  static create: (params?: RawCreateParams) => ZodUnknown;
}
interface ZodNeverDef extends ZodTypeDef {
  typeName: ZodFirstPartyTypeKind.ZodNever;
}
declare class ZodNever extends ZodType<never, ZodNeverDef, never> {
  _parse(input: ParseInput): ParseReturnType<this['_output']>;
  static create: (params?: RawCreateParams) => ZodNever;
}
interface ZodVoidDef extends ZodTypeDef {
  typeName: ZodFirstPartyTypeKind.ZodVoid;
}
declare class ZodVoid extends ZodType<void, ZodVoidDef, void> {
  _parse(input: ParseInput): ParseReturnType<this['_output']>;
  static create: (params?: RawCreateParams) => ZodVoid;
}
interface ZodArrayDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
  type: T;
  typeName: ZodFirstPartyTypeKind.ZodArray;
  exactLength: {
    value: number;
    message?: string;
  } | null;
  minLength: {
    value: number;
    message?: string;
  } | null;
  maxLength: {
    value: number;
    message?: string;
  } | null;
}
declare type ArrayCardinality = 'many' | 'atleastone';
declare type arrayOutputType<
  T extends ZodTypeAny,
  Cardinality extends ArrayCardinality = 'many',
> = Cardinality extends 'atleastone' ? [T['_output'], ...T['_output'][]] : T['_output'][];
declare class ZodArray<T extends ZodTypeAny, Cardinality extends ArrayCardinality = 'many'> extends ZodType<
  arrayOutputType<T, Cardinality>,
  ZodArrayDef<T>,
  Cardinality extends 'atleastone' ? [T['_input'], ...T['_input'][]] : T['_input'][]
> {
  _parse(input: ParseInput): ParseReturnType<this['_output']>;
  get element(): T;
  min(minLength: number, message?: errorUtil.ErrMessage): this;
  max(maxLength: number, message?: errorUtil.ErrMessage): this;
  length(len: number, message?: errorUtil.ErrMessage): this;
  nonempty(message?: errorUtil.ErrMessage): ZodArray<T, 'atleastone'>;
  static create: <T_1 extends ZodTypeAny>(schema: T_1, params?: RawCreateParams) => ZodArray<T_1, 'many'>;
}
declare type ZodNonEmptyArray<T extends ZodTypeAny> = ZodArray<T, 'atleastone'>;
declare type UnknownKeysParam = 'passthrough' | 'strict' | 'strip';
interface ZodObjectDef<
  T extends ZodRawShape = ZodRawShape,
  UnknownKeys extends UnknownKeysParam = UnknownKeysParam,
  Catchall extends ZodTypeAny = ZodTypeAny,
> extends ZodTypeDef {
  typeName: ZodFirstPartyTypeKind.ZodObject;
  shape: () => T;
  catchall: Catchall;
  unknownKeys: UnknownKeys;
}
declare type mergeTypes<A, B> = {
  [k in keyof A | keyof B]: k extends keyof B ? B[k] : k extends keyof A ? A[k] : never;
};
declare type objectOutputType<
  Shape extends ZodRawShape,
  Catchall extends ZodTypeAny,
  UnknownKeys extends UnknownKeysParam = UnknownKeysParam,
> = objectUtil.flatten<objectUtil.addQuestionMarks<baseObjectOutputType<Shape>>> &
  CatchallOutput<Catchall> &
  PassthroughType<UnknownKeys>;
declare type baseObjectOutputType<Shape extends ZodRawShape> = {
  [k in keyof Shape]: Shape[k]['_output'];
};
declare type objectInputType<
  Shape extends ZodRawShape,
  Catchall extends ZodTypeAny,
  UnknownKeys extends UnknownKeysParam = UnknownKeysParam,
> = objectUtil.flatten<baseObjectInputType<Shape>> & CatchallInput<Catchall> & PassthroughType<UnknownKeys>;
declare type baseObjectInputType<Shape extends ZodRawShape> = objectUtil.addQuestionMarks<{
  [k in keyof Shape]: Shape[k]['_input'];
}>;
declare type CatchallOutput<T extends ZodType> = ZodType extends T
  ? unknown
  : {
      [k: string]: T['_output'];
    };
declare type CatchallInput<T extends ZodType> = ZodType extends T
  ? unknown
  : {
      [k: string]: T['_input'];
    };
declare type PassthroughType<T extends UnknownKeysParam> = T extends 'passthrough'
  ? {
      [k: string]: unknown;
    }
  : unknown;
declare type deoptional<T extends ZodTypeAny> =
  T extends ZodOptional<infer U> ? deoptional<U> : T extends ZodNullable<infer U> ? ZodNullable<deoptional<U>> : T;
declare type SomeZodObject = ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny>;
declare type noUnrecognized<Obj extends object, Shape extends object> = {
  [k in keyof Obj]: k extends keyof Shape ? Obj[k] : never;
};
declare class ZodObject<
  T extends ZodRawShape,
  UnknownKeys extends UnknownKeysParam = UnknownKeysParam,
  Catchall extends ZodTypeAny = ZodTypeAny,
  Output = objectOutputType<T, Catchall, UnknownKeys>,
  Input = objectInputType<T, Catchall, UnknownKeys>,
> extends ZodType<Output, ZodObjectDef<T, UnknownKeys, Catchall>, Input> {
  private _cached;
  _getCached(): {
    shape: T;
    keys: string[];
  };
  _parse(input: ParseInput): ParseReturnType<this['_output']>;
  get shape(): T;
  strict(message?: errorUtil.ErrMessage): ZodObject<T, 'strict', Catchall>;
  strip(): ZodObject<T, 'strip', Catchall>;
  passthrough(): ZodObject<T, 'passthrough', Catchall>;
  /**
   * @deprecated In most cases, this is no longer needed - unknown properties are now silently stripped.
   * If you want to pass through unknown properties, use \`.passthrough()\` instead.
   */
  nonstrict: () => ZodObject<T, 'passthrough', Catchall>;
  extend<Augmentation extends ZodRawShape>(
    augmentation: Augmentation,
  ): ZodObject<objectUtil.extendShape<T, Augmentation>, UnknownKeys, Catchall>;
  /**
   * @deprecated Use \`.extend\` instead
   *  */
  augment: <Augmentation extends ZodRawShape>(
    augmentation: Augmentation,
  ) => ZodObject<
    objectUtil.extendShape<T, Augmentation>,
    UnknownKeys,
    Catchall,
    objectOutputType<objectUtil.extendShape<T, Augmentation>, Catchall, UnknownKeys>,
    objectInputType<objectUtil.extendShape<T, Augmentation>, Catchall, UnknownKeys>
  >;
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge<Incoming extends AnyZodObject, Augmentation extends Incoming['shape']>(
    merging: Incoming,
  ): ZodObject<objectUtil.extendShape<T, Augmentation>, Incoming['_def']['unknownKeys'], Incoming['_def']['catchall']>;
  setKey<Key extends string, Schema extends ZodTypeAny>(
    key: Key,
    schema: Schema,
  ): ZodObject<
    T & {
      [k in Key]: Schema;
    },
    UnknownKeys,
    Catchall
  >;
  catchall<Index extends ZodTypeAny>(index: Index): ZodObject<T, UnknownKeys, Index>;
  pick<
    Mask extends util.Exactly<
      {
        [k in keyof T]?: true;
      },
      Mask
    >,
  >(mask: Mask): ZodObject<Pick<T, Extract<keyof T, keyof Mask>>, UnknownKeys, Catchall>;
  omit<
    Mask extends util.Exactly<
      {
        [k in keyof T]?: true;
      },
      Mask
    >,
  >(mask: Mask): ZodObject<Omit<T, keyof Mask>, UnknownKeys, Catchall>;
  /**
   * @deprecated
   */
  deepPartial(): partialUtil.DeepPartial<this>;
  partial(): ZodObject<
    {
      [k in keyof T]: ZodOptional<T[k]>;
    },
    UnknownKeys,
    Catchall
  >;
  partial<
    Mask extends util.Exactly<
      {
        [k in keyof T]?: true;
      },
      Mask
    >,
  >(
    mask: Mask,
  ): ZodObject<
    objectUtil.noNever<{
      [k in keyof T]: k extends keyof Mask ? ZodOptional<T[k]> : T[k];
    }>,
    UnknownKeys,
    Catchall
  >;
  required(): ZodObject<
    {
      [k in keyof T]: deoptional<T[k]>;
    },
    UnknownKeys,
    Catchall
  >;
  required<
    Mask extends util.Exactly<
      {
        [k in keyof T]?: true;
      },
      Mask
    >,
  >(
    mask: Mask,
  ): ZodObject<
    objectUtil.noNever<{
      [k in keyof T]: k extends keyof Mask ? deoptional<T[k]> : T[k];
    }>,
    UnknownKeys,
    Catchall
  >;
  keyof(): ZodEnum<enumUtil.UnionToTupleString<keyof T>>;
  static create: <T_1 extends ZodRawShape>(
    shape: T_1,
    params?: RawCreateParams,
  ) => ZodObject<
    T_1,
    'strip',
    ZodTypeAny,
    {
      [k in keyof objectUtil.addQuestionMarks<baseObjectOutputType<T_1>, any>]: objectUtil.addQuestionMarks<
        baseObjectOutputType<T_1>,
        any
      >[k];
    },
    { [k_1 in keyof baseObjectInputType<T_1>]: baseObjectInputType<T_1>[k_1] }
  >;
  static strictCreate: <T_1 extends ZodRawShape>(
    shape: T_1,
    params?: RawCreateParams,
  ) => ZodObject<
    T_1,
    'strict',
    ZodTypeAny,
    {
      [k in keyof objectUtil.addQuestionMarks<baseObjectOutputType<T_1>, any>]: objectUtil.addQuestionMarks<
        baseObjectOutputType<T_1>,
        any
      >[k];
    },
    { [k_1 in keyof baseObjectInputType<T_1>]: baseObjectInputType<T_1>[k_1] }
  >;
  static lazycreate: <T_1 extends ZodRawShape>(
    shape: () => T_1,
    params?: RawCreateParams,
  ) => ZodObject<
    T_1,
    'strip',
    ZodTypeAny,
    {
      [k in keyof objectUtil.addQuestionMarks<baseObjectOutputType<T_1>, any>]: objectUtil.addQuestionMarks<
        baseObjectOutputType<T_1>,
        any
      >[k];
    },
    { [k_1 in keyof baseObjectInputType<T_1>]: baseObjectInputType<T_1>[k_1] }
  >;
}
declare type AnyZodObject = ZodObject<any, any, any>;
declare type ZodUnionOptions = Readonly<[ZodTypeAny, ...ZodTypeAny[]]>;
interface ZodUnionDef<T extends ZodUnionOptions = Readonly<[ZodTypeAny, ZodTypeAny, ...ZodTypeAny[]]>>
  extends ZodTypeDef {
  options: T;
  typeName: ZodFirstPartyTypeKind.ZodUnion;
}
declare class ZodUnion<T extends ZodUnionOptions> extends ZodType<
  T[number]['_output'],
  ZodUnionDef<T>,
  T[number]['_input']
> {
  _parse(input: ParseInput): ParseReturnType<this['_output']>;
  get options(): T;
  static create: <T_1 extends readonly [ZodTypeAny, ZodTypeAny, ...ZodTypeAny[]]>(
    types: T_1,
    params?: RawCreateParams,
  ) => ZodUnion<T_1>;
}
declare type ZodDiscriminatedUnionOption<Discriminator extends string> = ZodObject<
  {
    [key in Discriminator]: ZodTypeAny;
  } & ZodRawShape,
  UnknownKeysParam,
  ZodTypeAny
>;
interface ZodDiscriminatedUnionDef<
  Discriminator extends string,
  Options extends ZodDiscriminatedUnionOption<string>[] = ZodDiscriminatedUnionOption<string>[],
> extends ZodTypeDef {
  discriminator: Discriminator;
  options: Options;
  optionsMap: Map<Primitive, ZodDiscriminatedUnionOption<any>>;
  typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion;
}
declare class ZodDiscriminatedUnion<
  Discriminator extends string,
  Options extends ZodDiscriminatedUnionOption<Discriminator>[],
> extends ZodType<output<Options[number]>, ZodDiscriminatedUnionDef<Discriminator, Options>, input<Options[number]>> {
  _parse(input: ParseInput): ParseReturnType<this['_output']>;
  get discriminator(): Discriminator;
  get options(): Options;
  get optionsMap(): Map<Primitive, ZodDiscriminatedUnionOption<any>>;
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create<
    Discriminator extends string,
    Types extends [ZodDiscriminatedUnionOption<Discriminator>, ...ZodDiscriminatedUnionOption<Discriminator>[]],
  >(
    discriminator: Discriminator,
    options: Types,
    params?: RawCreateParams,
  ): ZodDiscriminatedUnion<Discriminator, Types>;
}
interface ZodIntersectionDef<T extends ZodTypeAny = ZodTypeAny, U extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
  left: T;
  right: U;
  typeName: ZodFirstPartyTypeKind.ZodIntersection;
}
declare class ZodIntersection<T extends ZodTypeAny, U extends ZodTypeAny> extends ZodType<
  T['_output'] & U['_output'],
  ZodIntersectionDef<T, U>,
  T['_input'] & U['_input']
> {
  _parse(input: ParseInput): ParseReturnType<this['_output']>;
  static create: <T_1 extends ZodTypeAny, U_1 extends ZodTypeAny>(
    left: T_1,
    right: U_1,
    params?: RawCreateParams,
  ) => ZodIntersection<T_1, U_1>;
}
declare type ZodTupleItems = [ZodTypeAny, ...ZodTypeAny[]];
declare type AssertArray<T> = T extends any[] ? T : never;
declare type OutputTypeOfTuple<T extends ZodTupleItems | []> = AssertArray<{
  [k in keyof T]: T[k] extends ZodType<any, any, any> ? T[k]['_output'] : never;
}>;
declare type OutputTypeOfTupleWithRest<
  T extends ZodTupleItems | [],
  Rest extends ZodTypeAny | null = null,
> = Rest extends ZodTypeAny ? [...OutputTypeOfTuple<T>, ...Rest['_output'][]] : OutputTypeOfTuple<T>;
declare type InputTypeOfTuple<T extends ZodTupleItems | []> = AssertArray<{
  [k in keyof T]: T[k] extends ZodType<any, any, any> ? T[k]['_input'] : never;
}>;
declare type InputTypeOfTupleWithRest<
  T extends ZodTupleItems | [],
  Rest extends ZodTypeAny | null = null,
> = Rest extends ZodTypeAny ? [...InputTypeOfTuple<T>, ...Rest['_input'][]] : InputTypeOfTuple<T>;
interface ZodTupleDef<T extends ZodTupleItems | [] = ZodTupleItems, Rest extends ZodTypeAny | null = null>
  extends ZodTypeDef {
  items: T;
  rest: Rest;
  typeName: ZodFirstPartyTypeKind.ZodTuple;
}
declare type AnyZodTuple = ZodTuple<[ZodTypeAny, ...ZodTypeAny[]] | [], ZodTypeAny | null>;
declare class ZodTuple<
  T extends [ZodTypeAny, ...ZodTypeAny[]] | [] = [ZodTypeAny, ...ZodTypeAny[]],
  Rest extends ZodTypeAny | null = null,
> extends ZodType<OutputTypeOfTupleWithRest<T, Rest>, ZodTupleDef<T, Rest>, InputTypeOfTupleWithRest<T, Rest>> {
  _parse(input: ParseInput): ParseReturnType<this['_output']>;
  get items(): T;
  rest<Rest extends ZodTypeAny>(rest: Rest): ZodTuple<T, Rest>;
  static create: <T_1 extends [] | [ZodTypeAny, ...ZodTypeAny[]]>(
    schemas: T_1,
    params?: RawCreateParams,
  ) => ZodTuple<T_1, null>;
}
interface ZodRecordDef<Key extends KeySchema = ZodString, Value extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
  valueType: Value;
  keyType: Key;
  typeName: ZodFirstPartyTypeKind.ZodRecord;
}
declare type KeySchema = ZodType<string | number | symbol, any, any>;
declare type RecordType<K extends string | number | symbol, V> = [string] extends [K]
  ? Record<K, V>
  : [number] extends [K]
    ? Record<K, V>
    : [symbol] extends [K]
      ? Record<K, V>
      : [BRAND<string | number | symbol>] extends [K]
        ? Record<K, V>
        : Partial<Record<K, V>>;
declare class ZodRecord<Key extends KeySchema = ZodString, Value extends ZodTypeAny = ZodTypeAny> extends ZodType<
  RecordType<Key['_output'], Value['_output']>,
  ZodRecordDef<Key, Value>,
  RecordType<Key['_input'], Value['_input']>
> {
  get keySchema(): Key;
  get valueSchema(): Value;
  _parse(input: ParseInput): ParseReturnType<this['_output']>;
  get element(): Value;
  static create<Value extends ZodTypeAny>(valueType: Value, params?: RawCreateParams): ZodRecord<ZodString, Value>;
  static create<Keys extends KeySchema, Value extends ZodTypeAny>(
    keySchema: Keys,
    valueType: Value,
    params?: RawCreateParams,
  ): ZodRecord<Keys, Value>;
}
interface ZodMapDef<Key extends ZodTypeAny = ZodTypeAny, Value extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
  valueType: Value;
  keyType: Key;
  typeName: ZodFirstPartyTypeKind.ZodMap;
}
declare class ZodMap<Key extends ZodTypeAny = ZodTypeAny, Value extends ZodTypeAny = ZodTypeAny> extends ZodType<
  Map<Key['_output'], Value['_output']>,
  ZodMapDef<Key, Value>,
  Map<Key['_input'], Value['_input']>
> {
  get keySchema(): Key;
  get valueSchema(): Value;
  _parse(input: ParseInput): ParseReturnType<this['_output']>;
  static create: <Key_1 extends ZodTypeAny = ZodTypeAny, Value_1 extends ZodTypeAny = ZodTypeAny>(
    keyType: Key_1,
    valueType: Value_1,
    params?: RawCreateParams,
  ) => ZodMap<Key_1, Value_1>;
}
interface ZodSetDef<Value extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
  valueType: Value;
  typeName: ZodFirstPartyTypeKind.ZodSet;
  minSize: {
    value: number;
    message?: string;
  } | null;
  maxSize: {
    value: number;
    message?: string;
  } | null;
}
declare class ZodSet<Value extends ZodTypeAny = ZodTypeAny> extends ZodType<
  Set<Value['_output']>,
  ZodSetDef<Value>,
  Set<Value['_input']>
> {
  _parse(input: ParseInput): ParseReturnType<this['_output']>;
  min(minSize: number, message?: errorUtil.ErrMessage): this;
  max(maxSize: number, message?: errorUtil.ErrMessage): this;
  size(size: number, message?: errorUtil.ErrMessage): this;
  nonempty(message?: errorUtil.ErrMessage): ZodSet<Value>;
  static create: <Value_1 extends ZodTypeAny = ZodTypeAny>(
    valueType: Value_1,
    params?: RawCreateParams,
  ) => ZodSet<Value_1>;
}
interface ZodFunctionDef<Args extends ZodTuple<any, any> = ZodTuple<any, any>, Returns extends ZodTypeAny = ZodTypeAny>
  extends ZodTypeDef {
  args: Args;
  returns: Returns;
  typeName: ZodFirstPartyTypeKind.ZodFunction;
}
declare type OuterTypeOfFunction<Args extends ZodTuple<any, any>, Returns extends ZodTypeAny> =
  Args['_input'] extends Array<any> ? (...args: Args['_input']) => Returns['_output'] : never;
declare type InnerTypeOfFunction<Args extends ZodTuple<any, any>, Returns extends ZodTypeAny> =
  Args['_output'] extends Array<any> ? (...args: Args['_output']) => Returns['_input'] : never;
declare class ZodFunction<Args extends ZodTuple<any, any>, Returns extends ZodTypeAny> extends ZodType<
  OuterTypeOfFunction<Args, Returns>,
  ZodFunctionDef<Args, Returns>,
  InnerTypeOfFunction<Args, Returns>
> {
  _parse(input: ParseInput): ParseReturnType<any>;
  parameters(): Args;
  returnType(): Returns;
  args<Items extends Parameters<(typeof ZodTuple)['create']>[0]>(
    ...items: Items
  ): ZodFunction<ZodTuple<Items, ZodUnknown>, Returns>;
  returns<NewReturnType extends ZodType<any, any, any>>(returnType: NewReturnType): ZodFunction<Args, NewReturnType>;
  implement<F extends InnerTypeOfFunction<Args, Returns>>(
    func: F,
  ): ReturnType<F> extends Returns['_output']
    ? (...args: Args['_input']) => ReturnType<F>
    : OuterTypeOfFunction<Args, Returns>;
  strictImplement(func: InnerTypeOfFunction<Args, Returns>): InnerTypeOfFunction<Args, Returns>;
  validate: <F extends InnerTypeOfFunction<Args, Returns>>(
    func: F,
  ) => ReturnType<F> extends Returns['_output']
    ? (...args: Args['_input']) => ReturnType<F>
    : OuterTypeOfFunction<Args, Returns>;
  static create(): ZodFunction<ZodTuple<[], ZodUnknown>, ZodUnknown>;
  static create<T extends AnyZodTuple = ZodTuple<[], ZodUnknown>>(args: T): ZodFunction<T, ZodUnknown>;
  static create<T extends AnyZodTuple, U extends ZodTypeAny>(args: T, returns: U): ZodFunction<T, U>;
  static create<T extends AnyZodTuple = ZodTuple<[], ZodUnknown>, U extends ZodTypeAny = ZodUnknown>(
    args: T,
    returns: U,
    params?: RawCreateParams,
  ): ZodFunction<T, U>;
}
interface ZodLazyDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
  getter: () => T;
  typeName: ZodFirstPartyTypeKind.ZodLazy;
}
declare class ZodLazy<T extends ZodTypeAny> extends ZodType<output<T>, ZodLazyDef<T>, input<T>> {
  get schema(): T;
  _parse(input: ParseInput): ParseReturnType<this['_output']>;
  static create: <T_1 extends ZodTypeAny>(getter: () => T_1, params?: RawCreateParams) => ZodLazy<T_1>;
}
interface ZodLiteralDef<T = any> extends ZodTypeDef {
  value: T;
  typeName: ZodFirstPartyTypeKind.ZodLiteral;
}
declare class ZodLiteral<T> extends ZodType<T, ZodLiteralDef<T>, T> {
  _parse(input: ParseInput): ParseReturnType<this['_output']>;
  get value(): T;
  static create: <T_1 extends Primitive>(value: T_1, params?: RawCreateParams) => ZodLiteral<T_1>;
}
declare type ArrayKeys = keyof any[];
declare type Indices<T> = Exclude<keyof T, ArrayKeys>;
declare type EnumValues<T extends string = string> = readonly [T, ...T[]];
declare type Values<T extends EnumValues> = {
  [k in T[number]]: k;
};
interface ZodEnumDef<T extends EnumValues = EnumValues> extends ZodTypeDef {
  values: T;
  typeName: ZodFirstPartyTypeKind.ZodEnum;
}
declare type Writeable<T> = {
  -readonly [P in keyof T]: T[P];
};
declare type FilterEnum<Values, ToExclude> = Values extends []
  ? []
  : Values extends [infer Head, ...infer Rest]
    ? Head extends ToExclude
      ? FilterEnum<Rest, ToExclude>
      : [Head, ...FilterEnum<Rest, ToExclude>]
    : never;
declare type typecast<A, T> = A extends T ? A : never;
declare function createZodEnum<U extends string, T extends Readonly<[U, ...U[]]>>(
  values: T,
  params?: RawCreateParams,
): ZodEnum<Writeable<T>>;
declare function createZodEnum<U extends string, T extends [U, ...U[]]>(
  values: T,
  params?: RawCreateParams,
): ZodEnum<T>;
declare class ZodEnum<T extends [string, ...string[]]> extends ZodType<T[number], ZodEnumDef<T>, T[number]> {
  #private;
  _parse(input: ParseInput): ParseReturnType<this['_output']>;
  get options(): T;
  get enum(): Values<T>;
  get Values(): Values<T>;
  get Enum(): Values<T>;
  extract<ToExtract extends readonly [T[number], ...T[number][]]>(
    values: ToExtract,
    newDef?: RawCreateParams,
  ): ZodEnum<Writeable<ToExtract>>;
  exclude<ToExclude extends readonly [T[number], ...T[number][]]>(
    values: ToExclude,
    newDef?: RawCreateParams,
  ): ZodEnum<typecast<Writeable<FilterEnum<T, ToExclude[number]>>, [string, ...string[]]>>;
  static create: typeof createZodEnum;
}
interface ZodNativeEnumDef<T extends EnumLike = EnumLike> extends ZodTypeDef {
  values: T;
  typeName: ZodFirstPartyTypeKind.ZodNativeEnum;
}
declare type EnumLike = {
  [k: string]: string | number;
  [nu: number]: string;
};
declare class ZodNativeEnum<T extends EnumLike> extends ZodType<T[keyof T], ZodNativeEnumDef<T>, T[keyof T]> {
  #private;
  _parse(input: ParseInput): ParseReturnType<T[keyof T]>;
  get enum(): T;
  static create: <T_1 extends EnumLike>(values: T_1, params?: RawCreateParams) => ZodNativeEnum<T_1>;
}
interface ZodPromiseDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
  type: T;
  typeName: ZodFirstPartyTypeKind.ZodPromise;
}
declare class ZodPromise<T extends ZodTypeAny> extends ZodType<
  Promise<T['_output']>,
  ZodPromiseDef<T>,
  Promise<T['_input']>
> {
  unwrap(): T;
  _parse(input: ParseInput): ParseReturnType<this['_output']>;
  static create: <T_1 extends ZodTypeAny>(schema: T_1, params?: RawCreateParams) => ZodPromise<T_1>;
}
declare type Refinement<T> = (arg: T, ctx: RefinementCtx) => any;
declare type SuperRefinement<T> = (arg: T, ctx: RefinementCtx) => void | Promise<void>;
declare type RefinementEffect<T> = {
  type: 'refinement';
  refinement: (arg: T, ctx: RefinementCtx) => any;
};
declare type TransformEffect<T> = {
  type: 'transform';
  transform: (arg: T, ctx: RefinementCtx) => any;
};
declare type PreprocessEffect<T> = {
  type: 'preprocess';
  transform: (arg: T, ctx: RefinementCtx) => any;
};
declare type Effect<T> = RefinementEffect<T> | TransformEffect<T> | PreprocessEffect<T>;
interface ZodEffectsDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
  schema: T;
  typeName: ZodFirstPartyTypeKind.ZodEffects;
  effect: Effect<any>;
}
declare class ZodEffects<T extends ZodTypeAny, Output = output<T>, Input = input<T>> extends ZodType<
  Output,
  ZodEffectsDef<T>,
  Input
> {
  innerType(): T;
  sourceType(): T;
  _parse(input: ParseInput): ParseReturnType<this['_output']>;
  static create: <I extends ZodTypeAny>(
    schema: I,
    effect: Effect<I['_output']>,
    params?: RawCreateParams,
  ) => ZodEffects<I, I['_output'], input<I>>;
  static createWithPreprocess: <I extends ZodTypeAny>(
    preprocess: (arg: unknown, ctx: RefinementCtx) => unknown,
    schema: I,
    params?: RawCreateParams,
  ) => ZodEffects<I, I['_output'], unknown>;
}

interface ZodOptionalDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
  innerType: T;
  typeName: ZodFirstPartyTypeKind.ZodOptional;
}
declare type ZodOptionalType<T extends ZodTypeAny> = ZodOptional<T>;
declare class ZodOptional<T extends ZodTypeAny> extends ZodType<
  T['_output'] | undefined,
  ZodOptionalDef<T>,
  T['_input'] | undefined
> {
  _parse(input: ParseInput): ParseReturnType<this['_output']>;
  unwrap(): T;
  static create: <T_1 extends ZodTypeAny>(type: T_1, params?: RawCreateParams) => ZodOptional<T_1>;
}
interface ZodNullableDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
  innerType: T;
  typeName: ZodFirstPartyTypeKind.ZodNullable;
}
declare type ZodNullableType<T extends ZodTypeAny> = ZodNullable<T>;
declare class ZodNullable<T extends ZodTypeAny> extends ZodType<
  T['_output'] | null,
  ZodNullableDef<T>,
  T['_input'] | null
> {
  _parse(input: ParseInput): ParseReturnType<this['_output']>;
  unwrap(): T;
  static create: <T_1 extends ZodTypeAny>(type: T_1, params?: RawCreateParams) => ZodNullable<T_1>;
}
interface ZodDefaultDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
  innerType: T;
  defaultValue: () => util.noUndefined<T['_input']>;
  typeName: ZodFirstPartyTypeKind.ZodDefault;
}
declare class ZodDefault<T extends ZodTypeAny> extends ZodType<
  util.noUndefined<T['_output']>,
  ZodDefaultDef<T>,
  T['_input'] | undefined
> {
  _parse(input: ParseInput): ParseReturnType<this['_output']>;
  removeDefault(): T;
  static create: <T_1 extends ZodTypeAny>(
    type: T_1,
    params: {
      errorMap?: ZodErrorMap | undefined;
      invalid_type_error?: string | undefined;
      required_error?: string | undefined;
      message?: string | undefined;
      description?: string | undefined;
    } & {
      default: T_1['_input'] | (() => util.noUndefined<T_1['_input']>);
    },
  ) => ZodDefault<T_1>;
}
interface ZodCatchDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
  innerType: T;
  catchValue: (ctx: { error: ZodError; input: unknown }) => T['_input'];
  typeName: ZodFirstPartyTypeKind.ZodCatch;
}
declare class ZodCatch<T extends ZodTypeAny> extends ZodType<T['_output'], ZodCatchDef<T>, unknown> {
  _parse(input: ParseInput): ParseReturnType<this['_output']>;
  removeCatch(): T;
  static create: <T_1 extends ZodTypeAny>(
    type: T_1,
    params: {
      errorMap?: ZodErrorMap | undefined;
      invalid_type_error?: string | undefined;
      required_error?: string | undefined;
      message?: string | undefined;
      description?: string | undefined;
    } & {
      catch: T_1['_output'] | (() => T_1['_output']);
    },
  ) => ZodCatch<T_1>;
}
interface ZodNaNDef extends ZodTypeDef {
  typeName: ZodFirstPartyTypeKind.ZodNaN;
}
declare class ZodNaN extends ZodType<number, ZodNaNDef, number> {
  _parse(input: ParseInput): ParseReturnType<any>;
  static create: (params?: RawCreateParams) => ZodNaN;
}
interface ZodBrandedDef<T extends ZodTypeAny> extends ZodTypeDef {
  type: T;
  typeName: ZodFirstPartyTypeKind.ZodBranded;
}
declare const BRAND: unique symbol;
declare type BRAND<T extends string | number | symbol> = {
  [BRAND]: {
    [k in T]: true;
  };
};
declare class ZodBranded<T extends ZodTypeAny, B extends string | number | symbol> extends ZodType<
  T['_output'] & BRAND<B>,
  ZodBrandedDef<T>,
  T['_input']
> {
  _parse(input: ParseInput): ParseReturnType<any>;
  unwrap(): T;
}
interface ZodPipelineDef<A extends ZodTypeAny, B extends ZodTypeAny> extends ZodTypeDef {
  in: A;
  out: B;
  typeName: ZodFirstPartyTypeKind.ZodPipeline;
}
declare class ZodPipeline<A extends ZodTypeAny, B extends ZodTypeAny> extends ZodType<
  B['_output'],
  ZodPipelineDef<A, B>,
  A['_input']
> {
  _parse(input: ParseInput): ParseReturnType<any>;
  static create<A extends ZodTypeAny, B extends ZodTypeAny>(a: A, b: B): ZodPipeline<A, B>;
}
declare type BuiltIn =
  | (((...args: any[]) => any) | (new (...args: any[]) => any))
  | {
      readonly [Symbol.toStringTag]: string;
    }
  | Date
  | Error
  | Generator
  | Promise<unknown>
  | RegExp;
declare type MakeReadonly<T> =
  T extends Map<infer K, infer V>
    ? ReadonlyMap<K, V>
    : T extends Set<infer V>
      ? ReadonlySet<V>
      : T extends [infer Head, ...infer Tail]
        ? readonly [Head, ...Tail]
        : T extends Array<infer V>
          ? ReadonlyArray<V>
          : T extends BuiltIn
            ? T
            : Readonly<T>;
interface ZodReadonlyDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
  innerType: T;
  typeName: ZodFirstPartyTypeKind.ZodReadonly;
}
declare class ZodReadonly<T extends ZodTypeAny> extends ZodType<
  MakeReadonly<T['_output']>,
  ZodReadonlyDef<T>,
  MakeReadonly<T['_input']>
> {
  _parse(input: ParseInput): ParseReturnType<this['_output']>;
  static create: <T_1 extends ZodTypeAny>(type: T_1, params?: RawCreateParams) => ZodReadonly<T_1>;
  unwrap(): T;
}
declare type CustomParams = CustomErrorParams & {
  fatal?: boolean;
};
declare function custom<T>(
  check?: (data: any) => any,
  params?: string | CustomParams | ((input: any) => CustomParams),
  /**
   * @deprecated
   *
   * Pass \`fatal\` into the params object instead:
   *
   * \`\`\`ts
   * z.string().custom((val) => val.length > 5, { fatal: false })
   * \`\`\`
   *
   */
  fatal?: boolean,
): ZodType<T, ZodTypeDef, T>;

declare const late: {
  object: <T extends ZodRawShape>(
    shape: () => T,
    params?: RawCreateParams,
  ) => ZodObject<
    T,
    'strip',
    ZodTypeAny,
    {
      [k in keyof objectUtil.addQuestionMarks<baseObjectOutputType<T>, any>]: objectUtil.addQuestionMarks<
        baseObjectOutputType<T>,
        any
      >[k];
    },
    { [k_1 in keyof baseObjectInputType<T>]: baseObjectInputType<T>[k_1] }
  >;
};
declare enum ZodFirstPartyTypeKind {
  ZodString = 'ZodString',
  ZodNumber = 'ZodNumber',
  ZodNaN = 'ZodNaN',
  ZodBigInt = 'ZodBigInt',
  ZodBoolean = 'ZodBoolean',
  ZodDate = 'ZodDate',
  ZodSymbol = 'ZodSymbol',
  ZodUndefined = 'ZodUndefined',
  ZodNull = 'ZodNull',
  ZodAny = 'ZodAny',
  ZodUnknown = 'ZodUnknown',
  ZodNever = 'ZodNever',
  ZodVoid = 'ZodVoid',
  ZodArray = 'ZodArray',
  ZodObject = 'ZodObject',
  ZodUnion = 'ZodUnion',
  ZodDiscriminatedUnion = 'ZodDiscriminatedUnion',
  ZodIntersection = 'ZodIntersection',
  ZodTuple = 'ZodTuple',
  ZodRecord = 'ZodRecord',
  ZodMap = 'ZodMap',
  ZodSet = 'ZodSet',
  ZodFunction = 'ZodFunction',
  ZodLazy = 'ZodLazy',
  ZodLiteral = 'ZodLiteral',
  ZodEnum = 'ZodEnum',
  ZodEffects = 'ZodEffects',
  ZodNativeEnum = 'ZodNativeEnum',
  ZodOptional = 'ZodOptional',
  ZodNullable = 'ZodNullable',
  ZodDefault = 'ZodDefault',
  ZodCatch = 'ZodCatch',
  ZodPromise = 'ZodPromise',
  ZodBranded = 'ZodBranded',
  ZodPipeline = 'ZodPipeline',
  ZodReadonly = 'ZodReadonly',
}
declare type ZodFirstPartySchemaTypes =
  | ZodString
  | ZodNumber
  | ZodNaN
  | ZodBigInt
  | ZodBoolean
  | ZodDate
  | ZodUndefined
  | ZodNull
  | ZodAny
  | ZodUnknown
  | ZodNever
  | ZodVoid
  | ZodArray<any, any>
  | ZodObject<any, any, any>
  | ZodUnion<any>
  | ZodDiscriminatedUnion<any, any>
  | ZodIntersection<any, any>
  | ZodTuple<any, any>
  | ZodRecord<any, any>
  | ZodMap<any>
  | ZodSet<any>
  | ZodFunction<any, any>
  | ZodLazy<any>
  | ZodLiteral<any>
  | ZodEnum<any>
  | ZodEffects<any, any, any>
  | ZodNativeEnum<any>
  | ZodOptional<any>
  | ZodNullable<any>
  | ZodDefault<any>
  | ZodCatch<any>
  | ZodPromise<any>
  | ZodBranded<any, any>
  | ZodPipeline<any, any>
  | ZodReadonly<any>
  | ZodSymbol;
declare abstract class Class {
  constructor(..._: any[]);
}
declare const instanceOfType: <T extends typeof Class>(
  cls: T,
  params?: CustomParams,
) => ZodType<InstanceType<T>, ZodTypeDef, InstanceType<T>>;
declare const stringType: (
  params?:
    | ({
        errorMap?: ZodErrorMap | undefined;
        invalid_type_error?: string | undefined;
        required_error?: string | undefined;
        message?: string | undefined;
        description?: string | undefined;
      } & {
        coerce?: true | undefined;
      })
    | undefined,
) => ZodString;
declare const numberType: (
  params?:
    | ({
        errorMap?: ZodErrorMap | undefined;
        invalid_type_error?: string | undefined;
        required_error?: string | undefined;
        message?: string | undefined;
        description?: string | undefined;
      } & {
        coerce?: boolean | undefined;
      })
    | undefined,
) => ZodNumber;
declare const nanType: (params?: RawCreateParams) => ZodNaN;
declare const bigIntType: (
  params?:
    | ({
        errorMap?: ZodErrorMap | undefined;
        invalid_type_error?: string | undefined;
        required_error?: string | undefined;
        message?: string | undefined;
        description?: string | undefined;
      } & {
        coerce?: boolean | undefined;
      })
    | undefined,
) => ZodBigInt;
declare const booleanType: (
  params?:
    | ({
        errorMap?: ZodErrorMap | undefined;
        invalid_type_error?: string | undefined;
        required_error?: string | undefined;
        message?: string | undefined;
        description?: string | undefined;
      } & {
        coerce?: boolean | undefined;
      })
    | undefined,
) => ZodBoolean;
declare const dateType: (
  params?:
    | ({
        errorMap?: ZodErrorMap | undefined;
        invalid_type_error?: string | undefined;
        required_error?: string | undefined;
        message?: string | undefined;
        description?: string | undefined;
      } & {
        coerce?: boolean | undefined;
      })
    | undefined,
) => ZodDate;
declare const symbolType: (params?: RawCreateParams) => ZodSymbol;
declare const undefinedType: (params?: RawCreateParams) => ZodUndefined;
declare const nullType: (params?: RawCreateParams) => ZodNull;
declare const anyType: (params?: RawCreateParams) => ZodAny;
declare const unknownType: (params?: RawCreateParams) => ZodUnknown;
declare const neverType: (params?: RawCreateParams) => ZodNever;
declare const voidType: (params?: RawCreateParams) => ZodVoid;
declare const arrayType: <T extends ZodTypeAny>(schema: T, params?: RawCreateParams) => ZodArray<T, 'many'>;
declare const objectType: <T extends ZodRawShape>(
  shape: T,
  params?: RawCreateParams,
) => ZodObject<
  T,
  'strip',
  ZodTypeAny,
  {
    [k in keyof objectUtil.addQuestionMarks<baseObjectOutputType<T>, any>]: objectUtil.addQuestionMarks<
      baseObjectOutputType<T>,
      any
    >[k];
  },
  { [k_1 in keyof baseObjectInputType<T>]: baseObjectInputType<T>[k_1] }
>;
declare const strictObjectType: <T extends ZodRawShape>(
  shape: T,
  params?: RawCreateParams,
) => ZodObject<
  T,
  'strict',
  ZodTypeAny,
  {
    [k in keyof objectUtil.addQuestionMarks<baseObjectOutputType<T>, any>]: objectUtil.addQuestionMarks<
      baseObjectOutputType<T>,
      any
    >[k];
  },
  { [k_1 in keyof baseObjectInputType<T>]: baseObjectInputType<T>[k_1] }
>;
declare const unionType: <T extends readonly [ZodTypeAny, ZodTypeAny, ...ZodTypeAny[]]>(
  types: T,
  params?: RawCreateParams,
) => ZodUnion<T>;
declare const discriminatedUnionType: typeof ZodDiscriminatedUnion.create;
declare const intersectionType: <T extends ZodTypeAny, U extends ZodTypeAny>(
  left: T,
  right: U,
  params?: RawCreateParams,
) => ZodIntersection<T, U>;
declare const tupleType: <T extends [] | [ZodTypeAny, ...ZodTypeAny[]]>(
  schemas: T,
  params?: RawCreateParams,
) => ZodTuple<T, null>;
declare const recordType: typeof ZodRecord.create;
declare const mapType: <Key extends ZodTypeAny = ZodTypeAny, Value extends ZodTypeAny = ZodTypeAny>(
  keyType: Key,
  valueType: Value,
  params?: RawCreateParams,
) => ZodMap<Key, Value>;
declare const setType: <Value extends ZodTypeAny = ZodTypeAny>(
  valueType: Value,
  params?: RawCreateParams,
) => ZodSet<Value>;
declare const functionType: typeof ZodFunction.create;
declare const lazyType: <T extends ZodTypeAny>(getter: () => T, params?: RawCreateParams) => ZodLazy<T>;
declare const literalType: <T extends Primitive>(value: T, params?: RawCreateParams) => ZodLiteral<T>;
declare const enumType: typeof createZodEnum;
declare const nativeEnumType: <T extends EnumLike>(values: T, params?: RawCreateParams) => ZodNativeEnum<T>;
declare const promiseType: <T extends ZodTypeAny>(schema: T, params?: RawCreateParams) => ZodPromise<T>;
declare const effectsType: <I extends ZodTypeAny>(
  schema: I,
  effect: Effect<I['_output']>,
  params?: RawCreateParams,
) => ZodEffects<I, I['_output'], input<I>>;
declare const optionalType: <T extends ZodTypeAny>(type: T, params?: RawCreateParams) => ZodOptional<T>;
declare const nullableType: <T extends ZodTypeAny>(type: T, params?: RawCreateParams) => ZodNullable<T>;
declare const preprocessType: <I extends ZodTypeAny>(
  preprocess: (arg: unknown, ctx: RefinementCtx) => unknown,
  schema: I,
  params?: RawCreateParams,
) => ZodEffects<I, I['_output'], unknown>;
declare const pipelineType: typeof ZodPipeline.create;
declare const ostring: () => ZodOptional<ZodString>;
declare const onumber: () => ZodOptional<ZodNumber>;
declare const oboolean: () => ZodOptional<ZodBoolean>;
declare const coerce: {
  string: (
    params?:
      | ({
          errorMap?: ZodErrorMap | undefined;
          invalid_type_error?: string | undefined;
          required_error?: string | undefined;
          message?: string | undefined;
          description?: string | undefined;
        } & {
          coerce?: true | undefined;
        })
      | undefined,
  ) => ZodString;
  number: (
    params?:
      | ({
          errorMap?: ZodErrorMap | undefined;
          invalid_type_error?: string | undefined;
          required_error?: string | undefined;
          message?: string | undefined;
          description?: string | undefined;
        } & {
          coerce?: boolean | undefined;
        })
      | undefined,
  ) => ZodNumber;
  boolean: (
    params?:
      | ({
          errorMap?: ZodErrorMap | undefined;
          invalid_type_error?: string | undefined;
          required_error?: string | undefined;
          message?: string | undefined;
          description?: string | undefined;
        } & {
          coerce?: boolean | undefined;
        })
      | undefined,
  ) => ZodBoolean;
  bigint: (
    params?:
      | ({
          errorMap?: ZodErrorMap | undefined;
          invalid_type_error?: string | undefined;
          required_error?: string | undefined;
          message?: string | undefined;
          description?: string | undefined;
        } & {
          coerce?: boolean | undefined;
        })
      | undefined,
  ) => ZodBigInt;
  date: (
    params?:
      | ({
          errorMap?: ZodErrorMap | undefined;
          invalid_type_error?: string | undefined;
          required_error?: string | undefined;
          message?: string | undefined;
          description?: string | undefined;
        } & {
          coerce?: boolean | undefined;
        })
      | undefined,
  ) => ZodDate;
};

declare const NEVER: never;

//# sourceMappingURL=external.d.ts.map

declare const z_setErrorMap: typeof setErrorMap;
declare const z_getErrorMap: typeof getErrorMap;
declare const z_makeIssue: typeof makeIssue;
type z_ParseParams = ParseParams;
type z_ParsePathComponent = ParsePathComponent;
type z_ParsePath = ParsePath;
declare const z_EMPTY_PATH: typeof EMPTY_PATH;
type z_ParseContext = ParseContext;
type z_ParseInput = ParseInput;
declare const z_addIssueToContext: typeof addIssueToContext;
type z_ObjectPair = ObjectPair;
type z_ParseStatus = ParseStatus;
declare const z_ParseStatus: typeof ParseStatus;
type z_ParseResult = ParseResult;
declare const z_INVALID: typeof INVALID;
declare const z_DIRTY: typeof DIRTY;
declare const z_OK: typeof OK;
type z_SyncParseReturnType<T = any> = SyncParseReturnType<T>;
type z_AsyncParseReturnType<T> = AsyncParseReturnType<T>;
type z_ParseReturnType<T> = ParseReturnType<T>;
declare const z_isAborted: typeof isAborted;
declare const z_isDirty: typeof isDirty;
declare const z_isValid: typeof isValid;
declare const z_isAsync: typeof isAsync;
type z_Primitive = Primitive;
type z_Scalars = Scalars;
declare const z_util: typeof util;
declare const z_objectUtil: typeof objectUtil;
type z_ZodParsedType = ZodParsedType;
declare const z_getParsedType: typeof getParsedType;
declare const z_oboolean: typeof oboolean;
declare const z_onumber: typeof onumber;
declare const z_ostring: typeof ostring;
type z_RefinementCtx = RefinementCtx;
type z_ZodRawShape = ZodRawShape;
type z_ZodTypeAny = ZodTypeAny;
type z_TypeOf<T extends ZodType<any, any, any>> = TypeOf<T>;
type z_input<T extends ZodType<any, any, any>> = input<T>;
type z_output<T extends ZodType<any, any, any>> = output<T>;
type z_CustomErrorParams = CustomErrorParams;
type z_ZodTypeDef = ZodTypeDef;
type z_RawCreateParams = RawCreateParams;
type z_ProcessedCreateParams = ProcessedCreateParams;
type z_SafeParseSuccess<Output> = SafeParseSuccess<Output>;
type z_SafeParseError<Input> = SafeParseError<Input>;
type z_SafeParseReturnType<Input, Output> = SafeParseReturnType<Input, Output>;
type z_ZodType<Output = any, Def extends ZodTypeDef = ZodTypeDef, Input = Output> = ZodType<Output, Def, Input>;
declare const z_ZodType: typeof ZodType;
type z_IpVersion = IpVersion;
type z_ZodStringCheck = ZodStringCheck;
type z_ZodStringDef = ZodStringDef;
declare const z_datetimeRegex: typeof datetimeRegex;
type z_ZodString = ZodString;
declare const z_ZodString: typeof ZodString;
type z_ZodNumberCheck = ZodNumberCheck;
type z_ZodNumberDef = ZodNumberDef;
type z_ZodNumber = ZodNumber;
declare const z_ZodNumber: typeof ZodNumber;
type z_ZodBigIntCheck = ZodBigIntCheck;
type z_ZodBigIntDef = ZodBigIntDef;
type z_ZodBigInt = ZodBigInt;
declare const z_ZodBigInt: typeof ZodBigInt;
type z_ZodBooleanDef = ZodBooleanDef;
type z_ZodBoolean = ZodBoolean;
declare const z_ZodBoolean: typeof ZodBoolean;
type z_ZodDateCheck = ZodDateCheck;
type z_ZodDateDef = ZodDateDef;
type z_ZodDate = ZodDate;
declare const z_ZodDate: typeof ZodDate;
type z_ZodSymbolDef = ZodSymbolDef;
type z_ZodSymbol = ZodSymbol;
declare const z_ZodSymbol: typeof ZodSymbol;
type z_ZodUndefinedDef = ZodUndefinedDef;
type z_ZodUndefined = ZodUndefined;
declare const z_ZodUndefined: typeof ZodUndefined;
type z_ZodNullDef = ZodNullDef;
type z_ZodNull = ZodNull;
declare const z_ZodNull: typeof ZodNull;
type z_ZodAnyDef = ZodAnyDef;
type z_ZodAny = ZodAny;
declare const z_ZodAny: typeof ZodAny;
type z_ZodUnknownDef = ZodUnknownDef;
type z_ZodUnknown = ZodUnknown;
declare const z_ZodUnknown: typeof ZodUnknown;
type z_ZodNeverDef = ZodNeverDef;
type z_ZodNever = ZodNever;
declare const z_ZodNever: typeof ZodNever;
type z_ZodVoidDef = ZodVoidDef;
type z_ZodVoid = ZodVoid;
declare const z_ZodVoid: typeof ZodVoid;
type z_ZodArrayDef<T extends ZodTypeAny = ZodTypeAny> = ZodArrayDef<T>;
type z_ArrayCardinality = ArrayCardinality;
type z_arrayOutputType<T extends ZodTypeAny, Cardinality extends ArrayCardinality = 'many'> = arrayOutputType<
  T,
  Cardinality
>;
type z_ZodArray<T extends ZodTypeAny, Cardinality extends ArrayCardinality = 'many'> = ZodArray<T, Cardinality>;
declare const z_ZodArray: typeof ZodArray;
type z_ZodNonEmptyArray<T extends ZodTypeAny> = ZodNonEmptyArray<T>;
type z_UnknownKeysParam = UnknownKeysParam;
type z_ZodObjectDef<
  T extends ZodRawShape = ZodRawShape,
  UnknownKeys extends UnknownKeysParam = UnknownKeysParam,
  Catchall extends ZodTypeAny = ZodTypeAny,
> = ZodObjectDef<T, UnknownKeys, Catchall>;
type z_mergeTypes<A, B> = mergeTypes<A, B>;
type z_objectOutputType<
  Shape extends ZodRawShape,
  Catchall extends ZodTypeAny,
  UnknownKeys extends UnknownKeysParam = UnknownKeysParam,
> = objectOutputType<Shape, Catchall, UnknownKeys>;
type z_baseObjectOutputType<Shape extends ZodRawShape> = baseObjectOutputType<Shape>;
type z_objectInputType<
  Shape extends ZodRawShape,
  Catchall extends ZodTypeAny,
  UnknownKeys extends UnknownKeysParam = UnknownKeysParam,
> = objectInputType<Shape, Catchall, UnknownKeys>;
type z_baseObjectInputType<Shape extends ZodRawShape> = baseObjectInputType<Shape>;
type z_CatchallOutput<T extends ZodType> = CatchallOutput<T>;
type z_CatchallInput<T extends ZodType> = CatchallInput<T>;
type z_PassthroughType<T extends UnknownKeysParam> = PassthroughType<T>;
type z_deoptional<T extends ZodTypeAny> = deoptional<T>;
type z_SomeZodObject = SomeZodObject;
type z_noUnrecognized<Obj extends object, Shape extends object> = noUnrecognized<Obj, Shape>;
type z_ZodObject<
  T extends ZodRawShape,
  UnknownKeys extends UnknownKeysParam = UnknownKeysParam,
  Catchall extends ZodTypeAny = ZodTypeAny,
  Output = objectOutputType<T, Catchall, UnknownKeys>,
  Input = objectInputType<T, Catchall, UnknownKeys>,
> = ZodObject<T, UnknownKeys, Catchall, Output, Input>;
declare const z_ZodObject: typeof ZodObject;
type z_AnyZodObject = AnyZodObject;
type z_ZodUnionOptions = ZodUnionOptions;
type z_ZodUnionDef<T extends ZodUnionOptions = Readonly<[ZodTypeAny, ZodTypeAny, ...ZodTypeAny[]]>> = ZodUnionDef<T>;
type z_ZodUnion<T extends ZodUnionOptions> = ZodUnion<T>;
declare const z_ZodUnion: typeof ZodUnion;
type z_ZodDiscriminatedUnionOption<Discriminator extends string> = ZodDiscriminatedUnionOption<Discriminator>;
type z_ZodDiscriminatedUnionDef<
  Discriminator extends string,
  Options extends ZodDiscriminatedUnionOption<string>[] = ZodDiscriminatedUnionOption<string>[],
> = ZodDiscriminatedUnionDef<Discriminator, Options>;
type z_ZodDiscriminatedUnion<
  Discriminator extends string,
  Options extends ZodDiscriminatedUnionOption<Discriminator>[],
> = ZodDiscriminatedUnion<Discriminator, Options>;
declare const z_ZodDiscriminatedUnion: typeof ZodDiscriminatedUnion;
type z_ZodIntersectionDef<T extends ZodTypeAny = ZodTypeAny, U extends ZodTypeAny = ZodTypeAny> = ZodIntersectionDef<
  T,
  U
>;
type z_ZodIntersection<T extends ZodTypeAny, U extends ZodTypeAny> = ZodIntersection<T, U>;
declare const z_ZodIntersection: typeof ZodIntersection;
type z_ZodTupleItems = ZodTupleItems;
type z_AssertArray<T> = AssertArray<T>;
type z_OutputTypeOfTuple<T extends ZodTupleItems | []> = OutputTypeOfTuple<T>;
type z_OutputTypeOfTupleWithRest<
  T extends ZodTupleItems | [],
  Rest extends ZodTypeAny | null = null,
> = OutputTypeOfTupleWithRest<T, Rest>;
type z_InputTypeOfTuple<T extends ZodTupleItems | []> = InputTypeOfTuple<T>;
type z_InputTypeOfTupleWithRest<
  T extends ZodTupleItems | [],
  Rest extends ZodTypeAny | null = null,
> = InputTypeOfTupleWithRest<T, Rest>;
type z_ZodTupleDef<T extends ZodTupleItems | [] = ZodTupleItems, Rest extends ZodTypeAny | null = null> = ZodTupleDef<
  T,
  Rest
>;
type z_AnyZodTuple = AnyZodTuple;
type z_ZodTuple<
  T extends [ZodTypeAny, ...ZodTypeAny[]] | [] = [ZodTypeAny, ...ZodTypeAny[]],
  Rest extends ZodTypeAny | null = null,
> = ZodTuple<T, Rest>;
declare const z_ZodTuple: typeof ZodTuple;
type z_ZodRecordDef<Key extends KeySchema = ZodString, Value extends ZodTypeAny = ZodTypeAny> = ZodRecordDef<
  Key,
  Value
>;
type z_KeySchema = KeySchema;
type z_RecordType<K extends string | number | symbol, V> = RecordType<K, V>;
type z_ZodRecord<Key extends KeySchema = ZodString, Value extends ZodTypeAny = ZodTypeAny> = ZodRecord<Key, Value>;
declare const z_ZodRecord: typeof ZodRecord;
type z_ZodMapDef<Key extends ZodTypeAny = ZodTypeAny, Value extends ZodTypeAny = ZodTypeAny> = ZodMapDef<Key, Value>;
type z_ZodMap<Key extends ZodTypeAny = ZodTypeAny, Value extends ZodTypeAny = ZodTypeAny> = ZodMap<Key, Value>;
declare const z_ZodMap: typeof ZodMap;
type z_ZodSetDef<Value extends ZodTypeAny = ZodTypeAny> = ZodSetDef<Value>;
type z_ZodSet<Value extends ZodTypeAny = ZodTypeAny> = ZodSet<Value>;
declare const z_ZodSet: typeof ZodSet;
type z_ZodFunctionDef<
  Args extends ZodTuple<any, any> = ZodTuple<any, any>,
  Returns extends ZodTypeAny = ZodTypeAny,
> = ZodFunctionDef<Args, Returns>;
type z_OuterTypeOfFunction<Args extends ZodTuple<any, any>, Returns extends ZodTypeAny> = OuterTypeOfFunction<
  Args,
  Returns
>;
type z_InnerTypeOfFunction<Args extends ZodTuple<any, any>, Returns extends ZodTypeAny> = InnerTypeOfFunction<
  Args,
  Returns
>;
type z_ZodFunction<Args extends ZodTuple<any, any>, Returns extends ZodTypeAny> = ZodFunction<Args, Returns>;
declare const z_ZodFunction: typeof ZodFunction;
type z_ZodLazyDef<T extends ZodTypeAny = ZodTypeAny> = ZodLazyDef<T>;
type z_ZodLazy<T extends ZodTypeAny> = ZodLazy<T>;
declare const z_ZodLazy: typeof ZodLazy;
type z_ZodLiteralDef<T = any> = ZodLiteralDef<T>;
type z_ZodLiteral<T> = ZodLiteral<T>;
declare const z_ZodLiteral: typeof ZodLiteral;
type z_ArrayKeys = ArrayKeys;
type z_Indices<T> = Indices<T>;
type z_EnumValues<T extends string = string> = EnumValues<T>;
type z_Values<T extends EnumValues> = Values<T>;
type z_ZodEnumDef<T extends EnumValues = EnumValues> = ZodEnumDef<T>;
type z_Writeable<T> = Writeable<T>;
type z_FilterEnum<Values, ToExclude> = FilterEnum<Values, ToExclude>;
type z_typecast<A, T> = typecast<A, T>;
type z_ZodEnum<T extends [string, ...string[]]> = ZodEnum<T>;
declare const z_ZodEnum: typeof ZodEnum;
type z_ZodNativeEnumDef<T extends EnumLike = EnumLike> = ZodNativeEnumDef<T>;
type z_EnumLike = EnumLike;
type z_ZodNativeEnum<T extends EnumLike> = ZodNativeEnum<T>;
declare const z_ZodNativeEnum: typeof ZodNativeEnum;
type z_ZodPromiseDef<T extends ZodTypeAny = ZodTypeAny> = ZodPromiseDef<T>;
type z_ZodPromise<T extends ZodTypeAny> = ZodPromise<T>;
declare const z_ZodPromise: typeof ZodPromise;
type z_Refinement<T> = Refinement<T>;
type z_SuperRefinement<T> = SuperRefinement<T>;
type z_RefinementEffect<T> = RefinementEffect<T>;
type z_TransformEffect<T> = TransformEffect<T>;
type z_PreprocessEffect<T> = PreprocessEffect<T>;
type z_Effect<T> = Effect<T>;
type z_ZodEffectsDef<T extends ZodTypeAny = ZodTypeAny> = ZodEffectsDef<T>;
type z_ZodEffects<T extends ZodTypeAny, Output = output<T>, Input = input<T>> = ZodEffects<T, Output, Input>;
declare const z_ZodEffects: typeof ZodEffects;
type z_ZodOptionalDef<T extends ZodTypeAny = ZodTypeAny> = ZodOptionalDef<T>;
type z_ZodOptionalType<T extends ZodTypeAny> = ZodOptionalType<T>;
type z_ZodOptional<T extends ZodTypeAny> = ZodOptional<T>;
declare const z_ZodOptional: typeof ZodOptional;
type z_ZodNullableDef<T extends ZodTypeAny = ZodTypeAny> = ZodNullableDef<T>;
type z_ZodNullableType<T extends ZodTypeAny> = ZodNullableType<T>;
type z_ZodNullable<T extends ZodTypeAny> = ZodNullable<T>;
declare const z_ZodNullable: typeof ZodNullable;
type z_ZodDefaultDef<T extends ZodTypeAny = ZodTypeAny> = ZodDefaultDef<T>;
type z_ZodDefault<T extends ZodTypeAny> = ZodDefault<T>;
declare const z_ZodDefault: typeof ZodDefault;
type z_ZodCatchDef<T extends ZodTypeAny = ZodTypeAny> = ZodCatchDef<T>;
type z_ZodCatch<T extends ZodTypeAny> = ZodCatch<T>;
declare const z_ZodCatch: typeof ZodCatch;
type z_ZodNaNDef = ZodNaNDef;
type z_ZodNaN = ZodNaN;
declare const z_ZodNaN: typeof ZodNaN;
type z_ZodBrandedDef<T extends ZodTypeAny> = ZodBrandedDef<T>;
type z_BRAND<T extends string | number | symbol> = BRAND<T>;
type z_ZodBranded<T extends ZodTypeAny, B extends string | number | symbol> = ZodBranded<T, B>;
declare const z_ZodBranded: typeof ZodBranded;
type z_ZodPipelineDef<A extends ZodTypeAny, B extends ZodTypeAny> = ZodPipelineDef<A, B>;
type z_ZodPipeline<A extends ZodTypeAny, B extends ZodTypeAny> = ZodPipeline<A, B>;
declare const z_ZodPipeline: typeof ZodPipeline;
type z_ZodReadonlyDef<T extends ZodTypeAny = ZodTypeAny> = ZodReadonlyDef<T>;
type z_ZodReadonly<T extends ZodTypeAny> = ZodReadonly<T>;
declare const z_ZodReadonly: typeof ZodReadonly;
declare const z_custom: typeof custom;
declare const z_late: typeof late;
type z_ZodFirstPartyTypeKind = ZodFirstPartyTypeKind;
declare const z_ZodFirstPartyTypeKind: typeof ZodFirstPartyTypeKind;
type z_ZodFirstPartySchemaTypes = ZodFirstPartySchemaTypes;
declare const z_coerce: typeof coerce;
declare const z_NEVER: typeof NEVER;
type z_inferFlattenedErrors<T extends ZodType<any, any, any>, U = string> = inferFlattenedErrors<T, U>;
type z_typeToFlattenedError<T, U = string> = typeToFlattenedError<T, U>;
type z_ZodIssueCode = ZodIssueCode;
type z_ZodIssueBase = ZodIssueBase;
type z_ZodInvalidTypeIssue = ZodInvalidTypeIssue;
type z_ZodInvalidLiteralIssue = ZodInvalidLiteralIssue;
type z_ZodUnrecognizedKeysIssue = ZodUnrecognizedKeysIssue;
type z_ZodInvalidUnionIssue = ZodInvalidUnionIssue;
type z_ZodInvalidUnionDiscriminatorIssue = ZodInvalidUnionDiscriminatorIssue;
type z_ZodInvalidEnumValueIssue = ZodInvalidEnumValueIssue;
type z_ZodInvalidArgumentsIssue = ZodInvalidArgumentsIssue;
type z_ZodInvalidReturnTypeIssue = ZodInvalidReturnTypeIssue;
type z_ZodInvalidDateIssue = ZodInvalidDateIssue;
type z_StringValidation = StringValidation;
type z_ZodInvalidStringIssue = ZodInvalidStringIssue;
type z_ZodTooSmallIssue = ZodTooSmallIssue;
type z_ZodTooBigIssue = ZodTooBigIssue;
type z_ZodInvalidIntersectionTypesIssue = ZodInvalidIntersectionTypesIssue;
type z_ZodNotMultipleOfIssue = ZodNotMultipleOfIssue;
type z_ZodNotFiniteIssue = ZodNotFiniteIssue;
type z_ZodCustomIssue = ZodCustomIssue;
type z_DenormalizedError = DenormalizedError;
type z_ZodIssueOptionalMessage = ZodIssueOptionalMessage;
type z_ZodIssue = ZodIssue;
declare const z_quotelessJson: typeof quotelessJson;
type z_ZodFormattedError<T, U = string> = ZodFormattedError<T, U>;
type z_inferFormattedError<T extends ZodType<any, any, any>, U = string> = inferFormattedError<T, U>;
type z_ZodError<T = any> = ZodError<T>;
declare const z_ZodError: typeof ZodError;
type z_IssueData = IssueData;
type z_ErrorMapCtx = ErrorMapCtx;
type z_ZodErrorMap = ZodErrorMap;
declare namespace z {
  export {
    errorMap as defaultErrorMap,
    z_setErrorMap as setErrorMap,
    z_getErrorMap as getErrorMap,
    z_makeIssue as makeIssue,
    type z_ParseParams as ParseParams,
    type z_ParsePathComponent as ParsePathComponent,
    type z_ParsePath as ParsePath,
    z_EMPTY_PATH as EMPTY_PATH,
    type z_ParseContext as ParseContext,
    type z_ParseInput as ParseInput,
    z_addIssueToContext as addIssueToContext,
    type z_ObjectPair as ObjectPair,
    z_ParseStatus as ParseStatus,
    type z_ParseResult as ParseResult,
    z_INVALID as INVALID,
    z_DIRTY as DIRTY,
    z_OK as OK,
    type z_SyncParseReturnType as SyncParseReturnType,
    type z_AsyncParseReturnType as AsyncParseReturnType,
    type z_ParseReturnType as ParseReturnType,
    z_isAborted as isAborted,
    z_isDirty as isDirty,
    z_isValid as isValid,
    z_isAsync as isAsync,
    type z_Primitive as Primitive,
    type z_Scalars as Scalars,
    z_util as util,
    z_objectUtil as objectUtil,
    type z_ZodParsedType as ZodParsedType,
    z_getParsedType as getParsedType,
    type TypeOf as infer,
    ZodEffects as ZodTransformer,
    ZodType as Schema,
    ZodType as ZodSchema,
    anyType as any,
    arrayType as array,
    bigIntType as bigint,
    booleanType as boolean,
    dateType as date,
    discriminatedUnionType as discriminatedUnion,
    effectsType as effect,
    enumType as enum,
    functionType as function,
    instanceOfType as instanceof,
    intersectionType as intersection,
    lazyType as lazy,
    literalType as literal,
    mapType as map,
    nanType as nan,
    nativeEnumType as nativeEnum,
    neverType as never,
    nullType as null,
    nullableType as nullable,
    numberType as number,
    objectType as object,
    z_oboolean as oboolean,
    z_onumber as onumber,
    optionalType as optional,
    z_ostring as ostring,
    pipelineType as pipeline,
    preprocessType as preprocess,
    promiseType as promise,
    recordType as record,
    setType as set,
    strictObjectType as strictObject,
    stringType as string,
    symbolType as symbol,
    effectsType as transformer,
    tupleType as tuple,
    undefinedType as undefined,
    unionType as union,
    unknownType as unknown,
    voidType as void,
    type z_RefinementCtx as RefinementCtx,
    type z_ZodRawShape as ZodRawShape,
    type z_ZodTypeAny as ZodTypeAny,
    type z_TypeOf as TypeOf,
    type z_input as input,
    type z_output as output,
    type z_CustomErrorParams as CustomErrorParams,
    type z_ZodTypeDef as ZodTypeDef,
    type z_RawCreateParams as RawCreateParams,
    type z_ProcessedCreateParams as ProcessedCreateParams,
    type z_SafeParseSuccess as SafeParseSuccess,
    type z_SafeParseError as SafeParseError,
    type z_SafeParseReturnType as SafeParseReturnType,
    z_ZodType as ZodType,
    type z_IpVersion as IpVersion,
    type z_ZodStringCheck as ZodStringCheck,
    type z_ZodStringDef as ZodStringDef,
    z_datetimeRegex as datetimeRegex,
    z_ZodString as ZodString,
    type z_ZodNumberCheck as ZodNumberCheck,
    type z_ZodNumberDef as ZodNumberDef,
    z_ZodNumber as ZodNumber,
    type z_ZodBigIntCheck as ZodBigIntCheck,
    type z_ZodBigIntDef as ZodBigIntDef,
    z_ZodBigInt as ZodBigInt,
    type z_ZodBooleanDef as ZodBooleanDef,
    z_ZodBoolean as ZodBoolean,
    type z_ZodDateCheck as ZodDateCheck,
    type z_ZodDateDef as ZodDateDef,
    z_ZodDate as ZodDate,
    type z_ZodSymbolDef as ZodSymbolDef,
    z_ZodSymbol as ZodSymbol,
    type z_ZodUndefinedDef as ZodUndefinedDef,
    z_ZodUndefined as ZodUndefined,
    type z_ZodNullDef as ZodNullDef,
    z_ZodNull as ZodNull,
    type z_ZodAnyDef as ZodAnyDef,
    z_ZodAny as ZodAny,
    type z_ZodUnknownDef as ZodUnknownDef,
    z_ZodUnknown as ZodUnknown,
    type z_ZodNeverDef as ZodNeverDef,
    z_ZodNever as ZodNever,
    type z_ZodVoidDef as ZodVoidDef,
    z_ZodVoid as ZodVoid,
    type z_ZodArrayDef as ZodArrayDef,
    type z_ArrayCardinality as ArrayCardinality,
    type z_arrayOutputType as arrayOutputType,
    z_ZodArray as ZodArray,
    type z_ZodNonEmptyArray as ZodNonEmptyArray,
    type z_UnknownKeysParam as UnknownKeysParam,
    type z_ZodObjectDef as ZodObjectDef,
    type z_mergeTypes as mergeTypes,
    type z_objectOutputType as objectOutputType,
    type z_baseObjectOutputType as baseObjectOutputType,
    type z_objectInputType as objectInputType,
    type z_baseObjectInputType as baseObjectInputType,
    type z_CatchallOutput as CatchallOutput,
    type z_CatchallInput as CatchallInput,
    type z_PassthroughType as PassthroughType,
    type z_deoptional as deoptional,
    type z_SomeZodObject as SomeZodObject,
    type z_noUnrecognized as noUnrecognized,
    z_ZodObject as ZodObject,
    type z_AnyZodObject as AnyZodObject,
    type z_ZodUnionOptions as ZodUnionOptions,
    type z_ZodUnionDef as ZodUnionDef,
    z_ZodUnion as ZodUnion,
    type z_ZodDiscriminatedUnionOption as ZodDiscriminatedUnionOption,
    type z_ZodDiscriminatedUnionDef as ZodDiscriminatedUnionDef,
    z_ZodDiscriminatedUnion as ZodDiscriminatedUnion,
    type z_ZodIntersectionDef as ZodIntersectionDef,
    z_ZodIntersection as ZodIntersection,
    type z_ZodTupleItems as ZodTupleItems,
    type z_AssertArray as AssertArray,
    type z_OutputTypeOfTuple as OutputTypeOfTuple,
    type z_OutputTypeOfTupleWithRest as OutputTypeOfTupleWithRest,
    type z_InputTypeOfTuple as InputTypeOfTuple,
    type z_InputTypeOfTupleWithRest as InputTypeOfTupleWithRest,
    type z_ZodTupleDef as ZodTupleDef,
    type z_AnyZodTuple as AnyZodTuple,
    z_ZodTuple as ZodTuple,
    type z_ZodRecordDef as ZodRecordDef,
    type z_KeySchema as KeySchema,
    type z_RecordType as RecordType,
    z_ZodRecord as ZodRecord,
    type z_ZodMapDef as ZodMapDef,
    z_ZodMap as ZodMap,
    type z_ZodSetDef as ZodSetDef,
    z_ZodSet as ZodSet,
    type z_ZodFunctionDef as ZodFunctionDef,
    type z_OuterTypeOfFunction as OuterTypeOfFunction,
    type z_InnerTypeOfFunction as InnerTypeOfFunction,
    z_ZodFunction as ZodFunction,
    type z_ZodLazyDef as ZodLazyDef,
    z_ZodLazy as ZodLazy,
    type z_ZodLiteralDef as ZodLiteralDef,
    z_ZodLiteral as ZodLiteral,
    type z_ArrayKeys as ArrayKeys,
    type z_Indices as Indices,
    type z_EnumValues as EnumValues,
    type z_Values as Values,
    type z_ZodEnumDef as ZodEnumDef,
    type z_Writeable as Writeable,
    type z_FilterEnum as FilterEnum,
    type z_typecast as typecast,
    z_ZodEnum as ZodEnum,
    type z_ZodNativeEnumDef as ZodNativeEnumDef,
    type z_EnumLike as EnumLike,
    z_ZodNativeEnum as ZodNativeEnum,
    type z_ZodPromiseDef as ZodPromiseDef,
    z_ZodPromise as ZodPromise,
    type z_Refinement as Refinement,
    type z_SuperRefinement as SuperRefinement,
    type z_RefinementEffect as RefinementEffect,
    type z_TransformEffect as TransformEffect,
    type z_PreprocessEffect as PreprocessEffect,
    type z_Effect as Effect,
    type z_ZodEffectsDef as ZodEffectsDef,
    z_ZodEffects as ZodEffects,
    type z_ZodOptionalDef as ZodOptionalDef,
    type z_ZodOptionalType as ZodOptionalType,
    z_ZodOptional as ZodOptional,
    type z_ZodNullableDef as ZodNullableDef,
    type z_ZodNullableType as ZodNullableType,
    z_ZodNullable as ZodNullable,
    type z_ZodDefaultDef as ZodDefaultDef,
    z_ZodDefault as ZodDefault,
    type z_ZodCatchDef as ZodCatchDef,
    z_ZodCatch as ZodCatch,
    type z_ZodNaNDef as ZodNaNDef,
    z_ZodNaN as ZodNaN,
    type z_ZodBrandedDef as ZodBrandedDef,
    type z_BRAND as BRAND,
    z_ZodBranded as ZodBranded,
    type z_ZodPipelineDef as ZodPipelineDef,
    z_ZodPipeline as ZodPipeline,
    type z_ZodReadonlyDef as ZodReadonlyDef,
    z_ZodReadonly as ZodReadonly,
    z_custom as custom,
    z_late as late,
    z_ZodFirstPartyTypeKind as ZodFirstPartyTypeKind,
    type z_ZodFirstPartySchemaTypes as ZodFirstPartySchemaTypes,
    z_coerce as coerce,
    z_NEVER as NEVER,
    type z_inferFlattenedErrors as inferFlattenedErrors,
    type z_typeToFlattenedError as typeToFlattenedError,
    type z_ZodIssueCode as ZodIssueCode,
    type z_ZodIssueBase as ZodIssueBase,
    type z_ZodInvalidTypeIssue as ZodInvalidTypeIssue,
    type z_ZodInvalidLiteralIssue as ZodInvalidLiteralIssue,
    type z_ZodUnrecognizedKeysIssue as ZodUnrecognizedKeysIssue,
    type z_ZodInvalidUnionIssue as ZodInvalidUnionIssue,
    type z_ZodInvalidUnionDiscriminatorIssue as ZodInvalidUnionDiscriminatorIssue,
    type z_ZodInvalidEnumValueIssue as ZodInvalidEnumValueIssue,
    type z_ZodInvalidArgumentsIssue as ZodInvalidArgumentsIssue,
    type z_ZodInvalidReturnTypeIssue as ZodInvalidReturnTypeIssue,
    type z_ZodInvalidDateIssue as ZodInvalidDateIssue,
    type z_StringValidation as StringValidation,
    type z_ZodInvalidStringIssue as ZodInvalidStringIssue,
    type z_ZodTooSmallIssue as ZodTooSmallIssue,
    type z_ZodTooBigIssue as ZodTooBigIssue,
    type z_ZodInvalidIntersectionTypesIssue as ZodInvalidIntersectionTypesIssue,
    type z_ZodNotMultipleOfIssue as ZodNotMultipleOfIssue,
    type z_ZodNotFiniteIssue as ZodNotFiniteIssue,
    type z_ZodCustomIssue as ZodCustomIssue,
    type z_DenormalizedError as DenormalizedError,
    type z_ZodIssueOptionalMessage as ZodIssueOptionalMessage,
    type z_ZodIssue as ZodIssue,
    z_quotelessJson as quotelessJson,
    type z_ZodFormattedError as ZodFormattedError,
    type z_inferFormattedError as inferFormattedError,
    z_ZodError as ZodError,
    type z_IssueData as IssueData,
    type z_ErrorMapCtx as ErrorMapCtx,
    type z_ZodErrorMap as ZodErrorMap,
  };
}

//# sourceMappingURL=index.d.ts.map

export {
  type AnyZodObject,
  type AnyZodTuple,
  type ArrayCardinality,
  type ArrayKeys,
  type AssertArray,
  type AsyncParseReturnType,
  BRAND,
  type CatchallInput,
  type CatchallOutput,
  type CustomErrorParams,
  DIRTY,
  type DenormalizedError,
  EMPTY_PATH,
  type Effect,
  type EnumLike,
  type EnumValues,
  type ErrorMapCtx,
  type FilterEnum,
  INVALID,
  type Indices,
  type InnerTypeOfFunction,
  type InputTypeOfTuple,
  type InputTypeOfTupleWithRest,
  type IpVersion,
  type IssueData,
  type KeySchema,
  NEVER,
  OK,
  type ObjectPair,
  type OuterTypeOfFunction,
  type OutputTypeOfTuple,
  type OutputTypeOfTupleWithRest,
  type ParseContext,
  type ParseInput,
  type ParseParams,
  type ParsePath,
  type ParsePathComponent,
  type ParseResult,
  type ParseReturnType,
  ParseStatus,
  type PassthroughType,
  type PreprocessEffect,
  type Primitive,
  type ProcessedCreateParams,
  type RawCreateParams,
  type RecordType,
  type Refinement,
  type RefinementCtx,
  type RefinementEffect,
  type SafeParseError,
  type SafeParseReturnType,
  type SafeParseSuccess,
  type Scalars,
  ZodType as Schema,
  type SomeZodObject,
  type StringValidation,
  type SuperRefinement,
  type SyncParseReturnType,
  type TransformEffect,
  type TypeOf,
  type UnknownKeysParam,
  type Values,
  type Writeable,
  ZodAny,
  type ZodAnyDef,
  ZodArray,
  type ZodArrayDef,
  ZodBigInt,
  type ZodBigIntCheck,
  type ZodBigIntDef,
  ZodBoolean,
  type ZodBooleanDef,
  ZodBranded,
  type ZodBrandedDef,
  ZodCatch,
  type ZodCatchDef,
  type ZodCustomIssue,
  ZodDate,
  type ZodDateCheck,
  type ZodDateDef,
  ZodDefault,
  type ZodDefaultDef,
  ZodDiscriminatedUnion,
  type ZodDiscriminatedUnionDef,
  type ZodDiscriminatedUnionOption,
  ZodEffects,
  type ZodEffectsDef,
  ZodEnum,
  type ZodEnumDef,
  ZodError,
  type ZodErrorMap,
  type ZodFirstPartySchemaTypes,
  ZodFirstPartyTypeKind,
  type ZodFormattedError,
  ZodFunction,
  type ZodFunctionDef,
  ZodIntersection,
  type ZodIntersectionDef,
  type ZodInvalidArgumentsIssue,
  type ZodInvalidDateIssue,
  type ZodInvalidEnumValueIssue,
  type ZodInvalidIntersectionTypesIssue,
  type ZodInvalidLiteralIssue,
  type ZodInvalidReturnTypeIssue,
  type ZodInvalidStringIssue,
  type ZodInvalidTypeIssue,
  type ZodInvalidUnionDiscriminatorIssue,
  type ZodInvalidUnionIssue,
  type ZodIssue,
  type ZodIssueBase,
  ZodIssueCode,
  type ZodIssueOptionalMessage,
  ZodLazy,
  type ZodLazyDef,
  ZodLiteral,
  type ZodLiteralDef,
  ZodMap,
  type ZodMapDef,
  ZodNaN,
  type ZodNaNDef,
  ZodNativeEnum,
  type ZodNativeEnumDef,
  ZodNever,
  type ZodNeverDef,
  type ZodNonEmptyArray,
  type ZodNotFiniteIssue,
  type ZodNotMultipleOfIssue,
  ZodNull,
  type ZodNullDef,
  ZodNullable,
  type ZodNullableDef,
  type ZodNullableType,
  ZodNumber,
  type ZodNumberCheck,
  type ZodNumberDef,
  ZodObject,
  type ZodObjectDef,
  ZodOptional,
  type ZodOptionalDef,
  type ZodOptionalType,
  ZodParsedType,
  ZodPipeline,
  type ZodPipelineDef,
  ZodPromise,
  type ZodPromiseDef,
  type ZodRawShape,
  ZodReadonly,
  type ZodReadonlyDef,
  ZodRecord,
  type ZodRecordDef,
  ZodType as ZodSchema,
  ZodSet,
  type ZodSetDef,
  ZodString,
  type ZodStringCheck,
  type ZodStringDef,
  ZodSymbol,
  type ZodSymbolDef,
  type ZodTooBigIssue,
  type ZodTooSmallIssue,
  ZodEffects as ZodTransformer,
  ZodTuple,
  type ZodTupleDef,
  type ZodTupleItems,
  ZodType,
  type ZodTypeAny,
  type ZodTypeDef,
  ZodUndefined,
  type ZodUndefinedDef,
  ZodUnion,
  type ZodUnionDef,
  type ZodUnionOptions,
  ZodUnknown,
  type ZodUnknownDef,
  type ZodUnrecognizedKeysIssue,
  ZodVoid,
  type ZodVoidDef,
  addIssueToContext,
  anyType as any,
  arrayType as array,
  type arrayOutputType,
  type baseObjectInputType,
  type baseObjectOutputType,
  bigIntType as bigint,
  booleanType as boolean,
  coerce,
  custom,
  dateType as date,
  datetimeRegex,
  z as default,
  errorMap as defaultErrorMap,
  type deoptional,
  discriminatedUnionType as discriminatedUnion,
  effectsType as effect,
  enumType as enum,
  functionType as function,
  getErrorMap,
  getParsedType,
  type TypeOf as infer,
  type inferFlattenedErrors,
  type inferFormattedError,
  type input,
  instanceOfType as instanceof,
  intersectionType as intersection,
  isAborted,
  isAsync,
  isDirty,
  isValid,
  late,
  lazyType as lazy,
  literalType as literal,
  makeIssue,
  mapType as map,
  type mergeTypes,
  nanType as nan,
  nativeEnumType as nativeEnum,
  neverType as never,
  type noUnrecognized,
  nullType as null,
  nullableType as nullable,
  numberType as number,
  objectType as object,
  type objectInputType,
  type objectOutputType,
  objectUtil,
  oboolean,
  onumber,
  optionalType as optional,
  ostring,
  type output,
  pipelineType as pipeline,
  preprocessType as preprocess,
  promiseType as promise,
  quotelessJson,
  recordType as record,
  setType as set,
  setErrorMap,
  strictObjectType as strictObject,
  stringType as string,
  symbolType as symbol,
  effectsType as transformer,
  tupleType as tuple,
  type typeToFlattenedError,
  type typecast,
  undefinedType as undefined,
  unionType as union,
  unknownType as unknown,
  util,
  voidType as void,
  z,
};
`,No={libs:{dayjs:vo,"big.js":bo,zod:So,http:Io,zen:Do},globals:{"global.d.ts":_o}},Uo=xo;export{Zn as B,Ao as R,ho as S,cn as T,yt as W,Zo as a,wo as b,Oo as c,Uo as d,fo as e,jo as f,No as g,ot as r,st as u};
