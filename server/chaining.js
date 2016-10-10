/**
 * Created by diego on 10/4/16.
 */

var exec = Npm.require('child_process').exec;
var Fiber = Npm.require('fibers');
var Future = Npm.require('fibers/future');


_execSync = function(cmd, stdoutHandler, stderrHandler) {
    exec(cmd, Meteor.bindEnvironment(
        function(error, stdout, stderr) {
            if (stdout != "")
                stdoutHandler(stdout);
            if (stderr != "")
                stderrHandler(stderr);
        }
        )
    );
};


Meteor.methods({
   // finalConclusions: function () {
   //     var rules = Rules.find({}).fetch();
   //     // var finalConclusions = Rules.find({}).distinct("consequent._idConsequent")
   //
   //     var finalConclusions = []
   //
   //     // for(let i = 0; i < rules.length; i++){
   //     //     console.log(rules[i]["consequent._idConsequent"]);
   //     // }
   //     _.each(rules, function (rule) {
   //         // console.log(rule)
   //         finalConclusions.push(rule.consequent._idConsequent);
   //         console.log(SingleProposition.findOne({"_id": new Mongo.ObjectID(rule.consequent._idConsequent)}).name);
   //     });
   //     //console.log(finalConclusions);
   //     // var finalConclusions = _.uniq(Rules.find({}, {
   //     //     sort: {"consequent._idConsequent": 1}, fields: {"consequent._idConsequent": true}
   //     // }).fetch().map(function(x) {
   //     //     return x["consequent._idConsequent"];
   //     // }), true);
   //
   //     // console.log(finalConclusions, "final Conclusions");
   //     // return finalConclusions
   //     // return finalConclusions
   //     return rules;
   // }
   //  ,
    prepositionClassification: function () {
        var fut = new Future();
        // exec('pythonScriptCommand with parameters', function (error, stdout, stderr) {
        // exec('python /home/diego/Desktop/py/file.py ' + "' "+ obj + " '", function (error, stdout, stderr) {
        // exec('python3 /home/diego/Documents/IDS/6 semester/Expert Systems/Practices/Expert1/solve/solve.py ' + obj, function (error, stdout, stderr) {
        var dir = 'python3 /home/diego/Documents/IDS/6_semester/ExpertSystems/Practices/Expert1/solve/chaining/chaining_rules.py';
        exec(dir, function (error, stdout, stderr) {
            if(error){
                console.log(error.reason, ": error");
                throw new Meteor.Error(error, error);
            }


            // if you want to write to Mongo in this callback
            // you need to get yourself a Fiber
            new Fiber(function(error) {
                if (error) {
                    throw new Meteor.Error(error, error);
                }

                if (stdout) {
                    console.log(stdout)
                    Stdout.insert({
                        timestamp : new Date().getTime(),
                        data : stdout
                    });
                }
                if (stderr) {
                    Stderr.insert({
                        timestamp : new Date().getTime(),
                        data : stderr
                    });
                    throw new Meteor.Error(stderr, stderr);
                }
                var result;
                eval( 'result=' + stdout );
                console.log(result);
                fut.return(result);
            }).run();

        });
        return fut.wait();
    }
});