import { default as default_2 } from 'react';
import { Dispatch } from 'react';
import { DragDropManager } from 'dnd-core';
import { EdgeChange } from 'reactflow';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { HandleProps } from 'reactflow';
import { InputProps } from 'antd';
import { linter } from '@codemirror/lint';
import { MenuProps } from 'antd';
import { Monaco } from '@monaco-editor/react';
import { MutableRefObject } from 'react';
import { Node as Node_2 } from 'reactflow';
import { NodeChange } from 'reactflow';
import { NodeProps } from 'reactflow';
import { ProOptions } from 'reactflow';
import { RadioGroupProps } from 'antd';
import { ReactFlowInstance } from 'reactflow';
import { RefObject } from 'react';
import { SelectProps } from 'antd';
import { SetStateAction } from 'react';
import { SpaceProps } from 'antd';
import { StoreApi } from 'zustand';
import { SwitchProps } from 'antd';
import { TabsProps } from 'antd';
import { ThemeConfig as ThemeConfig_2 } from 'antd';
import { UseBoundStore } from 'zustand';
import { useEdgesState } from 'reactflow';
import { useNodesState } from 'reactflow';
import { Variable } from '@gorules/zen-engine-wasm';
import { VariableType } from '@gorules/zen-engine-wasm';
import { WritableDraft } from 'immer';
import { XYPosition } from 'reactflow';
import { z } from 'zod';

export declare const addStrikethrough: (text?: string) => string;

export declare const anyNodeSchema: z.ZodObject<z.objectUtil.extendShape<{
    type: z.ZodEffects<z.ZodString, string, string>;
    content: z.ZodOptional<z.ZodNullable<z.ZodAny>>;
}, {
    id: z.ZodDefault<z.ZodString>;
    name: z.ZodString;
    position: z.ZodDefault<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>>;
}>, "strip", z.ZodTypeAny, {
    type: string;
    id: string;
    name: string;
    position: {
        x: number;
        y: number;
    };
    content?: any;
}, {
    type: string;
    name: string;
    content?: any;
    id?: string | undefined;
    position?: {
        x: number;
        y: number;
    } | undefined;
}>;

declare type Arrayable<T> = T | T[];

declare type AutosizeTextAreaProps = {
    maxRows: number;
} & default_2.DetailedHTMLProps<default_2.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

declare interface BaseItem {
    id?: string;
    _id?: string;
    [key: string]: any;
}

declare type BaseNode<Component extends string, InputName extends string, Inputs extends InputSchema<InputName>[], NodeData extends object = CreateDynamicType<Inputs>> = {
    kind: Component;
    icon?: default_2.ReactNode;
    color?: string;
    displayName: string;
    shortDescription?: string;
    group?: string;
    handleLeft?: boolean;
    handleRight?: boolean;
    inputs?: [...Inputs];
    generateNode?: CustomNodeSpecification<NodeData, Component>['generateNode'];
    renderNode?: CustomNodeSpecification<NodeData, Component>['renderNode'];
    onNodeAdd?: CustomNodeSpecification<NodeData, Component>['onNodeAdd'];
};

declare type BoolInput = {
    control: 'bool';
    label?: string;
};

export declare const buildDiffString: (currentValue: string, previousValue: string) => string;

export declare const calculateDiffGraph: (currentGraph: DecisionGraphType, previousGraph: DecisionGraphType, options?: ProcessNodesOptions) => DecisionGraphType;

export declare const CodeEditor: default_2.ForwardRefExoticComponent<{
    maxRows?: number;
    value?: string;
    onChange?: (value: string) => void;
    onStateChange?: (state: EditorState) => void;
    placeholder?: string;
    disabled?: boolean;
    type?: "unary" | "standard" | "template";
    lint?: boolean;
    strict?: boolean;
    fullHeight?: boolean;
    noStyle?: boolean;
    extension?: (params: ExtensionParams) => Extension;
    livePreview?: {
        input: unknown;
        fromSimulation: boolean;
        result?: unknown;
    };
    variableType?: any;
    expectedVariableType?: any;
} & Omit<default_2.HTMLAttributes<HTMLDivElement>, "disabled" | "onChange"> & default_2.RefAttributes<CodeEditorRef>>;

export declare type CodeEditorProps = {
    maxRows?: number;
    value?: string;
    onChange?: (value: string) => void;
    onStateChange?: (state: EditorState) => void;
    placeholder?: string;
    disabled?: boolean;
    type?: 'unary' | 'standard' | 'template';
    lint?: boolean;
    strict?: boolean;
    fullHeight?: boolean;
    noStyle?: boolean;
    extension?: (params: ExtensionParams) => Extension;
    livePreview?: {
        input: unknown;
        fromSimulation: boolean;
        result?: unknown;
    };
    variableType?: any;
    expectedVariableType?: any;
} & Omit<default_2.HTMLAttributes<HTMLDivElement>, 'disabled' | 'onChange'>;

export declare type CodeEditorRef = HTMLDivElement & {
    codeMirror: EditorView | null;
};

export declare const codemirror: {
    linter: typeof linter;
};

declare type ColumnType = 'inputs' | 'outputs';

export declare const compareAndUnifyLists: <T extends BaseItem>(newList: T[], oldList: T[], options?: DiffOptions<T>) => T[];

export declare const compareStringFields: (field1?: string | null, field2?: string | null) => boolean;

declare type ControlToType<T> = T extends keyof InputTypeMap ? InputTypeMap[T] : never;

declare type CreateDynamicType<T extends ReadonlyArray<unknown>, Result = {}> = T extends readonly [infer First, ...infer Rest] ? First extends {
    control: infer Control extends string;
    name: infer Name extends string;
} ? CreateDynamicType<Rest, Result & SplitPath<Name, ControlToType<Control>>> : Result : Result;

export declare const createJdmNode: <Component extends string, InputName extends string, Inputs extends InputSchema<InputName>[]>(n: BaseNode<Component, InputName, Inputs>) => CustomNodeSpecification<any, Component>;

declare type CustomDecisionNode<T> = {
    id: string;
    name: string;
    description?: string;
    type?: string;
    content?: T;
    position: XYPosition;
};

export declare const CustomKind = "customNode";

export declare const customNodeSchema: z.ZodObject<z.objectUtil.extendShape<{
    type: z.ZodLiteral<"customNode">;
    content: z.ZodObject<{
        kind: z.ZodString;
        config: z.ZodAny;
    }, "strip", z.ZodTypeAny, {
        kind: string;
        config?: any;
    }, {
        kind: string;
        config?: any;
    }>;
}, {
    id: z.ZodDefault<z.ZodString>;
    name: z.ZodString;
    position: z.ZodDefault<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>>;
}>, "strip", z.ZodTypeAny, {
    type: "customNode";
    content: {
        kind: string;
        config?: any;
    };
    id: string;
    name: string;
    position: {
        x: number;
        y: number;
    };
}, {
    type: "customNode";
    content: {
        kind: string;
        config?: any;
    };
    name: string;
    id?: string | undefined;
    position?: {
        x: number;
        y: number;
    } | undefined;
}>;

export declare type CustomNodeSpecification<Data extends object, Component extends string> = {
    kind: Component;
    color?: string;
    icon?: default_2.ReactNode;
    displayName: string;
    group?: string;
    documentationUrl?: string;
    shortDescription?: string;
    renderTab?: (props: {
        id: string;
        manager?: DragDropManager;
    }) => default_2.ReactNode;
    calculateDiff?: (current: any, previous: any) => [any, any];
    generateNode: (params: GenerateNodeParams_2) => Omit<DecisionNode, 'position' | 'id' | 'type' | 'content'> & {
        config?: Data;
    };
    renderNode: default_2.FC<MinimalNodeProps & {
        specification: MinimalNodeSpecification;
    }>;
    inferTypes?: {
        needsUpdate: (state: InferTypeData<Data>, prevState: InferTypeData<Data>) => boolean;
        determineOutputType: (state: InferTypeData<Data>) => VariableType;
    };
    onNodeAdd?: (node: CustomDecisionNode<{
        kind: Component;
        config: Data;
    }>) => Promise<CustomDecisionNode<{
        kind: Component;
        config: Data;
    }>>;
};

export declare const DECISION_GRAPH_CONTENT_TYPE = "application/vnd.gorules.decision";

export declare type DecisionEdge = {
    id: string;
    name?: string;
    sourceId: string;
    targetId: string;
    sourceHandle?: string | null;
    targetHandle?: string | null;
    type?: string;
    _diff?: {
        status: DiffStatus;
    };
};

export declare const DecisionGraph: default_2.ForwardRefExoticComponent<{
    manager?: DragDropManager;
} & DecisionGraphWrapperProps & DecisionGraphEmptyType & default_2.RefAttributes<GraphRef>>;

declare type DecisionGraphContextProps = {};

declare type DecisionGraphEmptyType = {
    id?: string;
    defaultValue?: DecisionGraphType;
    value?: DecisionGraphType;
    disabled?: boolean;
    components?: DecisionGraphStoreType['state']['components'];
    customNodes?: DecisionGraphStoreType['state']['customNodes'];
    hideLeftToolbar?: DecisionGraphStoreType['state']['hideLeftToolbar'];
    name?: DecisionGraphStoreType['state']['name'];
    viewConfigCta?: DecisionGraphStoreType['state']['viewConfigCta'];
    viewConfig?: DecisionGraphStoreType['state']['viewConfig'];
    onViewConfigCta?: DecisionGraphStoreType['listeners']['onViewConfigCta'];
    defaultActivePanel?: string;
    panels?: DecisionGraphStoreType['state']['panels'];
    onPanelsChange?: DecisionGraphStoreType['listeners']['onPanelsChange'];
    simulate?: DecisionGraphStoreType['state']['simulate'];
    onChange?: DecisionGraphStoreType['listeners']['onChange'];
    onReactFlowInit?: DecisionGraphStoreType['listeners']['onReactFlowInit'];
    onCodeExtension?: DecisionGraphStoreType['listeners']['onCodeExtension'];
    onFunctionReady?: DecisionGraphStoreType['listeners']['onFunctionReady'];
};

export declare type DecisionGraphProps = {
    manager?: DragDropManager;
} & DecisionGraphWrapperProps & DecisionGraphContextProps & DecisionGraphEmptyType;

export declare type DecisionGraphRef = GraphRef;

