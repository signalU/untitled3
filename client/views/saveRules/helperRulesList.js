/**
 * Created by diego on 8/29/16.
 */


Template.helperRulesList.helpers({
    name: function () {
        return SingleProposition.findOne({_id: Template.instance().data._idAntecesorProposition});
    }
})