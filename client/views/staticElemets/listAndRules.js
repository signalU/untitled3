/**
 * Created by diego on 10/11/16.
 */


Template.listAndRules.helpers({
    rule: function () {
       return Rules.find({});
    }
});