function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************

function getFile(file) {
	return ASQ(function(done){
		fakeAjax(file,done);
	});
}

// Request all files at once in
// "parallel" via `getFile(..)`.
//
// Render as each one finishes,
// but only once previous rendering
// is done.


// Solution 1
/*ASQ()
.runner(function *main() {
	var p1 = getFile('file1');
	var p2 = getFile('file2');
	var p3 = getFile('file3');

	var text1 = yield p1;
	output(text1);

	var text2 = yield p2;
	output(text2);

	var text3 = yield p3;
	output(text3);

	output('Complete!');
});*/

// Solution 2
ASQ()
.runner(function *main() {
	var p1 = getFile('file1');
	var p2 = getFile('file2');
	var p3 = getFile('file3');

	output(yield p1);
	output(yield p2);
	output(yield p3);

	output('Complete!');
});
