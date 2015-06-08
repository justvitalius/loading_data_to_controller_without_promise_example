(function(){
  'use strict';

  var dataUrl = 'http://demo0426909.mockable.io/data';

  angular.module('app', []);

////////////////////////////////////////////////////////////////////////////////////////
  angular.module('app').factory('testFactory', testFactory);
  testFactory.$inject = ['$http', '$cacheFactory'];

  var _cache = [];

  function testFactory($http, $cacheFactory){
    var cache, service;

    service = {
      all: _cache,
      getAll: all
    };

    return activate();

    function activate(){
      // cache = $cacheFactory('testStore');
      // cache.put('data', []);
      return service;
    }

    function all(){
      var data = _cache
      if (_.isArray(data) && data.length) {
        return data;
      } else {
        $http.get(dataUrl)
          .then(function(response){
            return angular.copy(response.data, _cache);
          });
      
      }
    }

  }
  ////////////////////////////////////////////////////////////////////////////////////////
  angular.module('app').controller('TestController', testController);
  testController.$inject = ['$scope', 'testFactory'];

  function testController($scope, testFactory){
    
    var vm = this;
    vm.data = testFactory.all;

    // $scope.$watchCollection('this.data', function(newVal, oldVal){
      // console.log(newVal, oldVal);
    // }, true);

    testFactory.getAll();


  }
  
})();