import{j as e,t as O,T as w}from"./index-B6ko2aXS.js";import{C as n,s as B}from"./ce-1EWFs3kT.js";import{r as u}from"./index-CDs2tPxN.js";import"./extends-CCbyfPlC.js";import"./index-7f_Nov5Q.js";const L={title:"CodeEditor",component:n,argTypes:{value:{type:"string"},maxRows:{type:"number"},disabled:{type:"boolean"},placeholder:{type:"string"},type:{control:{type:"radio"},options:["standard","template"]}},args:{maxRows:3,placeholder:"Type expression...",type:"standard"}},a=({children:r})=>e.jsx("div",{style:{maxWidth:900,padding:20},children:r}),s={render:r=>e.jsx(a,{children:e.jsx(n,{...r})})},d={render:r=>{const[t,c]=u.useState("");return e.jsx(a,{children:e.jsx(n,{...r,value:t,onChange:c})})}},i={render:()=>{const[r,t]=u.useState("");return e.jsx(a,{children:e.jsx("div",{style:{height:200},children:e.jsx(n,{fullHeight:!0,value:r,onChange:t})})})}},p={render:()=>{const[r,t]=u.useState("");return e.jsxs(a,{children:[e.jsx("p",{children:"Parent border"}),e.jsx("div",{style:{border:"1px solid blue"},children:e.jsx(n,{noStyle:!0,value:r,onChange:t})})]})}},l={render:r=>{const{token:t}=O.useToken(),[c,R]=u.useState("");return e.jsxs(a,{children:[e.jsx(n,{...r,onStateChange:N=>{const g=[];B(N).iterate({enter(o){var m;g.push(`${o.name}[${o.from}:${o.to}] = ${o.type.isError}, ${(m=o.node.tree)==null?void 0:m.children.length}`)}}),R(JSON.stringify(g,void 0,2))}}),e.jsx("div",{style:{background:t.colorBgLayout,border:`1px solid ${t.colorBorder}`,borderRadius:t.borderRadiusOuter,marginTop:t.marginMD,padding:t.paddingSM},children:e.jsx(w.Text,{style:{whiteSpace:"pre",fontFamily:"monospace"},children:c})})]})}};var y,S,h;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: args => {
    return <StoryWrapper>
        <CodeEditor {...args} />
      </StoryWrapper>;
  }
}`,...(h=(S=s.parameters)==null?void 0:S.docs)==null?void 0:h.source}}};var x,v,b;d.parameters={...d.parameters,docs:{...(x=d.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState('');
    return <StoryWrapper>
        <CodeEditor {...args} value={value} onChange={setValue} />
      </StoryWrapper>;
  }
}`,...(b=(v=d.parameters)==null?void 0:v.docs)==null?void 0:b.source}}};var j,C,E;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState('');
    return <StoryWrapper>
        <div style={{
        height: 200
      }}>
          <CodeEditor fullHeight value={value} onChange={setValue} />
        </div>
      </StoryWrapper>;
  }
}`,...(E=(C=i.parameters)==null?void 0:C.docs)==null?void 0:E.source}}};var T,f,W;p.parameters={...p.parameters,docs:{...(T=p.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState('');
    return <StoryWrapper>
        <p>Parent border</p>
        <div style={{
        border: '1px solid blue'
      }}>
          <CodeEditor noStyle value={value} onChange={setValue} />
        </div>
      </StoryWrapper>;
  }
}`,...(W=(f=p.parameters)==null?void 0:f.docs)==null?void 0:W.source}}};var $,k,V;l.parameters={...l.parameters,docs:{...($=l.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: args => {
    const {
      token
    } = theme.useToken();
    const [editorState, setEditorState] = useState('');
    return <StoryWrapper>
        <CodeEditor {...args} onStateChange={state => {
        const nodes: string[] = [];
        syntaxTree(state).iterate({
          enter(node: SyntaxNodeRef): boolean | void {
            nodes.push(\`\${node.name}[\${node.from}:\${node.to}] = \${node.type.isError}, \${node.node.tree?.children.length}\`);
          }
        });
        setEditorState(JSON.stringify(nodes, undefined, 2));
      }} />
        <div style={{
        background: token.colorBgLayout,
        border: \`1px solid \${token.colorBorder}\`,
        borderRadius: token.borderRadiusOuter,
        marginTop: token.marginMD,
        padding: token.paddingSM
      }}>
          <Typography.Text style={{
          whiteSpace: 'pre',
          fontFamily: 'monospace'
        }}>{editorState}</Typography.Text>
        </div>
      </StoryWrapper>;
  }
}`,...(V=(k=l.parameters)==null?void 0:k.docs)==null?void 0:V.source}}};const P=["Uncontrolled","Controlled","FullHeight","NoStyle","Debug"];export{d as Controlled,l as Debug,i as FullHeight,p as NoStyle,s as Uncontrolled,P as __namedExportsOrder,L as default};
