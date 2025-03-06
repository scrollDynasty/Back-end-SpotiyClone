import { createOkSchema } from '#common/interfaces/SharedSchemes.js';
import s from 'fluent-json-schema';

export const authRegisterSchema = {
  tags: ['auth'],
  body: s
    .object()
    .additionalProperties(false)
    .prop('fullName', s.string().required())
    .prop('email', s.string().format(s.FORMATS.EMAIL).required())
    .prop('password', s.string().required())
    .prop('avatarUrl', s.string().required()),
  response: {
    200: createOkSchema(s.object().prop('token', s.string())),
  },
};

export const authLoginSchema = {
  tags: ['auth'],
  body: s
    .object()
    .additionalProperties(false)
    .prop('email', s.string().format(s.FORMATS.EMAIL).required())
    .prop('password', s.string().required()),
  response: {
    200: createOkSchema(s.object().prop('token', s.string())),
  },
};
