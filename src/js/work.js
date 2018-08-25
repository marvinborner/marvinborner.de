$(function () {
    const showWorkBtn = $("#showWorkBtn");
    const closeWorkBtn = $("#closeWorkBtn");
    const homeContent = $(".homeContent");
    const myWorkWrapper = $(".myWorkWrapper");
    const workGrid = $(".workGrid");
    const gridBox = $(".gridBox");

    showWorkBtn.on("click", () => {
        toggleDesign();
        //displayRepos(); // currently not needed
    });

    closeWorkBtn.on("click", () => toggleDesign());

    function toggleDesign() {
        let a = myWorkWrapper,
            b = homeContent;

        if (homeContent.is(":visible")) {
            b = [a, a = b][0];
            //workGrid.empty();
        }

        a.fadeToggle(1500);
        setTimeout(() => b.fadeToggle(), 1500);
    }

    /*
    function displayRepos() {
        const RepoJson = getRepoJson();

        $.each(RepoJson, (index, it) => {
            if (index < 6) {
                workGrid.append(`
                <div class="gridBox">${it.name}</div>
                `);
            }
        });
    }

    function getRepoJson() {
        let marvinborner, Texx;
        $.get({
            async: false, // TODO:Async ajax
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
    */
});