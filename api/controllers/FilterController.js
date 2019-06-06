/**
 * FilterController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    getFilterBrandsByUser: function (req, res) {
        FilterBrands.find({ userId: req.username }).exec((error, items) => {
            if (error) {
                res.error({ error });
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
    addFilterBrandByUser: function (req, res) {
        let itemToAdd = req.body;
        if (itemToAdd['name']) {
            itemToAdd['userId'] = req.username;
            FilterBrands.find({ userId: req.username, name: itemToAdd['name'], isShared: false }).exec((err, items) => {
                if (items.length > 0) {
                    FilterBrands.update({ userId: req.username, name: itemToAdd['name'] }, itemToAdd).fetch().then((updated) => {
                        if (items) {
                            res.ok({
                                data: updated
                            });
                        } else {
                            res.error({
                                error: 'Unable to update Filter brand'
                            });
                        }
                    });

                } else {
                    try {
                        FilterBrands.create(itemToAdd).fetch().then((addedItems) => {
                            if (addedItems) {
                                res.ok({
                                    data: addedItems
                                });
                            } else {
                                res.error({
                                    error: 'Unable to create Filter brand'
                                });
                            }
                        });
                    } catch (e) {
                        //swallow
                        res.error({
                            error: 'Unable to create Filter brand',
                            details: e
                        });
                    }
                }
            });
        } else {
            res.error({
                error: "Missing name requird field"
            });
        }
    },
    getFilterBrandByName: function (req, res) {
        if (req.params.name) {
            FilterBrands.find({ 'or': [{ id: req.params.name }, { name: req.params.name.trim() }] }).exec((error, items) => {
                if (error) {
                    res.error({ error });
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
    updateFilterById: function (req, res) {
        let itemToAdd = req.body;
        let id = req.params.id;
        if (id) {
            FilterBrands.find({ id: id }).exec((err, items) => {
                if (items.length > 0) {
                    FilterBrands.update({ id: id }, itemToAdd).fetch().then((updated) => {
                        if (updated) {
                            res.ok({
                                data: updated
                            });
                        } else {
                            res.error({
                                error: 'Unable to update Filter brand'
                            });
                        }
                    });
                } else {
                    res.error({
                        error: 'Filter not found'
                    });
                }
            });
        } else {
            res.error({
                error: "Missing id requird field"
            });
        }
    },

    removeFilterById: function (req, res) {
        if (req.params.id) {
            FilterBrands.destroy({ id: req.params.id }).then((items) => {
                res.ok({
                    data: items
                });
            });
        } else {
            res.error({ error: 'Item not found for given id' });
        }
    },

    getCarbFilterBrandsByUser: function (req, res) {
        CarbFilterBrands.find({ userId: req.username }).exec((error, items) => {
            if (error) {
                res.error({ error });
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
    addCarbFilterBrandByUser: function (req, res) {
        let itemToAdd = req.body;
        if (itemToAdd['dualFilterName']) {
            itemToAdd['userId'] = req.username;
            CarbFilterBrands.find({ userId: req.username, dualFilterName: itemToAdd['dualFilterName'], isShared: false }).exec((err, items) => {
                if (items && items.length > 0) {
                    CarbFilterBrands.update({ userId: req.username, dualFilterName: itemToAdd['dualFilterName'] }, itemToAdd).fetch().then((updated) => {
                        if (items) {
                            res.ok({
                                data: updated
                            });
                        } else {
                            res.error({
                                error: 'Unable to update Filter brand'
                            });
                        }
                    });

                } else {
                    CarbFilterBrands.create(itemToAdd).fetch().then((addedItems) => {
                        if (addedItems) {
                            res.ok({
                                data: addedItems
                            });
                        } else {
                            res.error({
                                error: 'Unable to create Filter brand'
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
    getCarbFilterBrandByName: function (req, res) {
        if (req.params.name) {
            CarbFilterBrands.find({ 'or': [{ id: req.params.name }, { dualFilterName: req.params.name.trim() }] }).exec((error, items) => {
                if (error) {
                    res.error({ error });
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
    updateCarbFilterById: function (req, res) {
        let itemToAdd = req.body;
        let id = req.params.id;
        if (id) {
            CarbFilterBrands.find({ id: id }).exec((err, items) => {
                if (items.length > 0) {
                    CarbFilterBrands.update({ id: id }, itemToAdd).fetch().then((updated) => {
                        if (updated) {
                            res.ok({
                                data: updated
                            });
                        } else {
                            res.error({
                                error: 'Unable to update Filter brand'
                            });
                        }
                    });
                } else {
                    res.error({
                        error: 'Filter not found'
                    });
                }
            });
        } else {
            res.error({
                error: "Missing id requird field"
            });
        }
    },
    removeCarbFilterById: function (req, res) {
        if (req.params.id) {
            CarbFilterBrands.destroy({ id: req.params.id }).then((items) => {
                res.ok({
                    data: items
                });
            });
        } else {
            res.error({ error: 'Item not found for given id' });
        }
    },

};

