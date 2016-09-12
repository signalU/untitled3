/**
 * Created by diego on 8/29/16.
 */


Template.formRule.onCreated(function () {
    this.singleProposition = new ReactiveVar([]);
});

Template.formRule.onRendered( function() {
    // $('select').material_select();
    this.autorun(function() {
        var optionsCursor = SingleProposition.find().count(); if(optionsCursor > 0){ $('select').material_select(); }
    });
});

Template.formRule.events({
    'click #addSingleProposition':function(e,template) {
        var tempArray = template.singleProposition.get();
        tempArray.push({index:tempArray.length,indexPlusOne:tempArray.length+1});
        template.singleProposition.set(tempArray);
        // instance.counter.set(instance.counter.get() + 1);
    },
    'click #removeSingleProposition':function(e,template) {
        var tempArray = template.singleProposition.get();
        tempArray.pop();
        template.singleProposition.set(tempArray);
    },
    // 'click .option': function (e, template) {
    //     e.preventDefault();
    //     console.log(this);
    // },
    // 'click #pros': function (e, template) {
    //     e.preventDefault();
    //     console.log(e.currentTarget, "Target");
    //     console.log(this);
    // },
    // 'click #addTemp': function (e, template) {
    //     e.preventDefault();
    //     console.log(this);
    // },
    'submit #formRule': function (e, template) {
        e.preventDefault();


        var subProductsList = [];

        _.each(template.singleProposition.get(),function(itm,i) {
            var name = SingleProposition.findOne({_id: template.find('#singleProposition_'+ i).value }).name;
            subProductsList.push({
                // _id: itm._id,
                _idAntecesorProposition: template.find('#singleProposition_'+ i).value,
                name: name,
                isFalse: template.find('#status'+i).checked,
                // name: template.find('#nameP').value,
                // sku: template.find('#sub_' + i + '_proposition').value,
                // description: template.find('#sub_' + i + '_description').value,
                // provider: _idProvider,
                // line: template.find('#lines').value,
                // supportdummy: template.find('#dummy').checked,
                // issubproduct: true,
                // quantity: template.find('#sub_' + i + '_quantity').value
            });
            // console.log(template.find('#status'+i).checked, i)
        });
        

        console.log(subProductsList);

        var cName = SingleProposition.findOne({_id: template.find('#singlePropositionConsequent').value}).name;
        var consequent = {
            _idConsequent: template.find('#singlePropositionConsequent').value,
            nameConsequent: cName,
            isFalse: template.find("#statusConsequent").checked
        };
        console.log(consequent, "consequent");

        var rule = {
            _idConsequent: template.find('#singlePropositionConsequent').value,
            nameConsequent: cName,
            isFalse: template.find("#statusConsequent").checked,
            predecessor: subProductsList
        };

        Rules.insert(rule);

        history.back();
    },
    'click #cancel': function (e) {
        e.preventDefault();
        history.back();
    }
});

Template.formRule.helpers({
    singleProposition: function () {
        return Template.instance().singleProposition.get();
    },
    proposition: function () {
        return SingleProposition.find({});
    }
});