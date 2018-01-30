const fs = require('fs');
const path = require('path');
const logger = require('winston');
const FILE = path.join(__dirname, '../configs/settings.json');

function saveConfig(req, res, next) {
    logger.debug('[ConfigCtrl]: Received createArticle request. Article id:', req.params.id);
    if (!req.body.background) {
        logger.error('[ConfigCtrl: Config is incorrect');
        res.statusCode = 400; // Check an appropriate error code
        res.statusMessage = 'Config is incorrect';
        res.send();
        return;
    }

    fs.writeFile(FILE, JSON.stringify(req.body), 'utf8', (error) => {
        if (!error) {
            res.statusCode = 200;
            res.statusMessage = 'Config is saved';
            logger.info('[ConfigCtrl: Config successfully saved');
        } else {
            console.error('error', error);
            res.statusCode = 500;
            res.statusMessage = 'Unable to save config';
            logger.error('[ConfigCtrl: Unable to save config settings');
        }
        res.send();
    });
}

module.exports = {
    saveConfig: saveConfig
};