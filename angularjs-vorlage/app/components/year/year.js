app.component("year", {
    templateUrl: "components/year/year.html",
    controller: "yearController"
});

app.controller("yearController", function ($scope) {

    this.getState = (state) => {
        console.log("State reveived", state);
    }

    this.sayHello = (state) => {
        console.log("hello");
    }

});