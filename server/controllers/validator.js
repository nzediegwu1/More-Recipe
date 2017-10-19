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
            if (req.body.title === undefined) {
                this.verificationError = this.errorMessage('Recipe has no title', res);
            } else if (req.body.ingredients === undefined) {
                this.verificationError = this.errorMessage('Recipe has no ingredient', res);
            } else if (req.body.description === undefined) {
                this.verificationError = this.errorMessage('Recipe has no content', res);
            } else if (typeof req.body.title !== 'string' || req.body.title.trim().length === 0) {
                this.verificationError = this.errorMessage('Recipe title must be text', res);
            } else if (typeof req.body.ingredients !== 'string' || req.body.ingredients.trim().length === 0) {
                this.verificationError = this.errorMessage('Recipe ingredients must be text', res);
            } else if (typeof req.body.description !== 'string' || req.body.description.trim().length === 0) {
                this.verificationError = this.errorMessage('Recipe content must be text', res);
            } else {
                this.success = true;
                return this.success;
            }
            return this.verificationError;
        };
        this.userVerifier = (req, res, context) => {
            if (context === 'signin') {
                return this.signinVerifier(req, res);
            }
            return this.signupVerifier(req, res);
        };
        this.signinVerifier = (req, res) => {
            if (req.body.username === undefined) {
                this.verificationError = this.errorMessage('Please enter username', res);
            } else if (req.body.password === undefined) {
                this.verificationError = this.errorMessage('Please enter password', res);
            } else if (typeof req.body.username !== 'string' || req.body.username.trim().length === 0) {
                this.verificationError = this.errorMessage('Username must be text', res);
            } else if (typeof req.body.password !== 'string' || req.body.password.trim().length < 6) {
                const message = 'Password must be text of 6 digits or higher';
                this.verificationError = this.errorMessage(message, res);
            } else {
                this.success = true;
                return this.success;
            }
            return this.verificationError;
        };
        this.signupVerifier = (req, res) => {
            if (req.body.username === undefined) {
                this.verificationError = this.errorMessage('Please enter username', res);
            } else if (req.body.fullname === undefined) {
                this.verificationError = this.errorMessage('Please enter your fullname', res);
            } else if (req.body.email === undefined) {
                this.verificationError = this.errorMessage('Please enter your email', res);
            } else if (req.body.password === undefined) {
                this.verificationError = this.errorMessage('Please enter your password', res);
            } else if (typeof req.body.username !== 'string' || req.body.username.trim().length === 0) {
                this.verificationError = this.errorMessage('Username must be text', res);
            } else if (typeof req.body.fullname !== 'string' || req.body.fullname.trim().length === 0) {
                this.verificationError = this.errorMessage('Fullname must be text', res);
            } else if (typeof req.body.email !== 'string' || req.body.email.trim().length === 0) {
                this.verificationError = this.errorMessage('Email must be text', res);
            } else if (typeof req.body.password !== 'string' || req.body.password.trim().length < 6) {
                const message = 'Password must be text of 6 digits or higher';
                this.verificationError = this.errorMessage(message, res);
            } else {
                this.success = true;
                return this.success;
            }
            return this.verificationError;
        };
        this.favoriteVerifier = (req, res) => {
            if (req.body.RecipeId === undefined) {
                this.verificationError = this.errorMessage('No RecipeId selected', res);
            } else if (isNaN(req.body.RecipeId)) {
                this.verificationError = this.errorMessage('RecipeId must be a number', res);
            } else {
                this.success = true;
                return this.success;
            }
            return this.verificationError;
        };
        this.reviewVerifier = (req, res) => {
            if (req.body.content === undefined) {
                this.verificationError = this.errorMessage('No Review content', res);
            } else if (typeof req.body.content !== 'string' || req.body.content.trim().length === 0) {
                this.verificationError = this.errorMessage('Review content must be text', res);
            } else {
                this.success = true;
                return this.success;
            }
            return this.verificationError;
        };
        this.response = (res, status, statusCode, value) => {
            if (status === 'success') {
                return res.status(statusCode).json({ success: { status: value } });
            }
            return res.status(statusCode).json({ success: { message: value } });
        };
    }
}

export default Validator;
