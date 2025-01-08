import { fetchData } from './api.js'; // وارد کردن تابع fetchData از api.js

// گرفتن المان‌ها
const showInfoButton = document.getElementById('show-info-btn');
const shareButton = document.getElementById('share-btn');
const fidInput = document.getElementById('fid-input');
const moxieDataContainer = document.getElementById('moxie-data');

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
      // ارسال داده‌ها به Farcaster با URL Intent
      const farcasterUrl = `https://warpcast.com/~/compose?text=Check%20this%20out!&embeds[]=${encodeURIComponent('https://s7.gifyu.com/images/SX0E7.png')}`;
      console.log('Farcaster URL:', farcasterUrl);
      // به راحتی می‌توانید این لینک را برای اشتراک‌گذاری استفاده کنید
    } else {
      alert('No data found for this Fid');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    alert('Failed to fetch data. Please try again.');
  }
});

// رویداد دکمه "Share"
shareButton.addEventListener('click', () => {
  const data = moxieDataContainer.innerHTML;
  const farcasterUrl = `https://warpcast.com/~/compose?text=Check%20this%20out!&embeds[]=${encodeURIComponent('https://s7.gifyu.com/images/SX0E7.png')}`;
  
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
