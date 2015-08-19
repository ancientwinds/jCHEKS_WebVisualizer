function ButterflyEffect(dataReader) {
    var systemIds = dataReader.getSystemNamesForButterflyEffect();

    var id = "butterfly";
    var updateButton = $("<button>").text("update");
    Layout.addTab(id, "Butterfly Effect");
    var colorChartSidebar = ColorChartSidebar(id);
    var updateButton;

    var config = {
        height: Layout.getContainerHeight(),
        width: Layout.getContainerWidth(),
        target: id + "Svg",
        yAxisTitle: "Clone",
        overall_yAxisTitle: "System",
        xAxisTitle: "Evolution",
        yAxisToUse: "specific",
        chartTitle: "Distance (Butterfly)"
    };

    var chart = Chart.ColorChart(dataReader.getButterflyEffect(systemIds[0]), config);

    function updateConfig() {
        colorChartSidebar.updateConfigs(config);
    }

    function updateChart(currentId) {
        chart.update(dataReader.getButterflyEffect(systemIds[currentId]), config);
        colorChartSidebar.updateStats(chart.getStats());
    }

    var updater = {
        loadASystem: function (currentId) {
            updateConfig();
            updateChart(currentId);
        },
        loadAllSystems: function () {
            chart.update(dataReader.getOverallButterflyEffect(), config);
            ColorChartSidebar.updateStats(chart.getStats());
        },
        update: null,
        updateButton: updateButton,
        config: config
    };
    updateButton.click(updater.update);

    var sideBarContents = [];
    sideBarContents.push(MultiSystemManager(systemIds, updater));
    sideBarContents.push(colorChartSidebar.getHTML());
    sideBarContents.push(updateButton);
    Layout.setSidebarContent(id, sideBarContents);
}
