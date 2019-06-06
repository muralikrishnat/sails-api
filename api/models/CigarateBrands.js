/**
 * CigarateBrands.js
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
    filterName: {
      type: 'string'
    },
    filterId: {
      type: 'string'
    },
    tipUEpd: {
      type: 'number',
      columnType: 'float'
    },
    tipVent: {
      type: 'number',
      columnType: 'float'
    },
    tipPaper: {
      type: 'string'
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
    smk0Vent: {
      type: 'number',
      columnType: 'float'
    },
    tar0Vent: {
      type: 'number',
      columnType: 'float'
    },
    nic0Vent: {
      type: 'number',
      columnType: 'float'
    },
    co0Vent: {
      type: 'number',
      columnType: 'float'
    },
    smkTipVent: {
      type: 'number',
      columnType: 'float'
    },
    tarTipVent: {
      type: 'number',
      columnType: 'float'
    },
    nicTipVent: {
      type: 'number',
      columnType: 'float'
    },
    coTipVent: {
      type: 'number',
      columnType: 'float'
    },
    avlEug: {
      type: 'number',
      columnType: 'float'
    },
    tipVent2: {
      type: 'number',
      columnType: 'float'
    },
    pwporosity: {
      type: 'number',
      columnType: 'float'
    },
    ventType: {
      type: 'string'
    },
    calcVent: {
      type: 'number',
      columnType: 'float'
    },
    cigEpd: {
      type: 'number',
      columnType: 'float'
    },
    cigUEpd: {
      type: 'number',
      columnType: 'float'
    },
    columnEpd: {
      type: 'number',
      columnType: 'float'
    },
    isKretek: {
      type: 'boolean'
    },
    smoke: {
      type: 'number',
      columnType: 'float'
    },
    tar: {
      type: 'number',
      columnType: 'float'
    },
    nic: {
      type: 'number',
      columnType: 'float'
    },
    eug: {
      type: 'number',
      columnType: 'float'
    },
    ventLocation: {
      type: 'number',
      columnType: 'float'
    },
    isTipVent: {
      type: 'boolean'
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

