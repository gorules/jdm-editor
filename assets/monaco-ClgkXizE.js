import{r as f,R as he,a as wn}from"./index-DQDNmYQF.js";import{f as dt,c as ae,h as ut,j as lt,m as pt,r as ct,K as En,C as yt}from"./wasm-CFqRl8NK.js";import{I as ft}from"./AntdIcon-CF93AVgx.js";function mt(e,n,t){var o=t||{},a=o.noTrailing,r=a===void 0?!1:a,s=o.noLeading,i=s===void 0?!1:s,d=o.debounceMode,c=d===void 0?void 0:d,Z,l=!1,u=0;function m(){Z&&clearTimeout(Z)}function g(z){var h=z||{},T=h.upcomingOnly,x=T===void 0?!1:T;m(),l=!x}function D(){for(var z=arguments.length,h=new Array(z),T=0;T<z;T++)h[T]=arguments[T];var x=this,k=Date.now()-u;if(l)return;function w(){u=Date.now(),n.apply(x,h)}function b(){Z=void 0}!i&&c&&!Z&&w(),m(),c===void 0&&k>e?i?(u=Date.now(),r||(Z=setTimeout(c?b:w,e))):w():r!==!0&&(Z=setTimeout(c?b:w,c===void 0?e-k:e))}return D.cancel=g,D}function Tt(e,n,t){var o={},a=o.atBegin,r=a===void 0?!1:a;return mt(e,n,{debounceMode:r!==!1})}const Me=100,Rn=Me/5,An=Me/2-Rn/2,We=An*2*Math.PI,pn=50,cn=e=>{const{dotClassName:n,style:t,hasCircleCls:o}=e;return f.createElement("circle",{className:ae(`${n}-circle`,{[`${n}-circle-bg`]:o}),r:An,cx:pn,cy:pn,strokeWidth:Rn,style:t})},gt=e=>{let{percent:n,prefixCls:t}=e;const o=`${t}-dot`,a=`${o}-holder`,r=`${a}-hidden`,[s,i]=f.useState(!1);dt(()=>{n!==0&&i(!0)},[n!==0]);const d=Math.max(Math.min(n,100),0);if(!s)return null;const c={strokeDashoffset:`${We/4}`,strokeDasharray:`${We*d/100} ${We*(100-d)/100}`};return f.createElement("span",{className:ae(a,`${o}-progress`,d<=0&&r)},f.createElement("svg",{viewBox:`0 0 ${Me} ${Me}`,role:"progressbar","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":d},f.createElement(cn,{dotClassName:o,hasCircleCls:!0}),f.createElement(cn,{dotClassName:o,style:c})))};function Zt(e){const{prefixCls:n,percent:t=0}=e,o=`${n}-dot`,a=`${o}-holder`,r=`${a}-hidden`;return f.createElement(f.Fragment,null,f.createElement("span",{className:ae(a,t>0&&r)},f.createElement("span",{className:ae(o,`${n}-dot-spin`)},[1,2,3,4].map(s=>f.createElement("i",{className:`${n}-dot-item`,key:s})))),f.createElement(gt,{prefixCls:n,percent:t}))}function ht(e){const{prefixCls:n,indicator:t,percent:o}=e,a=`${n}-dot`;return t&&f.isValidElement(t)?ut(t,{className:ae(t.props.className,a),percent:o}):f.createElement(Zt,{prefixCls:n,percent:o})}const bt=new En("antSpinMove",{to:{opacity:1}}),xt=new En("antRotate",{to:{transform:"rotate(405deg)"}}),vt=e=>{const{componentCls:n,calc:t}=e;return{[n]:Object.assign(Object.assign({},ct(e)),{position:"absolute",display:"none",color:e.colorPrimary,fontSize:0,textAlign:"center",verticalAlign:"middle",opacity:0,transition:`transform ${e.motionDurationSlow} ${e.motionEaseInOutCirc}`,"&-spinning":{position:"relative",display:"inline-block",opacity:1},[`${n}-text`]:{fontSize:e.fontSize,paddingTop:t(t(e.dotSize).sub(e.fontSize)).div(2).add(2).equal()},"&-fullscreen":{position:"fixed",width:"100vw",height:"100vh",backgroundColor:e.colorBgMask,zIndex:e.zIndexPopupBase,inset:0,display:"flex",alignItems:"center",flexDirection:"column",justifyContent:"center",opacity:0,visibility:"hidden",transition:`all ${e.motionDurationMid}`,"&-show":{opacity:1,visibility:"visible"},[n]:{[`${n}-dot-holder`]:{color:e.colorWhite},[`${n}-text`]:{color:e.colorTextLightSolid}}},"&-nested-loading":{position:"relative",[`> div > ${n}`]:{position:"absolute",top:0,insetInlineStart:0,zIndex:4,display:"block",width:"100%",height:"100%",maxHeight:e.contentHeight,[`${n}-dot`]:{position:"absolute",top:"50%",insetInlineStart:"50%",margin:t(e.dotSize).mul(-1).div(2).equal()},[`${n}-text`]:{position:"absolute",top:"50%",width:"100%",textShadow:`0 1px 2px ${e.colorBgContainer}`},[`&${n}-show-text ${n}-dot`]:{marginTop:t(e.dotSize).div(2).mul(-1).sub(10).equal()},"&-sm":{[`${n}-dot`]:{margin:t(e.dotSizeSM).mul(-1).div(2).equal()},[`${n}-text`]:{paddingTop:t(t(e.dotSizeSM).sub(e.fontSize)).div(2).add(2).equal()},[`&${n}-show-text ${n}-dot`]:{marginTop:t(e.dotSizeSM).div(2).mul(-1).sub(10).equal()}},"&-lg":{[`${n}-dot`]:{margin:t(e.dotSizeLG).mul(-1).div(2).equal()},[`${n}-text`]:{paddingTop:t(t(e.dotSizeLG).sub(e.fontSize)).div(2).add(2).equal()},[`&${n}-show-text ${n}-dot`]:{marginTop:t(e.dotSizeLG).div(2).mul(-1).sub(10).equal()}}},[`${n}-container`]:{position:"relative",transition:`opacity ${e.motionDurationSlow}`,"&::after":{position:"absolute",top:0,insetInlineEnd:0,bottom:0,insetInlineStart:0,zIndex:10,width:"100%",height:"100%",background:e.colorBgContainer,opacity:0,transition:`all ${e.motionDurationSlow}`,content:'""',pointerEvents:"none"}},[`${n}-blur`]:{clear:"both",opacity:.5,userSelect:"none",pointerEvents:"none","&::after":{opacity:.4,pointerEvents:"auto"}}},"&-tip":{color:e.spinDotDefault},[`${n}-dot-holder`]:{width:"1em",height:"1em",fontSize:e.dotSize,display:"inline-block",transition:`transform ${e.motionDurationSlow} ease, opacity ${e.motionDurationSlow} ease`,transformOrigin:"50% 50%",lineHeight:1,color:e.colorPrimary,"&-hidden":{transform:"scale(0.3)",opacity:0}},[`${n}-dot-progress`]:{position:"absolute",top:"50%",transform:"translate(-50%, -50%)",insetInlineStart:"50%"},[`${n}-dot`]:{position:"relative",display:"inline-block",fontSize:e.dotSize,width:"1em",height:"1em","&-item":{position:"absolute",display:"block",width:t(e.dotSize).sub(t(e.marginXXS).div(2)).div(2).equal(),height:t(e.dotSize).sub(t(e.marginXXS).div(2)).div(2).equal(),background:"currentColor",borderRadius:"100%",transform:"scale(0.75)",transformOrigin:"50% 50%",opacity:.3,animationName:bt,animationDuration:"1s",animationIterationCount:"infinite",animationTimingFunction:"linear",animationDirection:"alternate","&:nth-child(1)":{top:0,insetInlineStart:0,animationDelay:"0s"},"&:nth-child(2)":{top:0,insetInlineEnd:0,animationDelay:"0.4s"},"&:nth-child(3)":{insetInlineEnd:0,bottom:0,animationDelay:"0.8s"},"&:nth-child(4)":{bottom:0,insetInlineStart:0,animationDelay:"1.2s"}},"&-spin":{transform:"rotate(45deg)",animationName:xt,animationDuration:"1.2s",animationIterationCount:"infinite",animationTimingFunction:"linear"},"&-circle":{strokeLinecap:"round",transition:["stroke-dashoffset","stroke-dasharray","stroke","stroke-width","opacity"].map(o=>`${o} ${e.motionDurationSlow} ease`).join(","),fillOpacity:0,stroke:"currentcolor"},"&-circle-bg":{stroke:e.colorFillSecondary}},[`&-sm ${n}-dot`]:{"&, &-holder":{fontSize:e.dotSizeSM}},[`&-sm ${n}-dot-holder`]:{i:{width:t(t(e.dotSizeSM).sub(t(e.marginXXS).div(2))).div(2).equal(),height:t(t(e.dotSizeSM).sub(t(e.marginXXS).div(2))).div(2).equal()}},[`&-lg ${n}-dot`]:{"&, &-holder":{fontSize:e.dotSizeLG}},[`&-lg ${n}-dot-holder`]:{i:{width:t(t(e.dotSizeLG).sub(e.marginXXS)).div(2).equal(),height:t(t(e.dotSizeLG).sub(e.marginXXS)).div(2).equal()}},[`&${n}-show-text ${n}-text`]:{display:"block"}})}},_t=e=>{const{controlHeightLG:n,controlHeight:t}=e;return{contentHeight:400,dotSize:n/2,dotSizeSM:n*.35,dotSizeLG:t}},It=lt("Spin",e=>{const n=pt(e,{spinDotDefault:e.colorTextDescription});return[vt(n)]},_t),zt=200,yn=[[30,.05],[70,.03],[96,.01]];function Pt(e,n){const[t,o]=f.useState(0),a=f.useRef(),r=n==="auto";return f.useEffect(()=>(r&&e&&(o(0),a.current=setInterval(()=>{o(s=>{const i=100-s;for(let d=0;d<yn.length;d+=1){const[c,Z]=yn[d];if(s<=c)return s+i*Z}return s})},zt)),()=>{clearInterval(a.current)}),[r,e]),r?t:n}var Dt=function(e,n){var t={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&n.indexOf(o)<0&&(t[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,o=Object.getOwnPropertySymbols(e);a<o.length;a++)n.indexOf(o[a])<0&&Object.prototype.propertyIsEnumerable.call(e,o[a])&&(t[o[a]]=e[o[a]]);return t};let On;function St(e,n){return!!e&&!!n&&!isNaN(Number(n))}const wt=e=>{var n;const{prefixCls:t,spinning:o=!0,delay:a=0,className:r,rootClassName:s,size:i="default",tip:d,wrapperClassName:c,style:Z,children:l,fullscreen:u=!1,indicator:m,percent:g}=e,D=Dt(e,["prefixCls","spinning","delay","className","rootClassName","size","tip","wrapperClassName","style","children","fullscreen","indicator","percent"]),{getPrefixCls:z,direction:h,spin:T}=f.useContext(yt),x=z("spin",t),[k,w,b]=It(x),[y,M]=f.useState(()=>o&&!St(o,a)),C=Pt(y,g);f.useEffect(()=>{if(o){const R=Tt(a,()=>{M(!0)});return R(),()=>{var ee;(ee=R?.cancel)===null||ee===void 0||ee.call(R)}}M(!1)},[a,o]);const E=f.useMemo(()=>typeof l<"u"&&!u,[l,u]),K=ae(x,T?.className,{[`${x}-sm`]:i==="small",[`${x}-lg`]:i==="large",[`${x}-spinning`]:y,[`${x}-show-text`]:!!d,[`${x}-rtl`]:h==="rtl"},r,!u&&s,w,b),j=ae(`${x}-container`,{[`${x}-blur`]:y}),F=(n=m??T?.indicator)!==null&&n!==void 0?n:On,U=Object.assign(Object.assign({},T?.style),Z),v=f.createElement("div",Object.assign({},D,{style:U,className:K,"aria-live":"polite","aria-busy":y}),f.createElement(ht,{prefixCls:x,indicator:F,percent:C}),d&&(E||u)?f.createElement("div",{className:`${x}-text`},d):null);return k(E?f.createElement("div",Object.assign({},D,{className:ae(`${x}-nested-loading`,c,w,b)}),y&&f.createElement("div",{key:"loading"},v),f.createElement("div",{className:j,key:"container"},l)):u?f.createElement("div",{className:ae(`${x}-fullscreen`,{[`${x}-fullscreen-show`]:y},s,w,b)},v):v)};wt.setDefaultIndicator=e=>{On=e};var Et={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"defs",attrs:{},children:[{tag:"style",attrs:{}}]},{tag:"path",attrs:{d:"M840 192h-56v-72c0-13.3-10.7-24-24-24H168c-13.3 0-24 10.7-24 24v272c0 13.3 10.7 24 24 24h592c13.3 0 24-10.7 24-24V256h32v200H465c-22.1 0-40 17.9-40 40v136h-44c-4.4 0-8 3.6-8 8v228c0 .6.1 1.3.2 1.9A83.99 83.99 0 00457 960c46.4 0 84-37.6 84-84 0-2.1-.1-4.1-.2-6.1.1-.6.2-1.2.2-1.9V640c0-4.4-3.6-8-8-8h-44V520h351c22.1 0 40-17.9 40-40V232c0-22.1-17.9-40-40-40zM720 352H208V160h512v192zM477 876c0 11-9 20-20 20s-20-9-20-20V696h40v180z"}}]},name:"format-painter",theme:"outlined"};function nn(){return nn=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e},nn.apply(this,arguments)}const Rt=(e,n)=>f.createElement(ft,nn({},e,{ref:n,icon:Et})),Sa=f.forwardRef(Rt),At=e=>{const n=document.createElement("textarea");n.value=e,document.body.appendChild(n),n.focus(),n.select();try{document.execCommand("copy")}catch(t){console.error("Unable to copy to clipboard",t)}document.body.removeChild(n)},wa=async e=>{window.isSecureContext&&navigator.clipboard?await navigator.clipboard.writeText(e):At(e)},Ea=async()=>{try{return navigator.clipboard.readText()}catch{return""}},Ra=(e,n,t)=>n.split(".").reduce((o,a)=>o&&o[a]?o[a]:t||null,e),Ot=`declare namespace Big {
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
`,kt=`/// <reference path="./locale/index.d.ts" />

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
`,Ct=`import zen from 'zen';

/** @type {Handler} **/
export const handler = async (input) => {
  return input;
};
`,jt=`declare namespace console {
  function log(...args: any[]): void;
  async function sleep(durationMs: number): Promise<void>;
}

interface Config {
  readonly maxDepth: number;
  readonly iteration: number;
  readonly trace: boolean;
}

declare const config: Config;
`,Ut=`declare class HttpResponse {
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
`,Nt=`interface EvaluateOptions {
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
`,Mt=`declare type Primitive = string | number | symbol | bigint | boolean | null | undefined;
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
`,Aa=[{name:"big.js",tagline:"Arbitrary-precision decimal arithmetic",importName:"Big",typeDef:Ot,documentationUrl:"https://mikemcl.github.io/big.js/"},{name:"dayjs",tagline:"Date utilities",typeDef:kt,documentationUrl:"https://day.js.org/docs/en/parse/parse"},{name:"http",tagline:"Promise based HTTP client",typeDef:Ut,documentationUrl:"https://docs.gorules.io/reference/http"},{name:"zen",tagline:"Rules engine utilities",typeDef:Nt,documentationUrl:"https://docs.gorules.io/reference/zen"},{name:"zod",tagline:"Schema validation",importName:"z",typeDef:Mt,documentationUrl:"https://zod.dev/"}],Oa={globals:{"global.d.ts":jt}},ka=Ct;function Bt(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function fn(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),t.push.apply(t,o)}return t}function mn(e){for(var n=1;n<arguments.length;n++){var t=arguments[n]!=null?arguments[n]:{};n%2?fn(Object(t),!0).forEach(function(o){Bt(e,o,t[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):fn(Object(t)).forEach(function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(t,o))})}return e}function Kt(e,n){if(e==null)return{};var t={},o=Object.keys(e),a,r;for(r=0;r<o.length;r++)a=o[r],!(n.indexOf(a)>=0)&&(t[a]=e[a]);return t}function Lt(e,n){if(e==null)return{};var t=Kt(e,n),o,a;if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)o=r[a],!(n.indexOf(o)>=0)&&Object.prototype.propertyIsEnumerable.call(e,o)&&(t[o]=e[o])}return t}function Vt(e,n){return Ft(e)||$t(e,n)||Ht(e,n)||qt()}function Ft(e){if(Array.isArray(e))return e}function $t(e,n){if(!(typeof Symbol>"u"||!(Symbol.iterator in Object(e)))){var t=[],o=!0,a=!1,r=void 0;try{for(var s=e[Symbol.iterator](),i;!(o=(i=s.next()).done)&&(t.push(i.value),!(n&&t.length===n));o=!0);}catch(d){a=!0,r=d}finally{try{!o&&s.return!=null&&s.return()}finally{if(a)throw r}}return t}}function Ht(e,n){if(e){if(typeof e=="string")return Tn(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);if(t==="Object"&&e.constructor&&(t=e.constructor.name),t==="Map"||t==="Set")return Array.from(e);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return Tn(e,n)}}function Tn(e,n){(n==null||n>e.length)&&(n=e.length);for(var t=0,o=new Array(n);t<n;t++)o[t]=e[t];return o}function qt(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Gt(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function gn(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),t.push.apply(t,o)}return t}function Zn(e){for(var n=1;n<arguments.length;n++){var t=arguments[n]!=null?arguments[n]:{};n%2?gn(Object(t),!0).forEach(function(o){Gt(e,o,t[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):gn(Object(t)).forEach(function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(t,o))})}return e}function Wt(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return function(o){return n.reduceRight(function(a,r){return r(a)},o)}}function Pe(e){return function n(){for(var t=this,o=arguments.length,a=new Array(o),r=0;r<o;r++)a[r]=arguments[r];return a.length>=e.length?e.apply(this,a):function(){for(var s=arguments.length,i=new Array(s),d=0;d<s;d++)i[d]=arguments[d];return n.apply(t,[].concat(a,i))}}}function Be(e){return{}.toString.call(e).includes("Object")}function Yt(e){return!Object.keys(e).length}function Ee(e){return typeof e=="function"}function Jt(e,n){return Object.prototype.hasOwnProperty.call(e,n)}function Xt(e,n){return Be(n)||se("changeType"),Object.keys(n).some(function(t){return!Jt(e,t)})&&se("changeField"),n}function Qt(e){Ee(e)||se("selectorType")}function eo(e){Ee(e)||Be(e)||se("handlerType"),Be(e)&&Object.values(e).some(function(n){return!Ee(n)})&&se("handlersType")}function no(e){e||se("initialIsRequired"),Be(e)||se("initialType"),Yt(e)&&se("initialContent")}function to(e,n){throw new Error(e[n]||e.default)}var oo={initialIsRequired:"initial state is required",initialType:"initial state should be an object",initialContent:"initial state shouldn't be an empty object",handlerType:"handler should be an object or a function",handlersType:"all handlers should be a functions",selectorType:"selector should be a function",changeType:"provided value of changes should be an object",changeField:'it seams you want to change a field in the state which is not specified in the "initial" state',default:"an unknown error accured in `state-local` package"},se=Pe(to)(oo),je={changes:Xt,selector:Qt,handler:eo,initial:no};function ao(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};je.initial(e),je.handler(n);var t={current:e},o=Pe(io)(t,n),a=Pe(so)(t),r=Pe(je.changes)(e),s=Pe(ro)(t);function i(){var c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:function(Z){return Z};return je.selector(c),c(t.current)}function d(c){Wt(o,a,r,s)(c)}return[i,d]}function ro(e,n){return Ee(n)?n(e.current):n}function so(e,n){return e.current=Zn(Zn({},e.current),n),n}function io(e,n,t){return Ee(n)?n(e.current):Object.keys(t).forEach(function(o){var a;return(a=n[o])===null||a===void 0?void 0:a.call(n,e.current[o])}),t}var uo={create:ao},lo={paths:{vs:"https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs"}};function po(e){return function n(){for(var t=this,o=arguments.length,a=new Array(o),r=0;r<o;r++)a[r]=arguments[r];return a.length>=e.length?e.apply(this,a):function(){for(var s=arguments.length,i=new Array(s),d=0;d<s;d++)i[d]=arguments[d];return n.apply(t,[].concat(a,i))}}}function co(e){return{}.toString.call(e).includes("Object")}function yo(e){return e||hn("configIsRequired"),co(e)||hn("configType"),e.urls?(fo(),{paths:{vs:e.urls.monacoBase}}):e}function fo(){console.warn(kn.deprecation)}function mo(e,n){throw new Error(e[n]||e.default)}var kn={configIsRequired:"the configuration object is required",configType:"the configuration object should be an object",default:"an unknown error accured in `@monaco-editor/loader` package",deprecation:`Deprecation warning!
    You are using deprecated way of configuration.

    Instead of using
      monaco.config({ urls: { monacoBase: '...' } })
    use
      monaco.config({ paths: { vs: '...' } })

    For more please check the link https://github.com/suren-atoyan/monaco-loader#config
  `},hn=po(mo)(kn),To={config:yo},go=function(){for(var n=arguments.length,t=new Array(n),o=0;o<n;o++)t[o]=arguments[o];return function(a){return t.reduceRight(function(r,s){return s(r)},a)}};function Cn(e,n){return Object.keys(n).forEach(function(t){n[t]instanceof Object&&e[t]&&Object.assign(n[t],Cn(e[t],n[t]))}),mn(mn({},e),n)}var Zo={type:"cancelation",msg:"operation is manually canceled"};function Ye(e){var n=!1,t=new Promise(function(o,a){e.then(function(r){return n?a(Zo):o(r)}),e.catch(a)});return t.cancel=function(){return n=!0},t}var ho=uo.create({config:lo,isInitialized:!1,resolve:null,reject:null,monaco:null}),jn=Vt(ho,2),ke=jn[0],Ve=jn[1];function bo(e){var n=To.config(e),t=n.monaco,o=Lt(n,["monaco"]);Ve(function(a){return{config:Cn(a.config,o),monaco:t}})}function xo(){var e=ke(function(n){var t=n.monaco,o=n.isInitialized,a=n.resolve;return{monaco:t,isInitialized:o,resolve:a}});if(!e.isInitialized){if(Ve({isInitialized:!0}),e.monaco)return e.resolve(e.monaco),Ye(Je);if(window.monaco&&window.monaco.editor)return Un(window.monaco),e.resolve(window.monaco),Ye(Je);go(vo,Io)(zo)}return Ye(Je)}function vo(e){return document.body.appendChild(e)}function _o(e){var n=document.createElement("script");return e&&(n.src=e),n}function Io(e){var n=ke(function(o){var a=o.config,r=o.reject;return{config:a,reject:r}}),t=_o("".concat(n.config.paths.vs,"/loader.js"));return t.onload=function(){return e()},t.onerror=n.reject,t}function zo(){var e=ke(function(t){var o=t.config,a=t.resolve,r=t.reject;return{config:o,resolve:a,reject:r}}),n=window.require;n.config(e.config),n(["vs/editor/editor.main"],function(t){Un(t),e.resolve(t)},function(t){e.reject(t)})}function Un(e){ke().monaco||Ve({monaco:e})}function Po(){return ke(function(e){var n=e.monaco;return n})}var Je=new Promise(function(e,n){return Ve({resolve:e,reject:n})}),Re={config:bo,init:xo,__getMonacoInstance:Po},Do={wrapper:{display:"flex",position:"relative",textAlign:"initial"},fullWidth:{width:"100%"},hide:{display:"none"}},Xe=Do,So={container:{display:"flex",height:"100%",width:"100%",justifyContent:"center",alignItems:"center"}},wo=So;function Eo({children:e}){return he.createElement("div",{style:wo.container},e)}var Ro=Eo,Ao=Ro;function Oo({width:e,height:n,isEditorReady:t,loading:o,_ref:a,className:r,wrapperProps:s}){return he.createElement("section",{style:{...Xe.wrapper,width:e,height:n},...s},!t&&he.createElement(Ao,null,o),he.createElement("div",{ref:a,style:{...Xe.fullWidth,...!t&&Xe.hide},className:r}))}var ko=Oo,Nn=f.memo(ko);function Co(e){f.useEffect(e,[])}var on=Co;function jo(e,n,t=!0){let o=f.useRef(!0);f.useEffect(o.current||!t?()=>{o.current=!1}:e,n)}var Y=jo;function we(){}function ge(e,n,t,o){return Uo(e,o)||No(e,n,t,o)}function Uo(e,n){return e.editor.getModel(Mn(e,n))}function No(e,n,t,o){return e.editor.createModel(n,t,o?Mn(e,o):void 0)}function Mn(e,n){return e.Uri.parse(n)}function Mo({original:e,modified:n,language:t,originalLanguage:o,modifiedLanguage:a,originalModelPath:r,modifiedModelPath:s,keepCurrentOriginalModel:i=!1,keepCurrentModifiedModel:d=!1,theme:c="light",loading:Z="Loading...",options:l={},height:u="100%",width:m="100%",className:g,wrapperProps:D={},beforeMount:z=we,onMount:h=we}){let[T,x]=f.useState(!1),[k,w]=f.useState(!0),b=f.useRef(null),y=f.useRef(null),M=f.useRef(null),C=f.useRef(h),E=f.useRef(z),K=f.useRef(!1);on(()=>{let v=Re.init();return v.then(R=>(y.current=R)&&w(!1)).catch(R=>R?.type!=="cancelation"&&console.error("Monaco initialization: error:",R)),()=>b.current?U():v.cancel()}),Y(()=>{if(b.current&&y.current){let v=b.current.getOriginalEditor(),R=ge(y.current,e||"",o||t||"text",r||"");R!==v.getModel()&&v.setModel(R)}},[r],T),Y(()=>{if(b.current&&y.current){let v=b.current.getModifiedEditor(),R=ge(y.current,n||"",a||t||"text",s||"");R!==v.getModel()&&v.setModel(R)}},[s],T),Y(()=>{let v=b.current.getModifiedEditor();v.getOption(y.current.editor.EditorOption.readOnly)?v.setValue(n||""):n!==v.getValue()&&(v.executeEdits("",[{range:v.getModel().getFullModelRange(),text:n||"",forceMoveMarkers:!0}]),v.pushUndoStop())},[n],T),Y(()=>{b.current?.getModel()?.original.setValue(e||"")},[e],T),Y(()=>{let{original:v,modified:R}=b.current.getModel();y.current.editor.setModelLanguage(v,o||t||"text"),y.current.editor.setModelLanguage(R,a||t||"text")},[t,o,a],T),Y(()=>{y.current?.editor.setTheme(c)},[c],T),Y(()=>{b.current?.updateOptions(l)},[l],T);let j=f.useCallback(()=>{if(!y.current)return;E.current(y.current);let v=ge(y.current,e||"",o||t||"text",r||""),R=ge(y.current,n||"",a||t||"text",s||"");b.current?.setModel({original:v,modified:R})},[t,n,a,e,o,r,s]),F=f.useCallback(()=>{!K.current&&M.current&&(b.current=y.current.editor.createDiffEditor(M.current,{automaticLayout:!0,...l}),j(),y.current?.editor.setTheme(c),x(!0),K.current=!0)},[l,c,j]);f.useEffect(()=>{T&&C.current(b.current,y.current)},[T]),f.useEffect(()=>{!k&&!T&&F()},[k,T,F]);function U(){let v=b.current?.getModel();i||v?.original?.dispose(),d||v?.modified?.dispose(),b.current?.dispose()}return he.createElement(Nn,{width:m,height:u,isEditorReady:T,loading:Z,_ref:M,className:g,wrapperProps:D})}var Bo=Mo,Ca=f.memo(Bo);function Ko(){let[e,n]=f.useState(Re.__getMonacoInstance());return on(()=>{let t;return e||(t=Re.init(),t.then(o=>{n(o)})),()=>t?.cancel()}),e}var ja=Ko;function Lo(e){let n=f.useRef();return f.useEffect(()=>{n.current=e},[e]),n.current}var Vo=Lo,Ue=new Map;function Fo({defaultValue:e,defaultLanguage:n,defaultPath:t,value:o,language:a,path:r,theme:s="light",line:i,loading:d="Loading...",options:c={},overrideServices:Z={},saveViewState:l=!0,keepCurrentModel:u=!1,width:m="100%",height:g="100%",className:D,wrapperProps:z={},beforeMount:h=we,onMount:T=we,onChange:x,onValidate:k=we}){let[w,b]=f.useState(!1),[y,M]=f.useState(!0),C=f.useRef(null),E=f.useRef(null),K=f.useRef(null),j=f.useRef(T),F=f.useRef(h),U=f.useRef(),v=f.useRef(o),R=Vo(r),ee=f.useRef(!1),J=f.useRef(!1);on(()=>{let V=Re.init();return V.then($=>(C.current=$)&&M(!1)).catch($=>$?.type!=="cancelation"&&console.error("Monaco initialization: error:",$)),()=>E.current?ye():V.cancel()}),Y(()=>{let V=ge(C.current,e||o||"",n||a||"",r||t||"");V!==E.current?.getModel()&&(l&&Ue.set(R,E.current?.saveViewState()),E.current?.setModel(V),l&&E.current?.restoreViewState(Ue.get(r)))},[r],w),Y(()=>{E.current?.updateOptions(c)},[c],w),Y(()=>{!E.current||o===void 0||(E.current.getOption(C.current.editor.EditorOption.readOnly)?E.current.setValue(o):o!==E.current.getValue()&&(J.current=!0,E.current.executeEdits("",[{range:E.current.getModel().getFullModelRange(),text:o,forceMoveMarkers:!0}]),E.current.pushUndoStop(),J.current=!1))},[o],w),Y(()=>{let V=E.current?.getModel();V&&a&&C.current?.editor.setModelLanguage(V,a)},[a],w),Y(()=>{i!==void 0&&E.current?.revealLine(i)},[i],w),Y(()=>{C.current?.editor.setTheme(s)},[s],w);let ce=f.useCallback(()=>{if(!(!K.current||!C.current)&&!ee.current){F.current(C.current);let V=r||t,$=ge(C.current,o||e||"",n||a||"",V||"");E.current=C.current?.editor.create(K.current,{model:$,automaticLayout:!0,...c},Z),l&&E.current.restoreViewState(Ue.get(V)),C.current.editor.setTheme(s),i!==void 0&&E.current.revealLine(i),b(!0),ee.current=!0}},[e,n,t,o,a,r,c,Z,l,s,i]);f.useEffect(()=>{w&&j.current(E.current,C.current)},[w]),f.useEffect(()=>{!y&&!w&&ce()},[y,w,ce]),v.current=o,f.useEffect(()=>{w&&x&&(U.current?.dispose(),U.current=E.current?.onDidChangeModelContent(V=>{J.current||x(E.current.getValue(),V)}))},[w,x]),f.useEffect(()=>{if(w){let V=C.current.editor.onDidChangeMarkers($=>{let p=E.current.getModel()?.uri;if(p&&$.find(_=>_.path===p.path)){let _=C.current.editor.getModelMarkers({resource:p});k?.(_)}});return()=>{V?.dispose()}}return()=>{}},[w,k]);function ye(){U.current?.dispose(),u?l&&Ue.set(r,E.current.saveViewState()):E.current.getModel()?.dispose(),E.current.dispose()}return he.createElement(Nn,{width:m,height:g,isEditorReady:w,loading:d,_ref:K,className:D,wrapperProps:z})}var $o=Fo,Ua=f.memo($o);const{createElement:ve,createContext:Ho,forwardRef:Bn,useCallback:q,useContext:Kn,useEffect:ue,useImperativeHandle:Ln,useLayoutEffect:qo,useMemo:Go,useRef:G,useState:be}=wn,bn=wn[`useId${Math.random()}`.slice(0,5)],Wo=qo,Fe=Ho(null);Fe.displayName="PanelGroupContext";const le=Wo,Yo=typeof bn=="function"?bn:()=>null;let Jo=0;function an(e=null){const n=Yo(),t=G(e||n||null);return t.current===null&&(t.current=""+Jo++),e??t.current}function Vn({children:e,className:n="",collapsedSize:t,collapsible:o,defaultSize:a,forwardedRef:r,id:s,maxSize:i,minSize:d,onCollapse:c,onExpand:Z,onResize:l,order:u,style:m,tagName:g="div",...D}){const z=Kn(Fe);if(z===null)throw Error("Panel components must be rendered within a PanelGroup container");const{collapsePanel:h,expandPanel:T,getPanelSize:x,getPanelStyle:k,groupId:w,isPanelCollapsed:b,reevaluatePanelConstraints:y,registerPanel:M,resizePanel:C,unregisterPanel:E}=z,K=an(s),j=G({callbacks:{onCollapse:c,onExpand:Z,onResize:l},constraints:{collapsedSize:t,collapsible:o,defaultSize:a,maxSize:i,minSize:d},id:K,idIsFromProps:s!==void 0,order:u});G({didLogMissingDefaultSizeWarning:!1}),le(()=>{const{callbacks:U,constraints:v}=j.current,R={...v};j.current.id=K,j.current.idIsFromProps=s!==void 0,j.current.order=u,U.onCollapse=c,U.onExpand=Z,U.onResize=l,v.collapsedSize=t,v.collapsible=o,v.defaultSize=a,v.maxSize=i,v.minSize=d,(R.collapsedSize!==v.collapsedSize||R.collapsible!==v.collapsible||R.maxSize!==v.maxSize||R.minSize!==v.minSize)&&y(j.current,R)}),le(()=>{const U=j.current;return M(U),()=>{E(U)}},[u,K,M,E]),Ln(r,()=>({collapse:()=>{h(j.current)},expand:U=>{T(j.current,U)},getId(){return K},getSize(){return x(j.current)},isCollapsed(){return b(j.current)},isExpanded(){return!b(j.current)},resize:U=>{C(j.current,U)}}),[h,T,x,b,K,C]);const F=k(j.current,a);return ve(g,{...D,children:e,className:n,id:s,style:{...F,...m},"data-panel":"","data-panel-collapsible":o||void 0,"data-panel-group-id":w,"data-panel-id":K,"data-panel-size":parseFloat(""+F.flexGrow).toFixed(1)})}const Xo=Bn((e,n)=>ve(Vn,{...e,forwardedRef:n}));Vn.displayName="Panel";Xo.displayName="forwardRef(Panel)";let tn=null,de=null;function Qo(e,n){if(n){const t=(n&Gn)!==0,o=(n&Wn)!==0,a=(n&Yn)!==0,r=(n&Jn)!==0;if(t)return a?"se-resize":r?"ne-resize":"e-resize";if(o)return a?"sw-resize":r?"nw-resize":"w-resize";if(a)return"s-resize";if(r)return"n-resize"}switch(e){case"horizontal":return"ew-resize";case"intersection":return"move";case"vertical":return"ns-resize"}}function ea(){de!==null&&(document.head.removeChild(de),tn=null,de=null)}function Qe(e,n){const t=Qo(e,n);tn!==t&&(tn=t,de===null&&(de=document.createElement("style"),document.head.appendChild(de)),de.innerHTML=`*{cursor: ${t}!important;}`)}function Fn(e){return e.type==="keydown"}function $n(e){return e.type.startsWith("pointer")}function Hn(e){return e.type.startsWith("mouse")}function $e(e){if($n(e)){if(e.isPrimary)return{x:e.clientX,y:e.clientY}}else if(Hn(e))return{x:e.clientX,y:e.clientY};return{x:1/0,y:1/0}}function na(){if(typeof matchMedia=="function")return matchMedia("(pointer:coarse)").matches?"coarse":"fine"}function ta(e,n,t){return e.x<n.x+n.width&&e.x+e.width>n.x&&e.y<n.y+n.height&&e.y+e.height>n.y}function oa(e,n){if(e===n)throw new Error("Cannot compare node with itself");const t={a:_n(e),b:_n(n)};let o;for(;t.a.at(-1)===t.b.at(-1);)e=t.a.pop(),n=t.b.pop(),o=e;P(o,"Stacking order can only be calculated for elements with a common ancestor");const a={a:vn(xn(t.a)),b:vn(xn(t.b))};if(a.a===a.b){const r=o.childNodes,s={a:t.a.at(-1),b:t.b.at(-1)};let i=r.length;for(;i--;){const d=r[i];if(d===s.a)return 1;if(d===s.b)return-1}}return Math.sign(a.a-a.b)}const aa=/\b(?:position|zIndex|opacity|transform|webkitTransform|mixBlendMode|filter|webkitFilter|isolation)\b/;function ra(e){var n;const t=getComputedStyle((n=qn(e))!==null&&n!==void 0?n:e).display;return t==="flex"||t==="inline-flex"}function sa(e){const n=getComputedStyle(e);return!!(n.position==="fixed"||n.zIndex!=="auto"&&(n.position!=="static"||ra(e))||+n.opacity<1||"transform"in n&&n.transform!=="none"||"webkitTransform"in n&&n.webkitTransform!=="none"||"mixBlendMode"in n&&n.mixBlendMode!=="normal"||"filter"in n&&n.filter!=="none"||"webkitFilter"in n&&n.webkitFilter!=="none"||"isolation"in n&&n.isolation==="isolate"||aa.test(n.willChange)||n.webkitOverflowScrolling==="touch")}function xn(e){let n=e.length;for(;n--;){const t=e[n];if(P(t,"Missing node"),sa(t))return t}return null}function vn(e){return e&&Number(getComputedStyle(e).zIndex)||0}function _n(e){const n=[];for(;e;)n.push(e),e=qn(e);return n}function qn(e){const{parentNode:n}=e;return n&&n instanceof ShadowRoot?n.host:n}const Gn=1,Wn=2,Yn=4,Jn=8,ia=na()==="coarse";let Q=[],xe=!1,re=new Map,He=new Map;const Ae=new Set;function da(e,n,t,o,a){var r;const{ownerDocument:s}=n,i={direction:t,element:n,hitAreaMargins:o,setResizeHandlerState:a},d=(r=re.get(s))!==null&&r!==void 0?r:0;return re.set(s,d+1),Ae.add(i),Ke(),function(){var Z;He.delete(e),Ae.delete(i);const l=(Z=re.get(s))!==null&&Z!==void 0?Z:1;if(re.set(s,l-1),Ke(),l===1&&re.delete(s),Q.includes(i)){const u=Q.indexOf(i);u>=0&&Q.splice(u,1),sn(),a("up",!0,null)}}}function In(e){const{target:n}=e,{x:t,y:o}=$e(e);xe=!0,rn({target:n,x:t,y:o}),Ke(),Q.length>0&&(Le("down",e),e.preventDefault(),e.stopPropagation())}function ze(e){const{x:n,y:t}=$e(e);if(xe&&e.buttons===0&&(xe=!1,Le("up",e)),!xe){const{target:o}=e;rn({target:o,x:n,y:t})}Le("move",e),sn(),Q.length>0&&e.preventDefault()}function fe(e){const{target:n}=e,{x:t,y:o}=$e(e);He.clear(),xe=!1,Q.length>0&&e.preventDefault(),Le("up",e),rn({target:n,x:t,y:o}),sn(),Ke()}function rn({target:e,x:n,y:t}){Q.splice(0);let o=null;(e instanceof HTMLElement||e instanceof SVGElement)&&(o=e),Ae.forEach(a=>{const{element:r,hitAreaMargins:s}=a,i=r.getBoundingClientRect(),{bottom:d,left:c,right:Z,top:l}=i,u=ia?s.coarse:s.fine;if(n>=c-u&&n<=Z+u&&t>=l-u&&t<=d+u){if(o!==null&&document.contains(o)&&r!==o&&!r.contains(o)&&!o.contains(r)&&oa(o,r)>0){let g=o,D=!1;for(;g&&!g.contains(r);){if(ta(g.getBoundingClientRect(),i)){D=!0;break}g=g.parentElement}if(D)return}Q.push(a)}})}function en(e,n){He.set(e,n)}function sn(){let e=!1,n=!1;Q.forEach(o=>{const{direction:a}=o;a==="horizontal"?e=!0:n=!0});let t=0;He.forEach(o=>{t|=o}),e&&n?Qe("intersection",t):e?Qe("horizontal",t):n?Qe("vertical",t):ea()}function Ke(){re.forEach((e,n)=>{const{body:t}=n;t.removeEventListener("contextmenu",fe),t.removeEventListener("pointerdown",In),t.removeEventListener("pointerleave",ze),t.removeEventListener("pointermove",ze)}),window.removeEventListener("pointerup",fe),window.removeEventListener("pointercancel",fe),Ae.size>0&&(xe?(Q.length>0&&re.forEach((e,n)=>{const{body:t}=n;e>0&&(t.addEventListener("contextmenu",fe),t.addEventListener("pointerleave",ze),t.addEventListener("pointermove",ze))}),window.addEventListener("pointerup",fe),window.addEventListener("pointercancel",fe)):re.forEach((e,n)=>{const{body:t}=n;e>0&&(t.addEventListener("pointerdown",In,{capture:!0}),t.addEventListener("pointermove",ze))}))}function Le(e,n){Ae.forEach(t=>{const{setResizeHandlerState:o}=t,a=Q.includes(t);o(e,a,n)})}function ua(){const[e,n]=be(0);return q(()=>n(t=>t+1),[])}function P(e,n){if(!e)throw console.error(n),Error(n)}const dn=10;function pe(e,n,t=dn){return e.toFixed(t)===n.toFixed(t)?0:e>n?1:-1}function oe(e,n,t=dn){return pe(e,n,t)===0}function W(e,n,t){return pe(e,n,t)===0}function la(e,n,t){if(e.length!==n.length)return!1;for(let o=0;o<e.length;o++){const a=e[o],r=n[o];if(!W(a,r,t))return!1}return!0}function Ze({panelConstraints:e,panelIndex:n,size:t}){const o=e[n];P(o!=null,`Panel constraints not found for index ${n}`);let{collapsedSize:a=0,collapsible:r,maxSize:s=100,minSize:i=0}=o;if(pe(t,i)<0)if(r){const d=(a+i)/2;pe(t,d)<0?t=a:t=i}else t=i;return t=Math.min(s,t),t=parseFloat(t.toFixed(dn)),t}function De({delta:e,initialLayout:n,panelConstraints:t,pivotIndices:o,prevLayout:a,trigger:r}){if(W(e,0))return n;const s=[...n],[i,d]=o;P(i!=null,"Invalid first pivot index"),P(d!=null,"Invalid second pivot index");let c=0;if(r==="keyboard"){{const l=e<0?d:i,u=t[l];P(u,`Panel constraints not found for index ${l}`);const{collapsedSize:m=0,collapsible:g,minSize:D=0}=u;if(g){const z=n[l];if(P(z!=null,`Previous layout not found for panel index ${l}`),W(z,m)){const h=D-z;pe(h,Math.abs(e))>0&&(e=e<0?0-h:h)}}}{const l=e<0?i:d,u=t[l];P(u,`No panel constraints found for index ${l}`);const{collapsedSize:m=0,collapsible:g,minSize:D=0}=u;if(g){const z=n[l];if(P(z!=null,`Previous layout not found for panel index ${l}`),W(z,D)){const h=z-m;pe(h,Math.abs(e))>0&&(e=e<0?0-h:h)}}}}{const l=e<0?1:-1;let u=e<0?d:i,m=0;for(;;){const D=n[u];P(D!=null,`Previous layout not found for panel index ${u}`);const h=Ze({panelConstraints:t,panelIndex:u,size:100})-D;if(m+=h,u+=l,u<0||u>=t.length)break}const g=Math.min(Math.abs(e),Math.abs(m));e=e<0?0-g:g}{let u=e<0?i:d;for(;u>=0&&u<t.length;){const m=Math.abs(e)-Math.abs(c),g=n[u];P(g!=null,`Previous layout not found for panel index ${u}`);const D=g-m,z=Ze({panelConstraints:t,panelIndex:u,size:D});if(!W(g,z)&&(c+=g-z,s[u]=z,c.toPrecision(3).localeCompare(Math.abs(e).toPrecision(3),void 0,{numeric:!0})>=0))break;e<0?u--:u++}}if(la(a,s))return a;{const l=e<0?d:i,u=n[l];P(u!=null,`Previous layout not found for panel index ${l}`);const m=u+c,g=Ze({panelConstraints:t,panelIndex:l,size:m});if(s[l]=g,!W(g,m)){let D=m-g,h=e<0?d:i;for(;h>=0&&h<t.length;){const T=s[h];P(T!=null,`Previous layout not found for panel index ${h}`);const x=T+D,k=Ze({panelConstraints:t,panelIndex:h,size:x});if(W(T,k)||(D-=k-T,s[h]=k),W(D,0))break;e>0?h--:h++}}}const Z=s.reduce((l,u)=>u+l,0);return W(Z,100)?s:a}function pa({layout:e,panelsArray:n,pivotIndices:t}){let o=0,a=100,r=0,s=0;const i=t[0];P(i!=null,"No pivot index found"),n.forEach((l,u)=>{const{constraints:m}=l,{maxSize:g=100,minSize:D=0}=m;u===i?(o=D,a=g):(r+=D,s+=g)});const d=Math.min(a,100-r),c=Math.max(o,100-s),Z=e[i];return{valueMax:d,valueMin:c,valueNow:Z}}function Oe(e,n=document){return Array.from(n.querySelectorAll(`[data-panel-resize-handle-id][data-panel-group-id="${e}"]`))}function Xn(e,n,t=document){const a=Oe(e,t).findIndex(r=>r.getAttribute("data-panel-resize-handle-id")===n);return a??null}function Qn(e,n,t){const o=Xn(e,n,t);return o!=null?[o,o+1]:[-1,-1]}function et(e,n=document){var t;if(n instanceof HTMLElement&&(n==null||(t=n.dataset)===null||t===void 0?void 0:t.panelGroupId)==e)return n;const o=n.querySelector(`[data-panel-group][data-panel-group-id="${e}"]`);return o||null}function qe(e,n=document){const t=n.querySelector(`[data-panel-resize-handle-id="${e}"]`);return t||null}function ca(e,n,t,o=document){var a,r,s,i;const d=qe(n,o),c=Oe(e,o),Z=d?c.indexOf(d):-1,l=(a=(r=t[Z])===null||r===void 0?void 0:r.id)!==null&&a!==void 0?a:null,u=(s=(i=t[Z+1])===null||i===void 0?void 0:i.id)!==null&&s!==void 0?s:null;return[l,u]}function ya({committedValuesRef:e,eagerValuesRef:n,groupId:t,layout:o,panelDataArray:a,panelGroupElement:r,setLayout:s}){G({didWarnAboutMissingResizeHandle:!1}),le(()=>{if(!r)return;const i=Oe(t,r);for(let d=0;d<a.length-1;d++){const{valueMax:c,valueMin:Z,valueNow:l}=pa({layout:o,panelsArray:a,pivotIndices:[d,d+1]}),u=i[d];if(u!=null){const m=a[d];P(m,`No panel data found for index "${d}"`),u.setAttribute("aria-controls",m.id),u.setAttribute("aria-valuemax",""+Math.round(c)),u.setAttribute("aria-valuemin",""+Math.round(Z)),u.setAttribute("aria-valuenow",l!=null?""+Math.round(l):"")}}return()=>{i.forEach((d,c)=>{d.removeAttribute("aria-controls"),d.removeAttribute("aria-valuemax"),d.removeAttribute("aria-valuemin"),d.removeAttribute("aria-valuenow")})}},[t,o,a,r]),ue(()=>{if(!r)return;const i=n.current;P(i,"Eager values not found");const{panelDataArray:d}=i,c=et(t,r);P(c!=null,`No group found for id "${t}"`);const Z=Oe(t,r);P(Z,`No resize handles found for group id "${t}"`);const l=Z.map(u=>{const m=u.getAttribute("data-panel-resize-handle-id");P(m,"Resize handle element has no handle id attribute");const[g,D]=ca(t,m,d,r);if(g==null||D==null)return()=>{};const z=h=>{if(!h.defaultPrevented)switch(h.key){case"Enter":{h.preventDefault();const T=d.findIndex(x=>x.id===g);if(T>=0){const x=d[T];P(x,`No panel data found for index ${T}`);const k=o[T],{collapsedSize:w=0,collapsible:b,minSize:y=0}=x.constraints;if(k!=null&&b){const M=De({delta:W(k,w)?y-w:w-k,initialLayout:o,panelConstraints:d.map(C=>C.constraints),pivotIndices:Qn(t,m,r),prevLayout:o,trigger:"keyboard"});o!==M&&s(M)}}break}}};return u.addEventListener("keydown",z),()=>{u.removeEventListener("keydown",z)}});return()=>{l.forEach(u=>u())}},[r,e,n,t,o,a,s])}function zn(e,n){if(e.length!==n.length)return!1;for(let t=0;t<e.length;t++)if(e[t]!==n[t])return!1;return!0}function nt(e,n){const t=e==="horizontal",{x:o,y:a}=$e(n);return t?o:a}function fa(e,n,t,o,a){const r=t==="horizontal",s=qe(n,a);P(s,`No resize handle element found for id "${n}"`);const i=s.getAttribute("data-panel-group-id");P(i,"Resize handle element has no group id attribute");let{initialCursorPosition:d}=o;const c=nt(t,e),Z=et(i,a);P(Z,`No group element found for id "${i}"`);const l=Z.getBoundingClientRect(),u=r?l.width:l.height;return(c-d)/u*100}function ma(e,n,t,o,a,r){if(Fn(e)){const s=t==="horizontal";let i=0;e.shiftKey?i=100:a!=null?i=a:i=10;let d=0;switch(e.key){case"ArrowDown":d=s?0:i;break;case"ArrowLeft":d=s?-i:0;break;case"ArrowRight":d=s?i:0;break;case"ArrowUp":d=s?0:-i;break;case"End":d=100;break;case"Home":d=-100;break}return d}else return o==null?0:fa(e,n,t,o,r)}function Ta({panelDataArray:e}){const n=Array(e.length),t=e.map(r=>r.constraints);let o=0,a=100;for(let r=0;r<e.length;r++){const s=t[r];P(s,`Panel constraints not found for index ${r}`);const{defaultSize:i}=s;i!=null&&(o++,n[r]=i,a-=i)}for(let r=0;r<e.length;r++){const s=t[r];P(s,`Panel constraints not found for index ${r}`);const{defaultSize:i}=s;if(i!=null)continue;const d=e.length-o,c=a/d;o++,n[r]=c,a-=c}return n}function me(e,n,t){n.forEach((o,a)=>{const r=e[a];P(r,`Panel data not found for index ${a}`);const{callbacks:s,constraints:i,id:d}=r,{collapsedSize:c=0,collapsible:Z}=i,l=t[d];if(l==null||o!==l){t[d]=o;const{onCollapse:u,onExpand:m,onResize:g}=s;g&&g(o,l),Z&&(u||m)&&(m&&(l==null||oe(l,c))&&!oe(o,c)&&m(),u&&(l==null||!oe(l,c))&&oe(o,c)&&u())}})}function Ne(e,n){if(e.length!==n.length)return!1;for(let t=0;t<e.length;t++)if(e[t]!=n[t])return!1;return!0}function ga({defaultSize:e,dragState:n,layout:t,panelData:o,panelIndex:a,precision:r=3}){const s=t[a];let i;return s==null?i=e!=null?e.toPrecision(r):"1":o.length===1?i="1":i=s.toPrecision(r),{flexBasis:0,flexGrow:i,flexShrink:1,overflow:"hidden",pointerEvents:n!==null?"none":void 0}}function Za(e,n=10){let t=null;return(...a)=>{t!==null&&clearTimeout(t),t=setTimeout(()=>{e(...a)},n)}}function Pn(e){try{if(typeof localStorage<"u")e.getItem=n=>localStorage.getItem(n),e.setItem=(n,t)=>{localStorage.setItem(n,t)};else throw new Error("localStorage not supported in this environment")}catch(n){console.error(n),e.getItem=()=>null,e.setItem=()=>{}}}function tt(e){return`react-resizable-panels:${e}`}function ot(e){return e.map(n=>{const{constraints:t,id:o,idIsFromProps:a,order:r}=n;return a?o:r?`${r}:${JSON.stringify(t)}`:JSON.stringify(t)}).sort((n,t)=>n.localeCompare(t)).join(",")}function at(e,n){try{const t=tt(e),o=n.getItem(t);if(o){const a=JSON.parse(o);if(typeof a=="object"&&a!=null)return a}}catch{}return null}function ha(e,n,t){var o,a;const r=(o=at(e,t))!==null&&o!==void 0?o:{},s=ot(n);return(a=r[s])!==null&&a!==void 0?a:null}function ba(e,n,t,o,a){var r;const s=tt(e),i=ot(n),d=(r=at(e,a))!==null&&r!==void 0?r:{};d[i]={expandToSizes:Object.fromEntries(t.entries()),layout:o};try{a.setItem(s,JSON.stringify(d))}catch(c){console.error(c)}}function Dn({layout:e,panelConstraints:n}){const t=[...e],o=t.reduce((r,s)=>r+s,0);if(t.length!==n.length)throw Error(`Invalid ${n.length} panel layout: ${t.map(r=>`${r}%`).join(", ")}`);if(!W(o,100)&&t.length>0)for(let r=0;r<n.length;r++){const s=t[r];P(s!=null,`No layout data found for index ${r}`);const i=100/o*s;t[r]=i}let a=0;for(let r=0;r<n.length;r++){const s=t[r];P(s!=null,`No layout data found for index ${r}`);const i=Ze({panelConstraints:n,panelIndex:r,size:s});s!=i&&(a+=s-i,t[r]=i)}if(!W(a,0))for(let r=0;r<n.length;r++){const s=t[r];P(s!=null,`No layout data found for index ${r}`);const i=s+a,d=Ze({panelConstraints:n,panelIndex:r,size:i});if(s!==d&&(a-=d-s,t[r]=d,W(a,0)))break}return t}const xa=100,Se={getItem:e=>(Pn(Se),Se.getItem(e)),setItem:(e,n)=>{Pn(Se),Se.setItem(e,n)}},Sn={};function rt({autoSaveId:e=null,children:n,className:t="",direction:o,forwardedRef:a,id:r=null,onLayout:s=null,keyboardResizeBy:i=null,storage:d=Se,style:c,tagName:Z="div",...l}){const u=an(r),m=G(null),[g,D]=be(null),[z,h]=be([]),T=ua(),x=G({}),k=G(new Map),w=G(0),b=G({autoSaveId:e,direction:o,dragState:g,id:u,keyboardResizeBy:i,onLayout:s,storage:d}),y=G({layout:z,panelDataArray:[],panelDataArrayChanged:!1});G({didLogIdAndOrderWarning:!1,didLogPanelConstraintsWarning:!1,prevPanelIds:[]}),Ln(a,()=>({getId:()=>b.current.id,getLayout:()=>{const{layout:p}=y.current;return p},setLayout:p=>{const{onLayout:_}=b.current,{layout:A,panelDataArray:S}=y.current,I=Dn({layout:p,panelConstraints:S.map(O=>O.constraints)});zn(A,I)||(h(I),y.current.layout=I,_&&_(I),me(S,I,x.current))}}),[]),le(()=>{b.current.autoSaveId=e,b.current.direction=o,b.current.dragState=g,b.current.id=u,b.current.onLayout=s,b.current.storage=d}),ya({committedValuesRef:b,eagerValuesRef:y,groupId:u,layout:z,panelDataArray:y.current.panelDataArray,setLayout:h,panelGroupElement:m.current}),ue(()=>{const{panelDataArray:p}=y.current;if(e){if(z.length===0||z.length!==p.length)return;let _=Sn[e];_==null&&(_=Za(ba,xa),Sn[e]=_);const A=[...p],S=new Map(k.current);_(e,A,S,z,d)}},[e,z,d]),ue(()=>{});const M=q(p=>{const{onLayout:_}=b.current,{layout:A,panelDataArray:S}=y.current;if(p.constraints.collapsible){const I=S.map(ne=>ne.constraints),{collapsedSize:O=0,panelSize:N,pivotIndices:L}=ie(S,p,A);if(P(N!=null,`Panel size not found for panel "${p.id}"`),!oe(N,O)){k.current.set(p.id,N);const te=Te(S,p)===S.length-1?N-O:O-N,B=De({delta:te,initialLayout:A,panelConstraints:I,pivotIndices:L,prevLayout:A,trigger:"imperative-api"});Ne(A,B)||(h(B),y.current.layout=B,_&&_(B),me(S,B,x.current))}}},[]),C=q((p,_)=>{const{onLayout:A}=b.current,{layout:S,panelDataArray:I}=y.current;if(p.constraints.collapsible){const O=I.map(X=>X.constraints),{collapsedSize:N=0,panelSize:L=0,minSize:ne=0,pivotIndices:te}=ie(I,p,S),B=_??ne;if(oe(L,N)){const X=k.current.get(p.id),_e=X!=null&&X>=B?X:B,Ge=Te(I,p)===I.length-1?L-_e:_e-L,H=De({delta:Ge,initialLayout:S,panelConstraints:O,pivotIndices:te,prevLayout:S,trigger:"imperative-api"});Ne(S,H)||(h(H),y.current.layout=H,A&&A(H),me(I,H,x.current))}}},[]),E=q(p=>{const{layout:_,panelDataArray:A}=y.current,{panelSize:S}=ie(A,p,_);return P(S!=null,`Panel size not found for panel "${p.id}"`),S},[]),K=q((p,_)=>{const{panelDataArray:A}=y.current,S=Te(A,p);return ga({defaultSize:_,dragState:g,layout:z,panelData:A,panelIndex:S})},[g,z]),j=q(p=>{const{layout:_,panelDataArray:A}=y.current,{collapsedSize:S=0,collapsible:I,panelSize:O}=ie(A,p,_);return P(O!=null,`Panel size not found for panel "${p.id}"`),I===!0&&oe(O,S)},[]),F=q(p=>{const{layout:_,panelDataArray:A}=y.current,{collapsedSize:S=0,collapsible:I,panelSize:O}=ie(A,p,_);return P(O!=null,`Panel size not found for panel "${p.id}"`),!I||pe(O,S)>0},[]),U=q(p=>{const{panelDataArray:_}=y.current;_.push(p),_.sort((A,S)=>{const I=A.order,O=S.order;return I==null&&O==null?0:I==null?-1:O==null?1:I-O}),y.current.panelDataArrayChanged=!0,T()},[T]);le(()=>{if(y.current.panelDataArrayChanged){y.current.panelDataArrayChanged=!1;const{autoSaveId:p,onLayout:_,storage:A}=b.current,{layout:S,panelDataArray:I}=y.current;let O=null;if(p){const L=ha(p,I,A);L&&(k.current=new Map(Object.entries(L.expandToSizes)),O=L.layout)}O==null&&(O=Ta({panelDataArray:I}));const N=Dn({layout:O,panelConstraints:I.map(L=>L.constraints)});zn(S,N)||(h(N),y.current.layout=N,_&&_(N),me(I,N,x.current))}}),le(()=>{const p=y.current;return()=>{p.layout=[]}},[]);const v=q(p=>{let _=!1;const A=m.current;return A&&window.getComputedStyle(A,null).getPropertyValue("direction")==="rtl"&&(_=!0),function(I){I.preventDefault();const O=m.current;if(!O)return()=>null;const{direction:N,dragState:L,id:ne,keyboardResizeBy:te,onLayout:B}=b.current,{layout:X,panelDataArray:_e}=y.current,{initialLayout:Ce}=L??{},Ge=Qn(ne,p,O);let H=ma(I,p,N,L,te,O);const un=N==="horizontal";un&&_&&(H=-H);const st=_e.map(it=>it.constraints),Ie=De({delta:H,initialLayout:Ce??X,panelConstraints:st,pivotIndices:Ge,prevLayout:X,trigger:Fn(I)?"keyboard":"mouse-or-touch"}),ln=!Ne(X,Ie);($n(I)||Hn(I))&&w.current!=H&&(w.current=H,!ln&&H!==0?un?en(p,H<0?Gn:Wn):en(p,H<0?Yn:Jn):en(p,0)),ln&&(h(Ie),y.current.layout=Ie,B&&B(Ie),me(_e,Ie,x.current))}},[]),R=q((p,_)=>{const{onLayout:A}=b.current,{layout:S,panelDataArray:I}=y.current,O=I.map(X=>X.constraints),{panelSize:N,pivotIndices:L}=ie(I,p,S);P(N!=null,`Panel size not found for panel "${p.id}"`);const te=Te(I,p)===I.length-1?N-_:_-N,B=De({delta:te,initialLayout:S,panelConstraints:O,pivotIndices:L,prevLayout:S,trigger:"imperative-api"});Ne(S,B)||(h(B),y.current.layout=B,A&&A(B),me(I,B,x.current))},[]),ee=q((p,_)=>{const{layout:A,panelDataArray:S}=y.current,{collapsedSize:I=0,collapsible:O}=_,{collapsedSize:N=0,collapsible:L,maxSize:ne=100,minSize:te=0}=p.constraints,{panelSize:B}=ie(S,p,A);B!=null&&(O&&L&&oe(B,I)?oe(I,N)||R(p,N):B<te?R(p,te):B>ne&&R(p,ne))},[R]),J=q((p,_)=>{const{direction:A}=b.current,{layout:S}=y.current;if(!m.current)return;const I=qe(p,m.current);P(I,`Drag handle element not found for id "${p}"`);const O=nt(A,_);D({dragHandleId:p,dragHandleRect:I.getBoundingClientRect(),initialCursorPosition:O,initialLayout:S})},[]),ce=q(()=>{D(null)},[]),ye=q(p=>{const{panelDataArray:_}=y.current,A=Te(_,p);A>=0&&(_.splice(A,1),delete x.current[p.id],y.current.panelDataArrayChanged=!0,T())},[T]),V=Go(()=>({collapsePanel:M,direction:o,dragState:g,expandPanel:C,getPanelSize:E,getPanelStyle:K,groupId:u,isPanelCollapsed:j,isPanelExpanded:F,reevaluatePanelConstraints:ee,registerPanel:U,registerResizeHandle:v,resizePanel:R,startDragging:J,stopDragging:ce,unregisterPanel:ye,panelGroupElement:m.current}),[M,g,o,C,E,K,u,j,F,ee,U,v,R,J,ce,ye]),$={display:"flex",flexDirection:o==="horizontal"?"row":"column",height:"100%",overflow:"hidden",width:"100%"};return ve(Fe.Provider,{value:V},ve(Z,{...l,children:n,className:t,id:r,ref:m,style:{...$,...c},"data-panel-group":"","data-panel-group-direction":o,"data-panel-group-id":u}))}const va=Bn((e,n)=>ve(rt,{...e,forwardedRef:n}));rt.displayName="PanelGroup";va.displayName="forwardRef(PanelGroup)";function Te(e,n){return e.findIndex(t=>t===n||t.id===n.id)}function ie(e,n,t){const o=Te(e,n),r=o===e.length-1?[o-1,o]:[o,o+1],s=t[o];return{...n.constraints,panelSize:s,pivotIndices:r}}function _a({disabled:e,handleId:n,resizeHandler:t,panelGroupElement:o}){ue(()=>{if(e||t==null||o==null)return;const a=qe(n,o);if(a==null)return;const r=s=>{if(!s.defaultPrevented)switch(s.key){case"ArrowDown":case"ArrowLeft":case"ArrowRight":case"ArrowUp":case"End":case"Home":{s.preventDefault(),t(s);break}case"F6":{s.preventDefault();const i=a.getAttribute("data-panel-group-id");P(i,`No group element found for id "${i}"`);const d=Oe(i,o),c=Xn(i,n,o);P(c!==null,`No resize element found for id "${n}"`);const Z=s.shiftKey?c>0?c-1:d.length-1:c+1<d.length?c+1:0;d[Z].focus();break}}};return a.addEventListener("keydown",r),()=>{a.removeEventListener("keydown",r)}},[o,e,n,t])}function Ia({children:e=null,className:n="",disabled:t=!1,hitAreaMargins:o,id:a,onBlur:r,onDragging:s,onFocus:i,style:d={},tabIndex:c=0,tagName:Z="div",...l}){var u,m;const g=G(null),D=G({onDragging:s});ue(()=>{D.current.onDragging=s});const z=Kn(Fe);if(z===null)throw Error("PanelResizeHandle components must be rendered within a PanelGroup container");const{direction:h,groupId:T,registerResizeHandle:x,startDragging:k,stopDragging:w,panelGroupElement:b}=z,y=an(a),[M,C]=be("inactive"),[E,K]=be(!1),[j,F]=be(null),U=G({state:M});le(()=>{U.current.state=M}),ue(()=>{if(t)F(null);else{const J=x(y);F(()=>J)}},[t,y,x]);const v=(u=o?.coarse)!==null&&u!==void 0?u:15,R=(m=o?.fine)!==null&&m!==void 0?m:5;return ue(()=>{if(t||j==null)return;const J=g.current;return P(J,"Element ref not attached"),da(y,J,h,{coarse:v,fine:R},(ye,V,$)=>{if(V)switch(ye){case"down":{C("drag"),P($,'Expected event to be defined for "down" action'),k(y,$);const{onDragging:p}=D.current;p&&p(!0);break}case"move":{const{state:p}=U.current;p!=="drag"&&C("hover"),P($,'Expected event to be defined for "move" action'),j($);break}case"up":{C("hover"),w();const{onDragging:p}=D.current;p&&p(!1);break}}else C("inactive")})},[v,h,t,R,x,y,j,k,w]),_a({disabled:t,handleId:y,resizeHandler:j,panelGroupElement:b}),ve(Z,{...l,children:e,className:n,id:a,onBlur:()=>{K(!1),r?.()},onFocus:()=>{K(!0),i?.()},ref:g,role:"separator",style:{...{touchAction:"none",userSelect:"none"},...d},tabIndex:c,"data-panel-group-direction":h,"data-panel-group-id":T,"data-resize-handle":"","data-resize-handle-active":M==="drag"?"pointer":E?"keyboard":void 0,"data-resize-handle-state":M,"data-panel-resize-handle-enabled":!t,"data-panel-resize-handle-id":y})}Ia.displayName="PanelResizeHandle";self.monaco&&Re.config({monaco:self.monaco});export{ja as L,va as P,Sa as R,wt as S,Ua as a,Xo as b,wa as c,ka as d,Ia as e,Aa as f,Ra as g,Oa as h,Ea as p,Ca as w};
