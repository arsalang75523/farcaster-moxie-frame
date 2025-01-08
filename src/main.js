import { fetchData } from './api.js'; // فرض می‌کنیم که api.js همانطور که قبلاً گفته شد ساخته شده است

// Get the buttons and input field
const showInfoButton = document.getElementById('show-info-btn');
const shareButton = document.getElementById('share-btn');
const fidInput = document.getElementById('fid-input');
const moxieDataContainer = document.getElementById('moxie-data');

// Function to display the data
const renderData = (data) => {
  moxieDataContainer.innerHTML = data.map(item => `
    <div>
      <p><strong>Entity ID:</strong> ${item.entityId}</p>
      <p><strong>All Earnings Amount:</strong> ${item.allEarningsAmount}</p>
      <p><strong>Cast Earnings Amount:</strong> ${item.castEarningsAmount}</p>
      <p><strong>Timeframe:</strong> ${item.timeframe}</p>
    </div>
  `).join('');
  shareButton.style.display = 'block'; // Show the share button after data is loaded
};

// Event listener for the "Show Info" button
showInfoButton.addEventListener('click', async () => {
  const fid = fidInput.value.trim();
  if (!fid) {
    alert('Please enter a valid Fid');
    return;
  }

  try {
    const data = await fetchData(fid); // Call the API with Fid as parameter
    if (data) {
      renderData(data);
    } else {
      alert('No data found for this Fid');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    alert('Failed to fetch data. Please try again.');
  }
});

// Event listener for the "Share" button
shareButton.addEventListener('click', () => {
  const data = moxieDataContainer.innerHTML;
  if (navigator.share) {
    navigator.share({
      title: 'Base Moxie Earnings Data',
      text: 'Check out this awesome Farcaster data!',
      url: document.location.href,
    }).catch(console.error);
  } else {
    alert('Sharing is not supported in this browser.');
  }
});
