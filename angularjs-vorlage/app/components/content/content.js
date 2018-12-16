app.component("content", {
    templateUrl: "components/content/content.html",
    controller: "contentController"
});

app.controller("contentController", function ($scope) {

    this.test = "test";

});