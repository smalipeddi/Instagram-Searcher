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
					$scope.notification = true;
					console.log($scope.keyword);
					var url ="https://api.instagram.com/v1/tags/"+$scope.keyword+"/media/recent?client_id=2af3d14148d24e7aa47ba9c8820bb3fa&outputMode=json&callback=JSON_CALLBACK"
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
							var toGo = data.data[i].link;
							console.log(img_src);
							$("#greatphoto").attr("src", img_src);
							$("#links").attr("href", toGo);
							$('<a href="' + toGo + '"><img src="' + img_src + '" /></a>').appendTo('#search-results');
						}
					}).error(function(data) {
						$scope.results("There is error in retreiving data from instagram");
					});
				};

		       /*$scope.nextPage =function(keyword){
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
			        	$scope.results("There is error in retreiving data from instagram");
			        });
			    };
			    */


			}]);
