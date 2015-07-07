var CORSDemo = angular.module('CORSDemo', []);
	CORSDemo.config(function($httpProvider) {
		$httpProvider.defaults.useXDomain = true;
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
	}).controller('MyController', ['$scope', '$timeout', '$q', '$http', function($scope, $timeout, $q, $http) {
	

	$scope.trustSrc = function(src) {
	return $sce.trustAsResourceUrl(src);
	};

	$('.next').hide();
	$('.prev').hide();
	$scope.keyword = "";
	/*$scope.current_url ="";
	$scope.prev_url="";
	$scope.next_url = "";*/
	
	$scope.searchInstagram = function() {
		$('.next').show();
		console.log("CLICKED SEARCH")
		//console.log("prev_url" + $scope.prev_url);
		$scope.notification = true;
		$scope.prev_url = "https://api.instagram.com/v1/tags/"+$scope.keyword+"/media/recent?"
	    //console.log("current_url = "  + $scope.current_url);
	    console.log("Enter ajax call for search Instagram");
	    $scope.ajaxCall($scope.prev_url);
	    console.log("Exit ajax call for search Instagram");
	    
	    
	};

	$scope.nextPage =function(){
	$("#search-results").empty();
	$('.prev').show();
	console.log("CLICKED NEXT");
	$scope.notification = true;
	/*console.log($scope.keyword);*/
	
	 console.log("Enter ajax call for NEXT page");
	    $scope.ajaxCall($scope.url);

	    console.log("Exit ajax call for NEXT Page");
	    
	};

	$scope.prevPage =function(){
	$("#search-results").empty();
	console.log("CLICKED  PREV");
    //$scope.prev_url = $scope.current_url;
    //console.log("prev_ url = " +  $scope.prev_url);
	//$scope.current_url = $scope.url;
	//console.log("link to click on prev button");
    //console.log($scope.current_url);
	$scope.notification = true;

 console.log("Enter ajax call for  Prev page`");

	$scope.ajaxCall($scope.prev_url);
  console.log("Exit ajax call for prev page");
	    
	};

	$scope.ajaxCall = function(url){
	console.log("i am in ajax call");
	console.log(url);
    $scope.current_url = $scope.url;
    
    var request = {
      client_id:'2af3d14148d24e7aa47ba9c8820bb3fa',
      showSourceText: '1',
      outputMode: 'json',
      callback: "JSON_CALLBACK"
    };
    $http({
      method: 'JSONP',
      url: url,

      params: request
    }).success(function(data) {
	console.log(data);
	$scope.url = data.pagination.next_url;
	/*console.log("NEXT _________________URL");
	console.log($scope.url);
	*/for(var i = 0 ; i < data.data.length; i ++){
	img_src = data.data[i].images.thumbnail.url;
	var toGo = data.data[i].link;
	$("#greatphoto").attr("src", img_src);
	$("#links").attr("href", toGo);
	$('<a href="' + toGo + '"><img src="' + img_src + '" /></a>').appendTo('#search-results');

	}
	}).error(function(data) {
	console.log("There is error in retreiving data from instagram");
	});
	}
	}]);
