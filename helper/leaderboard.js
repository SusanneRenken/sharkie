const BASE_URL =
  "https://sharkie-59052-default-rtdb.europe-west1.firebasedatabase.app/";

  async function addPlayer() {
    let inputName = document.getElementById('gamer_name');
    let name = inputName.value.trim();
    
    let playerData = { name, highScore };
    await postData(playerData);

    inputName.value = "";
  }

async function postData(data = {}) {
  let response = await fetch(`${BASE_URL}/.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

async function getLeaderboard() {
  let leaderboard = await fetchData();

  let sortedLeaderboard = Object.values(leaderboard).sort((a, b) => b.highScore - a.highScore);
  
}

async function fetchData() {
  let response = await fetch(`${BASE_URL}/.json`);
  let datas = await response.json();
  if (datas === null) {
    return [];
  }
  return datas;
}