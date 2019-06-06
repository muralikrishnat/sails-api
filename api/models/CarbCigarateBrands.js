/**
 * CarbCigarateBrands.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string'
    },
    userId: {
      type: 'string'
    },
    ventType: {
      type: 'string'
    },
    dualFilterName: {
      type: 'string'
    },
    dualFilterId: {
      type: 'string',
      allowNull: true 
    },
    tipPaper: {
      type: 'string'
    },
    tipVent: {
      type: 'number',
      columnType: 'float'
    },
    columnEpd: {
      type: 'number',
      columnType: 'float'
    },
    tipPaperPerm: {
      type: 'number',
      columnType: 'float'
    },
    avlSmoke: {
      type: 'number',
      columnType: 'float'
    },
    avlTar: {
      type: 'number',
      columnType: 'float'
    },
    avlNic: {
      type: 'number',
      columnType: 'float'
    },
    avlEug: {
      type: 'number',
      columnType: 'float'
    },
    co0Vent: {
      type: 'number',
      columnType: 'float'
    },
    eug0Vent: {
      type: 'number',
      columnType: 'float'
    },
    ventLocation: {
      type: 'number',
      columnType: 'float'
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

