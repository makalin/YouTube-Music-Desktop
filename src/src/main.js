const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');
const themeToggle = document.getElementById('theme-toggle');
const themeSelect = document.getElementById('theme-select');
const accentColorPicker = document.getElementById('accent-color-picker');
const defaultHomepageInput = document.getElementById('default-homepage');
const showUtilityBtns = document.getElementById('show-utility-btns');
const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const settingsClose = document.getElementById('settings-close');
const saveSettingsBtn = document.getElementById('save-settings');
const downloadBtn = document.getElementById('download-btn');
const downloadProgress = document.getElementById('download-progress');
const progressValue = document.getElementById('progress-value');
const musicFrame = document.getElementById('music-frame');
const homeBtn = document.getElementById('home-btn');
const reloadBtn = document.getElementById('reload-btn');
const copyUrlBtn = document.getElementById('copy-url-btn');
const muteBtn = document.getElementById('mute-btn');
const playerBar = document.getElementById('player-bar');
const trackInfo = document.getElementById('track-info');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const musicLink = document.getElementById('music-link');
const playLinkBtn = document.getElementById('play-link-btn');
const openBrowserBtn = document.getElementById('open-browser-btn');
const copyLinkBtn = document.getElementById('copy-link-btn');
const shareLinkBtn = document.getElementById('share-link-btn');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const trackThumb = document.getElementById('track-thumb');
const favoriteLinkBtn = document.getElementById('favorite-link-btn');
const playlistBtn = document.getElementById('playlist-btn');
const playlistQueue = document.getElementById('playlist-queue');
const playlistPanel = document.getElementById('playlist-panel');
const playlistList = document.getElementById('playlist-list');

// --- Theme & Settings ---
function applyTheme(theme, accent) {
  if (theme === 'auto') {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.body.classList.toggle('dark', theme === 'dark');
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  document.documentElement.style.setProperty('--primary', accent || '#ff1744');
}
function loadSettings() {
  const s = JSON.parse(localStorage.getItem('settings') || '{}');
  applyTheme(s.theme || 'light', s.accent || '#ff1744');
  themeSelect.value = s.theme || 'light';
  accentColorPicker.value = s.accent || '#ff1744';
  defaultHomepageInput.value = s.homepage || 'https://music.youtube.com';
  showUtilityBtns.checked = s.utility !== false;
}
function saveSettings() {
  const s = {
    theme: themeSelect.value,
    accent: accentColorPicker.value,
    homepage: defaultHomepageInput.value,
    utility: showUtilityBtns.checked
  };
  localStorage.setItem('settings', JSON.stringify(s));
  applyTheme(s.theme, s.accent);
  showNotification('Settings saved!');
}
themeToggle.onclick = () => {
  themeSelect.value = document.body.classList.contains('dark') ? 'light' : 'dark';
  saveSettings();
};
settingsBtn.onclick = () => settingsModal.classList.remove('hidden');
settingsClose.onclick = () => settingsModal.classList.add('hidden');
saveSettingsBtn.onclick = () => { saveSettings(); settingsModal.classList.add('hidden'); };
window.addEventListener('DOMContentLoaded', loadSettings);

// --- Notification ---
const notification = document.getElementById('notification');
function showNotification(msg, timeout = 2000) {
  notification.textContent = msg;
  notification.classList.remove('hidden');
  setTimeout(() => notification.classList.add('hidden'), timeout);
}

// --- Sidebar toggle ---
sidebarToggle.onclick = () => {
  sidebar.classList.toggle('hidden');
};
// Hotkey: Ctrl+B to toggle sidebar
window.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
    sidebar.classList.toggle('hidden');
    e.preventDefault();
  }
});

// --- Plugin toggles ---
['adblock', 'equalizer', 'downloader'].forEach(id => {
  const el = document.getElementById(id + '-toggle');
  if (el) {
    el.onchange = () => {
      window.__TAURI__?.invoke(el.checked ? 'initialize_plugin' : 'disable_plugin', { pluginId: id });
    };
  }
});

// --- Download button ---
downloadBtn.onclick = async () => {
  downloadProgress.classList.remove('hidden');
  progressValue.textContent = '0';
  let progress = 0;
  const interval = setInterval(() => {
    progress += 10;
    progressValue.textContent = progress;
    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => downloadProgress.classList.add('hidden'), 1000);
    }
  }, 200);
  // Call Rust backend to download
  try {
    await window.__TAURI__?.invoke('download_track', {
      url: musicFrame.src,
      outputPath: '' // Let backend decide or prompt
    });
  } catch (e) {
    alert('Download failed: ' + e);
  }
};