declare type DecisionGraphStoreType = {
    state: {
        id?: string;
        hideLeftToolbar?: boolean;
        components: NodeSpecification[];
        disabled?: boolean;
        decisionGraph: DecisionGraphType;
        hoveredEdgeId: string | null;
        openTabs: string[];
        activeTab: string;
        viewConfigCta?: string;
        viewConfig?: ViewConfig;
        name: string;
        customNodes: CustomNodeSpecification<object, any>[];
        panels?: PanelType[];
        activePanel?: string;
        onPanelsChange?: (val?: string) => void;
        simulate?: Simulation;
        compactMode?: boolean;
        nodeTypes: Record<string, Partial<Record<NodeTypeKind, VariableType>>>;
        globalType: Record<string, VariableType>;
    };
    references: {
        nodesState: MutableRefObject<ReturnType<typeof useNodesState>>;
        edgesState: MutableRefObject<ReturnType<typeof useEdgesState>>;
        reactFlowInstance: MutableRefObject<ReactFlowInstance | null>;
        graphClipboard: MutableRefObject<ReturnType<typeof useGraphClipboard>>;
    };
    actions: {
        setDecisionGraph: (val: Partial<DecisionGraphType>, options?: SetDecisionGraphOptions) => void;
        handleNodesChange: (nodesChange: NodeChange[]) => void;
        handleEdgesChange: (edgesChange: EdgeChange[]) => void;
        setNodes: (nodes: DecisionNode[]) => void;
        addNodes: (nodes: DecisionNode[]) => void;
        updateNode: (id: string, updater: DraftUpdateCallback<DecisionNode>) => void;
        removeNodes: (ids: string[]) => void;
        duplicateNodes: (ids: string[]) => void;
        copyNodes: (ids: string[]) => void;
        pasteNodes: () => void;
        setEdges: (edges: DecisionEdge[]) => void;
        addEdges: (edge: DecisionEdge[]) => void;
        removeEdges: (ids: string[]) => void;
        removeEdgeByHandleId: (handleId: string) => void;
        setHoveredEdgeId: (edgeId: string | null) => void;
        closeTab: (id: string, action?: string) => void;
        openTab: (id: string) => void;
        goToNode: (id: string) => void;
        setActivePanel: (panel?: string) => void;
        setCompactMode: (mode: boolean) => void;
        toggleCompactMode: () => void;
        setNodeType: (id: string, kind: NodeTypeKind, vt: VariableType) => void;
        removeNodeType: (id: string, kind?: NodeTypeKind) => void;
        triggerNodeSelect: (id: string, mode: 'toggle' | 'only') => void;
    };
    listeners: {
        onChange?: (val: DecisionGraphType) => void;
        onPanelsChange?: (val?: string) => void;
        onReactFlowInit?: (instance: ReactFlowInstance) => void;
        onCodeExtension?: CodeEditorProps['extension'];
        onFunctionReady?: (monaco: Monaco) => void;
        onViewConfigCta?: () => void;
    };
};

export declare type DecisionGraphType = {
    nodes: DecisionNode[];
    edges: DecisionEdge[];
};

declare type DecisionGraphWrapperProps = {
    reactFlowProOptions?: ProOptions;
    tabBarExtraContent?: GraphTabsProps['tabBarExtraContent'];
};

