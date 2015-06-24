var CORSDemo = angular.module('CORSDemo', []);
CORSDemo.config(function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}).controller('MyController', ['$scope', '$timeout', '$q', '$http', function($scope, $timeout, $q, $http) {
	$scope.trustSrc = function(src) {
	  return $sce.trustAsResourceUrl(src);
	};
	$scope.searchInstagram = function(keyword) {
	$scope.keyword = keyword;
  	console.log($scope.keyword);
    var url ="https://api.instagram.com/v1/tags/"+$scope.keyword+"/media/recent?client_id=2af3d14148d24e7aa47ba9c8820bb3fa&outputMode=json&callback=JSON_CALLBACK"
    console.log(url);
	$http({
		  method: 'JSONP',
		  url: url
		  
	}).success(function(data) {
		console.log(data.data[0].images.thumbnail.url);
        $scope.results = data.data[0].images.thumbnail.url;
        $scope.results =  angular.fromJson(data.data[0].images.thumbnail.url);
          console.log(typeof($scope.results));
    }).error(function(data) {
       $scope.results("There is error in retreiving data from instagram");
    });
  };
}]);
