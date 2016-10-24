/**
 * Created by diego on 10/3/16.
 */

Template.chaining.onCreated(function () {
    // this.finalConclusions = new ReactiveVar([]);
    this.propositionsByType = new ReactiveVar([]);
    this.onlyPredecessors = new ReactiveVar([]);
    this.rules = new ReactiveVar([]);
    this.conclusions = new ReactiveVar([]);

    var self = Template.instance();
    Meteor.call("allRules", function (error, data) {
        if(error){
            Materialize.toast("Error", 2000, "red")
        }
        else{
            self.rules.set(data)
        }
    });
 
    
    
    this.changeValuePropositions = function (obj, value) {
        var _id = obj._id;
        // var value;
        var rules = self.rules.get();
        var conclusions = [];
        for(var i = 0; i < rules.length; i++){
            // console.log(rules[i].consequent._idConsequent);
            var aName = SingleProposition.findOne({"_id": new Mongo.ObjectID(rules[i].consequent._idConsequent)}).name;
            console.log(rules.length, "LENGTH", i, aName);
            for(var j = 0; j < rules[i].predecessor.length; j++){
                // console.log(rules[i].predecessor[j]._idAntecesorProposition);
                var tem=true;
                if(rules[i].predecessor[j]._idAntecesorProposition == _id){
                    // rules[i].predecessor[j].value = true;
                    // template.rules.set(rules);
                    // if(rules[i].predecessor[j].isFalse){
                    //
                    // }
                    console.log(i, j);
                    if(value){
                        value = rules[i].predecessor[j].isFalse ? false: true;        //FROM TRUE
                    }
                    else {
                        value = rules[i].predecessor[j].isFalse ? true: false;        //FROM FALSE
                    }
                    if(value){
                        rules[i].predecessor.splice(j, 1);
                        self.rules.set(rules);
                    }
                    else {
                        // if(rules[i]._idConsequent)
                        // if(rules[i].consequent._idConsequent)


                        var data = self.propositionsByType.get();
                        // console.log(data.intermediate, "INTERMEDIATE");
                        var isIntermediate = false;
                        for(var k = 0; k < data.intermediate.length; k++){
                            // console.log(data.intermediate[i]._id, rules)
                            if(data.intermediate[k]._id == rules[i].consequent._idConsequent){
                                isIntermediate = true;
                                var aName = SingleProposition.findOne({"_id": new Mongo.ObjectID(rules[i].consequent._idConsequent)}).name;
                                console.log("It's intermediate ", isIntermediate, data.intermediate[k]._id, aName);

                            }
                        }

                        if(isIntermediate){
                            var temp = self.onlyPredecessors.get();
                            var newItem = {
                                "_id": rules[i].consequent._idConsequent
                            };
                            temp.push(newItem);
                        }



                        rules.splice(i, 1);
                        i--;

                        self.rules.set(rules);




                        break;
                    }
                    // self.rules.set(rules);
                }
                // var rules = self.rules.get();
                // if(rules[i] == null){
                //     continue;
                // }


                if(rules[i].predecessor.length == 0){
                    // conclusions.push([{"_id": rules[i].consequent}, rules[i].consequent.isFalse ? true: false]);
                    self.changeValuePropositions({"_id": rules[i].consequent._idConsequent}, rules[i].consequent.isFalse ? false: true);
                    
                    // var conclusions = self.conclusions.get();
                    // var aName = SingleProposition.findOne({"_id": new Mongo.ObjectID(rules[i].consequent._idConsequent)}).name;
                    // var obj = {
                    //     // "_id": aName
                    //     "_id": rules[i].consequent._idConsequent,
                    //     "isFalse": rules[i].consequent.isFalse
                    // };
                    // conclusions.push(obj);
                    // self.conclusions.set(conclusions);

                    var conclusions = self.conclusions.get();
                    // console.log("RULE IDDD: ", rules[i]._id.valueOf());
                    var rule = Rules.findOne({"_id": rules[i]._id});
                    conclusions.push(rule);
                    self.conclusions.set(conclusions);



                }
            }

            // console.log("??????????");
            // console.log(rules);
            // rules.splice(i, 1);
            // console.log(rules);
            
        }
    }.bind(this);
    
    Meteor.call('prepositionClassification', function (error, data) {
            if(error){
                Materialize.toast("Error in final conclusions", 2000, "red");
            }
            else {
                // console.log(data, "DATA");


                // self.finalConclusions.set(data);
                self.propositionsByType.set(data);
                // console.log("DATA: ", data);
                console.log("Predecessors: ", data.only_predecessors);
                self.onlyPredecessors.set(data.only_predecessors);

            }
    });
});


Template.chaining.helpers({
    // value: function () {
    //     var value = new Set();
    //     value.add(1);
    //     value.add(2);
    //     value.add(1);
    //     // let array = Array.from(mySet);
    //     var array = Array.from(value);
    //     console.log(array);
    //     return array
    // },
    finalConclusions: function () {
        var self = Template.instance();
        // return self.finalConclusions.get();
        return self.propositionsByType.get();
    },
    predecessorQuestions: function () {
        var self = Template.instance();
        return self.onlyPredecessors.get() ? self.onlyPredecessors.get(): null;
        // if(self.onlyPredecessors.get()){
        //     return
        // }
        // else
        //     return
    },
    rule: function () {
        var self = Template.instance();
        return self.rules.get();
    },
    namePre: function (_id) {
        // console.log("PREE", _id);
        return _id ? SingleProposition.findOne({"_id": new Mongo.ObjectID(_id)}).name: null
    },
    Allconclusions: function () {
        // var self = Template.instance();
        // // return self.conclusions.get() ? self.conclusions.get(): null
        // return self.conclusions.get()
        var self = Template.instance();
        return self.conclusions.get() ? self.conclusions.get(): null;
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
    'click #optionTrue': function (event, template) {
        console.log("isTrue")
        // var value = true;
        // var _id = this._id;
        // var rules = template.rules.get();
        // for(var i = 0; i < rules.length; i++){
        //     for(var j = 0; j < rules[i].predecessor.length; j++){
        //         // console.log(rules[i].predecessor[j]._idAntecesorProposition);
        //         if(rules[i].predecessor[j]._idAntecesorProposition == _id){
        //             // rules[i].predecessor[j].value = true;
        //             // template.rules.set(rules);
        //             // if(rules[i].predecessor[j].isFalse){
        //             //
        //             // }
        //             value = rules[i].predecessor[j].isFalse ? false: true;        //FROM TRUE
        //             if(value){
        //                 rules[i].predecessor.splice(j, 1);
        //             }
        //             else {
        //                 rules.splice(i, 1);
        //             }
        //             template.rules.set(rules);
        //         }
        //     }
        // }
        template.changeValuePropositions(this, true);
  
    },
    'click #optionFalse': function (event, template) {
        console.log("isFalse")
        template.changeValuePropositions(this, false);
    },
    'click #questions': function (event, template) {
        console.log(template.onlyPredecessors.get());
    },
    'click #conclusions': function (event, template) {
        console.log(template.conclusions.get());
    }
});