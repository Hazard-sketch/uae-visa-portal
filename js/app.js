// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBJ4NT0v2oimLohr7ILdyzARTZtcfO2abI",
  authDomain: "uae-visa-portal.firebaseapp.com",
  projectId: "uae-visa-portal",
  storageBucket: "uae-visa-portal.firebasestorage.app",
  messagingSenderId: "418736862504",
  appId: "1:418736862504:web:dc6097da7b9c92b2cfcc1d",
  measurementId: "G-WQF9M9PX24"
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
