/**
 * CarbFilterBrands.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    dualFilterName: {
      type: 'string'
    },
    filterAName: {
      type: 'json'
    },
    filterAId: {
      type: 'json'
    },
    filterBName: {
      type: 'json'
    },
    filterBId: {
      type: 'json'
    },
    comPlugThick: {
      type: 'number',
      columnType: 'float'
    },
    tipsRod: {
      type: 'number',
      columnType: 'float'
    },
    userId: {
      type: 'string'
    },
    brandType: {
      type: 'string'
    },
    isShared: {
      type: 'boolean'
    },
    sharedBy: {
      type: 'json'
    }
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },
  customToJSON: function () {
    return _.omit(this, ['userId'])
  },
};

