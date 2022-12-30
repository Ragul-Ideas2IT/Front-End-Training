(function () {
  function init() {
    currentDate();
    addTaskList();
    task(id);
    addTask();
    addTaskInHtml();
    hideSideMenu();
    showSideMenu();
  }
  function currentDate() {
    var today = new Date();
    const daylist = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday ",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const monthlist = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var date =
      daylist[today.getDay()] +
      ", " +
      monthlist[today.getMonth()] +
      " " +
      today.getDate();
    document.getElementById("today-date").innerHTML = date;
  }

  function addTaskList() {
    let input = document.getElementById("tasklist-input");
    input.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        let list = document.createElement("li");
        let div = document.createElement("div");
        let p = document.createElement("p");
        list.innerHTML = '<span class="material-symbols-rounded"> list </span>';
        let inputFromUser = document.createTextNode(
          document.getElementById("tasklist-input").value
        );
        if (inputFromUser === "") {
          p.appendChild("Untitled");
        } else {
          p.appendChild(inputFromUser);
        }
        div.appendChild(p);
        list.setAttribute("onclick", "task(this)");
        list.appendChild(div);
        let newTask = document.getElementById("task-list");
        newTask.appendChild(list);
        newTask.insertBefore(list, newTask.children[6]);
      }
    });
  }

  function task(id) {
    document.getElementById("menu").innerHTML = id.innerHTML;
    var title = id.children[1].children[0].innerHTML;
    document.title = title;
    if (title != "My Day") {
      document.getElementById("menu").style.color = "#2564cf";
    }
  }

  function addTask() {
    let input = document.getElementById("task-input");
    input.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        addTaskInHtml();
      }
    });
  }

  function addTaskInHtml() {
    let div = document.createElement("div");
    let inputFromUser = document.createTextNode(
      document.getElementById("task-input").value
    );
    div.appendChild(inputFromUser);
    let newTask = document.getElementById("tasks");
    newTask.appendChild(div);
  }
  init();
})();

function hideSideMenu() {
  document.getElementsByClassName("side-container")[0].style.display = "none";
  document.querySelector("#menu .material-symbols-rounded").innerHTML = "menu";
  document
    .querySelector("#menu .material-symbols-rounded")
    .setAttribute("onclick", "showSideMenu()");
}

function showSideMenu() {
  document.getElementsByClassName("side-container")[0].style.display =
    "inline-block";
  document.querySelector("#menu .material-symbols-rounded").innerHTML = "menu";
}
