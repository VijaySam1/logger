import { ValidationChain, check } from 'express-validator';

export const loggerSchema: ValidationChain[] = [
  check('user_id', "please provide a valid firstName").exists({ checkFalsy: true }).isString(),
  check('device_id', "please provide a valid device_id").exists({ checkFalsy: true }).isString(),
  check('generic_id', "please provide a valid generic_id ").exists({ checkFalsy: true }).isString(),
  check('generic_type', "please provide a valid generic_type").isInt({ min: 0, max: 7 }).exists({ checkFalsy: true }).isNumeric(),
  check('action_key', "please provide a valid action_key").isInt({ min: 0, max: 2 }).exists({ checkFalsy: true }).isNumeric(),
  check('action_value', "please provide a valid action_value ").exists({ checkFalsy: true }).isString(),
  check('log_type', "please provide a valid log_type").isInt({ min: 0, max: 3 }).exists({ checkFalsy: true }).isNumeric(),

];