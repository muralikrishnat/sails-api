/**
 * AdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const okta = require('@okta/okta-sdk-nodejs');

module.exports = {
    getCompanies: function (req, res) {
        Company.find().exec((error, items) => {
            if (error) {
                res.error({ error });
            } else {
                let companies = items, users = [];
                res.ok({
                    data: companies
                });
            }
        });
    },
    addCompany: function (req, res) {
        let itemToAdd = req.body;
        Company.create(itemToAdd).fetch().then((items) => {
            if (items) {
                res.ok({
                    data: items
                });
            } else {
                res.error({
                    error: 'Unable to create Company'
                });
            }
        });
    },
    cloneCompany: function (req, res) {
        if (req.params.id) {
            let itemToAdd = req.body;
            if (itemToAdd['company']) {
                Company.find({ id: req.params.id }).exec((error, comapnies) => {
                    if (comapnies && comapnies.length > 0) {
                        let companyToClone = comapnies[0];
                        itemToAdd['items'] = companyToClone['items'];
                        Company.create(itemToAdd).fetch().then((items) => {
                            if (items) {
                                res.ok({
                                    data: items
                                });
                            } else {
                                res.error({
                                    error: 'Unable to create Company'
                                });
                            }
                        });
                    } else {
                        res.error({
                            error: 'company not found with given id'
                        });
                    }
                });
            } else {
                res.error({
                    error: 'company name is missing'
                });
            }
        } else {
            res.error({
                error: 'Clone company id missing'
            });
        }
    },
    updateCompanyWithClone: function (req, res) {
        if (req.params.id && req.params.fromId) {
            var itemToUpdate = req.body;
            Company.findOne({ id: req.params.id }).then((itemFound) => {
                if (itemFound) {
                    Company.find({ id: req.params.fromId }).exec((error, comapnies) => {
                        if (comapnies && comapnies.length > 0) {
                            let companyToClone = comapnies[0];
                            itemToUpdate['items'] = companyToClone['items'];
                            itemToUpdate['company'] = itemToUpdate['company'] || itemFound['company'];
                            Company.update({ id: req.params.id }, { name: itemToUpdate.name, items: itemToUpdate.items }).fetch().then((items) => {
                                if (items) {
                                    res.ok({
                                        data: items
                                    });
                                } else {
                                    res.error({
                                        error: 'Error while updating the company'
                                    });
                                }
                            });
                        } else {
                            res.error({ error: 'Item not found for given id' });
                        }
                    });
                } else {
                    res.error({ error: 'Item not found for given id' });
                }
            });
        } else {
            res.error({
                error: 'Clonecompany id missing'
            });
        }
    },
    updateCompany: function (req, res) {
        if (req.params.id) {
            var itemToUpdate = req.body;
            Company.findOne({ id: req.params.id }).then((itemFound) => {
                if (itemFound) {
                    Company.update({ id: req.params.id }, { name: itemToUpdate.name, items: itemToUpdate.items, users: itemToUpdate.users }).fetch().then((items) => {
                        if (items) {
                            res.ok({
                                data: items
                            });
                        } else {
                            res.error({
                                error: 'Error while updating the company'
                            });
                        }
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
    removeCompany: function (req, res) {
        if (req.params.id) {
            Company.destroy({ id: req.params.id }).then((items) => {
                res.ok({
                    data: items
                });
            });
        } else {
            res.error({ error: 'Item not found for given id' });
        }
    },
    removeAll: function (req, res) {
        Company.destroy().then((items) => {
            res.ok({
                data: items
            });
        });
    },
    calculateEPDSlopeIntercept: function (req, res) {
        // cl = Me.txtLowCZ.Text
        // ch = Me.txtHighCZ.Text
        // ml = Me.txtLowMeasured.Text
        // mh = Me.txtHighMeasured.Text
        // L = Me.txtLengthRef.Text
        // Slope = (mh - ml) / (ch - cl)
        // Intercept = (ml - Slope * cl) / L
        // Me.txtSlope.Text = Math.Round(Slope, 3)
        // Me.txtIntercept.Text = Math.Round(Intercept, 3)
    },
    getEPDBias: function (req, res) {
        let user = req.user;
        Epdbias.find({}).exec((error, items) => {
            if (error) {
                res.error({ error });
            } else {
                let allowedItems = [];
                for (let i = 0; i < items.length; i++) {
                    let item = items[i], isAllowed = false;
                    if (item.userId === req.username) {
                        isAllowed = true;
                    }
                    if (user.role && (user.role.toUpperCase() === 'ADMIN' || user.role.toUpperCase() === 'CE-USER') && (item['company'] === 'xxxxxxxx' || item['company'] === '')) {
                        isAllowed = true;
                    }

                    if (user['company'] === item['company'] && item.userId != req.username) {
                        isAllowed = true;
                        item['isCompany'] = true;
                    }

                    if (item['userId'] === req.username) {
                        item['isOwn'] = true;
                    }

                    if (isAllowed) {
                        allowedItems.push(item);
                    } else {
                        if (item['company'] === '') {
                            allowedItems.push(item);
                        }
                    }
                }
                res.ok({
                    data: allowedItems
                });
            }
        });
    },
    getEPDBiasById: function (req, res) {
        if (req.params.id) {
            Epdbias.findOne({ name: req.params.id }).exec((err, itemFound) => {
                if (itemFound) {
                    res.ok({
                        data: itemFound
                    });
                } else {
                    res.error({ error: 'Item not found for given parameter' });
                }
            });
        } else {
            res.error({
                error: "required fields are missing"
            });
        }
    },
    getEPDBiasByUser: function (req, res) {
        Epdbias.find({ userId: req.username }).exec((err, itemFound) => {
            if (itemFound) {
                res.ok({
                    data: itemFound
                });
            } else {
                res.error({ error: 'Item not found for given parameter' });
            }
        });
    },
    addEPDBias: function (req, res) {
        let itemToAdd = req.body;
        if (itemToAdd.name) {
            itemToAdd.userId = req.username;
            let user = req.user;
            if (user && user.role) {
                if (user.role.toUpperCase() === 'ADMIN'.trim().toUpperCase() || user.role.toUpperCase() === 'CE-USER'.trim().toUpperCase()) {
                    itemToAdd['company'] = 'xxxxxxxx';
                } else if (user['company']) {
                    itemToAdd['company'] = user['company']
                }
            }
            Epdbias.find({ name: itemToAdd.name.trim() }).exec((err, epdItems) => {
                if (epdItems && epdItems.length > 0) {
                    let itemFound = false;
                    for (let i = 0; i < epdItems.length; i++) {
                        let item = epdItems[i];
                        if (item.userId === req.username) {
                            itemFound = true;
                        }
                    }
                    if (itemFound) {
                        Epdbias.update({ name: itemToAdd.name, userId: req.username }, itemToAdd).fetch().then((itemAdded) => {
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
                            error: 'You cant update this epd bais name already exists'
                        });
                    }
                } else {
                    Epdbias.create(itemToAdd).fetch().then((itemAdded) => {
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
                }
               
            });

        } else {
            res.error({
                error: 'required fields are missing'
            });
        }

    },
    getPlugwrap: function (req, res) {
        let user = req.user;
        Plugwrap.find().exec((error, items) => {
            if (error) {
                res.error({ error });
            } else {
                let allowedItems = [];
                for (let i = 0; i < items.length; i++) {
                    let item = items[i], isAllowed = false;
                    if (item.userId === req.username) {
                        isAllowed = true;
                    }
                    if (user.role && (user.role.toUpperCase() === 'ADMIN' || user.role.toUpperCase() === 'CE-USER') && (item['company'] === 'xxxxxxxx' || item['company'] === '')) {
                        isAllowed = true;
                    }

                    if (user['company'] === item['company'] && item.userId != req.username) {
                        isAllowed = true;
                        item['isCompany'] = true;
                    }

                    if (item['userId'] === req.username) {
                        item['isOwn'] = true;
                    }

                    if (isAllowed) {
                        allowedItems.push(item);
                    } else {
                        if (item['company'] === '') {
                            allowedItems.push(item);
                        }
                    }
                }
                res.ok({
                    data: allowedItems
                });
            }
        });
    },
    getPlugwrapById: function (req, res) {
        if (req.params.id) {
            Plugwrap.findOne({ 'or': [{ id: req.params.id }, { name: req.params.id.trim() }] }).exec((err, itemFound) => {
                if (itemFound) {
                    res, ok({
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
    deletePlugwrapById: function (req, res) {
        if (req.params.id) {
            Plugwrap.destroy({ id: req.params.id }).then((items) => {
                res.ok({
                    data: items
                });
            });
        } else {
            res.error({ error: 'Item not found for given id' });
        }
    },
    deleteEPDBiasById: function (req, res) {
        if (req.params.id) {
            Epdbias.destroy({ id: req.params.id }).then((items) => {
                res.ok({
                    data: items
                });
            });
        } else {
            res.error({ error: 'Item not found for given id' });
        }
    },
    addPlugwrap: function (req, res) {
        let itemToAdd = req.body;
        if (itemToAdd.name) {
            itemToAdd['userId'] = req.username;
            itemToAdd['company'] = req['company'] || "";
            let user = req.user;
            if (user && user.role) {
                if (user.role.toUpperCase() === 'ADMIN'.trim().toUpperCase() || user.role.toUpperCase() === 'CE-USER'.trim().toUpperCase()) {
                    itemToAdd['company'] = 'xxxxxxxx';
                } else if (user['company']) {
                    itemToAdd['company'] = user['company']
                }
            }
            Plugwrap.find({ name: itemToAdd.name }).exec((err, pwItems) => {
                if (pwItems && pwItems.length > 0) {
                    let itemFound = false;
                    for (let i = 0; i < pwItems.length; i++) {
                        let item = pwItems[i];
                        if (item.userId === req.username) {
                            itemFound = true;
                        }
                    }
                    if (itemFound) {
                        Plugwrap.update({ name: itemToAdd.name, userId: req.username }, itemToAdd).fetch().then((itemAdded) => {
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
                            error: 'You cant update this plug wrap name already exists'
                        });
                    }
                } else {
                    Plugwrap.create(itemToAdd).fetch().then((itemAdded) => {
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
                }
            });
        } else {
            res.error({
                error: 'required fields are missing'
            });
        }
    },
    updatePlugwrap: function (req, res) {
        if (req.params.id) {
            Plugwrap.findOne({ 'or': [{ id: req.params.id }, { name: req.params.id.trim() }] }).exec((err, itemFound) => {
                if (itemFound) {
                    let itemToUpdate = req.body;
                    Plugwrap.update({ id: itemFound.id }, itemToUpdate).fetch().then((items, err) => {
                        if (!items) {
                            res.error(err);
                        } else {
                            res.ok({
                                data: items
                            });
                        }
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
    auditLogs: function (req, res) {
        var count = req.params.count || 10;
        Auditlog.find({}).sort([
            { createdAt: 'DESC' },
        ]).limit(count).exec((error, items) => {
            if (error) {
                res.error({ error });
            } else {
                res.ok({
                    data: items
                });
            }
        });
    },


    saveCalculations: function (req, res) {
        let itemToCreate = req.body;
        itemToCreate['name'] = "DEFAULT";
        itemToCreate['userId'] = req.username;
        Calculations.find({
            name: itemToCreate['name'],
            userId: req.username
        }).sort([
            {
                createdAt: 'DESC'
            },
        ]).limit(1).exec((error, items) => {
            if (items && items.length > 0) {
                let recentItem = items[0];
                let lastVersion = parseFloat(recentItem['version']);
                itemToCreate['version'] = lastVersion + 1;
            } else {
                itemToCreate['version'] = 1;
            }
            Calculations.create(itemToCreate).fetch().then((itemAdded) => {
                if (itemAdded) {
                    res.ok({
                        data: itemAdded
                    });
                } else {
                    res.error({ error });
                }
            });
        })
    },
    setCalcActiveOrTest: function (req, res) {
        if (req.params.id && req.params.state) {
            let state = req.params.state;
            if (state.toUpperCase() === 'ACTIVE' || state.toUpperCase() === 'TEST') {
                let filterParam = {
                    isActive: true
                }, updateParam = {
                    isActive: false
                };
                if (state.toUpperCase() === 'TEST') {
                    filterParam = {
                        isTest: true
                    };
                    updateParam = {
                        isTest: false
                    };
                }
                Calculations.update(filterParam, updateParam).exec((error, items) => {
                    Calculations.find({ id: req.params.id, userId: req.username }).exec((findErr, items) => {
                        if (items && items.length > 0) {
                            let itemFound = items[0];
                            Calculations.update({ id: itemFound.id }, filterParam).exec((error, items) => {
                                if (error) {
                                    res.error({
                                        error: error
                                    });
                                } else {
                                    res.ok({
                                        data: items
                                    });
                                }
                            });
                        } else {
                            res.error({
                                error: 'Item not found'
                            });
                        }
                    });
                })
            } else {
                res.error({
                    error: 'Missing id param'
                });
            }
        } else {
            res.error({
                error: 'Missing id param'
            });
        }
    },
    getCalcActiveOrTest: function (req, res) {
        if (req.params.state) {
            let state = req.params.state;
            if (state.toUpperCase() === 'ACTIVE' || state.toUpperCase() === 'TEST') {
                let filterParam = {
                    isActive: true
                };
                if (state.toUpperCase() === 'TEST') {
                    filterParam = {
                        isTest: true
                    };
                }
                Calculations.find(filterParam).exec((findErr, items) => {
                    if (items && items.length > 0) {
                        res.ok({
                            data: items
                        });
                    } else {
                        res.error({
                            error: findErr
                        });
                    }
                });
            } else {
                res.error({
                    error: 'missing id param'
                });
            }
        } else {
            res.error({
                error: 'missing id param'
            });
        }
    },
    getCalcVersions: function (req, res) {
        Calculations.find({
            userId: req.username
        }).exec((error, items) => {
            if (error) {
                res.error({
                    error: error
                });
            } else {
                res.ok({
                    data: items.map(code => {
                        return {
                            version: code['version'],
                            createdAt: code['createdAt']
                        };
                    })
                });
            }
        });
    },
    getCalculationsByUser: function (req, res) {
        Calculations.find({
            userId: req.username
        }).exec((error, items) => {
            if (error) {
                res.error({
                    error: error
                });
            } else {
                res.ok({
                    data: items
                });
            }
        });
    },
    getCalculationsById: function (req, res) {
        if (req.params.id) {
            Calculations.find({
                userId: req.username,
                id: req.params.id
            }).exec((error, items) => {
                if (error) {
                    res.error({
                        error: error
                    });
                } else {
                    res.ok({
                        data: items
                    });
                }
            });
        } else {
            res.error({
                error: 'id missing'
            })
        }
    },
    deleteCalculationsById: function (req, res) {
        if (req.params.id) {
            Calculations.destroy({
                userId: req.username,
                id: req.params.id
            }).exec((error, items) => {
                if (error) {
                    res.error({
                        error: error
                    });
                } else {
                    res.ok({
                        data: items
                    });
                }
            });
        } else {
            res.error({
                error: 'id missing'
            })
        }
    },
    getCalculationsByVersion: function (req, res) {
        if (req.params.version) {
            Calculations.find({
                userId: req.username,
                version: parseFloat(req.params.version)
            }).exec((error, items) => {
                if (error) {
                    res.error({
                        error: error
                    });
                } else {
                    res.ok({
                        data: items
                    });
                }
            });
        } else {
            res.error({
                error: 'version missing'
            })
        }
    },
    getAllCalculations: function (req, res) {
        Calculations.find({

        }).exec((error, items) => {
            if (error) {
                res.error({
                    error: error
                });
            } else {
                res.ok({
                    data: items
                });
            }
        });
    }
};

