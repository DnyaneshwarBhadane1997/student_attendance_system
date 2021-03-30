
const app = require('express')();
const routerConfigService = require('./config/routerConfig');
const bodyParser = require("body-parser");
require("dotenv").config();
require('./config/database');
require('./defaultSeeder/databaseInit');
global.l10n = require('jm-ez-l10n');
global._ = require("lodash");

l10n.setTranslationsFile('en', './language/translation.en.json');

app.use(l10n.enableL10NExpress);
app.use(bodyParser.json());

app.set('PORT' , process.env.SERVER_PORT);




routerConfigService.config(app);


app.listen(app.get('PORT'), function (server) {
    console.log("Server is starteds at", process.env.SERVER_PORT, server);
});
