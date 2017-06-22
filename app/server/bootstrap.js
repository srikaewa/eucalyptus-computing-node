

Meteor.startup(function () {
  console.log("################# System Initiating ##################");
  // bootstrap the admin user if they exist -- You'll be replacing the id later
  if (Meteor.users.findOne("ejD59vKQY3WWpuMHi")){
    Roles.addUsersToRoles("ejD59vKQY3WWpuMHi", ['admin']);
  }
  // create a couple of roles if they don't already exist (THESE ARE NOT NEEDED -- just for the demo)
  if(!Meteor.roles.findOne({name: "member"})){
    Roles.createRole("member");
  }

  if(!Meteor.roles.findOne({name: "poweruser"})) {
    Roles.createRole("poweruser");
  }
  console.log("User roles....done");



});
