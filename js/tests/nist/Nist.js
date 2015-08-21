function Nist(dataReader) {

    var id = "nist";
    Layout.addTab(id, "Nist");
    var nistChartSidebar = NistChartSidebar(id);
    function getData(){
        var allNistData = [];
        allNistData = allNistData.concat(dataReader.sendDataRequest({
            formatter: dataReader.NISTDataFormatter,
            type: "nist1"
        }));

        allNistData = allNistData.concat(dataReader.sendDataRequest({
            formatter: dataReader.NISTDataFormatter,
            type: "nist2"
        }));

        allNistData = allNistData.concat(dataReader.sendDataRequest({
            formatter: dataReader.NISTDataFormatter,
            type: "nist3"
        }));

        allNistData = allNistData.concat(dataReader.sendDataRequest({
            formatter: dataReader.NISTDataFormatter,
            type: "nist4"
        }));

        allNistData = allNistData.concat(dataReader.sendDataRequest({
            formatter: dataReader.NISTDataFormatter,
            type: "nist5"
        }));

        allNistData = allNistData.concat(dataReader.sendDataRequest({
            formatter: dataReader.NISTDataFormatter,
            type: "nist9"
        }));

        allNistData = allNistData.concat(dataReader.sendDataRequest({
            formatter: dataReader.NISTDataFormatter,
            type: "nist10"
        }));
        return allNistData;
    }
    var config = {
        height: Layout.getContainerHeight(),
        width: Layout.getContainerWidth(),
        target: id + "Svg",
        yAxisTitle: "System",
        xAxisTitle: "Test",
        chartTitle: "Nist tests"
    };

    var chart = Chart.NistChart(getData(), config);

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
