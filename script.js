// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getFirestore, collection, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAFQFkMzU0ZqwUm-U46oObc8YYLOa8wnBw",
    authDomain: "gate-prep-tracker.firebaseapp.com",
    projectId: "gate-prep-tracker",
    storageBucket: "gate-prep-tracker.firebasestorage.app",
    messagingSenderId: "203856361148",
    appId: "1:203856361148:web:931d8b55a531b617a0c2b9",
    measurementId: "G-3Y1Y9D2FSV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', async function () {
    const topicsBody = document.getElementById('topics-body');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.getElementById('progress-text');
    const finishLine = document.querySelector('.finish-line');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const container = document.querySelector('.container');

    let topics = [];

    function formatDate(date) {
        if (!date) return '';
        const d = new Date(date);
        return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    }

    async function fetchTopics() {
        const querySnapshot = await getDocs(collection(db, "topics"));
        topics = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        renderTable();
        updateProgressBar();
    }

    async function updateFirestore(index, field, value) {
        const topicRef = doc(db, "topics", topics[index].id);
        await updateDoc(topicRef, { [field]: value });
    }

    function renderTable() {
        topicsBody.innerHTML = '';
        topics.forEach((topic, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${topic.name}</td>
                <td><input type="checkbox" data-index="${index}" ${topic.completed ? 'checked' : ''}></td>
                <td>${topic.totalVideos}</td>
                <td>
                    <input type="number" data-index="${index}" value="${topic.watched}" min="0">
                    <span class="date">${topic.watched > 0 ? formatDate(topic.lastWatchedDate) : ''}</span>
                </td>
            `;
            topicsBody.appendChild(row);
        });
    }

    function updateProgressBar() {
        let totalWatched = 0, totalVideos = 0;
        topics.forEach(topic => {
            totalVideos += topic.totalVideos;
            totalWatched += topic.watched;
        });

        const progress = (totalWatched / totalVideos) * 100;
        progressFill.style.width = `${progress}%`;
        progressText.textContent = progress >= 100 ? 'Completed!' : `${progress.toFixed(1)}%`;

        document.querySelector('.runner').style.left = `calc(${Math.min(progress, 100)}% - 10px)`;
        finishLine.classList.toggle('active', progress >= 100);
    }

    topicsBody.addEventListener('change', async function (event) {
        const target = event.target;
        const index = parseInt(target.dataset.index);

        if (target.type === 'checkbox') {
            topics[index].completed = target.checked;
            await updateFirestore(index, "completed", target.checked);
        } else if (target.type === 'number') {
            const watched = parseInt(target.value) || 0;
            topics[index].watched = watched;
            topics[index].lastWatchedDate = new Date();
            await updateFirestore(index, "watched", watched);
            await updateFirestore(index, "lastWatchedDate", topics[index].lastWatchedDate);
        }
        
        renderTable();
        updateProgressBar();
    });

    darkModeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    document.addEventListener("DOMContentLoaded", function () {
        const progressFill = document.querySelector(".progress-fill");
        const progressText = document.getElementById("progress-text");
    
        let progress = 0; // Example progress value (can be dynamic)
        progressFill.style.width = progress + "%";
        progressText.innerText = progress + "%";
    
        // Simulate progress increase
        setTimeout(() => {
            progress = 75; // Example: update progress dynamically
            progressFill.style.width = progress + "%";
            progressText.innerText = progress + "%";
        }, 1000);
    });

    await fetchTopics();
});
