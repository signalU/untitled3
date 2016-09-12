/**
 * Created by diego on 9/5/16.
 */


Template.formRecognizer.events({
    'submit #formRecognizer': function (event) {
        event.preventDefault();
        var sentence = {
            name: event.currentTarget.sentence.value,
        };
        Sentences.insert(sentence);
        history.back();


    },
    'click #cancel': function (e) {
        e.preventDefault();
        history.back()
    }
});
