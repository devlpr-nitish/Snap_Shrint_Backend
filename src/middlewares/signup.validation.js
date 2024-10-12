import Joi from "joi"

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(20).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(40).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad request", error });
    }

    if (req.file && req.file.size > 5 * 1024 * 1024) {
        return res.status(400).json({ message: "File size exceeds 5MB limit" });
    }

    next();
}

export default signupValidation;