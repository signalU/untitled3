/**
 * Created by diego on 9/5/16.
 */

Template.ListPropositions.helpers({
    proposition: function () {
        return SingleProposition.find({});
    }
})