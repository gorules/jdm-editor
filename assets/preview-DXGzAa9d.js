import{j as s}from"./wrapNativeSuper-ezTqcbMv.js";import{t as h,g as I,h as D}from"./index-BWuCg5DY.js";import{r as P}from"./index-uubelm5h.js";import{N as S}from"./index-DtG1W2XK.js";import{e as _}from"./dg-04uWhDPj.js";import"./ce-DYjq7voK.js";import"./function-BonP_60N.js";import"./index-BK_xiHMm.js";import"./index-D3eZ-H7s.js";import"./libs-BX0yEREY.js";import"./iframe-ByQUsenM.js";import"../sb-preview/runtime.js";import"./index-TW2i6qtr.js";var T="DARK_MODE";function g(e){"@babel/helpers - typeof";return g=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(r){return typeof r}:function(r){return r&&typeof Symbol=="function"&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},g(e)}var p;function k(e,r){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),o.push.apply(o,t)}return o}function w(e){for(var r=1;r<arguments.length;r++){var o=arguments[r]!=null?arguments[r]:{};r%2?k(Object(o),!0).forEach(function(t){M(e,t,o[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):k(Object(o)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))})}return e}function M(e,r,o){return r=R(r),r in e?Object.defineProperty(e,r,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[r]=o,e}function R(e){var r=H(e,"string");return g(r)==="symbol"?r:String(r)}function H(e,r){if(g(e)!=="object"||e===null)return e;var o=e[Symbol.toPrimitive];if(o!==void 0){var t=o.call(e,r||"default");if(g(t)!=="object")return t;throw new TypeError("@@toPrimitive must return a primitive value.")}return(r==="string"?String:Number)(e)}function m(e){return K(e)||L(e)||$(e)||N()}function N(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function $(e,r){if(e){if(typeof e=="string")return b(e,r);var o=Object.prototype.toString.call(e).slice(8,-1);if(o==="Object"&&e.constructor&&(o=e.constructor.name),o==="Map"||o==="Set")return Array.from(e);if(o==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))return b(e,r)}}function L(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function K(e){if(Array.isArray(e))return b(e)}function b(e,r){(r==null||r>e.length)&&(r=e.length);for(var o=0,t=new Array(r);o<r;o++)t[o]=e[o];return t}const{global:W}=__STORYBOOK_MODULE_GLOBAL__;__STORYBOOK_MODULE_CORE_EVENTS__;var E=W,q=E.document,y=E.window,C="sb-addon-themes-3";(p=y.matchMedia)===null||p===void 0||p.call(y,"(prefers-color-scheme: dark)");var v={classTarget:"body",dark:S.dark,darkClass:["dark"],light:S.light,lightClass:["light"],stylePreview:!1,userHasExplicitlySetTheTheme:!1},x=function(r){y.localStorage.setItem(C,JSON.stringify(r))},U=function(r,o){var t=o.current,a=o.darkClass,n=a===void 0?v.darkClass:a,l=o.lightClass,i=l===void 0?v.lightClass:l;if(t==="dark"){var c,u;(c=r.classList).remove.apply(c,m(d(i))),(u=r.classList).add.apply(u,m(d(n)))}else{var f,O;(f=r.classList).remove.apply(f,m(d(n))),(O=r.classList).add.apply(O,m(d(i)))}},d=function(r){var o=[];return o.concat(r).map(function(t){return t})},V=function(r){var o=q.querySelector(r.classTarget);o&&U(o,r)},B=function(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},o=y.localStorage.getItem(C);if(typeof o=="string"){var t=JSON.parse(o);return r&&(r.dark&&!_(t.dark,r.dark)&&(t.dark=r.dark,x(t)),r.light&&!_(t.light,r.light)&&(t.light=r.light,x(t))),t}return w(w({},v),r)};V(B());function J(e,r){return Z(e)||F(e,r)||G(e,r)||Y()}function Y(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function G(e,r){if(e){if(typeof e=="string")return A(e,r);var o=Object.prototype.toString.call(e).slice(8,-1);if(o==="Object"&&e.constructor&&(o=e.constructor.name),o==="Map"||o==="Set")return Array.from(e);if(o==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))return A(e,r)}}function A(e,r){(r==null||r>e.length)&&(r=e.length);for(var o=0,t=new Array(r);o<r;o++)t[o]=e[o];return t}function F(e,r){var o=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(o!=null){var t,a,n,l,i=[],c=!0,u=!1;try{if(n=(o=o.call(e)).next,r!==0)for(;!(c=(t=n.call(o)).done)&&(i.push(t.value),i.length!==r);c=!0);}catch(f){u=!0,a=f}finally{try{if(!c&&o.return!=null&&(l=o.return(),Object(l)!==l))return}finally{if(u)throw a}}return i}}function Z(e){if(Array.isArray(e))return e}const{addons:z,useState:Q,useEffect:X}=__STORYBOOK_MODULE_PREVIEW_API__;function rr(){var e=Q(B().current==="dark"),r=J(e,2),o=r[0],t=r[1];return X(function(){var a=z.getChannel();return a.on(T,t),function(){return a.off(T,t)}},[]),o}const j=({theme:{mode:e="light",token:r={},...o}={},prefixCls:t,children:a})=>{const n=P.useMemo(()=>{switch(e){case"dark":return h.darkAlgorithm;case"light":default:return h.defaultAlgorithm}},[e]);return s.jsxs(I,{prefixCls:t,theme:{...o,algorithm:n,token:{...r,mode:e}},children:[s.jsx(er,{mode:e}),a]})},er=({mode:e})=>{const{token:r}=h.useToken(),o=P.useMemo(()=>({"--grl-color-border":r.colorBorder,"--grl-color-border-hover":e==="light"?"#c3c3c3":"#555555","--grl-color-primary":r.colorPrimary,"--grl-color-primary-bg":r.colorPrimaryBg,"--grl-color-primary-bg-fade":e==="light"?"#f7f9fc":"#141414","--grl-color-primary-bg-hover":r.colorPrimaryBgHover,"--grl-color-primary-border":r.colorPrimaryBorder,"--grl-color-primary-border-hover":r.colorPrimaryBorderHover,"--grl-color-primary-text-hover":r.colorPrimaryTextHover,"--grl-color-success":r.colorSuccess,"--grl-color-success-bg":r.colorSuccessBg,"--grl-color-success-border":r.colorSuccessBorder,"--grl-color-error":r.colorError,"--grl-color-error-bg":r.colorErrorBg,"--grl-color-error-border":r.colorErrorBorder,"--grl-color-warning":r.colorWarning,"--grl-color-warning-bg":r.colorWarningBg,"--grl-color-warning-border":r.colorWarningBorder,"--grl-color-warning-text":r.colorWarningText,"--grl-color-info":r.colorInfo,"--grl-color-info-bg":r.colorInfoBg,"--grl-color-info-border":r.colorInfoBorder,"--grl-color-info-text":r.colorInfoText,"--grl-color-bg-layout":r.colorBgLayout,"--grl-color-bg-layout-fade":"#f8f8f8","--grl-color-bg-mask":r.colorBgMask,"--grl-color-bg-elevated":r.colorBgElevated,"--grl-color-bg-container":r.colorBgContainer,"--grl-color-bg-container-disabled":r.colorBgContainerDisabled,"--grl-color-bg-text-hover":r.colorBgTextHover,"--grl-color-primary-hover":r.colorPrimaryHover,"--grl-color-primary-active":r.colorPrimaryActive,"--grl-color-text":r.colorText,"--grl-color-text-placeholder":r.colorTextPlaceholder,"--grl-color-text-base":r.colorTextBase,"--grl-color-text-disabled":r.colorTextDisabled,"--grl-color-text-secondary":r.colorTextSecondary,"--grl-control-outline":r.controlOutline,"--grl-primary-color":r.colorPrimary,"--grl-primary-color-bg":r.colorPrimaryBg,"--grl-font-family":r.fontFamily,"--grl-line-height":r.lineHeight,"--grl-border-radius":`${r.borderRadius}px`,"--grl-decision-table-output":e==="light"?"#eaeaea":"#091422","--grl-decision-table-selected-row":e==="light"?"#f4faff":"#121720"}),[r,e]),t=Object.entries(o).map(([a,n])=>`  ${a}: ${n};`).join(`
`);return s.jsx("style",{dangerouslySetInnerHTML:{__html:`:root {
${t}
}`}})};j.__docgenInfo={description:"",methods:[],displayName:"JdmConfigProvider",props:{theme:{required:!1,tsType:{name:"intersection",raw:`Omit<AntThemeConfig, 'algorithm'> & {
  mode?: 'light' | 'dark';
}`,elements:[{name:"Omit",elements:[{name:"AntThemeConfig"},{name:"literal",value:"'algorithm'"}],raw:"Omit<AntThemeConfig, 'algorithm'>"},{name:"signature",type:"object",raw:`{
  mode?: 'light' | 'dark';
}`,signature:{properties:[{key:"mode",value:{name:"union",raw:"'light' | 'dark'",elements:[{name:"literal",value:"'light'"},{name:"literal",value:"'dark'"}],required:!1}}]}}]},description:"",defaultValue:{value:"{}",computed:!1}},prefixCls:{required:!1,tsType:{name:"string"},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};await D();const yr={actions:{argTypesRegex:"^on[A-Z].*"},parameters:{controls:{expanded:!0}},controls:{matchers:{color:/(background|color)$/i,date:/Date$/}}},pr={decorators:[e=>{const r=rr();return s.jsxs(j,{theme:{mode:r?"dark":"light"},children:[s.jsx("style",{dangerouslySetInnerHTML:{__html:`html { background-color: ${r?"#1f1f1f":"white"} }
              body {
                height: 100vh;
                padding: 0 !important;
              }
              #storybook-root {
                height: 100%;
              }
              `}}),s.jsx(e,{})]})}]};export{pr as default,yr as parameters};
