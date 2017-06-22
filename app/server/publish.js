


Meteor.publish('euca_images', function () {
  return EucaImages.find();
});
