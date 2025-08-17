// Initialize Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Visa form submission
document.getElementById('visaForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Collect form data
    const formData = {
        fullName: document.getElementById('fullName').value,
        rank: document.getElementById('rank').value,
        passportNumber: document.getElementById('passportNumber').value,
        dob: document.getElementById('dob').value,
        serviceNumber: document.getElementById('serviceNumber').value,
        visaType: document.getElementById('visaType').value,
        additionalInfo: document.getElementById('additionalInfo').value,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    // Save to Firestore
    db.collection('visaApplications').add(formData)
        .then(() => {
            alert('Application submitted successfully!');
            document.getElementById('visaForm').reset();
        })
        .catch(error => {
            console.error('Error submitting application:', error);
            alert('Error submitting application');
        });
});
