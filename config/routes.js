/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */
const { blueprints } = require('./blueprints');
var getRoute = function (path, method) {
  return (method + ' ') + path;
};

let routes = {
  [getRoute('/login', 'GET')]: {
    controller: 'auth',
    action: 'login'
  },
  [getRoute('/authorization-code/callback', 'POST')]: {
    controller: 'auth',
    action: 'authorizationCallBack'
  },
  [getRoute('/authorization-code/callback', 'GET')]: {
    controller: 'auth',
    action: 'getAuthorizationCallBack'
  },
  [getRoute('/users', 'GET')]: {
    controller: 'users',
    action: 'index'
  },
  [getRoute('/users', 'POST')]: {
    controller: 'users',
    action: 'create'
  },
  [getRoute('/towitems', 'GET')]: {
    controller: 'TowItems',
    action: 'index'
  },
  [getRoute('/my-towitems', 'GET')]: {
    controller: 'TowItems',
    action: 'towItemsByUser'
  },
  [getRoute('/company-towitems/:company', 'GET')]: {
    controller: 'TowItems',
    action: 'towItemsByCompany'
  },
  [getRoute('/towitems', 'POST')]: {
    controller: 'TowItems',
    action: 'create'
  },
  [getRoute('/towitems/filter', 'POST')]: {
    controller: 'TowItems',
    action: 'filter'
  },
  [getRoute('/companies', 'GET')]: {
    controller: 'admin',
    action: 'getCompanies'
  },
  [getRoute('/companies', 'POST')]: {
    controller: 'admin',
    action: 'addCompany'
  },
  [getRoute('/companies/:id', 'PATCH')]: {
    controller: 'admin',
    action: 'updateCompany'
  },
  [getRoute('/company-clone/:id', 'POST')]: {
    controller: 'admin',
    action: 'cloneCompany'
  },
  [getRoute('/companies/:id/clone-from/:fromId', 'PATCH')]: {
    controller: 'admin',
    action: 'updateCompanyWithClone'
  },
  [getRoute('/companies/:id', 'DELETE')]: {
    controller: 'admin',
    action: 'removeCompany'
  },
  [getRoute('/epdbias', 'GET')]: {
    controller: 'admin',
    action: 'getEPDBias'
  },
  [getRoute('/epdbias/:id', 'GET')]: {
    controller: 'admin',
    action: 'getEPDBiasById'
  },
  [getRoute('/epdbias/:id', 'DELETE')]: {
    controller: 'admin',
    action: 'deleteEPDBiasById'
  },

  [getRoute('/my-epdbias', 'GET')]: {
    controller: 'admin',
    action: 'getEPDBiasByUser'
  },
  [getRoute('/epdbias', 'POST')]: {
    controller: 'admin',
    action: 'addEPDBias'
  },
  [getRoute('/plugwrap', 'GET')]: {
    controller: 'admin',
    action: 'getPlugwrap'
  },
  [getRoute('/plugwrap/:id', 'GET')]: {
    controller: 'admin',
    action: 'getPlugwrapById'
  },
  [getRoute('/plugwrap', 'POST')]: {
    controller: 'admin',
    action: 'addPlugwrap'
  },
  [getRoute('/plugwrap/:id', 'PATCH')]: {
    controller: 'admin',
    action: 'updatePlugwrap'
  },
  [getRoute('/plugwrap/:id', 'DELETE')]: {
    controller: 'admin',
    action: 'deletePlugwrapById'
  },
  [getRoute('/my-preferences', 'GET')]: {
    controller: 'preferences',
    action: 'getByUserId'
  },
  [getRoute('/preferences', 'POST')]: {
    controller: 'preferences',
    action: 'create'
  },
  [getRoute('/save-preferences', 'POST')]: {
    controller: 'preferences',
    action: 'savePreferenceByUsername'
  },
  [getRoute('/preferences/:id', 'DELETE')]: {
    controller: 'preferences',
    action: 'deletePreference'
  },
  [getRoute('/get-preferences', 'GET')]: {
    controller: 'preferences',
    action: 'getPreferenceByUsername'
  },
  [getRoute('/towitems/import', 'POST')]: {
    controller: 'TowItems',
    action: 'importExcel'
  },
  [getRoute('/towitems/validateexcel', 'POST')]: {
    controller: 'TowItems',
    action: 'validateExcel'
  },
  [getRoute('/towitems/export', 'GET')]: {
    controller: 'TowItems',
    action: 'exportToExcel'
  },
  [getRoute('/plants', 'GET')]: {
    controller: 'Plants',
    action: 'index'
  },
  [getRoute('/plants', 'POST')]: {
    controller: 'Plants',
    action: 'create'
  },
  [getRoute('/plants/:id', 'PATCH')]: {
    controller: 'Plants',
    action: 'update'
  },
  [getRoute('/version', 'GET')]: {
    controller: 'auth',
    action: 'version'
  },
  [getRoute('/logs/:count', 'GET')]: {
    controller: 'admin',
    action: 'auditLogs'
  },
  [getRoute('/request-access', 'POST')]: {
    controller: 'auth',
    action: 'sendUserRequest'
  },
  [getRoute('/check-email', 'POST')]: {
    controller: 'auth',
    action: 'checkEmailRequest'
  },


  [getRoute('/filter-brands', 'GET')]: {
    controller: 'filter',
    action: 'getFilterBrandsByUser'
  },
  [getRoute('/filter-brands', 'POST')]: {
    controller: 'filter',
    action: 'addFilterBrandByUser'
  },
  [getRoute('/filter-brands/:id', 'PATCH')]: {
    controller: 'filter',
    action: 'updateFilterById'
  },
  [getRoute('/filter-brands/:id', 'DELETE')]: {
    controller: 'filter',
    action: 'removeFilterById'
  },
  [getRoute('/filter-brands/:name', 'GET')]: {
    controller: 'filter',
    action: 'getFilterBrandByName'
  },

  [getRoute('/carb-filter-brands', 'GET')]: {
    controller: 'filter',
    action: 'getCarbFilterBrandsByUser'
  },
  [getRoute('/carb-filter-brands', 'POST')]: {
    controller: 'filter',
    action: 'addCarbFilterBrandByUser'
  },
  [getRoute('/carb-filter-brands/:name', 'GET')]: {
    controller: 'filter',
    action: 'getCarbFilterBrandByName'
  },
  [getRoute('/carb-filter-brands/:id', 'PATCH')]: {
    controller: 'filter',
    action: 'updateCarbFilterById'
  },
  [getRoute('/carb-filter-brands/:id', 'DELETE')]: {
    controller: 'filter',
    action: 'removeCarbFilterById'
  },

  [getRoute('/cig-brands', 'GET')]: {
    controller: 'brands',
    action: 'getCigBrandsByUser'
  },
  [getRoute('/cig-brands', 'POST')]: {
    controller: 'brands',
    action: 'addCigBrandByUser'
  },
  [getRoute('/cig-brands/:name', 'GET')]: {
    controller: 'brands',
    action: 'getCigBrandByName'
  },
  [getRoute('/cig-brands/:id', 'PATCH')]: {
    controller: 'brands',
    action: 'updateCigBrandById'
  },
  [getRoute('/cig-brands/:id', 'DELETE')]: {
    controller: 'brands',
    action: 'removeCigaratteById'
  },

  [getRoute('/carb-cig-brands', 'GET')]: {
    controller: 'brands',
    action: 'getCarbCigBrandsByUser'
  },
  [getRoute('/carb-cig-brands', 'POST')]: {
    controller: 'brands',
    action: 'addCarbCigBrandByUser'
  },
  [getRoute('/carb-cig-brands/:name', 'GET')]: {
    controller: 'brands',
    action: 'getCarbCigBrandByName'
  },
  [getRoute('/carb-cig-brands/:id', 'PATCH')]: {
    controller: 'brands',
    action: 'updateCarbCigBrandById'
  },
  [getRoute('/carb-cig-brands/:id', 'DELETE')]: {
    controller: 'brands',
    action: 'removeCarbCigaratteById'
  },

  [getRoute('/share-filter', 'POST')]: {
    controller: 'addon',
    action: 'shareFilterBrand'
  },
  [getRoute('/share-entity', 'POST')]: {
    controller: 'addon',
    action: 'shareEntity'
  },
  [getRoute('/share-entity', 'GET')]: {
    controller: 'addon',
    action: 'getShares'
  },
  [getRoute('/share-entity/:id', 'DELETE')]: {
    controller: 'addon',
    action: 'deleteEntity'
  },
  [getRoute('/shared-withme/:id', 'DELETE')]: {
    controller: 'addon',
    action: 'deleteSharedWithMeById'
  },
  [getRoute('/registered-emails', 'GET')]: {
    controller: 'addon',
    action: 'getRegistaredEmailIds'
  },


  [getRoute('/profiles', 'GET')]: {
    controller: 'profiles',
    action: 'index'
  },
  [getRoute('/profiles', 'POST')]: {
    controller: 'profiles',
    action: 'updatedProfile'
  },
  [getRoute('/profiles/:id', 'PATCH')]: {
    controller: 'profiles',
    action: 'updateProfileById'
  },
  [getRoute('/profiles/:id', 'DELETE')]: {
    controller: 'profiles',
    action: 'deleteProfile'
  },


  [getRoute('/firmunits', 'GET')]: {
    controller: 'addon',
    action: 'getFirmUnits'
  },
  [getRoute('/firmunits', 'POST')]: {
    controller: 'addon',
    action: 'createFirmUnit'
  },
  [getRoute('/firmunits/:id', 'PATCH')]: {
    controller: 'addon',
    action: 'updateFirmUnit'
  },
  [getRoute('/firmunits/:id', 'DELETE')]: {
    controller: 'addon',
    action: 'removeFirmUnitById'
  },

  [getRoute('/calculations', 'GET')]: {
    controller: 'admin',
    action: 'getCalculationsByUser'
  },
  [getRoute('/calculations/:id', 'GET')]: {
    controller: 'admin',
    action: 'getCalculationsById'
  },
  [getRoute('/calculations/:id', 'DELETE')]: {
    controller: 'admin',
    action: 'deleteCalculationsById'
  },
  [getRoute('/all-calculations', 'GET')]: {
    controller: 'admin',
    action: 'getAllCalculations'
  },
  [getRoute('/calculations', 'POST')]: {
    controller: 'admin',
    action: 'saveCalculations'
  },
  [getRoute('/set-calculation/:id/:state', 'POST')]: {
    controller: 'admin',
    action: 'setCalcActiveOrTest'
  },
  [getRoute('/get-calculation/:state', 'GET')]: {
    controller: 'admin',
    action: 'getCalcActiveOrTest'
  },
  [getRoute('/calculation-by-version/:version', 'GET')]: {
    controller: 'admin',
    action: 'getCalculationsByVersion'
  },
  [getRoute('/calculation-verisons', 'GET')]: {
    controller: 'admin',
    action: 'getCalcVersions'
  },
};

var prefixRoute = function (route) {
  let routePath = route.split(' ');
  routePath[1] = blueprints.prefix + routePath[1];
  return routePath.join(' ');
};
Object.keys(routes).forEach(r => {
  routes[prefixRoute(r)] = routes[r];
});

routes['/'] = {
  controller: 'auth',
  action: 'apiRoot'
};
// routes['GET /authorization-code/callback'] = {
//   view: 'pages/authcallback',
//   locals: {
//     user: {},
//     message: "Authorization Callback"
//   }
// };

module.exports.routes = routes;
