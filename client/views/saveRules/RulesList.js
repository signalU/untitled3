/**
 * Created by diego on 8/29/16.
 */


Template.rulesList.helpers({
    rule: function () {
        return Rules.find({});
    }

});




Template.mainProposition.helpers({
    name: function () {
        return SingleProposition.findOne({_id: Template.instance().data._idConsequent});
    }
})