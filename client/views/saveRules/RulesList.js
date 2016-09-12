/**
 * Created by diego on 8/29/16.
 */


Template.rulesList.helpers({
    rule: function () {
        return Rules.find({});
    }

});

Template.rulesList.events({
    'click #aMethod': function (e) {
        e.preventDefault();
        Meteor.call('aMethod', );
        Meteor.call('callPython', "first Second");
    }
});




Template.mainProposition.helpers({
    name: function () {
        return SingleProposition.findOne({_id: Template.instance().data._idConsequent});
    }
});