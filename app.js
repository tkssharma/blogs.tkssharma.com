// app.js


var app = angular.module('me', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('home');

    $stateProvider

        .state('home', {
            url: '/home',
            templateUrl: 'partials/home.html',
            containerClass: 'home'

        })
        .state('talks', {
           url: '/talks',
           templateUrl: 'partials/talks.html',
           containerClass: 'talks'
       })
         .state('about', {
            url: '/about',
            templateUrl: 'partials/about.html',
            containerClass: 'about'
        })
           .state('training', {
            url: '/training',
            templateUrl: 'partials/training.html',
            containerClass: 'training'
        })
         .state('contact', {
            url: '/contact',
            templateUrl: 'partials/contact.html',
            containerClass: 'contact'
        })
         .state('projects', {
            url: '/projects',
            templateUrl: 'partials/projects.html',
            containerClass: 'projects'
        })
        .state('links', {
            url: '/links',
            templateUrl: 'partials/links.html',
            containerClass: 'links'
        });

});

app.run(function($rootScope){

    $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
        $rootScope.containerClass = toState.containerClass;
    });

});
