angular.module('assignmentJs').controller("homeController", function ($scope, $rootScope, httpService) {

    $scope.getMedia = function (name) {
        $("#loader").show();
        var url = $rootScope.appConfig.apiUrl + "&t=" + name;
        httpService.get(url).then(function (response) {
            if (response.data.Response == "True") {
                $scope.media = response.data;
                sessionStorage.setItem("mediaData", JSON.stringify($scope.media));
            }
            else {
                $scope.alerts.push({ type: 'danger', msg: response.data.Error });
            }
            $("#loader").hide();
        }, function errorCallback(response) {
            console.log(response.data);
        });
    }
    $scope.getMedia('Avengers');
});