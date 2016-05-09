Customers = new Meteor.Collection('customers'); 

Meteor.methods({
    customersRemove: function(){
    	 Customers.remove({});
	     console.log("Customers Removed!");
     return alert('Cusomters Removed!');
    }

});