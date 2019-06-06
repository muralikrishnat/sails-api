/**
 * AddonController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    shareFilterBrand: function (req, res) {
        let itemToAdd = req.body;
        if (itemToAdd['sharedTo']) {
            let user = req.user ? req.user['oktaProfile'] : {
                login: req.username
            };
            itemToAdd['sharedBy'] = user;
            itemToAdd['shareType'] = 'FILTER_BRAND';
            Shares.create(itemToAdd).fetch().then((addedItems) => {
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
        } else {
            res.error({ error: "missing required fields" });
        }
    },
    shareEntity: function (req, res) {
        let itemToAdd = req.body;
        if (itemToAdd['sharedTo'] && itemToAdd['sharedTo'].trim().toUpperCase() === req.username.trim().toUpperCase()) {
            res.error({
                error: "You cant share yourself",
                code: "CANT_SHARE_YOURSELF"
            });

        } else if (itemToAdd['sharedTo'] && (req.user || req.username)) {
            Users.find({}).exec((err, items) => {
                if (err) {
                    res.error({
                        error: "email not exists in system",
                        details: err,
                        code: "EMAIL_NOT_EXISTS"
                    });
                } else {
                    let emailExists = false;
                    for (let i = 0; i < items.length; i++) {
                        let user = items[i];
                        if (user.oktaProfile) {
                            if (itemToAdd['sharedTo'].toUpperCase() === user.username.toUpperCase()) {
                                emailExists = true;
                                break;
                            }
                        }
                    }

                    if (emailExists) {
                        let user = {
                            login: req.username,
                            firstName: req.user ? req.user['firstName'] : "",
                            lastName: req.user ? req.user['lastName'] : "",
                            id: req.user ? req.user['id'] : "",
                        },
                            isFilterSharedBy = function (filterItemToCreate) {
                                return new Promise((sharedBy, notSharedRej) => {
                                    FilterBrands.find({ name: filterItemToCreate.name, userId: filterItemToCreate['userId'], isShared: true }).exec((findFiltersErr, existingShares) => {
                                        if (findFiltersErr) {
                                            notSharedRej({ error: findFiltersErr });
                                        } else {
                                            let isAlreadyShared = false, itemFound = null;
                                            if (existingShares && existingShares.length > 0) {
                                                for (let i = 0; i < existingShares.length; i++) {
                                                    let existsItem = existingShares[i];
                                                    if (existsItem && existsItem.sharedBy && existsItem.sharedBy['login'] === user.login) {
                                                        itemFound = existsItem;
                                                        break;
                                                    }
                                                }
                                                if (itemFound) {
                                                    isAlreadyShared = true;
                                                }
                                            }
                                            sharedBy({ isAlreadyShared, itemFound });
                                        }
                                    });
                                });
                            },
                            isCigSharedBy = function (cigItemToCreate) {
                                return new Promise((sharedBy, notSharedRej) => {
                                    CigarateBrands.find({ name: cigItemToCreate.name, userId: cigItemToCreate['userId'], isShared: true }).exec((cigErr, existingShares) => {
                                        if (cigErr) {
                                            notSharedRej({ error: cigErr });
                                        } else {
                                            let isAlreadyShared = false, itemFound = null;
                                            if (existingShares && existingShares.length > 0) {
                                                for (let i = 0; i < existingShares.length; i++) {
                                                    let existsItem = existingShares[i];
                                                    if (existsItem && existsItem.sharedBy && existsItem.sharedBy['login'] === user.login) {
                                                        itemFound = existsItem;
                                                        break;
                                                    }
                                                }
                                                if (itemFound) {
                                                    isAlreadyShared = true;
                                                }
                                            }
                                            sharedBy({ isAlreadyShared, itemFound });
                                        }
                                    });
                                });
                            },
                            isCarbCigSharedBy = function (carbcigItemToCreate) {
                                return new Promise((sharedBy, notSharedRej) => {
                                    CarbCigarateBrands.find({ name: carbcigItemToCreate.name, userId: carbcigItemToCreate['userId'], isShared: true }).exec((cigErr, existingShares) => {
                                        if (cigErr) {
                                            notSharedRej({ error: cigErr });
                                        } else {
                                            let isAlreadyShared = false, itemFound = null;
                                            if (existingShares && existingShares.length > 0) {
                                                for (let i = 0; i < existingShares.length; i++) {
                                                    let existsItem = existingShares[i];
                                                    if (existsItem && existsItem.sharedBy && existsItem.sharedBy['login'] === user.login) {
                                                        itemFound = existsItem;
                                                        break;
                                                    }
                                                }
                                                if (itemFound) {
                                                    isAlreadyShared = true;
                                                }
                                            }
                                            sharedBy({ isAlreadyShared, itemFound });
                                        }
                                    });
                                });
                            },
                            isCarbFilterSharedBy = function (carbFilterItemToCreate) {
                                return new Promise((sharedBy, notSharedRej) => {
                                    CarbFilterBrands.find({ dualFilterName: carbFilterItemToCreate.dualFilterName, userId: carbFilterItemToCreate['userId'], isShared: true }).exec((cigErr, existingShares) => {
                                        if (cigErr) {
                                            notSharedRej({ error: cigErr });
                                        } else {
                                            let isAlreadyShared = false, itemFound = null;
                                            if (existingShares && existingShares.length > 0) {
                                                for (let i = 0; i < existingShares.length; i++) {
                                                    let existsItem = existingShares[i];
                                                    if (existsItem && existsItem.sharedBy && existsItem.sharedBy['login'] === user.login) {
                                                        itemFound = existsItem;
                                                        break;
                                                    }
                                                }
                                                if (itemFound) {
                                                    isAlreadyShared = true;
                                                }
                                            }
                                            sharedBy({ isAlreadyShared, itemFound });
                                        }
                                    });
                                });
                            },
                            
                            createFilterBrand = function (itemToCreate, itemFound) {
                                return new Promise((createdRes, createdRej) => {
                                    let createPromise = null;
                                    if (itemFound) {
                                        createPromise = FilterBrands.update({ id: itemFound.id }, itemToCreate);
                                    } else {
                                        createPromise = FilterBrands.create(itemToCreate);
                                    }
                                    createPromise.fetch().then((addedItems) => {
                                        if (addedItems) {
                                            createdRes({
                                                data: addedItems
                                            });
                                        } else {
                                            createdRej({
                                                error: 'Unable to create Filter brand'
                                            });
                                        }
                                    });
                                });
                            },
                            createCigBrand = function (itemToCreate, itemFound) {
                                return new Promise((createdRes, createdRej) => {
                                    let createPromise = null;
                                    if (itemFound) {
                                        createPromise = CigarateBrands.update({ id: itemFound.id }, itemToCreate);
                                    } else {
                                        createPromise = CigarateBrands.create(itemToCreate);
                                    }
                                    createPromise.fetch().then((addedItems) => {
                                        if (addedItems) {
                                            createdRes({
                                                data: addedItems
                                            });
                                        } else {
                                            createdRej({
                                                error: 'Unable to create cig design'
                                            });
                                        }
                                    });
                                });
                            },
                            createCarbCigBrand = function (itemToCreate, itemFound) {
                                return new Promise((createdRes, createdRej) => {
                                    let createPromise = null;
                                    if (itemFound) {
                                        createPromise = CarbCigarateBrands.update({ id: itemFound.id }, itemToCreate);
                                    } else {
                                        createPromise = CarbCigarateBrands.create(itemToCreate);
                                    }
                                    createPromise.fetch().then((addedItems) => {
                                        if (addedItems) {
                                            createdRes({
                                                data: addedItems
                                            });
                                        } else {
                                            createdRej({
                                                error: 'Unable to create cig design'
                                            });
                                        }
                                    });
                                });
                            },
                            createCarbFilterBrand = function (itemToCreate, itemFound) {
                                return new Promise((createdRes, createdRej) => {
                                    let createPromise = null;
                                    if (itemFound) {
                                        createPromise = CarbFilterBrands.update({ id: itemFound.id }, itemToCreate);
                                    } else {
                                        createPromise = CarbFilterBrands.create(itemToCreate);
                                    }
                                    createPromise.fetch().then((addedItems) => {
                                        if (addedItems) {
                                            createdRes({
                                                data: addedItems
                                            });
                                        } else {
                                            createdRej({
                                                error: 'Unable to create cig design'
                                            });
                                        }
                                    });
                                });
                            };
                        itemToAdd['sharedBy'] = user;
                        itemToAdd['userId'] = req.username;
                        itemToAdd['shareType'] = itemToAdd['shareType'] || 'FILTER_BRAND';
            
            
                        let itemToCreate = itemToAdd['sharedData'];
                        delete itemToCreate['id'];
                        itemToCreate['userId'] = itemToAdd['sharedTo'];
                        itemToCreate['isShared'] = true;
                        itemToCreate['sharedBy'] = user;
                        if (itemToAdd['shareType'] === 'FILTER_BRAND') {
                            try {
                                isFilterSharedBy(itemToCreate).then(({ isAlreadyShared, itemFound }) => {
                                    var createPromise = null;
                                    if (isAlreadyShared) {
                                        createPromise = createFilterBrand(itemToCreate, itemFound);
                                    } else {
                                        createPromise = createFilterBrand(itemToCreate);
                                    }
                                    createPromise.then((createPromiseResponse) => {
                                        res.ok(createPromiseResponse);
                                    }, (createPromiseErr) => {
                                        res.error(createPromiseErr);
                                    })
                                }, (error) => {
                                    res.error(error);
                                });
                            } catch (e) {
                                //swallow
                                res.error({
                                    error: 'Unable to create Filter brand',
                                    details: e
                                });
                            }
                        } else if (itemToAdd['shareType'] === 'CARB_FILTER_BRAND') {
                            try {
                                let isFilterAExists = false, isFilterBExists = false, promises = [], filterA = null, filterB = null;
                                promises.push(new Promise((filterARes, filterARej) => {
                                    FilterBrands.find({ id: itemToCreate['filterAId'] }).exec((filterAErr, filterAItems) => {
                                        if (filterAItems && filterAItems.length > 0) {
                                            filterA = filterAItems[0];
                                            isFilterAExists = true;
                                        }
                                        filterARes({});
                                    });
                                }));
                                promises.push(new Promise((filterBRes, filterBRej) => {
                                    FilterBrands.find({ id: itemToCreate['filterBId'] }).exec((filterBErr, filterBItems) => {
                                        if (filterBItems && filterBItems.length > 0) {
                                            filterB = filterBItems[0];
                                            isFilterBExists = true;
                                        }
                                        filterBRes({});
                                    });
                                }));
            
                                Promise.all(promises).then((filters) => {
                                    if (isFilterAExists && isFilterBExists) {
                                        delete filterA['id'];
                                        delete filterB['id'];
                                        let createdFlag = {
                                            a: false,
                                            aLoaded: false,
                                            b: false,
                                            bLoaded: false
                                        };
                                        var createCarbFilter = function (res) {
                                            if (createdFlag.bLoaded && createdFlag.aLoaded) {
                                                if (createdFlag.a && createdFlag.b) {
                                                    itemToCreate['filterAId'] = filterA['id'];
                                                    itemToCreate['filterBId'] = filterB['id'];
                                                    isCarbFilterSharedBy(itemToCreate).then(({ isAlreadyShared, itemFound }) => {
                                                        let createCarbFilterPromise = null;
                                                        if (isAlreadyShared) {
                                                            createCarbFilterPromise = createCarbFilterBrand(itemToCreate, itemFound);
                                                        } else {
                                                            createCarbFilterPromise = createCarbFilterBrand(itemToCreate);
                                                        }
                                                        createCarbFilterPromise.then(({ data:dataResp }) => {
                                                            let data = dataResp instanceof Array ? dataResp[0] : dataResp;
                                                            if (data && data.id) {
                                                                res.ok({
                                                                    data: data
                                                                });
                                                            } else {
                                                                res.error({
                                                                    error: 'Unable to create filter'
                                                                });
                                                            }
                                                        }, (createPromiseErr) => {
                                                            res.error(createPromiseErr);
                                                        });
                                                    });
                                                     
                                                } else {
                                                    res.error({
                                                        error: 'Unable to create Filter brand'
                                                    });
                                                }
                                            }
                                        }
                                        filterA['userId'] = itemToAdd['sharedTo'];
                                        filterA['isShared'] = true;
                                        filterA['sharedBy'] = user;
                                        isFilterSharedBy(filterA).then(({ isAlreadyShared, itemFound }) => {
                                            let createFilterPromise = null;
                                            if (isAlreadyShared) {
                                                createFilterPromise = createFilterBrand(filterA, itemFound);
                                            } else {
                                                createFilterPromise = createFilterBrand(filterA);
                                            }
                                            createFilterPromise.then(({ data:dataResp }) => {
                                                let data = dataResp instanceof Array ? dataResp[0] : dataResp;
                                                if (data && data.id) {
                                                    createdFlag.aLoaded = true;
                                                    filterA['id'] = data['id'];
                                                    createdFlag.a = true;
                                                    createCarbFilter(res);
                                                } else {
                                                    res.error({
                                                        error: 'Unable to create filter'
                                                    });
                                                }
                                            }, (createPromiseErr) => {
                                                res.error(createPromiseErr);
                                            })
                                        }, (error) => {
                                            res.error(error);
                                        });
                                        filterB['userId'] = itemToAdd['sharedTo'];
                                        filterB['isShared'] = true;
                                        filterB['sharedBy'] = user;
                                        isFilterSharedBy(filterB).then(({ isAlreadyShared, itemFound }) => {
                                            let createFilterPromise = null;
                                            if (isAlreadyShared) {
                                                createFilterPromise = createFilterBrand(filterB, itemFound);
                                            } else {
                                                createFilterPromise = createFilterBrand(filterB);
                                            }
                                            createFilterPromise.then(({ data:dataResp }) => {
                                                let data = dataResp instanceof Array ? dataResp[0] : dataResp;
                                                if (data && data.id) {
                                                    createdFlag.bLoaded = true;
                                                    filterB['id'] = data['id'];
                                                    createdFlag.b = true;
                                                    createCarbFilter(res);
                                                } else {
                                                    res.error({
                                                        error: 'Unable to create filter'
                                                    });
                                                }
                                            }, (createPromiseErr) => {
                                                res.error(createPromiseErr);
                                            })
                                        }, (error) => {
                                            res.error(error);
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
                        } else if (itemToAdd['shareType'] === 'CIGARETTE_BRAND') {
                            try {
                                FilterBrands.find({ id: itemToCreate['filterId'] }).exec((filterErr, filters) => {
                                    if (filters && filters.length > 0) {
                                        let filterItemToCreate = filters[0];
                                        delete filterItemToCreate['id'];
                                        filterItemToCreate['userId'] = itemToAdd['sharedTo'];
                                        filterItemToCreate['isShared'] = true;
                                        filterItemToCreate['sharedBy'] = user;
                                        isFilterSharedBy(filterItemToCreate).then(({ isAlreadyShared, itemFound }) => {
                                            let createFilterPromise = null;
                                            if (isAlreadyShared) {
                                                createFilterPromise = createFilterBrand(filterItemToCreate, itemFound);
                                            } else {
                                                createFilterPromise = createFilterBrand(filterItemToCreate);
                                            }
                                            createFilterPromise.then(({ data:dataResp }) => {
                                                let data = dataResp instanceof Array ? dataResp[0] : dataResp;
                                                if (data && data.id) {
                                                    itemToCreate['filterId'] = data.id;
                                                    isCigSharedBy(itemToCreate).then(({ isAlreadyShared:isCigAlreadyShared, itemFound:cigItemFound }) => {
                                                        let createCigPromise;
                                                        if (isCigAlreadyShared) {
                                                            createCigPromise = createCigBrand(itemToCreate, cigItemFound);
                                                        } else {
                                                            createCigPromise = createCigBrand(itemToCreate);
                                                        }
                                                        createCigPromise.then((createPromiseResponse) => {
                                                            res.ok(createPromiseResponse);
                                                        }, (createPromiseErr) => {
                                                            res.error(createPromiseErr);
                                                        })
                                                    });
                                                } else {
                                                    res.error({
                                                        error: 'Unable to create filter'
                                                    });
                                                }
                                            }, (createPromiseErr) => {
                                                res.error(createPromiseErr);
                                            })
                                        }, (error) => {
                                            res.error(error);
                                        });
                                    } else {
                                        res.error({
                                            error: 'Unable to share item'
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
                        } else if (itemToAdd['shareType'] === 'CARB_CIGARETTE_BRAND') {
                            try {
                                CarbFilterBrands.find({ id: itemToCreate['dualFilterId'] }).exec((err, addedItems) => {
                                    if (addedItems && addedItems.length > 0) {
                                        let carbItem = addedItems[0];
                                        let isFilterAExists = false, isFilterBExists = false, promises = [], filterA = null, filterB = null;
                                        promises.push(new Promise((filterARes, filterARej) => {
                                            FilterBrands.find({ id: carbItem['filterAId'] }).exec((filterAErr, filterAItems) => {
                                                if (filterAItems && filterAItems.length > 0) {
                                                    filterA = filterAItems[0];
                                                    isFilterAExists = true;
                                                }
                                                filterARes(filterA);
                                            });
                                        }));
                                        promises.push(new Promise((filterBRes, filterBRej) => {
                                            FilterBrands.find({ id: carbItem['filterBId'] }).exec((filterBErr, filterBItems) => {
                                                if (filterBItems && filterBItems.length > 0) {
                                                    filterB = filterBItems[0];
                                                    isFilterBExists = true;
                                                }
                                                filterBRes(filterB);
                                            });
                                        }));
            
                                        Promise.all(promises).then((filters) => {
                                            if (isFilterAExists && isFilterBExists) {
                                                delete filterA['id'];
                                                delete filterB['id'];
                                                let createdFlag = {
                                                    a: false,
                                                    aLoaded: false,
                                                    b: false,
                                                    bLoaded: false
                                                };
                                                var createCarbCig = function (res) {
                                                    if (createdFlag.bLoaded && createdFlag.aLoaded) {
                                                        if (createdFlag.a && createdFlag.b) {
                                                            delete carbItem['id'];
                                                            carbItem['userId'] = itemToAdd['sharedTo'];
                                                            carbItem['isShared'] = true;
                                                            carbItem['sharedBy'] = user;
                                                            carbItem['filterAId'] = filterA['id'];
                                                            carbItem['filterBId'] = filterB['id'];
                                                            isCarbFilterSharedBy(carbItem).then(({ isAlreadyShared, itemFound }) => {
                                                                let createCarbFilterPromise = null;
                                                                if (isAlreadyShared) {
                                                                    createCarbFilterPromise = createCarbFilterBrand(carbItem, itemFound);
                                                                } else {
                                                                    createCarbFilterPromise = createCarbFilterBrand(carbItem);
                                                                }
                                                                createCarbFilterPromise.then(({ data:dataResp }) => {
                                                                    let data = dataResp instanceof Array ? dataResp[0] : dataResp;
                                                                    if (data && data.id) {
                                                                        delete itemToCreate['id'];
                                                                        itemToCreate['dualFilterId'] = data.id;
                                                                        itemToCreate['userId'] = itemToAdd['sharedTo'];
                                                                        itemToCreate['isShared'] = true;
                                                                        itemToCreate['sharedBy'] = user;
            
                                                                        isCarbCigSharedBy(itemToCreate).then(({isAlreadyShared: carbCigAlreadyShared, itemFound: carbCigItemFound}) => {
                                                                            let createCarbCigPromise = null;
                                                                            if (carbCigAlreadyShared) {
                                                                                createCarbCigPromise = createCarbCigBrand(itemToCreate, carbCigItemFound);
                                                                            } else {
                                                                                createCarbCigPromise = createCarbCigBrand(itemToCreate);
                                                                            }
                                                                            createCarbCigPromise.then(({ data:createCarbCigPromiseResp }) => {
                                                                                let datcarbCigCreatedItem = createCarbCigPromiseResp instanceof Array ? createCarbCigPromiseResp[0] : createCarbCigPromiseResp;
                                                                                res.ok({
                                                                                    data: datcarbCigCreatedItem
                                                                                });
                                                                            }, (createCarbCigPromiseErr) => {
                                                                                res.error(createCarbCigPromiseErr);
                                                                            });
                                                                        });
                                                                    } else {
                                                                        res.error({
                                                                            error: 'Unable to create filter'
                                                                        });
                                                                    }
                                                                }, (createPromiseErr) => {
                                                                    res.error(createPromiseErr);
                                                                });
                                                            });
            
                                                        } else {
                                                            res.error({
                                                                error: 'Unable to create Filter brand'
                                                            });
                                                        }
                                                    }
                                                };
                                               
                                                filterA['userId'] = itemToAdd['sharedTo'];
                                                filterA['isShared'] = true;
                                                filterA['sharedBy'] = user;
                                                isFilterSharedBy(filterA).then(({ isAlreadyShared, itemFound }) => {
                                                    let createFilterPromise = null;
                                                    if (isAlreadyShared) {
                                                        createFilterPromise = createFilterBrand(filterA, itemFound);
                                                    } else {
                                                        createFilterPromise = createFilterBrand(filterA);
                                                    }
                                                    createFilterPromise.then(({ data:dataResp }) => {
                                                        let data = dataResp instanceof Array ? dataResp[0] : dataResp;
                                                        if (data && data.id) {
                                                            createdFlag.aLoaded = true;
                                                            filterA['id'] = data.id;
                                                            createdFlag.a = true;
                                                            createCarbCig(res);
                                                        } else {
                                                            res.error({
                                                                error: 'Unable to create filter'
                                                            });
                                                        }
                                                    }, (createPromiseErr) => {
                                                        res.error(createPromiseErr);
                                                    })
                                                }, (error) => {
                                                    res.error(error);
                                                });
                                                 
                                                filterB['userId'] = itemToAdd['sharedTo'];
                                                filterB['isShared'] = true;
                                                filterB['sharedBy'] = user;
            
                                                isFilterSharedBy(filterB).then(({ isAlreadyShared, itemFound }) => {
                                                    let createFilterPromise = null;
                                                    if (isAlreadyShared) {
                                                        createFilterPromise = createFilterBrand(filterB, itemFound);
                                                    } else {
                                                        createFilterPromise = createFilterBrand(filterB);
                                                    }
                                                    createFilterPromise.then(({ data:dataResp }) => {
                                                        let data = dataResp instanceof Array ? dataResp[0] : dataResp;
                                                        if (data && data.id) {
                                                            createdFlag.bLoaded = true;
                                                            filterB['id'] = data.id;
                                                            createdFlag.b = true;
                                                            createCarbCig(res);
                                                        } else {
                                                            res.error({
                                                                error: 'Unable to create filter'
                                                            });
                                                        }
                                                    }, (createPromiseErr) => {
                                                        res.error(createPromiseErr);
                                                    })
                                                }, (error) => {
                                                    res.error(error);
                                                });
                                            }
                                        });
                                    } else {
                                        res.error({
                                            error: 'Unable to share item'
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
                        } else {
                            res.error({ error: "share type is not found" });
                        }
                    } else {
                        res.error({
                            error: "Email not exists",
                            code: "EMAIL_NOT_EXISTS" 
                        });
                    }
                }
            });
        } else {
            res.error({ error: "missing required fields" });
        }
    },
    getShares: function (req, res) {
        if (req.username) {
            Shares.find({}).exec(function (err, items) {
                let itemsByUser = [];
                for (let i = 0; i < items.length; i++) {
                    let shareItem = items[i];
                    if (shareItem['sharedBy'] && shareItem['sharedBy']['login'] && shareItem['sharedBy']['login'].trim().toUpperCase() === req.username.toUpperCase()) {
                        itemsByUser.push(shareItem);
                    }
                }
                res.ok({
                    data: itemsByUser
                });
            });
        } else {
            res.error({ error: "missing required fields" });
        }
    },
    deleteSharedWithMeById: function (req, res) {
        if (req.params.id) {
            Shares.find({ id: req.params.id }).exec((err, items) => {
                if (items && items.length > 0) {
                    let itemToCheck = items[0];
                    if (itemToCheck && itemToCheck['sharedTo']) {
                        if (itemToCheck['sharedTo'] instanceof Array) {
                            let otherItems = [];
                            for (let i = 0; i < itemToCheck['sharedTo'].length; i++) {
                                if (itemToCheck['sharedTo'][i] && itemToCheck['sharedTo'][i].trim().toUpperCase() !== req.username.trim().toUpperCase()) {
                                    otherItems.push(itemToCheck['sharedTo'][i]);
                                }
                            }
                            itemToCheck['sharedTo'] = otherItems;
                            Shares.update({ id: req.params.id }, itemToCheck).fetch().then((items, err) => {
                                if (!items) {
                                    res.error({
                                        error: 'unable to delete share'
                                    });
                                } else {
                                    res.ok({
                                        data: items
                                    });
                                }
                            });
                        } else if (typeof itemToCheck['sharedTo'] === 'string' && itemToCheck['sharedTo'].toUpperCase() === req.username.trim().toUpperCase()) {
                            Shares.destroy({ id: itemToCheck.id }).fetch().then((items) => {
                                res.ok({
                                    data: items
                                });
                            });
                        }
                    } else {
                        res.error({ error: "missing required fields" });
                    }
                } else {
                    res.error({ error: "missing required fields" });
                }
            });
        } else {
            res.error({ error: "missing required fields" });
        }
    },
    deleteEntity: function (req, res) {
        if (req.params.id) {
            Shares.find({ id: req.params.id }).exec((errShare, addedItems) => {
                if (addedItems && addedItems.length) {
                    Shares.destroy({ id: req.params.id }).then((items) => {
                        res.ok({
                            data: items
                        });
                    });
                } else {
                    res.error({
                        error: 'Unable to delete Filter brand'
                    });
                }
            });

        } else {
            res.error({ error: "missing required fields" });
        }
    },
    sharedWithMe: function (req, res) {
        Shares.find({}).exec((addedItems) => {
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
    },
    getRegistaredEmailIds: function (req, res) {
        // Users.find({}).exec((err, items) => {
        //     if (err) {
        //         res.error({
        //             error: "unable to fetch users email",
        //             details: err
        //         });
        //     } else {
        //         let emails = [];
        //         for (let i = 0; i < items.length; i++) {
        //             let user = items[i];
        //             if (user.oktaProfile) {
        //                 emails.push(user.username);
        //             }
        //         }
        //         res.ok({
        //             data: emails
        //         });
        //     }
        // });
        res.ok({ data: [] });
    },


    getFirmUnits: function (req, res) {
        FirmUnits.find().exec((error, items) => {
            if (error) {
                res.error({
                    error
                });
            } else {
                res.ok({
                    data: items
                });
            }
        });
    },
    createFirmUnit: function (req, res) {
        let itemToAdd = req.body;
        if (itemToAdd.name) {
            FirmUnits.create(itemToAdd).fetch().then((itemAdded) => {
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
    updateFirmUnit: function (req, res) {
        let itemToAdd = req.body;
        if (req.params.id) {
            FirmUnits.update({ id: req.params.id }, itemToAdd).fetch().then((itemAdded) => {
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
    removeFirmUnitById: function (req, res) {
        if (req.params.id) {
            FirmUnits.destroy({ id: req.params.id }).fetch().then((itemAdded) => {
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

