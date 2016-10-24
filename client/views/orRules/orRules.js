/**
 * Created by diego on 10/10/16.
 */


Template.orRules.onCreated(function () {
    // this.orRules = new ReactiveVar([]);
});

Template.orRules.helpers({
    orRules: function () {
        return OrRules.find({})
    },
    // orRulesReactive: function () {
    //     return Template.instance().orRules.get()
    // }
});

Template.orRules.events({
   'click #convert': function (event, template) {
       event.preventDefault();
       var rules = Rules.find({}).fetch();
       for(var i = 0; i < rules.length; i++) {
           var orRule = [];
           for (var j = 0; j < rules[i].predecessor.length; j++) {
               var isFalse = rules[i].predecessor[j].isFalse;
               isFalse = isFalse ? false: true;
               var item = {
                   "isFalse": isFalse,
                   "_idPreposition": rules[i].predecessor[j]._idAntecesorProposition
               };

               orRule.push(item);

           }
           var isFalse = rules[i].consequent.isFalse;
           isFalse = isFalse ? false: true;
           var item = {
               "isFalse": isFalse,
               "_idPreposition": rules[i].consequent._idConsequent
           };

           orRule.push(item);
           var obj = {
               "orPrepositions": orRule
           };

           Meteor.call("addOrRule", obj, function (error) {
               if(error){
                   Materialize.toast("Error", 2000, "red");
               }
               else{
                   Materialize.toast("Rule ", i, "added", 2000, "blue");
               }
           });

       }


   } ,
    'click #deleteAll': function (event) {
        event.preventDefault();
        Meteor.call("deleteOrRules", function (err) {
            if(err){
                Materialize.toast("error deleting or rules", 2000, "red")
            }
            else{
                Materialize.toast("All items deleted", 2000, "blue")
            }
        });
    }
});