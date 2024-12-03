import{ae as pe,af as ae,ag as be,a2 as oe,a0 as xe,x as _e,ah as Ee,ai as ye}from"./DocsRenderer-CFRXHY34-C5BSeN4B.js";import{g as we,R as c,r as d}from"./index-uubelm5h.js";import{T as k}from"./index-DtG1W2XK.js";import{c as y}from"./index-TW2i6qtr.js";import"./iframe-DqZmXI-W.js";import"../sb-preview/runtime.js";import"./wrapNativeSuper-ezTqcbMv.js";import"./index-BK_xiHMm.js";import"./index-D-8MO0q_.js";import"./_commonjs-dynamic-modules-TDtrdbi3.js";import"./index-B4JPhLL7.js";import"./index-DrFu-skq.js";import"./react-18-DFLhZWRn.js";var Ce=pe,ke=function(){return Ce.Date.now()},$e=ke,Ne=/\s/;function Ie(e){for(var r=e.length;r--&&Ne.test(e.charAt(r)););return r}var Me=Ie,Se=Me,Re=/^\s+/;function Oe(e){return e&&e.slice(0,Se(e)+1).replace(Re,"")}var Te=Oe,He=Te,U=ae,Le=be,J=NaN,Pe=/^[-+]0x[0-9a-f]+$/i,ze=/^0b[01]+$/i,Be=/^0o[0-7]+$/i,je=parseInt;function Xe(e){if(typeof e=="number")return e;if(Le(e))return J;if(U(e)){var r=typeof e.valueOf=="function"?e.valueOf():e;e=U(r)?r+"":r}if(typeof e!="string")return e===0?e:+e;e=He(e);var t=ze.test(e);return t||Be.test(e)?je(e.slice(2),t?2:8):Pe.test(e)?J:+e}var We=Xe,De=ae,X=$e,Q=We,Ve="Expected a function",Ae=Math.max,Fe=Math.min;function Ge(e,r,t){var n,a,l,i,o,u,s=0,m=!1,f=!1,h=!0;if(typeof e!="function")throw new TypeError(Ve);r=Q(r)||0,De(t)&&(m=!!t.leading,f="maxWait"in t,l=f?Ae(Q(t.maxWait)||0,r):l,h="trailing"in t?!!t.trailing:h);function _(v){var C=n,O=a;return n=a=void 0,s=v,i=e.apply(O,C),i}function M(v){return s=v,o=setTimeout(g,r),m?_(v):i}function w(v){var C=v-u,O=v-s,Y=r-C;return f?Fe(Y,l-O):Y}function p(v){var C=v-u,O=v-s;return u===void 0||C>=r||C<0||f&&O>=l}function g(){var v=X();if(p(v))return E(v);o=setTimeout(g,w(v))}function E(v){return o=void 0,h&&n?_(v):(n=a=void 0,i)}function b(){o!==void 0&&clearTimeout(o),s=0,n=u=a=o=void 0}function S(){return o===void 0?i:E(X())}function R(){var v=X(),C=p(v);if(n=arguments,a=this,u=v,C){if(o===void 0)return M(u);if(f)return clearTimeout(o),o=setTimeout(g,r),_(u)}return o===void 0&&(o=setTimeout(g,r)),i}return R.cancel=b,R.flush=S,R}var Ke=Ge;const qe=we(Ke);function $(){return($=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}).apply(this,arguments)}function G(e,r){if(e==null)return{};var t,n,a={},l=Object.keys(e);for(n=0;n<l.length;n++)r.indexOf(t=l[n])>=0||(a[t]=e[t]);return a}function W(e){var r=d.useRef(e),t=d.useRef(function(n){r.current&&r.current(n)});return r.current=e,t.current}var I=function(e,r,t){return r===void 0&&(r=0),t===void 0&&(t=1),e>t?t:e<r?r:e},T=function(e){return"touches"in e},D=function(e){return e&&e.ownerDocument.defaultView||self},Z=function(e,r,t){var n=e.getBoundingClientRect(),a=T(r)?function(l,i){for(var o=0;o<l.length;o++)if(l[o].identifier===i)return l[o];return l[0]}(r.touches,t):r;return{left:I((a.pageX-(n.left+D(e).pageXOffset))/n.width),top:I((a.pageY-(n.top+D(e).pageYOffset))/n.height)}},ee=function(e){!T(e)&&e.preventDefault()},K=c.memo(function(e){var r=e.onMove,t=e.onKey,n=G(e,["onMove","onKey"]),a=d.useRef(null),l=W(r),i=W(t),o=d.useRef(null),u=d.useRef(!1),s=d.useMemo(function(){var _=function(p){ee(p),(T(p)?p.touches.length>0:p.buttons>0)&&a.current?l(Z(a.current,p,o.current)):w(!1)},M=function(){return w(!1)};function w(p){var g=u.current,E=D(a.current),b=p?E.addEventListener:E.removeEventListener;b(g?"touchmove":"mousemove",_),b(g?"touchend":"mouseup",M)}return[function(p){var g=p.nativeEvent,E=a.current;if(E&&(ee(g),!function(S,R){return R&&!T(S)}(g,u.current)&&E)){if(T(g)){u.current=!0;var b=g.changedTouches||[];b.length&&(o.current=b[0].identifier)}E.focus(),l(Z(E,g,o.current)),w(!0)}},function(p){var g=p.which||p.keyCode;g<37||g>40||(p.preventDefault(),i({left:g===39?.05:g===37?-.05:0,top:g===40?.05:g===38?-.05:0}))},w]},[i,l]),m=s[0],f=s[1],h=s[2];return d.useEffect(function(){return h},[h]),c.createElement("div",$({},n,{onTouchStart:m,onMouseDown:m,className:"react-colorful__interactive",ref:a,onKeyDown:f,tabIndex:0,role:"slider"}))}),H=function(e){return e.filter(Boolean).join(" ")},q=function(e){var r=e.color,t=e.left,n=e.top,a=n===void 0?.5:n,l=H(["react-colorful__pointer",e.className]);return c.createElement("div",{className:l,style:{top:100*a+"%",left:100*t+"%"}},c.createElement("div",{className:"react-colorful__pointer-fill",style:{backgroundColor:r}}))},x=function(e,r,t){return r===void 0&&(r=0),t===void 0&&(t=Math.pow(10,r)),Math.round(t*e)/t},Ye={grad:.9,turn:360,rad:360/(2*Math.PI)},Ue=function(e){return ue(V(e))},V=function(e){return e[0]==="#"&&(e=e.substring(1)),e.length<6?{r:parseInt(e[0]+e[0],16),g:parseInt(e[1]+e[1],16),b:parseInt(e[2]+e[2],16),a:e.length===4?x(parseInt(e[3]+e[3],16)/255,2):1}:{r:parseInt(e.substring(0,2),16),g:parseInt(e.substring(2,4),16),b:parseInt(e.substring(4,6),16),a:e.length===8?x(parseInt(e.substring(6,8),16)/255,2):1}},Je=function(e,r){return r===void 0&&(r="deg"),Number(e)*(Ye[r]||1)},Qe=function(e){var r=/hsla?\(?\s*(-?\d*\.?\d+)(deg|rad|grad|turn)?[,\s]+(-?\d*\.?\d+)%?[,\s]+(-?\d*\.?\d+)%?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(e);return r?Ze({h:Je(r[1],r[2]),s:Number(r[3]),l:Number(r[4]),a:r[5]===void 0?1:Number(r[5])/(r[6]?100:1)}):{h:0,s:0,v:0,a:1}},Ze=function(e){var r=e.s,t=e.l;return{h:e.h,s:(r*=(t<50?t:100-t)/100)>0?2*r/(t+r)*100:0,v:t+r,a:e.a}},er=function(e){return tr(ie(e))},le=function(e){var r=e.s,t=e.v,n=e.a,a=(200-r)*t/100;return{h:x(e.h),s:x(a>0&&a<200?r*t/100/(a<=100?a:200-a)*100:0),l:x(a/2),a:x(n,2)}},A=function(e){var r=le(e);return"hsl("+r.h+", "+r.s+"%, "+r.l+"%)"},B=function(e){var r=le(e);return"hsla("+r.h+", "+r.s+"%, "+r.l+"%, "+r.a+")"},ie=function(e){var r=e.h,t=e.s,n=e.v,a=e.a;r=r/360*6,t/=100,n/=100;var l=Math.floor(r),i=n*(1-t),o=n*(1-(r-l)*t),u=n*(1-(1-r+l)*t),s=l%6;return{r:x(255*[n,o,i,i,u,n][s]),g:x(255*[u,n,n,o,i,i][s]),b:x(255*[i,i,u,n,n,o][s]),a:x(a,2)}},rr=function(e){var r=/rgba?\(?\s*(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(e);return r?ue({r:Number(r[1])/(r[2]?100/255:1),g:Number(r[3])/(r[4]?100/255:1),b:Number(r[5])/(r[6]?100/255:1),a:r[7]===void 0?1:Number(r[7])/(r[8]?100:1)}):{h:0,s:0,v:0,a:1}},L=function(e){var r=e.toString(16);return r.length<2?"0"+r:r},tr=function(e){var r=e.r,t=e.g,n=e.b,a=e.a,l=a<1?L(x(255*a)):"";return"#"+L(r)+L(t)+L(n)+l},ue=function(e){var r=e.r,t=e.g,n=e.b,a=e.a,l=Math.max(r,t,n),i=l-Math.min(r,t,n),o=i?l===r?(t-n)/i:l===t?2+(n-r)/i:4+(r-t)/i:0;return{h:x(60*(o<0?o+6:o)),s:x(l?i/l*100:0),v:x(l/255*100),a}},se=c.memo(function(e){var r=e.hue,t=e.onChange,n=H(["react-colorful__hue",e.className]);return c.createElement("div",{className:n},c.createElement(K,{onMove:function(a){t({h:360*a.left})},onKey:function(a){t({h:I(r+360*a.left,0,360)})},"aria-label":"Hue","aria-valuenow":x(r),"aria-valuemax":"360","aria-valuemin":"0"},c.createElement(q,{className:"react-colorful__hue-pointer",left:r/360,color:A({h:r,s:100,v:100,a:1})})))}),ce=c.memo(function(e){var r=e.hsva,t=e.onChange,n={backgroundColor:A({h:r.h,s:100,v:100,a:1})};return c.createElement("div",{className:"react-colorful__saturation",style:n},c.createElement(K,{onMove:function(a){t({s:100*a.left,v:100-100*a.top})},onKey:function(a){t({s:I(r.s+100*a.left,0,100),v:I(r.v-100*a.top,0,100)})},"aria-label":"Color","aria-valuetext":"Saturation "+x(r.s)+"%, Brightness "+x(r.v)+"%"},c.createElement(q,{className:"react-colorful__saturation-pointer",top:1-r.v/100,left:r.s/100,color:A(r)})))}),fe=function(e,r){if(e===r)return!0;for(var t in e)if(e[t]!==r[t])return!1;return!0},de=function(e,r){return e.replace(/\s/g,"")===r.replace(/\s/g,"")},nr=function(e,r){return e.toLowerCase()===r.toLowerCase()||fe(V(e),V(r))};function he(e,r,t){var n=W(t),a=d.useState(function(){return e.toHsva(r)}),l=a[0],i=a[1],o=d.useRef({color:r,hsva:l});d.useEffect(function(){if(!e.equal(r,o.current.color)){var s=e.toHsva(r);o.current={hsva:s,color:r},i(s)}},[r,e]),d.useEffect(function(){var s;fe(l,o.current.hsva)||e.equal(s=e.fromHsva(l),o.current.color)||(o.current={hsva:l,color:s},n(s))},[l,e,n]);var u=d.useCallback(function(s){i(function(m){return Object.assign({},m,s)})},[]);return[l,u]}var ar=typeof window<"u"?d.useLayoutEffect:d.useEffect,or=function(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:void 0},re=new Map,me=function(e){ar(function(){var r=e.current?e.current.ownerDocument:document;if(r!==void 0&&!re.has(r)){var t=r.createElement("style");t.innerHTML=`.react-colorful{position:relative;display:flex;flex-direction:column;width:200px;height:200px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.react-colorful__saturation{position:relative;flex-grow:1;border-color:transparent;border-bottom:12px solid #000;border-radius:8px 8px 0 0;background-image:linear-gradient(0deg,#000,transparent),linear-gradient(90deg,#fff,hsla(0,0%,100%,0))}.react-colorful__alpha-gradient,.react-colorful__pointer-fill{content:"";position:absolute;left:0;top:0;right:0;bottom:0;pointer-events:none;border-radius:inherit}.react-colorful__alpha-gradient,.react-colorful__saturation{box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}.react-colorful__alpha,.react-colorful__hue{position:relative;height:24px}.react-colorful__hue{background:linear-gradient(90deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red)}.react-colorful__last-control{border-radius:0 0 8px 8px}.react-colorful__interactive{position:absolute;left:0;top:0;right:0;bottom:0;border-radius:inherit;outline:none;touch-action:none}.react-colorful__pointer{position:absolute;z-index:1;box-sizing:border-box;width:28px;height:28px;transform:translate(-50%,-50%);background-color:#fff;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.2)}.react-colorful__interactive:focus .react-colorful__pointer{transform:translate(-50%,-50%) scale(1.1)}.react-colorful__alpha,.react-colorful__alpha-pointer{background-color:#fff;background-image:url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>')}.react-colorful__saturation-pointer{z-index:3}.react-colorful__hue-pointer{z-index:2}`,re.set(r,t);var n=or();n&&t.setAttribute("nonce",n),r.head.appendChild(t)}},[])},lr=function(e){var r=e.className,t=e.colorModel,n=e.color,a=n===void 0?t.defaultColor:n,l=e.onChange,i=G(e,["className","colorModel","color","onChange"]),o=d.useRef(null);me(o);var u=he(t,a,l),s=u[0],m=u[1],f=H(["react-colorful",r]);return c.createElement("div",$({},i,{ref:o,className:f}),c.createElement(ce,{hsva:s,onChange:m}),c.createElement(se,{hue:s.h,onChange:m,className:"react-colorful__last-control"}))},ir={defaultColor:"000",toHsva:Ue,fromHsva:function(e){return er({h:e.h,s:e.s,v:e.v,a:1})},equal:nr},ur=function(e){return c.createElement(lr,$({},e,{colorModel:ir}))},sr=function(e){var r=e.className,t=e.hsva,n=e.onChange,a={backgroundImage:"linear-gradient(90deg, "+B(Object.assign({},t,{a:0}))+", "+B(Object.assign({},t,{a:1}))+")"},l=H(["react-colorful__alpha",r]),i=x(100*t.a);return c.createElement("div",{className:l},c.createElement("div",{className:"react-colorful__alpha-gradient",style:a}),c.createElement(K,{onMove:function(o){n({a:o.left})},onKey:function(o){n({a:I(t.a+o.left)})},"aria-label":"Alpha","aria-valuetext":i+"%","aria-valuenow":i,"aria-valuemin":"0","aria-valuemax":"100"},c.createElement(q,{className:"react-colorful__alpha-pointer",left:t.a,color:B(t)})))},ge=function(e){var r=e.className,t=e.colorModel,n=e.color,a=n===void 0?t.defaultColor:n,l=e.onChange,i=G(e,["className","colorModel","color","onChange"]),o=d.useRef(null);me(o);var u=he(t,a,l),s=u[0],m=u[1],f=H(["react-colorful",r]);return c.createElement("div",$({},i,{ref:o,className:f}),c.createElement(ce,{hsva:s,onChange:m}),c.createElement(se,{hue:s.h,onChange:m}),c.createElement(sr,{hsva:s,onChange:m,className:"react-colorful__last-control"}))},cr={defaultColor:"hsla(0, 0%, 0%, 1)",toHsva:Qe,fromHsva:B,equal:de},fr=function(e){return c.createElement(ge,$({},e,{colorModel:cr}))},dr={defaultColor:"rgba(0, 0, 0, 1)",toHsva:rr,fromHsva:function(e){var r=ie(e);return"rgba("+r.r+", "+r.g+", "+r.b+", "+r.a+")"},equal:de},hr=function(e){return c.createElement(ge,$({},e,{colorModel:dr}))},mr=k.div({position:"relative",maxWidth:250,'&[aria-readonly="true"]':{opacity:.5}}),gr=k(oe)({position:"absolute",zIndex:1,top:4,left:4,"[aria-readonly=true] &":{cursor:"not-allowed"}}),vr=k.div({width:200,margin:5,".react-colorful__saturation":{borderRadius:"4px 4px 0 0"},".react-colorful__hue":{boxShadow:"inset 0 0 0 1px rgb(0 0 0 / 5%)"},".react-colorful__last-control":{borderRadius:"0 0 4px 4px"}}),pr=k(xe)(({theme:e})=>({fontFamily:e.typography.fonts.base})),br=k.div({display:"grid",gridTemplateColumns:"repeat(9, 16px)",gap:6,padding:3,marginTop:5,width:200}),xr=k.div(({theme:e,active:r})=>({width:16,height:16,boxShadow:r?`${e.appBorderColor} 0 0 0 1px inset, ${e.textMutedColor}50 0 0 0 4px`:`${e.appBorderColor} 0 0 0 1px inset`,borderRadius:e.appBorderRadius})),_r=`url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>')`,te=({value:e,style:r,...t})=>{let n=`linear-gradient(${e}, ${e}), ${_r}, linear-gradient(#fff, #fff)`;return c.createElement(xr,{...t,style:{...r,backgroundImage:n}})},Er=k(_e.Input)(({theme:e,readOnly:r})=>({width:"100%",paddingLeft:30,paddingRight:30,boxSizing:"border-box",fontFamily:e.typography.fonts.base})),yr=k(Ee)(({theme:e})=>({position:"absolute",zIndex:1,top:6,right:7,width:20,height:20,padding:4,boxSizing:"border-box",cursor:"pointer",color:e.input.color})),ve=(e=>(e.RGB="rgb",e.HSL="hsl",e.HEX="hex",e))(ve||{}),P=Object.values(ve),wr=/\(([0-9]+),\s*([0-9]+)%?,\s*([0-9]+)%?,?\s*([0-9.]+)?\)/,Cr=/^\s*rgba?\(([0-9]+),\s*([0-9]+),\s*([0-9]+),?\s*([0-9.]+)?\)\s*$/i,kr=/^\s*hsla?\(([0-9]+),\s*([0-9]+)%,\s*([0-9]+)%,?\s*([0-9.]+)?\)\s*$/i,F=/^\s*#?([0-9a-f]{3}|[0-9a-f]{6})\s*$/i,$r=/^\s*#?([0-9a-f]{3})\s*$/i,Nr={hex:ur,rgb:hr,hsl:fr},z={hex:"transparent",rgb:"rgba(0, 0, 0, 0)",hsl:"hsla(0, 0%, 0%, 0)"},ne=e=>{let r=e?.match(wr);if(!r)return[0,0,0,1];let[,t,n,a,l=1]=r;return[t,n,a,l].map(Number)},N=e=>{if(!e)return;let r=!0;if(Cr.test(e)){let[i,o,u,s]=ne(e),[m,f,h]=y.rgb.hsl([i,o,u])||[0,0,0];return{valid:r,value:e,keyword:y.rgb.keyword([i,o,u]),colorSpace:"rgb",rgb:e,hsl:`hsla(${m}, ${f}%, ${h}%, ${s})`,hex:`#${y.rgb.hex([i,o,u]).toLowerCase()}`}}if(kr.test(e)){let[i,o,u,s]=ne(e),[m,f,h]=y.hsl.rgb([i,o,u])||[0,0,0];return{valid:r,value:e,keyword:y.hsl.keyword([i,o,u]),colorSpace:"hsl",rgb:`rgba(${m}, ${f}, ${h}, ${s})`,hsl:e,hex:`#${y.hsl.hex([i,o,u]).toLowerCase()}`}}let t=e.replace("#",""),n=y.keyword.rgb(t)||y.hex.rgb(t),a=y.rgb.hsl(n),l=e;if(/[^#a-f0-9]/i.test(e)?l=t:F.test(e)&&(l=`#${t}`),l.startsWith("#"))r=F.test(l);else try{y.keyword.hex(l)}catch{r=!1}return{valid:r,value:l,keyword:y.rgb.keyword(n),colorSpace:"hex",rgb:`rgba(${n[0]}, ${n[1]}, ${n[2]}, 1)`,hsl:`hsla(${a[0]}, ${a[1]}%, ${a[2]}%, 1)`,hex:l}},Ir=(e,r,t)=>{if(!e||!r?.valid)return z[t];if(t!=="hex")return r?.[t]||z[t];if(!r.hex.startsWith("#"))try{return`#${y.keyword.hex(r.hex)}`}catch{return z.hex}let n=r.hex.match($r);if(!n)return F.test(r.hex)?r.hex:z.hex;let[a,l,i]=n[1].split("");return`#${a}${a}${l}${l}${i}${i}`},Mr=(e,r)=>{let[t,n]=d.useState(e||""),[a,l]=d.useState(()=>N(t)),[i,o]=d.useState(a?.colorSpace||"hex");d.useEffect(()=>{let f=e||"",h=N(f);n(f),l(h),o(h?.colorSpace||"hex")},[e]);let u=d.useMemo(()=>Ir(t,a,i).toLowerCase(),[t,a,i]),s=d.useCallback(f=>{let h=N(f),_=h?.value||f||"";n(_),_===""&&(l(void 0),r(void 0)),h&&(l(h),o(h.colorSpace),r(h.value))},[r]),m=d.useCallback(()=>{let f=P.indexOf(i)+1;f>=P.length&&(f=0),o(P[f]);let h=a?.[P[f]]||"";n(h),r(h)},[a,i,r]);return{value:t,realValue:u,updateValue:s,color:a,colorSpace:i,cycleColorSpace:m}},j=e=>e.replace(/\s*/,"").toLowerCase(),Sr=(e,r,t)=>{let[n,a]=d.useState(r?.valid?[r]:[]);d.useEffect(()=>{r===void 0&&a([])},[r]);let l=d.useMemo(()=>(e||[]).map(o=>typeof o=="string"?N(o):o.title?{...N(o.color),keyword:o.title}:N(o.color)).concat(n).filter(Boolean).slice(-27),[e,n]),i=d.useCallback(o=>{o?.valid&&(l.some(u=>j(u[t])===j(o[t]))||a(u=>u.concat(o)))},[t,l]);return{presets:l,addPreset:i}},Rr=({name:e,value:r,onChange:t,onFocus:n,onBlur:a,presetColors:l,startOpen:i=!1,argType:o})=>{let u=d.useCallback(qe(t,200),[t]),{value:s,realValue:m,updateValue:f,color:h,colorSpace:_,cycleColorSpace:M}=Mr(r,u),{presets:w,addPreset:p}=Sr(l,h,_),g=Nr[_],E=!!o?.table?.readonly;return c.createElement(mr,{"aria-readonly":E},c.createElement(gr,{startOpen:i,trigger:E?[null]:void 0,closeOnOutsideClick:!0,onVisibleChange:()=>p(h),tooltip:c.createElement(vr,null,c.createElement(g,{color:m==="transparent"?"#000000":m,onChange:f,onFocus:n,onBlur:a}),w.length>0&&c.createElement(br,null,w.map((b,S)=>c.createElement(oe,{key:`${b.value}-${S}`,hasChrome:!1,tooltip:c.createElement(pr,{note:b.keyword||b.value})},c.createElement(te,{value:b[_],active:h&&j(b[_])===j(h[_]),onClick:()=>f(b.value)})))))},c.createElement(te,{value:m,style:{margin:4}})),c.createElement(Er,{id:ye(e),value:s,onChange:b=>f(b.target.value),onFocus:b=>b.target.select(),readOnly:E,placeholder:"Choose color..."}),s?c.createElement(yr,{onClick:M}):null)},Fr=Rr;export{Rr as ColorControl,Fr as default};