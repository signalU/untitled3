/**
 * Created by diego on 10/3/16.
 */

Template.nameRule.onCreated(function () {
    // console.log(this.data, "data ids");
});


Template.nameRule.helpers({
    nameR: function () {
        // var proposition = SingleProposition.findOne({"_id":Template.instance().data._idAntecesorProposition}).name;
        // return proposition ? proposition: SingleProposition.findOne({"_id": new Mongo.ObjectID(Template.instance().data._idAntecesorProposition)}).name;
        // return SingleProposition.findOne({"_id":Template.instance().data._idAntecesorProposition}).name;
        return SingleProposition.findOne({"_id": new Mongo.ObjectID(Template.instance().data._idAntecesorProposition)}).name;
        // Posts.findOne({_id: new Mongo.ObjectID("557fba5a8032a674d929e6a1") });
    }
});