const BASE_URL =
  "https://sharkie-59052-default-rtdb.europe-west1.firebasedatabase.app/";
let gamerName;

/**
 * Adds a new player to the leaderboard by uploading data and displaying the updated leaderboard.
 * @async
 */
async function addPlayer() {
  await uploadData();
  await getLeaderboard();
  showLeaderboard();
}

/**
 * Uploads player data to the database and resets the input field.
 * @async
 */
async function uploadData() {
  let inputName = document.getElementById("gamer_name");
  gamerName = inputName.value.trim();

  let playerData = { gamerName, highScore };
  await postData(playerData);

  inputName.value = "";
}

/**
 * Posts player data to the Firebase database.
 * @async
 * @param {Object} data - The player data to upload.
 * @param {string} data.gamerName - The name of the player.
 * @param {number} data.highScore - The high score of the player.
 * @returns {Promise<Object>} The response from the server.
 */
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

/**
 * Retrieves and displays the leaderboard.
 * @async
 */
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

/**
 * Fetches the leaderboard data from the Firebase database.
 * @async
 * @returns {Promise<Object[]>} The leaderboard data.
 */
async function fetchData() {
  let response = await fetch(`${BASE_URL}/.json`);
  let datas = await response.json();
  if (datas === null) {
    return [];
  }
  return datas;
}

/**
 * Generates the leaderboard table rows from the sorted leaderboard data.
 * @param {Object[]} sortedLeaderboard - The sorted leaderboard data.
 * @param {HTMLElement} leaderboardField - The HTML element to display the leaderboard.
 */
function generatePlayerOnTable(sortedLeaderboard, leaderboardField) {
  sortedLeaderboard.forEach((player, id) => {
    leaderboardField.innerHTML += `<tr>
        <td>${id + 1}.</td>
        <td>${player.gamerName}</td>
        <td>${player.highScore}</td>
      </tr>`;
  });
}

/**
 * Gets the rank of the current player and updates the rank display.
 * @param {Object[]} sortedLeaderboard - The sorted leaderboard data.
 */
function getRank(sortedLeaderboard) {
  let playerRank =
    sortedLeaderboard.findIndex(
      (player) => player.gamerName === gamerName && player.highScore === highScore
    ) + 1;

  let rankField = document.getElementById("rank_number");
  rankField.innerHTML = "";
  rankField.innerHTML = playerRank;
}

/**
 * Shows the leaderboard screen and hides other elements.
 */
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
