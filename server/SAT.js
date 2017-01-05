/**
 * Created by diego on 10/24/16.
 */

var exec = Npm.require('child_process').exec;
var Fiber = Npm.require('fibers');
var Future = Npm.require('fibers/future');


Meteor.methods({

    SAT: function (data) {
        var fut = new Future();
        // exec('pythonScriptCommand with parameters', function (error, stdout, stderr) {
        // exec('python /home/diego/Desktop/py/file.py ' + "' "+ obj + " '", function (error, stdout, stderr) {
        // exec('python3 /home/diego/Documents/IDS/6 semester/Expert Systems/Practices/Expert1/solve/solve.py ' + obj, function (error, stdout, stderr) {
        var dir = 'python3 /home/diego/Documents/IDS/6_semester/ExpertSystems/Practices/Expert1/solve/satisf/solve.py';
        exec(dir + " ' "+ data + " '" , function (error, stdout, stderr) {
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
                console.log(stdout)
                // eval( 'result=' + stdout );
                result = stdout
                console.log(result);
                fut.return(result);
            }).run();

        });
        return fut.wait();
    }
});