export declare const decisionModelSchema: z.ZodObject<{
    nodes: z.ZodDefault<z.ZodArray<z.ZodUnion<[z.ZodDiscriminatedUnion<"type", [z.ZodObject<z.objectUtil.extendShape<{
        type: z.ZodLiteral<NodeKind.Decision>;
        content: z.ZodObject<{
            key: z.ZodString;
            passThrough: z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodBoolean>>, boolean, boolean | null | undefined>;
            inputField: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodString>>>, string | null, string | null | undefined>;
            outputPath: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodString>>>, string | null, string | null | undefined>;
            executionMode: z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodEnum<["single", "loop"]>>>, "single" | "loop", "single" | "loop" | null | undefined>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            passThrough: boolean;
            inputField: string | null;
            outputPath: string | null;
            executionMode: "single" | "loop";
        }, {
            key: string;
            passThrough?: boolean | null | undefined;
            inputField?: string | null | undefined;
            outputPath?: string | null | undefined;
            executionMode?: "single" | "loop" | null | undefined;
        }>;
    }, {
        id: z.ZodDefault<z.ZodString>;
        name: z.ZodString;
        position: z.ZodDefault<z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
        }, {
            x: number;
            y: number;
        }>>;
    }>, "strip", z.ZodTypeAny, {
        type: NodeKind.Decision;
        content: {
            key: string;
            passThrough: boolean;
            inputField: string | null;
            outputPath: string | null;
            executionMode: "single" | "loop";
        };
        id: string;
        name: string;
        position: {
            x: number;
            y: number;
        };
    }, {
        type: NodeKind.Decision;
        content: {
            key: string;
            passThrough?: boolean | null | undefined;
            inputField?: string | null | undefined;
            outputPath?: string | null | undefined;
            executionMode?: "single" | "loop" | null | undefined;
        };
        name: string;
        id?: string | undefined;
        position?: {
            x: number;
            y: number;
        } | undefined;
    }>, z.ZodObject<z.objectUtil.extendShape<{
        type: z.ZodLiteral<NodeKind.Expression>;
        content: z.ZodObject<{
            expressions: z.ZodArray<z.ZodObject<{
                id: z.ZodDefault<z.ZodString>;
                key: z.ZodDefault<z.ZodString>;
                value: z.ZodDefault<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                value: string;
                key: string;
                id: string;
            }, {
                value?: string | undefined;
                key?: string | undefined;
                id?: string | undefined;
            }>, "many">;
            passThrough: z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodBoolean>>, boolean, boolean | null | undefined>;
            inputField: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodString>>>, string | null, string | null | undefined>;
            outputPath: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodString>>>, string | null, string | null | undefined>;
            executionMode: z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodEnum<["single", "loop"]>>>, "single" | "loop", "single" | "loop" | null | undefined>;
        }, "strip", z.ZodTypeAny, {
            passThrough: boolean;
            inputField: string | null;
            outputPath: string | null;
            executionMode: "single" | "loop";
            expressions: {
                value: string;
                key: string;
                id: string;
            }[];
        }, {
            expressions: {
                value?: string | undefined;
                key?: string | undefined;
                id?: string | undefined;
            }[];
            passThrough?: boolean | null | undefined;
            inputField?: string | null | undefined;
            outputPath?: string | null | undefined;
            executionMode?: "single" | "loop" | null | undefined;
        }>;
    }, {
        id: z.ZodDefault<z.ZodString>;
        name: z.ZodString;
        position: z.ZodDefault<z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
        }, {
            x: number;
            y: number;
        }>>;
    }>, "strip", z.ZodTypeAny, {
        type: NodeKind.Expression;
        content: {
            passThrough: boolean;
            inputField: string | null;
            outputPath: string | null;
            executionMode: "single" | "loop";
            expressions: {
                value: string;
                key: string;
                id: string;
            }[];
        };
        id: string;
        name: string;
        position: {
            x: number;
            y: number;
        };
    }, {
        type: NodeKind.Expression;
        content: {
            expressions: {
                value?: string | undefined;
                key?: string | undefined;
                id?: string | undefined;
            }[];
            passThrough?: boolean | null | undefined;
            inputField?: string | null | undefined;
            outputPath?: string | null | undefined;
            executionMode?: "single" | "loop" | null | undefined;
        };
        name: string;
        id?: string | undefined;
        position?: {
            x: number;
            y: number;
        } | undefined;
    }>, z.ZodObject<z.objectUtil.extendShape<{
        type: z.ZodLiteral<NodeKind.Function>;
        content: z.ZodOptional<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodObject<{
            source: z.ZodDefault<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            source: string;
        }, {
            source?: string | undefined;
        }>]>>>;
    }, {
        id: z.ZodDefault<z.ZodString>;
        name: z.ZodString;
        position: z.ZodDefault<z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
        }, {
            x: number;
            y: number;
        }>>;
    }>, "strip", z.ZodTypeAny, {
        type: NodeKind.Function;
        id: string;
        name: string;
        position: {
            x: number;
            y: number;
        };
        content?: string | {
            source: string;
        } | null | undefined;
    }, {
        type: NodeKind.Function;
        name: string;
        content?: string | {
            source?: string | undefined;
        } | null | undefined;
        id?: string | undefined;
        position?: {
            x: number;
            y: number;
        } | undefined;
    }>, z.ZodObject<z.objectUtil.extendShape<{
        type: z.ZodLiteral<NodeKind.DecisionTable>;
        content: z.ZodObject<{
            hitPolicy: z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodEnum<["first", "collect"]>>>, "first" | "collect", "first" | "collect" | null | undefined>;
            rules: z.ZodDefault<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodString>>, string, string | null | undefined>>, "many">>;
            inputs: z.ZodArray<z.ZodObject<{
                id: z.ZodDefault<z.ZodString>;
                name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                field: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                defaultValue: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                id: string;
                name?: string | null | undefined;
                field?: string | null | undefined;
                defaultValue?: string | null | undefined;
            }, {
                id?: string | undefined;
                name?: string | null | undefined;
                field?: string | null | undefined;
                defaultValue?: string | null | undefined;
            }>, "many">;
            outputs: z.ZodArray<z.ZodObject<{
                id: z.ZodDefault<z.ZodString>;
                name: z.ZodString;
                field: z.ZodString;
                defaultValue: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                id: string;
                name: string;
                field: string;
                defaultValue?: string | null | undefined;
            }, {
                name: string;
                field: string;
                id?: string | undefined;
                defaultValue?: string | null | undefined;
            }>, "many">;
            passThrough: z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodBoolean>>, boolean, boolean | null | undefined>;
            inputField: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodString>>>, string | null, string | null | undefined>;
            outputPath: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodString>>>, string | null, string | null | undefined>;
            executionMode: z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodEnum<["single", "loop"]>>>, "single" | "loop", "single" | "loop" | null | undefined>;
        }, "strip", z.ZodTypeAny, {
            passThrough: boolean;
            inputField: string | null;
            outputPath: string | null;
            executionMode: "single" | "loop";
            hitPolicy: "first" | "collect";
            rules: Record<string, string>[];
            inputs: {
                id: string;
                name?: string | null | undefined;
                field?: string | null | undefined;
                defaultValue?: string | null | undefined;
            }[];
            outputs: {
                id: string;
                name: string;
                field: string;
                defaultValue?: string | null | undefined;
            }[];
        }, {
            inputs: {
                id?: string | undefined;
                name?: string | null | undefined;
                field?: string | null | undefined;
                defaultValue?: string | null | undefined;
            }[];
            outputs: {
                name: string;
                field: string;
                id?: string | undefined;
                defaultValue?: string | null | undefined;
            }[];
            passThrough?: boolean | null | undefined;
            inputField?: string | null | undefined;
            outputPath?: string | null | undefined;
            executionMode?: "single" | "loop" | null | undefined;
            hitPolicy?: "first" | "collect" | null | undefined;
            rules?: Record<string, string | null | undefined>[] | undefined;
        }>;
    }, {
        id: z.ZodDefault<z.ZodString>;
        name: z.ZodString;
        position: z.ZodDefault<z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
        }, {
            x: number;
            y: number;
        }>>;
    }>, "strip", z.ZodTypeAny, {
        type: NodeKind.DecisionTable;
        content: {
            passThrough: boolean;
            inputField: string | null;
            outputPath: string | null;
            executionMode: "single" | "loop";
            hitPolicy: "first" | "collect";
            rules: Record<string, string>[];
            inputs: {
                id: string;
                name?: string | null | undefined;
                field?: string | null | undefined;
                defaultValue?: string | null | undefined;
            }[];
            outputs: {
                id: string;
                name: string;
                field: string;
                defaultValue?: string | null | undefined;
            }[];
        };
        id: string;
        name: string;
        position: {
            x: number;
            y: number;
        };
    }, {
        type: NodeKind.DecisionTable;
        content: {
            inputs: {
                id?: string | undefined;
                name?: string | null | undefined;
                field?: string | null | undefined;
                defaultValue?: string | null | undefined;
            }[];
            outputs: {
                name: string;
                field: string;
                id?: string | undefined;
                defaultValue?: string | null | undefined;
            }[];
            passThrough?: boolean | null | undefined;
            inputField?: string | null | undefined;
            outputPath?: string | null | undefined;
            executionMode?: "single" | "loop" | null | undefined;
            hitPolicy?: "first" | "collect" | null | undefined;
            rules?: Record<string, string | null | undefined>[] | undefined;
        };
        name: string;
        id?: string | undefined;
        position?: {
            x: number;
            y: number;
        } | undefined;
    }>, z.ZodObject<z.objectUtil.extendShape<{
        type: z.ZodLiteral<NodeKind.Switch>;
        content: z.ZodObject<{
            hitPolicy: z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodEnum<["first", "collect"]>>>, "first" | "collect", "first" | "collect" | null | undefined>;
            statements: z.ZodArray<z.ZodObject<{
                id: z.ZodDefault<z.ZodString>;
                condition: z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodString>>, string, string | null | undefined>;
                isDefault: z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodBoolean>>, boolean, boolean | null | undefined>;
            }, "strip", z.ZodTypeAny, {
                id: string;
                condition: string;
                isDefault: boolean;
            }, {
                id?: string | undefined;
                condition?: string | null | undefined;
                isDefault?: boolean | null | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            hitPolicy: "first" | "collect";
            statements: {
                id: string;
                condition: string;
                isDefault: boolean;
            }[];
        }, {
            statements: {
                id?: string | undefined;
                condition?: string | null | undefined;
                isDefault?: boolean | null | undefined;
            }[];
            hitPolicy?: "first" | "collect" | null | undefined;
        }>;
    }, {
        id: z.ZodDefault<z.ZodString>;
        name: z.ZodString;
        position: z.ZodDefault<z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
        }, {
            x: number;
            y: number;
        }>>;
    }>, "strip", z.ZodTypeAny, {
        type: NodeKind.Switch;
        content: {
            hitPolicy: "first" | "collect";
            statements: {
                id: string;
                condition: string;
                isDefault: boolean;
            }[];
        };
        id: string;
        name: string;
        position: {
            x: number;
            y: number;
        };
    }, {
        type: NodeKind.Switch;
        content: {
            statements: {
                id?: string | undefined;
                condition?: string | null | undefined;
                isDefault?: boolean | null | undefined;
            }[];
            hitPolicy?: "first" | "collect" | null | undefined;
        };
        name: string;
        id?: string | undefined;
        position?: {
            x: number;
            y: number;
        } | undefined;
    }>, z.ZodObject<z.objectUtil.extendShape<{
        type: z.ZodLiteral<"customNode">;
        content: z.ZodObject<{
            kind: z.ZodString;
            config: z.ZodAny;
        }, "strip", z.ZodTypeAny, {
            kind: string;
            config?: any;
        }, {
            kind: string;
            config?: any;
        }>;
    }, {
        id: z.ZodDefault<z.ZodString>;
        name: z.ZodString;
        position: z.ZodDefault<z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
        }, {
            x: number;
            y: number;
        }>>;
    }>, "strip", z.ZodTypeAny, {
        type: "customNode";
        content: {
            kind: string;
            config?: any;
        };
        id: string;
        name: string;
        position: {
            x: number;
            y: number;
        };
    }, {
        type: "customNode";
        content: {
            kind: string;
            config?: any;
        };
        name: string;
        id?: string | undefined;
        position?: {
            x: number;
            y: number;
        } | undefined;
    }>, z.ZodObject<z.objectUtil.extendShape<{
        type: z.ZodLiteral<NodeKind.Input>;
        content: z.ZodDefault<z.ZodObject<{
            schema: z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodString>>, string, string | null | undefined>;
        }, "strip", z.ZodTypeAny, {
            schema: string;
        }, {
            schema?: string | null | undefined;
        }>>;
    }, {
        id: z.ZodDefault<z.ZodString>;
        name: z.ZodString;
        position: z.ZodDefault<z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
        }, {
            x: number;
            y: number;
        }>>;
    }>, "strip", z.ZodTypeAny, {
        type: NodeKind.Input;
        content: {
            schema: string;
        };
        id: string;
        name: string;
        position: {
            x: number;
            y: number;
        };
    }, {
        type: NodeKind.Input;
        name: string;
        content?: {
            schema?: string | null | undefined;
        } | undefined;
        id?: string | undefined;
        position?: {
            x: number;
            y: number;
        } | undefined;
    }>, z.ZodObject<z.objectUtil.extendShape<{
        type: z.ZodLiteral<NodeKind.Output>;
        content: z.ZodDefault<z.ZodObject<{
            schema: z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodString>>, string, string | null | undefined>;
        }, "strip", z.ZodTypeAny, {
            schema: string;
        }, {
            schema?: string | null | undefined;
        }>>;
    }, {
        id: z.ZodDefault<z.ZodString>;
        name: z.ZodString;
        position: z.ZodDefault<z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
        }, {
            x: number;
            y: number;
        }>>;
    }>, "strip", z.ZodTypeAny, {
        type: NodeKind.Output;
        content: {
            schema: string;
        };
        id: string;
        name: string;
        position: {
            x: number;
            y: number;
        };
    }, {
        type: NodeKind.Output;
        name: string;
        content?: {
            schema?: string | null | undefined;
        } | undefined;
        id?: string | undefined;
        position?: {
            x: number;
            y: number;
        } | undefined;
    }>]>, z.ZodObject<z.objectUtil.extendShape<{
        type: z.ZodEffects<z.ZodString, string, string>;
        content: z.ZodOptional<z.ZodNullable<z.ZodAny>>;
    }, {
        id: z.ZodDefault<z.ZodString>;
        name: z.ZodString;
        position: z.ZodDefault<z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
        }, {
            x: number;
            y: number;
        }>>;
    }>, "strip", z.ZodTypeAny, {
        type: string;
        id: string;
        name: string;
        position: {
            x: number;
            y: number;
        };
        content?: any;
    }, {
        type: string;
        name: string;
        content?: any;
        id?: string | undefined;
        position?: {
            x: number;
            y: number;
        } | undefined;
    }>]>, "many">>;
    edges: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        sourceId: z.ZodString;
        targetId: z.ZodString;
        sourceHandle: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        type: z.ZodEnum<["edge"]>;
    }, "strip", z.ZodTypeAny, {
        type: "edge";
        id: string;
        sourceId: string;
        targetId: string;
        sourceHandle?: string | null | undefined;
    }, {
        type: "edge";
        id: string;
        sourceId: string;
        targetId: string;
        sourceHandle?: string | null | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    nodes: ({
        type: NodeKind.Decision;
        content: {
            key: string;
            passThrough: boolean;
            inputField: string | null;
            outputPath: string | null;
            executionMode: "single" | "loop";
        };
        id: string;
        name: string;
        position: {
            x: number;
            y: number;
        };
    } | {
        type: NodeKind.Expression;
        content: {
            passThrough: boolean;
            inputField: string | null;
            outputPath: string | null;
            executionMode: "single" | "loop";
            expressions: {
                value: string;
                key: string;
                id: string;
            }[];
        };
        id: string;
        name: string;
        position: {
            x: number;
            y: number;
        };
    } | {
        type: NodeKind.Function;
        id: string;
        name: string;
        position: {
            x: number;
            y: number;
        };
        content?: string | {
            source: string;
        } | null | undefined;
    } | {
        type: NodeKind.DecisionTable;
        content: {
            passThrough: boolean;
            inputField: string | null;
            outputPath: string | null;
            executionMode: "single" | "loop";
            hitPolicy: "first" | "collect";
            rules: Record<string, string>[];
            inputs: {
                id: string;
                name?: string | null | undefined;
                field?: string | null | undefined;
                defaultValue?: string | null | undefined;
            }[];
            outputs: {
                id: string;
                name: string;
                field: string;
                defaultValue?: string | null | undefined;
            }[];
        };
        id: string;
        name: string;
        position: {
            x: number;
            y: number;
        };
    } | {
        type: NodeKind.Switch;
        content: {
            hitPolicy: "first" | "collect";
            statements: {
                id: string;
                condition: string;
                isDefault: boolean;
            }[];
        };
        id: string;
        name: string;
        position: {
            x: number;
            y: number;
        };
    } | {
        type: "customNode";
        content: {
            kind: string;
            config?: any;
        };
        id: string;
        name: string;
        position: {
            x: number;
            y: number;
        };
    } | {
        type: NodeKind.Input;
        content: {
            schema: string;
        };
        id: string;
        name: string;
        position: {
            x: number;
            y: number;
        };
    } | {
        type: NodeKind.Output;
        content: {
            schema: string;
        };
        id: string;
        name: string;
        position: {
            x: number;
            y: number;
        };
    } | {
        type: string;
        id: string;
        name: string;
        position: {
            x: number;
            y: number;
        };
        content?: any;
    })[];
    edges: {
        type: "edge";
        id: string;
        sourceId: string;
        targetId: string;
        sourceHandle?: string | null | undefined;
    }[];
}, {
    nodes?: ({
        type: NodeKind.Decision;
        content: {
            key: string;
            passThrough?: boolean | null | undefined;
            inputField?: string | null | undefined;
            outputPath?: string | null | undefined;
            executionMode?: "single" | "loop" | null | undefined;
        };
        name: string;
        id?: string | undefined;
        position?: {
            x: number;
            y: number;
        } | undefined;
    } | {
        type: NodeKind.Expression;
        content: {
            expressions: {
                value?: string | undefined;
                key?: string | undefined;
                id?: string | undefined;
            }[];
            passThrough?: boolean | null | undefined;
            inputField?: string | null | undefined;
            outputPath?: string | null | undefined;
            executionMode?: "single" | "loop" | null | undefined;
        };
        name: string;
        id?: string | undefined;
        position?: {
            x: number;
            y: number;
        } | undefined;
    } | {
        type: NodeKind.Function;
        name: string;
        content?: string | {
            source?: string | undefined;
        } | null | undefined;
        id?: string | undefined;
        position?: {
            x: number;
            y: number;
        } | undefined;
    } | {
        type: NodeKind.DecisionTable;
        content: {
            inputs: {
                id?: string | undefined;
                name?: string | null | undefined;
                field?: string | null | undefined;
                defaultValue?: string | null | undefined;
            }[];
            outputs: {
                name: string;
                field: string;
                id?: string | undefined;
                defaultValue?: string | null | undefined;
            }[];
            passThrough?: boolean | null | undefined;
            inputField?: string | null | undefined;
            outputPath?: string | null | undefined;
            executionMode?: "single" | "loop" | null | undefined;
            hitPolicy?: "first" | "collect" | null | undefined;
            rules?: Record<string, string | null | undefined>[] | undefined;
        };
        name: string;
        id?: string | undefined;
        position?: {
            x: number;
            y: number;
        } | undefined;
    } | {
        type: NodeKind.Switch;
        content: {
            statements: {
                id?: string | undefined;
                condition?: string | null | undefined;
                isDefault?: boolean | null | undefined;
            }[];
            hitPolicy?: "first" | "collect" | null | undefined;
        };
        name: string;
        id?: string | undefined;
        position?: {
            x: number;
            y: number;
        } | undefined;
    } | {
        type: "customNode";
        content: {
            kind: string;
            config?: any;
        };
        name: string;
        id?: string | undefined;
        position?: {
            x: number;
            y: number;
        } | undefined;
    } | {
        type: NodeKind.Input;
        name: string;
        content?: {
            schema?: string | null | undefined;
        } | undefined;
        id?: string | undefined;
        position?: {
            x: number;
            y: number;
        } | undefined;
    } | {
        type: NodeKind.Output;
        name: string;
        content?: {
            schema?: string | null | undefined;
        } | undefined;
        id?: string | undefined;
        position?: {
            x: number;
            y: number;
        } | undefined;
    } | {
        type: string;
        name: string;
        content?: any;
        id?: string | undefined;
        position?: {
            x: number;
            y: number;
        } | undefined;
    })[] | undefined;
    edges?: {
        type: "edge";
        id: string;
        sourceId: string;
        targetId: string;
        sourceHandle?: string | null | undefined;
    }[] | undefined;
}>;

