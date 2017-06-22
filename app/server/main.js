import { CollectionAPI } from 'meteor/xcv58:collection-api';

// All values listed below are default
console.log('Initiating CollectionAPI...');
collectionApi = new CollectionAPI({
  authToken: undefined,              // Require this string to be passed in on each request
  apiPath: 'eddsapi',                // API path prefix
  standAlone: false,                 // Run as a stand-alone HTTP(S) server
  allowCORS: false,                  // Allow CORS (Cross-Origin Resource Sharing)
  sslEnabled: false,                 // Disable/Enable SSL (stand-alone only)
  listenPort: 3005,                  // Port to listen to (stand-alone only)
  listenHost: undefined,             // Host to bind to (stand-alone only)
  privateKeyFile: 'privatekey.pem',  // SSL private key file (only used if SSL is enabled)
  certificateFile: 'certificate.pem', // SSL certificate key file (only used if SSL is enabled)
  timeOut: 120000
});

var Future = Npm.require("fibers/future");
var exec = Npm.require("child_process").exec;

// Add the collection Players to the API "/players" path
collectionApi.addCollection(EucaImages, 'euca_images', {
  // All values listed below are default
  authToken: undefined,                   // Require this string to be passed in on each request.
  authenticate: undefined, // function(token, method, requestMetadata) {return true/false}; More details can found in [Authenticate Function](#Authenticate-Function).
  methods: ['POST','GET','PUT','DELETE'],  // Allow creating, reading, updating, and deleting
  before: {  // This methods, if defined, will be called before the POST/GET/PUT/DELETE actions are performed on the collection.
             // If the function returns false the action will be canceled, if you return true the action will take place.
    POST: function(obj, requestMetadata, returnObject) {
        // always set returnObject.success = true, if you want handle it by yourself!
        returnObject.success = true;
        console.log("Posting data at time " + new Date() + " ...");
        //console.log("Collection Id -> "+EucaImages);
        //requestMetadata.collectionId = 'id';
        //requestMetadata.query = obj;
        //console.log(requestMetadata);

        //console.log("hasId -> "+hasId);
        try{
          var id = EucaImages.insert(obj);
          console.log("Object inserted -> "+id);
          obj._id = id;
          //returnObject.success = true;
          returnObject.statusCode = 201;
          returnObject.body = {
            method: 'POST',
            obj: obj
          };
        }catch(e)
        {
          console.log("Error inserting object -> " + e);
          returnObject.statusCode = 500;
        }
          //console.log("Insert object error!!!");
          //returnObject.statuscode = 500;
          //returnObject.body = {
          //  error: e.toString()
        //}
        console.log("Post data successfully...");

        return true;
      },    // function(obj, requestMetadata, returnObject) {return true/false;},
    GET: function(objs, requestMetadata, returnObject) {
      console.log("Requesting data in length: " + Object.keys(objs).length);
      console.log("Requesting data at time " + new Date() + " ...");
      return true;
    },
    PUT: function(obj, newValues, requestMetadata, returnObject) {
      console.log("Updating data: " + obj._id);
      console.log("Updating data at time " + new Date() + " ...");
      return true;
    },
    DELETE: undefined   // function(obj, requestMetadata, returnObject) {return true/false;}
  },
  after: {  // This methods, if defined, will be called after the POST/GET/PUT/DELETE actions are performed on the collection.
            // Generally, you don't need this, unless you have global variable to reflect data inside collection.
            // The function doesn't need return value.
    POST: function(obj, requestMetadata, returnObject){
      console.log("File eucalyptus loaded, ready for processing...");
      //Meteor.call('lib/runClassify', function(imageId, err, response){
      //  console.log(response);
      //});

    },

    GET: function(obj, requestMetadata, returnObject){
      console.log("Reading data...done");
      //console.log(obj);
    },     // function() {console.log("After GET");},
    PUT: undefined,     // function() {console.log("After PUT");},
    DELETE: undefined   // function() {console.log("After DELETE");},
  }
});

// Starts the API server
collectionApi.start();
