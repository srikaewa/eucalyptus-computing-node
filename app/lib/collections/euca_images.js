EucaImages = new Mongo.Collection('euca_images');


if (Meteor.isServer) {
  EucaImages.allow({
    insert: function (userId, doc) {
      return true;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return true;
    },

    remove: function (userId, doc) {
      return true;
    }
  });

  /*EucaImages.deny({
    insert: function (userId, doc) {
      return true;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return true;
    },

    remove: function (userId, doc) {
      return true;
    }
  });*/

}

EucaImages.attachSchema(new SimpleSchema({
  filename: {
    type: String,
    label: "File Name",
    max: 100
  },
  uploaded: {
    type: Boolean,
    label: "File Upload Status",
  },
  diseasetype: {
    type: String,
    label: "Disease Type",
    allowedValues: ['Cerco', 'Cryptos', 'Cylindro', 'Xantho','x','Disease Free'],
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
  },
  latitude: {
    type: String,
    label: "Latitude",
    max: 100
  },
  longitude: {
    type: String,
    label: "Longitude",
    max: 100
  }  
}));
