import { z } from 'zod';
import i18n from './index';

export const zodErrorMap: z.ZodErrorMap = (issue, ctx) => {
  const t = i18n.t.bind(i18n);

  switch (issue.code) {
    case z.ZodIssueCode.invalid_type:
      return { message: t('validation:invalidType', { expected: issue.expected }) };
    case z.ZodIssueCode.too_small:
      return { message: t('validation:tooSmall', { minimum: issue.minimum }) };
    case z.ZodIssueCode.too_big:
      return { message: t('validation:tooBig', { maximum: issue.maximum }) };
    case z.ZodIssueCode.invalid_string:
      if (issue.validation === 'email') {
        return { message: t('validation:invalidEmail') };
      }
      return { message: t('validation:invalidString') };
    default:
      return { message: ctx.defaultError };
  }
};

// Set as global error map
z.setErrorMap(zodErrorMap);
