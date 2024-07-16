interface EvaluateOptions {
  trace?: boolean;
}

interface EvaluateResponse {
  performance: string;
  result: any;
  trace?: any;
}

interface ZenModule {
  /**
   * Evaluates ZEN expression
   * @param expression
   * @param context Must contain '$' key
   */
  evaluateExpression(expression: string, context: any): any;

  /**
   * Evaluates ZEN unary expression
   * @param expression
   * @param context Must contain '$' key
   */
  evaluateUnaryExpression(expression: string, context: any): boolean;

  /**
   * Evaluates ZEN unary expression
   * @param key File key to be evaluated through DecisionLoader
   * @param context
   * @param opts
   */
  evaluate(key: string, context: any, opts?: EvaluateOptions): Promise<EvaluateResponse>;
}

declare const zenModule: ZenModule;

export default zenModule;
