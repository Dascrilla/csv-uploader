Prospects = new Meteor.Collection('prospects'); 

Meteor.methods({
    prospectsRemove: function(){
     return Prospects.remove({})
    }


});