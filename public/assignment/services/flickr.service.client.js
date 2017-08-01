(function () {

    angular
        .module("WamApp")
        .factory("flickrService", flickrService);

    function flickrService($http) {

        var api = {
            "searchPhotos": searchPhotos
        };
        return api;

        var secret = "84380f57196632dc";

        function searchPhotos(searchTerm) {
            var key = "0865fc3048f7d3a2e5d5205fcde5ae15";
            var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search" +
                "&format=json&api_key=API_KEY&text=TEXT";

            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }

})();