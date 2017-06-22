/*****************************************************************************/
/*  Client and Server Methods */
/*****************************************************************************/

if(Meteor.isServer)
{
/*  Meteor.methods({
    'lib/process_exec_sync': function (command) {
      // server method logic
      // Load future from fibers
      var Future = Npm.require("fibers/future");
      // Load exec
      var child = Npm.require("child_process");
      // Create new future
      var future = new Future();
      // Run command synchronous
      child.exec(command, function(error, stdout, stderr) {
        // return an onbject to identify error and success
        var result = {};
        // test for error
        if (error) {
          result.error = error;
        }
        // return stdout
        result.stdout = stdout;
        future.return(result);
      });
      // wait for future
      return future.wait();
    }
  });
} */

var Future = Npm.require("fibers/future");
var exec = Npm.require("child_process").exec;

Meteor.methods({
  'lib/method_name': function () {

    if (this.isSimulation) {
    //   // do some client stuff while waiting for
    //   // result from server.
    //   return;
    }
    // server method logic
  },

  'userInfo': function() {
    console.log("User info : " + this.userId);
    return "UserInfoFromHere";
  },

  'runSysCmd': function () {
      // This method call won't return immediately, it will wait for the
      // asynchronous code to finish, so we call unblock to allow this client
      // to queue other method calls (see Meteor docs)
      this.unblock();
      console.log("Inside runSysCmd....");
      var future=new Future();
      var command="ls -al";
      exec(command,function(error,stdout,stderr){
        if(error){
          console.log(error);
          throw new Meteor.Error(500,command+" failed");
        }
        future.return(stdout.toString());
      });
      return future.wait();
    },

  'runClassify': function (imageId, filename) {
      // This method call won't return immediately, it will wait for the
      // asynchronous code to finish, so we call unblock to allow this client
      // to queue other method calls (see Meteor docs)
      console.log("Run classification process...");
      this.unblock();
      var future=new Future();
      var command="~/edds/run_classifyEuca.sh /usr/local/MATLAB/MATLAB_Runtime/v92/ ~/uploads/"+ filename + " " + imageId +" http://localhost:3000/eddsapi/euca_images/";
      exec(command,function(error,stdout,stderr){
        if(error){
          console.log(error);
          throw new Meteor.Error(500,command+" failed");
        }
        future.return(stdout.toString());
      });
      return future.wait();
    }

});



}
