$(function () {
    const homeContent = $(".homeContent");
    const actionButtons = $("[data-action]");

    actionButtons.click((e) => toggleDesign($("." + $(e.currentTarget).attr('data-action') + "Overlay")));

    function toggleDesign(action) {
        let a = action,
            b = homeContent;

        if (homeContent.is(":visible")) {
            b = [a, a = b][0];
        }

        a.fadeToggle(1500);
        setTimeout(() => b.fadeToggle(), 1500);
    }
});