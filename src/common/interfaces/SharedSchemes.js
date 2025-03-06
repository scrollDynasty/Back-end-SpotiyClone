import s from 'fluent-json-schema';

export const createOkSchema = (schema) => {
  return s
    .object()
    .prop('statusCode', s.const(200))
    .prop('message', s.const(''))
    .prop('result', schema)
    .prop('timestamp', s.number());
};
