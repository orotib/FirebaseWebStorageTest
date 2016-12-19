// Inicializáljuk a Firebase-t.
var config = {
	apiKey: "AIzaSyB70-mwJZMagnojGQ6vT6Vc2uT5o_45JO8",
    authDomain: "myfaboloustestproject.firebaseapp.com",
    databaseURL: "https://myfaboloustestproject.firebaseio.com",
    storageBucket: "myfaboloustestproject.appspot.com",
    messagingSenderId: "507058623801"
};
firebase.initializeApp(config);

var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('uploadButton');

// Várjuk a fájl kiválasztását.
fileButton.addEventListener('change', function(e) {
	// Megkapjuk a fájlt.
	var file = e.target.files[0];

	// Storage és Database referenciája.
	var storageRef = firebase.storage().ref('files/' + file.name);
	var dbRef = firebase.database().ref().child('files');

	// Feltöltjük a fájlt a Storage-ban lévő 'files' mappába.
	var task = storageRef.put(file);
	// És hozzáadjuk az adatbázisban lévő 'files' objektumnak gyerekként a fájl nevét. (letöltéshez szükséges)
	dbRef.push(file.name);

	// Frissítjük a letöltést jelző sávot.
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
