// script.js
const apiKey = 'AIzaSyAfq3GCaHig-hg5L1emI5JnbkOGkZiXDiI'; // Replace with your actual API key
const videoContainer = document.getElementById('videos');

async function fetchTrendingVideos() {
  const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=10&key=${apiKey}`);
  const data = await response.json();
  
  data.items.forEach(item => {
    const videoTitle = item.snippet.title;
    const videoId = item.id;

    const videoBox = document.createElement('div');
    videoBox.classList.add('video-box');
    
    const videoIframe = document.createElement('iframe');
    videoIframe.src = `https://www.youtube.com/embed/${videoId}`;
    videoIframe.width = '100%';
    videoIframe.height = '315';
    videoIframe.frameBorder = '0';
    videoIframe.allowFullscreen = true;
    
    videoBox.appendChild(videoIframe);
    
    videoContainer.appendChild(videoBox);
  });
}

fetchTrendingVideos();