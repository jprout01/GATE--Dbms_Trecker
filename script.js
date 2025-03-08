document.addEventListener('DOMContentLoaded', function() {
    const topics = [
        { name: "ER Model", totalVideos: 11, watched: 0, lastWatchedDate: null, completed: false },
        { name: "Relational Database Model", totalVideos: 11, watched: 0, lastWatchedDate: null, completed: false },
        { name: "Conversion of ER model to Relational", totalVideos: 15, watched: 0, lastWatchedDate: null, completed: false },
        { name: "Normalisation", totalVideos: 77, watched: 0, lastWatchedDate: null, completed: false },
        { name: "SQL", totalVideos: 22, watched: 0, lastWatchedDate: null, completed: false },
        { name: "Relational Algebra", totalVideos: 43, watched: 0, lastWatchedDate: null, completed: false },
        { name: "Transaction management and", totalVideos: 31, watched: 0, lastWatchedDate: null, completed: false },
        { name: "File structures", totalVideos: 25, watched: 0, lastWatchedDate: null, completed: false },
        { name: "Practice Questions", totalVideos: 192, watched: 0, lastWatchedDate: null, completed: false }
    ];

    const topicsBody = document.getElementById('topics-body');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.getElementById('progress-text');
    const finishLine = document.querySelector('.finish-line');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const container = document.querySelector('.container');

    let darkMode = false; // Initial dark mode state

    function formatDate(date) {
        if (!date) return '';
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
        const year = d.getFullYear();
        return `${month}/${day}/${year}`;
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
        let totalWatched = 0;
        let totalVideos = 0;

        topics.forEach(topic => {
            totalVideos += topic.totalVideos;
            totalWatched += topic.watched;
        });

        const progress = (totalWatched / totalVideos) * 100;
        progressFill.style.width = `${progress}%`;
        
        if (progress >= 100) {
            progressText.textContent = 'Completed!';
        } else {
            progressText.textContent = `${progress.toFixed(1)}%`;
        }

        // Move runner along the progress bar
        const runnerPosition = Math.min(progress, 100); // Ensure runner doesn't go beyond 100%
        document.querySelector('.runner').style.left = `calc(${runnerPosition}% - 10px)`;

        // Activate finish line animation when progress is 100%
        if (progress >= 100) {
            finishLine.classList.add('active');
        } else {
            finishLine.classList.remove('active');
        }
    }

    topicsBody.addEventListener('change', function(event) {
        const target = event.target;

        if (target.type === 'checkbox') {
            const index = parseInt(target.dataset.index);
            topics[index].completed = target.checked;
        } else if (target.type === 'number') {
            const index = parseInt(target.dataset.index);
            const watched = parseInt(target.value) || 0;

            topics[index].watched = watched;
            topics[index].lastWatchedDate = new Date();
        }
        renderTable();
        updateProgressBar();
    });

    darkModeToggle.addEventListener('click', function() {
        darkMode = !darkMode;
        document.body.classList.toggle('dark-mode', darkMode);

        // Store the dark mode preference in localStorage
        localStorage.setItem('darkMode', darkMode);
    });

    // Check localStorage for dark mode preference on page load
    if (localStorage.getItem('darkMode') === 'true') {
        darkMode = true;
        document.body.classList.add('dark-mode');
    }

    renderTable();
    updateProgressBar();
});
