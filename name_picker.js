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
    console.log(assignment);

    return btoa(JSON.stringify(assignment));
}

function pickName(code, giver) {
    var assignment = JSON.parse(atob(code));
    return assignment[giver];
}

function getNames(code) {
    var assignment = JSON.parse(atob(code));
    return Object.keys(assignment);
}
