// Initialize Firebase (same configuration as app.js)
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

// Load forum topics
function loadForumTopics() {
    db.collection('forumTopics').orderBy('timestamp', 'desc').get()
        .then(snapshot => {
            const topicsContainer = document.getElementById('forumTopics');
            topicsContainer.innerHTML = '';
            
            snapshot.forEach(doc => {
                const topic = doc.data();
                const topicElement = document.createElement('a');
                topicElement.href = `#`;
                topicElement.className = 'list-group-item list-group-item-action';
                topicElement.innerHTML = `
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">${topic.title}</h5>
                        <small>${new Date(topic.timestamp.toDate()).toLocaleDateString()}</small>
                    </div>
                    <p class="mb-1">${topic.content.substring(0, 100)}...</p>
                    <small>Posted by: ${topic.author} | Category: ${topic.category}</small>
                `;
                topicsContainer.appendChild(topicElement);
            });
        })
        .catch(error => {
            console.error('Error loading topics:', error);
        });
}

// Create new topic
document.getElementById('saveTopic')?.addEventListener('click', function() {
    const title = document.getElementById('topicTitle').value;
    const content = document.getElementById('topicMessage').value;
    const category = document.getElementById('topicCategory').value;
    
    if (title && content) {
        db.collection('forumTopics').add({
            title: title,
            content: content,
            category: category,
            author: 'Anonymous User', // In real app, get from auth
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            alert('Topic created successfully!');
            document.getElementById('newTopicForm').reset();
            const modal = bootstrap.Modal.getInstance(document.getElementById('newTopicModal'));
            modal.hide();
            loadForumTopics();
        })
        .catch(error => {
            console.error('Error creating topic:', error);
        });
    }
});

// Initial load
document.addEventListener('DOMContentLoaded', loadForumTopics);
