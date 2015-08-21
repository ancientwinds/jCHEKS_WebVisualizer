function ButterflyEffect(dataReader) {
    var systemIds = dataReader.getSystemNameForAType("butterflyName");

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
    function getOverallData(){
        return dataReader.sendDataRequest({
            formatter: dataReader.overallDataFormatter,
            type: "overallButterfly",
        });
    }

    function getData(currentId){
        return dataReader.sendDataRequest({
            formatter: dataReader.butterflyDataFormatter,
            type: "butterfly",
            system: systemIds[currentId],
            limitedRow: "evolution_count"
        });
    }

    var chart = Chart.ColorChart(getData(0), config);

    function updateConfig() {
        colorChartSidebar.updateConfigs(config);
    }

    function updateChart(currentId) {
        chart.update(getData(currentId), config);
        colorChartSidebar.updateStats(chart.getStats());
    }

    var updater = {
        loadASystem: function (currentId) {
            updateConfig();
            updateChart(currentId);
        },
        loadAllSystems: function () {
            chart.update(getOverallData(), config);
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
