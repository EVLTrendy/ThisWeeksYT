const apiKey = 'AIzaSyAfq3GCaHig-hg5L1emI5JnbkOGkZiXDiI';
const videoContainer = document.getElementById('videos');

async function fetchTrendingVideos() {
  const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=10&key=${apiKey}`);
  const data = await response.json();
  
  data.items.forEach(item => {
    const videoTitle = item.snippet.title;
    const videoId = item.id;
    
    const videoLink = document.createElement('a');
    videoLink.href = `https://www.youtube.com/watch?v=${videoId}`;
    videoLink.textContent = videoTitle;
    
    videoContainer.appendChild(videoLink);
  });
}

fetchTrendingVideos();
