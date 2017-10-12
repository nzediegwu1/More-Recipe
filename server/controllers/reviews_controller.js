import models from '../models';
import val from './validator';

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
                .then(review => res.status(201).json({ success: { status: review } }))
                .catch(error => res.status(500).json({ error: { message: error } }));
            }
            return validator.verificationError;
        }
        return validator.invalidParameter;
    }
}

export default Reviews;
