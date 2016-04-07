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
	return new Promise(
		function (res, rej) {
			fakeAjax(file, resolve);
		}
	);
}

// request all files at once in "parallel"
// ???
getFile('file1')
.then(function(text) {
	output(text);
	return getFile('file2');
})
.then(function(text) {
	output(text);
	return getFile('file');
})
.then(function(text) {
	output(text);
	output('complete!');
});