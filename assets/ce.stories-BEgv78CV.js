import{j as e}from"./index-CQHSiloJ.js";import{C as x,s as T,a as v}from"./ce-preview-DARqG33k.js";import{f as b}from"./index-D5UsiwoX.js";import{r as d}from"./index-DQDNmYQF.js";import{t as w,z as E,g as f,a as j,T as p,V as P}from"./wasm-B3LdTxtV.js";import"./index-DYVtDik4.js";const M={title:"CodeEditor",component:x,parameters:{layout:"padded"},argTypes:{value:{type:"string"},maxRows:{type:"number"},disabled:{type:"boolean"},placeholder:{type:"string"},type:{control:{type:"radio"},options:["standard","unary","template"]},strict:{control:"boolean"},variableType:{control:{type:"object"}},expectedVariableType:{control:{type:"object"}},noStyle:{control:"boolean"},onChange:{table:{disable:!0}},onBlur:{table:{disable:!0}},onFocus:{table:{disable:!0}}},args:{maxRows:3,placeholder:"Type expression...",type:"standard",disabled:!1,strict:!1,onChange:b(),onBlur:b(),onFocus:b(),variableType:{customer:{firstName:"John",lastName:"Doe",groups:["admin"]},cart:{totals:100,items:[{id:1,qty:2,price:20},{id:2,qty:1,price:50}]}}}},c={},u={render:r=>{const[t,o]=d.useState("");return e.jsx(x,{...r,value:t,onChange:o})}},g={args:{fullHeight:!0},decorators:[r=>e.jsx("div",{style:{height:200},children:e.jsx(r,{})})]},y={args:{noStyle:!0},decorators:[r=>e.jsxs(e.Fragment,{children:[e.jsx("p",{children:"Parent border"}),e.jsx("div",{style:{border:"1px solid blue"},children:e.jsx(r,{})})]})]},m={args:{showParserState:!0,showEditorState:!1},argTypes:{showParserState:{control:"boolean",description:"Toggle parser state visibility"},showEditorState:{control:"boolean",description:"Toggle editor state visibility"}},render:r=>{const{token:t}=w.useToken(),[o,a]=d.useState(""),[S,l]=d.useState("");return e.jsxs(e.Fragment,{children:[e.jsx(x,{...r,onChange:s=>{const n=E(r.type).with("standard",()=>f(s)).with("unary",()=>j(s)).otherwise(()=>null);l(n??"")},onStateChange:s=>{const n=[];T(s).iterate({enter(i){n.push(`${i.name}[${i.from}:${i.to}] = ${i.type.isError}, ${i.node.tree?.children.length}`)}}),a(JSON.stringify(n,void 0,2))}}),r.showParserState&&e.jsxs("div",{style:{marginTop:t.marginMD},children:[e.jsx(p.Text,{children:"Parser state (ZEN)"}),e.jsx("div",{style:{background:t.colorBgLayout,border:`1px solid ${t.colorBorder}`,borderRadius:t.borderRadiusOuter,padding:t.paddingSM},children:e.jsx(p.Text,{style:{whiteSpace:"pre",fontFamily:"monospace"},children:S})})]}),r.showEditorState&&e.jsxs("div",{style:{marginTop:t.marginMD},children:[e.jsx(p.Text,{children:"Editor state (CodeMirror)"}),e.jsx("div",{style:{background:t.colorBgLayout,border:`1px solid ${t.colorBorder}`,borderRadius:t.borderRadiusOuter,padding:t.paddingSM},children:e.jsx(p.Text,{style:{whiteSpace:"pre",fontFamily:"monospace"},children:o})})]})]})}},h={args:{noPreviewText:"Run simulation to see the results",initialExpression:'customer.firstName + " " + customer.lastName',initialResult:"John Doe"},argTypes:{noPreviewText:{type:"string"},initialExpression:{type:"string"},initialResult:{control:{type:"object"}}},render:({noPreviewText:r,initialResult:t,initialExpression:o,variableType:a,...S})=>{const[l,s]=d.useState(o),n=d.useMemo(()=>new P(a),[a]);return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16},children:[e.jsx(x,{...S,variableType:a,onChange:s,value:l}),e.jsx(v,{expression:l,noPreviewText:r,inputData:n,initial:{expression:o,result:t}})]})}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:"{}",...c.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState('');
    return <CodeEditor {...args} value={value} onChange={setValue} />;
  }
}`,...u.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    fullHeight: true
  },
  decorators: [Story => <div style={{
    height: 200
  }}>
        <Story />
      </div>]
}`,...g.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...y.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    showParserState: true,
    showEditorState: false
  },
  argTypes: {
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
    return <>
        <CodeEditor {...args} onChange={expression => {
        const ast = match(args.type).with('standard', () => generateAst(expression)).with('unary', () => generateAstUnary(expression)).otherwise(() => null);
        setParserState(ast ?? '');
      }} onStateChange={state => {
        const nodes: string[] = [];
        syntaxTree(state).iterate({
          enter(node: SyntaxNodeRef): boolean | void {
            nodes.push(\`\${node.name}[\${node.from}:\${node.to}] = \${node.type.isError}, \${node.node.tree?.children.length}\`);
          }
        });
        setEditorState(JSON.stringify(nodes, undefined, 2));
      }} />
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
}`,...m.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
}`,...h.parameters?.docs?.source}}};const B=["Uncontrolled","Controlled","FullHeight","NoStyle","Debug","LivePreview"];export{u as Controlled,m as Debug,g as FullHeight,h as LivePreview,y as NoStyle,c as Uncontrolled,B as __namedExportsOrder,M as default};
