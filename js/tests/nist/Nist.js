function Nist(dataReader) {

    var id = "nist";
    Layout.addTab(id, "Nist");

    var config = {
        height: Layout.getContainerHeight(),
        width: Layout.getContainerWidth(),
        target: id + "Svg",
        limit: 0.01,
        warningRange: 0.001,
        yAxisTitle: "System",
        xAxisTitle: "Test",
        chartTitle: "Nist tests"
    };
    var x = Chart.NistChart(dataReader.getNist(), config);

}