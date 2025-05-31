import Joi from "joi";

const authValidation = {
    login: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
    }),
    signup: Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().required(),
        phone: Joi.string().required(),
        name: Joi.string(),
    }),
};

const projectValidation = {
    createProject: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        // TODO Can be added assignee user
    }),
};

const taskValidation = {
    createTask: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        assignee: Joi.string().required(),
        project: Joi.string().required(),
    }),
};

export { authValidation, projectValidation, taskValidation };
