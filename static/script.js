document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('video-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const url = document.getElementById('url').value;
        console.log("URL: ", url);
        fetch('/process_video', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({url})
        }).then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log("Video Id is : " + url)
                embedVideos(data.shorts, url);
            } else {
                console.error(data.error || 'An error occurred.');
            }
        }).catch(error => {
            console.error(error);
        });
    });
});

function embedVideos(shorts, videoId) {
    console.log("Shorts " + shorts)
    console.log("Going Good")
    console.log("Extracted Video ID: ", videoId);
    const container = document.querySelector('.videos-container');
    container.innerHTML = '';
    // Clear existing videos
    // 7m-g8eZ_tXg
    shorts.forEach((short, index) => {
        const { start, end } = short;
        console.log("Start :" + start + " End: " + end);
        const embedCode = `<iframe allowFullScreen="allowFullScreen" 
                                        src="https://www.youtube.com/embed/${videoId}?ecver=1&amp;iv_load_policy=3&amp;rel=0&amp;showinfo=0&amp;yt:stretch=16:9&amp;autohide=1&amp;color=red&amp;start=${Math.round(start)}&amp;end=${Math.round(end)}&amp" 
                                        width="260" 
                                        height="140" 
                                        allowtransparency="true" 
                                        >
                                </iframe>`
        container.innerHTML += embedCode;
    });
}
