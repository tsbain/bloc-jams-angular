(function() {
  function AlbumCtrl($scope) {
    // this.albumData = albumPicasso;
    $scope.albumData = albumPicasso;
  };

  angular
    .module('blocJams')
    .controller('AlbumCtrl', AlbumCtrl);
})();
