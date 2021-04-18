var char = ["&#x0101", "&#x0113", "&#x012B", "&#x014D", "&#x016B"];
var id = ["U+0101", "U+00113", "U+0012B", "U+0014D", "U+0016B"];
var text = "";

for (i = 0; i < char.length; i++) {
    text += "<button id=\"" + id[i] + "\">" + char[i] + "</button>\n";
}

document.getElementById("buttons").innerHTML = text;