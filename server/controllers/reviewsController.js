﻿import models from '../models';
import val from '../middleware/validator';

const validator = new val('reviews');

class Reviews {
    postReview(req, res) {
        const verify = validator.verify(req, res);
        const check = validator.confirmParams(req, res);
        if (check) {
            if (validator.success) {
                return models.Reviews.create({
                    UserId: req.decoded.id,
                    content: req.body.content,
                    RecipeId: req.params.id,
                })
                .then(review => validator.response(res, 'success', 201, review))
                .catch(error => validator.response(res, 'error', 500, error));
            }
            return validator.verificationError;
        }
        return validator.invalidParameter;
    }
}

export default Reviews;
