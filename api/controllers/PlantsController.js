/**
 * PlantsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    index: function (req, res) {
        Plants.find().exec((error, items) => {
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
        if (itemToAdd.plantCode) {
            Plants.create(itemToAdd).fetch().then((itemAdded) => {
                if (!itemAdded) {
                    res.error({
                        error: 'Internal error'
                    });
                } else {
                    res.ok({
                        data: itemAdded
                    });
                }
            });
        } else {
            res.error({
                error: "required field is missing"
            });
        }

    },
    update: function (req, res) {
        let itemToAdd = req.body;
        if (req.params.id) {
            Plants.update({ id: req.params.id }, itemToAdd).fetch().then((itemAdded) => {
                if (!itemAdded) {
                    res.error({
                        error: 'Internal error'
                    });
                } else {
                    res.ok({
                        data: itemAdded
                    });
                }
            });
        } else {
            res.error({
                error: "required field is missing"
            });
        }

    }
};

