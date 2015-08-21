var ColorChartSidebar = function (mainId) {

    function createScaleInput(id, caption) {
        return $("<span>").addClass("setting")
            .append($("<label>").text(caption))
            .append($("<input>").attr("type", "number").attr("min", "0").attr("id", mainId + id));
    }
    function getInputValue(element){
        return element.children().eq(1).val();
    }
    var sidebar = {};

    sidebar.scale = {};
    sidebar.scale.minDomainInput = createScaleInput("ColorMinDomain", "Min");
    sidebar.scale.maxDomainInput = createScaleInput("ColorMaxDomain", "Max");
    sidebar.scale.minRangeInput = createScaleInput("ColorMinRange", "Min");
    sidebar.scale.maxRangeInput = createScaleInput("ColorMaxRange", "Max");

    sidebar.elementSize = createScaleInput("Size", "Size");

    sidebar.black = {};
    sidebar.black.maxInput = createScaleInput("BlackMinRange", "Max");
    sidebar.black.minInput = createScaleInput("BlackMinRange", "Min");

    sidebar.grey = {};
    sidebar.grey.maxInput = createScaleInput("GreyMinRange", "Max");
    sidebar.grey.minInput = createScaleInput("GreyMinRange", "Min");

    sidebar.white = {};
    sidebar.white.maxInput = createScaleInput("WhiteMinRange", "Max");
    sidebar.white.minInput = createScaleInput("WhiteMinRange", "Min");

    sidebar.limit = {}
    sidebar.limit.xInput = createScaleInput("LimitX", "X");
    sidebar.limit.yInput = createScaleInput("LimitY", "Y");

    sidebar.stats = $("<div>");

    var self = {};
    self.updateConfigs = function (configToUpdate) {
        configToUpdate.scale = {};
        configToUpdate.scale.minDomain = getInputValue(sidebar.scale.minDomainInput);
        configToUpdate.scale.maxDomain = getInputValue(sidebar.scale.maxDomainInput);
        configToUpdate.scale.minRange = getInputValue(sidebar.scale.minRangeInput);
        configToUpdate.scale.maxRange = getInputValue(sidebar.scale.maxRangeInput);

        configToUpdate.black = {};
        configToUpdate.black.max = getInputValue(sidebar.black.maxInput);
        configToUpdate.black.min = getInputValue(sidebar.black.minInput);

        configToUpdate.grey = {};
        configToUpdate.grey.max = getInputValue(sidebar.grey.maxInput);
        configToUpdate.grey.min = getInputValue(sidebar.grey.minInput);

        configToUpdate.white = {};
        configToUpdate.white.max = getInputValue(sidebar.white.maxInput);
        configToUpdate.white.min = getInputValue(sidebar.white.minInput)

        configToUpdate.limit = {};
        configToUpdate.limit.x = getInputValue(sidebar.limit.xInput);
        configToUpdate.limit.y = getInputValue(sidebar.limit.yInput);

        configToUpdate.elementSize = getInputValue(sidebar.elementSize);

    };

    self.getHTML = function () {
        var scaleSettings = $("<div>").attr("id", mainId + "ScaleSettings");
        scaleSettings
            .append("<hr>")
            .append($("<strong>").text("Scale domain"))
            .append("<br>")
            .append(sidebar.scale.minDomainInput)
            .append("<br>")
            .append(sidebar.scale.maxDomainInput)
            .append("<br>").append("<br>")
            .append($("<strong>").text("Scale range"))
            .append("<br>")
            .append(sidebar.scale.minRangeInput)
            .append("<br>")
            .append(sidebar.scale.maxRangeInput)
            .append("<hr>")
            .append($("<strong>").text("Dimension"))
            .append("<br>")
            .append(sidebar.elementSize)
            .append("<br>")
            .append("<hr>")
            .append($("<strong>").text("Black range"))
            .append("<br>")
            .append(sidebar.black.minInput)
            .append("<br>")
            .append(sidebar.black.maxInput)
            .append("<hr>")
            .append($("<strong>").text("Grey range"))
            .append("<br>")
            .append(sidebar.grey.minInput)
            .append("<br>")
            .append(sidebar.grey.maxInput)
            .append("<hr>")
            .append($("<strong>").text("White range"))
            .append("<br>")
            .append(sidebar.white.minInput)
            .append("<br>")
            .append(sidebar.white.maxInput)
            .append("<hr>")
            .append($("<strong>").text("Limits"))
            .append("<br>")
            .append(sidebar.limit.xInput)
            .append("<br>")
            .append(sidebar.limit.yInput)
            .append("<hr>")
            .append($("<strong>").text("Stats"))
            .append(sidebar.stats)
            .append("<br>");

        return scaleSettings;
    };

    self.updateStats = function (stats) {
        sidebar.stats.text("");
        sidebar.stats
            .append("Min: " + stats.minimum + "<br>")
            .append("Max: " + stats.maximum + "<br>")
            .append("Mean: " + Math.round(stats.mean) + "<br>")
            .append("Median: " + stats.median + "<br>")
            .append("Deviation: " + Math.round(stats.deviation) + "<br>")
            .append("<br>");
    };

    return self;
}
