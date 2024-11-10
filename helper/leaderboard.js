const BASE_URL =
  "https://sharkie-59052-default-rtdb.europe-west1.firebasedatabase.app/";
let gamerName;

async function addPlayer() {
  await uploadData();
  await getLeaderboard();
  showLeaderboard();
}

async function uploadData() {
  let inputName = document.getElementById("gamer_name");
  gamerName = inputName.value.trim();

  let playerData = { gamerName, highScore };
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
  let leaderboardField = document.getElementById("leaderboard_table");
  leaderboardField.innerHTML = "";

  let sortedLeaderboard = Object.values(leaderboard).sort(
    (a, b) => b.highScore - a.highScore
  );

  generatePlayerOnTable(sortedLeaderboard, leaderboardField);
  getRank(sortedLeaderboard);
}

async function fetchData() {
  let response = await fetch(`${BASE_URL}/.json`);
  let datas = await response.json();
  if (datas === null) {
    return [];
  }
  return datas;
}

function generatePlayerOnTable(sortedLeaderboard, leaderboardField) {
  sortedLeaderboard.forEach((player, id) => {
    leaderboardField.innerHTML += `<tr>
        <td>${id + 1}.</td>
        <td>${player.gamerName}</td>
        <td>${player.highScore}</td>
      </tr>`;
  });
}

function getRank(sortedLeaderboard) {
  let playerRank =
    sortedLeaderboard.findIndex((player) => player.gamerName === gamerName) + 1;

  let rankField = document.getElementById("rank_number");
  rankField.innerHTML = "";
  rankField.innerHTML = playerRank;
}

function showLeaderboard() {
  let higtScore = document.getElementById("high_score");
  let leaderboard = document.getElementById("leaderboard");
  let addToBoard = document.getElementById("add_to_board");
  let rankOnLeaderboard = document.getElementById("rank_on_leaderboard");

  higtScore.classList.add("d-none");
  leaderboard.classList.remove("d-none");
  addToBoard.classList.add("d-none");
  rankOnLeaderboard.classList.remove("d-none");
}
