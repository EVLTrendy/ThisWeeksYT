// script.js
const apiKey = 'AIzaSyAfq3GCaHig-hg5L1emI5JnbkOGkZiXDiI'; // Replace with your actual API key
const videoContainer = document.getElementById('videos');

async function fetchTrendingVideos() {
  const excludedCategories = ['10', '17', '20']; // Music, Sports, Gaming
  const excludedCategoryString = excludedCategories.join(',');

  const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=10&key=${apiKey}&videoCategoryId=${excludedCategoryString}`);
  const data = await response.json();
  
  data.items.forEach(item => {
    const videoTitle = item.snippet.title;
    const videoId = item.id;
    
    const videoBox = document.createElement('div');
    videoBox.className = 'video-box';

    const videoTitleElement = document.createElement('div');
    videoTitleElement.className = 'video-title';
    videoTitleElement.textContent = videoTitle;
    videoBox.appendChild(videoTitleElement);

    const videoPreview = document.createElement('iframe');
    videoPreview.src = `https://www.youtube.com/embed/${videoId}`;
    videoPreview.className = 'video-preview';
    videoPreview.allowFullscreen = true;
    videoBox.appendChild(videoPreview);
    
    videoContainer.appendChild(videoBox);
  });
}

fetchTrendingVideos();