import {validationResult} from "express-validator";

export default (req, res, next) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

    } catch (err) {

    }


    next();
};
