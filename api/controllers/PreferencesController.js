/**
 * PreferencesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const okta = require('@okta/okta-sdk-nodejs');
module.exports = {
    index: function (req, res) {
        Preferences.find().exec((error, items) => {
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
    create: function (req, res) {
        let itemToAdd = req.body;
        if (req.username) {
            itemToAdd['userId'] = req.username;
        }
        Preferences.find({ userId: req.username }).exec((err, itemFound) => {
            if (itemFound && itemFound.length > 0) {
                Preferences.update({ userId: req.username }, itemToAdd).exec((err, itemUpdated) => {
                    res.ok({
                        data: {
                            data: itemUpdated
                        }
                    })
                });
            } else {
                Preferences.create(itemToAdd).fetch().then((addedItem, err) => {
                    if (!addedItem) {
                        res.error({
                            error: "Internal Error",
                            details: err
                        });
                    } else {
                        res.ok({
                            data: addedItem
                        });
                    }
                });
            }
        });
    },
    removeAllPreferences: function (req, res) {
        Preferences.destroy({}).then((items) => {
            res.ok({
                data: items
            });
        });
    },
    getById: function (req, res) {
        if (req.params.id) {
            Preferences.findOne({ id: req.params.id }).exec((err, itemFound) => {
                if (itemFound) {
                    res.ok({
                        data: itemFound
                    });
                } else {
                    res.error({ error: 'Item not found for given id' });
                }
            });
        } else {
            res.error({
                error: "required fields are missing"
            });
        }
    },
    getPreferenceByUsername: function (req, res) {
        if (req.username) {
            Preferences.find({ userId: req.username }).exec((err, itemFound) => {
                if (itemFound && itemFound.length > 0) {
                    res.ok({
                        data: itemFound
                    });
                } else {
                    res.error({
                        error: 'Preference not saved yet'
                    })
                }
            });
        } else {
            res.error({
                error: 'Username not authenticted'
            })
        }
    },
    savePreferenceByUsername: function (req, res) {
        if (req.username) {
            let itemToUpdate = req.body;
            Preferences.update({ userId: req.username }, itemToUpdate).exec((err, itemFound) => {
                if (itemFound) {
                    res.ok({
                        data: {
                            preferences: itemFound
                        }
                    })
                } else {
                    itemToUpdate['userId'] = req.username;
                    Preferences.create(itemToUpdate).exec((err, items) => {
                        res.ok({
                            data: {
                                preferences: items instanceof Array ? items[0] : items,
                            }
                        });
                    });
                }
            });
        } else {
            res.error({
                error: 'Username not authenticted'
            })
        }
    },
    getByUserId: function (req, res) {
        if (req.username) {
            var sendPreferences = function (profile) {
                Preferences.find({ userId: req.username }).exec((err, itemFound) => {
                    if (itemFound && itemFound.length > 0) {
                        Epdbias.find({ name: itemFound[0].epdBias }).exec((baisErr, baisItems) => {
                            let preferenceData = itemFound instanceof Array ? itemFound[0] : itemFound;
                            if (baisItems && baisItems.length > 0) {
                                preferenceData['epdBiasData'] = baisItems[0];
                            }
                            let profileToSend = profile instanceof Array ? profile[0] : profile;
                            delete profileToSend['email'];
                            delete profileToSend['username'];
                            if (profileToSend['oktaProfile']) {
                                delete profileToSend['oktaProfile']['email'];
                                delete profileToSend['oktaProfile']['login'];
                            }
                            res.ok({
                                profile: profileToSend,
                                preferences: preferenceData
                            });
                        });
                    } else {
                        let itemToAdd = {
                            userId: req.username,
                            'size': 1,
                            'epd': 1,
                            'weight': 1,
                            'pz': 1,
                            'rodMaker': 3,
                            'transportJet': 3,
                            'towType': 1,
                            'kretek': 0,
                            'epdBias': '',
                            'firmnessMethod': '',
                            'pivmaxlim': 1,
                            'lowpdlim': 1
                        };
                        Preferences.create(itemToAdd).fetch().then((addedItem, err) => {
                            if (!addedItem) {
                                let profileToSend = profile instanceof Array ? profile[0] : profile;
                                delete profileToSend['email'];
                                delete profileToSend['username'];
                                if (profileToSend['oktaProfile']) {
                                    delete profileToSend['oktaProfile']['email'];
                                    delete profileToSend['oktaProfile']['login'];
                                }
                                res.ok({
                                    profile: profileToSend
                                });
                            } else {
                                let profileToSend = profile instanceof Array ? profile[0] : profile;
                                delete profileToSend['email'];
                                delete profileToSend['username'];
                                if (profileToSend['oktaProfile']) {
                                    delete profileToSend['oktaProfile']['email'];
                                    delete profileToSend['oktaProfile']['login'];
                                }
                                res.ok({
                                    profile: profileToSend,
                                    preferences: addedItem instanceof Array ? addedItem[0] : addedItem
                                });
                            }
                        });

                    }
                });
            };
            Users.findOne({ username: req.username }).exec((err, itemFound) => {
                let itemToAdd = {
                    username: req.username,
                    loginType: req.loginType,
                    email: req.username
                };
                if (req.loginType === 'okta') {
                    let user = req['user'] || {
                        firstName: '',
                        lastName: '',
                        role: 'user',
                        company: '',
                        id: ''
                    };
                    let oktaProfile =  {
                        firstName: user['firstName'],
                        lastName: user['lastName'],
                        role: user['role'],
                        company: user['company'],
                        login: req.username,
                        email: req.username,
                        id: user['id']
                    };
                    if (itemFound) {
                        itemFound['oktaProfile'] = oktaProfile;
                    } else {
                        itemToAdd['oktaProfile'] = oktaProfile;
                    }
                   
                }
                if (!itemFound) {
                    Users.create(itemToAdd).fetch().then((itemAdded) => {
                        sendPreferences(itemAdded);
                    });
                } else {
                    if (req.loginType === 'okta') {
                        Users.update({ username: req.username }, itemFound).fetch().then((itemAdded) => {
                            sendPreferences(itemAdded);
                        });
                    } else {
                        sendPreferences(itemAdded);
                    }
                }
            });
        } else {
            res.ok({});
        }

    },
    updatePreference: function (req, res) {
        if (req.params.id) {
            let id = req.params.id;
            Preferences.findOne({ id }).then((itemFound) => {
                if (itemFound) {
                    let itemToUpdate = req.body;
                    Preferences.update({ id }, itemToUpdate).fetch().then(function (updatedItem) {
                        res.ok({ data: updatedItem });
                    }, (err) => {
                        res.error({ error: 'Database error' });
                    });
                } else {
                    res.error({ error: 'Item not found for given id' });
                }
            });
        } else {
            res.error({ error: 'id field is missing ' });
        }
    },
    deletePreference: function (req, res) {
        if (req.params.id) {
            let id = req.params.id;
            Preferences.findOne({ id }).then((itemFound) => {
                if (itemFound) {
                    Preferences.destroy({ id }).fetch().then(function (updatedItem) {
                        res.ok({ data: updatedItem });
                    }, (err) => {
                        res.error({  error: 'Database error' });
                    });
                } else {
                    res.error({ error: 'Item not found for given id' });
                }
            });
        } else {
            res.error({ error: 'id field is missing ' });
        }
    }
};