export declare type DecisionNode<T = any> = {
    id: string;
    name: string;
    description?: string;
    type?: NodeSchema['type'] | string;
    content?: T;
    position: Position;
    [privateSymbol]?: {
        dimensions?: {
            height?: number;
            width?: number;
        };
        selected?: boolean;
    };
    _diff?: {
        status: DiffStatus;
        fields?: Record<string, DiffMetadata>;
    };
};

export declare const decisionNodeSchema: z.ZodObject<z.objectUtil.extendShape<{
    type: z.ZodLiteral<NodeKind.Decision>;
    content: z.ZodObject<{
        key: z.ZodString;
        passThrough: z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodBoolean>>, boolean, boolean | null | undefined>;
        inputField: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodString>>>, string | null, string | null | undefined>;
        outputPath: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodString>>>, string | null, string | null | undefined>;
        executionMode: z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodEnum<["single", "loop"]>>>, "single" | "loop", "single" | "loop" | null | undefined>;
    }, "strip", z.ZodTypeAny, {
        key: string;
        passThrough: boolean;
        inputField: string | null;
        outputPath: string | null;
        executionMode: "single" | "loop";
    }, {
        key: string;
        passThrough?: boolean | null | undefined;
        inputField?: string | null | undefined;
        outputPath?: string | null | undefined;
        executionMode?: "single" | "loop" | null | undefined;
    }>;
}, {
    id: z.ZodDefault<z.ZodString>;
    name: z.ZodString;
    position: z.ZodDefault<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>>;
}>, "strip", z.ZodTypeAny, {
    type: NodeKind.Decision;
    content: {
        key: string;
        passThrough: boolean;
        inputField: string | null;
        outputPath: string | null;
        executionMode: "single" | "loop";
    };
    id: string;
    name: string;
    position: {
        x: number;
        y: number;
    };
}, {
    type: NodeKind.Decision;
    content: {
        key: string;
        passThrough?: boolean | null | undefined;
        inputField?: string | null | undefined;
        outputPath?: string | null | undefined;
        executionMode?: "single" | "loop" | null | undefined;
    };
    name: string;
    id?: string | undefined;
    position?: {
        x: number;
        y: number;
    } | undefined;
}>;

export declare const DecisionTable: default_2.FC<DecisionTableProps>;

declare type DecisionTableContextProps = {};

declare type DecisionTableEmptyType = {
    id?: string;
    name?: string;
    defaultValue?: DecisionTableType;
    value?: DecisionTableType;
    disabled?: boolean;
    disableHitPolicy?: boolean;
    cellRenderer?: (props: TableCellProps) => JSX.Element | null | undefined;
    inputsSchema?: SchemaSelectProps[];
    outputsSchema?: SchemaSelectProps[];
    permission?: DecisionTableStoreType['state']['permission'];
    debug?: {
        trace: SimulationTrace<SimulationTraceDataTable>;
        inputData?: GetNodeDataResult;
        snapshot: DecisionTableType;
    };
    minColWidth?: number;
    colWidth?: number;
    onChange?: (val: DecisionTableType) => void;
};

declare type DecisionTablePermission = 'edit:full' | 'edit:rules' | 'edit:values';

export declare type DecisionTableProps = {
    id?: string;
    tableHeight: string | number;
    mountDialogsOnBody?: boolean;
    manager?: DragDropManager;
} & DecisionTableContextProps & DecisionTableEmptyType;

export declare const decisionTableSchema: z.ZodObject<z.objectUtil.extendShape<{
    type: z.ZodLiteral<NodeKind.DecisionTable>;
    content: z.ZodObject<{
        hitPolicy: z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodEnum<["first", "collect"]>>>, "first" | "collect", "first" | "collect" | null | undefined>;
        rules: z.ZodDefault<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodString>>, string, string | null | undefined>>, "many">>;
        inputs: z.ZodArray<z.ZodObject<{
            id: z.ZodDefault<z.ZodString>;
            name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            field: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            defaultValue: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            name?: string | null | undefined;
            field?: string | null | undefined;
            defaultValue?: string | null | undefined;
        }, {
            id?: string | undefined;
            name?: string | null | undefined;
            field?: string | null | undefined;
            defaultValue?: string | null | undefined;
        }>, "many">;
        outputs: z.ZodArray<z.ZodObject<{
            id: z.ZodDefault<z.ZodString>;
            name: z.ZodString;
            field: z.ZodString;
            defaultValue: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            name: string;
            field: string;
            defaultValue?: string | null | undefined;
        }, {
            name: string;
            field: string;
            id?: string | undefined;
            defaultValue?: string | null | undefined;
        }>, "many">;
        passThrough: z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodBoolean>>, boolean, boolean | null | undefined>;
        inputField: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodString>>>, string | null, string | null | undefined>;
        outputPath: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodString>>>, string | null, string | null | undefined>;
        executionMode: z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodEnum<["single", "loop"]>>>, "single" | "loop", "single" | "loop" | null | undefined>;
    }, "strip", z.ZodTypeAny, {
        passThrough: boolean;
        inputField: string | null;
        outputPath: string | null;
        executionMode: "single" | "loop";
        hitPolicy: "first" | "collect";
        rules: Record<string, string>[];
        inputs: {
            id: string;
            name?: string | null | undefined;
            field?: string | null | undefined;
            defaultValue?: string | null | undefined;
        }[];
        outputs: {
            id: string;
            name: string;
            field: string;
            defaultValue?: string | null | undefined;
        }[];
    }, {
        inputs: {
            id?: string | undefined;
            name?: string | null | undefined;
            field?: string | null | undefined;
            defaultValue?: string | null | undefined;
        }[];
        outputs: {
            name: string;
            field: string;
            id?: string | undefined;
            defaultValue?: string | null | undefined;
        }[];
        passThrough?: boolean | null | undefined;
        inputField?: string | null | undefined;
        outputPath?: string | null | undefined;
        executionMode?: "single" | "loop" | null | undefined;
        hitPolicy?: "first" | "collect" | null | undefined;
        rules?: Record<string, string | null | undefined>[] | undefined;
    }>;
}, {
    id: z.ZodDefault<z.ZodString>;
    name: z.ZodString;
    position: z.ZodDefault<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>>;
}>, "strip", z.ZodTypeAny, {
    type: NodeKind.DecisionTable;
    content: {
        passThrough: boolean;
        inputField: string | null;
        outputPath: string | null;
        executionMode: "single" | "loop";
        hitPolicy: "first" | "collect";
        rules: Record<string, string>[];
        inputs: {
            id: string;
            name?: string | null | undefined;
            field?: string | null | undefined;
            defaultValue?: string | null | undefined;
        }[];
        outputs: {
            id: string;
            name: string;
            field: string;
            defaultValue?: string | null | undefined;
        }[];
    };
    id: string;
    name: string;
    position: {
        x: number;
        y: number;
    };
}, {
    type: NodeKind.DecisionTable;
    content: {
        inputs: {
            id?: string | undefined;
            name?: string | null | undefined;
            field?: string | null | undefined;
            defaultValue?: string | null | undefined;
        }[];
        outputs: {
            name: string;
            field: string;
            id?: string | undefined;
            defaultValue?: string | null | undefined;
        }[];
        passThrough?: boolean | null | undefined;
        inputField?: string | null | undefined;
        outputPath?: string | null | undefined;
        executionMode?: "single" | "loop" | null | undefined;
        hitPolicy?: "first" | "collect" | null | undefined;
        rules?: Record<string, string | null | undefined>[] | undefined;
    };
    name: string;
    id?: string | undefined;
    position?: {
        x: number;
        y: number;
    } | undefined;
}>;

