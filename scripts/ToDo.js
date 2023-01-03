/* A self-invoking function. It is a function that calls itself. */
(function () {
  /**
   * It calls the functions that are needed to run the app.
   */
  function init() {
    currentDate();
    addTaskList();
    // addTask();
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

  var taskLists = [];
  var selectedCategory;

  /**
   * It creates a list item for each category and appends it to the side menu
   */
  function categoryRendering() {
    var taskList = document.getElementById("side-menu");
    // taskList = "";
    for (let index = 0; index < category.length; index++) {
      const element = category[index];
      var list = document.createElement("li");
      var span = document.createElement("span");
      var div = document.createElement("div");
      var p = document.createElement("p");
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

  /**
   * The function currentDate() is called when the page loads. It creates a new Date object, and then
   * uses the getDay(), getMonth(), and getDate() methods to get the current day, month, and date. It
   * then uses the daylist and monthlist arrays to get the full name of the day and month. Finally, it
   * uses the innerHTML property to insert the current date into the HTML element with the id of
   * today-date
   */
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

  /**
   * The function addTaskList() is called when the user presses the enter key. It creates a new list item
   * with a div and a p element. The p element contains the text from the input field. The list item is
   * appended to the task list menu
   */
  function addTaskList() {
    var input = document.getElementById("tasklist-input");
    //document.getElementById("side-menu") = "";
    input.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        // var list = document.createElement("li");
        // var div = document.createElement("div");
        // var p = document.createElement("p");
        // list.innerHTML = '<span class="material-symbols-rounded"> list </span>';
        var inputFromUser = 
          document.getElementById("tasklist-input").value;
        // if (inputFromUser == "") {
        //   p.appendChild(document.createTextNode("Untitled"));
        // } else {
        //   p.appendChild(inputFromUser);
        // }
        // div.appendChild(p);
        // list.setAttribute("onclick", "task(this)");
        // list.appendChild(div);
        // var newTask = document.getElementById("task-list-menu");
        // newTask.appendChild(list);
        category.push({name:inputFromUser, icon:"list"});
        categoryRendering();
        input.value = "";
      }
    });
  }

  init();
})();

/**
 * When the user clicks on a task, the title of the page changes to the title of the task.
 * @param id - The id of the element that was clicked.
 */
function task(id) {
  document.getElementById("menu").innerHTML = id.innerHTML;
  var title = id.children[1].children[0].innerHTML;
  selectedCategory = title;
  document.title = title;
}

/**
 * When the user clicks the menu button, hide the side menu and change the menu button to a menu icon.
 */
function hideSideMenu() {
  // document.getElementsByClassName("side-container")[0].style.display = "none";
  // document.querySelector("#menu .material-symbols-rounded").innerHTML = "menu";
  // document
  //   .querySelector("#menu .material-symbols-rounded")
  //   .setAttribute("onclick", "showSideMenu()");
  var show = document.getElementById("show-menu");
  var menu = show.children[0].children[0];
  menu.setAttribute("onclick", "showSideMenu()");
  show.id = "hide-menu";
}

/**
 * When the user clicks the menu button, show the side menu.
 */
function showSideMenu() {
  // document.getElementsByClassName("side-container")[0].style.display =
  //   "inline-block";
  // document.querySelector("#menu .material-symbols-rounded").innerHTML = "menu";
  var hide = document.getElementById("hide-menu");
  var menu = hide.children[0].children[0];
  menu.setAttribute("onclick", "hideSideMenu()");
  hide.id = "show-menu";
}

function makeImportant(id) {
  id.id = "filled";
  id.setAttribute("onclick", "makeUnimportant(this)");
}

function makeTaskCompleted(id) {
  id.innerHTML = "check_circle";
  id.id = "filled";
  id.setAttribute("onclick", "makeTaskNotCompleted(this)");
}

function makeUnimportant(id) {
  id.id = "";
  id.setAttribute("onclick", "makeImportant(this)");
}

function makeTaskNotCompleted(id) {
  id.innerHTML = "radio_button_unchecked";
  id.id = "";
  id.setAttribute("onclick", "makeTaskCompleted(this)");
}

/**
 * The function addTask() adds an event listener to the input element with the id "task-input". The
 * event listener listens for the keypress event. When the keypress event is triggered, the function
 * addTaskInHtml() is called
 */
function addTask() {
  console.log(
    document.getElementById("menu").children[1].children[0].innerHTML
  );
  var input = document.getElementById("task-input");
  var taskCategory =
    document.getElementById("menu").children[1].children[0].textContent;
  input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      var div = document.createElement("div");
      var taskParentDiv = document.createElement("div");
      var taskDiv = document.createElement("div");
      var sublineDiv = document.createElement("div");
      var checkDiv = document.createElement("div");
      var starDiv = document.createElement("div");
      var starSpan = document.createElement("span");
      var checkSpan = document.createElement("span");
      var radio_button_unchecked = document.createTextNode(
        "radio_button_unchecked"
      );
      var star = document.createTextNode("star");
      taskParentDiv.className = "task";
      taskDiv.className = "task-added";
      sublineDiv.className = "sub-line-task";
      checkDiv.className = "check-container";
      starDiv.className = "star-container";
      checkSpan.className = "material-symbols-rounded";
      starSpan.className = "material-symbols-rounded";
      checkSpan.appendChild(radio_button_unchecked);
      starSpan.appendChild(star);
      checkSpan.setAttribute("onclick", "makeTaskCompleted(this)");
      starSpan.setAttribute("onclick", "makeImportant(this)");
      var inputFromUser = document.createTextNode(
        document.getElementById("task-input").value
      );
      taskDiv.appendChild(inputFromUser);
      var newTask = document.getElementById("tasks");
      sublineDiv.appendChild(document.createTextNode(selectedCategory));
      checkDiv.appendChild(checkSpan);
      starDiv.appendChild(starSpan);
      div.appendChild(checkDiv);
      taskParentDiv.appendChild(taskDiv);
      taskParentDiv.appendChild(sublineDiv);
      div.appendChild(taskParentDiv);
      div.appendChild(starDiv);
      newTask.appendChild(div);
      newTask.insertBefore(div, newTask.children[0]);
      input.value = "";
    }
  });
}
