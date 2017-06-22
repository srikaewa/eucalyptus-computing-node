/*****************************************************************************/
/* EditEucaImage: Event Handlers */
/*****************************************************************************/
Template.EditEucaImage.events({
});

/*****************************************************************************/
/* EditEucaImage: Helpers */
/*****************************************************************************/
Template.EditEucaImage.helpers({
  beforeRemove: function() {
    return function(collection, id){
      var doc = collection.findOne(id);
      if(confirm('Really delete eucalyptus images: "' + doc.filename + '"?'))
      {
        this.remove();
        Router.go('ListEucaImages');
      }
    };
  }
});

/*****************************************************************************/
/* EditEucaImage: Lifecycle Hooks */
/*****************************************************************************/
Template.EditEucaImage.onCreated(function () {
});

Template.EditEucaImage.onRendered(function () {
});

Template.EditEucaImage.onDestroyed(function () {
});
