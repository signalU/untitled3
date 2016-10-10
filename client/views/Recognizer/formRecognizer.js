/**
 * Created by diego on 9/5/16.
 */


Template.formRecognizer.events({
    'submit #formRecognizer': function (event) {
        event.preventDefault();
        var sentence = {
            name: event.currentTarget.sentence.value,
        };
        // Sentences.insert(sentence);
        
        Meteor.call("callPython", event.currentTarget.sentence.value, function (error) {
            if(error){
                Materialize.toast(error.reason, 2000, "red");
            }
            else{
                Materialize.toast("Rules added correctly", 2000, "blue");
                $("#sentence").val("");
                $("#sentence").focus();
            }
        });
        
        // history.back();
        


    },
    'click #cancel': function (e) {
        e.preventDefault();
        history.back()
    },
    'click #addDefault': function (e) {
        e.preventDefault();
        Meteor.call("addDefaultRules");
    }
});