// --- Home button ---
homeBtn.onclick = () => {
  musicFrame.src = 'https://music.youtube.com';
};
// --- Reload button ---
reloadBtn.onclick = () => {
  musicFrame.contentWindow?.location.reload();
};
// --- Copy URL button ---
copyUrlBtn.onclick = async () => {
  try {
    await navigator.clipboard.writeText(musicFrame.src);
    copyUrlBtn.textContent = '✅';
    setTimeout(() => (copyUrlBtn.textContent = '🔗'), 1000);
  } catch {
    alert('Failed to copy URL');
  }
};
// --- Mute/Unmute button ---
let isMuted = false;
muteBtn.onclick = () => {
  isMuted = !isMuted;
  muteBtn.textContent = isMuted ? '🔈' : '🔇';
  // Real mute would require plugin or system audio control
};

// --- Player bar controls (placeholders) ---
playBtn.onclick = () => {
  // Try to send play/pause to iframe (works only for embed, not full music.youtube.com)
  // For YouTube embed, postMessage can be used, but not for music.youtube.com
  // So we just toggle the icon for now
  playBtn.textContent = playBtn.textContent === '⏯️' ? '⏸️' : '⏯️';
};
prevBtn.onclick = () => {
  // Placeholder: could send prev command to backend/plugin
};
nextBtn.onclick = () => {
  // Placeholder: could send next command to backend/plugin
};

// --- Track info update (placeholder) ---
function updateTrackInfo(url) {
  if (!url) url = musicFrame.src;
  if (url.includes('youtube.com/embed/')) {
    trackTitle.textContent = 'YouTube Video';
    trackArtist.textContent = '';
  } else if (url.includes('music.youtube.com')) {
    trackTitle.textContent = 'YouTube Music';
    trackArtist.textContent = '';
  } else {
    trackTitle.textContent = 'No track loaded';
    trackArtist.textContent = '';
  }
}

// Autofill input with current iframe src on load
musicFrame.onload = () => {
  musicLink.value = musicFrame.src;
  updateTrackInfo();
};

// Enter key in input triggers play
musicLink.addEventListener('keydown', e => {
  if (e.key === 'Enter') playLinkBtn.onclick();
});

