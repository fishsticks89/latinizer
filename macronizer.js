var char = ["&#x0101", "&#x0113", "&#x012B", "&#x014D", "&#x016B"];
var id = ["0101", "00113", "0012B", "0014D", "0016B"];
var text = "";

for (i = 0; i < char.length; i++) {
    text += "<button id=\"" + id[i] + "\">" + char[i] + "</button>\n";
}

document.getElementById("buttons").innerHTML = text;