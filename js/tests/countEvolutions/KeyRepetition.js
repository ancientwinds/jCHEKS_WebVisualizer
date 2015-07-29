function KeyRepetition(dataReader) {


    var id = "KeyRepetitions";
    Layout.addTab(id, "KeyRepetition");
    var data = dataReader.getKeyRepetitions();
    if (data) {
        var x = Chart.createBarChart(data, {
            height: Layout.getContainerHeight(),
            width: Layout.getContainerWidth(),
            target: id + "Svg",
            yAxisTitle: "System",
            xAxisTitle: "Evolutions",
            chartTitle: "Evolutions to see a key repeatition"
        });
    }

}