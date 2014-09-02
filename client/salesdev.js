Template.main.prospects = function(){
  Prospects.find(); 
}

Template.main.helpers({
  prospect: function(){
    return Prospects.find();
    } 
}); 

Template.upload.events({
  "change #files": function (e) {
    var files = e.target.files || e.dataTransfer.files;
    for (var i = 0, file; file = files[i]; i++) {
      if (file.type.indexOf("text") == 0) {
        var reader = new FileReader();
        reader.onloadend = function (e) {
          var text = e.target.result;
          console.log(text)
          var all = $.csv.toObjects(text);
          console.log(all)
          _.each(all, function (entry) {
            Prospects.insert(entry);
          });
        }
        reader.readAsText(file);
      }
    }
  }
})