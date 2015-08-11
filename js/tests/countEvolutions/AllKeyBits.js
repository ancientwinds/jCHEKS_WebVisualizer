    function countEvolution_AllKeyBits(dataReader) {

        Layout.addTab("keyBits", "AllKeyBits");
        var id = "keyBits";
        Chart.BarChart(dataReader.getAllKeybits(), {
            height: Layout.getContainerHeight(),
            width: Layout.getContainerWidth(),
            target: id + "Svg",
            yAxisTitle: "System",
            xAxisTitle: "Evolutions",
            chartTitle: "Evolutions to see all bits of key"
        });

    }
