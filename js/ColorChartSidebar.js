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
    sidebar.scale.minRangeInput = null; // Not implemented
    sidebar.scale.maxRangeInput = null; // Not implemented

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
        configToUpdate.scale.minDomain = sidebar.scale.minDomainInput.val();
        configToUpdate.scale.maxDomain = sidebar.scale.maxDomainInput.val();
    };
    self.getHTML = function () {
        var scaleSettings = $("<div>").attr("id", mainId + "ScaleSettings");
        scaleSettings
            .append(sidebar.scale.minDomainInput)
            .append("<br>")
            .append(sidebar.scale.maxDomainInput)
            //.append(sidebar.scale.minRangeInput) Not implemented
            //.append(sidebar.scale.maxRangeInput) Not implemented
        return scaleSettings;
    }
    return self;
}
