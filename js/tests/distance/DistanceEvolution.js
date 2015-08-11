function DistanceEvolution(dataReader) {
    var id = "distance";

    Layout.addTab(id, "Distance between evolution");

    var colorChartSidebar = ColorChartSidebar(config);
    var config = {
        height: Layout.getContainerHeight(),
        width: Layout.getContainerWidth(),
        target: id + "Svg",
        yAxisTitle: "System ",
        xAxisTitle: "Evolution ",
        chartTitle: "Distance between evolution "
    };

    var chart = Chart.colorChart(dataReader.getDistanceEvolution(), config);


    function updateConfig() {
        config.minDomain = $("#" + id + "MinDomain").val() || config.minDomain;
        config.maxDomain = $("#" + id + "MaxDomain").val() || config.maxDomain;
    }

    function updateChart() {
        chart.update(dataReader.getDistanceEvolution(), config)
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
