/**
 * Created by diego on 9/5/16.
 */

Router.configure({
    layoutTemplate: 'default'
});


Router.route('/',{
    template:'RulesList'
});

Router.route('prepositions',{
    template: 'ListPropositions'
});


Router.route('/addRule',{
    template: 'formRule',
    name: 'rules.add'
});

Router.route('/addProposition',{
    template: 'formProposition',
    name: 'propositions.add'
});


Router.route('/addSentence',{
    template: 'formRecognizer'
});

Router.route('/chaining',{
    template: 'chaining'
});

Router.route('/convert',{
    template: 'orRules'
});