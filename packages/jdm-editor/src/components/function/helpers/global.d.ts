declare namespace console {
  function log(...args: any[]): void;
  async function sleep(durationMs: number): Promise<void>;
}

interface Config {
  readonly maxDepth: number;
  readonly iteration: number;
  readonly trace: boolean;
}

declare const config: Config;
