$(function () {
    const showWorkBtn = $("#showWorkBtn");
    const closeWorkBtn = $("#closeWorkBtn");
    const homeContent = $(".homeContent");
    const myWorkWrapper = $(".myWorkWrapper");

    showWorkBtn.on("click", () => {
        toggleDesign();
        displayRepos();
    });

    closeWorkBtn.on("click", () => toggleDesign());

    function toggleDesign() {
        let a = homeContent,
            b = myWorkWrapper;
        if (myWorkWrapper.is(":visible")) {
            b = [a, a = b][0];
        }
        a.fadeToggle(1500);
        setTimeout(() => b.fadeToggle(), 1500);
    }

    function displayRepos() {
        const RepoJson = getRepoJson();

        $.each(RepoJson, (index, item) => {
            console.log(item);
        });
    }

    function getRepoJson() {
        let marvinborner, Texx;
        $.get({
            async: false,
            url: "https://api.github.com/users/marvinborner/repos"
        }).done((response) => {
            marvinborner = response;
        });
        $.get({
            async: false,
            url: "https://api.github.com/users/BEAM-Messenger/repos"
        }).done((response) => {
            Texx = response;
        });
        const mergedRepos = $.merge(Texx, marvinborner);
        return mergedRepos;
    }
});