app.component("year", {
    templateUrl: "components/year/year.html",
    controller: "yearController",
    bindings: {
        state: "@?"
    }
});

app.controller("yearController", function ($scope) {

    let self = this;

    this.getState = (state) => {
        console.log("State reveived", state);
    }

    this.sayHello = (state) => {
        console.log("hello");
    }

    $scope.$watch(self.state, function(newValue,oldValue){
        console.log("variable changed", self.state);
    });

    this.draw = () => {
        let years;
        let stateName = document.getElementById("stateForYear");
        let yearRange = [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017];
        let svg = d3.select("svg#yearCurve");

        //d3.csv('../../../../csv/year2.csv', function(data) {
        //    console.log(data);
        /*data.forEach(function(d) {

        });*/
        /*data.forEach(function(d) {
            console.log(d);
            if (d.State === stateName) {
                console.log("State was found.");
                years = curData;
            }
            else {
                console.log(`${d} is not the right State.`);
            }
        });*/
        //});

        Papa.parse('../../../../csv/year2.csv', {
            header: true,
            download: true,
            dynamicTyping: true,
            complete: function (results) {
                console.log("csv found", results);
                let data = [];
                let dataRange = [];
                results.data.forEach(e => {
                    if (e.State === stateName.replace(/ /g,'')) {
                        console.log("state found", e);
                        for (let i = yearRange[0]; i <= yearRange[yearRange.length - 1]; i++) {
                            data.push([i, e[i]]);
                            dataRange.push([e[i]]);
                        }
                        console.log("data generated", data);
                        let lineGenerator = d3.line().curve(d3.curveNatural);
                        let pathString = lineGenerator(data);
                        console.log("path string generated", pathString);
                        let scaleX = d3.scaleLinear().domain([d3.min(yearRange), d3.max(yearRange)]).range([25, 390]);
                        console.log("vertical range", [d3.min(yearRange), d3.max(yearRange)]);
                        let scaleY = d3.scaleLinear().domain(/*[d3.min(dataRange), d3.max(dataRange)]*/[0, 850]).range([180, 10]);
                        console.log("horizontal range", [d3.min(dataRange), d3.max(dataRange)]);
                        let scaledValues = [];
                        for (let i = 0; i < yearRange.length; i++) {
                            scaledValues.push([scaleX(yearRange[i]), scaleY(e[yearRange[i]])]);
                        }

                        for(let i = 1; i < scaledValues.length; i++) {
                            svg.append("line")
                                .attr("x1", "" + scaledValues[i][0])
                                .attr("y1", "180")
                                .attr("x2", "" + scaledValues[i][0])
                                .attr("y2", "10")
                                .attr("style", "stroke: #bebebe; stroke-width: 1.5");
                        }
                        for(let i = 100; i <= 800; i+= 100) {
                            svg.append("line")
                                .attr("x1", "390")
                                .attr("y1", "" + scaleY(i))
                                .attr("x2", "25")
                                .attr("y2", "" + scaleY(i))
                                .attr("style", "stroke: #bebebe; stroke-width: 1.5");
                        }

                        console.log("values scaled down", scaledValues);
                        pathString = lineGenerator(scaledValues);
                        console.log("scaled path string generated", pathString);

                        svg.append('path')
                            .attr("id", "yearCurve")
                            .attr('d', pathString)
                            .attr('stroke', 'red')
                            .attr('fill', 'none')
                            .attr('stroke-linecap', 'butt')
                            .attr("style", "stroke-width: 2");

                        //<g class="horizontalAxis" transform="translate(0, 170)" />
                        //<g class="verticalAxis" transform="translate(30, 0)" />
                        let horizontalAxis = d3.axisBottom().scale(scaleX).tickFormat(d3.format("d"));
                        svg.append("g")
                            .attr("class", "horizontalAxis")
                            .attr("transform", "translate(0, 180)")
                            .attr("style", "font-size: 8px")
                            .call(horizontalAxis);
                        let verticalAxis = d3.axisLeft().scale(scaleY).tickFormat(d3.format("d"));
                        svg.append("g")
                            .attr("class", "verticalAxis")
                            .attr("transform", "translate(25, 0)")
                            .attr("style", "font-size: 8px")
                            .call(verticalAxis);

                    }
                });
            }
        });

        /*
            let lineGenerator = d3
                .line()
                .curve(d3.curveNatural);
            let pathString = lineGenerator(data);

            d3.select('path')
                .attr('d', pathString);
                */
    }

});