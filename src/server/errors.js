// errors
const errors = {
  SUCCESS: 0,
  BAD_REQUEST: 1,
  NULL_DATA: 2,
  NO_PERMISSION: 3,
  INVALID_INPUT: 4,
  SERVER_ERROR: 5,
  DUPLICATE_DATA: 6,
  INVALID_CAPTCHA: 7,
  INVALID_CREDENTIAL: 8,
  INVALID_CODE: 9,
  LOGIN_REQUIRED: 10,
  PENDING: 11,
  ACCOUNT_DISABLED: 12,
  FAILURE: 13
};

module.exports = errors;

const _errors = {}
Object.keys(errors).forEach(k=>_errors[errors[k]] = k)

module.exports.getDesc = code => _errors[code]
