				var CORSDemo = angular.module('CORSDemo', []);
				CORSDemo.config(function($httpProvider) {
					$httpProvider.defaults.useXDomain = true;
					delete $httpProvider.defaults.headers.common['X-Requested-With'];
				}).controller('MyController', ['$scope', '$timeout', '$q', '$http', function($scope, $timeout, $q, $http) {
					$scope.trustSrc = function(src) {
						return $sce.trustAsResourceUrl(src);
					};

					$scope.keyword = "";
					$scope.searchInstagram = function(keyword) {
						event.preventDefault();
						$scope.keyword = keyword;
						$scope.notification = true;
						console.log($scope.keyword);
						var url ="https://api.instagram.com/v1/tags/"+$scope.keyword+"/media/recent?client_id=2af3d14148d24e7aa47ba9c8820bb3fa&outputMode=json&callback=JSON_CALLBACK"
						console.log(url);
						$http({
							method: 'JSONP',
							url: url			
						}).success(function(data) {
							console.log(data.data.length);
							
							next_min_id = data.pagination.next_min_id;
							console.log("MIN ID");
							console.log(next_min_id);
							next_max_id = data.pagination.next_max_id;
							console.log("MAX ID");
							console.log(next_max_id);
							
					  	//	next_url = data.pagination.next_url;
					  	next_url = "https://api.instagram.com/v1/tags/"+$scope.keyword+ "/media/recent?callback=angular.callbacks._1&outputMode=json&client_id=2af3d14148d24e7aa47ba9c8820bb3fa&max_tag_id="+next_max_id;
					  	prev_url = "https://api.instagram.com/v1/tags/"+$scope.keyword+ "/media/recent?callback=angular.callbacks._1&outputMode=json&client_id=2af3d14148d24e7aa47ba9c8820bb3fa&min_tag_id="+next_min_id;
					  	console.log(next_url);
					  	for(var i = 0 ; i < data.data.length; i ++){
					  		img_src = data.data[i].images.thumbnail.url;
					  		var toGo = data.data[i].link;
								//console.log(img_src);
								$("#greatphoto").attr("src", img_src);
								$("#links").attr("href", toGo);
								$('<a href="' + toGo + '"><img src="' + img_src + '" /></a>').appendTo('#search-results');
							}

							return keyword,next_url;
						}).error(function(data) {
							$scope.results("There is error in retreiving data from instagram");
						});
					};

					$scope.nextPage =function(keyword,next_url){
						$( "#search-results" ).empty();
				    	//$scope.next_url = data.pagination.next_url;
				    	//console.log(data.pagination.next_url);
				    	$scope.keyword = keyword;
				    	$scope.notification = true;
				    	console.log($scope.keyword);
				    	var url = next_url;
				    	console.log(url);
				    	$http({
				    		method: 'JSONP',
				    		url: url			
				    	}).success(function(data) {
				    		console.log(data.data.length);
				    		next_min_id = data.pagination.next_min_id;
				    		console.log("MIN ID");
				    		console.log(next_min_id);
				    		next_max_id = data.pagination.next_max_id;
				    		console.log("MAX ID");
				    		console.log(next_max_id);

					  	//	next_url = data.pagination.next_url;
					  	next_url = "https://api.instagram.com/v1/tags/"+$scope.keyword+ "/media/recent?callback=angular.callbacks._1&outputMode=json&client_id=2af3d14148d24e7aa47ba9c8820bb3fa&max_tag_id="+next_max_id;
					  	prev_url = "https://api.instagram.com/v1/tags/"+$scope.keyword+ "/media/recent?callback=angular.callbacks._1&outputMode=json&client_id=2af3d14148d24e7aa47ba9c8820bb3fa&min_tag_id="+next_min_id;
					  	console.log(prev_url);

				    		//next_url = data.pagination.next_url;
				    		console.log(next_url);
				    		for(var i = 0 ; i < data.data.length; i++){
				    			img_src = data.data[i].images.thumbnail.url;
				                var img = $('<img id="dynamic">'); //Equivalent: $(document.createElement('img'))
				                img.attr('src', img_src);
				                img.appendTo('#imagediv');
				            }
				            return keyword,prev_url;

				        }).error(function(data) {
				        	console.log("There is error in retreiving data from instagram");
				        });
				    };

				    $scope.prevPage =function(keyword){
				    	$("#search-results").empty();
				    	$scope.next_url = data.pagination.next_url;
				    	console.log(data.pagination.next_url);
				    	$scope.keyword = keyword;
				    	$scope.notification = true;
				    	console.log($scope.keyword);
				    	var url = data.pagination.next_url;
				    	console.log(url);
				    	$http({
				    		method: 'JSONP',
				    		url: url			
				    	}).success(function(data) {
				    		console.log(data.data.length);
				    		next_url = data.pagination.next_url;
				    		console.log(next_url);
				    		for(var i = 0 ; i < data.data.length; i ++){
				    			img_src = data.data[i].images.thumbnail.url;
				                var img = $('<img id="dynamic">'); //Equivalent: $(document.createElement('img'))
				                img.attr('src', img_src);
				                img.appendTo('#imagediv');
				            }

				        }).error(function(data) {
				        	console.log("There is error in retreiving data from instagram");
				        });
				    };




				}]);
