import{b as v,g as O}from"./index-DQDNmYQF.js";import{r as b}from"./index-DYVtDik4.js";function g(n,a){for(var u=0;u<a.length;u++){const t=a[u];if(typeof t!="string"&&!Array.isArray(t)){for(const o in t)if(o!=="default"&&!(o in n)){const i=Object.getOwnPropertyDescriptor(t,o);i&&Object.defineProperty(n,o,i.get?i:{enumerable:!0,get:()=>t[o]})}}}return Object.freeze(Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}))}var _={exports:{}},s={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var d;function j(){if(d)return s;d=1;var n=v(),a=Symbol.for("react.element"),u=Symbol.for("react.fragment"),t=Object.prototype.hasOwnProperty,o=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,i={key:!0,ref:!0,__self:!0,__source:!0};function m(f,e,l){var r,p={},c=null,R=null;l!==void 0&&(c=""+l),e.key!==void 0&&(c=""+e.key),e.ref!==void 0&&(R=e.ref);for(r in e)t.call(e,r)&&!i.hasOwnProperty(r)&&(p[r]=e[r]);if(f&&f.defaultProps)for(r in e=f.defaultProps,e)p[r]===void 0&&(p[r]=e[r]);return{$$typeof:a,type:f,key:c,ref:R,props:p,_owner:o.current}}return s.Fragment=u,s.jsx=m,s.jsxs=m,s}var y;function E(){return y||(y=1,_.exports=j()),_.exports}var P=E(),x=b();const h=O(x),S=g({__proto__:null,default:h},[x]);export{S as R,h,P as j,x as r};
