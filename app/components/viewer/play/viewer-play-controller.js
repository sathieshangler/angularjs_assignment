angular.module('assignmentJs').controller("viewerPlayMediaController", function($scope){  
    $scope.mediaDetail = JSON.parse(sessionStorage.getItem("mediaData"));
});