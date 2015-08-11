var ColorChartSidebar = function (mainId) {

    function createScaleInput(id, caption) {
        return $("<span>").addClass("setting")
            .append($("<label>").text(caption))
            .append($("<input>").attr("type", "number").attr("min", "0").attr("id", mainId + id));
    }

    var sidebar = {};

    sidebar.scale = {};
    sidebar.scale.minDomainInput = createScaleInput("ColorMinDomain", "Min");
    sidebar.scale.maxDomainInput = createScaleInput("ColorMaxDomain", "Max");
    sidebar.scale.minRangeInput = createScaleInput("ColorMinRange", "Min");
    sidebar.scale.maxRangeInput = createScaleInput("ColorMaxRange", "Max");

    sidebar.elementSize = {};
    sidebar.elementSize.heightInput = null; // Not implemented
    sidebar.elementSize.widthInput = null; // Not implemented

    sidebar.white = {};
    sidebar.white.min = null; // Not implemented
    sidebar.white.max = null; // Not implemented

    sidebar.black = {};
    sidebar.black.max = null; // Not implemented
    sidebar.black.min = null; // Not implemented

    var self = {};
    self.updateConfigs = function (configToUpdate) {
        configToUpdate.scale = {};
        configToUpdate.scale.minDomain = sidebar.scale.minDomainInput.children().eq(1).val();
        configToUpdate.scale.maxDomain = sidebar.scale.maxDomainInput.children().eq(1).val();
        configToUpdate.scale.minRange = sidebar.scale.minRangeInput.children().eq(1).val();
        configToUpdate.scale.maxRange = sidebar.scale.maxRangeInput.children().eq(1).val();
    };

    self.getHTML = function () {
        var scaleSettings = $("<div>").attr("id", mainId + "ScaleSettings");
        scaleSettings
            .append($("<p>").text("Domain"))
            .append(sidebar.scale.minDomainInput)
            .append("<br>")
            .append(sidebar.scale.maxDomainInput)
            .append("<br>").append("<br>")
            .append($("<p>").text("Range"))
            .append(sidebar.scale.minRangeInput)
            .append("<br>")
            .append(sidebar.scale.maxRangeInput);

        return scaleSettings;
    }
    return self;
}
