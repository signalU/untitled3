/**
 * Created by diego on 10/3/16.
 */

Template.chaining.onCreated(function () {
    // this.finalConclusions = new ReactiveVar([]);
    this.propositionsByType = new ReactiveVar([]);
    this.onlyPredecessors = new ReactiveVar([]);
    this.rules = new ReactiveVar([]);

    var self = Template.instance();
    Meteor.call("allRules", function (error, data) {
        if(error){
            Materialize.toast("Error", 2000, "red")
        }
        else{
            self.rules.set(data)
        }
    });
    // this.changedSection = function( val ) {
    //     this.idSelectedSection.set(val);
    //     var self = this;
    //     Meteor.setTimeout( function() {
    //
    //         //TODO: Parche para borrar el caret residual, remover cuando actualizen y lo fixeen en Meteor Materialize.
    //         self.$('select').parent().find(".caret").remove();
    //         // Fin del parche
    //
    //         self.$('select').material_select('destroy');
    //         self.$('select').material_select();
    //     }, 10);
    // }.bind(this);
    
    
    this.changeValuePropositions = function (obj, value) {
        var _id = obj._id;
        // var value;
        var rules = self.rules.get();
        var conclusions = [];
        for(var i = 0; i < rules.length; i++){
            for(var j = 0; j < rules[i].predecessor.length; j++){
                // console.log(rules[i].predecessor[j]._idAntecesorProposition);
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
                    }
                    else {
                        rules.splice(i, 1);
                    }
                    self.rules.set(rules);

                    if(rules[i].predecessor == null){
                        // conclusions.push([{"_id": rules[i].consequent}, rules[i].consequent.isFalse ? true: false]);
                        self.changeValuePropositions({"_id": rules[i].consequent}, rules[i].consequent.isFalse ? true: false);
                    }
                }
             
            }
            
        }
    }.bind(this);
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
    }
});