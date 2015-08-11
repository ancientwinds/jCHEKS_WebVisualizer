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
        yAxisTitle: "System",
        xAxisTitle: "Evolution",
        chartTitle: "Distance (Butterfly)"
    };

    var chart = Chart.colorChart(dataReader.getButterflyEffect(systemIds[0]), config);

    function updateConfig() {
        colorChartSidebar.updateConfigs(config);
    }

    function updateChart(currentId) {
        chart.update(dataReader.getButterflyEffect(systemIds[currentId]), config)
    }

    var updater = {
        loadASystem: function (currentId) {
            updateConfig();
            updateChart(currentId);
        },
        loadAllSystems: function () {
            chart.update(dataReader.getOverallButterflyEffect(), config)
        },
        update: null,
        updateButton: updateButton
    };
    updateButton.click(updater.update);

    var sideBarContents = [];
    sideBarContents.push(MultiSystemManager(systemIds, updater));
    sideBarContents.push(colorChartSidebar.getHTML());
    sideBarContents.push(updateButton);
    Layout.setSidebarContent(id, sideBarContents);
}
