app.component("age", {
    templateUrl: "components/age.html",
    controller: "ageController"
});

app.controller("ageController", function ($scope) {

    $scope.currentNavItem = 'page1';

    $scope.goto = function(page) {
        console.log("Goto " + page);
    };

    //https://bl.ocks.org/d3indepth/1aef77d17863e603ff4e84226db5b227
this.s = [];
let self = this;

    'use strict';
    let globalVar;
    let states= [];
    let age0_9 = [];
    let age19_10= [];
    let age20_29= [];
    let age30_39= [];
    let age40_49= [];
    let age50_59= [];
    let age60_69= [];
    let age70_79= [];
    let age80_89= [];
    let age90_99= [];
    let ageunknown= [];
    let agedataperstate = [];

    let names = [
        "0-9",
        "10 - 19",
        "20 - 29",
        "30 - 39",
        "40 - 49",
        "50 - 59",
        "60 - 69",
        "70 - 79",
        "80 - 89",
        "90 - 99",
        "Unknown"
    ];

    let w = 500;
    let h = 700;
    let padding = 30;

    d3.csv("data/offender_age.csv")
        .then(function(data) {
            globalVar = data;


            //Werte der csv aufteilen und in arrays speichern
            for (let i= 0; i < data.length; i++){
//              console.log(globalVar);

                self.s[i] = data[i].State;
                states[i] = data[i].State;
                age0_9[i] = data[i]["0 - 9"];
                age19_10[i] = data[i]["10 - 19"];
                age20_29[i] = data[i]["20 - 29"];
                age30_39[i] = data[i]["30 - 39"];
                age40_49[i] = data[i]["40 - 49"];
                age50_59[i] = data[i]["50 - 59"];
                age60_69[i] = data[i]["60 - 69"];
                age70_79[i] = data[i]["70 - 79"];
                age80_89[i] = data[i]["80 - 89"];
                age90_99[i] = data[i]["90 - 99"];
                ageunknown[i] = data[i].Unknown;

                agedataperstate[i] = [ age0_9[i],
                    data[i]["10 - 19"],
                    data[i]["20 - 29"],
                    data[i]["30 - 39"],
                    data[i]["40 - 49"],
                    data[i]["50 - 59"],
                    data[i]["60 - 69"],
                    data[i]["70 - 79"],
                    data[i]["80 - 89"],
                    data[i]["90 - 99"],
                    data[i].Unknown
                ].map(Number);

            }


            //arrays ausgeben
            for (let j = 1; j < states.length; j++){
//                console.log(states[j]);
            }

            let stateID = 1;

            //Create SVG element
            let svg = d3.select("body")
                .append("svg")
                .attr("width", w)
                .attr("height", h);


            //Add the SVG Text Element to the svgContainer
            svg.append("text")
                .attr("x", 10)
                .attr("y", 15)
                .text(states[stateID])
                .attr("font-family", "sans-serif")
                .attr("font-size", "20px")
                .attr("fill", "red")
                .enter()
                .append("text");


            //show all age progress bar
            let posy = 50;

            let maxvalue = agedataperstate[stateID].reduce(function(a, b) {
                return Math.max(a, b);
            });

            for(let k = 0; k <= 11; k++){
                svg.append("text")
                    .attr("x", 10)
                    .attr("y", posy+(k*60))
                    .text(names[k])
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "20px")
                    .attr("fill", "red")
                    .enter()
                    .append("text");

                svg.append('rect')
                    .attr('class', 'bg-rect')
                    .attr('rx', 10)
                    .attr('ry', 10)
                    .attr('fill', 'gray')
                    .attr('height', 15)
                    .attr('width', w-120)
                    .attr('x', 10)
                    .attr('y',posy+3+(k*60));


                let progress = svg.append('rect')
                    .attr('class', 'progress-rect')
                    .attr('fill', "red")
                    .attr('height', 15)
                    .attr('width', 0)
                    .attr('rx', 10)
                    .attr('ry', 10)
                    .attr('x', 10)
                    .attr('y',posy+3+(k*60));

                progress.transition()
                    .duration(1000)
                    .attr('width', function(){
                        let prozentwert = ((agedataperstate[stateID][k]*100)/maxvalue)/1.315;
                        console.log(agedataperstate[stateID][k]+"*100/"+maxvalue);
                        console.log(prozentwert);
                        return (((prozentwert) * 5));
                    });

                svg.append("text")
                    .attr("x", w-100)
                    .attr("y", posy+20+(k*60))
                    .text(agedataperstate[stateID][k])
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "20px")
                    .attr("fill", "red")
                    .enter()
                    .append("text");
            }

        });



});
