Customers = new Meteor.Collection('customers'); 

Meteor.methods({
    customersRemove: function(){
     console.log("Customers Removed!")
     return Customers.remove({})
    }

});