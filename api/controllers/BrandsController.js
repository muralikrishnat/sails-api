/**
 * BrandsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    getCigBrandsByUser: function (req, res) {
        CigarateBrands.find({ userId: req.username }).exec((error, items) => {
            if (error) {
                res.error({error});
            } else {
                let maskedItems = [];
                for (let i = 0; i < items.length; i++) {
                    let itemToPush = items[i];
                    if (itemToPush.userId === req.username) {
                        itemToPush['isOwn'] = true;
                    } else {
                        itemToPush['isOwn'] = false;
                    }
                    maskedItems.push(itemToPush);
                }
                res.ok({
                    data: maskedItems
                });
            }
        });
    },
    addCigBrandByUser: function (req, res) {
        let itemToAdd = req.body;
        if (itemToAdd['name']) {
            itemToAdd['userId'] = req.username;
            CigarateBrands.find({ userId: req.username, name: itemToAdd['name'], isShared: false }).exec((err, items) => {
                if (items.length > 0) {
                    CigarateBrands.update({ userId: req.username, name: itemToAdd['name'] }, itemToAdd).fetch().then((updated) => {
                        if (items) {
                            res.ok({
                                data: updated
                            });
                        } else {
                            res.error({
                                error: 'Unable to update cigaratte brand'
                            });
                        }
                    });

                } else {
                    CigarateBrands.create(itemToAdd).fetch().then((addedItems) => {
                        if (addedItems) {
                            res.ok({
                                data: addedItems
                            });
                        } else {
                            res.error({
                                error: 'Unable to create cigaratte brand'
                            });
                        }
                    }, (err) => {
                        res.error({
                            error: 'Unable to create cigaratte brand',
                            details: err
                        });
                    });
                }
            });
        } else {
            res.error({
                error: "Missing name requird field"
            });
        }
    },
    getCigBrandByName: function (req, res) {
        if (req.params.name) {
            CigarateBrands.find({ 'or': [{ id: req.params.name }, { name: req.params.name.trim() }] }).exec((error, items) => {
                if (error) {
                    res.error({error});
                } else {
                    res.ok({
                        data: items
                    });
                }
            });
        } else {
            res.error({
                error: "Missing name requird field"
            });
        }
    },

    updateCigBrandById: function(req, res) {
        let itemToAdd = req.body;
        let id = req.params.id;
        if (id) {
            CigarateBrands.find({ id: id }).exec((err, items) => {
                if (items.length > 0) {
                    CigarateBrands.update({ id: id }, itemToAdd).fetch().then((updated) => {
                        if (updated) {
                            res.ok({
                                data: updated
                            });
                        } else {
                            res.error({
                                error: 'Unable to update Cigaratte brand'
                            });
                        }
                    });
                } else {
                    res.error({
                        error: 'Cigaratte not found'
                    });
                }
            });
        } else {
            res.error({
                error: "Missing id requird field"
            });
        }
    },

    removeCigaratteById: function (req, res) {
        if (req.params.id) {
            CigarateBrands.destroy({ id: req.params.id }).then((items) => {
                res.ok({
                    data: items
                });
            });
        } else {
            res.error({ error: 'Item not found for given id' });
        }
    },

    getCarbCigBrandsByUser: function (req, res) {
        CarbCigarateBrands.find({ userId: req.username }).exec((error, items) => {
            if (error) {
                res.error({error});
            } else {
                res.ok({
                    data: items
                });
            }
        });
    },
    addCarbCigBrandByUser: function (req, res) {
        let itemToAdd = req.body;
        if (itemToAdd['name']) {
            itemToAdd['userId'] = req.username;
            CarbCigarateBrands.find({ userId: req.username, name: itemToAdd['name'], isShared: false }).exec((err, items) => {
                if (items.length > 0) {
                    CarbCigarateBrands.update({ userId: req.username, name: itemToAdd['name'] }, itemToAdd).fetch().then((updated) => {
                        if (items) {
                            res.ok({
                                data: updated
                            });
                        } else {
                            res.error({
                                error: 'Unable to update cigaratte brand'
                            });
                        }
                    });

                } else {
                    CarbCigarateBrands.create(itemToAdd).fetch().then((addedItems) => {
                        if (addedItems) {
                            res.ok({
                                data: addedItems
                            });
                        } else {
                            res.error({
                                error: 'Unable to create cigaratte brand'
                            });
                        }
                    });
                }
            });
        } else {
            res.error({
                error: "Missing name requird field"
            });
        }
    },
    getCarbCigBrandByName: function (req, res) {
        if (req.params.name) {
            CarbCigarateBrands.find({ 'or': [{ id: req.params.name }, { name: req.params.name.trim() }] }).exec((error, items) => {
                if (error) {
                    res.error(error);
                } else {
                    let maskedItems = [];
                    for (let i = 0; i < items.length; i++) {
                        let itemToPush = items[i];
                        if (itemToPush.userId === req.username) {
                            itemToPush['isOwn'] = true;
                        } else {
                            itemToPush['isOwn'] = false;
                        }
                        maskedItems.push(itemToPush);
                    }
                    res.ok({
                        data: maskedItems
                    });
                }
            });
        } else {
            res.error({
                error: "Missing name requird field"
            });
        }
    },
    updateCarbCigBrandById: function(req, res) {
        let itemToAdd = req.body;
        let id = req.params.id;
        if (id) {
            CarbCigarateBrands.find({ id: id }).exec((err, items) => {
                if (items.length > 0) {
                    CarbCigarateBrands.update({ id: id }, itemToAdd).fetch().then((updated) => {
                        if (updated) {
                            res.ok({
                                data: updated
                            });
                        } else {
                            res.error({
                                error: 'Unable to update Carbon Cigaratte brand'
                            });
                        }
                    });
                } else {
                    res.error({
                        error: 'Cigaratte not found'
                    });
                }
            });
        } else {
            res.error({
                error: "Missing id requird field"
            });
        }
    },

    removeCarbCigaratteById: function (req, res) {
        if (req.params.id) {
            CarbCigarateBrands.destroy({ id: req.params.id }).then((items) => {
                res.ok({
                    data: items
                });
            });
        } else {
            res.error({ error: 'Item not found for given id' });
        }
    },
};

