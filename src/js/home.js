$(".avatar").on("click", () => window.open('https://github.com/marvinborner', '_blank'));

// Calculate age
const birthday = new Date(2002,12,18);
const ageDiff = Date.now() - birthday.getTime();
const ageDate = new Date(ageDiff);
$("#age").text(Math.abs(ageDate.getUTCFullYear() - 1970));