// Utility: Validate and convert YouTube links to embeddable
function getEmbedUrl(link) {
  if (!link) return 'https://music.youtube.com';
  // YouTube Music links
  if (link.includes('music.youtube.com')) return link;
  // YouTube video links
  const ytMatch = link.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`;
  return link;
}

// Play link
playLinkBtn.onclick = () => {
  const url = musicLink.value.trim();
  if (url) {
    musicFrame.src = getEmbedUrl(url);
    updateTrackInfo(url);
  }
};

// Open in browser
openBrowserBtn.onclick = () => {
  const url = musicLink.value.trim() || musicFrame.src;
  if (window.__TAURI__?.shell) {
    window.__TAURI__.shell.open(url);
  } else {
    window.open(url, '_blank');
  }
};

// Copy link
copyLinkBtn.onclick = async () => {
  const url = musicLink.value.trim() || musicFrame.src;
  try {
    await navigator.clipboard.writeText(url);
    copyLinkBtn.textContent = '✅';
    setTimeout(() => (copyLinkBtn.textContent = '🔗'), 1000);
  } catch {
    alert('Failed to copy link');
  }
};

// Share link (Web Share API or fallback)
shareLinkBtn.onclick = async () => {
  const url = musicLink.value.trim() || musicFrame.src;
  if (navigator.share) {
    try {
      await navigator.share({ title: 'YouTube Music', url });
    } catch {}
  } else {
    copyLinkBtn.onclick();
    alert('Link copied! Share it anywhere.');
  }
};

// --- Favorites/History/Playlist ---
const favoritesBtn = document.getElementById('favorites-btn');
const historyBtn = document.getElementById('history-btn');
const favoritesPanel = document.getElementById('favorites-panel');
const historyPanel = document.getElementById('history-panel');
const favoritesList = document.getElementById('favorites-list');
const historyList = document.getElementById('history-list');

function getStore(key) {
  return JSON.parse(localStorage.getItem(key) || '[]');
}
function setStore(key, arr) {
  localStorage.setItem(key, JSON.stringify(arr));
}
function addFavorite(link, title) {
  let favs = getStore('favorites');
  if (!favs.find(f => f.link === link)) {
    favs.unshift({ link, title, time: Date.now() });
    setStore('favorites', favs.slice(0, 100));
    showNotification('Added to favorites!');
    renderFavorites();
  }
}
function addHistory(link, title) {
  let hist = getStore('history');
  hist.unshift({ link, title, time: Date.now() });
  setStore('history', hist.slice(0, 200));
  renderHistory();
}
function renderFavorites() {
  const favs = getStore('favorites');
  favoritesList.innerHTML = favs.length ? '' : '<li>No favorites yet.</li>';
  favs.forEach(f => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${f.title || f.link}</span> <button title="Play">▶️</button> <button title="Remove">❌</button>`;
    li.querySelector('button[title="Play"]').onclick = () => playFromLink(f.link);
    li.querySelector('button[title="Remove"]').onclick = () => { removeFavorite(f.link); };
    favoritesList.appendChild(li);
  });
}
function renderHistory() {
  const hist = getStore('history');
  historyList.innerHTML = hist.length ? '' : '<li>No history yet.</li>';
  hist.forEach(f => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${f.title || f.link}</span> <button title="Play">▶️</button>`;
    li.querySelector('button').onclick = () => playFromLink(f.link);
    historyList.appendChild(li);
  });
}
function removeFavorite(link) {
  let favs = getStore('favorites');
  favs = favs.filter(f => f.link !== link);
  setStore('favorites', favs);
  renderFavorites();
}
favoritesBtn.onclick = () => { favoritesPanel.classList.toggle('hidden'); historyPanel.classList.add('hidden'); playlistPanel.classList.add('hidden'); };
historyBtn.onclick = () => { historyPanel.classList.toggle('hidden'); favoritesPanel.classList.add('hidden'); playlistPanel.classList.add('hidden'); };
playlistBtn.onclick = () => { playlistPanel.classList.toggle('hidden'); favoritesPanel.classList.add('hidden'); historyPanel.classList.add('hidden'); };
window.addEventListener('DOMContentLoaded', () => { renderFavorites(); renderHistory(); });

// --- Mini Player ---
const miniPlayerBtn = document.getElementById('mini-player-btn');
const miniPlayer = document.getElementById('mini-player');
const miniMusicFrame = document.getElementById('mini-music-frame');
const miniCloseBtn = document.getElementById('mini-close-btn');
const miniPlayBtn = document.getElementById('mini-play-btn');
miniPlayerBtn.onclick = () => {
  miniPlayer.classList.remove('hidden');
  miniMusicFrame.src = musicFrame.src;
};
miniCloseBtn.onclick = () => miniPlayer.classList.add('hidden');
miniPlayBtn.onclick = () => playBtn.onclick();
// Drag mini player
let dragOffset = null;
miniPlayer.onmousedown = function(e) {
  if (e.target !== miniPlayer) return;
  dragOffset = [e.clientX - miniPlayer.offsetLeft, e.clientY - miniPlayer.offsetTop];
  document.onmousemove = function(ev) {
    miniPlayer.style.left = (ev.clientX - dragOffset[0]) + 'px';
    miniPlayer.style.top = (ev.clientY - dragOffset[1]) + 'px';
  };
  document.onmouseup = function() {
    document.onmousemove = null;
    document.onmouseup = null;
  };
};

// --- Utility Functions ---
function getDefaultHomepage() {
  return defaultHomepageInput?.value || 'https://music.youtube.com';
}
function playFromLink(url) {
  musicFrame.src = getEmbedUrl(url);
  musicLink.value = url;
  updateTrackInfo(url);
  addHistory(url, '');
}
playLinkBtn.onclick = () => {
  const url = musicLink.value.trim();
  if (url) {
    playFromLink(url);
  }
};
openBrowserBtn.onclick = () => {
  const url = musicLink.value.trim() || musicFrame.src;
  if (window.__TAURI__?.shell) {
    window.__TAURI__.shell.open(url);
  } else {
    window.open(url, '_blank');
  }
};
copyLinkBtn.onclick = async () => {
  const url = musicLink.value.trim() || musicFrame.src;
  try {
    await navigator.clipboard.writeText(url);
    copyLinkBtn.textContent = '✅';
    setTimeout(() => (copyLinkBtn.textContent = '🔗'), 1000);
    showNotification('Link copied!');
  } catch {
    alert('Failed to copy link');
  }
};
shareLinkBtn.onclick = async () => {
  const url = musicLink.value.trim() || musicFrame.src;
  if (navigator.share) {
    try {
      await navigator.share({ title: 'YouTube Music', url });
    } catch {}
  } else {
    copyLinkBtn.onclick();
    showNotification('Link copied! Share it anywhere.');
  }
};
downloadBtn.onclick = async () => {
  // Call Rust backend to download (stub)
  showNotification('Download started (stub)!');
  if (window.__TAURI__?.invoke) {
    await window.__TAURI__.invoke('download_track', { url: musicFrame.src, outputPath: '' });
  }
};
favoriteLinkBtn.onclick = () => {
  const url = musicLink.value.trim() || musicFrame.src;
  addFavorite(url, trackTitle.textContent);
};

// --- Player Controls ---
playBtn.onclick = () => {
  playBtn.textContent = playBtn.textContent === '⏯️' ? '⏸️' : '⏯️';
  miniPlayBtn.textContent = playBtn.textContent;
};
prevBtn.onclick = () => {
  showNotification('Previous track (stub)');
};
nextBtn.onclick = () => {
  showNotification('Next track (stub)');
};
muteBtn.onclick = () => {
  isMuted = !isMuted;
  muteBtn.textContent = isMuted ? '🔈' : '🔇';
  showNotification(isMuted ? 'Muted' : 'Unmuted');
};

// --- Playlist Support ---
let playlist = [];
let playlistIndex = 0;
playlistBtn.onclick = () => {
  playlistPanel.classList.toggle('hidden');
  renderPlaylist();
};
function parsePlaylist(link) {
  // Only supports YouTube playlist links
  const plMatch = link.match(/[?&]list=([\w-]+)/);
  if (plMatch) {
    // For demo, just add the playlist link
    playlist = [{ link, title: 'Playlist' }];
    playlistIndex = 0;
    renderPlaylist();
  }
}
function renderPlaylist() {
  playlistList.innerHTML = '';
  playlist.forEach((item, i) => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${item.title || item.link}</span> <button title="Play">▶️</button>`;
    li.querySelector('button').onclick = () => {
      playlistIndex = i;
      playFromLink(item.link);
    };
    playlistList.appendChild(li);
  });
}

