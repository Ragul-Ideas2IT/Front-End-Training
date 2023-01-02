(function () {
  function init() {
    currentDate();
    addTaskList();
    addTask();
    categoryRendering();
  }

  var category = [
    {
      name: "My Day",
      icon: "wb_sunny",
    },
    {
      name: "Important",
      icon: "star",
    },
    {
      name: "Planned",
      icon: "calendar_month",
    },
    {
      name: "Assigned to me",
      icon: "person",
    },
    {
      name: "Tasks",
      icon: "home",
    },
  ];

  function categoryRendering() {
    for (let index = 0; index < category.length; index++) {
      const element = category[index];
      var list = document.createElement("li");
      var span = document.createElement("span");
      var div = document.createElement("div");
      var p = document.createElement("p");
      var taskList = document.getElementById("side-menu");
      list.className = "side-menu-option-container";
      list.setAttribute("onclick", "task(this)");
      span.className = "material-symbols-rounded";
      span.appendChild(document.createTextNode(element.icon));
      div.className = "menu-detail";
      p.appendChild(document.createTextNode(element.name));
      div.appendChild(p);
      list.appendChild(span);
      list.appendChild(div);
      taskList.appendChild(list);
    }
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
    var input = document.getElementById("tasklist-input");
    input.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        var list = document.createElement("li");
        var div = document.createElement("div");
        var p = document.createElement("p");
        list.innerHTML = '<span class="material-symbols-rounded"> list </span>';
        var inputFromUser = document.createTextNode(
          document.getElementById("tasklist-input").value
        );
        if (inputFromUser == "") {
          p.appendChild(document.createTextNode("Untitled"));
        } else {
          p.appendChild(inputFromUser);
        }
        div.appendChild(p);
        list.setAttribute("onclick", "task(this)");
        list.appendChild(div);
        var newTask = document.getElementById("task-list-menu");
        newTask.appendChild(list);
      }
    });
  }

  function addTask() {
    var input = document.getElementById("task-input");
    input.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        addTaskInHtml();
      }
    });
  }

  function addTaskInHtml() {
    var div = document.createElement("div");
    var taskDiv = document.createElement("div");
    var checkDiv = document.createElement("div");
    var starDiv = document.createElement("div");
    // div.className = "task-detail";
    taskDiv.className = "task";
    checkDiv.className = "check-container";
    starDiv.className = "star-container";
    checkDiv.innerHTML =
      '<span class="material-symbols-rounded">radio_button_unchecked</span>';
    starDiv.innerHTML = '<span class="material-symbols-rounded">star</span>';
    var inputFromUser = document.createTextNode(
      document.getElementById("task-input").value
    );
    taskDiv.appendChild(inputFromUser);
    var newTask = document.getElementById("tasks");
    div.appendChild(checkDiv);
    div.appendChild(taskDiv);
    div.appendChild(starDiv);
    newTask.appendChild(div);
    newTask.insertBefore(div, newTask.children[0]);
  }
  init();
})();

function task(id) {
  document.getElementById("menu").innerHTML = id.innerHTML;
  var title = id.children[1].children[0].innerHTML;
  document.title = title;
}

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
