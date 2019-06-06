/**
 * LanguagesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    index: function (req, res) {
        Languages.find().exec((error, items) => {
            if (error) {
                res.error(error);
            } else {
                res.ok({
                    data: items
                });
            }
        });
    }

};

