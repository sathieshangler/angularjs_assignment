
angular.module('assignmentJs').controller("commonController", function($scope, $state, $rootScope){  
    
     $scope.alerts = [];
    // $scope.$state = $state;
    // $rootScope.recording = false;
    // $scope.pageLoaded = false;
    $("#loader").hide();

    $scope.goTo = function(state) {
        $state.go(state);
     }
     $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
    $rootScope.closapopup = function() {
        $("#alertmodal").modal("hide");
    }
});