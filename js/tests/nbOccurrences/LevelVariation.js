function nbOccurrences_LevelVariation(dataReader) {
    var id = "levelVariation";
    var systemIds = dataReader.getSystemNameForAType("levelsVariationName");
    var updateButton = $("<button>").text("update");
    Layout.addTab(id, "Nb occurrences Level Variation");
    var colorChartSidebar = ColorChartSidebar(id);
    var config = {
        height: Layout.getContainerHeight(),
        width: Layout.getContainerWidth(),
        target: id + "Svg",
        yAxisTitle: "Agent",
        overall_yAxisTitle: "System",
        yAxisToUse: "specific",
        xAxisTitle: "Variation",
        chartTitle: "Occurrences of level variation"
    };
    function getData(){
        return dataReader;
    }
    function updateConfig() {
        colorChartSidebar.updateConfigs(config);
    }

    function updateChart(currentId) {
        chart.update(dataReader.getVariationOccurences(systemIds[currentId]), config);
        colorChartSidebar.updateStats(chart.getStats());
    }

    var chart = Chart.ColorChart(dataReader.getVariationOccurences(systemIds[0]), config);

    var updater = {
        loadASystem: function (currentId) {
            updateConfig();
            updateChart(currentId);
        },
        loadAllSystems: function () {
            chart.update(dataReader.getOverallVariationOccurences(), config);
            colorChartSidebar.updateStats(chart.getStats());
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
