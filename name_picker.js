function createCode(names) {
    if (names.length < 2) return null;

    function makeAssignment() {
	var assignment = {};
	var recipients = names.slice();

	for (var i = 0; i < names.length; i++) {
	    var candidates = recipients.slice();
	    var recipient =
		candidates[Math.floor(Math.random() * candidates.length)];
	    assignment[names[i]] = recipient;
	    recipients.splice(recipients.indexOf(recipient), 1);
	}

	return assignment;
    }

    var assignment;

    while (true) {
	assignment = makeAssignment();
	var anyEqual = false;
	for (var giver in assignment)
	    if (giver == assignment[giver])
		anyEqual = true;
	if (!anyEqual) break;
    }

    return encode(JSON.stringify(assignment));
}

function pickName(code, giver) {
    var assignment = JSON.parse(decode(code));
    return assignment[giver];
}

function getNames(code) {
    var assignment = JSON.parse(decode(code));
    return Object.keys(assignment);
}

function encode(str) {
    var numSpaces = Math.floor(Math.random() * 3);
    return btoa(shiftBackward(" ".repeat(numSpaces) + str));
}

function decode(str) {
    return shiftForward(atob(str));
}

function shiftChars(str, shift) {
    return str.split("")
	      .map(ch => String.fromCharCode(ch.charCodeAt(0) + shift))
	      .join("");
}

function shiftBackward(str) { return shiftChars(str, -1); }
function shiftForward(str) { return shiftChars(str, 1); }