declare type DecisionTableStoreType = {
    state: {
        id?: string;
        name?: string;
        decisionTable: DecisionTableType;
        cursor: TableCursor | null;
        disabled: boolean;
        disableHitPolicy: boolean;
        minColWidth: number;
        colWidth: number;
        permission?: DecisionTablePermission;
        inputVariableType?: VariableType;
        derivedVariableTypes: Record<string, VariableType>;
        inputsSchema?: SchemaSelectProps[];
        outputsSchema?: SchemaSelectProps[];
        debugIndex: number;
        calculatedInputData?: Variable;
        debug?: {
            snapshot: DecisionTableType;
            trace: SimulationTrace<SimulationTraceDataTable>;
            inputData?: GetNodeDataResult;
        };
    };
    actions: {
        setDecisionTable: (val: DecisionTableType) => void;
        setCursor: (cursor: TableCursor | null) => void;
        commitData: (data: string, cursor: TableCursor) => void;
        swapRows: (source: number, target: number) => void;
        addRowAbove: (target?: number) => void;
        addRowBelow: (target?: number) => void;
        removeRow: (target?: number) => void;
        addColumn: (type: ColumnType, column: TableSchemaItem) => void;
        updateColumn: (type: ColumnType, id: string, column: TableSchemaItem) => void;
        removeColumn: (type: ColumnType, id: string) => void;
        reorderColumns: (type: ColumnType, columns: TableSchemaItem[]) => void;
        updateHitPolicy: (hitPolicy: HitPolicy) => void;
    };
    listeners: {
        onChange?: (val: DecisionTableType) => void;
        cellRenderer?: (props: TableCellProps) => default_2.ReactNode | null | undefined;
        onColumnResize?: () => void;
    };
};

export declare type DecisionTableType = {
    hitPolicy: HitPolicy | string;
    passThrough?: boolean;
    inputField?: string;
    outputPath?: string;
    executionMode?: 'single' | 'loop';
    inputs: TableSchemaItem[];
    outputs: TableSchemaItem[];
    rules: Record<string, string>[];
} & Diff;

export declare type Diff<T = any> = {
    _diff?: DiffMetadata<T>;
};

export declare const DiffAutosizeTextArea: default_2.FC<DiffAutosizeTextAreaProps>;

export declare type DiffAutosizeTextAreaProps = AutosizeTextAreaProps & {
    previousValue?: string;
    displayDiff?: boolean;
    noStyle?: boolean;
};

export declare const DiffCodeEditor: default_2.ForwardRefExoticComponent<{
    maxRows?: number;
    value?: string;
    onChange?: (value: string) => void;
    onStateChange?: (state: EditorState) => void;
    placeholder?: string;
    disabled?: boolean;
    type?: "unary" | "standard" | "template";
    lint?: boolean;
    strict?: boolean;
    fullHeight?: boolean;
    noStyle?: boolean;
    extension?: (params: {
        type?: "standard" | "unary" | "template";
    }) => Extension;
    livePreview?: {
        input: unknown;
        fromSimulation: boolean;
        result?: unknown;
    };
    variableType?: any;
    expectedVariableType?: any;
} & Omit<default_2.HTMLAttributes<HTMLDivElement>, "disabled" | "onChange"> & {
    displayDiff?: boolean;
    previousValue?: string;
    noStyle?: boolean;
} & default_2.RefAttributes<CodeEditorRef>>;

export declare type DiffCodeEditorProps = CodeEditorProps & {
    displayDiff?: boolean;
    previousValue?: string;
    noStyle?: boolean;
};

export declare const DiffIcon: default_2.FC<{
    status?: DiffStatus;
} & default_2.HTMLAttributes<HTMLSpanElement>>;

export declare const DiffInput: default_2.FC<DiffInputProps>;

export declare type DiffInputProps = InputProps & {
    previousValue?: string;
    displayDiff?: boolean;
};

export declare type DiffMetadata<T = any> = {
    status?: DiffStatus;
    previousValue?: T;
    previousIndex?: number;
    currentIndex?: number;
    fields?: Record<string, DiffMetadata>;
};

declare interface DiffOptions<T extends BaseItem> {
    idField?: 'id' | '_id';
    compareFields?: (current: T, previous: T) => {
        hasChanges: boolean;
        fields?: Record<string, DiffMetadata>;
    };
}

export declare const DiffRadio: default_2.FC<DiffRadioProps>;

export declare type DiffRadioProps = {
    previousValue?: string;
    displayDiff?: boolean;
} & RadioGroupProps;

export declare const DiffSelect: default_2.FC<DiffSelectProps>;

export declare type DiffSelectProps = Omit<SelectProps, 'direction'> & {
    previousValue?: string;
    displayDiff?: boolean;
    direction?: SpaceProps['direction'];
};

export declare type DiffStatus = 'added' | 'removed' | 'modified' | 'unchanged' | 'moved';

export declare const DiffSwitch: default_2.FC<DiffSwitchProps>;

export declare type DiffSwitchProps = {
    previousChecked?: boolean;
    displayDiff?: boolean;
} & SwitchProps;

declare type DraftUpdateCallback<T> = (draft: WritableDraft<T>) => WritableDraft<T>;

export declare const edgeSchema: z.ZodObject<{
    id: z.ZodString;
    sourceId: z.ZodString;
    targetId: z.ZodString;
    sourceHandle: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    type: z.ZodEnum<["edge"]>;
}, "strip", z.ZodTypeAny, {
    type: "edge";
    id: string;
    sourceId: string;
    targetId: string;
    sourceHandle?: string | null | undefined;
}, {
    type: "edge";
    id: string;
    sourceId: string;
    targetId: string;
    sourceHandle?: string | null | undefined;
}>;

declare type ExposedStore<T> = UseBoundStore<StoreApi<T>> & {
    setState: (partial: Partial<T>) => void;
};

export declare const Expression: default_2.FC<ExpressionProps>;

declare type ExpressionControllerProps = {
    disabled?: boolean;
    defaultValue?: ExpressionEntry[];
    permission?: ExpressionStore['permission'];
    value?: ExpressionEntry[];
    onChange?: (value: ExpressionEntry[]) => void;
};

declare type ExpressionEntry = {
    id: string;
    key: string;
    value: string;
    _diff?: DiffMetadata;
};

export declare const expressionNodeSchema: z.ZodObject<z.objectUtil.extendShape<{
    type: z.ZodLiteral<NodeKind.Expression>;
    content: z.ZodObject<{
        expressions: z.ZodArray<z.ZodObject<{
            id: z.ZodDefault<z.ZodString>;
            key: z.ZodDefault<z.ZodString>;
            value: z.ZodDefault<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            value: string;
            key: string;
            id: string;
        }, {
            value?: string | undefined;
            key?: string | undefined;
            id?: string | undefined;
        }>, "many">;
        passThrough: z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodBoolean>>, boolean, boolean | null | undefined>;
        inputField: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodString>>>, string | null, string | null | undefined>;
        outputPath: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodString>>>, string | null, string | null | undefined>;
        executionMode: z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodEnum<["single", "loop"]>>>, "single" | "loop", "single" | "loop" | null | undefined>;
    }, "strip", z.ZodTypeAny, {
        passThrough: boolean;
        inputField: string | null;
        outputPath: string | null;
        executionMode: "single" | "loop";
        expressions: {
            value: string;
            key: string;
            id: string;
        }[];
    }, {
        expressions: {
            value?: string | undefined;
            key?: string | undefined;
            id?: string | undefined;
        }[];
        passThrough?: boolean | null | undefined;
        inputField?: string | null | undefined;
        outputPath?: string | null | undefined;
        executionMode?: "single" | "loop" | null | undefined;
    }>;
}, {
    id: z.ZodDefault<z.ZodString>;
    name: z.ZodString;
    position: z.ZodDefault<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>>;
}>, "strip", z.ZodTypeAny, {
    type: NodeKind.Expression;
    content: {
        passThrough: boolean;
        inputField: string | null;
        outputPath: string | null;
        executionMode: "single" | "loop";
        expressions: {
            value: string;
            key: string;
            id: string;
        }[];
    };
    id: string;
    name: string;
    position: {
        x: number;
        y: number;
    };
}, {
    type: NodeKind.Expression;
    content: {
        expressions: {
            value?: string | undefined;
            key?: string | undefined;
            id?: string | undefined;
        }[];
        passThrough?: boolean | null | undefined;
        inputField?: string | null | undefined;
        outputPath?: string | null | undefined;
        executionMode?: "single" | "loop" | null | undefined;
    };
    name: string;
    id?: string | undefined;
    position?: {
        x: number;
        y: number;
    } | undefined;
}>;

declare type ExpressionPermission = 'edit:full' | 'edit:values' | 'view';

export declare type ExpressionProps = {
    manager?: DragDropManager;
    debug?: ExpressionStore['debug'];
    hideCommandBar?: boolean;
} & ExpressionControllerProps;

declare type ExpressionStore = {
    disabled: boolean;
    permission?: ExpressionPermission;
    addRowAbove: (index?: number, data?: Partial<ExpressionEntry>) => void;
    addRowBelow: (index?: number, data?: Partial<ExpressionEntry>) => void;
    expressions: ExpressionEntry[];
    setExpressions: (expressions: ExpressionEntry[]) => void;
    swapRows: (sourceIndex: number, targetIndex: number) => void;
    updateRow: (index: number, update: Partial<Omit<ExpressionEntry, 'id'>>) => void;
    removeRow: (index: number) => void;
    inputVariableType?: VariableType;
    debugIndex: number;
    calculatedInputData?: Variable;
    debug?: {
        snapshot: z.infer<typeof expressionNodeSchema>['content'];
        trace: SimulationTrace<SimulationTraceDataExpression>;
        inputData?: GetNodeDataResult;
    };
};

declare type ExtensionParams = {
    type?: 'standard' | 'unary' | 'template';
};

declare const Function_2: default_2.FC<FunctionProps>;
export { Function_2 as Function }

declare type FunctionLibrary = {
    name: string;
    tagline: string;
    typeDef: string;
    importName?: string;
    documentationUrl?: string;
};

export declare const functionNodeSchema: z.ZodObject<z.objectUtil.extendShape<{
    type: z.ZodLiteral<NodeKind.Function>;
    content: z.ZodOptional<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodObject<{
        source: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        source: string;
    }, {
        source?: string | undefined;
    }>]>>>;
}, {
    id: z.ZodDefault<z.ZodString>;
    name: z.ZodString;
    position: z.ZodDefault<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>>;
}>, "strip", z.ZodTypeAny, {
    type: NodeKind.Function;
    id: string;
    name: string;
    position: {
        x: number;
        y: number;
    };
    content?: string | {
        source: string;
    } | null | undefined;
}, {
    type: NodeKind.Function;
    name: string;
    content?: string | {
        source?: string | undefined;
    } | null | undefined;
    id?: string | undefined;
    position?: {
        x: number;
        y: number;
    } | undefined;
}>;

