/**
 * Preferences.js
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
    size: {
      type: 'number'
    },
    epd: {
      type: 'number'
    },
    weight: {
      type: 'number'
    },
    pz: {
      type: 'number'
    },
    rodMaker: {
      type: 'number'
    },
    transportJet: {
      type: 'number'
    },
    firmnessMethod: {
      type: 'string'
    },
    epdBias: {
      type: 'string'
    },
    epdBiasData: {
      type: 'json'
    },
    towType: {
      type: 'number'
    },
    kretek: {
      type: 'boolean'
    },

    rangeLength :{
      type: 'number'
    },
    pointInRange: {
      type: 'number'
    },
    sfactor: {
      type: 'string'
    },
    maxpdlim: {
      type: 'string'
    },
    pivmaxlim: {
      type: 'string'
    },
    lowpdlim: {
      type: 'string'
    },
    nmaxpdlim: {
      type: 'number'
    },
    carbRangeLength: {
      type: 'number'
    },
    name: {
      type: 'string'
    }

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

