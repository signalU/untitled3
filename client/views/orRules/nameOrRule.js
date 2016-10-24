/**
 * Created by diego on 10/11/16.
 */


Template.nameOrRule.helpers({
    nameOr: function () {
        var self = Template.instance();
        return SingleProposition.findOne({"_id": new Mongo.ObjectID(self.data._idPreposition)}).name;
        // return SingleProposition.findOne({"_id": new Mongo.ObjectID(self.data._id)}).name
    }
})