/**
 * TowItemsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions.  b/[b]
 */

const excelToJson = require('convert-excel-to-json');
var validateExcelSheet = function (uploadFiles, req) {
    var res = {};
    if (uploadFiles.length > 0) {
        let excelFile = uploadFiles[0];
        const result = excelToJson({
            sourceFile: excelFile.fd
        });
        let sheetConfig = {
            dbSheet: req.body.sheet,
            startRow: req.body.startRow || 0,
            startCol: req.body.startCol || 0
        }
        let sheetNamesToCheck = ['TowItems', 'Sheet1', 'Report', 'Database', sheetConfig.dbSheet];
        let sheetNameFound;
        sheetNamesToCheck.forEach(sheetName => {
            if (result[sheetName]) {
                sheetNameFound = sheetName;
            }
        });
        if (sheetNameFound) {
            sheetConfig.dbSheet = sheetNameFound;
        } else {
            let sheetsInExcel = Object.keys(result);
            if (sheetsInExcel.length > 0) {
                sheetConfig.dbSheet = sheetsInExcel;
            }
        }
        if (result[sheetConfig.dbSheet]) {
            let towItemsToCreate = [];
            let sheetSelected = result[sheetConfig.dbSheet];
            //Finding the start index and col for twoitems
            let limitToCheck = 10;
            let foundStartIndex = false;
            let allowedCols = ["itemlot", "plancode", "lot", "item", "nompf", "lotadpf", "lotatd", "nomtd", "minwt", "minpd", "maxwt", "maxpd", "itmcirc", "stdlen", "status", "stdpwth"];
            for (let r = 0; r < limitToCheck; r++) {
                var rowToCheck = sheetSelected[r];
                var cols = Object.keys(rowToCheck);
                for (let c = 0; c < cols.length; c++) {
                    var contentInCol = rowToCheck[cols[c]];
                    if (allowedCols.indexOf(contentInCol) >= 0) {
                        sheetConfig.startRow = r;
                        foundStartIndex = true;
                        break;
                    }
                }
                if (foundStartIndex) {
                    break;
                }
            }
            if (foundStartIndex) {
                let columnNames = sheetSelected[sheetConfig.startRow];
                let colKeys = Object.keys(columnNames);

                let itemLots = [], itemsToCreate = [];
                let itemLotIndex = 0;
                colKeys.forEach(c => {
                    if (columnNames[c] === 'itemlot') {
                        itemLotIndex = c;
                    }
                });

                let isEmptyFound = false, itemLotDuplicationFound = false, isHavingDataTypeError = false;
                let emptyFieldIndex = null, possibleEmptyDetectionRow = null, duplicationRows = null, dataTypeDetails = null;

                for (let i = sheetConfig.startRow + 1; i < sheetSelected.length; i++) {
                    let towData = sheetSelected[i];
                    let towItem = {};
                    for (let k = 0; k < colKeys.length; k++) {
                        if (towData[colKeys[k]] === undefined || (towData[colKeys[k]] != null && (towData[colKeys[k]] + '').length === 0)) {
                            emptyFieldIndex = colKeys[k];
                            possibleEmptyDetectionRow = i;
                            isEmptyFound = true;
                            break;
                        }

                        let columnName = columnNames[colKeys[k]];
                        let colValue = towData[colKeys[k]];
                        let allowedStatus = ['TRUE', 'FALSE', '0', '1', 'ACTIVE', 'INACTIVE', 'O', 'A'];
                        if (columnName.trim().toUpperCase() === 'STATUS'.trim()) {
                            colValue = ((colValue || '') + '').toUpperCase();
                            if (allowedStatus.indexOf(colValue) >= 0) {
                                colValue = (colValue.toUpperCase() === 'A' || colValue.toUpperCase() === '1' || colValue.toUpperCase() === 'ACTIVE' || (colValue.toUpperCase() === 'TRUE')) ? true : false;
                            } else {
                                dataTypeDetails = {
                                    columnName: "status",
                                    colValue: colValue,
                                    itemRow: i,
                                    allowedValues: allowedStatus,
                                    moreInfo: "Status field must have these values 'TRUE', 'FALSE', '0', '1', 'ACTIVE', 'INACTIVE'"
                                };
                                isHavingDataTypeError = true;
                                break;
                            }
                        }

                        try {
                            Towitems.validate(columnName, colValue);
                        } catch (validException) {
                            dataTypeDetails = {
                                columnName: columnName,
                                colValue: colValue,
                                itemRow: i,
                                moreInfo: validException
                            };
                            isHavingDataTypeError = true;
                            break;
                        }
                        towItem[columnName] = colValue;
                    }
                    if (isEmptyFound || isHavingDataTypeError) {
                        break;
                    }
                    if (itemLots.indexOf(towData[itemLotIndex]) >= 0) {
                        duplicationRows = '' + (itemLots.indexOf(towData[itemLotIndex]) + 1) + ',' + (i);
                        itemLotDuplicationFound = true;
                        break;
                    } else {
                        itemLots.push(towData[itemLotIndex]);
                        itemsToCreate.push(towItem);
                    }
                }


                if (isEmptyFound || itemLotDuplicationFound || isHavingDataTypeError || itemLots.length === 0) {
                    res = {
                        error: 'Provided excel has failed validation',
                        validation: {
                            emptyItemlot: isEmptyFound,
                            emptySheet: itemLots.length === 0,
                            itemLotRepeat: itemLotDuplicationFound,
                            isHavingDataTypeError: isHavingDataTypeError,
                            emptyFieldDetails: {
                                columnName: columnNames[emptyFieldIndex],
                                possibleRowNumber: possibleEmptyDetectionRow
                            },
                            duplicationDetails: {
                                duplicationRows: duplicationRows
                            },
                            dataTypeDetails: dataTypeDetails
                        }
                    };
                } else {
                    res = {
                        data: 'Provided excel passed initial validation',
                        success: true,
                        items: itemsToCreate,
                        dbSheet: sheetConfig.dbSheet
                    };
                }
            } else {
                res = {
                    error: 'Parser unable to find tow items in excel sheet',
                    validation: {
                        towsNotFound: true
                    }
                };
            }

        } else {
            res = {
                error: sheetConfig.dbSheet + ' sheet not found in excel file',
                validation: {
                    sheetNotFound: true
                }
            };
        }
    } else {
        res = {
            error: 'please upload excel file',
            validation: {
                fileMissing: true
            }
        };
    }

    return res;
};
module.exports = {
    index: function (req, res) {
        if (req.user && req.user.role && req.user.role.toUpperCase() === 'ADMIN') {
            Towitems.find().exec((error, items) => {
                if (error) {
                    res.error({
                        error: 'Internal Error',
                        details: error
                    });
                } else {
                    res.ok(items);
                }
            });
        } else {
            res.error({
                error: "Need administrator access to all towitems"
            });
        }
    },
    towItemsByCompany: function (req, res) {
        if (req.params.company) {
            Towitems.find().exec((error, items) => {
                if (error) {
                    res.error({
                        error: 'Internal Error',
                        details: error
                    });
                } else {
                    let userAllowedItems = items;
                    Company.find({}).exec((err, companies) => {
                        if (companies && companies.length > 0) {
                            let userCompany = companies.filter(c => {
                                if (c.company) {
                                    return c.company.trim().toUpperCase() === req.params.company.trim().toUpperCase();
                                } else {
                                    return false;
                                }
                            });
                            if (userCompany.length > 0) {
                                let assignedItems = userCompany[0].items;
                                if (assignedItems.length > 0) {
                                    let companyItems = [];
                                    for (let i = 0; i < userAllowedItems.length; i++) {
                                        let itemToCheck = userAllowedItems[i];
                                        if (assignedItems.filter(c => {
                                            let itemLot = c['itemlot'] || c;
                                            if (itemLot && itemToCheck['itemlot'] && itemLot.trim() === itemToCheck['itemlot'].trim()) {
                                                return true;
                                            } else {
                                                return false;
                                            }
                                        }).length > 0) {
                                            companyItems.push(userAllowedItems[i]);
                                        }
                                    }
                                    res.ok(companyItems);
                                } else {
                                    res.error({
                                        error: 'Company towitems are not configfured'
                                    });
                                }
                            } else {
                                res.error({
                                    error: 'Company towitems are not configfured'
                                });
                            }
                        } else {
                            res.error({
                                error: 'Company towitems are not configfured'
                            });
                        }
                    });
                }
            });
        } else {
            Towitems.find().exec((error, items) => {
                if (error) {
                    res.error({
                        error: 'Internal Error',
                        details: error
                    });
                } else {
                    res.ok(items);
                }
            });
        }
    },
    towItemsByUser: function (req, res) {
        if (req.username) {
            var user = req.user;
            Towitems.find().exec((error, items) => {
                if (error) {
                    res.error({
                        error: 'Internal Error',
                        details: error
                    });
                } else {
                    let userAllowedItems = items;
                    let oktaProfile = user;
                    if (user.loginType === 'okta') {
                        if (oktaProfile) {
                            if (oktaProfile.role && oktaProfile.role.toUpperCase() === 'ADMIN') {
                                res.ok(userAllowedItems);
                            } else  if (oktaProfile.role && oktaProfile.role.toUpperCase() === 'CE-USER') {
                                res.ok(userAllowedItems);
                            } else {
                                if (oktaProfile.company) {
                                    Company.find({}).exec((err, companies) => {
                                        if (companies && companies.length > 0) {
                                            let userCompany = companies.filter(c => {
                                                if (c.company) {
                                                    return c.company.trim().toUpperCase() === oktaProfile.company.trim().toUpperCase();
                                                } else {
                                                    return false;
                                                }
                                            });
                                            if (userCompany.length > 0) {
                                                let assignedItems = userCompany[0].items;
                                                if (assignedItems.length > 0) {
                                                    let companyItems = [];
                                                    for (let i = 0; i < userAllowedItems.length; i++) {
                                                        let itemToCheck = userAllowedItems[i];
                                                        if (assignedItems.filter(c => {
                                                            let itemLot = c['itemlot'] || c;
                                                            if (itemLot && itemToCheck['itemlot'] && itemLot.trim() === itemToCheck['itemlot'].trim()) {
                                                                return true;
                                                            } else {
                                                                return false;
                                                            }
                                                        }).length > 0) {
                                                            companyItems.push(userAllowedItems[i]);
                                                        }
                                                    }
                                                    res.ok(companyItems);
                                                } else {
                                                    res.error({
                                                        error: 'Company dont have towitmes',
                                                        code: "COMPANY_EMPTY_TOWITEMS"
                                                    });
                                                }
                                            } else {
                                                res.error({
                                                    error: 'User company not matched with company in tool.',
                                                    code: "COMPANY_NOT_MATCH"
                                                });
                                            }
                                        } else {
                                            res.error({
                                                error: 'User company not matched with company in tool.',
                                                code: "COMPANY_NOT_MATCH"
                                            });
                                        }
                                    });
                                } else {
                                    res.error({
                                        error: 'User dont have company assigned',
                                        code: "USER_COMPANY_EMPTY"
                                    });
                                }
                            }
                        } else {
                            res.error({
                                error: 'User not setup okta profile yet',
                                code: "USER_NOT_IN_TOOL"
                            });
                        }
                    } else {
                        if (user.role && user.role.toUpperCase() === 'ADMIN') {
                            res.ok(userAllowedItems);
                        } else {
                            res.ok([]);    
                        }
                    }
                }
            });
        } else {
            res.error({
                error: 'User is not logged in'
            });
        }
    },
    filter: function (req, res) {
        let reqBody = req.body;
        let filterParams = {};
        let params = ['minDpf', 'maxDpf', 'status', 'plantcode'];
        Towitems.find().exec((error, items) => {
            if (error) {
                res.error({
                    error: 'Internal Error',
                    details: error
                });
            } else {
                res.ok(items);
            }
        });
    },
    create: function (req, res) {
        let itemToAdd = req.body;
        Towitems.create(itemToAdd).fetch().then((err, items) => {
            if (err) {
                res.error({
                    error: 'Internal Error',
                    details: err
                });
            } else {
                res.ok(items);
            }
        });
    },
    validateExcel: function (req, res) {
        req.file('file').upload((err, uploadFiles) => {
            if (err) {
                res.error({
                    error: "Missing file",
                    details: err
                });
            } else {
                var resObj = validateExcelSheet(uploadFiles, req);
                if (resObj.error) {
                    res.error(resObj);    
                } else {
                    res.ok(resObj);    
                }
            }
        });
    },
    importExcel: function (req, res) {
        req.file('file').upload((err, uploadFiles) => {
            if (err) {
                res.error({
                    error: "Missing file",
                    details: err
                });
            } else {
                var resObj = validateExcelSheet(uploadFiles, req);
                if (resObj.success && resObj.items.length > 0 ) {
                    Towitems.find({}).exec((fErr, preItems) => {
                        if (preItems) {
                            Towitems.destroy({}).exec((deleteErr) => {
                                if (!deleteErr) {
                                    Towitems.createEach(resObj.items).exec((createErr, items) => {
                                        if (!createErr) {
                                            res.status(200).json({
                                                data: 'Importing excel is completed',
                                                success: true,
                                                items: resObj.items,
                                                sheetName: resObj.dbSheet,
                                                towItemsCount: resObj.items.length
                                            });
                                        } else {
                                            Towitems.createEach(preItems).exec((e, i) => {
                                                res.error({
                                                    error: 'Internal error while creating the bulk insert',
                                                    details: createErr
                                                });
                                            });
                                        }
                                    });
                                } else {
                                    res.error({
                                        error: 'Internal error while clearing the DB',
                                        details: deleteErr
                                    });
                                }
                            });
                        }
                    });
                } else {
                    if (resObj.error) {
                        res.error(resObj);
                    } else {
                        res.ok(resObj);    
                    }
                }
            }
        });
    },
    exportToExcel: function (req, res) {
        let formatToExport = req.params.format;
        if (req.query.format) {
            formatToExport = req.query.format;
        }
        if (!formatToExport) {
            formatToExport = 'json';
        }
        Towitems.find().exec((error, items) => {
            if (error) {
                res.error({error});
            } else {
                let dataset = [];
                items.forEach(item => {
                    delete item['id'];
                    let lastModified = new Date(item['createdAt']);
                    if (!isNaN(lastModified.getDate())) {
                        let mnth = lastModified.getMonth() + 1;
                        let date = lastModified.getDate();
                        item['last modified'] = ((mnth < 10 ? '0' : '') + mnth) + '/' + ((date < 10 ? '0' : '') + date) + '/' + lastModified.getFullYear();
                    }
                    delete item['createdAt'];
                    delete item['updatedAt'];
                    dataset.push(item);
                });
                let allowedCols = ["itemlot", "plantcode", "lot", "item", "nompf", "lotadpf", "lotatd", "nomtd", "minwt", "minpd", "maxwt", "maxpd", "itmcirc", "stdlen", "stdpwth", "status"];
                if (dataset.length === 0) {
                    let emptyItem = {};
                    allowedCols.forEach(p => {
                        emptyItem[p] = '';
                    });
                    dataset.push(emptyItem);
                }
                if (formatToExport === 'json') {
                    return res.ok(dataset);
                } else if (formatToExport === 'xml') {
                    var xmlContent = '<tow-items>';
                    let allKeys = Object.keys(dataset[0]);
                    for (let i = 0; i < dataset.length; i++) {
                        var row = '';
                        for (let j = 0; j < allKeys.length; j++) {
                            let tagName = allKeys[j];
                            row = row + '<' + tagName + '>' + dataset[i][allKeys[j]] + '</' + tagName + '>';
                        }

                        xmlContent = xmlContent + '<tow-item>' + row + '</tow-item>';
                    }
                    xmlContent = xmlContent + '</tow-items>';
                    res.attachment('towitems.xml');
                    return res.send(xmlContent);
                } else if (formatToExport === 'csv') {
                    let allKeys = Object.keys(dataset[0]);
                    let csvContent = '';
                    allKeys.forEach(y => {
                        csvContent = csvContent + y + ', ';
                    });
                    csvContent = csvContent + '\r\n';
                    for (let i = 0; i < dataset.length; i++) {
                        var row = '';
                        for (let j = 0; j < allKeys.length; j++) {
                            row = row + '"' + dataset[i][allKeys[j]] + '",';
                        }

                        csvContent = csvContent + row + '\r\n';
                    }
                    res.attachment('towitems.csv');
                    return res.send(csvContent);
                } else {
                    const excel = require('node-excel-export');
                    let allKeys = Object.keys(dataset[0]);
                    let keySpecifications = {};
                    allKeys.forEach(k => {
                        keySpecifications[k] = {
                            displayName: k,
                            headerStyle: {
                                fill: {
                                    fgColor: {
                                        rgb: 'FF000000'
                                    }
                                },
                                font: {
                                    color: {
                                        rgb: 'FFFFFFFF'
                                    },
                                    sz: 14,
                                    bold: true,
                                    underline: false
                                }
                            },
                            width: 100
                        }
                    });
                    const report = excel.buildExport(
                        [
                            {
                                name: 'TowItems', // <- Specify sheet name (optional)
                                data: dataset, // <-- Report data
                                heading: [],
                                merges: [],
                                specification: keySpecifications,
                            }
                        ]
                    );
                    res.attachment('report.xlsx'); // This is sails.js specific (in general you need to set headers)
                    return res.send(report);
                }
            }
        });
    }
};

