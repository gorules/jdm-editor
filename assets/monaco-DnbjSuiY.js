import{r as f,R as be,a as Dn}from"./index-CTjT7uj6.js";import{X as rt,c as ae,q as st,K as it,H as dt,Y as Sn,Z as ut,C as lt,I as pt}from"./wasm-DSB3Eh-p.js";import{_ as ct}from"./wrapNativeSuper-CEh6UYuW.js";function yt(e,n,t){var o=t||{},a=o.noTrailing,r=a===void 0?!1:a,s=o.noLeading,i=s===void 0?!1:s,d=o.debounceMode,c=d===void 0?void 0:d,Z,l=!1,u=0;function T(){Z&&clearTimeout(Z)}function g(I){var h=I||{},m=h.upcomingOnly,x=m===void 0?!1:m;T(),l=!x}function w(){for(var I=arguments.length,h=new Array(I),m=0;m<I;m++)h[m]=arguments[m];var x=this,k=Date.now()-u;if(l)return;function E(){u=Date.now(),n.apply(x,h)}function b(){Z=void 0}!i&&c&&!Z&&E(),T(),c===void 0&&k>e?i?(u=Date.now(),r||(Z=setTimeout(c?b:E,e))):E():r!==!0&&(Z=setTimeout(c?b:E,c===void 0?e-k:e))}return w.cancel=g,w}function ft(e,n,t){var o={},a=o.atBegin,r=a===void 0?!1:a;return yt(e,n,{debounceMode:r!==!1})}const Be=100,wn=Be/5,En=Be/2-wn/2,We=En*2*Math.PI,un=50,ln=e=>{const{dotClassName:n,style:t,hasCircleCls:o}=e;return f.createElement("circle",{className:ae(`${n}-circle`,{[`${n}-circle-bg`]:o}),r:En,cx:un,cy:un,strokeWidth:wn,style:t})},mt=e=>{let{percent:n,prefixCls:t}=e;const o=`${t}-dot`,a=`${o}-holder`,r=`${a}-hidden`,[s,i]=f.useState(!1);rt(()=>{n!==0&&i(!0)},[n!==0]);const d=Math.max(Math.min(n,100),0);if(!s)return null;const c={strokeDashoffset:`${We/4}`,strokeDasharray:`${We*d/100} ${We*(100-d)/100}`};return f.createElement("span",{className:ae(a,`${o}-progress`,d<=0&&r)},f.createElement("svg",{viewBox:`0 0 ${Be} ${Be}`,role:"progressbar","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":d},f.createElement(ln,{dotClassName:o,hasCircleCls:!0}),f.createElement(ln,{dotClassName:o,style:c})))};function Tt(e){const{prefixCls:n,percent:t=0}=e,o=`${n}-dot`,a=`${o}-holder`,r=`${a}-hidden`;return f.createElement(f.Fragment,null,f.createElement("span",{className:ae(a,t>0&&r)},f.createElement("span",{className:ae(o,`${n}-dot-spin`)},[1,2,3,4].map(s=>f.createElement("i",{className:`${n}-dot-item`,key:s})))),f.createElement(mt,{prefixCls:n,percent:t}))}function gt(e){const{prefixCls:n,indicator:t,percent:o}=e,a=`${n}-dot`;return t&&f.isValidElement(t)?st(t,{className:ae(t.props.className,a),percent:o}):f.createElement(Tt,{prefixCls:n,percent:o})}const Zt=new Sn("antSpinMove",{to:{opacity:1}}),ht=new Sn("antRotate",{to:{transform:"rotate(405deg)"}}),bt=e=>{const{componentCls:n,calc:t}=e;return{[n]:Object.assign(Object.assign({},ut(e)),{position:"absolute",display:"none",color:e.colorPrimary,fontSize:0,textAlign:"center",verticalAlign:"middle",opacity:0,transition:`transform ${e.motionDurationSlow} ${e.motionEaseInOutCirc}`,"&-spinning":{position:"relative",display:"inline-block",opacity:1},[`${n}-text`]:{fontSize:e.fontSize,paddingTop:t(t(e.dotSize).sub(e.fontSize)).div(2).add(2).equal()},"&-fullscreen":{position:"fixed",width:"100vw",height:"100vh",backgroundColor:e.colorBgMask,zIndex:e.zIndexPopupBase,inset:0,display:"flex",alignItems:"center",flexDirection:"column",justifyContent:"center",opacity:0,visibility:"hidden",transition:`all ${e.motionDurationMid}`,"&-show":{opacity:1,visibility:"visible"},[n]:{[`${n}-dot-holder`]:{color:e.colorWhite},[`${n}-text`]:{color:e.colorTextLightSolid}}},"&-nested-loading":{position:"relative",[`> div > ${n}`]:{position:"absolute",top:0,insetInlineStart:0,zIndex:4,display:"block",width:"100%",height:"100%",maxHeight:e.contentHeight,[`${n}-dot`]:{position:"absolute",top:"50%",insetInlineStart:"50%",margin:t(e.dotSize).mul(-1).div(2).equal()},[`${n}-text`]:{position:"absolute",top:"50%",width:"100%",textShadow:`0 1px 2px ${e.colorBgContainer}`},[`&${n}-show-text ${n}-dot`]:{marginTop:t(e.dotSize).div(2).mul(-1).sub(10).equal()},"&-sm":{[`${n}-dot`]:{margin:t(e.dotSizeSM).mul(-1).div(2).equal()},[`${n}-text`]:{paddingTop:t(t(e.dotSizeSM).sub(e.fontSize)).div(2).add(2).equal()},[`&${n}-show-text ${n}-dot`]:{marginTop:t(e.dotSizeSM).div(2).mul(-1).sub(10).equal()}},"&-lg":{[`${n}-dot`]:{margin:t(e.dotSizeLG).mul(-1).div(2).equal()},[`${n}-text`]:{paddingTop:t(t(e.dotSizeLG).sub(e.fontSize)).div(2).add(2).equal()},[`&${n}-show-text ${n}-dot`]:{marginTop:t(e.dotSizeLG).div(2).mul(-1).sub(10).equal()}}},[`${n}-container`]:{position:"relative",transition:`opacity ${e.motionDurationSlow}`,"&::after":{position:"absolute",top:0,insetInlineEnd:0,bottom:0,insetInlineStart:0,zIndex:10,width:"100%",height:"100%",background:e.colorBgContainer,opacity:0,transition:`all ${e.motionDurationSlow}`,content:'""',pointerEvents:"none"}},[`${n}-blur`]:{clear:"both",opacity:.5,userSelect:"none",pointerEvents:"none","&::after":{opacity:.4,pointerEvents:"auto"}}},"&-tip":{color:e.spinDotDefault},[`${n}-dot-holder`]:{width:"1em",height:"1em",fontSize:e.dotSize,display:"inline-block",transition:`transform ${e.motionDurationSlow} ease, opacity ${e.motionDurationSlow} ease`,transformOrigin:"50% 50%",lineHeight:1,color:e.colorPrimary,"&-hidden":{transform:"scale(0.3)",opacity:0}},[`${n}-dot-progress`]:{position:"absolute",top:"50%",transform:"translate(-50%, -50%)",insetInlineStart:"50%"},[`${n}-dot`]:{position:"relative",display:"inline-block",fontSize:e.dotSize,width:"1em",height:"1em","&-item":{position:"absolute",display:"block",width:t(e.dotSize).sub(t(e.marginXXS).div(2)).div(2).equal(),height:t(e.dotSize).sub(t(e.marginXXS).div(2)).div(2).equal(),background:"currentColor",borderRadius:"100%",transform:"scale(0.75)",transformOrigin:"50% 50%",opacity:.3,animationName:Zt,animationDuration:"1s",animationIterationCount:"infinite",animationTimingFunction:"linear",animationDirection:"alternate","&:nth-child(1)":{top:0,insetInlineStart:0,animationDelay:"0s"},"&:nth-child(2)":{top:0,insetInlineEnd:0,animationDelay:"0.4s"},"&:nth-child(3)":{insetInlineEnd:0,bottom:0,animationDelay:"0.8s"},"&:nth-child(4)":{bottom:0,insetInlineStart:0,animationDelay:"1.2s"}},"&-spin":{transform:"rotate(45deg)",animationName:ht,animationDuration:"1.2s",animationIterationCount:"infinite",animationTimingFunction:"linear"},"&-circle":{strokeLinecap:"round",transition:["stroke-dashoffset","stroke-dasharray","stroke","stroke-width","opacity"].map(o=>`${o} ${e.motionDurationSlow} ease`).join(","),fillOpacity:0,stroke:"currentcolor"},"&-circle-bg":{stroke:e.colorFillSecondary}},[`&-sm ${n}-dot`]:{"&, &-holder":{fontSize:e.dotSizeSM}},[`&-sm ${n}-dot-holder`]:{i:{width:t(t(e.dotSizeSM).sub(t(e.marginXXS).div(2))).div(2).equal(),height:t(t(e.dotSizeSM).sub(t(e.marginXXS).div(2))).div(2).equal()}},[`&-lg ${n}-dot`]:{"&, &-holder":{fontSize:e.dotSizeLG}},[`&-lg ${n}-dot-holder`]:{i:{width:t(t(e.dotSizeLG).sub(e.marginXXS)).div(2).equal(),height:t(t(e.dotSizeLG).sub(e.marginXXS)).div(2).equal()}},[`&${n}-show-text ${n}-text`]:{display:"block"}})}},xt=e=>{const{controlHeightLG:n,controlHeight:t}=e;return{contentHeight:400,dotSize:n/2,dotSizeSM:n*.35,dotSizeLG:t}},vt=it("Spin",e=>{const n=dt(e,{spinDotDefault:e.colorTextDescription});return[bt(n)]},xt),_t=200,pn=[[30,.05],[70,.03],[96,.01]];function It(e,n){const[t,o]=f.useState(0),a=f.useRef(),r=n==="auto";return f.useEffect(()=>(r&&e&&(o(0),a.current=setInterval(()=>{o(s=>{const i=100-s;for(let d=0;d<pn.length;d+=1){const[c,Z]=pn[d];if(s<=c)return s+i*Z}return s})},_t)),()=>{clearInterval(a.current)}),[r,e]),r?t:n}var zt=function(e,n){var t={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&n.indexOf(o)<0&&(t[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,o=Object.getOwnPropertySymbols(e);a<o.length;a++)n.indexOf(o[a])<0&&Object.prototype.propertyIsEnumerable.call(e,o[a])&&(t[o[a]]=e[o[a]]);return t};let Rn;function Pt(e,n){return!!e&&!!n&&!isNaN(Number(n))}const Dt=e=>{var n;const{prefixCls:t,spinning:o=!0,delay:a=0,className:r,rootClassName:s,size:i="default",tip:d,wrapperClassName:c,style:Z,children:l,fullscreen:u=!1,indicator:T,percent:g}=e,w=zt(e,["prefixCls","spinning","delay","className","rootClassName","size","tip","wrapperClassName","style","children","fullscreen","indicator","percent"]),{getPrefixCls:I,direction:h,spin:m}=f.useContext(lt),x=I("spin",t),[k,E,b]=vt(x),[y,N]=f.useState(()=>o&&!Pt(o,a)),C=It(y,g);f.useEffect(()=>{if(o){const A=ft(a,()=>{N(!0)});return A(),()=>{var ne;(ne=A?.cancel)===null||ne===void 0||ne.call(A)}}N(!1)},[a,o]);const R=f.useMemo(()=>typeof l<"u"&&!u,[l,u]),K=ae(x,m?.className,{[`${x}-sm`]:i==="small",[`${x}-lg`]:i==="large",[`${x}-spinning`]:y,[`${x}-show-text`]:!!d,[`${x}-rtl`]:h==="rtl"},r,!u&&s,E,b),j=ae(`${x}-container`,{[`${x}-blur`]:y}),F=(n=T??m?.indicator)!==null&&n!==void 0?n:Rn,U=Object.assign(Object.assign({},m?.style),Z),v=f.createElement("div",Object.assign({},w,{style:U,className:K,"aria-live":"polite","aria-busy":y}),f.createElement(gt,{prefixCls:x,indicator:F,percent:C}),d&&(R||u)?f.createElement("div",{className:`${x}-text`},d):null);return k(R?f.createElement("div",Object.assign({},w,{className:ae(`${x}-nested-loading`,c,E,b)}),y&&f.createElement("div",{key:"loading"},v),f.createElement("div",{className:j,key:"container"},l)):u?f.createElement("div",{className:ae(`${x}-fullscreen`,{[`${x}-fullscreen-show`]:y},s,E,b)},v):v)};Dt.setDefaultIndicator=e=>{Rn=e};var St={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"defs",attrs:{},children:[{tag:"style",attrs:{}}]},{tag:"path",attrs:{d:"M840 192h-56v-72c0-13.3-10.7-24-24-24H168c-13.3 0-24 10.7-24 24v272c0 13.3 10.7 24 24 24h592c13.3 0 24-10.7 24-24V256h32v200H465c-22.1 0-40 17.9-40 40v136h-44c-4.4 0-8 3.6-8 8v228c0 .6.1 1.3.2 1.9A83.99 83.99 0 00457 960c46.4 0 84-37.6 84-84 0-2.1-.1-4.1-.2-6.1.1-.6.2-1.2.2-1.9V640c0-4.4-3.6-8-8-8h-44V520h351c22.1 0 40-17.9 40-40V232c0-22.1-17.9-40-40-40zM720 352H208V160h512v192zM477 876c0 11-9 20-20 20s-20-9-20-20V696h40v180z"}}]},name:"format-painter",theme:"outlined"},wt=function(n,t){return f.createElement(pt,ct({},n,{ref:t,icon:St}))},Pa=f.forwardRef(wt);const Et=`declare namespace Big {
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
`,Rt=`/// <reference path="./locale/index.d.ts" />

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
`,At=`import zen from 'zen';

/** @type {Handler} **/
export const handler = async (input) => {
  return input;
};
`,Ot=`declare namespace console {
  function log(...args: any[]): void;
  async function sleep(durationMs: number): Promise<void>;
}

interface Config {
  readonly maxDepth: number;
  readonly iteration: number;
  readonly trace: boolean;
}

declare const config: Config;
`,kt=`declare class HttpResponse {
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
`,Ct=`interface EvaluateOptions {
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
`,jt=`declare type Primitive = string | number | symbol | bigint | boolean | null | undefined;
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
`,Da=[{name:"big.js",tagline:"Arbitrary-precision decimal arithmetic",importName:"Big",typeDef:Et,documentationUrl:"https://mikemcl.github.io/big.js/"},{name:"dayjs",tagline:"Date utilities",typeDef:Rt,documentationUrl:"https://day.js.org/docs/en/parse/parse"},{name:"http",tagline:"Promise based HTTP client",typeDef:kt,documentationUrl:"https://docs.gorules.io/reference/http"},{name:"zen",tagline:"Rules engine utilities",typeDef:Ct,documentationUrl:"https://docs.gorules.io/reference/zen"},{name:"zod",tagline:"Schema validation",importName:"z",typeDef:jt,documentationUrl:"https://zod.dev/"}],Sa={globals:{"global.d.ts":Ot}},wa=At;function Ut(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function cn(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),t.push.apply(t,o)}return t}function yn(e){for(var n=1;n<arguments.length;n++){var t=arguments[n]!=null?arguments[n]:{};n%2?cn(Object(t),!0).forEach(function(o){Ut(e,o,t[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):cn(Object(t)).forEach(function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(t,o))})}return e}function Nt(e,n){if(e==null)return{};var t={},o=Object.keys(e),a,r;for(r=0;r<o.length;r++)a=o[r],!(n.indexOf(a)>=0)&&(t[a]=e[a]);return t}function Mt(e,n){if(e==null)return{};var t=Nt(e,n),o,a;if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)o=r[a],!(n.indexOf(o)>=0)&&Object.prototype.propertyIsEnumerable.call(e,o)&&(t[o]=e[o])}return t}function Bt(e,n){return Kt(e)||Lt(e,n)||Vt(e,n)||Ft()}function Kt(e){if(Array.isArray(e))return e}function Lt(e,n){if(!(typeof Symbol>"u"||!(Symbol.iterator in Object(e)))){var t=[],o=!0,a=!1,r=void 0;try{for(var s=e[Symbol.iterator](),i;!(o=(i=s.next()).done)&&(t.push(i.value),!(n&&t.length===n));o=!0);}catch(d){a=!0,r=d}finally{try{!o&&s.return!=null&&s.return()}finally{if(a)throw r}}return t}}function Vt(e,n){if(e){if(typeof e=="string")return fn(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);if(t==="Object"&&e.constructor&&(t=e.constructor.name),t==="Map"||t==="Set")return Array.from(e);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return fn(e,n)}}function fn(e,n){(n==null||n>e.length)&&(n=e.length);for(var t=0,o=new Array(n);t<n;t++)o[t]=e[t];return o}function Ft(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function $t(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function mn(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),t.push.apply(t,o)}return t}function Tn(e){for(var n=1;n<arguments.length;n++){var t=arguments[n]!=null?arguments[n]:{};n%2?mn(Object(t),!0).forEach(function(o){$t(e,o,t[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):mn(Object(t)).forEach(function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(t,o))})}return e}function Ht(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return function(o){return n.reduceRight(function(a,r){return r(a)},o)}}function Pe(e){return function n(){for(var t=this,o=arguments.length,a=new Array(o),r=0;r<o;r++)a[r]=arguments[r];return a.length>=e.length?e.apply(this,a):function(){for(var s=arguments.length,i=new Array(s),d=0;d<s;d++)i[d]=arguments[d];return n.apply(t,[].concat(a,i))}}}function Ke(e){return{}.toString.call(e).includes("Object")}function qt(e){return!Object.keys(e).length}function Ee(e){return typeof e=="function"}function Gt(e,n){return Object.prototype.hasOwnProperty.call(e,n)}function Wt(e,n){return Ke(n)||se("changeType"),Object.keys(n).some(function(t){return!Gt(e,t)})&&se("changeField"),n}function Yt(e){Ee(e)||se("selectorType")}function Xt(e){Ee(e)||Ke(e)||se("handlerType"),Ke(e)&&Object.values(e).some(function(n){return!Ee(n)})&&se("handlersType")}function Jt(e){e||se("initialIsRequired"),Ke(e)||se("initialType"),qt(e)&&se("initialContent")}function Qt(e,n){throw new Error(e[n]||e.default)}var eo={initialIsRequired:"initial state is required",initialType:"initial state should be an object",initialContent:"initial state shouldn't be an empty object",handlerType:"handler should be an object or a function",handlersType:"all handlers should be a functions",selectorType:"selector should be a function",changeType:"provided value of changes should be an object",changeField:'it seams you want to change a field in the state which is not specified in the "initial" state',default:"an unknown error accured in `state-local` package"},se=Pe(Qt)(eo),Ue={changes:Wt,selector:Yt,handler:Xt,initial:Jt};function no(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};Ue.initial(e),Ue.handler(n);var t={current:e},o=Pe(ao)(t,n),a=Pe(oo)(t),r=Pe(Ue.changes)(e),s=Pe(to)(t);function i(){var c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:function(Z){return Z};return Ue.selector(c),c(t.current)}function d(c){Ht(o,a,r,s)(c)}return[i,d]}function to(e,n){return Ee(n)?n(e.current):n}function oo(e,n){return e.current=Tn(Tn({},e.current),n),n}function ao(e,n,t){return Ee(n)?n(e.current):Object.keys(t).forEach(function(o){var a;return(a=n[o])===null||a===void 0?void 0:a.call(n,e.current[o])}),t}var ro={create:no},so={paths:{vs:"https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs"}};function io(e){return function n(){for(var t=this,o=arguments.length,a=new Array(o),r=0;r<o;r++)a[r]=arguments[r];return a.length>=e.length?e.apply(this,a):function(){for(var s=arguments.length,i=new Array(s),d=0;d<s;d++)i[d]=arguments[d];return n.apply(t,[].concat(a,i))}}}function uo(e){return{}.toString.call(e).includes("Object")}function lo(e){return e||gn("configIsRequired"),uo(e)||gn("configType"),e.urls?(po(),{paths:{vs:e.urls.monacoBase}}):e}function po(){console.warn(An.deprecation)}function co(e,n){throw new Error(e[n]||e.default)}var An={configIsRequired:"the configuration object is required",configType:"the configuration object should be an object",default:"an unknown error accured in `@monaco-editor/loader` package",deprecation:`Deprecation warning!
    You are using deprecated way of configuration.

    Instead of using
      monaco.config({ urls: { monacoBase: '...' } })
    use
      monaco.config({ paths: { vs: '...' } })

    For more please check the link https://github.com/suren-atoyan/monaco-loader#config
  `},gn=io(co)(An),yo={config:lo},fo=function(){for(var n=arguments.length,t=new Array(n),o=0;o<n;o++)t[o]=arguments[o];return function(a){return t.reduceRight(function(r,s){return s(r)},a)}};function On(e,n){return Object.keys(n).forEach(function(t){n[t]instanceof Object&&e[t]&&Object.assign(n[t],On(e[t],n[t]))}),yn(yn({},e),n)}var mo={type:"cancelation",msg:"operation is manually canceled"};function Ye(e){var n=!1,t=new Promise(function(o,a){e.then(function(r){return n?a(mo):o(r)}),e.catch(a)});return t.cancel=function(){return n=!0},t}var To=ro.create({config:so,isInitialized:!1,resolve:null,reject:null,monaco:null}),kn=Bt(To,2),ke=kn[0],Fe=kn[1];function go(e){var n=yo.config(e),t=n.monaco,o=Mt(n,["monaco"]);Fe(function(a){return{config:On(a.config,o),monaco:t}})}function Zo(){var e=ke(function(n){var t=n.monaco,o=n.isInitialized,a=n.resolve;return{monaco:t,isInitialized:o,resolve:a}});if(!e.isInitialized){if(Fe({isInitialized:!0}),e.monaco)return e.resolve(e.monaco),Ye(Xe);if(window.monaco&&window.monaco.editor)return Cn(window.monaco),e.resolve(window.monaco),Ye(Xe);fo(ho,xo)(vo)}return Ye(Xe)}function ho(e){return document.body.appendChild(e)}function bo(e){var n=document.createElement("script");return e&&(n.src=e),n}function xo(e){var n=ke(function(o){var a=o.config,r=o.reject;return{config:a,reject:r}}),t=bo("".concat(n.config.paths.vs,"/loader.js"));return t.onload=function(){return e()},t.onerror=n.reject,t}function vo(){var e=ke(function(t){var o=t.config,a=t.resolve,r=t.reject;return{config:o,resolve:a,reject:r}}),n=window.require;n.config(e.config),n(["vs/editor/editor.main"],function(t){Cn(t),e.resolve(t)},function(t){e.reject(t)})}function Cn(e){ke().monaco||Fe({monaco:e})}function _o(){return ke(function(e){var n=e.monaco;return n})}var Xe=new Promise(function(e,n){return Fe({resolve:e,reject:n})}),Re={config:go,init:Zo,__getMonacoInstance:_o},Io={wrapper:{display:"flex",position:"relative",textAlign:"initial"},fullWidth:{width:"100%"},hide:{display:"none"}},Je=Io,zo={container:{display:"flex",height:"100%",width:"100%",justifyContent:"center",alignItems:"center"}},Po=zo;function Do({children:e}){return be.createElement("div",{style:Po.container},e)}var So=Do,wo=So;function Eo({width:e,height:n,isEditorReady:t,loading:o,_ref:a,className:r,wrapperProps:s}){return be.createElement("section",{style:{...Je.wrapper,width:e,height:n},...s},!t&&be.createElement(wo,null,o),be.createElement("div",{ref:a,style:{...Je.fullWidth,...!t&&Je.hide},className:r}))}var Ro=Eo,jn=f.memo(Ro);function Ao(e){f.useEffect(e,[])}var tn=Ao;function Oo(e,n,t=!0){let o=f.useRef(!0);f.useEffect(o.current||!t?()=>{o.current=!1}:e,n)}var W=Oo;function we(){}function Ze(e,n,t,o){return ko(e,o)||Co(e,n,t,o)}function ko(e,n){return e.editor.getModel(Un(e,n))}function Co(e,n,t,o){return e.editor.createModel(n,t,o?Un(e,o):void 0)}function Un(e,n){return e.Uri.parse(n)}function jo({original:e,modified:n,language:t,originalLanguage:o,modifiedLanguage:a,originalModelPath:r,modifiedModelPath:s,keepCurrentOriginalModel:i=!1,keepCurrentModifiedModel:d=!1,theme:c="light",loading:Z="Loading...",options:l={},height:u="100%",width:T="100%",className:g,wrapperProps:w={},beforeMount:I=we,onMount:h=we}){let[m,x]=f.useState(!1),[k,E]=f.useState(!0),b=f.useRef(null),y=f.useRef(null),N=f.useRef(null),C=f.useRef(h),R=f.useRef(I),K=f.useRef(!1);tn(()=>{let v=Re.init();return v.then(A=>(y.current=A)&&E(!1)).catch(A=>A?.type!=="cancelation"&&console.error("Monaco initialization: error:",A)),()=>b.current?U():v.cancel()}),W(()=>{if(b.current&&y.current){let v=b.current.getOriginalEditor(),A=Ze(y.current,e||"",o||t||"text",r||"");A!==v.getModel()&&v.setModel(A)}},[r],m),W(()=>{if(b.current&&y.current){let v=b.current.getModifiedEditor(),A=Ze(y.current,n||"",a||t||"text",s||"");A!==v.getModel()&&v.setModel(A)}},[s],m),W(()=>{let v=b.current.getModifiedEditor();v.getOption(y.current.editor.EditorOption.readOnly)?v.setValue(n||""):n!==v.getValue()&&(v.executeEdits("",[{range:v.getModel().getFullModelRange(),text:n||"",forceMoveMarkers:!0}]),v.pushUndoStop())},[n],m),W(()=>{b.current?.getModel()?.original.setValue(e||"")},[e],m),W(()=>{let{original:v,modified:A}=b.current.getModel();y.current.editor.setModelLanguage(v,o||t||"text"),y.current.editor.setModelLanguage(A,a||t||"text")},[t,o,a],m),W(()=>{y.current?.editor.setTheme(c)},[c],m),W(()=>{b.current?.updateOptions(l)},[l],m);let j=f.useCallback(()=>{if(!y.current)return;R.current(y.current);let v=Ze(y.current,e||"",o||t||"text",r||""),A=Ze(y.current,n||"",a||t||"text",s||"");b.current?.setModel({original:v,modified:A})},[t,n,a,e,o,r,s]),F=f.useCallback(()=>{!K.current&&N.current&&(b.current=y.current.editor.createDiffEditor(N.current,{automaticLayout:!0,...l}),j(),y.current?.editor.setTheme(c),x(!0),K.current=!0)},[l,c,j]);f.useEffect(()=>{m&&C.current(b.current,y.current)},[m]),f.useEffect(()=>{!k&&!m&&F()},[k,m,F]);function U(){let v=b.current?.getModel();i||v?.original?.dispose(),d||v?.modified?.dispose(),b.current?.dispose()}return be.createElement(jn,{width:T,height:u,isEditorReady:m,loading:Z,_ref:N,className:g,wrapperProps:w})}var Uo=jo,Ea=f.memo(Uo);function No(){let[e,n]=f.useState(Re.__getMonacoInstance());return tn(()=>{let t;return e||(t=Re.init(),t.then(o=>{n(o)})),()=>t?.cancel()}),e}var Ra=No;function Mo(e){let n=f.useRef();return f.useEffect(()=>{n.current=e},[e]),n.current}var Bo=Mo,Ne=new Map;function Ko({defaultValue:e,defaultLanguage:n,defaultPath:t,value:o,language:a,path:r,theme:s="light",line:i,loading:d="Loading...",options:c={},overrideServices:Z={},saveViewState:l=!0,keepCurrentModel:u=!1,width:T="100%",height:g="100%",className:w,wrapperProps:I={},beforeMount:h=we,onMount:m=we,onChange:x,onValidate:k=we}){let[E,b]=f.useState(!1),[y,N]=f.useState(!0),C=f.useRef(null),R=f.useRef(null),K=f.useRef(null),j=f.useRef(m),F=f.useRef(h),U=f.useRef(),v=f.useRef(o),A=Bo(r),ne=f.useRef(!1),X=f.useRef(!1);tn(()=>{let L=Re.init();return L.then($=>(C.current=$)&&N(!1)).catch($=>$?.type!=="cancelation"&&console.error("Monaco initialization: error:",$)),()=>R.current?fe():L.cancel()}),W(()=>{let L=Ze(C.current,e||o||"",n||a||"",r||t||"");L!==R.current?.getModel()&&(l&&Ne.set(A,R.current?.saveViewState()),R.current?.setModel(L),l&&R.current?.restoreViewState(Ne.get(r)))},[r],E),W(()=>{R.current?.updateOptions(c)},[c],E),W(()=>{!R.current||o===void 0||(R.current.getOption(C.current.editor.EditorOption.readOnly)?R.current.setValue(o):o!==R.current.getValue()&&(X.current=!0,R.current.executeEdits("",[{range:R.current.getModel().getFullModelRange(),text:o,forceMoveMarkers:!0}]),R.current.pushUndoStop(),X.current=!1))},[o],E),W(()=>{let L=R.current?.getModel();L&&a&&C.current?.editor.setModelLanguage(L,a)},[a],E),W(()=>{i!==void 0&&R.current?.revealLine(i)},[i],E),W(()=>{C.current?.editor.setTheme(s)},[s],E);let ye=f.useCallback(()=>{if(!(!K.current||!C.current)&&!ne.current){F.current(C.current);let L=r||t,$=Ze(C.current,o||e||"",n||a||"",L||"");R.current=C.current?.editor.create(K.current,{model:$,automaticLayout:!0,...c},Z),l&&R.current.restoreViewState(Ne.get(L)),C.current.editor.setTheme(s),i!==void 0&&R.current.revealLine(i),b(!0),ne.current=!0}},[e,n,t,o,a,r,c,Z,l,s,i]);f.useEffect(()=>{E&&j.current(R.current,C.current)},[E]),f.useEffect(()=>{!y&&!E&&ye()},[y,E,ye]),v.current=o,f.useEffect(()=>{E&&x&&(U.current?.dispose(),U.current=R.current?.onDidChangeModelContent(L=>{X.current||x(R.current.getValue(),L)}))},[E,x]),f.useEffect(()=>{if(E){let L=C.current.editor.onDidChangeMarkers($=>{let p=R.current.getModel()?.uri;if(p&&$.find(_=>_.path===p.path)){let _=C.current.editor.getModelMarkers({resource:p});k?.(_)}});return()=>{L?.dispose()}}return()=>{}},[E,k]);function fe(){U.current?.dispose(),u?l&&Ne.set(r,R.current.saveViewState()):R.current.getModel()?.dispose(),R.current.dispose()}return be.createElement(jn,{width:T,height:g,isEditorReady:E,loading:d,_ref:K,className:w,wrapperProps:I})}var Lo=Ko,Aa=f.memo(Lo);const{createElement:_e,createContext:Vo,createRef:Oa,forwardRef:Nn,useCallback:H,useContext:Mn,useEffect:le,useImperativeHandle:Bn,useLayoutEffect:Fo,useMemo:$o,useRef:q,useState:xe}=Dn,Zn=Dn[`useId${Math.random()}`.slice(0,5)],Ho=Fo,$e=Vo(null);$e.displayName="PanelGroupContext";const pe=Ho,qo=typeof Zn=="function"?Zn:()=>null;let Go=0;function on(e=null){const n=qo(),t=q(e||n||null);return t.current===null&&(t.current=""+Go++),e??t.current}function Kn({children:e,className:n="",collapsedSize:t,collapsible:o,defaultSize:a,forwardedRef:r,id:s,maxSize:i,minSize:d,onCollapse:c,onExpand:Z,onResize:l,order:u,style:T,tagName:g="div",...w}){const I=Mn($e);if(I===null)throw Error("Panel components must be rendered within a PanelGroup container");const{collapsePanel:h,expandPanel:m,getPanelSize:x,getPanelStyle:k,groupId:E,isPanelCollapsed:b,reevaluatePanelConstraints:y,registerPanel:N,resizePanel:C,unregisterPanel:R}=I,K=on(s),j=q({callbacks:{onCollapse:c,onExpand:Z,onResize:l},constraints:{collapsedSize:t,collapsible:o,defaultSize:a,maxSize:i,minSize:d},id:K,idIsFromProps:s!==void 0,order:u});q({didLogMissingDefaultSizeWarning:!1}),pe(()=>{const{callbacks:U,constraints:v}=j.current,A={...v};j.current.id=K,j.current.idIsFromProps=s!==void 0,j.current.order=u,U.onCollapse=c,U.onExpand=Z,U.onResize=l,v.collapsedSize=t,v.collapsible=o,v.defaultSize=a,v.maxSize=i,v.minSize=d,(A.collapsedSize!==v.collapsedSize||A.collapsible!==v.collapsible||A.maxSize!==v.maxSize||A.minSize!==v.minSize)&&y(j.current,A)}),pe(()=>{const U=j.current;return N(U),()=>{R(U)}},[u,K,N,R]),Bn(r,()=>({collapse:()=>{h(j.current)},expand:U=>{m(j.current,U)},getId(){return K},getSize(){return x(j.current)},isCollapsed(){return b(j.current)},isExpanded(){return!b(j.current)},resize:U=>{C(j.current,U)}}),[h,m,x,b,K,C]);const F=k(j.current,a);return _e(g,{...w,children:e,className:n,id:s,style:{...F,...T},"data-panel":"","data-panel-collapsible":o||void 0,"data-panel-group-id":E,"data-panel-id":K,"data-panel-size":parseFloat(""+F.flexGrow).toFixed(1)})}const Wo=Nn((e,n)=>_e(Kn,{...e,forwardedRef:n}));Kn.displayName="Panel";Wo.displayName="forwardRef(Panel)";let nn=null,ue=null;function Yo(e,n){if(n){const t=(n&Hn)!==0,o=(n&qn)!==0,a=(n&Gn)!==0,r=(n&Wn)!==0;if(t)return a?"se-resize":r?"ne-resize":"e-resize";if(o)return a?"sw-resize":r?"nw-resize":"w-resize";if(a)return"s-resize";if(r)return"n-resize"}switch(e){case"horizontal":return"ew-resize";case"intersection":return"move";case"vertical":return"ns-resize"}}function Xo(){ue!==null&&(document.head.removeChild(ue),nn=null,ue=null)}function Qe(e,n){const t=Yo(e,n);nn!==t&&(nn=t,ue===null&&(ue=document.createElement("style"),document.head.appendChild(ue)),ue.innerHTML=`*{cursor: ${t}!important;}`)}function Ln(e){return e.type==="keydown"}function Vn(e){return e.type.startsWith("pointer")}function Fn(e){return e.type.startsWith("mouse")}function He(e){if(Vn(e)){if(e.isPrimary)return{x:e.clientX,y:e.clientY}}else if(Fn(e))return{x:e.clientX,y:e.clientY};return{x:1/0,y:1/0}}function Jo(){if(typeof matchMedia=="function")return matchMedia("(pointer:coarse)").matches?"coarse":"fine"}function Qo(e,n,t){return e.x<n.x+n.width&&e.x+e.width>n.x&&e.y<n.y+n.height&&e.y+e.height>n.y}function ea(e,n){if(e===n)throw new Error("Cannot compare node with itself");const t={a:xn(e),b:xn(n)};let o;for(;t.a.at(-1)===t.b.at(-1);)e=t.a.pop(),n=t.b.pop(),o=e;S(o,"Stacking order can only be calculated for elements with a common ancestor");const a={a:bn(hn(t.a)),b:bn(hn(t.b))};if(a.a===a.b){const r=o.childNodes,s={a:t.a.at(-1),b:t.b.at(-1)};let i=r.length;for(;i--;){const d=r[i];if(d===s.a)return 1;if(d===s.b)return-1}}return Math.sign(a.a-a.b)}const na=/\b(?:position|zIndex|opacity|transform|webkitTransform|mixBlendMode|filter|webkitFilter|isolation)\b/;function ta(e){var n;const t=getComputedStyle((n=$n(e))!==null&&n!==void 0?n:e).display;return t==="flex"||t==="inline-flex"}function oa(e){const n=getComputedStyle(e);return!!(n.position==="fixed"||n.zIndex!=="auto"&&(n.position!=="static"||ta(e))||+n.opacity<1||"transform"in n&&n.transform!=="none"||"webkitTransform"in n&&n.webkitTransform!=="none"||"mixBlendMode"in n&&n.mixBlendMode!=="normal"||"filter"in n&&n.filter!=="none"||"webkitFilter"in n&&n.webkitFilter!=="none"||"isolation"in n&&n.isolation==="isolate"||na.test(n.willChange)||n.webkitOverflowScrolling==="touch")}function hn(e){let n=e.length;for(;n--;){const t=e[n];if(S(t,"Missing node"),oa(t))return t}return null}function bn(e){return e&&Number(getComputedStyle(e).zIndex)||0}function xn(e){const n=[];for(;e;)n.push(e),e=$n(e);return n}function $n(e){const{parentNode:n}=e;return n&&n instanceof ShadowRoot?n.host:n}const Hn=1,qn=2,Gn=4,Wn=8,aa=Jo()==="coarse";let ee=[],ve=!1,re=new Map,qe=new Map;const Ae=new Set;function ra(e,n,t,o,a){var r;const{ownerDocument:s}=n,i={direction:t,element:n,hitAreaMargins:o,setResizeHandlerState:a},d=(r=re.get(s))!==null&&r!==void 0?r:0;return re.set(s,d+1),Ae.add(i),Le(),function(){var Z;qe.delete(e),Ae.delete(i);const l=(Z=re.get(s))!==null&&Z!==void 0?Z:1;if(re.set(s,l-1),Le(),l===1&&re.delete(s),ee.includes(i)){const u=ee.indexOf(i);u>=0&&ee.splice(u,1),rn(),a("up",!0,null)}}}function vn(e){const{target:n}=e,{x:t,y:o}=He(e);ve=!0,an({target:n,x:t,y:o}),Le(),ee.length>0&&(Ve("down",e),e.preventDefault(),e.stopPropagation())}function ze(e){const{x:n,y:t}=He(e);if(ve&&e.buttons===0&&(ve=!1,Ve("up",e)),!ve){const{target:o}=e;an({target:o,x:n,y:t})}Ve("move",e),rn(),ee.length>0&&e.preventDefault()}function me(e){const{target:n}=e,{x:t,y:o}=He(e);qe.clear(),ve=!1,ee.length>0&&e.preventDefault(),Ve("up",e),an({target:n,x:t,y:o}),rn(),Le()}function an({target:e,x:n,y:t}){ee.splice(0);let o=null;e instanceof HTMLElement&&(o=e),Ae.forEach(a=>{const{element:r,hitAreaMargins:s}=a,i=r.getBoundingClientRect(),{bottom:d,left:c,right:Z,top:l}=i,u=aa?s.coarse:s.fine;if(n>=c-u&&n<=Z+u&&t>=l-u&&t<=d+u){if(o!==null&&document.contains(o)&&r!==o&&!r.contains(o)&&!o.contains(r)&&ea(o,r)>0){let g=o,w=!1;for(;g&&!g.contains(r);){if(Qo(g.getBoundingClientRect(),i)){w=!0;break}g=g.parentElement}if(w)return}ee.push(a)}})}function en(e,n){qe.set(e,n)}function rn(){let e=!1,n=!1;ee.forEach(o=>{const{direction:a}=o;a==="horizontal"?e=!0:n=!0});let t=0;qe.forEach(o=>{t|=o}),e&&n?Qe("intersection",t):e?Qe("horizontal",t):n?Qe("vertical",t):Xo()}function Le(){re.forEach((e,n)=>{const{body:t}=n;t.removeEventListener("contextmenu",me),t.removeEventListener("pointerdown",vn),t.removeEventListener("pointerleave",ze),t.removeEventListener("pointermove",ze)}),window.removeEventListener("pointerup",me),window.removeEventListener("pointercancel",me),Ae.size>0&&(ve?(ee.length>0&&re.forEach((e,n)=>{const{body:t}=n;e>0&&(t.addEventListener("contextmenu",me),t.addEventListener("pointerleave",ze),t.addEventListener("pointermove",ze))}),window.addEventListener("pointerup",me),window.addEventListener("pointercancel",me)):re.forEach((e,n)=>{const{body:t}=n;e>0&&(t.addEventListener("pointerdown",vn,{capture:!0}),t.addEventListener("pointermove",ze))}))}function Ve(e,n){Ae.forEach(t=>{const{setResizeHandlerState:o}=t,a=ee.includes(t);o(e,a,n)})}function sa(){const[e,n]=xe(0);return H(()=>n(t=>t+1),[])}function S(e,n){if(!e)throw console.error(n),Error(n)}const sn=10;function ce(e,n,t=sn){return e.toFixed(t)===n.toFixed(t)?0:e>n?1:-1}function oe(e,n,t=sn){return ce(e,n,t)===0}function G(e,n,t){return ce(e,n,t)===0}function ia(e,n,t){if(e.length!==n.length)return!1;for(let o=0;o<e.length;o++){const a=e[o],r=n[o];if(!G(a,r,t))return!1}return!0}function he({panelConstraints:e,panelIndex:n,size:t}){const o=e[n];S(o!=null,`Panel constraints not found for index ${n}`);let{collapsedSize:a=0,collapsible:r,maxSize:s=100,minSize:i=0}=o;if(ce(t,i)<0)if(r){const d=(a+i)/2;ce(t,d)<0?t=a:t=i}else t=i;return t=Math.min(s,t),t=parseFloat(t.toFixed(sn)),t}function De({delta:e,initialLayout:n,panelConstraints:t,pivotIndices:o,prevLayout:a,trigger:r}){if(G(e,0))return n;const s=[...n],[i,d]=o;S(i!=null,"Invalid first pivot index"),S(d!=null,"Invalid second pivot index");let c=0;if(r==="keyboard"){{const l=e<0?d:i,u=t[l];S(u,`Panel constraints not found for index ${l}`);const{collapsedSize:T=0,collapsible:g,minSize:w=0}=u;if(g){const I=n[l];if(S(I!=null,`Previous layout not found for panel index ${l}`),G(I,T)){const h=w-I;ce(h,Math.abs(e))>0&&(e=e<0?0-h:h)}}}{const l=e<0?i:d,u=t[l];S(u,`No panel constraints found for index ${l}`);const{collapsedSize:T=0,collapsible:g,minSize:w=0}=u;if(g){const I=n[l];if(S(I!=null,`Previous layout not found for panel index ${l}`),G(I,w)){const h=I-T;ce(h,Math.abs(e))>0&&(e=e<0?0-h:h)}}}}{const l=e<0?1:-1;let u=e<0?d:i,T=0;for(;;){const w=n[u];S(w!=null,`Previous layout not found for panel index ${u}`);const h=he({panelConstraints:t,panelIndex:u,size:100})-w;if(T+=h,u+=l,u<0||u>=t.length)break}const g=Math.min(Math.abs(e),Math.abs(T));e=e<0?0-g:g}{let u=e<0?i:d;for(;u>=0&&u<t.length;){const T=Math.abs(e)-Math.abs(c),g=n[u];S(g!=null,`Previous layout not found for panel index ${u}`);const w=g-T,I=he({panelConstraints:t,panelIndex:u,size:w});if(!G(g,I)&&(c+=g-I,s[u]=I,c.toPrecision(3).localeCompare(Math.abs(e).toPrecision(3),void 0,{numeric:!0})>=0))break;e<0?u--:u++}}if(ia(a,s))return a;{const l=e<0?d:i,u=n[l];S(u!=null,`Previous layout not found for panel index ${l}`);const T=u+c,g=he({panelConstraints:t,panelIndex:l,size:T});if(s[l]=g,!G(g,T)){let w=T-g,h=e<0?d:i;for(;h>=0&&h<t.length;){const m=s[h];S(m!=null,`Previous layout not found for panel index ${h}`);const x=m+w,k=he({panelConstraints:t,panelIndex:h,size:x});if(G(m,k)||(w-=k-m,s[h]=k),G(w,0))break;e>0?h--:h++}}}const Z=s.reduce((l,u)=>u+l,0);return G(Z,100)?s:a}function da({layout:e,panelsArray:n,pivotIndices:t}){let o=0,a=100,r=0,s=0;const i=t[0];S(i!=null,"No pivot index found"),n.forEach((l,u)=>{const{constraints:T}=l,{maxSize:g=100,minSize:w=0}=T;u===i?(o=w,a=g):(r+=w,s+=g)});const d=Math.min(a,100-r),c=Math.max(o,100-s),Z=e[i];return{valueMax:d,valueMin:c,valueNow:Z}}function Oe(e,n=document){return Array.from(n.querySelectorAll(`[data-panel-resize-handle-id][data-panel-group-id="${e}"]`))}function Yn(e,n,t=document){const a=Oe(e,t).findIndex(r=>r.getAttribute("data-panel-resize-handle-id")===n);return a??null}function Xn(e,n,t){const o=Yn(e,n,t);return o!=null?[o,o+1]:[-1,-1]}function Jn(e,n=document){var t;if(n instanceof HTMLElement&&(n==null||(t=n.dataset)===null||t===void 0?void 0:t.panelGroupId)==e)return n;const o=n.querySelector(`[data-panel-group][data-panel-group-id="${e}"]`);return o||null}function Ge(e,n=document){const t=n.querySelector(`[data-panel-resize-handle-id="${e}"]`);return t||null}function ua(e,n,t,o=document){var a,r,s,i;const d=Ge(n,o),c=Oe(e,o),Z=d?c.indexOf(d):-1,l=(a=(r=t[Z])===null||r===void 0?void 0:r.id)!==null&&a!==void 0?a:null,u=(s=(i=t[Z+1])===null||i===void 0?void 0:i.id)!==null&&s!==void 0?s:null;return[l,u]}function la({committedValuesRef:e,eagerValuesRef:n,groupId:t,layout:o,panelDataArray:a,panelGroupElement:r,setLayout:s}){q({didWarnAboutMissingResizeHandle:!1}),pe(()=>{if(!r)return;const i=Oe(t,r);for(let d=0;d<a.length-1;d++){const{valueMax:c,valueMin:Z,valueNow:l}=da({layout:o,panelsArray:a,pivotIndices:[d,d+1]}),u=i[d];if(u!=null){const T=a[d];S(T,`No panel data found for index "${d}"`),u.setAttribute("aria-controls",T.id),u.setAttribute("aria-valuemax",""+Math.round(c)),u.setAttribute("aria-valuemin",""+Math.round(Z)),u.setAttribute("aria-valuenow",l!=null?""+Math.round(l):"")}}return()=>{i.forEach((d,c)=>{d.removeAttribute("aria-controls"),d.removeAttribute("aria-valuemax"),d.removeAttribute("aria-valuemin"),d.removeAttribute("aria-valuenow")})}},[t,o,a,r]),le(()=>{if(!r)return;const i=n.current;S(i,"Eager values not found");const{panelDataArray:d}=i,c=Jn(t,r);S(c!=null,`No group found for id "${t}"`);const Z=Oe(t,r);S(Z,`No resize handles found for group id "${t}"`);const l=Z.map(u=>{const T=u.getAttribute("data-panel-resize-handle-id");S(T,"Resize handle element has no handle id attribute");const[g,w]=ua(t,T,d,r);if(g==null||w==null)return()=>{};const I=h=>{if(!h.defaultPrevented)switch(h.key){case"Enter":{h.preventDefault();const m=d.findIndex(x=>x.id===g);if(m>=0){const x=d[m];S(x,`No panel data found for index ${m}`);const k=o[m],{collapsedSize:E=0,collapsible:b,minSize:y=0}=x.constraints;if(k!=null&&b){const N=De({delta:G(k,E)?y-E:E-k,initialLayout:o,panelConstraints:d.map(C=>C.constraints),pivotIndices:Xn(t,T,r),prevLayout:o,trigger:"keyboard"});o!==N&&s(N)}}break}}};return u.addEventListener("keydown",I),()=>{u.removeEventListener("keydown",I)}});return()=>{l.forEach(u=>u())}},[r,e,n,t,o,a,s])}function _n(e,n){if(e.length!==n.length)return!1;for(let t=0;t<e.length;t++)if(e[t]!==n[t])return!1;return!0}function Qn(e,n){const t=e==="horizontal",{x:o,y:a}=He(n);return t?o:a}function pa(e,n,t,o,a){const r=t==="horizontal",s=Ge(n,a);S(s,`No resize handle element found for id "${n}"`);const i=s.getAttribute("data-panel-group-id");S(i,"Resize handle element has no group id attribute");let{initialCursorPosition:d}=o;const c=Qn(t,e),Z=Jn(i,a);S(Z,`No group element found for id "${i}"`);const l=Z.getBoundingClientRect(),u=r?l.width:l.height;return(c-d)/u*100}function ca(e,n,t,o,a,r){if(Ln(e)){const s=t==="horizontal";let i=0;e.shiftKey?i=100:a!=null?i=a:i=10;let d=0;switch(e.key){case"ArrowDown":d=s?0:i;break;case"ArrowLeft":d=s?-i:0;break;case"ArrowRight":d=s?i:0;break;case"ArrowUp":d=s?0:-i;break;case"End":d=100;break;case"Home":d=-100;break}return d}else return o==null?0:pa(e,n,t,o,r)}function ya({panelDataArray:e}){const n=Array(e.length),t=e.map(r=>r.constraints);let o=0,a=100;for(let r=0;r<e.length;r++){const s=t[r];S(s,`Panel constraints not found for index ${r}`);const{defaultSize:i}=s;i!=null&&(o++,n[r]=i,a-=i)}for(let r=0;r<e.length;r++){const s=t[r];S(s,`Panel constraints not found for index ${r}`);const{defaultSize:i}=s;if(i!=null)continue;const d=e.length-o,c=a/d;o++,n[r]=c,a-=c}return n}function Te(e,n,t){n.forEach((o,a)=>{const r=e[a];S(r,`Panel data not found for index ${a}`);const{callbacks:s,constraints:i,id:d}=r,{collapsedSize:c=0,collapsible:Z}=i,l=t[d];if(l==null||o!==l){t[d]=o;const{onCollapse:u,onExpand:T,onResize:g}=s;g&&g(o,l),Z&&(u||T)&&(T&&(l==null||oe(l,c))&&!oe(o,c)&&T(),u&&(l==null||!oe(l,c))&&oe(o,c)&&u())}})}function Me(e,n){if(e.length!==n.length)return!1;for(let t=0;t<e.length;t++)if(e[t]!=n[t])return!1;return!0}function fa({defaultSize:e,dragState:n,layout:t,panelData:o,panelIndex:a,precision:r=3}){const s=t[a];let i;return s==null?i=e!=null?e.toPrecision(r):"1":o.length===1?i="1":i=s.toPrecision(r),{flexBasis:0,flexGrow:i,flexShrink:1,overflow:"hidden",pointerEvents:n!==null?"none":void 0}}function ma(e,n=10){let t=null;return(...a)=>{t!==null&&clearTimeout(t),t=setTimeout(()=>{e(...a)},n)}}function In(e){try{if(typeof localStorage<"u")e.getItem=n=>localStorage.getItem(n),e.setItem=(n,t)=>{localStorage.setItem(n,t)};else throw new Error("localStorage not supported in this environment")}catch(n){console.error(n),e.getItem=()=>null,e.setItem=()=>{}}}function et(e){return`react-resizable-panels:${e}`}function nt(e){return e.map(n=>{const{constraints:t,id:o,idIsFromProps:a,order:r}=n;return a?o:r?`${r}:${JSON.stringify(t)}`:JSON.stringify(t)}).sort((n,t)=>n.localeCompare(t)).join(",")}function tt(e,n){try{const t=et(e),o=n.getItem(t);if(o){const a=JSON.parse(o);if(typeof a=="object"&&a!=null)return a}}catch{}return null}function Ta(e,n,t){var o,a;const r=(o=tt(e,t))!==null&&o!==void 0?o:{},s=nt(n);return(a=r[s])!==null&&a!==void 0?a:null}function ga(e,n,t,o,a){var r;const s=et(e),i=nt(n),d=(r=tt(e,a))!==null&&r!==void 0?r:{};d[i]={expandToSizes:Object.fromEntries(t.entries()),layout:o};try{a.setItem(s,JSON.stringify(d))}catch(c){console.error(c)}}function zn({layout:e,panelConstraints:n}){const t=[...e],o=t.reduce((r,s)=>r+s,0);if(t.length!==n.length)throw Error(`Invalid ${n.length} panel layout: ${t.map(r=>`${r}%`).join(", ")}`);if(!G(o,100)&&t.length>0)for(let r=0;r<n.length;r++){const s=t[r];S(s!=null,`No layout data found for index ${r}`);const i=100/o*s;t[r]=i}let a=0;for(let r=0;r<n.length;r++){const s=t[r];S(s!=null,`No layout data found for index ${r}`);const i=he({panelConstraints:n,panelIndex:r,size:s});s!=i&&(a+=s-i,t[r]=i)}if(!G(a,0))for(let r=0;r<n.length;r++){const s=t[r];S(s!=null,`No layout data found for index ${r}`);const i=s+a,d=he({panelConstraints:n,panelIndex:r,size:i});if(s!==d&&(a-=d-s,t[r]=d,G(a,0)))break}return t}const Za=100,Se={getItem:e=>(In(Se),Se.getItem(e)),setItem:(e,n)=>{In(Se),Se.setItem(e,n)}},Pn={};function ot({autoSaveId:e=null,children:n,className:t="",direction:o,forwardedRef:a,id:r=null,onLayout:s=null,keyboardResizeBy:i=null,storage:d=Se,style:c,tagName:Z="div",...l}){const u=on(r),T=q(null),[g,w]=xe(null),[I,h]=xe([]),m=sa(),x=q({}),k=q(new Map),E=q(0),b=q({autoSaveId:e,direction:o,dragState:g,id:u,keyboardResizeBy:i,onLayout:s,storage:d}),y=q({layout:I,panelDataArray:[],panelDataArrayChanged:!1});q({didLogIdAndOrderWarning:!1,didLogPanelConstraintsWarning:!1,prevPanelIds:[]}),Bn(a,()=>({getId:()=>b.current.id,getLayout:()=>{const{layout:p}=y.current;return p},setLayout:p=>{const{onLayout:_}=b.current,{layout:D,panelDataArray:z}=y.current,P=zn({layout:p,panelConstraints:z.map(O=>O.constraints)});_n(D,P)||(h(P),y.current.layout=P,_&&_(P),Te(z,P,x.current))}}),[]),pe(()=>{b.current.autoSaveId=e,b.current.direction=o,b.current.dragState=g,b.current.id=u,b.current.onLayout=s,b.current.storage=d}),la({committedValuesRef:b,eagerValuesRef:y,groupId:u,layout:I,panelDataArray:y.current.panelDataArray,setLayout:h,panelGroupElement:T.current}),le(()=>{const{panelDataArray:p}=y.current;if(e){if(I.length===0||I.length!==p.length)return;let _=Pn[e];_==null&&(_=ma(ga,Za),Pn[e]=_);const D=[...p],z=new Map(k.current);_(e,D,z,I,d)}},[e,I,d]),le(()=>{});const N=H(p=>{const{onLayout:_}=b.current,{layout:D,panelDataArray:z}=y.current;if(p.constraints.collapsible){const P=z.map(J=>J.constraints),{collapsedSize:O=0,panelSize:M,pivotIndices:V}=de(z,p,D);if(S(M!=null,`Panel size not found for panel "${p.id}"`),!oe(M,O)){k.current.set(p.id,M);const Y=ge(z,p)===z.length-1?M-O:O-M,B=De({delta:Y,initialLayout:D,panelConstraints:P,pivotIndices:V,prevLayout:D,trigger:"imperative-api"});Me(D,B)||(h(B),y.current.layout=B,_&&_(B),Te(z,B,x.current))}}},[]),C=H((p,_)=>{const{onLayout:D}=b.current,{layout:z,panelDataArray:P}=y.current;if(p.constraints.collapsible){const O=P.map(Q=>Q.constraints),{collapsedSize:M=0,panelSize:V=0,minSize:J=0,pivotIndices:Y}=de(P,p,z),B=_??J;if(oe(V,M)){const Q=k.current.get(p.id),Ce=Q!=null&&Q>=B?Q:B,je=ge(P,p)===P.length-1?V-Ce:Ce-V,ie=De({delta:je,initialLayout:z,panelConstraints:O,pivotIndices:Y,prevLayout:z,trigger:"imperative-api"});Me(z,ie)||(h(ie),y.current.layout=ie,D&&D(ie),Te(P,ie,x.current))}}},[]),R=H(p=>{const{layout:_,panelDataArray:D}=y.current,{panelSize:z}=de(D,p,_);return S(z!=null,`Panel size not found for panel "${p.id}"`),z},[]),K=H((p,_)=>{const{panelDataArray:D}=y.current,z=ge(D,p);return fa({defaultSize:_,dragState:g,layout:I,panelData:D,panelIndex:z})},[g,I]),j=H(p=>{const{layout:_,panelDataArray:D}=y.current,{collapsedSize:z=0,collapsible:P,panelSize:O}=de(D,p,_);return S(O!=null,`Panel size not found for panel "${p.id}"`),P===!0&&oe(O,z)},[]),F=H(p=>{const{layout:_,panelDataArray:D}=y.current,{collapsedSize:z=0,collapsible:P,panelSize:O}=de(D,p,_);return S(O!=null,`Panel size not found for panel "${p.id}"`),!P||ce(O,z)>0},[]),U=H(p=>{const{panelDataArray:_}=y.current;_.push(p),_.sort((D,z)=>{const P=D.order,O=z.order;return P==null&&O==null?0:P==null?-1:O==null?1:P-O}),y.current.panelDataArrayChanged=!0,m()},[m]);pe(()=>{if(y.current.panelDataArrayChanged){y.current.panelDataArrayChanged=!1;const{autoSaveId:p,onLayout:_,storage:D}=b.current,{layout:z,panelDataArray:P}=y.current;let O=null;if(p){const V=Ta(p,P,D);V&&(k.current=new Map(Object.entries(V.expandToSizes)),O=V.layout)}O==null&&(O=ya({panelDataArray:P}));const M=zn({layout:O,panelConstraints:P.map(V=>V.constraints)});_n(z,M)||(h(M),y.current.layout=M,_&&_(M),Te(P,M,x.current))}}),pe(()=>{const p=y.current;return()=>{p.layout=[]}},[]);const v=H(p=>function(D){D.preventDefault();const z=T.current;if(!z)return()=>null;const{direction:P,dragState:O,id:M,keyboardResizeBy:V,onLayout:J}=b.current,{layout:Y,panelDataArray:B}=y.current,{initialLayout:Q}=O??{},Ce=Xn(M,p,z);let te=ca(D,p,P,O,V,z);const je=P==="horizontal";document.dir==="rtl"&&je&&(te=-te);const ie=B.map(at=>at.constraints),Ie=De({delta:te,initialLayout:Q??Y,panelConstraints:ie,pivotIndices:Ce,prevLayout:Y,trigger:Ln(D)?"keyboard":"mouse-or-touch"}),dn=!Me(Y,Ie);(Vn(D)||Fn(D))&&E.current!=te&&(E.current=te,!dn&&te!==0?je?en(p,te<0?Hn:qn):en(p,te<0?Gn:Wn):en(p,0)),dn&&(h(Ie),y.current.layout=Ie,J&&J(Ie),Te(B,Ie,x.current))},[]),A=H((p,_)=>{const{onLayout:D}=b.current,{layout:z,panelDataArray:P}=y.current,O=P.map(Q=>Q.constraints),{panelSize:M,pivotIndices:V}=de(P,p,z);S(M!=null,`Panel size not found for panel "${p.id}"`);const Y=ge(P,p)===P.length-1?M-_:_-M,B=De({delta:Y,initialLayout:z,panelConstraints:O,pivotIndices:V,prevLayout:z,trigger:"imperative-api"});Me(z,B)||(h(B),y.current.layout=B,D&&D(B),Te(P,B,x.current))},[]),ne=H((p,_)=>{const{layout:D,panelDataArray:z}=y.current,{collapsedSize:P=0,collapsible:O}=_,{collapsedSize:M=0,collapsible:V,maxSize:J=100,minSize:Y=0}=p.constraints,{panelSize:B}=de(z,p,D);B!=null&&(O&&V&&oe(B,P)?oe(P,M)||A(p,M):B<Y?A(p,Y):B>J&&A(p,J))},[A]),X=H((p,_)=>{const{direction:D}=b.current,{layout:z}=y.current;if(!T.current)return;const P=Ge(p,T.current);S(P,`Drag handle element not found for id "${p}"`);const O=Qn(D,_);w({dragHandleId:p,dragHandleRect:P.getBoundingClientRect(),initialCursorPosition:O,initialLayout:z})},[]),ye=H(()=>{w(null)},[]),fe=H(p=>{const{panelDataArray:_}=y.current,D=ge(_,p);D>=0&&(_.splice(D,1),delete x.current[p.id],y.current.panelDataArrayChanged=!0,m())},[m]),L=$o(()=>({collapsePanel:N,direction:o,dragState:g,expandPanel:C,getPanelSize:R,getPanelStyle:K,groupId:u,isPanelCollapsed:j,isPanelExpanded:F,reevaluatePanelConstraints:ne,registerPanel:U,registerResizeHandle:v,resizePanel:A,startDragging:X,stopDragging:ye,unregisterPanel:fe,panelGroupElement:T.current}),[N,g,o,C,R,K,u,j,F,ne,U,v,A,X,ye,fe]),$={display:"flex",flexDirection:o==="horizontal"?"row":"column",height:"100%",overflow:"hidden",width:"100%"};return _e($e.Provider,{value:L},_e(Z,{...l,children:n,className:t,id:r,ref:T,style:{...$,...c},"data-panel-group":"","data-panel-group-direction":o,"data-panel-group-id":u}))}const ha=Nn((e,n)=>_e(ot,{...e,forwardedRef:n}));ot.displayName="PanelGroup";ha.displayName="forwardRef(PanelGroup)";function ge(e,n){return e.findIndex(t=>t===n||t.id===n.id)}function de(e,n,t){const o=ge(e,n),r=o===e.length-1?[o-1,o]:[o,o+1],s=t[o];return{...n.constraints,panelSize:s,pivotIndices:r}}function ba({disabled:e,handleId:n,resizeHandler:t,panelGroupElement:o}){le(()=>{if(e||t==null||o==null)return;const a=Ge(n,o);if(a==null)return;const r=s=>{if(!s.defaultPrevented)switch(s.key){case"ArrowDown":case"ArrowLeft":case"ArrowRight":case"ArrowUp":case"End":case"Home":{s.preventDefault(),t(s);break}case"F6":{s.preventDefault();const i=a.getAttribute("data-panel-group-id");S(i,`No group element found for id "${i}"`);const d=Oe(i,o),c=Yn(i,n,o);S(c!==null,`No resize element found for id "${n}"`);const Z=s.shiftKey?c>0?c-1:d.length-1:c+1<d.length?c+1:0;d[Z].focus();break}}};return a.addEventListener("keydown",r),()=>{a.removeEventListener("keydown",r)}},[o,e,n,t])}function xa({children:e=null,className:n="",disabled:t=!1,hitAreaMargins:o,id:a,onBlur:r,onDragging:s,onFocus:i,style:d={},tabIndex:c=0,tagName:Z="div",...l}){var u,T;const g=q(null),w=q({onDragging:s});le(()=>{w.current.onDragging=s});const I=Mn($e);if(I===null)throw Error("PanelResizeHandle components must be rendered within a PanelGroup container");const{direction:h,groupId:m,registerResizeHandle:x,startDragging:k,stopDragging:E,panelGroupElement:b}=I,y=on(a),[N,C]=xe("inactive"),[R,K]=xe(!1),[j,F]=xe(null),U=q({state:N});pe(()=>{U.current.state=N}),le(()=>{if(t)F(null);else{const X=x(y);F(()=>X)}},[t,y,x]);const v=(u=o?.coarse)!==null&&u!==void 0?u:15,A=(T=o?.fine)!==null&&T!==void 0?T:5;return le(()=>{if(t||j==null)return;const X=g.current;return S(X,"Element ref not attached"),ra(y,X,h,{coarse:v,fine:A},(fe,L,$)=>{if(L)switch(fe){case"down":{C("drag"),S($,'Expected event to be defined for "down" action'),k(y,$);const{onDragging:p}=w.current;p&&p(!0);break}case"move":{const{state:p}=U.current;p!=="drag"&&C("hover"),S($,'Expected event to be defined for "move" action'),j($);break}case"up":{C("hover"),E();const{onDragging:p}=w.current;p&&p(!1);break}}else C("inactive")})},[v,h,t,A,x,y,j,k,E]),ba({disabled:t,handleId:y,resizeHandler:j,panelGroupElement:b}),_e(Z,{...l,children:e,className:n,id:a,onBlur:()=>{K(!1),r?.()},onFocus:()=>{K(!0),i?.()},ref:g,role:"separator",style:{...{touchAction:"none",userSelect:"none"},...d},tabIndex:c,"data-panel-group-direction":h,"data-panel-group-id":m,"data-resize-handle":"","data-resize-handle-active":N==="drag"?"pointer":R?"keyboard":void 0,"data-resize-handle-state":N,"data-panel-resize-handle-enabled":!t,"data-panel-resize-handle-id":y})}xa.displayName="PanelResizeHandle";const va=e=>{const n=document.createElement("textarea");n.value=e,document.body.appendChild(n),n.focus(),n.select();try{document.execCommand("copy")}catch(t){console.error("Unable to copy to clipboard",t)}document.body.removeChild(n)},ka=async e=>{window.isSecureContext&&navigator.clipboard?await navigator.clipboard.writeText(e):va(e)},Ca=async()=>{try{return navigator.clipboard.readText()}catch{return""}};self.monaco&&Re.config({monaco:self.monaco});export{Ra as L,ha as P,Pa as R,Dt as S,Aa as a,Wo as b,ka as c,wa as d,xa as e,Da as f,Sa as g,Ca as p,Ea as w};
