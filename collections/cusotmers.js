Customers = new Meteor.Collection('customers'); 

Meteor.methods({
    customersRemove: function(){
	     alert('Cusomters Removed!')
	     console.log("Customers Removed!")
     return Customers.remove({});
    }

});