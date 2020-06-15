// pipeline operator
export const pipe = (input, ...methods) => methods.reduce((val, fn)=>fn(val), input);