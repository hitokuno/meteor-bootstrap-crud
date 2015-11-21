Items = new Meteor.Collection('items');

if (Meteor.isClient) {
  Session.set('sortby', "id");
  Session.set('sortorder', 1);
  var filter = {sort: {}};

  Template.items.rendered = function () {
    jQuery('#addItem').hide();
  };
  
  Template.items.items = function () {
    var filter = {sort: {}};
    filter.sort[Session.get('sortby')] = Session.get('sortorder');
    return Items.find({}, filter);
  };
  
  Template.editItem.events({
    'click #new': function (evt, tmpl) {
      clearForm(tmpl);
      jQuery('#insert').show();
      jQuery('#update').hide();
      jQuery('#addItem').show();
    },
    
    'click #insert': function (evt, tmpl) {
      Items.insert({
         id: tmpl.find('#id').value,
         name: tmpl.find('#name').value,
         desciprtion: tmpl.find('#desciprtion').value,
         latitude: tmpl.find('#latitude').value,
         longitude: tmpl.find('#longitude').value
       });
      jQuery('#addItem').hide();
    },
    
    'click #update': function (evt, tmpl) {
      Items.update(
        {　_id: tmpl.find('#objectId').value},
        {　$set: {
          id: tmpl.find('#id').value,
          name: tmpl.find('#name').value,
          desciprtion: tmpl.find('#desciprtion').value,
          latitude: tmpl.find('#latitude').value,
          longitude: tmpl.find('#longitude').value
        }　}
      );
      jQuery('#addItem').hide();
    },
    
    'click #cancel': function (evt, tmpl) {
      jQuery('#addItem').hide();
    }
  });
  
  function clearForm(tmpl) {
    tmpl.find('#objectId').value=null; 
    tmpl.find('#id').value=null; 
    tmpl.find('#name').value=null; 
    tmpl.find('#desciprtion').value=null; 
    tmpl.find('#latitude').value=null; 
    tmpl.find('#longitude').value=null; 
  }
  
  Template.items.events({
    'click .edit': function (evt, tmpl) {
      jQuery("#addItem").collapse("show");
      jQuery('#id').val(this.id); 
      jQuery('#name').val(this.name); 
      jQuery('#desciprtion').val(this.desciprtion); 
      jQuery('#latitude').val(this.latitude); 
      jQuery('#longitude').val(this.longitude); 
      jQuery('#objectId').val(this._id); 
      jQuery('#update').show();
      jQuery('#insert').hide();
      jQuery('#addItem').show();
    },
    
    'click .delete': function () {
      if (window.confirm('ID:' + this.id + ' を削除しますか?')) {
        Items.remove({_id: this._id});
      jQuery('#addItem').hide();
      }
    },
    
    'click .sorting': function (evt, tmpl) {
      var text=evt.target.textContent.toLocaleLowerCase();
      jQuery(".sorting").removeClass('sorting_asc');
      jQuery(".sorting").removeClass('sorting_desc');
      jQuery(evt.target).addClass('sorting_asc');
      Session.set('sortby', text);
      Session.set('sortorder', 1);
    },
    
    'click .sorting_asc': function (evt, tmpl) {
      var text=evt.target.textContent.toLocaleLowerCase();
      jQuery(evt.target).removeClass('sorting_asc');
      jQuery(evt.target).addClass('sorting_desc');
      Session.set('sortby', text);
      Session.set('sortorder', -1);
    },
    
    'click .sorting_desc': function (evt, tmpl) {
      var text=evt.target.textContent.toLocaleLowerCase();
      jQuery(evt.target).removeClass('sorting_desc');
      jQuery(evt.target).addClass('sorting_asc');
      Session.set('sortby', text);
      Session.set('sortorder', 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function() {
    if(Items.find().count() === 0) {
      // Itemsが0件だった場合、追加
    }
  });
}
