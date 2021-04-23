var char = ["&#x0101", "&#x0113", "&#x012B", "&#x014D", "&#x016B"];
var code = ["257", "275", "299", "333", "363"];
var text = "";

for (i = 0; i < char.length; i++) {
    text += "<button id=\"" + code[i] + "\">" + char[i] + "</button>\n";
}

document.getElementById("buttons").innerHTML = text;