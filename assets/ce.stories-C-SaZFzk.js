import{j as e,t as $,T as j}from"./index-ub0bM9Eu.js";import{C as d,s as k}from"./ce-Dde21WR3.js";import{r as E}from"./index-Dl6G-zuu.js";import"./assertThisInitialized-B7W8eO4F.js";import"./index-Dpv8hMKE.js";const B={title:"CodeEditor",component:d,argTypes:{value:{type:"string"},maxRows:{type:"number"},disabled:{type:"boolean"},placeholder:{type:"string"},type:{control:{type:"radio"},options:["standard","template"]}},args:{maxRows:3,placeholder:"Type expression...",type:"standard"}},i=({children:r})=>e.jsx("div",{style:{maxWidth:900,padding:20},children:r}),n={render:r=>e.jsx(i,{children:e.jsx(d,{...r})})},a={render:r=>{const[t,p]=E.useState("");return e.jsx(i,{children:e.jsx(d,{...r,value:t,onChange:p})})}},s={render:r=>{const{token:t}=$.useToken(),[p,f]=E.useState("");return e.jsxs(i,{children:[e.jsx(d,{...r,onStateChange:C=>{const c=[];k(C).iterate({enter(o){var l;c.push(`${o.name}[${o.from}:${o.to}] = ${o.type.isError}, ${(l=o.node.tree)==null?void 0:l.children.length}`)}}),f(JSON.stringify(c,void 0,2))}}),e.jsx("div",{style:{background:t.colorBgLayout,border:`1px solid ${t.colorBorder}`,borderRadius:t.borderRadiusOuter,marginTop:t.marginMD,padding:t.paddingSM},children:e.jsx(j.Text,{style:{whiteSpace:"pre",fontFamily:"monospace"},children:p})})]})}};var u,m,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: args => {
    return <StoryWrapper>
        <CodeEditor {...args} />
      </StoryWrapper>;
  }
}`,...(g=(m=n.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};var y,S,x;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState('');
    return <StoryWrapper>
        <CodeEditor {...args} value={value} onChange={setValue} />
      </StoryWrapper>;
  }
}`,...(x=(S=a.parameters)==null?void 0:S.docs)==null?void 0:x.source}}};var h,T,b;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
}`,...(b=(T=s.parameters)==null?void 0:T.docs)==null?void 0:b.source}}};const D=["Uncontrolled","Controlled","Debug"];export{a as Controlled,s as Debug,n as Uncontrolled,D as __namedExportsOrder,B as default};
