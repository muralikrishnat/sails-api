/**
 * CardKCigaratteBrands.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: { type: 'string' },
    userId: { type: 'string' },
    kventtype: { type: 'string' },
    dualfiltername: { type: 'string' },
    ktippaper: { type: 'string' },
    ktipvent: { type: 'number', columnType: 'float' },
    kcolumnepd: { type: 'number', columnType: 'float' },
    ktippaperperm: { type: 'number', columnType: 'float' },
    kavlsmoke: { type: 'number', columnType: 'float' },
    kavltar: { type: 'number', columnType: 'float' },
    kavlnic: { type: 'number', columnType: 'float' },
    eug0vent: { type: 'number', columnType: 'float' },
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

