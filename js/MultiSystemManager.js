var MultiSystemManager = function (systemIds, updater) {
    var currentSpecificId = 0;
    var switchButton;
    var navButtons;
    var isOverall = false;

    function createNavigationButtons(onPreviousClick, onNextClick) {
        var previousButton = $("<button>").text("Previous").click(onPreviousClick)
        var nextButton = $("<button>").text("Next").click(onNextClick);
        return $("<div>").append(previousButton).append(nextButton);
    }

    function incrementSpecificId() {
        currentSpecificId++;
        if (currentSpecificId >= systemIds.length) currentSpecificId = 0;
    }

    function decrementSpecificId() {
        currentSpecificId--;
        if (currentSpecificId < 0) currentSpecificId = systemIds.length - 1;
    }

    var update = function () {
        updater.loadASystem(currentSpecificId);
    };

    var onNext = function () {
        incrementSpecificId();
        update()
    };

    var onPrevious = function () {
        decrementSpecificId();
        update()
    };

    updater.update = update();

    var onSwitchClick = function () {
        if (isOverall) {
            isOverall = false;
            updater.loadASystem(currentSpecificId);
            updater.update = update;
            navButtons.show();
            switchButton.text("Switch to overall");
            updater.updateButton.click(updater.update);
        } else {
            isOverall = true;
            navButtons.hide();
            updater.loadAllSystems();
            updater.update = updater.loadAllSystems;
            switchButton.text("Switch to specific");
            updater.updateButton.click(updater.update);
        }
    }
    updater.update = update;
    updater.updateButton.click(updater.update);
    switchButton = $("<button>").text("Switch to overall").click(onSwitchClick);
    navButtons = createNavigationButtons(onPrevious, onNext);
    return $("<div>").attr("id", "switcher").append(switchButton).append("<br>").append(navButtons);
}
