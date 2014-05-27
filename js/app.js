angular.module('instaApp', [])
.config(function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
})
.controller('instaCtrl', function($scope, $http){
  $scope.getResults = function(query){
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
			$scope.images = data.data;
			$scope.count = data.data.length;
		});
	};
  $scope.images = '';
});