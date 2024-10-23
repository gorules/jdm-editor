import{j as e}from"./wrapNativeSuper-ezTqcbMv.js";import{C as o,s as S}from"./ce-FBWaPs5W.js";import{f as m}from"./index-BGHfnJZS.js";import{r as c}from"./index-uubelm5h.js";import{t as x,T as b}from"./index-BHA-8DXB.js";import"./index-BK_xiHMm.js";const W={title:"CodeEditor",component:o,argTypes:{value:{type:"string"},maxRows:{type:"number"},disabled:{type:"boolean"},placeholder:{type:"string"},type:{control:{type:"radio"},options:["standard","unary","template"]},strict:{control:"boolean"},variableType:{control:{type:"object"}},expectedVariableType:{control:{type:"object"}},noStyle:{control:"boolean"},onChange:{table:{disable:!0}},onBlur:{table:{disable:!0}},onFocus:{table:{disable:!0}}},args:{maxRows:3,placeholder:"Type expression...",type:"standard",disabled:!1,strict:!1,onChange:m(),onBlur:m(),onFocus:m(),variableType:{customer:{firstName:"John",lastName:"Doe",groups:["admin"]},cart:{totals:100,items:[{id:1,qty:2,price:20}]}}}},a=({children:r})=>e.jsx("div",{style:{maxWidth:900,padding:20},children:r}),s={render:r=>e.jsx(a,{children:e.jsx(o,{...r})})},d={render:r=>{const[t,u]=c.useState("");return e.jsx(a,{children:e.jsx(o,{...r,value:t,onChange:u})})}},l={render:()=>{const[r,t]=c.useState("");return e.jsx(a,{children:e.jsx("div",{style:{height:200},children:e.jsx(o,{fullHeight:!0,value:r,onChange:t})})})}},i={render:()=>{const[r,t]=c.useState("");return e.jsxs(a,{children:[e.jsx("p",{children:"Parent border"}),e.jsx("div",{style:{border:"1px solid blue"},children:e.jsx(o,{noStyle:!0,value:r,onChange:t})})]})}},p={render:r=>{const{token:t}=x.useToken(),[u,g]=c.useState("");return e.jsxs(a,{children:[e.jsx(o,{...r,onStateChange:h=>{const y=[];S(h).iterate({enter(n){y.push(`${n.name}[${n.from}:${n.to}] = ${n.type.isError}, ${n.node.tree?.children.length}`)}}),g(JSON.stringify(y,void 0,2))}}),e.jsx("div",{style:{background:t.colorBgLayout,border:`1px solid ${t.colorBorder}`,borderRadius:t.borderRadiusOuter,marginTop:t.marginMD,padding:t.paddingSM},children:e.jsx(b.Text,{style:{whiteSpace:"pre",fontFamily:"monospace"},children:u})})]})}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};const $=["Uncontrolled","Controlled","FullHeight","NoStyle","Debug"];export{d as Controlled,p as Debug,l as FullHeight,i as NoStyle,s as Uncontrolled,$ as __namedExportsOrder,W as default};
