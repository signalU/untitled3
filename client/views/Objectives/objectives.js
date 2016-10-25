/**
 * Created by diego on 10/24/16.
 */

Template.objectives.onCreated(function () {
    this.rules = new ReactiveVar([]);
    this.questions = new ReactiveVar([]);
    this.conclusions = new ReactiveVar([]);
    var rules = OrRules.find({}).fetch();
    this.rules.set(rules);

    var self = this;

    Meteor.call("orRules", function (error, data) {
        if(error){
            // console.log("ERROR")
            Materialize.toast(error.reason, 2000, "red")
        }
        else{
            self.rules.set(data)
        }
    });
    
    this.orderQuestions = function (_id) {
        Meteor.call("orderQuestions", _id, function (error, data) {
            if(error){
                // console.log("ERROR")
                Materialize.toast(error.reason, 2000, "red")
            }
            else{
                // self.rules.set(data)
                self.questions.set(data.questions);
                console.log(data);
            }
        });
        
    }.bind(this);
    
    
    this.changeValueOrPropositions = function (_id, value) {
        var rules = self.rules.get();
        for(var i = 0; i < rules.length; i++){
            // console.log(rules[i]);
            for(var j = 0; j < rules[i].orPrepositions.length; j++){
                // console.log(rules[i].orPrepositions[j]._idPreposition == _id);
                if(rules[i].orPrepositions[j]._idPreposition == _id){
                    var aValue;
                    if(value){
                        aValue = rules[i].orPrepositions[j].isFalse ? false: true;        //FROM TRUE
                    }
                    else {
                        aValue = rules[i].orPrepositions[j].isFalse ? true: false;        //FROM FALSE
                    }
                    if(aValue){
                        // console.log(value, "something")
                        rules.splice(i, 1);
                        i--;

                        self.rules.set(rules);
                        break;
                    }
                    else{
                        rules[i].orPrepositions.splice(j, 1);
                        self.rules.set(rules);
                    }
                }


                if(rules[i].orPrepositions.length == 1){

                    var _idConclusion = rules[i].orPrepositions[j]._idPreposition;

                    var conclusions = self.conclusions.get();
                    var conclusion = {"_id": _idConclusion, "isFalse": rules[i].orPrepositions[0].isFalse};

                    conclusions.push(conclusion);
                    self.conclusions.set(conclusions);

                    // var questions = self.questions.get();
                    // var index = questions.indexOf({"_id": _idConclusion});
                    // console.log({"_id": _idConclusion}, "THIS AUTO", index);
                    // console.log(questions);
                    // questions = questions.splice(index, 1);
                    // console.log(questions);
                    // self.questions.set(questions);

                    self.changeValueOrPropositions(_idConclusion, rules[i].orPrepositions[j].isFalse ? false: true);





                }
            }
        }
    }.bind(this);
});


Template.objectives.helpers({
   rules: function () {
       // return OrRules.find({});
       var self = Template.instance();
       return self.rules.get();
   },
    atoms: function () {
        return SingleProposition.find({});
    },
    questions: function () {
        var self = Template.instance();
        return self.questions.get();
    },
    conclusions: function () {
        var self = Template.instance();
        return self.conclusions.get();
    }

});

Template.objectives.events({
    'click #item': function (event, template) {
        console.log(this._id._str);
        template.orderQuestions(this._id._str)
    },
    'click #optionTrue': function (event, template) {
        var questions = template.questions.get();
        var index = questions.indexOf(this);
        questions.splice(index, 1);
        template.questions.set(questions);
        console.log(this, "THIS");
        template.changeValueOrPropositions(this._id, true);
    },
    'click #optionFalse': function (event, template) {
        var questions = template.questions.get();
        var index = questions.indexOf(this);
        questions.splice(index, 1);
        template.questions.set(questions);
        // console.log(index);
        template.changeValueOrPropositions(this._id, false);
    },
    'click #conclusions': function (event, template) {
        console.log(template.conclusions.get());
    }
});