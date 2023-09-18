export type FunctionDebuggerLogData = {
    lines: string[];
    msSinceRun: number;
};
export type FunctionDebuggerTrace = {
    performance: string;
    traceData: {
        log: FunctionDebuggerLogData[];
    };
};
//# sourceMappingURL=types.d.ts.map