export declare type FunctionPermission = 'edit:full';

export declare type FunctionProps = {
    disabled?: boolean;
    defaultValue?: string;
    disableDebug?: boolean;
    language?: string;
    value?: string;
    previousValue?: string;
    onChange?: (value: string) => void;
    trace?: SimulationTrace<SimulationTraceDataFunction>;
    onMonacoReady?: (monaco: Monaco) => void;
    libraries?: FunctionLibrary[];
    inputData?: unknown;
    permission?: FunctionPermission;
    error?: {
        data: {
            nodeId: string;
            source?: string;
        };
    };
};

declare type GenerateNodeParams = {
    index: number;
};

declare type GenerateNodeParams_2 = {
    index: number;
};

declare type GetNodeDataResult = {
    data: unknown;
    $nodes: unknown;
    $?: unknown;
};

export declare const GraphDecisionNode: default_2.FC<GraphDecisionNodeProps>;

export declare type GraphDecisionNodeProps = {
    name?: string;
    icon: default_2.ReactNode;
    type: default_2.ReactNode;
    helper?: (default_2.ReactNode | false)[];
    disabled?: boolean;
    isSelected?: boolean;
    children?: default_2.ReactNode;
    actions?: default_2.ReactNode[];
    status?: 'error' | 'success' | 'warning';
    diffStatus?: 'removed' | 'added' | 'modified' | 'moved';
    noBodyPadding?: boolean;
    color?: 'primary' | 'secondary' | string;
    menuItems?: MenuProps['items'];
    onNameChange?: (name: string) => void;
    compactMode?: boolean;
    listMode?: boolean;
    details?: default_2.ReactNode;
    detailsOpen?: boolean;
    detailsTitle?: string;
    onDetailsClose?: () => void;
};

export declare const GraphNode: default_2.ForwardRefExoticComponent<{
    id: string;
    handleLeft?: boolean | Partial<HandleProps>;
    handleRight?: boolean | Partial<HandleProps>;
    className?: string;
    specification: MinimalNodeSpecification;
    displayError?: boolean;
} & Partial<GraphDecisionNodeProps> & default_2.RefAttributes<HTMLDivElement>>;

export declare type GraphNodeProps = {
    id: string;
    handleLeft?: boolean | Partial<HandleProps>;
    handleRight?: boolean | Partial<HandleProps>;
    className?: string;
    specification: MinimalNodeSpecification;
    displayError?: boolean;
} & Partial<GraphDecisionNodeProps>;

declare type GraphRef = DecisionGraphStoreType['actions'] & {
    stateStore: ExposedStore<DecisionGraphStoreType['state']>;
};

export declare const GraphSimulator: default_2.FC<GraphSimulatorProps>;

export declare type GraphSimulatorProps = {
    onClear?: () => void;
    loading?: boolean;
    defaultRequest?: SimulatorRequestPanelProps['defaultRequest'];
    onChange?: SimulatorRequestPanelProps['onChange'];
    onRun?: SimulatorRequestPanelProps['onRun'];
    leftPanel?: default_2.FC<SimulatorRequestPanelProps>;
};

declare type GraphTabsProps = {
    disabled?: boolean;
    tabBarExtraContent?: TabsProps['tabBarExtraContent'];
};

declare type HitPolicy = 'first' | 'collect';

declare type InferredContent = z.infer<typeof inputNodeSchema>['content'];

declare type InferredContent_2 = z.infer<typeof outputNodeSchema>['content'];

declare type InferredContent_3 = z.infer<typeof decisionTableSchema>['content'];

declare type InferredContent_4 = z.infer<typeof expressionNodeSchema>['content'];

declare type InferTypeData<T> = {
    input: VariableType;
    content: T;
};

declare type Input = unknown;

export declare const inputNodeSchema: z.ZodObject<z.objectUtil.extendShape<{
    type: z.ZodLiteral<NodeKind.Input>;
    content: z.ZodDefault<z.ZodObject<{
        schema: z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodString>>, string, string | null | undefined>;
    }, "strip", z.ZodTypeAny, {
        schema: string;
    }, {
        schema?: string | null | undefined;
    }>>;
}, {
    id: z.ZodDefault<z.ZodString>;
    name: z.ZodString;
    position: z.ZodDefault<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>>;
}>, "strip", z.ZodTypeAny, {
    type: NodeKind.Input;
    content: {
        schema: string;
    };
    id: string;
    name: string;
    position: {
        x: number;
        y: number;
    };
}, {
    type: NodeKind.Input;
    name: string;
    content?: {
        schema?: string | null | undefined;
    } | undefined;
    id?: string | undefined;
    position?: {
        x: number;
        y: number;
    } | undefined;
}>;

declare type InputSchema<Name extends string> = {
    name: Name;
} & (BoolInput | TextInput);

declare type InputTypeMap = {
    bool: boolean;
    text: string;
};

export declare const JdmConfigProvider: default_2.FC<JdmConfigProviderProps>;

export declare type JdmConfigProviderProps = {
    theme?: ThemeConfig;
    prefixCls?: string;
    children?: default_2.ReactNode;
};

export declare type MinimalNodeProps = Pick<NodeProps, 'id' | 'data' | 'selected'>;

export declare type MinimalNodeSpecification = Pick<NodeSpecification, 'color' | 'icon' | 'displayName' | 'documentationUrl' | 'helper' | 'renderSettings'>;

export declare enum NodeColor {
    Blue = "var(--node-color-blue)",
    Purple = "var(--node-color-purple)",
    Orange = "var(--node-color-orange)",
    Green = "var(--node-color-green)"
}

declare type NodeDecisionTableData = Omit<InferredContent_3, 'inputs' | 'outputs' | 'rules'> & Diff & {
    rules: (InferredContent_3['rules'][0] & Diff)[];
    inputs: (InferredContent_3['inputs'][0] & Diff)[];
    outputs: (InferredContent_3['outputs'][0] & Diff)[];
};

declare type NodeExpressionData = Omit<InferredContent_4, 'expressions'> & Diff & {
    expressions: (InferredContent_4['expressions'][0] & Diff)[];
};

declare type NodeFunctionData = string | {
    source: string;
};

declare type NodeInputData = InferredContent & Diff;

export declare enum NodeKind {
    Input = "inputNode",
    Output = "outputNode",
    DecisionTable = "decisionTableNode",
    Function = "functionNode",
    Expression = "expressionNode",
    Switch = "switchNode",
    Decision = "decisionNode"
}

declare type NodeOutputData = InferredContent_2 & Diff;

declare type NodeSchema = z.infer<typeof nodeSchema>;

