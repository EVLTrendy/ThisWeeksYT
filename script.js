async function getTrendingVideos() {
    const apiKey = 'AIzaSyAfq3GCaHig-hg5L1emI5JnbkOGkZiXDiI'; 

    const excludedCategories = ['10', '17', '44', '1']; 

    const categoriesResponse = await fetch(`https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=US&key=${apiKey}`);
    const categoriesData = await categoriesResponse.json();

    const excludedCategoryIds = categoriesData.items
        .filter(category => excludedCategories.includes(category.id))
        .map(category => category.id);

    const trendingResponse = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=50&regionCode=US&key=${apiKey}`);
    const trendingData = await trendingResponse.json();

    const filteredVideos = trendingData.items.filter(video => !excludedCategoryIds.includes(video.snippet.categoryId));

    const top7Videos = filteredVideos.slice(0, 7);

    const videoContainer = document.querySelector('.video-container');
    videoContainer.innerHTML = ''; 
    top7Videos.forEach(video => {
        const videoBox = document.createElement('div');
        videoBox.className = 'video-box';

        const videoThumbnail = document.createElement('img');
        videoThumbnail.className = 'video-thumbnail';
        videoThumbnail.src = video.snippet.thumbnails.default.url;

        const videoTitleLink = document.createElement('a');
        videoTitleLink.className = 'video-title';
        videoTitleLink.textContent = video.snippet.title;
        videoTitleLink.href = `https://www.youtube.com/watch?v=${video.id}`;

        const videoViewCount = document.createElement('p');
        videoViewCount.className = 'video-view-count';
        const viewCount = parseInt(video.statistics.viewCount);
        videoViewCount.textContent = `Views: ${viewCount.toLocaleString()}`;

        const videoAuthor = document.createElement('p');
        videoAuthor.className = 'video-author';
        videoAuthor.textContent = `By: ${video.snippet.channelTitle}`;

        videoBox.appendChild(videoThumbnail);
        videoBox.appendChild(videoTitleLink);
        videoBox.appendChild(videoViewCount);
        videoBox.appendChild(videoAuthor);

        videoContainer.appendChild(videoBox);
    });
}

document.addEventListener('DOMContentLoaded', getTrendingVideos);