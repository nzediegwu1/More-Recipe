import app from '../app';
import models from '../models';
app.set('port', process.env.PORT || 3000);

models.sequelize.sync().then(() => {
    const server = app.listen(app.get('port'), () => {
        console.log(`Express server listening on port  ${server.address().port}`);
    });
});
