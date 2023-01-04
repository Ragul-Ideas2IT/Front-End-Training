/* A self-invoking function. It is a function that calls itself. */
(function () {
  /**
   * It calls the functions that are needed to run the app.
   */
  function init() {
    currentDate();
    categoryRendering();
    tasksRendering();
    eventListener();
  }

  var selectedCategory = "My Day";
  var taskListInput = document.getElementById("tasklist-input");
  var taskInput = document.getElementById("task-input");
  var taskList = document.getElementById("side-menu");
  var showHide = document.getElementById("show-hide");
  var inputFromUser = document.getElementById("task-input");
  var add = document.getElementById("add");
  var tasks = [];
  var category = [
    {
      id: 1,
      name: "My Day",
      icon: "wb_sunny",
    },
    {
      id: 2,
      name: "Important",
      icon: "star",
    },
    {
      id: 3,
      name: "Planned",
      icon: "calendar_month",
    },
    {
      id: 4,
      name: "Assigned to me",
      icon: "person",
    },
    {
      id: 5,
      name: "Tasks",
      icon: "home",
    },
  ];

  function eventListener() {
    taskInput.addEventListener("keypress", addTaskEvent);
    taskListInput.addEventListener("keypress", addTaskListEvent);
    showHide.addEventListener("click", hideSideMenu);
    add.addEventListener("click", addTaskEvent);
  }

  /**
   * It creates a list item for each category and appends it to the side menu
   */
  function categoryRendering() {
    for (let index = 0; index < category.length; index++) {
      const element = category[index];
      var list = document.createElement("li");
      var span = document.createElement("span");
      var div = document.createElement("div");
      var p = document.createElement("p");
      list.id = element.id;
      list.className = "side-menu-option-container";
      list.addEventListener("click", selectedTask);
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

  function tasksRendering() {
    for (let index = 0; index < tasks.length; index++) {
      const element = tasks[index];
      var sublineDiv = document.createElement("div");
      sublineDiv.className = "sub-line-task";
      if (element.categories.includes(selectedCategory)) {
        sublineDiv.appendChild(document.createTextNode(element.categories));
        renderTask(element, sublineDiv);
      }
      // for (let index1 = 0; index1 < element.categories.length; index1++) {
      //   const element1 = element.categories[index1];
      //   if (selectedCategory == element1) {
      //       if(element1 == "Important") {
      //         sublineDiv.appendChild(document.createTextNode("Important"));
      //       }
      //       if(element1 == "My Day") {
      //         sublineDiv.appendChild(document.createTextNode("My Day"));
      //       }
      //       if(element1 == "Tasks") {
      //         sublineDiv.appendChild(document.createTextNode("Tasks"));
      //       }
      //     // sublineDiv.appendChild(document.createTextNode(element1));
      //     renderTask(element, sublineDiv);
      //   }
      // }
      // if(selectedCategory == element.category) {
      //   if(element.isUnderImportant) {
      //     sublineDiv.appendChild(document.createTextNode("Important"));
      //   }
      //   if(element.isUnderMyDay) {
      //     sublineDiv.appendChild(document.createTextNode("My Day"));
      //   }
      //   if(element.isUnderTasks) {
      //     sublineDiv.appendChild(document.createTextNode("Tasks"));
      //   }
      //   renderTask(element, sublineDiv);
      // }
      // if ((selectedCategory == "Important" && element.category == "Important") || element.isUnderImportant) {
      //   sublineDiv.appendChild(document.createTextNode("Imp"));
      //   renderTask(element, sublineDiv);
      // }
      // if ((selectedCategory == "My Day" && element.category == "My Day") || element.isUnderMyDay) {
      //   sublineDiv.appendChild(document.createTextNode("My day"));
      //   renderTask(element, sublineDiv);
      // }
      // if ((selectedCategory == "Tasks" && element.category == "Tasks") || element.isUnderTasks) {
      //   sublineDiv.appendChild(document.createTextNode("Tasks"));
      //   renderTask(element, sublineDiv);
      // }
    }
  }

  function renderTask(element, sublineDiv) {
    var div = document.createElement("div");
    var taskParentDiv = document.createElement("div");
    var taskDiv = document.createElement("div");
    var checkDiv = document.createElement("div");
    var starDiv = document.createElement("div");
    var starSpan = document.createElement("span");
    var checkSpan = document.createElement("span");
    var radio_button_unchecked = document.createTextNode(
      "radio_button_unchecked"
    );
    var inputFromUserNode = document.createTextNode(element.name);
    var star = document.createTextNode("star");
    taskParentDiv.className = "task";
    taskDiv.className = "task-added";
    checkDiv.className = "check-container";
    starDiv.className = "star-container";
    checkSpan.className = "material-symbols-rounded";
    starSpan.className = "material-symbols-rounded";
    starSpan.id = "";
    checkSpan.appendChild(radio_button_unchecked);
    starSpan.appendChild(star);
    checkSpan.addEventListener("click", makeTaskCompleted);
    starSpan.addEventListener("click", makeImportant);
    taskDiv.appendChild(inputFromUserNode);
    var newTask = document.getElementById("tasks");
    checkDiv.appendChild(checkSpan);
    starDiv.appendChild(starSpan);
    div.appendChild(checkDiv);
    taskParentDiv.appendChild(taskDiv);
    taskParentDiv.appendChild(sublineDiv);
    div.appendChild(taskParentDiv);
    div.appendChild(starDiv);
    newTask.appendChild(div);
    newTask.insertBefore(div, newTask.children[0]);
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
  function addTaskListEvent(event) {
    if (event.key === "Enter") {
      var inputFromUser = document.getElementById("tasklist-input").value;
      var categoryLength = category.length;
      console.log(categoryLength);
      if (inputFromUser.trim() == "") {
        category.push({
          id: ++categoryLength,
          name: "Untitled list",
          icon: "list",
        });
      } else {
        category.push({
          id: ++categoryLength,
          name: inputFromUser,
          icon: "list",
        });
      }
      document.getElementById("side-menu").innerHTML = "";
      categoryRendering();
      taskListInput.value = "";
    }
  }

  /**
   * When the user clicks the menu button, hide the side menu and change the menu button to a menu icon.
   */
  function hideSideMenu() {
    var show = document.getElementById("show-menu");
    var menu = document.getElementById("menu").children[0];
    menu.innerHTML = "menu";
    menu.addEventListener("click", showSideMenu);
    show.id = "hide-menu";
  }

  /**
   * When the user clicks the menu button, show the side menu.
   */
  function showSideMenu() {
    var hide = document.getElementById("hide-menu");
    hide.id = "show-menu";
  }

  function selectedTask(event) {
    var id = event.target.id;
    var title = category[id - 1].name;
    var icon = category[id - 1].icon;
    document.getElementById("content-icon").innerHTML = icon;
    document.getElementById("content-category").innerHTML = title;
    selectedCategory = title;
    document.title = title;
    document.getElementById("tasks").innerHTML = "";
    tasksRendering();
  }

  function addTaskEvent(event) {
    console.log(event.key);
    if (event.key === "Enter") {
      if (inputFromUser.value.trim() != "") {
        var tasksElement = {
          name: inputFromUser.value,
          categories: [],
        };
        switch (selectedCategory) {
          case "Important":
            tasksElement.categories.push("Important");
            tasksElement.categories.push("Tasks");
            break;
          case "My Day":
            tasksElement.categories.push("My Day");
            tasksElement.categories.push("Tasks");
            break;
          case "Tasks":
            tasksElement.categories.push("Tasks");
            break;
          default:
            tasksElement.categories.push(selectedCategory);
        }
        tasks.push(tasksElement);
        document.getElementById("tasks").innerHTML = "";
        tasksRendering();
        taskInput.value = "";
      }
    }
  }

  function makeImportant(event) {
    var id = event.target;
    id.id = "filled";
    id.removeEventListener("click", makeImportant);
    id.addEventListener("click", makeUnimportant);
  }
  
  function makeUnimportant(event) {
    var id = event.target;
    id.id = "";
    id.removeEventListener("click", makeUnimportant);
    id.addEventListener("click", makeImportant);
  }
  
  function makeTaskCompleted(event) {
    var id = event.target;
    id.innerHTML = "check_circle";
    id.id = "filled";
    id.removeEventListener("click", makeTaskCompleted);
    id.addEventListener("click", makeTaskNotCompleted);
  }
  
  function makeTaskNotCompleted(event) {
    var id = event.target;
    id.innerHTML = "radio_button_unchecked";
    id.id = "";
    id.removeEventListener("click", makeTaskNotCompleted);
    id.addEventListener("click", makeTaskCompleted);
  }
  init();
})();


