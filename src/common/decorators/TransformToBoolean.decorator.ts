import { Transform } from 'class-transformer';

/**
 * TransformValueToBoolean
 * @description A decorator that transforms a value to a boolean
 */
export const TransformValueToBoolean = () => {
  return Transform(({ value }) => {
    if ([true, 'true'].indexOf(value) > -1) {
      return true;
    } else if ([false, 'false'].indexOf(value) > -1) {
      return false;
    }
    return value;
  });
};
