function DistanceEvolution(dataReader) {
    var id = "distance";

    Layout.addTab(id, "Distance between evolution");

    var colorChartSidebar = ColorChartSidebar(id);
    var config = {
        height: Layout.getContainerHeight(),
        width: Layout.getContainerWidth(),
        target: id + "Svg",
        yAxisTitle: "System ",
        xAxisTitle: "Evolution ",
        chartTitle: "Distance between evolution ",
        limit: {}
    };
    var systemIds = dataReader.getSystemNameForAType("namesForDistanceEvolution");
    function getDataForASystem (currentId) {
        return dataReader.sendDataRequest({
            formatter: dataReader.distanceDataFormatter,
            type: "distanceEvolution",
            system: systemIds[currentId],
            limit: config.limit.x
        });
    };

    function getData() {
        var allDistanceData = [];
        for (var i = 0; i < systemIds.length; i++) {
            allDistanceData = allDistanceData.concat(getDataForASystem(i));
        }
        return allDistanceData;
    };

    var chart = Chart.ColorChart(getData(), config);


    function updateConfig() {
        colorChartSidebar.updateConfigs(config);
    }

    function updateChart() {
        chart.update(getData(), config);
        colorChartSidebar.updateStats(chart.getStats());
    }

    var update = function () {
        updateConfig();
        updateChart();
    }

    var sideBarContents = [];
    sideBarContents.push(colorChartSidebar.getHTML());
    sideBarContents.push($("<button>").text("update").click(update));
    Layout.setSidebarContent(id, sideBarContents);
}
