/**
 * Created by diego on 10/3/16.
 */

Template.nameConsequent.onCreated(function () {
    // console.log(this.data, "data ids");
});

Template.nameConsequent.helpers({
   nameQ: function () {
       return SingleProposition.findOne({"_id": new Mongo.ObjectID(Template.instance().data._idConsequent)}).name;
   }
});