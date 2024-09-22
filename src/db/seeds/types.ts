export type TypedObject<VALUE, KEY extends string = string> = {
  [key in KEY]: VALUE;
};
