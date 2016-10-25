/**
 * Created by diego on 9/5/16.
 */


Template.header.helpers({
    menu: function () {
        var result = [];
        result.push({href:'/prepositions',value:'Prepositions', icon:'mdi-action-assignment-turned-in'});
        result.push({href:'/',value:'Rules', icon:'mdi-action-face-unlock'});
        result.push({href:'/addSentence',value:'add Sentence', icon:'mdi-action-face-unlock'});
        result.push({href: '/chaining', value: 'Chaining', icon: 'mdi-action-face-unlock'});
        result.push({href: '/convert', value: 'Converter', icon: 'mdi-action-face-unlock'});
        result.push({href: '/objectives', value: 'Objectives', icon: 'mdi-action-face-unlock'});
        return result;
    },
    showMenu: function () {
        return true;
    }
})