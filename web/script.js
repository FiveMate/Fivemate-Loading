window.addEventListener('DOMContentLoaded', (event) => {
    // Get DOM Elements
    const loadingBarFill = document.getElementById('loading-bar-fill');
    const backgroundMusic = document.getElementById('background-music');
    const toggleAudioButton = document.getElementById('toggle-audio');
    const nextTrackButton = document.getElementById('next-track');
    const volumeControl = document.getElementById('volume-control');
    const videoPlayer = document.getElementById('background-video');
    const discordButton = document.getElementById('discord-button');
    const serverNameElement = document.getElementById('server-name');
    const loadingMessageElement = document.getElementById('loading-message');
    const loadingProgressElement = document.getElementById('loading-progress');
    const logoElement = document.querySelector('.logo');

    // Apply configurations
    document.documentElement.style.setProperty('--loading-bar-color', loadConfig.loadingBarColor);
    document.documentElement.style.setProperty('--logo-size', loadConfig.logoSize);
    serverNameElement.textContent = loadConfig.serverName;

    // Music Configuration
    const musicTracks = loadConfig.musicTracks;
    let currentTrackIndex = Math.floor(Math.random() * musicTracks.length);
    backgroundMusic.src = musicTracks[currentTrackIndex];
    backgroundMusic.volume = loadConfig.defaultVolume;
    volumeControl.value = loadConfig.defaultVolume;

    // Function to play next track
    function playNextTrack() {
        currentTrackIndex = (currentTrackIndex + 1) % musicTracks.length;
        backgroundMusic.src = musicTracks[currentTrackIndex];
        playMusic();
        updateTrackDisplay();
    }

    // Function to play music
    function playMusic() {
        if (loadConfig.enableMusic) {
            backgroundMusic.play().catch(e => {
                console.warn('Music autoplay prevented:', e);
            });
        }
    }

    // Update track display
    function updateTrackDisplay() {
        toggleAudioButton.textContent = backgroundMusic.paused ? 'Play' : 'Pause';
    }

    // Setup video
    const videoSource = videoPlayer.querySelector('source');
    videoSource.src = loadConfig.videoPath;
    videoPlayer.load();
    videoPlayer.play().catch(function(error) {
        console.log("Video playback error:", error);
    });
    videoPlayer.muted = true;

    // Setup logo
    logoElement.src = loadConfig.logoPath;

    // Setup autoplay
    if (loadConfig.autoplayMusic) {
        playMusic();
    }

    // Volume control
    volumeControl.addEventListener('input', () => {
        backgroundMusic.volume = volumeControl.value;
    });

    // Button events
    nextTrackButton.addEventListener('click', playNextTrack);
    backgroundMusic.addEventListener('ended', playNextTrack);
    
    toggleAudioButton.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            playMusic();
        } else {
            backgroundMusic.pause();
        }
        updateTrackDisplay();
    });

    // Discord button
    discordButton.addEventListener('click', () => {
        window.open(loadConfig.discordLink, '_blank');
    });

    // Loading messages
    const loadingMessages = loadConfig.loadingMessages;
    let currentMessageIndex = 0;
    loadingMessageElement.textContent = loadingMessages[0];

    // Handle loading events from CitizenFX
    window.addEventListener('message', function(event) {
        // Check if we're getting a load progress event
        if (event.data.eventName === 'loadProgress') {
            const progress = event.data.loadFraction * 100;
            loadingBarFill.style.width = `${progress}%`;
            loadingProgressElement.textContent = `${Math.floor(progress)}%`;
            
            // Update loading message based on progress
            const messageIndex = Math.min(
                Math.floor((progress / 100) * (loadingMessages.length - 1)),
                loadingMessages.length - 1
            );
            
            if (messageIndex !== currentMessageIndex) {
                currentMessageIndex = messageIndex;
                loadingMessageElement.textContent = loadingMessages[messageIndex];
            }
        }
    });
});