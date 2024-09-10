import { buildMessage, ValidateBy, ValidationOptions } from 'class-validator';

export const IS_NUMBER_STRING = 'isIntString';

/**
 * Checks if the string is int.
 * If given value is not a string, then it returns false.
 */
export function isIntString(value: unknown): boolean {
  try {
    return (
      typeof value === 'string' &&
      !isNaN(parseInt(value)) &&
      parseInt(value) === parseFloat(value)
    );
  } catch (e) {
    return false;
  }
}

/**
 * Checks if the string is int.
 * If given value is not a string, then it returns false.
 */
export function IsIntString(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_NUMBER_STRING,
      validator: {
        validate: (value): boolean => isIntString(value),
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + '$property must be a int string',
        ),
      },
    },
    validationOptions,
  );
}
