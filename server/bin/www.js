import app from '../app';
import models from '../models';
app.set('port', process.env.PORT || 4000);

models.sequelize.sync().then(() => {
    const server = app.listen(app.get('port'), () => {
        console.log(`Express Server Listening on Port  ${server.address().port}`);
    });
});
