let requestResult;
const dynamicStats = $("#dynamicStats");
const requestData = "{\n" +
    "    profile(username: \"marvinborner\") {\n" +
    "    \ttotal_langs: languages {name xp}\n" +
    "\t\trecent_langs: languages(since: \"2018-09-07T01:07:09.500Z\") {name xp}\n" +
    "\t\ttotal_machines: machines {name xp}\n" +
    "\t\trecent_machines: machines(since: \"2018-09-07T01:07:09.503Z\") {name xp}\n" +
    "\t\tday_language_xps: dayLanguageXps(since: \"2018-08-24\") {date language xp}\n" +
    "\t\tday_of_year_xps: dayOfYearXps\n" +
    "\t\thour_of_day_xps: hourOfDayXps\n" +
    "    }\n" +
    "}";

jQuery.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});

$.post({
    url: "https://codestats.net/profile-graph",
    crossDomain: true,
    contentType: "text/plain",
    data: requestData,
    beforeSend: () => dynamicStats.text("Loading... (can take up to 20s)"),
    success: (result) => {
        requestResult = result;
        renderStats()
    }
});

function renderStats() {
    dynamicStats.html("Last used programming language: <b>" + getTodaysLangs().slice(-1)[0] + "</b><br><br>");
    dynamicStats.append("Most used programming language overall: <b>" + getMostUsedLang() + "<br><br>");
    dynamicStats.append("Programming languages used today: <br><b>" + getTodaysLangs().join("<br>") + "<b>");
}

function getMostUsedLang() {
    return requestResult.data.profile.total_langs.reduce((prev, current) => (prev.xp > current.xp) ? prev : current).name
}

function getTodaysLangs() {
    const objects = requestResult.data.profile.day_language_xps.filter(obj => {
        return obj.date === new Date().toISOString().slice(0, 10);
    });
    return objects.map(value => value.language)
}