// --- Track Info (YouTube Data API or fallback) ---
function updateTrackInfo(url) {
  if (!url) url = musicFrame.src;
  if (url.includes('youtube.com/embed/')) {
    // Try to get video ID
    const match = url.match(/embed\/([\w-]{11})/);
    if (match) {
      fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${match[1]}`)
        .then(r => r.json())
        .then(data => {
          trackTitle.textContent = data.title || 'YouTube Video';
          trackArtist.textContent = data.author_name || '';
          if (data.thumbnail_url) {
            trackThumb.src = data.thumbnail_url;
            trackThumb.style.display = '';
          } else {
            trackThumb.style.display = 'none';
          }
        });
    }
  } else if (url.includes('music.youtube.com')) {
    trackTitle.textContent = 'YouTube Music';
    trackArtist.textContent = '';
    trackThumb.style.display = 'none';
  } else {
    trackTitle.textContent = 'No track loaded';
    trackArtist.textContent = '';
    trackThumb.style.display = 'none';
  }
}
musicFrame.onload = () => {
  musicLink.value = musicFrame.src;
  updateTrackInfo();
  addHistory(musicFrame.src, trackTitle.textContent);
};
musicLink.addEventListener('keydown', e => {
  if (e.key === 'Enter') playLinkBtn.onclick();
});

// --- Keyboard Shortcuts ---
document.addEventListener('keydown', e => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  if (e.code === 'Space') { playBtn.onclick(); e.preventDefault(); }
  if (e.key === 'm' || e.key === 'M') muteBtn.onclick();
  if (e.key === 't' || e.key === 'T') themeToggle.onclick();
  if (e.key === 'f' || e.key === 'F') favoriteLinkBtn.onclick();
  if (e.key === 'h' || e.key === 'H') historyBtn.onclick();
  if (e.key === 'p' || e.key === 'P') playlistBtn.onclick();
  if (e.key === 'l' || e.key === 'L') favoritesBtn.onclick();
  if (e.key === 'ArrowLeft') prevBtn.onclick();
  if (e.key === 'ArrowRight') nextBtn.onclick();
});

// --- Custom Theme Picker ---
accentColorPicker.oninput = () => {
  document.documentElement.style.setProperty('--primary', accentColorPicker.value);
};

// --- Utility: Hide panels on click outside ---
document.addEventListener('mousedown', e => {
  [favoritesPanel, historyPanel, playlistPanel, settingsModal].forEach(panel => {
    if (!panel.classList.contains('hidden') && !panel.contains(e.target) && e.target !== favoritesBtn && e.target !== historyBtn && e.target !== playlistBtn && e.target !== settingsBtn) {
      panel.classList.add('hidden');
    }
  });
}); 