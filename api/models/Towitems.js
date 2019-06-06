/**
 * Towitems.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    itemlot: {
      type: 'string'
    },
    plantcode: {
      type: 'string'
    },
    lot: {
      type: 'string'
    },
    item: {
      type: 'string'
    },
    nompf: {
      type: 'number',
      columnType: 'float'
    },
    lotadpf: {
      type: 'number',
      columnType: 'float'
    },
    lotatd: {
      type: 'number',
      columnType: 'float'
    },
    nomtd: {
      type: 'number',
      columnType: 'float'
    },
    minwt: {
      type: 'number',
      columnType: 'float'
    },
    minpd: {
      type: 'number',
      columnType: 'float'
    },
    maxwt: {
      type: 'number',
      columnType: 'float'
    },
    maxpd: {
      type: 'number',
      columnType: 'float'
    },
    itmcirc: {
      type: 'number',
      columnType: 'float'
    },
    stdlen: {
      type: 'number',
      columnType: 'float'
    },
    status: {
      type: 'boolean'
    },
    stdpwth: {
      type: 'number',
      columnType: 'float'
    },



    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

