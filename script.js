let token = null;

// Handle Google OAuth login
function handleCredentialResponse(response) {
  token = response.credential;
  fetchEntries();  // fetch entries after login
}

// Add weight entry
async function addWeight() {
  if (!token) { alert("Login first!"); return; }
  const weight = parseFloat(document.getElementById('weightInput').value);
  if (!weight) return alert("Enter a valid weight");

  await fetch('https://prep-tracker-api-xxxx.a.run.app/add_entry', {
    method: 'POST',
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ weight })
  });

  document.getElementById('weightInput').value = '';
  fetchEntries();
}

// Fetch all entries and update chart
async function fetchEntries() {
  if (!token) return;
  const res = await fetch('https://prep-tracker-api-xxxx.a.run.app/entries', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await res.json();

  const ctx = document.getElementById('weightChart').getContext('2d');
  const chartData = {
    labels: data.map(e => e.created_on),
    datasets: [{
      label: 'Weight (lbs)',
      data: data.map(e => e.weight),
      borderColor: 'blue',
      tension: 0.2
    }]
  };
  
  if (window.weightChartInstance) window.weightChartInstance.destroy();
  window.weightChartInstance = new Chart(ctx, { type: 'line', data: chartData });
}