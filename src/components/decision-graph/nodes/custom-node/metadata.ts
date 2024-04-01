import { z } from 'zod';

import type { JdmControl } from './controls';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ZodJdmMetadata<T extends z.ZodTypeAny> = {
  label: string;
} & JdmControl;

declare module 'zod' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ZodType<Output, Def extends ZodTypeDef, Input = Output> {
    /**
     * Add OpenAPI metadata to a Zod Type
     */
    jdm<T extends z.ZodTypeAny>(this: T, metadata: ZodJdmMetadata<T>): T;
  }

  interface ZodTypeDef {
    /**
     * OpenAPI metadata
     */
    jdm?: ZodJdmMetadata<z.ZodTypeAny>;
  }
}

const extendZodWithJdm = (zod: typeof z) => {
  if (typeof zod.ZodType.prototype.jdm !== 'undefined') {
    return;
  }
  zod.ZodType.prototype.jdm = function (jdm) {
    const result = new (this as any).constructor({
      ...this._def,
      jdm,
    });

    return result;
  };

  const zodObjectOmit = zod.ZodObject.prototype.omit;

  zod.ZodObject.prototype.omit = function (...args: [mask: Record<string, true | undefined>]) {
    const omitResult = zodObjectOmit.apply(this, args);
    delete omitResult._def.jdm;
    return omitResult as any;
  };

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const zodObjectPick = zod.ZodObject.prototype.pick;

  zod.ZodObject.prototype.pick = function (...args: [mask: Record<string, true | undefined>]) {
    const pickResult = zodObjectPick.apply(this, args);
    delete pickResult._def.jdm;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any
    return pickResult as any;
  };
};

extendZodWithJdm(z);
