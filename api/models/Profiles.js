/**
 * Profiles.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    userId: {
      type: 'string'
    }, 
    name: {
      type: 'string'
    },
    rodlen: {
      type: 'number',
      columnType: 'float'
    },
    circ: {
      type: 'number',
      columnType: 'float'
    },
    diam: {
      type: 'number',
      columnType: 'float'
    }, 
    triacetin: {
      type: 'number',
      columnType: 'float'
    }, 
    rangelen: {
      type: 'number',
      columnType: 'float'
    }, 
    minpir: {
      type: 'number',
      columnType: 'float'
    }, 
    maxpir: {
      type: 'number',
      columnType: 'float'
    }, 
    plugwrap: {
      type: 'number',
      columnType: 'float'
    },
    pr_1: {
      type: 'number',
      columnType: 'float'
    },
    pr_2: {
      type: 'number',
      columnType: 'float'
    },
    pr_3: {
      type: 'number',
      columnType: 'float'
    },
    pr_4: {
      type: 'number',
      columnType: 'float'
    },
    pr_5: {
      type: 'number',
      columnType: 'float'
    },
    pr_6: {
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

