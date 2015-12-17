(function() {
  function SongPlayer(Fixtures) {
    var SongPlayer = {};

    // @desc Inject Fixtures service, access and store song and album info
    // @param {Object} albumData

    var currentAlbum = Fixtures.getAlbum();

    // @desc Buzz object audio file
    // @type {Object}

    var currentBuzzObject = null;

    // @function setSong
    // @desc Stops currently playing song and loads new audio file as currentBuzzObject
    // @param {Object} song

    var setSong = function(song) {
      if (currentBuzzObject) {
        // currentBuzzObject.stop();
        // SongPlayer.currentSong.playing = null;
        stopSong(song);
      } else if (SongPlayer.currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          currentBuzzObject.play();
        }
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      SongPlayer.currentSong = song;
    };

    // @function play
    // @desc Play current or new song
    // @param {Object} song

    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    };

    // @function stop
    // @desc Stop current or new song
    // @param {Object} song

    var stopSong = function(song) {
      currentBuzzObject.stop();
      // song.playing = null;
      SongPlayer.currentSong.playing = null;
    };

    // @function get song index

    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };

    SongPlayer.currentSong = null;

    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        // currentBuzzObject.play();
        // song.playing = true;
        playSong(song);
      } else if (SongPlayer.currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          playSong(song);
        }
      }
    };

    // @function pause
    // @desc Pause current song
    // @param {Object} song

    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

    // @function previous
    // @desc return to previous song

    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;
      if (currentSongIndex < 0) {
        // currentBuzzObject.stop();
        // SongPlayer.currentSong.playing = null;
        stopSong(song);
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    // @function next
    // @desc skip to next song

    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;
      if (currentSongIndex === currentAlbum.songs.length) {
        // currentBuzzObject.stop();
        // SongPlayer.currentSong.playing = null;
        stopSong(song);
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();
