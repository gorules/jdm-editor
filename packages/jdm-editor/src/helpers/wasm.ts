import { VariableType, isReady } from '@gorules/zen-engine-wasm';

let wasmAvailable = false;

export const isWasmAvailable = () => {
  if (wasmAvailable) {
    return true;
  }

  try {
    if (isReady()) {
      wasmAvailable = true;
      return wasmAvailable;
    }
  } catch {
    return false;
  }
};

type TransformerOutputTypeParams = {
  input: VariableType;
  determinedType: VariableType;
  passThrough: boolean;
  inputField?: string;
  outputPath?: string;
};

//const moddedInput = input.clone();
//       const baseType = VariableType.fromJson({ Object: {} });
//
//       (content.expressions || []).forEach((expression) => {
//         if (!expression.key || !expression.value) {
//           return;
//         }
//
//         const calculatedType = moddedInput.calculateType(expression.value);
//         moddedInput.set(`$.${expression.key}`, calculatedType);
//         baseType.setOwned(expression.key, calculatedType);
//       });
//
//       return baseType;
export const transformerOutputType = ({
  input,
  determinedType,
  passThrough,
  outputPath,
}: TransformerOutputTypeParams) => {
  if (outputPath) {
    const newType = VariableType.fromJson({ Object: {} });
    newType.setOwned(outputPath, determinedType);
    determinedType = newType;
  }

  return passThrough ? input.merge(determinedType) : determinedType;
};
