/**
 * Created by diego on 10/3/16.
 */

Template.chaining.onCreated(function () {
    // this.finalConclusions = new ReactiveVar([]);
    this.propositionsByType = new ReactiveVar([]);
    this.onlyPredecessors = new ReactiveVar([]);
    this.rules = new ReactiveVar([]);
    var rules = Rules.find({}).fetch();
    this.rules.set(rules);

    console.log("rules", rules);



    var self = Template.instance();
    // Meteor.call('finalConclusions', function (error, data) {
    //     if(error){
    //         Materialize.toast("Error in final conclusions", 2000, "red");
    //     }
    //     else{
    //         // final.push("c");
    //         // console.log(data, "data");
    //         // Template.instance().finalConclusion.set(data);
    //         // var a = Template.instance().finalConclusion.get();
    //         // console.log(a);
    //         // final.push(data);
    //         console.log(data, "DATA");
    //         // final.push(data);
    //         // some = data;
    //         // var qq = data;
    //         // console.log(qq, "QQ");
    //         self.finalConclusions.set(data);
    //
    //     }
    
    
    // });

    // var self = this;
    // Meteor.call('finalConclusions', function (error, data) {
    //     if(error){
    //         Materialize.toast("Error in final conclusions", 2000, "red");
    //     }
    //     else{
    //         // final.push("c");
    //         // console.log(data, "data");
    //         self.finalConclusions.set(data);
    //         // final.push(data);
    //     }
    // }.bind(this));
    // console.log(self.finalConclusions.get());
    
    Meteor.call('prepositionClassification', function (error, data) {
            if(error){
                Materialize.toast("Error in final conclusions", 2000, "red");
            }
            else {
                // console.log(data, "DATA");


                // self.finalConclusions.set(data);
                self.propositionsByType.set(data);
                console.log("Predecessors: ", data.only_predecessors);
                self.onlyPredecessors.set(data.only_predecessors);

            }
    });
});


Template.chaining.helpers({
    value: function () {
        var value = new Set();
        value.add(1);
        value.add(2);
        value.add(1);
        // let array = Array.from(mySet);
        var array = Array.from(value);
        console.log(array);
        return array
    },
    finalConclusions: function () {
        var self = Template.instance();
        // return self.finalConclusions.get();
        return self.propositionsByType.get();
    },
    predecessorQuestions: function () {
        var self = Template.instance()
        return self.onlyPredecessors.get() ? self.onlyPredecessors.get(): null;
        // if(self.onlyPredecessors.get()){
        //     return
        // }
        // else
        //     return
    }
});


Template.chaining.events({
    'click .decision': function (event, template) {
        event.preventDefault();
        var predecessors = template.onlyPredecessors.get();
        var index = predecessors.indexOf(this);
        if(index > -1){
            predecessors.splice(index, 1);
        }
        template.onlyPredecessors.set(predecessors);
    },
    'click #optionTrue': function (event) {
        console.log("isTrue")
    },
    'click #optionFalse': function (event) {
        console.log("isFalse")
    },
    'click #questions': function (event, template) {
        console.log(template.onlyPredecessors.get());
    }
});