export declare const nodeSchema: z.ZodUnion<[z.ZodDiscriminatedUnion<"type", [z.ZodObject<z.objectUtil.extendShape<{
    type: z.ZodLiteral<NodeKind.Decision>;
    content: z.ZodObject<{
        key: z.ZodString;
        passThrough: z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodBoolean>>, boolean, boolean | null | undefined>;
        inputField: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodString>>>, string | null, string | null | undefined>;
        outputPath: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodString>>>, string | null, string | null | undefined>;
        executionMode: z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodEnum<["single", "loop"]>>>, "single" | "loop", "single" | "loop" | null | undefined>;
    }, "strip", z.ZodTypeAny, {
        key: string;
        passThrough: boolean;
        inputField: string | null;
        outputPath: string | null;
        executionMode: "single" | "loop";
    }, {
        key: string;
        passThrough?: boolean | null | undefined;
        inputField?: string | null | undefined;
        outputPath?: string | null | undefined;
        executionMode?: "single" | "loop" | null | undefined;
    }>;
}, {
    id: z.ZodDefault<z.ZodString>;
    name: z.ZodString;
    position: z.ZodDefault<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>>;
}>, "strip", z.ZodTypeAny, {
    type: NodeKind.Decision;
    content: {
        key: string;
        passThrough: boolean;
        inputField: string | null;
        outputPath: string | null;
        executionMode: "single" | "loop";
    };
    id: string;
    name: string;
    position: {
        x: number;
        y: number;
    };
}, {
    type: NodeKind.Decision;
    content: {
        key: string;
        passThrough?: boolean | null | undefined;
        inputField?: string | null | undefined;
        outputPath?: string | null | undefined;
        executionMode?: "single" | "loop" | null | undefined;
    };
    name: string;
    id?: string | undefined;
    position?: {
        x: number;
        y: number;
    } | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    type: z.ZodLiteral<NodeKind.Expression>;
    content: z.ZodObject<{
        expressions: z.ZodArray<z.ZodObject<{
            id: z.ZodDefault<z.ZodString>;
            key: z.ZodDefault<z.ZodString>;
            value: z.ZodDefault<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            value: string;
            key: string;
            id: string;
        }, {
            value?: string | undefined;
            key?: string | undefined;
            id?: string | undefined;
        }>, "many">;
        passThrough: z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodBoolean>>, boolean, boolean | null | undefined>;
        inputField: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodString>>>, string | null, string | null | undefined>;
        outputPath: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodString>>>, string | null, string | null | undefined>;
        executionMode: z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodEnum<["single", "loop"]>>>, "single" | "loop", "single" | "loop" | null | undefined>;
    }, "strip", z.ZodTypeAny, {
        passThrough: boolean;
        inputField: string | null;
        outputPath: string | null;
        executionMode: "single" | "loop";
        expressions: {
            value: string;
            key: string;
            id: string;
        }[];
    }, {
        expressions: {
            value?: string | undefined;
            key?: string | undefined;
            id?: string | undefined;
        }[];
        passThrough?: boolean | null | undefined;
        inputField?: string | null | undefined;
        outputPath?: string | null | undefined;
        executionMode?: "single" | "loop" | null | undefined;
    }>;
}, {
    id: z.ZodDefault<z.ZodString>;
    name: z.ZodString;
    position: z.ZodDefault<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>>;
}>, "strip", z.ZodTypeAny, {
    type: NodeKind.Expression;
    content: {
        passThrough: boolean;
        inputField: string | null;
        outputPath: string | null;
        executionMode: "single" | "loop";
        expressions: {
            value: string;
            key: string;
            id: string;
        }[];
    };
    id: string;
    name: string;
    position: {
        x: number;
        y: number;
    };
}, {
    type: NodeKind.Expression;
    content: {
        expressions: {
            value?: string | undefined;
            key?: string | undefined;
            id?: string | undefined;
        }[];
        passThrough?: boolean | null | undefined;
        inputField?: string | null | undefined;
        outputPath?: string | null | undefined;
        executionMode?: "single" | "loop" | null | undefined;
    };
    name: string;
    id?: string | undefined;
    position?: {
        x: number;
        y: number;
    } | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    type: z.ZodLiteral<NodeKind.Function>;
    content: z.ZodOptional<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodObject<{
        source: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        source: string;
    }, {
        source?: string | undefined;
    }>]>>>;
}, {
    id: z.ZodDefault<z.ZodString>;
    name: z.ZodString;
    position: z.ZodDefault<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>>;
}>, "strip", z.ZodTypeAny, {
    type: NodeKind.Function;
    id: string;
    name: string;
    position: {
        x: number;
        y: number;
    };
    content?: string | {
        source: string;
    } | null | undefined;
}, {
    type: NodeKind.Function;
    name: string;
    content?: string | {
        source?: string | undefined;
    } | null | undefined;
    id?: string | undefined;
    position?: {
        x: number;
        y: number;
    } | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    type: z.ZodLiteral<NodeKind.DecisionTable>;
    content: z.ZodObject<{
        hitPolicy: z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodEnum<["first", "collect"]>>>, "first" | "collect", "first" | "collect" | null | undefined>;
        rules: z.ZodDefault<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodString>>, string, string | null | undefined>>, "many">>;
        inputs: z.ZodArray<z.ZodObject<{
            id: z.ZodDefault<z.ZodString>;
            name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            field: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            defaultValue: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            name?: string | null | undefined;
            field?: string | null | undefined;
            defaultValue?: string | null | undefined;
        }, {
            id?: string | undefined;
            name?: string | null | undefined;
            field?: string | null | undefined;
            defaultValue?: string | null | undefined;
        }>, "many">;
        outputs: z.ZodArray<z.ZodObject<{
            id: z.ZodDefault<z.ZodString>;
            name: z.ZodString;
            field: z.ZodString;
            defaultValue: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            name: string;
            field: string;
            defaultValue?: string | null | undefined;
        }, {
            name: string;
            field: string;
            id?: string | undefined;
            defaultValue?: string | null | undefined;
        }>, "many">;
        passThrough: z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodBoolean>>, boolean, boolean | null | undefined>;
        inputField: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodString>>>, string | null, string | null | undefined>;
        outputPath: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodString>>>, string | null, string | null | undefined>;
        executionMode: z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodEnum<["single", "loop"]>>>, "single" | "loop", "single" | "loop" | null | undefined>;
    }, "strip", z.ZodTypeAny, {
        passThrough: boolean;
        inputField: string | null;
        outputPath: string | null;
        executionMode: "single" | "loop";
        hitPolicy: "first" | "collect";
        rules: Record<string, string>[];
        inputs: {
            id: string;
            name?: string | null | undefined;
            field?: string | null | undefined;
            defaultValue?: string | null | undefined;
        }[];
        outputs: {
            id: string;
            name: string;
            field: string;
            defaultValue?: string | null | undefined;
        }[];
    }, {
        inputs: {
            id?: string | undefined;
            name?: string | null | undefined;
            field?: string | null | undefined;
            defaultValue?: string | null | undefined;
        }[];
        outputs: {
            name: string;
            field: string;
            id?: string | undefined;
            defaultValue?: string | null | undefined;
        }[];
        passThrough?: boolean | null | undefined;
        inputField?: string | null | undefined;
        outputPath?: string | null | undefined;
        executionMode?: "single" | "loop" | null | undefined;
        hitPolicy?: "first" | "collect" | null | undefined;
        rules?: Record<string, string | null | undefined>[] | undefined;
    }>;
}, {
    id: z.ZodDefault<z.ZodString>;
    name: z.ZodString;
    position: z.ZodDefault<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>>;
}>, "strip", z.ZodTypeAny, {
    type: NodeKind.DecisionTable;
    content: {
        passThrough: boolean;
        inputField: string | null;
        outputPath: string | null;
        executionMode: "single" | "loop";
        hitPolicy: "first" | "collect";
        rules: Record<string, string>[];
        inputs: {
            id: string;
            name?: string | null | undefined;
            field?: string | null | undefined;
            defaultValue?: string | null | undefined;
        }[];
        outputs: {
            id: string;
            name: string;
            field: string;
            defaultValue?: string | null | undefined;
        }[];
    };
    id: string;
    name: string;
    position: {
        x: number;
        y: number;
    };
}, {
    type: NodeKind.DecisionTable;
    content: {
        inputs: {
            id?: string | undefined;
            name?: string | null | undefined;
            field?: string | null | undefined;
            defaultValue?: string | null | undefined;
        }[];
        outputs: {
            name: string;
            field: string;
            id?: string | undefined;
            defaultValue?: string | null | undefined;
        }[];
        passThrough?: boolean | null | undefined;
        inputField?: string | null | undefined;
        outputPath?: string | null | undefined;
        executionMode?: "single" | "loop" | null | undefined;
        hitPolicy?: "first" | "collect" | null | undefined;
        rules?: Record<string, string | null | undefined>[] | undefined;
    };
    name: string;
    id?: string | undefined;
    position?: {
        x: number;
        y: number;
    } | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    type: z.ZodLiteral<NodeKind.Switch>;
    content: z.ZodObject<{
        hitPolicy: z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodEnum<["first", "collect"]>>>, "first" | "collect", "first" | "collect" | null | undefined>;
        statements: z.ZodArray<z.ZodObject<{
            id: z.ZodDefault<z.ZodString>;
            condition: z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodString>>, string, string | null | undefined>;
            isDefault: z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodBoolean>>, boolean, boolean | null | undefined>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            condition: string;
            isDefault: boolean;
        }, {
            id?: string | undefined;
            condition?: string | null | undefined;
            isDefault?: boolean | null | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        hitPolicy: "first" | "collect";
        statements: {
            id: string;
            condition: string;
            isDefault: boolean;
        }[];
    }, {
        statements: {
            id?: string | undefined;
            condition?: string | null | undefined;
            isDefault?: boolean | null | undefined;
        }[];
        hitPolicy?: "first" | "collect" | null | undefined;
    }>;
}, {
    id: z.ZodDefault<z.ZodString>;
    name: z.ZodString;
    position: z.ZodDefault<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>>;
}>, "strip", z.ZodTypeAny, {
    type: NodeKind.Switch;
    content: {
        hitPolicy: "first" | "collect";
        statements: {
            id: string;
            condition: string;
            isDefault: boolean;
        }[];
    };
    id: string;
    name: string;
    position: {
        x: number;
        y: number;
    };
}, {
    type: NodeKind.Switch;
    content: {
        statements: {
            id?: string | undefined;
            condition?: string | null | undefined;
            isDefault?: boolean | null | undefined;
        }[];
        hitPolicy?: "first" | "collect" | null | undefined;
    };
    name: string;
    id?: string | undefined;
    position?: {
        x: number;
        y: number;
    } | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    type: z.ZodLiteral<"customNode">;
    content: z.ZodObject<{
        kind: z.ZodString;
        config: z.ZodAny;
    }, "strip", z.ZodTypeAny, {
        kind: string;
        config?: any;
    }, {
        kind: string;
        config?: any;
    }>;
}, {
    id: z.ZodDefault<z.ZodString>;
    name: z.ZodString;
    position: z.ZodDefault<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>>;
}>, "strip", z.ZodTypeAny, {
    type: "customNode";
    content: {
        kind: string;
        config?: any;
    };
    id: string;
    name: string;
    position: {
        x: number;
        y: number;
    };
}, {
    type: "customNode";
    content: {
        kind: string;
        config?: any;
    };
    name: string;
    id?: string | undefined;
    position?: {
        x: number;
        y: number;
    } | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    type: z.ZodLiteral<NodeKind.Input>;
    content: z.ZodDefault<z.ZodObject<{
        schema: z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodString>>, string, string | null | undefined>;
    }, "strip", z.ZodTypeAny, {
        schema: string;
    }, {
        schema?: string | null | undefined;
    }>>;
}, {
    id: z.ZodDefault<z.ZodString>;
    name: z.ZodString;
    position: z.ZodDefault<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>>;
}>, "strip", z.ZodTypeAny, {
    type: NodeKind.Input;
    content: {
        schema: string;
    };
    id: string;
    name: string;
    position: {
        x: number;
        y: number;
    };
}, {
    type: NodeKind.Input;
    name: string;
    content?: {
        schema?: string | null | undefined;
    } | undefined;
    id?: string | undefined;
    position?: {
        x: number;
        y: number;
    } | undefined;
}>, z.ZodObject<z.objectUtil.extendShape<{
    type: z.ZodLiteral<NodeKind.Output>;
    content: z.ZodDefault<z.ZodObject<{
        schema: z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodString>>, string, string | null | undefined>;
    }, "strip", z.ZodTypeAny, {
        schema: string;
    }, {
        schema?: string | null | undefined;
    }>>;
}, {
    id: z.ZodDefault<z.ZodString>;
    name: z.ZodString;
    position: z.ZodDefault<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>>;
}>, "strip", z.ZodTypeAny, {
    type: NodeKind.Output;
    content: {
        schema: string;
    };
    id: string;
    name: string;
    position: {
        x: number;
        y: number;
    };
}, {
    type: NodeKind.Output;
    name: string;
    content?: {
        schema?: string | null | undefined;
    } | undefined;
    id?: string | undefined;
    position?: {
        x: number;
        y: number;
    } | undefined;
}>]>, z.ZodObject<z.objectUtil.extendShape<{
    type: z.ZodEffects<z.ZodString, string, string>;
    content: z.ZodOptional<z.ZodNullable<z.ZodAny>>;
}, {
    id: z.ZodDefault<z.ZodString>;
    name: z.ZodString;
    position: z.ZodDefault<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>>;
}>, "strip", z.ZodTypeAny, {
    type: string;
    id: string;
    name: string;
    position: {
        x: number;
        y: number;
    };
    content?: any;
}, {
    type: string;
    name: string;
    content?: any;
    id?: string | undefined;
    position?: {
        x: number;
        y: number;
    } | undefined;
}>]>;

