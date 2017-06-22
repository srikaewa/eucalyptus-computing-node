Sfam = new Mongo.Collection('sfam');


if (Meteor.isServer) {
  Sfam.allow({
    insert: function (userId, doc) {
      return false;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return false;
    },

    remove: function (userId, doc) {
      return false;
    }
  });

/*  Sfam.deny({
    insert: function (userId, doc) {
      return true;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return true;
    },

    remove: function (userId, doc) {
      return true;
    }
  }); */

}

Sfam.attachSchema(new SimpleSchema({
  caption: {
    type: String,
    label: "SFAM caption",
    max: 100
  },
  currentdeploy: {
    type: String,
    label: "Disease Type",
    allowedValues: ['Cerco', 'Crypto', 'Cylindro', 'Xantho','None','X'],
  },
  submitter: {
    type: String,
    label: "Submitter",
    max: 100
  },
  submit: {
    type: String,
    label: "Submitted Date",
    max: 100
  },
  lastedit: {
    type: String,
    label: "Last Edit",
    max: 100
  }
}));
