'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {

    const translator = new Translator();

    app.route('/api/translate')
        .post((req, res) => {
            const { text, locale } = req.body;

					  if (text == "") {
                return res.status(400).json({ error: 'No text to translate' });
            }
	
            if (text == undefined || !locale) {
                return res.status(400).json({ error: 'Required field(s) missing' });
            }

            let translation;

            switch (locale) {
                case "british-to-american":
                    translation = translator.britishToAmerican(text);
                    break;
                case "american-to-british":
                    translation = translator.americanToBritish(text);
                    break;
                default:
                    return res.status(400).json({ error: 'Invalid value for locale field' });
            }

            return res.json({ text: text, translation: translation });
        });
};