export declare type NodeSpecification<T = any> = {
    icon?: default_2.ReactNode;
    type: string;
    color?: GraphDecisionNodeProps['color'];
    group?: string;
    displayName: string | default_2.ReactNode;
    documentationUrl?: string;
    shortDescription?: string;
    helper?: string | default_2.ReactNode;
    renderTab?: (props: {
        id: string;
        manager?: DragDropManager;
    }) => default_2.ReactNode;
    getDiffContent?: (current: T, previous: T) => T;
    generateNode: (params: GenerateNodeParams) => Omit<DecisionNode<T>, 'position' | 'id' | 'type'>;
    renderNode: default_2.FC<MinimalNodeProps & {
        specification: MinimalNodeSpecification;
    }>;
    renderSettings?: default_2.FC<{
        id: string;
    }>;
    inferTypes?: {
        needsUpdate: (content: T, prevContent: T) => boolean;
        determineOutputType: (state: InferTypeData<T>) => VariableType;
    };
    onNodeAdd?: (node: DecisionNode<T>) => Promise<DecisionNode<T>>;
};

export declare const nodeSpecification: Readonly<{
    inputNode: NodeSpecification<NodeInputData>;
    outputNode: NodeSpecification<NodeOutputData>;
    decisionTableNode: NodeSpecification<NodeDecisionTableData>;
    expressionNode: NodeSpecification<NodeExpressionData>;
    functionNode: NodeSpecification<NodeFunctionData>;
    switchNode: NodeSpecification<NodeSwitchData>;
}>;

declare type NodeSwitchData = {
    hitPolicy?: 'first' | 'collect';
    statements?: (SwitchStatement & Diff)[];
} & Diff;

export declare enum NodeTypeKind {
    Input = 0,
    Output = 1,
    InferredInput = 2,
    InferredOutput = 3
}

declare type NodeTypeParams = {
    attachGlobals?: boolean;
    disabled?: boolean;
};

declare type Output = unknown;

export declare const outputNodeSchema: z.ZodObject<z.objectUtil.extendShape<{
    type: z.ZodLiteral<NodeKind.Output>;
    content: z.ZodDefault<z.ZodObject<{
        schema: z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodString>>, string, string | null | undefined>;
    }, "strip", z.ZodTypeAny, {
        schema: string;
    }, {
        schema?: string | null | undefined;
    }>>;
}, {
    id: z.ZodDefault<z.ZodString>;
    name: z.ZodString;
    position: z.ZodDefault<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>>;
}>, "strip", z.ZodTypeAny, {
    type: NodeKind.Output;
    content: {
        schema: string;
    };
    id: string;
    name: string;
    position: {
        x: number;
        y: number;
    };
}, {
    type: NodeKind.Output;
    name: string;
    content?: {
        schema?: string | null | undefined;
    } | undefined;
    id?: string | undefined;
    position?: {
        x: number;
        y: number;
    } | undefined;
}>;

declare type PanelType = {
    id: string;
    icon: default_2.ReactNode;
    title: string;
    renderPanel?: default_2.FC;
    hideHeader?: boolean;
    onClick?: () => void;
};

export declare type Position = {
    x: number;
    y: number;
};

declare const privateSymbol: unique symbol;

export declare const processEdges: (currentEdges: DecisionEdge[], previousEdges: DecisionEdge[]) => any[];

export declare const processNodes: (currentNodes: DecisionNode<any>[], previousNodes: DecisionNode<any>[], options?: ProcessNodesOptions) => any[];

export declare type ProcessNodesOptions = {
    components: NodeSpecification[];
    customNodes: CustomNodeSpecification<object, any>[];
};

declare type SchemaSelectProps = {
    field: string;
    name?: string;
    items?: SchemaSelectProps[];
};

declare type SetDecisionGraphOptions = {
    skipOnChangeEvent?: boolean;
};

export declare type Simulation = {
    result?: SimulationOk;
} & {
    error?: SimulationError;
};

export declare type SimulationError = {
    title?: string;
    message?: string;
    data: {
        nodeId?: string;
    };
};

export declare type SimulationOk = {
    performance: string;
    result: Output;
    snapshot: DecisionGraphType;
    trace: Record<string, SimulationTrace>;
};

export declare type SimulationTrace<Trace = TraceDataVariants> = {
    input: Input | null;
    output: Output | null;
    name: string;
    id: string;
    performance: string | null;
    traceData: Trace | null;
    order?: number;
};

export declare type SimulationTraceDataExpression = Arrayable<Record<string, {
    result: unknown;
}>>;

export declare type SimulationTraceDataFunction = {
    log?: TraceFunctionLog[];
};

export declare type SimulationTraceDataSwitch = {
    statements: {
        id: string;
    }[];
};

export declare type SimulationTraceDataTable = SimulationTraceDataTableSingle | SimulationTraceDataTableSingle[];

declare type SimulationTraceDataTableSingle = {
    index: number;
    reference_map: Record<string, unknown>;
    rule: Record<string, string>;
};

export declare const SimulatorEditor: default_2.FC<SimulatorEditorProps>;

declare type SimulatorEditorProps = {
    value?: string;
    onChange?: (value: string | undefined) => void;
    readOnly?: boolean;
};

declare type SimulatorRequestPanelProps = {
    defaultRequest?: string;
    onChange?: (contextJson: string) => void;
    hasInputNode?: boolean;
    loading?: boolean;
    onRun?: (payload: {
        graph: DecisionGraphType;
        context: unknown;
    }) => void;
};

declare type SplitPath<Path extends string, Obj> = Path extends `${infer Prefix}.${infer Rest}` ? {
    [K in Prefix]: SplitPath<Rest, Obj>;
} : {
    [K in Path]: Obj;
};

export declare const switchNodeSchema: z.ZodObject<z.objectUtil.extendShape<{
    type: z.ZodLiteral<NodeKind.Switch>;
    content: z.ZodObject<{
        hitPolicy: z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodEnum<["first", "collect"]>>>, "first" | "collect", "first" | "collect" | null | undefined>;
        statements: z.ZodArray<z.ZodObject<{
            id: z.ZodDefault<z.ZodString>;
            condition: z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodString>>, string, string | null | undefined>;
            isDefault: z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodBoolean>>, boolean, boolean | null | undefined>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            condition: string;
            isDefault: boolean;
        }, {
            id?: string | undefined;
            condition?: string | null | undefined;
            isDefault?: boolean | null | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        hitPolicy: "first" | "collect";
        statements: {
            id: string;
            condition: string;
            isDefault: boolean;
        }[];
    }, {
        statements: {
            id?: string | undefined;
            condition?: string | null | undefined;
            isDefault?: boolean | null | undefined;
        }[];
        hitPolicy?: "first" | "collect" | null | undefined;
    }>;
}, {
    id: z.ZodDefault<z.ZodString>;
    name: z.ZodString;
    position: z.ZodDefault<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>>;
}>, "strip", z.ZodTypeAny, {
    type: NodeKind.Switch;
    content: {
        hitPolicy: "first" | "collect";
        statements: {
            id: string;
            condition: string;
            isDefault: boolean;
        }[];
    };
    id: string;
    name: string;
    position: {
        x: number;
        y: number;
    };
}, {
    type: NodeKind.Switch;
    content: {
        statements: {
            id?: string | undefined;
            condition?: string | null | undefined;
            isDefault?: boolean | null | undefined;
        }[];
        hitPolicy?: "first" | "collect" | null | undefined;
    };
    name: string;
    id?: string | undefined;
    position?: {
        x: number;
        y: number;
    } | undefined;
}>;

declare type SwitchStatement = {
    id: string;
    condition?: string;
    isDefault?: boolean;
} & Diff;

declare type TableCellProps = {
    column?: {
        colType: string;
    } & TableSchemaItem;
    value: string;
    diff?: DiffMetadata;
    onChange: (value: string) => void;
    disabled?: boolean;
    index: number;
};

declare type TableCursor = {
    x: string;
    y: number;
};

declare type TableSchemaItem = {
    id: string;
    name: string;
    field?: string;
    defaultValue?: string;
    _diff?: DiffMetadata;
};

declare type TextInput = {
    control: 'text';
    label?: string;
};

export declare type ThemeConfig = Omit<ThemeConfig_2, 'algorithm'> & {
    mode?: 'light' | 'dark';
};

declare type TraceDataVariants = SimulationTraceDataTable | SimulationTraceDataFunction | SimulationTraceDataExpression | SimulationTraceDataSwitch | null;

declare type TraceFunctionLog = {
    lines: string[];
    msSinceRun: number;
};

export declare function useDecisionGraphActions(): DecisionGraphStoreType['actions'];

export declare function useDecisionGraphListeners<T>(selector: (state: DecisionGraphStoreType['listeners']) => T, equals?: (a: any, b: any) => boolean): T;

export declare function useDecisionGraphRaw(): {
    stateStore: ExposedStore<DecisionGraphStoreType["state"]>;
    listenerStore: ExposedStore<DecisionGraphStoreType["listeners"]>;
    referenceStore: ExposedStore<DecisionGraphStoreType["references"]>;
    actions: DecisionGraphStoreType["actions"];
};

export declare function useDecisionGraphReferences<T>(selector: (state: DecisionGraphStoreType['references']) => T, equals?: (a: any, b: any) => boolean): T;

export declare function useDecisionGraphState<T>(selector: (state: DecisionGraphStoreType['state']) => T, equals?: (a: any, b: any) => boolean): T;

export declare const useEdgeDiff: (id: string) => {
    diff: {
        status: DiffStatus;
    } | undefined;
};

declare const useGraphClipboard: (reactFlow: RefObject<ReactFlowInstance | null>, wrapper: RefObject<HTMLDivElement | null>) => {
    copyNodes: (nodes: Node_2[]) => Promise<void>;
    pasteNodes: () => Promise<void>;
};

export declare const useNodeDiff: (id: string) => {
    diff: {
        status: DiffStatus;
        fields?: Record<string, DiffMetadata>;
    } | undefined;
    contentDiff: any;
};

export declare const useNodeType: (id: string, { attachGlobals, disabled }?: NodeTypeParams) => VariableType | undefined;

export declare const usePersistentState: <S>(key: string, defaultValue?: S) => [S | undefined, Dispatch<SetStateAction<S | undefined>>];

export declare const validationSchema: z.ZodObject<{
    inputSchema: z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodAny>>>;
    outputSchema: z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodAny>>>;
}, "strip", z.ZodTypeAny, {
    inputSchema?: any;
    outputSchema?: any;
}, {
    inputSchema?: any;
    outputSchema?: any;
}>;

declare type ViewConfig = {
    enabled: boolean;
    description?: string;
    permissions?: Record<string, ViewConfigPermission | null | undefined> | null;
};

declare type ViewConfigPermission = 'edit:values' | 'edit:rules' | 'edit:full';

export { }
