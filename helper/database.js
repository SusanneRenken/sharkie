const BASE_URL =
  "https://sharkie-59052-default-rtdb.europe-west1.firebasedatabase.app/";


async function fetchData(path = "") {
    let response = await fetch(`${BASE_URL}/${path}/.json`);
    let datas = await response.json();
    if(datas === null){
      return null;
    };
    return datas;
  }  

  async function postData(path = "", data = {}) {
    let response = await fetch(`${BASE_URL}/${path}/.json`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }

  async function getNewId(path = "") {
    let response = await fetch(`${BASE_URL}/${path}/.json`);
    let responseToJson = await response.json();
    let newUserId;
    if (responseToJson == null) {
      newUserId = 1;
    } else {
      newUserId = countId(responseToJson);
    }
    return newUserId;
  }
  
  function countId(responseToJson) {
    let keys = Object.keys(responseToJson);
    let lastKey = keys[keys.length - 1];
    let countId = responseToJson[lastKey].id;
    countId++;
    return countId;
  }

  


  async function moveTo(status) {
    let tasks = await fetchData("tasks");
    let movedTask = tasks.find((task) => task.id === currentDraggedElement);
    movedTask.status = status;
    await postUpdatedTask(movedTask);
    removeHightlight(status);
    updateTasksOnBoard();
  }

  async function addUser(email, name, password, initials) {
    let userId = await getNewId("users");
    let userData = createUserData(name, initials, email, password, userId);
  
    try {
      let result = await postData(`users/${userId - 1}/`, userData);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }


