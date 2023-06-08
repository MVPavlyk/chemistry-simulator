import Joi from 'joi';

export const ReservoirValidator = Joi.object({
  name: Joi.string().max(24).min(3).required(),
  currentLevel: Joi.number().min(0).max(100).required(),
  lowLevelSensor: Joi.number().min(0).max(Joi.ref('highLevelSensor')).required(),
  highLevelSensor: Joi.number().min(0).max(100).required(),
  hasHeater: Joi.bool(),
  hasMixer: Joi.bool(),
});
