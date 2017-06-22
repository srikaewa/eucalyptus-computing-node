Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});

Router.route('/', {
  name: 'home',
  controller: 'HomeController',
  where: 'client'
});

Router.route("/euca_images/create", {
    name: 'CreateEucaImage',
    controller: 'EucaImagesController',
    action: 'create',
    where: 'client'
});

Router.route('/euca_images', {
  name: 'ListEucaImages',
  controller: 'EucaImagesController',
  action: 'list',
  where: 'client'
});

Router.route("/euca_images/:_id", {
  name: 'EditEucaImage',
  controller: 'EucaImagesController',
  action: 'edit',
  where: 'client'
});

Router.route('/admin',function() {
  this.render('adminTemplate');
});

Router.route( "runclassify/:imageId", function() {
  var imageId   = this.params.imageId,
      query  = this.request.query,
      fields = {};

  fields[ query.field ] = query.field;

  console.log("Prepare image " + imageId + " for processing...");

  var getImage = EucaImages.findOne({"_id": imageId});

  if ( getImage ) {
    console.log("Start processing image -> " + getImage._id)
    this.response.statusCode = 200;
    this.response.end( getImage._id );
    Meteor.call('runClassify',getImage._id, getImage.filename, function(err, response){
    //Meteor.call('runSysCmd', function(err, response){
      console.log("runClassify response -> "+response);
      this.response.end(response);
    });
  } else {
    this.response.statusCode = 404;
    this.response.end( { status: "404", message: "Image not found." } );
  }
}, { where: "server" });

Router.route( "getDiseaseType/:imageId", function() {
  var imageId   = this.params.imageId,
      query  = this.request.query,
      fields = {};

  fields[ query.field ] = query.field;

  //console.log("Prepare image " + imageId + " for processing...");

  var getImage = EucaImages.findOne({"_id": imageId});

  if ( getImage ) {
    this.response.statusCode = 200;
    this.response.end( getImage.diseasetype );
  } else {
    this.response.statusCode = 404;
    this.response.end( { status: "404", message: "Image not found." } );
  }
}, { where: "server" });

Router.route( "/checkANNServer", function() {
    this.response.statusCode = 200;
    this.response.end("200");
}, { where: "server" });


/*Router.route('/api/euca_images',{where: 'server'})
  .get(function(){
    var em = this.params.query;
    //console.log("Email param -> "+ em.e);
    //console.log("Password param -> "+ em.p);
    if(ApiPassword.validate({email: em.e, password: em.p}))
    {
        console.log('Password is valid for this user');
        var response = EucaImages.find().fetch();
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
    }
    else {
        console.log('Password is not valid');
        var response = {
          error: 403,
          message: "Forbidden. Authentication failed..."
        };
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
    }
  }); */
