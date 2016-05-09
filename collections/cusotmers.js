Customers = new Meteor.Collection('customers'); 

Meteor.methods({
    customersRemove: function(){
    	 Customers.remove({})
     return console.log("Customers Removed!") 
    }

});