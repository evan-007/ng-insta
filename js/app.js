angular.module('instaApp', ['ngAnimate'])
.config(function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
})
.controller('instaCtrl', function($scope, $http){
  $scope.word = /^\s*\w*\s*$/;
  $scope.getResults = function(query){
  	console.log($scope.searchForm.$valid);
  	$scope.failed = '';
  	$scope.images = '';
		$scope.searching = true;
		$scope.query = query;
		$http({
			method: 'JSONP',
			url: 'https://api.instagram.com/v1/tags/'+query+'/media/recent',
			params: {
				client_id: '6228b1584b8045269663b24eb1d03ae1',
				callback: 'JSON_CALLBACK'
			}
		})
		.success(function(data, status, headers, config) {
			console.log(data);
			$scope.searching = false;
			$scope.oldQuery = query;
			if (data.data.length == 0) {
				$scope.failed = 'No results for your search, please try again';
			} else {
			$scope.images = data.data;
			$scope.count = data.data.length;
			}
		})
		.error(function(data, status, headers, config) {
			$scope.failed = 'Somthing went wrong, please try again.';
		});
	};
  $scope.images = '';
});