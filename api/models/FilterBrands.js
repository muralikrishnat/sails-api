/**
 * FilterBrands.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string'
    },
    towItem: {
      type: 'json'
    },
    tipLength: {
      type: 'number',
      columnType: 'float'
    },
    tipCircumference: {
      type: 'number',
      columnType: 'float'
    },
    tipEpd: {
      type: 'number',
      columnType: 'float'
    },
    pzLevel: {
      type: 'number',
      columnType: 'float'
    },
    firmCured: {
      type: 'number',
      columnType: 'float'
    },
    firmIsIntermed: {
      type: 'boolean'
    },
    firmIntermedTime: {
      type: 'string'
    },
    tipsRod: {
      type: 'number',
      columnType: 'float'
    },
    isNewTowitem: {
      type: 'boolean'
    },
    newDpf: {
      type: 'number',
      columnType: 'float'
    },
    newTd: {
      type: 'number',
      columnType: 'float'
    },
    isKretek: {
      type: 'boolean'
    },
    isPaperGlue: {
      type: 'boolean'
    },
    plugwrapThickness: {
      type: 'number',
      columnType: 'float'
    },
    tipPgWt:{
      type: 'number',
      columnType: 'float'
    },
    isCload: {
      type: 'boolean'
    },
    cload: {
      type: 'number',
      columnType: 'float'
    },
    tipUsRange: {
      type: 'number',
      columnType: 'float'
    },
    tipUscRange: {
      type: 'number',
      columnType: 'float'
    },
    eugenol: {
      type: 'number',
      columnType: 'float'
    },
    smoke: {
      type: 'number',
      columnType: 'float'
    },
    tar: {
      type: 'number',
      columnType: 'float'
    },
    nicotine: {
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
    },
   

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

