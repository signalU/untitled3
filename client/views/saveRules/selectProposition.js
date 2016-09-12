/**
 * Created by diego on 8/29/16.
 */


Template.selectProposition.onRendered( function() {
    // $('select').material_select();
    this.autorun(function() {
        var optionsCursor = SingleProposition.find().count(); if(optionsCursor > 0){ $('select').material_select(); }
    });
});

Template.selectProposition.helpers({
    proposition: function () {
        return SingleProposition.find({});
    }
});