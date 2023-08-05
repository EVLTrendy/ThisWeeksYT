async function getTrendingVideos() {
    const apiKey = 'AIzaSyAfq3GCaHig-hg5L1emI5JnbkOGkZiXDiI'; // Replace with your YouTube Data API key

    // Get the video category IDs to exclude
    const excludedCategories = ['10', '17', '44', '1']; // music, sports, trailers, movies

    // Fetch video categories...
    const categoriesResponse = await fetch(`https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=US&key=${apiKey}`);
    const categoriesData = await categoriesResponse.json();

    const excludedCategoryIds = categoriesData.items
        .filter(category => excludedCategories.includes(category.id))
        .map(category => category.id);

    // Fetch trending videos...
    const trendingResponse = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=50&regionCode=US&key=${apiKey}`);
    const trendingData = await trendingResponse.json();

    // Filter out videos from excluded categories...
    const filteredVideos = trendingData.items.filter(video => !excludedCategoryIds.includes(video.snippet.categoryId));

    // Get the top 7 videos from the filtered list...
    const top7Videos = filteredVideos.slice(0, 7);

    // Display video boxes...
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = ''; // Clear previous content
    top7Videos.forEach(video => {
        const videoBox = document.createElement('div');
        videoBox.className = 'video-box';

        const videoThumbnail = document.createElement('img');
        videoThumbnail.className = 'video-thumbnail';
        videoThumbnail.src = video.snippet.thumbnails.default.url;

        const videoTitle = document.createElement('p');
        videoTitle.className = 'video-title';
        videoTitle.textContent = video.snippet.title;

        videoBox.appendChild(videoThumbnail);
        videoBox.appendChild(videoTitle);

        videoContainer.appendChild(videoBox);
    });
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', getTrendingVideos);
