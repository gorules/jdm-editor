const __vite__fileDeps=["./DocsRenderer-K4EAMTCU-DheveoK-.js","./iframe-CwMLJigf.js","./index-CDs2tPxN.js","./react-18-B6Oh_BCg.js","./index-7f_Nov5Q.js","./_basePickBy-8Ga8qP8Q.js","./extends-CCbyfPlC.js","./index-DeF_QDKt.js","./_getPrototype-BVYyGuW-.js","./_commonjs-dynamic-modules-TDtrdbi3.js","./index-DU_eWLEQ.js","./index-DrFu-skq.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{_ as a}from"./iframe-CwMLJigf.js";import"../sb-preview/runtime.js";const{global:s}=__STORYBOOK_MODULE_GLOBAL__;var _=Object.entries(s.TAGS_OPTIONS??{}).reduce((e,r)=>{let[t,o]=r;return o.excludeFromDocsStories&&(e[t]=!0),e},{}),n={docs:{renderer:async()=>{let{DocsRenderer:e}=await a(()=>import("./DocsRenderer-K4EAMTCU-DheveoK-.js").then(r=>r.D),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11]),import.meta.url);return new e},stories:{filter:e=>{var r;return(e.tags||[]).filter(t=>_[t]).length===0&&!((r=e.parameters.docs)!=null&&r.disable)}}}};export{n as parameters};