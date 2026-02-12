import{j as e}from"./index-CQHSiloJ.js";import{s as E}from"./ce-base-WZGwKeKc.js";import{f as S}from"./index-D5UsiwoX.js";import{r as n}from"./index-DQDNmYQF.js";import{t as j,c as k,z as w,g as C,a as P,V as R}from"./index-BPZMdQjL.js";import{C as x,a as M}from"./ce-preview-CIH6EqRd.js";import{T as i}from"./index-CMwgERd7.js";import"./index-DYVtDik4.js";import"./index-Bc_E4zOA.js";const J={title:"CodeEditor",component:x,parameters:{layout:"padded"},argTypes:{value:{type:"string"},maxRows:{type:"number"},disabled:{type:"boolean"},placeholder:{type:"string"},type:{control:{type:"radio"},options:["standard","unary","template"]},strict:{control:"boolean"},variableType:{control:{type:"object"}},expectedVariableType:{control:{type:"object"}},noStyle:{control:"boolean"},onChange:{table:{disable:!0}},onBlur:{table:{disable:!0}},onFocus:{table:{disable:!0}},lazy:{control:"boolean"}},args:{maxRows:3,placeholder:"Type expression...",type:"standard",disabled:!1,strict:!1,onChange:S(),onBlur:S(),onFocus:S(),variableType:{customer:{firstName:"John",lastName:"Doe",groups:["admin"]},cart:{totals:100,items:[{id:1,qty:2,price:20},{id:2,qty:1,price:50}]}}}},c={},y={render:r=>{const[t,s]=n.useState("");return e.jsx(x,{...r,value:t,onChange:s})}},u={args:{fullHeight:!0},decorators:[r=>e.jsx("div",{style:{height:200},children:e.jsx(r,{})})]},g={args:{noStyle:!0},decorators:[r=>e.jsxs(e.Fragment,{children:[e.jsx("p",{children:"Parent border"}),e.jsx("div",{style:{border:"1px solid blue"},children:e.jsx(r,{})})]})]},h={args:{showTypeInfo:!1,showParserState:!1,showEditorState:!1},argTypes:{showTypeInfo:{control:"boolean",description:"Toggle type info visibility"},showParserState:{control:"boolean",description:"Toggle parser state visibility"},showEditorState:{control:"boolean",description:"Toggle editor state visibility"}},render:r=>{const{token:t}=j.useToken(),[s,d]=n.useState(""),[T,l]=n.useState(""),[b,v]=n.useState(""),f=n.useMemo(()=>k(r.variableType),[r.variableType]);return e.jsxs(e.Fragment,{children:[e.jsx(x,{...r,onChange:a=>{const p=w(r.type).with("standard",()=>C(a)).with("unary",()=>P(a)).otherwise(()=>null);l(p??"");const o=w(r.type).with("unary",()=>f.typeCheckUnary(a)).otherwise(()=>f.typeCheck(a));v(JSON.stringify(o,void 0,2))},onStateChange:a=>{const p=[];E(a).iterate({enter(o){p.push(`${o.name}[${o.from}:${o.to}] = ${o.type.isError}, ${o.node.tree?.children.length}`)}}),d(JSON.stringify(p,void 0,2))}}),r.showTypeInfo&&e.jsxs("div",{style:{marginTop:t.marginMD},children:[e.jsx(i.Text,{children:"Type Info (ZEN)"}),e.jsx("div",{style:{background:t.colorBgLayout,border:`1px solid ${t.colorBorder}`,borderRadius:t.borderRadiusOuter,padding:t.paddingSM},children:e.jsx(i.Text,{style:{whiteSpace:"pre",fontFamily:"monospace"},children:b})})]}),r.showParserState&&e.jsxs("div",{style:{marginTop:t.marginMD},children:[e.jsx(i.Text,{children:"Parser state (ZEN)"}),e.jsx("div",{style:{background:t.colorBgLayout,border:`1px solid ${t.colorBorder}`,borderRadius:t.borderRadiusOuter,padding:t.paddingSM},children:e.jsx(i.Text,{style:{whiteSpace:"pre",fontFamily:"monospace"},children:T})})]}),r.showEditorState&&e.jsxs("div",{style:{marginTop:t.marginMD},children:[e.jsx(i.Text,{children:"Editor state (CodeMirror)"}),e.jsx("div",{style:{background:t.colorBgLayout,border:`1px solid ${t.colorBorder}`,borderRadius:t.borderRadiusOuter,padding:t.paddingSM},children:e.jsx(i.Text,{style:{whiteSpace:"pre",fontFamily:"monospace"},children:s})})]})]})}},m={args:{noPreviewText:"Run simulation to see the results",initialExpression:'customer.firstName + " " + customer.lastName',initialResult:"John Doe"},argTypes:{noPreviewText:{type:"string"},initialExpression:{type:"string"},initialResult:{control:{type:"object"}}},render:({noPreviewText:r,initialResult:t,initialExpression:s,variableType:d,...T})=>{const[l,b]=n.useState(s),v=n.useMemo(()=>new R(d),[d]);return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16},children:[e.jsx(x,{...T,variableType:d,onChange:b,value:l}),e.jsx(M,{expression:l,noPreviewText:r,inputData:v,initial:{expression:s,result:t}})]})}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:"{}",...c.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState('');
    return <CodeEditor {...args} value={value} onChange={setValue} />;
  }
}`,...y.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    fullHeight: true
  },
  decorators: [Story => <div style={{
    height: 200
  }}>
        <Story />
      </div>]
}`,...u.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    noStyle: true
  },
  decorators: [Story => <>
        <p>Parent border</p>
        <div style={{
      border: '1px solid blue'
    }}>
          <Story />
        </div>
      </>]
}`,...g.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    showTypeInfo: false,
    showParserState: false,
    showEditorState: false
  },
  argTypes: {
    showTypeInfo: {
      control: 'boolean',
      description: 'Toggle type info visibility'
    },
    showParserState: {
      control: 'boolean',
      description: 'Toggle parser state visibility'
    },
    showEditorState: {
      control: 'boolean',
      description: 'Toggle editor state visibility'
    }
  },
  render: args => {
    const {
      token
    } = theme.useToken();
    const [editorState, setEditorState] = useState('');
    const [parserState, setParserState] = useState('');
    const [typeInfo, setTypeInfo] = useState('');
    const vt = useMemo(() => {
      return createVariableType(args.variableType);
    }, [args.variableType]);
    return <>
        <CodeEditor {...args} onChange={expression => {
        const ast = match(args.type).with('standard', () => generateAst(expression)).with('unary', () => generateAstUnary(expression)).otherwise(() => null);
        setParserState(ast ?? '');
        const typeInfo = match(args.type).with('unary', () => vt.typeCheckUnary(expression)).otherwise(() => vt.typeCheck(expression));
        setTypeInfo(JSON.stringify(typeInfo, undefined, 2));
      }} onStateChange={state => {
        const nodes: string[] = [];
        syntaxTree(state).iterate({
          enter(node: SyntaxNodeRef): boolean | void {
            nodes.push(\`\${node.name}[\${node.from}:\${node.to}] = \${node.type.isError}, \${node.node.tree?.children.length}\`);
          }
        });
        setEditorState(JSON.stringify(nodes, undefined, 2));
      }} />
        {args.showTypeInfo && <div style={{
        marginTop: token.marginMD
      }}>
            <Typography.Text>Type Info (ZEN)</Typography.Text>
            <div style={{
          background: token.colorBgLayout,
          border: \`1px solid \${token.colorBorder}\`,
          borderRadius: token.borderRadiusOuter,
          padding: token.paddingSM
        }}>
              <Typography.Text style={{
            whiteSpace: 'pre',
            fontFamily: 'monospace'
          }}>{typeInfo}</Typography.Text>
            </div>
          </div>}

        {args.showParserState && <div style={{
        marginTop: token.marginMD
      }}>
            <Typography.Text>Parser state (ZEN)</Typography.Text>
            <div style={{
          background: token.colorBgLayout,
          border: \`1px solid \${token.colorBorder}\`,
          borderRadius: token.borderRadiusOuter,
          padding: token.paddingSM
        }}>
              <Typography.Text style={{
            whiteSpace: 'pre',
            fontFamily: 'monospace'
          }}>{parserState}</Typography.Text>
            </div>
          </div>}

        {args.showEditorState && <div style={{
        marginTop: token.marginMD
      }}>
            <Typography.Text>Editor state (CodeMirror)</Typography.Text>
            <div style={{
          background: token.colorBgLayout,
          border: \`1px solid \${token.colorBorder}\`,
          borderRadius: token.borderRadiusOuter,
          padding: token.paddingSM
        }}>
              <Typography.Text style={{
            whiteSpace: 'pre',
            fontFamily: 'monospace'
          }}>{editorState}</Typography.Text>
            </div>
          </div>}
      </>;
  }
}`,...h.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    noPreviewText: 'Run simulation to see the results',
    initialExpression: 'customer.firstName + " " + customer.lastName',
    initialResult: 'John Doe'
  },
  argTypes: {
    noPreviewText: {
      type: 'string'
    },
    initialExpression: {
      type: 'string'
    },
    initialResult: {
      control: {
        type: 'object'
      }
    }
  },
  render: ({
    noPreviewText,
    initialResult,
    initialExpression,
    variableType,
    ...args
  }) => {
    const [expression, setExpression] = useState(initialExpression);
    const inputData = useMemo(() => {
      return new Variable(variableType);
    }, [variableType]);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }}>
        <CodeEditor {...args} variableType={variableType} onChange={setExpression} value={expression} />
        <CodeEditorPreview expression={expression} noPreviewText={noPreviewText} inputData={inputData} initial={{
        expression: initialExpression,
        result: initialResult
      }} />
      </div>;
  }
}`,...m.parameters?.docs?.source}}};const U=["Uncontrolled","Controlled","FullHeight","NoStyle","Debug","LivePreview"];export{y as Controlled,h as Debug,u as FullHeight,m as LivePreview,g as NoStyle,c as Uncontrolled,U as __namedExportsOrder,J as default};
