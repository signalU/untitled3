/**
 * Created by diego on 10/10/16.
 */

Template.propositionName.onCreated(function () {
   // console.log(this.data._id);
    // console.log(SingleProposition.findOne({"_id": this.data._id}));
});

Template.propositionName.helpers({
    nameProposition: function(){
        var self = Template.instance();
        // return SingleProposition.findOne({"_id": self.data._id}).name;
        // return SingleProposition.findOne({"_id": new Mongo.ObjectID(Template.instance().data._idConsequent)}).name;
        // return this
        return SingleProposition.findOne({"_id": new Mongo.ObjectID(self.data._id)}).name
    }
});