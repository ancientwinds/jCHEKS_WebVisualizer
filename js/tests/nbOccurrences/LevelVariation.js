function nbOccurrences_LevelVariation(dataReader) {
    var id = "levelVariation";
    var systemIds = dataReader.getSystemNamesForLevelVariation();
    var updateButton = $("<button>").text("update");
    Layout.addTab(id, "Nb occurrences Level Variation");
    var colorChartSidebar = ColorChartSidebar(config);
    var config = {
        height: Layout.getContainerHeight(),
        width: Layout.getContainerWidth(),
        target: id + "Svg",
        yAxisTitle: "Agent",
        xAxisTitle: "Variation",
        chartTitle: "Occurrences of level variation"
    };

    function updateConfig() {
        config.minDomain = $("#" + id + "MinDomain").val() || config.minDomain;
        config.maxDomain = $("#" + id + "MaxDomain").val() || config.maxDomain;
    }

    function updateChart(currentId) {
        chart.update(dataReader.getVariationOccurences(systemIds[currentId]), config)
    }

    var chart = Chart.colorChart(dataReader.getVariationOccurences(systemIds[0]), config);

    var updater = {
        loadASystem: function (currentId) {
            updateConfig();
            updateChart(currentId);
        },
        loadAllSystems: function () {
            chart.update(dataReader.getOverallVariationOccurences(), config)
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
