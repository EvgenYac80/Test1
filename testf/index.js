angular.module('app', ['ngResource', 'ngAnimate', 'ngSanitize', 'ui.bootstrap'])

		
        .controller("UserCommentsController", function (Comments, $uibModal, $log, $document, $scope, $window, $http) {
	   
			
	         var _self = this;
			 $scope.myusername='NameUser';
					
      	    $scope.repeatQ=function(){
				Comments.query().$promise.then(function (result) {
				$scope.myusername=result[0].name;
				_self.userComments = result.slice(1);
				$scope.showB=true;
				},
				function(err){$scope.showB=false;
				});
			
			};
				
            Comments.query().$promise.then(function (result) {
				$scope.myusername=result[0].name;
				_self.userComments = result.slice(1);
				$scope.showB=true;
				},
				function(err){$scope.showB=false;}				
			) ;

            this.animationsEnabled = true;

            this.openModal = function (size, parentSelector) {
                var parentElem = parentSelector ?
                        angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
                var modalInstance = $uibModal.open({
                    animation: _self.animationsEnabled,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'modalContent.html',
                    controller: 'ModalInstanceCtrl',
                    controllerAs: 'commentsCtrl',
                    size: size,
                    appendTo: parentElem

                });

                modalInstance.result.then(function (cmtText) {
                    _self.cmtText = cmtText;
                    $log.info('$ctrl.cmtText >>> ' + _self.cmtText);
                    Comments.save({text: _self.cmtText}).$promise.then(function (result) {
                        Comments.query().$promise.then(function (result) {
                            _self.userComments = result.slice(1);
							$scope.myusername=result[0].name;
                        });
                    });
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };
			
	$(document).bind('keydown', 'ctrl+a', function(){
	var parameter=document.body;
	html2canvas(parameter, { 
    onrendered: function(canvas) { 
    var pic=canvas.toDataURL('image/png').replace(/data:image\/png;base64,/, '');
	
	 $('canvas').remove();
   /*Pictures.save({pic:pic}).$promise.then(function (result) {
		console.log("Come");
	     });   */
	$http.post("/pic",pic,{headers :{"Content-Type":"image/png", "Accept":"image/png"}});
	} 
});
   });
        
			
			
			
        })
        .factory('Comments', ['$resource', function ($resource) {

                var headers = {"Content-Type": "application/json", "Accept": "application/json"}
                return $resource("/api/comments", {}, headers, {
                    query: {method: "GET", data: {}, isArray: true},
                    save: {method: "POST", data: {"text": "@text"}, isArray: false}
                });
            }])
       .controller('ModalInstanceCtrl', function ($uibModalInstance) {
            var _self = this;
            this.sendComment = function () {
                $uibModalInstance.close(_self.cmtText);
            };

            this.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        })
		
		
					
				
		
		/*
		.factory('Pictures', ['$resource', function ($resource) {

                var headers = {"Content-Type":"image/png", "Content-Length":"12400000"}
                return $resource("/pic", {}, {"headers":headers}, {
                        save: {method: "POST", data:{"pic":"@pic"}, isArray: false}
                });
            }])*/
	
   
  
   