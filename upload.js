// Initialize Firebase
var config = {
	// YOUR API KEY
};
firebase.initializeApp(config);

// Get elements
var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('fileButton');

// Listen for file selection
fileButton.addEventListener('change', function(e) {
	// Get File
	var file = e.target.files[0];

	// Create a storage ref
	var storageRef = firebase.storage().ref('files/' + file.name);

	// Upload file
	var task = storageRef.put(file);

	// Update progress bar
	task.on('state_changed',
		function progress(snapshot) {
			var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
			uploader.value = percentage;
		},

		function error(err) {

		},

		function complete() {
			
		}
	);
});