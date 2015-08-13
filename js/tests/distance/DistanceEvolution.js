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
        chartTitle: "Distance between evolution "
    };

    var chart = Chart.ColorChart(dataReader.getDistanceEvolution(), config);


    function updateConfig() {
        colorChartSidebar.updateConfigs(config);
    }

    function updateChart() {
        chart.update(dataReader.getDistanceEvolution(), config);
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
