/**
 * Created by diego on 8/29/16.
 */


Template.formProposition.helpers({
    propostions: function () {
        //return PaymentSchemas.find({},{sort:{name:1}})
        return SingleProposition.findOne({}, {sort:{_id: 1} });
    }
});

Template.formProposition.events({
    'submit #formProposition': function (e, template) {
        e.preventDefault();
        var proposition = {
            name: e.currentTarget.name.value,
            // status: true
        };
        SingleProposition.insert(proposition);
        history.back();
        
        
    },
    'click #cancel': function (e) {
        e.preventDefault();
        history.back()   
    }
});
