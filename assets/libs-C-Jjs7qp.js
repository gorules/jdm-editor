import{r as a}from"./index-Dl6G-zuu.js";import{g as P,K as $,m as q,r as G,C as O,c as b,o as L,h as M,A as F}from"./index-C-UwI2HO.js";import{_ as A}from"./assertThisInitialized-B7W8eO4F.js";function H(n,t,e){var i=e||{},o=i.noTrailing,p=o===void 0?!1:o,v=i.noLeading,g=v===void 0?!1:v,x=i.debounceMode,c=x===void 0?void 0:x,d,u=!1,j=0;function S(){d&&clearTimeout(d)}function s(h){var m=h||{},r=m.upcomingOnly,f=r===void 0?!1:r;S(),u=!f}function w(){for(var h=arguments.length,m=new Array(h),r=0;r<h;r++)m[r]=arguments[r];var f=this,B=Date.now()-j;if(u)return;function y(){j=Date.now(),t.apply(f,m)}function l(){d=void 0}!g&&c&&!d&&y(),S(),c===void 0&&B>n?g?(j=Date.now(),p||(d=setTimeout(c?l:y,n))):y():p!==!0&&(d=setTimeout(c?l:y,c===void 0?n-B:n))}return w.cancel=s,w}function Y(n,t,e){var i=e||{},o=i.atBegin,p=o===void 0?!1:o;return H(n,t,{debounceMode:p!==!1})}const _=new $("antSpinMove",{to:{opacity:1}}),V=new $("antRotate",{to:{transform:"rotate(405deg)"}}),J=n=>{const{componentCls:t,calc:e}=n;return{[`${t}`]:Object.assign(Object.assign({},G(n)),{position:"absolute",display:"none",color:n.colorPrimary,fontSize:0,textAlign:"center",verticalAlign:"middle",opacity:0,transition:`transform ${n.motionDurationSlow} ${n.motionEaseInOutCirc}`,"&-spinning":{position:"static",display:"inline-block",opacity:1},[`${t}-text`]:{fontSize:n.fontSize,paddingTop:e(e(n.dotSize).sub(n.fontSize)).div(2).add(2).equal()},"&-fullscreen":{position:"fixed",width:"100vw",height:"100vh",backgroundColor:n.colorBgMask,zIndex:n.zIndexPopupBase,inset:0,display:"flex",alignItems:"center",flexDirection:"column",justifyContent:"center",opacity:0,visibility:"hidden",transition:`all ${n.motionDurationMid}`,"&-show":{opacity:1,visibility:"visible"},[`${t}-dot ${t}-dot-item`]:{backgroundColor:n.colorWhite},[`${t}-text`]:{color:n.colorTextLightSolid}},"&-nested-loading":{position:"relative",[`> div > ${t}`]:{position:"absolute",top:0,insetInlineStart:0,zIndex:4,display:"block",width:"100%",height:"100%",maxHeight:n.contentHeight,[`${t}-dot`]:{position:"absolute",top:"50%",insetInlineStart:"50%",margin:e(n.dotSize).mul(-1).div(2).equal()},[`${t}-text`]:{position:"absolute",top:"50%",width:"100%",textShadow:`0 1px 2px ${n.colorBgContainer}`},[`&${t}-show-text ${t}-dot`]:{marginTop:e(n.dotSize).div(2).mul(-1).sub(10).equal()},"&-sm":{[`${t}-dot`]:{margin:e(n.dotSizeSM).mul(-1).div(2).equal()},[`${t}-text`]:{paddingTop:e(e(n.dotSizeSM).sub(n.fontSize)).div(2).add(2).equal()},[`&${t}-show-text ${t}-dot`]:{marginTop:e(n.dotSizeSM).div(2).mul(-1).sub(10).equal()}},"&-lg":{[`${t}-dot`]:{margin:e(n.dotSizeLG).mul(-1).div(2).equal()},[`${t}-text`]:{paddingTop:e(e(n.dotSizeLG).sub(n.fontSize)).div(2).add(2).equal()},[`&${t}-show-text ${t}-dot`]:{marginTop:e(n.dotSizeLG).div(2).mul(-1).sub(10).equal()}}},[`${t}-container`]:{position:"relative",transition:`opacity ${n.motionDurationSlow}`,"&::after":{position:"absolute",top:0,insetInlineEnd:0,bottom:0,insetInlineStart:0,zIndex:10,width:"100%",height:"100%",background:n.colorBgContainer,opacity:0,transition:`all ${n.motionDurationSlow}`,content:'""',pointerEvents:"none"}},[`${t}-blur`]:{clear:"both",opacity:.5,userSelect:"none",pointerEvents:"none","&::after":{opacity:.4,pointerEvents:"auto"}}},"&-tip":{color:n.spinDotDefault},[`${t}-dot`]:{position:"relative",display:"inline-block",fontSize:n.dotSize,width:"1em",height:"1em","&-item":{position:"absolute",display:"block",width:e(n.dotSize).sub(e(n.marginXXS).div(2)).div(2).equal(),height:e(n.dotSize).sub(e(n.marginXXS).div(2)).div(2).equal(),backgroundColor:n.colorPrimary,borderRadius:"100%",transform:"scale(0.75)",transformOrigin:"50% 50%",opacity:.3,animationName:_,animationDuration:"1s",animationIterationCount:"infinite",animationTimingFunction:"linear",animationDirection:"alternate","&:nth-child(1)":{top:0,insetInlineStart:0,animationDelay:"0s"},"&:nth-child(2)":{top:0,insetInlineEnd:0,animationDelay:"0.4s"},"&:nth-child(3)":{insetInlineEnd:0,bottom:0,animationDelay:"0.8s"},"&:nth-child(4)":{bottom:0,insetInlineStart:0,animationDelay:"1.2s"}},"&-spin":{transform:"rotate(45deg)",animationName:V,animationDuration:"1.2s",animationIterationCount:"infinite",animationTimingFunction:"linear"}},[`&-sm ${t}-dot`]:{fontSize:n.dotSizeSM,i:{width:e(e(n.dotSizeSM).sub(e(n.marginXXS).div(2))).div(2).equal(),height:e(e(n.dotSizeSM).sub(e(n.marginXXS).div(2))).div(2).equal()}},[`&-lg ${t}-dot`]:{fontSize:n.dotSizeLG,i:{width:e(e(n.dotSizeLG).sub(n.marginXXS)).div(2).equal(),height:e(e(n.dotSizeLG).sub(n.marginXXS)).div(2).equal()}},[`&${t}-show-text ${t}-text`]:{display:"block"}})}},X=n=>{const{controlHeightLG:t,controlHeight:e}=n;return{contentHeight:400,dotSize:t/2,dotSizeSM:t*.35,dotSizeLG:e}},Z=P("Spin",n=>{const t=q(n,{spinDotDefault:n.colorTextDescription});return[J(t)]},X);var Q=function(n,t){var e={};for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&t.indexOf(i)<0&&(e[i]=n[i]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,i=Object.getOwnPropertySymbols(n);o<i.length;o++)t.indexOf(i[o])<0&&Object.prototype.propertyIsEnumerable.call(n,i[o])&&(e[i[o]]=n[i[o]]);return e};let T=null;function W(n,t){const{indicator:e}=t,i=`${n}-dot`;return e===null?null:a.isValidElement(e)?M(e,{className:b(e.props.className,i)}):a.isValidElement(T)?M(T,{className:b(T.props.className,i)}):a.createElement("span",{className:b(i,`${n}-dot-spin`)},a.createElement("i",{className:`${n}-dot-item`,key:1}),a.createElement("i",{className:`${n}-dot-item`,key:2}),a.createElement("i",{className:`${n}-dot-item`,key:3}),a.createElement("i",{className:`${n}-dot-item`,key:4}))}function K(n,t){return!!n&&!!t&&!isNaN(Number(t))}const z=n=>{const{prefixCls:t,spinning:e=!0,delay:i=0,className:o,rootClassName:p,size:v="default",tip:g,wrapperClassName:x,style:c,children:d,fullscreen:u=!1}=n,j=Q(n,["prefixCls","spinning","delay","className","rootClassName","size","tip","wrapperClassName","style","children","fullscreen"]),{getPrefixCls:S}=a.useContext(O),s=S("spin",t),[w,h,m]=Z(s),[r,f]=a.useState(()=>e&&!K(e,i));a.useEffect(()=>{if(e){const D=Y(i,()=>{f(!0)});return D(),()=>{var N;(N=D==null?void 0:D.cancel)===null||N===void 0||N.call(D)}}f(!1)},[i,e]);const B=a.useMemo(()=>typeof d<"u"&&!u,[d,u]),{direction:y,spin:l}=a.useContext(O),C=b(s,l==null?void 0:l.className,{[`${s}-sm`]:v==="small",[`${s}-lg`]:v==="large",[`${s}-spinning`]:r,[`${s}-show-text`]:!!g,[`${s}-fullscreen`]:u,[`${s}-fullscreen-show`]:u&&r,[`${s}-rtl`]:y==="rtl"},o,p,h,m),E=b(`${s}-container`,{[`${s}-blur`]:r}),R=L(j,["indicator"]),U=Object.assign(Object.assign({},l==null?void 0:l.style),c),I=a.createElement("div",Object.assign({},R,{style:U,className:C,"aria-live":"polite","aria-busy":r}),W(s,n),g&&(B||u)?a.createElement("div",{className:`${s}-text`},g):null);return w(B?a.createElement("div",Object.assign({},R,{className:b(`${s}-nested-loading`,x,h,m)}),r&&a.createElement("div",{key:"loading"},I),a.createElement("div",{className:E,key:"container"},d)):I)};z.setDefaultIndicator=n=>{T=n};const un=z;var k={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"defs",attrs:{},children:[{tag:"style",attrs:{}}]},{tag:"path",attrs:{d:"M840 192h-56v-72c0-13.3-10.7-24-24-24H168c-13.3 0-24 10.7-24 24v272c0 13.3 10.7 24 24 24h592c13.3 0 24-10.7 24-24V256h32v200H465c-22.1 0-40 17.9-40 40v136h-44c-4.4 0-8 3.6-8 8v228c0 .6.1 1.3.2 1.9A83.99 83.99 0 00457 960c46.4 0 84-37.6 84-84 0-2.1-.1-4.1-.2-6.1.1-.6.2-1.2.2-1.9V640c0-4.4-3.6-8-8-8h-44V520h351c22.1 0 40-17.9 40-40V232c0-22.1-17.9-40-40-40zM720 352H208V160h512v192zM477 876c0 11-9 20-20 20s-20-9-20-20V696h40v180z"}}]},name:"format-painter",theme:"outlined"};const nn=k;var en=function(t,e){return a.createElement(F,A({},t,{ref:e,icon:nn}))},tn=a.forwardRef(en);const cn=tn,an=`declare namespace Big {
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
`,sn=`/// <reference path="./locale/index.d.ts" />

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
    day(): number
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
`,on=`/**
 * @param input
 * @param {{
 *  dayjs: import('dayjs')
 *  Big: import('big.js').BigConstructor
 * }} helpers
 */
const handler = (input, { dayjs, Big }) => {
  return input;
};
`,hn={dayjs:sn,"big.js":an},mn=on;export{cn as F,un as S,mn as d,hn as f};
