var mainApp = angular.module('assignmentJs', ['ui.router', 'ui.bootstrap']);

mainApp.constant("appConfig", {
    appName: "Angularjs Assignment",
    appVersion: "1.0",
    apiUrl: "http://www.omdbapi.com/?apikey=acaab33e",
    apiKey: "acaab33e",
    listData: ""
})
    .config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/");
        $stateProvider

            .state("viewer", {
                url: "/",
                templateUrl: 'app/components/viewer/viewer.html',
                controller: 'viewerController'
            })
            .state("viewer.home", {
                url: "home",
                templateUrl: 'app/components/viewer/home/home.html',
                controller: 'homeController'
            })

            .state("viewer.play", {
                url: "viewer/play",
                templateUrl: 'app/components/viewer/play/viewer-play.html',
                controller: 'viewerPlayMediaController'
            })

    }).run(function ($rootScope, appConfig, $transitions) {
        $rootScope.appConfig = appConfig;
    });