/**
 * ProfilesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    index: function (req, res) {
        Profiles.find({ userId: req.username }).exec((error, items) => {
            if (error) {
                res.error(error);
            } else {
                res.ok({
                    data: items
                });
            }
        });
    },
    updatedProfile: function (req, res) {
        let itemToAdd = req.body;
        if (itemToAdd['name']) {    
            itemToAdd['userId'] = req.username;
            Profiles.find({ userId: req.username, name: itemToAdd['name'] }).exec((err, items) => {
                if (items.length > 0) {
                    Profiles.update({ userId: req.username, name: itemToAdd['name'] }, itemToAdd).fetch().then((updated) => {
                        if (items) {
                            res.ok({
                                data: updated
                            });
                        } else {
                            res.error({
                                error: 'Unable to profile'
                            });
                        }
                    });

                } else {
                    try {
                        Profiles.create(itemToAdd).fetch().then((addedItems) => {
                            if (addedItems) {
                                res.ok({
                                    data: addedItems
                                });
                            } else {
                                res.error({
                                    error: 'Unable to profile'
                                });
                            }
                        });
                    } catch(e) {
                        //swallow
                        res.error({
                            error: 'Unable to create profile',
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
    updateProfileById: function(req, res){
        let itemToAdd = req.body;
        let id = req.params.id;
        if (id) {
            Profiles.find({ id: id }).exec((err, items) => {
                if (items.length > 0) {
                    Profiles.update({ id: id }, itemToAdd).fetch().then((updated) => {
                        if (updated) {
                            res.ok({
                                data: updated
                            });
                        } else {
                            res.error({
                                error: 'Unable to update'
                            });
                        }
                    });
                } else {
                    res.error({
                        error: 'Item not found'
                    });
                }
            });
        } else {
            res.error({
                error: "Missing id requird field"
            });
        }
    },
    deleteProfile: function (req, res) {
        if (req.params.id) {
            Profiles.destroy({ id: req.params.id }).fetch().then((deletedItem) => {
                if (deletedItem && deletedItem.length > 0) {
                    res.ok({
                        data: deletedItem
                    });
                } else {
                    res.error({ error: 'item not found with id' });
                }
                
            });
        } else {
            res.error({ error: 'mising required field' });
        }
    },
};

