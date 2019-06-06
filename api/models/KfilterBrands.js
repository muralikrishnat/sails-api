/**
 * KfilterBrands.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    filterName : {
      type: 'string'
    },
    userId: {
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
    tipDiameter: {
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
    firmIntermed: {
      type: 'number',
      columnType: 'float'
    },
    isFirmIntermed: {
      type: 'number',
      columnType: 'float'
    },
    firmIntermedTime: {
      type: 'number',
      columnType: 'float'
    },
    reSmoke: {
      type: 'number',
      columnType: 'float'
    },
    reTar: {
      type: 'number',
      columnType: 'float'
    },
    reNicotine: {
      type: 'number',
      columnType: 'float'
    },
    tipsRod: {
      type: 'number',
      columnType: 'float'
    },
    newdpf: {
      type: 'number',
      columnType: 'float'
    },
    newtd: {
      type: 'number',
      columnType: 'float'
    },
    plugwrapThickness: {
      type: 'number',
      columnType: 'float'
    },
    tipWeight: {
      type: 'number',
      columnType: 'float'
    },
    reEugenol: {
      type: 'number',
      columnType: 'float'
    },
    tipPgwt: {
      type: 'number',
      columnType: 'float'
    },
    cload: {
      type: 'number',
      columnType: 'float'
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

};

