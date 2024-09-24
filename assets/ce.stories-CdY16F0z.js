import{j as e}from"./jsx-runtime-QvZ8i92b.js";import{C as n,s as h}from"./ce-KvpqyJd-.js";import{r as u}from"./index-uubelm5h.js";import{t as S,T as x}from"./index-DHssZ0Ax.js";import"./index-BK_xiHMm.js";const f={title:"CodeEditor",component:n,argTypes:{value:{type:"string"},maxRows:{type:"number"},disabled:{type:"boolean"},placeholder:{type:"string"},type:{control:{type:"radio"},options:["standard","template"]},variableType:{control:{type:"object"}}},args:{maxRows:3,placeholder:"Type expression...",type:"standard",variableType:{customer:{firstName:"John",lastName:"Doe",groups:["admin"]},cart:{totals:100,items:[{id:1,qty:2,price:20}]}}}},a=({children:r})=>e.jsx("div",{style:{maxWidth:900,padding:20},children:r}),s={render:r=>e.jsx(a,{children:e.jsx(n,{...r})})},d={render:r=>{const[t,c]=u.useState("");return e.jsx(a,{children:e.jsx(n,{...r,value:t,onChange:c})})}},i={render:()=>{const[r,t]=u.useState("");return e.jsx(a,{children:e.jsx("div",{style:{height:200},children:e.jsx(n,{fullHeight:!0,value:r,onChange:t})})})}},p={render:()=>{const[r,t]=u.useState("");return e.jsxs(a,{children:[e.jsx("p",{children:"Parent border"}),e.jsx("div",{style:{border:"1px solid blue"},children:e.jsx(n,{noStyle:!0,value:r,onChange:t})})]})}},l={render:r=>{const{token:t}=S.useToken(),[c,y]=u.useState("");return e.jsxs(a,{children:[e.jsx(n,{...r,onStateChange:g=>{const m=[];h(g).iterate({enter(o){m.push(`${o.name}[${o.from}:${o.to}] = ${o.type.isError}, ${o.node.tree?.children.length}`)}}),y(JSON.stringify(m,void 0,2))}}),e.jsx("div",{style:{background:t.colorBgLayout,border:`1px solid ${t.colorBorder}`,borderRadius:t.borderRadiusOuter,marginTop:t.marginMD,padding:t.paddingSM},children:e.jsx(x.Text,{style:{whiteSpace:"pre",fontFamily:"monospace"},children:c})})]})}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: args => {
    return <StoryWrapper>
        <CodeEditor {...args} />
      </StoryWrapper>;
  }
}`,...s.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState('');
    return <StoryWrapper>
        <CodeEditor {...args} value={value} onChange={setValue} />
      </StoryWrapper>;
  }
}`,...d.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}};const E=["Uncontrolled","Controlled","FullHeight","NoStyle","Debug"];export{d as Controlled,l as Debug,i as FullHeight,p as NoStyle,s as Uncontrolled,E as __namedExportsOrder,f as default};
