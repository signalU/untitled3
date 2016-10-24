/**
 * Created by diego on 10/11/16.
 */

Template.listOrRules.helpers({
    rule: function () {
        // return Rules.find({});
        return OrRules.find({});
    }
    
});