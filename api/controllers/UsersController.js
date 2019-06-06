/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    index: function (req, res) {
        Users.find().exec((error, items) => {
            if (error) {
                res.error({error});
            } else {
                res.ok({
                    data: items
                });
            }
        });
    },
    create: function (req, res) {
        let itemToAdd = req.body;
        Users.create({
            username: itemToAdd.username,
            password: itemToAdd.password
        }).fetch().then((addedItem) => {
            res.ok({ data: addedItem });
        }, (err) => {
            res.send(500, { error: 'Database error', errorDetails: err });
        });
    }
};

