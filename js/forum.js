// Initialize Firebase (same configuration as app.js)
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
