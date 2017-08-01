(function () {

    angular
        .module("WamApp")
        .controller("flickrImageSearchController", flickrImageSearchController);

    function flickrImageSearchController($routeParams, flickrService, $location, widgetService) {

        var model = this;

        model.userID = $routeParams.userID;
        model.webID = $routeParams.webID;
        model.pageID = $routeParams.pageID;
        model.widgetID = $routeParams.widgetID;

        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;


        function init() {

        }
        init();

        function searchPhotos(searchTerm) {
            flickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    var data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            widgetService
                .updateWidget(model.widgetID, {'_id': model.widgetID, 'widgetType': 'IMAGE', 'pageId': model.pageID,
                    'width': '100%', 'size': 0, 'text': '', 'url': url})
                .then(function (response) {
                    $location
                        .url("/user/" + model.userID + "/website/"
                            + model.webID + "/page/" + model.pageID + "/widget/" + model.widgetID);
                });
        }

    }
})();
