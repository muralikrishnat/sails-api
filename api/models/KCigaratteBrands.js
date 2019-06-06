/**
 * KCigaratteBrands.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name :{
      type: 'string'
    },
    userId: {
      type: 'string'
    },
    kfiltername : {
      type: 'string'
    },
    ktipuepd: {
      type: 'number',
      columnType: 'float'
    },
    ktipvent: {
      type: 'number',
      columnType: 'float'
    },
    ktippaper: {
      type: 'number',
      columnType: 'float'
    },
    ktippaperperm: {
      type: 'number',
      columnType: 'float'
    },
    kavlsmoke: {
      type: 'number',
      columnType: 'float'
    },
    kavltar: {
      type: 'number',
      columnType: 'float'
    },
    kavlnic: {
      type: 'number',
      columnType: 'float'
    },
    smk_0vent: {
      type: 'number',
      columnType: 'float'
    },
    tar_0vent: {
      type: 'number',
      columnType: 'float'
    },
    nic_0vent: {
      type: 'number',
      columnType: 'float'
    },
    eug_0vent: {
      type: 'number',
      columnType: 'float'
    },
    smk_tipvent: {
      type: 'number',
      columnType: 'float'
    },
    tar_tipvent: {
      type: 'number',
      columnType: 'float'
    },
    nic_tipvent: {
      type: 'number',
      columnType: 'float'
    },
    eug_tipvent: {
      type: 'number',
      columnType: 'float'
    },
    ktipvent2: {
      type: 'number',
      columnType: 'float'
    },
    kpwporosity: {
      type: 'number',
      columnType: 'float'
    },
    kventtype: {
      type: 'string'
    },
    kcalcvent: {
      type: 'string'
    },
    kcigepd: {
      type: 'number',
      columnType: 'float'
    },
    kciguepd: {
      type: 'number',
      columnType: 'float'
    },
    avleug: {
      type: 'number',
      columnType: 'float'
    },
    kcolumnepd: {
      type: 'number',
      columnType: 'float'
    },
    kresmoke: {
      type: 'number',
      columnType: 'float'
    },
    kretar: {
      type: 'number',
      columnType: 'float'
    },
    krenic: {
      type: 'number',
      columnType: 'float'
    },
    kreeug: {
      type: 'number',
      columnType: 'float'
    },
    dualfiltername: {
      type: 'string'
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

};

