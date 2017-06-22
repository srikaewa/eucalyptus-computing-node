/*****************************************************************************/
/* ListEucaImages: Event Handlers */
/*****************************************************************************/
Template.ListEucaImages.events({
});

/*****************************************************************************/
/* ListEucaImages: Helpers */
/*****************************************************************************/
Template.ListEucaImages.helpers({
});

/*****************************************************************************/
/* ListEucaImages: Lifecycle Hooks */
/*****************************************************************************/
Template.ListEucaImages.onCreated(function () {
});

Template.ListEucaImages.onRendered(function () {
});

Template.ListEucaImages.onDestroyed(function () {
});


Template.ListEucaImages.helpers({
  euca_images: function() {
    return EucaImages.find();
  }
});
