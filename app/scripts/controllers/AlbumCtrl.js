(function() {
  // function AlbumCtrl($scope) {
  //   $scope.albumData = albumPicasso;
  function AlbumCtrl(Fixtures) {
    this.albumData = Fixtures.getAlbum();
  }

  angular
    .module('blocJams')
    .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
})();
