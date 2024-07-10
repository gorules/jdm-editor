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
   * @param file File to be evaluated via DecisionLoader
   * @param context
   * @param opts
   */
  evaluate(file: string, context: any, opts?: EvaluateOptions): Promise<EvaluateResponse>;

  /**
   * Get Content from the DecisionLoader
   * @param file
   */
  get(file: string): Promise<any>;
}

export const evaluateExpression: ZenModule['evaluateExpression'];
export const evaluateUnaryExpression: ZenModule['evaluateUnaryExpression'];
export const evaluate: ZenModule['evaluate'];
export const get: ZenModule['get'];

declare const zenModule: ZenModule;

export default zenModule;
