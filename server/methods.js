/**
 * Created by diego on 9/11/16.
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
}


Meteor.methods({
   aMethod: function () {
       console.log("This is a method");
   },
    callPython: function(obj) {
        var fut = new Future();
        // exec('pythonScriptCommand with parameters', function (error, stdout, stderr) {
        // exec('python /home/diego/Desktop/py/file.py ' + "' "+ obj + " '", function (error, stdout, stderr) {
        // exec('python3 /home/diego/Documents/IDS/6 semester/Expert Systems/Practices/Expert1/solve/solve.py ' + obj, function (error, stdout, stderr) {
        var dir = 'python3 /home/diego/Documents/IDS/6_semester/ExpertSystems/Practices/Expert1/solve/solve.py ';
        exec(dir + " ' "+ obj + " '" , function (error, stdout, stderr) {
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


                fut.return('Python was here');
            }).run();

        });
        return fut.wait();
    },
    consoleExecSync : function(seq) {

        var cmd = "python /home/diego/Desktop/py/file.py";

        exec(cmd, Meteor.bindEnvironment(
            function(error, stdout, stderr) {
                if (error) {
                    throw new Meteor.Error(error, error);
                }
                if (stdout) {
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
                }
            }
        ));
    }

});