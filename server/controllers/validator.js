class Validator {
    constructor(model) {
        this.model = model;
        this.invalidParameter = {};
        this.verificationError = {};
        this.success = false;
        this.errorMessage = (msg, res) => res.status(400).json({ error: { message: msg } });
        this.verify = (req, res, context) => {
            switch (this.model) {
                case 'users':
                    this.usersVerifier(req, res, context);
                    break;
                case 'recipes':
                    this.recipeVerifier(req, res);
                    break;
                case 'favorites':
                    this.favoriteVerifier(req, res);
                    break;
                case 'reviews':
                    this.reviewVerifier(req, res);
                    break;
                case 'upvotes':
                    this.upvoteVerifier(req, res);
                    break;
                default:
                    this.downvoteVerifier(req, res);
                    break;
            }
        };
        this.confirmParams = (req, res) => {
            if (isNaN(req.params.id)) {
                this.invalidParameter = this.errorMessage('invalid parameter', res);
                return this.invalidParameter;
            }
            return true;
        };
        this.recipeVerifier = (req, res) => {
            if (req.body.title !== undefined) {
                if (req.body.ingredients !== undefined) {
                    if (req.body.description !== undefined) {
                        if (typeof req.body.title === 'string' && req.body.title.trim().length !== 0) {
                            if (typeof req.body.ingredients === 'string' && req.body.ingredients.trim().length !== 0) {
                                if (typeof req.body.description === 'string' && req.body.description.trim().length !== 0) {
                                    this.success = true;
                                    return this.success;
                                }
                                this.verificationError = this.errorMessage('Recipe content must be text', res);
                                return this.verificationError;
                            }
                            this.verificationError = this.errorMessage('Recipe ingredients must be text', res);
                            return this.verificationError;
                        }
                        this.verificationError = this.errorMessage('Recipe title must be text', res);
                        return this.verificationError;
                    }
                    this.verificationError = this.errorMessage('Recipe has no content', res);
                    return this.verificationError;
                }
                this.verificationError = this.errorMessage('Recipe has no ingredient', res);
                return this.verificationError;
            }
            this.verificationError = this.errorMessage('Recipe has no title', res);
            return this.verificationError;
        };
        this.userVerifier = (req, res, context) => {
            if (context === 'signin') {
                return this.signinVerifier(req, res);
            }
            return this.signupVerifier(req, res);
        };
        this.signinVerifier = (req, res) => {
            if (req.body.username !== undefined) {
                if (req.body.password !== undefined) {
                    if (typeof req.body.username === 'string' && req.body.username.trim().length !== 0) {
                        if (typeof req.body.password === 'string' && req.body.password.trim().length >= 6) {
                            this.success = true;
                            return this.success;
                        }
                        const message = 'Password must be text of 6 digits or higher';
                        this.verificationError = this.errorMessage(message, res);
                        return this.verificationError;
                    }
                    this.verificationError = this.errorMessage('Username must be text', res);
                    return this.verificationError;
                }
                this.verificationError = this.errorMessage('Please enter password', res);
                return this.verificationError;
            }
            this.verificationError = this.errorMessage('Please enter username', res);
            return this.verificationError;
        };
        this.signupVerifier = (req, res) => {
            if (req.body.username !== undefined) {
                if (req.body.fullname !== undefined) {
                    if (req.body.email !== undefined) {
                        if (req.body.password !== undefined) {
                            if (typeof req.body.username === 'string' && req.body.username.trim().length !== 0) {
                                if (typeof req.body.fullname === 'string' && req.body.fullname.trim().length !== 0) {
                                    if (typeof req.body.email === 'string' && req.body.email.trim().length !== 0) {
                                        if (typeof req.body.password === 'string' && req.body.password.trim().length >= 6) {
                                            this.success = true;
                                            return this.success;
                                        }
                                        const message = 'Password must be text of 6 digits or higher';
                                        this.verificationError = this.errorMessage(message, res);
                                        return this.verificationError;
                                    }
                                    this.verificationError = this.errorMessage('Email must be text', res);
                                    return this.verificationError;
                                }
                                this.verificationError = this.errorMessage('Fullname must be text', res);
                                return this.verificationError;
                            }
                            this.verificationError = this.errorMessage('Username must be text', res);
                            return this.verificationError;
                        }
                        this.verificationError = this.errorMessage('Please enter your password', res);
                        return this.verificationError;
                    }
                    this.verificationError = this.errorMessage('Please enter your email', res);
                    return this.verificationError;
                }
                this.verificationError = this.errorMessage('Please enter your fullname', res);
                return this.verificationError;
            }
            this.verificationError = this.errorMessage('Please enter username', res);
            return this.verificationError;
        };
        this.favoriteVerifier = (req, res) => {
            if (req.body.RecipeId !== undefined) {
                if (isNaN(req.body.RecipeId)) {
                    this.verificationError = this.errorMessage('RecipeId must be a number', res);
                    return this.verificationError;
                }
                this.success = true;
                return this.success;
            }
            this.verificationError = this.errorMessage('No RecipeId selected', res);
            return this.verificationError;
        };
        this.reviewVerifier = (req, res) => {
            if (req.body.content !== undefined) {
                if (typeof req.body.content === 'string' && req.body.content.trim().length !== 0) {
                    this.success = true;
                    return this.success;
                }
                this.verificationError = this.errorMessage('Review content must be text', res);
                return this.verificationError;
            }
            this.verificationError = this.errorMessage('No Review content', res);
            return this.verificationError;
        };
    }
}

export default Validator;
