import app from '../app';
import models from '../models';

const port = process.env.PORT || 3000;

models.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Express Server Listening on Port  ${this.address().port}`);
    });
});
