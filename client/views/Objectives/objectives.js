/**
 * Created by diego on 10/24/16.
 */

Template.objectives.onCreated(function () {
    this.rules = new ReactiveVar([]);
    this.questions = new ReactiveVar([]);
    this.conclusions = new ReactiveVar([]);
    this.inconclusions = new ReactiveVar([]);
    this.finalSelected = new ReactiveVar([]);

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


    this.deleteValues = function () {
        self.rules.set([]);
        self.questions.set([]);
    }.bind(this);

    this.uniqueQuestions = function (array1, array2) {
        var result = [];
        // result = array1.filter(function(n) {
        //     //alert(array2.indexOf(n) != -1)
        //     return array2.indexOf(n) != -1;
        // });
        for( var i = 0; i < array1.length; i++){
            for( var j = 0; j < array2.length; j++){
                if(array1[i]._id == array2[j]._id){
                    // if(result){
                    //     for(var k = 0; k < result.length; k++){
                    //         if()
                    //     }
                    // }

                    result.push(array1[i]);
                }
            }
        }

        var result = _.uniq(result);

        self.questions.set(result);
        // return result;
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


                        var final = self.finalSelected.get();
                        Materialize.toast(final._id, 8000, "red");
                        // Materialize.toast("One rule deleted", 8000, "red");
                        // console.log(final._id, "FINAAAAAAAAALL");

                        var questions = self.questions.get();
                        var prepositions = [];


                        var count = 0;
                        var temp = false;


                        // for (var k = 0; k < rules.length; k++) {
                        //     for(var l = 0; l < rules[k].orPrepositions.length; l++){
                        //         if (rules[k].orPrepositions[l]._idPreposition === final._id) {
                        //             count++;
                        //         }
                        //         prepositions.push(rules[k].orPrepositions[l]._idPreposition);
                        //     }
                        // }
                        //
                        // if(count == 0){
                        //     Materialize.toast("Indeterminado", 4000, "blue");
                        //     self.deleteValues();
                        //     break
                        // }

                        // console.log("propositions", prepositions);
                        
                        /*
                        var a = [], diff =[];

                        for(var k = 0; k < prepositions.length; k++){
                            questions[]
                        }
                        */

                        for (var m = 0; m < rules[i].length; m++){
                            if(rules[i].orPrepositions[m] == final._id){
                                temp = true;
                            }
                        }
                        console.log(count, "TIMES");


                        console.log(rules[i].orPrepositions[j]._idPreposition, final._id );
                        // if(rules[i].orPrepositions[j]._idPreposition == final._id && count == 1){
                        if(count == 1 && temp){
                            Materialize.toast("Indeterminado", 4000, "blue");
                            console.log(rules[i], "WHAT ?")
                            self.rules.set([]);
                            self.questions.set([]);
                            self.inconclusions.set(final);
                            console.log(self.inconclusions.get(), "INCONCLUSION");

                        }



                        rules.splice(i, 1);
                        i--;

                        self.rules.set(rules);
                        break;
                    }
                    else{
                        Materialize.toast("a rule deleted", 4000, "red");
                        rules[i].orPrepositions.splice(j, 1);
                        self.rules.set(rules);


                        /////////////////check if is indeterminants
                        var count = 0;
                        var prepositions = [];
                        for (var k = 0; k < rules.length; k++) {
                            for(var l = 0; l < rules[k].orPrepositions.length; l++){
                                if (rules[k].orPrepositions[l]._idPreposition === final._id) {
                                    count++;
                                }
                                prepositions.push(rules[k].orPrepositions[l]._idPreposition);
                            }
                        }



                        if(count == 0){
                            Materialize.toast("Indeterminado", 4000, "blue");
                            self.deleteValues();
                            break
                        }



                    }
                }





                if(rules[i].orPrepositions.length == 1){

                    //console.log(rules[i], "aaaaaaaaaaaaaaa");
                    var _idConclusion = rules[i].orPrepositions[0]._idPreposition;


                    var conclusions = self.conclusions.get();
                    var conclusion = {"_id": _idConclusion, "isFalse": rules[i].orPrepositions[0].isFalse};

                    conclusions.push(conclusion);
                    self.conclusions.set(conclusions);
                    var final = self.finalSelected.get();

                    if(_idConclusion == final._id){
                        Materialize.toast("Conclusion terminada", 4000, "blue");
                        console.log("DELETING !!!!");
                        self.deleteValues();
                        // return
                        break
                    }

                    // var questions = self.questions.get();
                    // var index = questions.indexOf({"_id": _idConclusion});
                    // console.log({"_id": _idConclusion}, "THIS AUTO", index);
                    // console.log(questions);
                    // questions = questions.splice(index, 1);
                    // console.log(questions);
                    // self.questions.set(questions);




                    // var newArryQuestions = [];
                    // self.uniqueQuestions(prepositions, questions);

                    // self.questions.set(newArryQuestions);


                    self.changeValueOrPropositions(_idConclusion, rules[i].orPrepositions[0].isFalse ? false: true);





                }
            }
        }


        /////////////////////////////////////////////////////////////////////////
        var rules = self.rules.get();
        var final = self.finalSelected.get();
        var questions = self.questions.get();

        /////////////////check if is indeterminants
        var count = 0;
        var ArrayObjprepositions = [];
        for (var k = 0; k < rules.length; k++) {
            for(var l = 0; l < rules[k].orPrepositions.length; l++){
                if (rules[k].orPrepositions[l]._idPreposition === final._id) {
                    count++;
                }
                ArrayObjprepositions.push({"_id": rules[k].orPrepositions[l]._idPreposition});
            }
        }

        self.uniqueQuestions(ArrayObjprepositions, questions);


        // console.log("PREOPOSTIONS", ArrayObjprepositions, questions);

        if(count == 0){
            Materialize.toast("Indeterminado", 4000, "blue");
            self.deleteValues();
        }
////////////////////////////////////////////////////////////////////

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
    oneQuestion: function () {
        var self = Template.instance();
        var oneQuestion = self.questions.get();
        return oneQuestion[0];
    },
    conclusions: function () {
        var self = Template.instance();
        return self.conclusions.get();
    },
    inconclusions: function () {
        var self = Template.instance();
        return self.inconclusions.get();
    },
    finalSelected: function () {
        var self = Template.instance();
        return self.finalSelected.get();
    },

});

Template.objectives.events({
    'click #item': function (event, template) {
        // console.log(this._id._str);
        template.orderQuestions(this._id._str);
        var _id = this._id._str;
        // template.finalSelected.set(this);
        template.finalSelected.set({"_id": _id});
    },
    'click #optionTrue': function (event, template) {
        var questions = template.questions.get();
        var index = questions.indexOf(this);
        questions.splice(index, 1);
        template.questions.set(questions);
        // console.log(this, "THIS");
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
        // console.log(template.conclusions.get());
        // console.log(template.inconclusions.get(), "INCONCLUSIONS");
    },
    'click #final': function (event, template) {
        // console.log(this);
        template.finalSelected.set(this);
        // template.changeFinalValue(this._id);
    },
});