app.component("content", {
    templateUrl: "components/content/content.html",
    controller: "contentController"
});

app.controller("contentController", function ($scope) {

    this.getState = (state) => {
        console.log("received state:", state);
        this.currentState = state;
    }

});