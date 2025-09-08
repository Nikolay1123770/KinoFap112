
function loadVideos() {
    fetch('/path/to/your/secret_folder')  // Path to the folder where videos are stored
        .then(response => response.json())
        .then(data => {
            const secretVideos = document.getElementById('secretVideos');
            data.videos.forEach(video => {
                const videoElement = document.createElement('video');
                videoElement.src = `/secret_folder/${video}`;
                videoElement.controls = true;
                secretVideos.appendChild(videoElement);
            });
        });
}

loadVideos();
