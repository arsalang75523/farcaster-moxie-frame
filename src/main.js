import { fetchData } from './api.js'; // فرض می‌کنیم که api.js اطلاعات را از سرور می‌گیرد

// گرفتن المان‌ها
const showInfoButton = document.getElementById('show-info-btn');
const shareButton = document.getElementById('share-btn');
const fidInput = document.getElementById('fid-input');
const moxieDataContainer = document.getElementById('moxie-data');

// دکمه‌ها
const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
const btn4 = document.getElementById('btn4');

// تابع برای نمایش داده‌ها
const renderData = (data) => {
  moxieDataContainer.innerHTML = data.map(item => `
    <div>
      <p><strong>Entity ID:</strong> ${item.entityId}</p>
      <p><strong>All Earnings Amount:</strong> ${item.allEarningsAmount}</p>
      <p><strong>Cast Earnings Amount:</strong> ${item.castEarningsAmount}</p>
      <p><strong>Timeframe:</strong> ${item.timeframe}</p>
    </div>
  `).join('');
  shareButton.style.display = 'block'; // نمایش دکمه "Share" بعد از بارگذاری داده‌ها
};

// رویداد دکمه "Show Info"
showInfoButton.addEventListener('click', async () => {
  const fid = fidInput.value.trim();
  if (!fid) {
    alert('Please enter a valid Fid');
    return;
  }

  try {
    const data = await fetchData(fid); // ارسال درخواست با Fid
    if (data) {
      renderData(data); // نمایش داده‌ها
    } else {
      alert('No data found for this Fid');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    alert('Failed to fetch data. Please try again.');
  }
});

// ارسال URL به Farcaster با Embed های مختلف
const sendToFarcaster = (embedUrl) => {
  const farcasterUrl = `https://warpcast.com/~/compose?text=Check%20this%20out!&embeds[]=${encodeURIComponent(embedUrl)}`;
  window.open(farcasterUrl, '_blank');
};

// رویداد دکمه‌ها
btn1.addEventListener('click', () => sendToFarcaster('https://yourwebsite.com/api/vote'));
btn2.addEventListener('click', () => sendToFarcaster('https://yourwebsite.com/api/vote'));
btn3.addEventListener('click', () => sendToFarcaster('https://yourwebsite.com/api/vote'));
btn4.addEventListener('click', () => sendToFarcaster('https://yourwebsite.com/api/vote'));

// رویداد دکمه "Share"
shareButton.addEventListener('click', () => {
  const data = moxieDataContainer.innerHTML;
  const farcasterUrl = `https://warpcast.com/~/compose?text=Check%20this%20out!&embeds[]=${encodeURIComponent('https://yourwebsite.com/images/moxie-earnings.png')}`;

  if (navigator.share) {
    navigator.share({
      title: 'Base Moxie Earnings Data',
      text: 'Check out this awesome Farcaster data!',
      url: farcasterUrl,
    }).catch(console.error);
  } else {
    alert('Sharing is not supported in this browser.');
  }
});
