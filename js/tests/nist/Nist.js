function Nist(dataReader) {

    var id = "nist";
    Layout.addTab(id, "Nist");
    var nistChartSidebar = NistChartSidebar(id);

    var config = {
        height: Layout.getContainerHeight(),
        width: Layout.getContainerWidth(),
        target: id + "Svg",
        yAxisTitle: "System",
        xAxisTitle: "Test",
        chartTitle: "Nist tests"
    };

    var chart = Chart.NistChart(dataReader.getNist(), config);

    function updateConfig() {
        nistChartSidebar.updateConfigs(config);
    }

    function updateChart() {
        chart.update(dataReader.getNist(), config);
    }

    var update = function () {
        updateConfig();
        updateChart();
    }

    var sideBarContents = [];
    sideBarContents.push(nistChartSidebar.getHTML());
    sideBarContents.push($("<button>").text("update").click(update));
    Layout.setSidebarContent(id, sideBarContents);
}
