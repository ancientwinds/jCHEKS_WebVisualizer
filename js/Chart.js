var Chart = (function () {
    function toolTipFactory() {
        var tooltip = {};
        var element = d3.select("body")
            .append("div")
            .style("position", "absolute")
            .style("z-index", "1000")
            .style("visibility", "hidden")
            .style("font-weight", "bolder")
            .style("text-shadow", "0px 0px 5px #999")
            .style("text-shadow", "0px 0px 5px #999");

        tooltip.hide = function () {
            element.transition()
                .duration(500)
                .style("visibility", "hidden");
        };

        tooltip.move = function (x, y) {
            return element.style("left", (x + 10) + "px").style("top", (y - 10) + "px");
        };

        tooltip.setContent = function setTextMethod(content) {
            element.text(content);
        };

        tooltip.show = function showMethod(content) {
            element.transition().duration(200)
                .style("visibility", "visible");
            element.html(content);
        };
        return tooltip;
    }

    function createTitle(chartElement, text, padding) {
        chartElement.append("text")
            .attr('transform', 'translate( ' + padding + ', ' + (padding / 2 - 20) + ')')
            .style("font-size", "16px")
            .style("text-decoration", "underline")
            .text(text);
    }

    function createYLabel(chartElement, text, padding) {
        chartElement.append('g')
            .classed("label", true)
            .attr('transform', 'translate( ' + (padding / 2) + ', ' + (padding * 2) + ')')
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('transform', 'rotate(-90)')
            .text(text);
    }

    function createXLabel(chartElement, text, padding) {
        chartElement.append('g')
            .classed("label", true)
            .attr('transform', 'translate( ' + (padding + 10) + ', ' + (padding / 2) + ')')
            .append('text')
            .text(text);
    }

    function createAxis(scale, orient, ticks) {
        if (typeof scale.rangePoints === "function") {
            return d3.svg.axis().scale(scale).orient(orient).ticks(ticks).tickValues(ticks);
        } else {
            return d3.svg.axis().scale(scale).orient(orient).ticks(ticks).ticks(ticks);
        }
    }

    function createScale(inputRange, outputRange) {
        return d3.scale.linear().domain(inputRange).range(outputRange).clamp(true).nice();
    }

    function createOrdinalScale(inputRange, outputRange) {
        return d3.scale.ordinal().domain(inputRange).rangeRoundBands(outputRange, 0);
    }

    /*function createLegend(container, legendElements, aPadding, aMargin) {
        var padding = aPadding || 0;
        var margin = aMargin || 15;
        var sharedMargin = 0;
        var legend = container.selectAll("text")
            .data(legendElements).enter().append("text")
            .text(function (d) {
                return d.text;
            })
            .each(function (d, i) {
                d.leftMargin = sharedMargin;
                sharedMargin += this.getComputedTextLength();
            })
            .attr("fill", function (d) {
                return d.color;
            })
            .attr("font-weight", "bold")
            .attr("x", function (d, i) {
                return (d.leftMargin + margin * i) + padding;
            })
            .attr("y", 0);
    }*/

    Chart = {};
    Chart.BarChart = function (newData, config) {
        var targetHeight;
        var elementHeight;
        var elementPadding;
        var padding;
        var targetWidth;
        var targetId;
        var padding;
        var chart;
        var data = newData;
        var xAccessor = function (d) {
            return d.x;
        }
        var maxX;
        var minX;
        var maxY;
        var minY;
        var yAxisTitle;
        var xAxisTitle;
        var chartTitle;
        var xScale;
        var yScale;
        var yAxis;
        var xAxis;
        var xMaxDomain;
        var xMinDomain;
        var legend;

        function applyConfig(config) {
            targetWidth = config.width;
            targetHeight = config.height;
            elementHeight = Number(config.elementHeight) || 10;
            elementPadding = Number(config.elementPadding) || 10;
            padding = config.padding || 75;
            targetId = config.target;
            chart = d3.select("#" + targetId);
            $("#" + targetId).height((elementHeight + elementPadding) * maxY + padding * 2);
            yAxisTitle = config.yAxisTitle || "Y axis";
            xAxisTitle = config.xAxisTitle || "X axis";
            chartTitle = config.chartTitle || "Color Chart";
            if (config.scale) {
                xMaxDomain = Number(config.scale.maxDomain) || maxX;
                xMinDomain = Number(config.scale.minDomain) || minX;
            } else {
                xMaxDomain = maxX;
                xMinDomain = minX;
            }
        }
        applyConfig(config);

        var tooltip = toolTipFactory();

        var xAxisElement = chart.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + padding + "," + padding + ")");

        var yAxisElement = chart.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + padding + ",0)");

        function createLines(element, lines) {
            element.selectAll("line").remove();
            element.selectAll("line")
                .data(lines)
                .enter()
                .append("line")
                .attr({
                    y1: padding,
                    x1: function (d) {
                        return xScale(d.value) + padding
                    },
                    y2: (elementHeight + elementPadding) * maxY + padding,
                    x2: function (d) {
                        return xScale(d.value) + padding;
                    },

                    opacity: 0.4,
                    stroke: function (d) {
                        return d.color
                    }
                }).attr("stroke-width", 3)
                .on("mouseout", function () {
                    d3.select(this).attr("opacity", 0.4).attr("stroke-width", 3);
                    tooltip.hide();
                })
                .on("mousemove", function () {
                    tooltip.move(event.pageX, event.pageY)
                })
                .on("mouseover", function (d) {
                    d3.select(this).attr("opacity", 1).attr("stroke-width", 5);
                    tooltip.show(d.text + ": " + Math.round(d.value * 100) / 100)
                });
        }
        var self = {};
        self.update = function (newData, config) {
            data = newData;
            maxX = d3.max(data, xAccessor) + 1;
            minX = d3.min(data, xAccessor);
            applyConfig(config);
            maxY = data.length;
            minY = 0;
            xScale = createScale([xMinDomain, xMaxDomain], [0, targetWidth - padding * 2]);
            yScale = createOrdinalScale(d3.range(maxY), [padding, (elementHeight + elementPadding) * maxY + padding]);
            yAxis = createAxis(yScale, "left", d3.range(minY, maxY));
            xAxis = createAxis(xScale, "top");
            var elements = chart.selectAll("rect").data(data);
            elements.enter().append("rect")
                .on("mousemove", function () {
                    return tooltip.move(event.pageX + 15, event.pageY);
                }).on("mouseover", function (d, i) {
                    tooltip.show(yAxisTitle + i + "<br/>" + xAxisTitle + d.x);
                }).on("mouseout", function (d) {
                    tooltip.hide();
                });

            elements.attr({
                    fill: "teal",
                    height: elementHeight,
                    width: 0,
                    x: padding,
                    y: function (d, i) {
                        return ((elementHeight + elementPadding) * i) + padding + elementPadding / 2;
                    },
                }).transition().duration(1000)
                .attr({
                    width: function (d) {
                        return xScale(d.x);
                    }
                });

            elements.exit().remove();

            xAxisElement.call(xAxis);
            yAxisElement.call(yAxis);

            var mean = d3.mean(data, xAccessor);
            var deviation = d3.deviation(data, xAccessor);
            var lines = [
                {
                    text: "Mean",
                    value: mean,
                    color: "blue"
                        }, {
                    text: "Median",
                    value: d3.median(data, xAccessor),
                    color: "red"
                        }, {
                    text: "Max",
                    value: d3.max(data, xAccessor),
                    color: "green"
                        }, {
                    text: "Min",
                    value: d3.min(data, xAccessor),
                    color: "orange"
                        }, {
                    text: "Standart Deviation",
                    value: mean - deviation,
                    color: "cyan"
                        }, {
                    text: "Standart Deviation",
                    value: mean + deviation,
                    color: "cyan"
                       }
                ];

            if (legend) legend.remove(legend);
            legend = chart.append("g");
            createLines(legend, lines);
        };
        self.getStats = function () {
            var stats = {};
            stats.mean = d3.mean(data, xAccessor);
            stats.maximum = d3.max(data, xAccessor);
            stats.minimum = d3.min(data, xAccessor);
            stats.deviation = d3.deviation(data, xAccessor);
            stats.median = d3.median(data, xAccessor);
            return stats;
        };
        self.update(data, config);
        createTitle(chart, chartTitle, padding);
        createYLabel(chart, yAxisTitle, padding);
        createXLabel(chart, xAxisTitle, padding);
        self.update(data, config);
        return self;
    };

    Chart.ColorChart = function colorChartFactory(newData, config) {
        var colorChart = {};
        var data = newData;
        var targetHeight;
        var targetWidth;
        var targetId;
        var padding;
        var minDomain;
        var maxDomain;
        var chart;
        var elementSize;
        var maxX;
        var minX;
        var maxY;
        var minY;
        var xAxisBuilder;
        var colorScale;
        var xScale;
        var yScale;
        var yAxisBuilder;
        var yAxisElement;
        var xAxisElement;
        var yAxisTitle;
        var xAxisTitle;
        var chartTitle;
        var minRange;
        var maxRange;


        var xAccessor = function (d) {
            return d.x;
        }
        var yAccessor = function (d) {
            return d.y;
        }
        var colorAccessor = function (d) {
            return d.color;
        }

        function applyConfig(config) {
            targetHeight = config.height || 100;
            targetWidth = config.width || 100;

            targetId = config.target || "chart";
            padding = config.padding || 50;

            if (config.scale) {
                minDomain = config.scale.minDomain || d3.min(data, colorAccessor);
                maxDomain = config.scale.maxDomain || d3.max(data, colorAccessor);
                minRange = config.scale.minRange || 0;
                maxRange = config.scale.maxRange || 330;
            } else {
                minDomain = d3.min(data, colorAccessor);
                maxDomain = d3.max(data, colorAccessor);
                minRange = 0;
                maxRange = 330;
            }

            chart = d3.select("#" + targetId);
            elementSize = config.elementSize || 5;
            var width = (elementSize * maxX + padding * 2);
            var height = (elementSize * maxY + padding * 2);
            $("#" + targetId).width((width < targetWidth) ? targetWidth - padding : width);
            $("#" + targetId).height((height < targetWidth) ? targetWidth : height);

            yAxisTitle = (config.yAxisToUse === "specific") ? config.yAxisTitle || "Y axis" : config.overall_yAxisTitle || "Y axis";
            xAxisTitle = config.xAxisTitle || "X axis";
            chartTitle = config.chartTitle || "Color Chart";
        }

        function determineOrdinalsValues(min, max) {
            if (elementSize < 10) {
                var ticksAtEach = ((elementSize < 5) ? ((elementSize == 1) ? 10 : 5) : 2);
                var ticks = []
                var nbValue = max - min;
                for (var i = min; i < nbValue; i++) {
                    if (i % Math.floor(ticksAtEach) == 0) {
                        ticks.push(i);
                    }
                }
                return ticks;
            } else {
                return d3.range(min, max);
            }
        }

        var xPosition = function (d) {
            return xScale(d.x) + 1;
        };

        var yPosition = function (d) {
            return yScale(d.y) + 1;
        };

        var tooltip = toolTipFactory();

        function hideCellBorder(cell) {
            d3.select(cell).attr({
                stroke: "0",
                strokeWidth: 0
            });
        }

        function showCellBorder(cell) {
            d3.select(cell).attr({
                stroke: "1",
                strokeWidth: 1,
                stroke: "black"
            });
        }

        var showTooltipAndCellBorder = function (d, i) {
            showCellBorder(this);
            tooltip.show(yAxisTitle + d.y + "<br/>" + xAxisTitle + d.x + "<br/>" + chartTitle + d.color);
        }

        var hideTooltipAndCellBorder = function () {
            hideCellBorder(this);
            tooltip.hide();
        }

        var moveTooltip = function () {
            tooltip.move(event.pageX, event.pageY);
        }

        function createAxisElement() {
            yAxisElement = chart.append("g")
                .attr("class", "y axis")
                .attr("transform", "translate(" + padding + ",0)");

            xAxisElement = chart.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + padding + ")");
        }

        function updateAxisElement() {
            yAxisElement.call(yAxisBuilder);
            xAxisElement.call(xAxisBuilder).selectAll("text")
                .style("text-anchor", "start")
                .attr("dx", (maxX - minX > 10) ? "0.5em" : "-0.3em")
                .attr("dy", (maxX - minX > 10) ? "0.7em" : "0em")
                .attr("transform", function (d) {
                    return (maxX - minX > 10) ? "rotate(-65)" : "rotate(0)";
                });
        }

        colorChart.update = function (newData, config) {
            data = newData;
            maxX = d3.max(data, xAccessor) + 1;
            minX = d3.min(data, xAccessor);
            maxY = d3.max(data, yAccessor) + 1;
            minY = d3.min(data, yAccessor);
            applyConfig(config);
            colorScale = createScale([minDomain, maxDomain], [minRange, maxRange]);
            xScale = createOrdinalScale(d3.range(maxX), [padding, maxX * elementSize + padding]);
            yScale = createOrdinalScale(d3.range(maxY), [padding, maxY * elementSize + padding]);
            xAxisBuilder = createAxis(xScale, "top", determineOrdinalsValues(minX, maxX));
            yAxisBuilder = createAxis(yScale, "left", determineOrdinalsValues(minY, maxY));

            if (!yAxisElement) {
                createAxisElement();
                createTitle(chart, chartTitle, padding);

            }

            updateAxisElement();

            chart.selectAll("g.label").remove();
            createYLabel(chart, yAxisTitle, padding);
            createXLabel(chart, xAxisTitle, padding);

            var elements = chart.selectAll("rect").data(data);

            elements.enter().append("rect")
                .on("mouseout", hideTooltipAndCellBorder)
                .on("mousemove", moveTooltip)
                .on("mouseover", showTooltipAndCellBorder);


            elements.attr({
                x: xPosition,
                y: yPosition,
                width: elementSize,
                height: elementSize,
                fill: function (d, i) {
                    return "hsl(" + colorScale(d.color) + ", 100%, 50%)";
                }
            });

            elements.exit().remove();
        };
        colorChart.getStats = function () {
            var stats = {};
            stats.mean = d3.mean(data, colorAccessor);
            stats.maximum = d3.max(data, colorAccessor);
            stats.minimum = d3.min(data, colorAccessor);
            stats.deviation = d3.deviation(data, colorAccessor);
            stats.median = d3.median(data, colorAccessor);
            return stats;
        }
        colorChart.update(data, config);

        return colorChart;
    };

    Chart.NistChart = function colorChartFactory(data, config) {
        var nistChart = {};
        var targetHeight;
        var targetWidth;
        var targetId;
        var padding;
        var minDomain;
        var maxDomain;
        var chart;
        var elementWidth;
        var elementHeight;
        var maxX;
        var minX;
        var maxY;
        var minY;
        var xAxisBuilder;
        var warnRange;
        var limit;
        var xScale;
        var yScale;
        var yAxisBuilder;
        var yAxisElement;
        var xAxisElement;
        var yAxisTitle;
        var xAxisTitle;
        var chartTitle;

        var xAccessor = function (d) {
            return d.x;
        }
        var yAccessor = function (d) {
            return d.y;
        }
        var colorAccessor = function (d) {
            return d.color;
        }

        function applyConfig(config) {
            targetHeight = config.height || targetHeight || 100;
            targetWidth = config.width || targetWidth || 100;

            targetId = config.target || targetId || "chart";
            padding = config.padding || padding || 50;

            minDomain = config.minDomain || minDomain || d3.max(data, colorAccessor);
            maxDomain = config.maxDomain || maxDomain || d3.min(data, colorAccessor);

            chart = d3.select("#" + targetId);
            if (config.elementSize) {
                elementWidth = config.elementSize.width || 10;
                elementHeight = config.elementSize.height || 10;
            } else {
                elementWidth = 10;
                elementHeight = 10;
            }
            var width = (elementWidth * maxX + padding * 2)
            $("#" + targetId).width((width < targetWidth) ? targetWidth - padding : width);
            $("#" + targetId).height(elementHeight * maxY + padding * 2);

            if (config.range) {
                limit = Number(config.range.limit) || 0.01;
                warnRange = Number(config.range.warningRange) || 0.001;
            } else {
                limit = 0.01;
                warnRange = 0.001;
            }
            console.log(limit, warnRange);
            yAxisTitle = config.yAxisTitle || "Y axis";
            xAxisTitle = config.xAxisTitle || "X axis";
            chartTitle = config.chartTitle || "Nist Chart";
        }


        function determineOrdinalsValues(min, max, isForWidth) {
            var elementSize = (isForWidth) ? elementWidth : elementHeight;
            if (elementSize < 10) {
                var ticksAtEach = ((elementSize < 5) ? ((elementSize == 1) ? 10 : 5) : 2);
                var ticks = []
                var nbValue = max - min;
                for (var i = min; i < nbValue; i++) {
                    if (i % Math.floor(ticksAtEach) == 0) {
                        ticks.push(i);
                    }
                }
                return ticks;
            } else {
                return d3.range(min, max);
            }
        }

        var xPosition = function (d) {
            return xScale(d.x) + 1;
        };

        var yPosition = function (d) {
            return yScale(d.y) + 1;
        };

        var tooltip = toolTipFactory();

        function hideCellBorder(cell) {
            d3.select(cell).attr({
                stroke: "0",
                strokeWidth: 0
            });
        }

        function showCellBorder(cell) {
            d3.select(cell).attr({
                stroke: "1",
                strokeWidth: 1,
                stroke: "black"
            });
        }

        var showTooltipAndCellBorder = function (d, i) {
            showCellBorder(this);
            tooltip.show(yAxisTitle + d.y + "<br/>" + xAxisTitle + d.x + "<br/>" + chartTitle + d.color);
        }

        var hideTooltipAndCellBorder = function () {
            hideCellBorder(this);
            tooltip.hide();
        }

        var moveTooltip = function () {
            tooltip.move(event.pageX, event.pageY);
        }

        function createAxisElement() {
            yAxisElement = chart.append("g")
                .attr("class", "y axis")
                .attr("transform", "translate(" + padding + ",0)");

            xAxisElement = chart.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + padding + ")");
        }

        function updateAxisElement() {
            yAxisElement.call(yAxisBuilder);
            xAxisElement.call(xAxisBuilder).selectAll("text")
                .style("text-anchor", "start")
                .attr("dx", (maxX - minX > 10) ? "0.5em" : "-0.3em")
                .attr("dy", (maxX - minX > 10) ? "0.7em" : "0em")
                .attr("transform", function (d) {
                    return (maxX - minX > 10) ? "rotate(-65)" : "rotate(0)";
                });
        }

        nistChart.update = function (data, config) {
            maxX = d3.max(data, xAccessor) + 1;
            minX = d3.min(data, xAccessor);
            maxY = d3.max(data, yAccessor) + 1;
            minY = d3.min(data, yAccessor);
            applyConfig(config);
            xScale = createOrdinalScale(d3.range(maxX), [padding, maxX * elementWidth + padding]);
            yScale = createOrdinalScale(d3.range(maxY), [padding, maxY * elementHeight + padding]);
            xAxisBuilder = createAxis(xScale, "top", determineOrdinalsValues(minX, maxX, true));
            yAxisBuilder = createAxis(yScale, "left", determineOrdinalsValues(minY, maxY, false));

            if (!yAxisElement) {
                createAxisElement();
                createTitle(chart, chartTitle, padding);
                createYLabel(chart, yAxisTitle, padding);
                createXLabel(chart, xAxisTitle, padding);
            }
            updateAxisElement();

            var elements = chart.selectAll("rect").data(data);

            elements.enter().append("rect")
                .on("mouseout", hideTooltipAndCellBorder)
                .on("mousemove", moveTooltip)
                .on("mouseover", showTooltipAndCellBorder);

            elements.attr({
                x: xPosition,
                y: yPosition,
                width: elementWidth,
                height: elementHeight,
                fill: function (d, i) {
                    if (d.color < limit - warnRange) {
                        return "red";
                    } else if (d.color > limit + warnRange) {
                        return "green";
                    } else if (d.color < limit) {
                        return "orange";
                    } else if (d.color > limit) {
                        return "lightgreen";
                    } else {
                        return "black";
                    }
                }
            });
            elements.exit().remove();
        };
        nistChart.update(data, config);
        return nistChart;
    };

    return Chart;
})();
