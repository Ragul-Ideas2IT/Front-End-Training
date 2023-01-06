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
    // renderTaskDetail();
  }

  var taskListInput = document.getElementById("tasklist-input");
  var taskInput = document.getElementById("task-input");
  var taskList = document.getElementById("side-menu");
  var showHide = document.getElementById("show-hide");
  var inputFromUser = document.getElementById("task-input");
  var addButton = document.getElementById("add-button");
  var taskName = document.getElementById("task-name");
  var rightSideHider = document.getElementById("right-side-hider");
  // var detailsBody = document.getElementById("details-body");
  var taskNotes = document.getElementById("task-notes");
  var previousCategory;
  var currentCategory;
  var previousTask;
  var currentTask;
  var tasks = [];
  var category = [
    {
      id: "c1",
      name: "My Day",
      icon: "wb_sunny",
    },
    {
      id: "c2",
      name: "Important",
      icon: "star",
    },
    {
      id: "c3",
      name: "Planned",
      icon: "calendar_month",
    },
    {
      id: "c4",
      name: "Assigned to me",
      icon: "person",
    },
    {
      id: "c5",
      name: "Tasks",
      icon: "home",
    },
  ];
  var selectedCategory = category[0];
  var selectedTask;

  function eventListener() {
    taskInput.addEventListener("keypress", addTaskEvent);
    taskListInput.addEventListener("keypress", addTaskListEvent);
    showHide.addEventListener("click", hideSideMenu);
    addButton.addEventListener("mousedown", addTaskEvent);
    rightSideHider.addEventListener("click", hideRightSideMenu);
    taskNotes.addEventListener("input", addNotesInTask);
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
      var taskCount = getCountOfTasksPerCategory(element.name);
      list.id = element.id;
      list.className = "side-menu-option-container";
      // list.setAttribute("type", "button");
      list.addEventListener("click", passSelectedCategoryEvent);
      span.className = "material-symbols-rounded";
      span.appendChild(document.createTextNode(element.icon));
      div.className = "menu-detail";
      p.appendChild(
        document.createTextNode(
          element.name + " " + (taskCount > 0 ? taskCount : "")
        )
      );
      div.appendChild(p);
      list.appendChild(span);
      list.appendChild(div);
      taskList.appendChild(list);
    }
    selectCategory();
  }

  function tasksRendering() {
    for (let index = 0; index < tasks.length; index++) {
      const element = tasks[index];
      var subCategory;
      var sublineDiv = document.createElement("div");
      sublineDiv.className = "sub-line-task";
      if (
        element.categories.includes(selectedCategory.name) ||
        (selectedCategory.name == "Important" && element.isUnderImportant)
      ) {
        subCategory = element.categories.filter(checkCategory);
        sublineDiv.appendChild(document.createTextNode(subCategory));
        renderTask(element, sublineDiv);
      }
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
    var check_circle = document.createTextNode("check_circle");
    var inputFromUserNode = document.createTextNode(element.name);
    var star = document.createTextNode("star");
    div.id = element.taskId;
    div.className = "task";
    taskParentDiv.className = "task-holder";
    taskDiv.className = "task-added";
    checkDiv.className = "check-container";
    starDiv.className = "star-container";
    checkSpan.setAttribute("taskId", element.taskId);
    starSpan.setAttribute("taskId", element.taskId);
    checkSpan.className = "material-symbols-rounded";
    starSpan.className = "material-symbols-rounded";
    if (element.isUnderImportant) {
      starSpan.id = "filled";
    } else {
      starSpan.id = "";
    }
    if (element.isCompleted) {
      checkSpan.id = "filled";
      checkSpan.appendChild(check_circle);
    } else {
      checkSpan.id = "";
      checkSpan.appendChild(radio_button_unchecked);
    }
    div.addEventListener("click", showRightSideMenu);
    starSpan.addEventListener("click", makeImportant);
    starSpan.appendChild(star);
    checkSpan.addEventListener("click", makeTaskCompleted);
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

  function renderTaskDetail(event) {
    selectedTask = tasks[event.target.id - 1];
    previousTask = currentTask;
    currentTask = document.getElementById(selectedTask.taskId);
    if (previousTask != undefined) {
      previousTask.classList.remove("task-selected");
    }
    currentTask.classList.add("task-selected");
    var taskDiv = document.createElement("div");
    var checkDiv = document.createElement("div");
    var starDiv = document.createElement("div");
    var starSpan = document.createElement("span");
    var checkSpan = document.createElement("span");
    var radio_button_unchecked = document.createTextNode(
      "radio_button_unchecked"
    );
    var check_circle = document.createTextNode("check_circle");
    var inputFromUserNode = document.createTextNode(selectedTask.name);
    var star = document.createTextNode("star");
    taskDiv.className = "task-clicked";
    checkDiv.className = "check-container";
    starDiv.className = "star-container";
    checkSpan.className = "material-symbols-rounded";
    starSpan.className = "material-symbols-rounded";
    checkSpan.setAttribute("taskId", selectedTask.taskId);
    starSpan.setAttribute("taskId", selectedTask.taskId);
    if (selectedTask.isUnderImportant) {
      starSpan.id = "filled";
    } else {
      starSpan.id = "";
    }
    if (selectedTask.isCompleted) {
      checkSpan.id = "filled";
      checkSpan.appendChild(check_circle);
    } else {
      checkSpan.id = "";
      checkSpan.appendChild(radio_button_unchecked);
    }
    starSpan.addEventListener("click", makeImportant);
    starSpan.appendChild(star);
    checkSpan.addEventListener("click", makeTaskCompleted);
    taskDiv.appendChild(inputFromUserNode);
    checkDiv.appendChild(checkSpan);
    starDiv.appendChild(starSpan);
    taskName.appendChild(checkDiv);
    taskName.appendChild(taskDiv);
    taskName.appendChild(starDiv);
    taskNotes.value="";
    if(selectedTask.notes != undefined) {
      taskNotes.value = selectedTask.notes; 
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
  function addTaskListEvent(event) {
    if (event.key === "Enter") {
      var inputFromUser = document.getElementById("tasklist-input").value;
      var categoryLength = category.length;
      if (inputFromUser.trim() == "") {
        category.push({
          id: "c"+ (++categoryLength),
          name: "Untitled list",
          icon: "list",
        });
      } else {
        category.push({
          id: "c"+ (++categoryLength),
          name: inputFromUser,
          icon: "list",
        });
      }
      document.getElementById("side-menu").innerHTML = "";
      selectedCategory = category[category.length - 1];
      categoryRendering();
      taskListInput.value = "";
    }
  }

  function passSelectedCategoryEvent(event) {
    selectedCategory = category[event.target.id - 1];
    selectCategory();
  }

  function selectCategory() {
    previousCategory = currentCategory;
    currentCategory = document.getElementById(selectedCategory.id);
    if (previousCategory != undefined) {
      previousCategory.classList.remove("category-selected");
    }
    currentCategory.classList.add("category-selected");
    var name = selectedCategory.name;
    var icon = selectedCategory.icon;
    document.getElementById("content-icon").innerHTML = icon;
    document.getElementById("content-category").innerHTML = name;
    document.title = name + " - To Do";
    document.getElementById("tasks").innerHTML = "";
    hideRightSideMenu();
    tasksRendering();
  }

  function addTaskEvent(event) {
    if (event.key === "Enter" || event.button == 0) {
      if (inputFromUser.value.trim() != "") {
        var tasksLength = tasks.length;
        var tasksElement = {
          taskId: ++tasksLength,
          name: inputFromUser.value,
          isUnderImportant: false,
          isCompleted: false,
          categories: [],
        };
        switch (selectedCategory.name) {
          case "Important":
            tasksElement.isUnderImportant = true;
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
            tasksElement.categories.push(selectedCategory.name);
        }
        tasks.push(tasksElement);
        document.getElementById("tasks").innerHTML = "";
        tasksRendering();
        taskInput.value = "";
        document.getElementById("side-menu").innerHTML = "";
        categoryRendering();
      }
    }
  }

  function addNotesInTask(event) {
    // if(event.key === "Enter") {
      selectedTask.notes = taskNotes.value;
      // taskNotes.value = "";
    // }
  }
  function getCountOfTasksPerCategory(categoryForCount) {
    var count = 0;
    for (let index = 0; index < tasks.length; index++) {
      const element = tasks[index];
      if (!element.isCompleted) {
        if (
          element.categories.includes(categoryForCount) ||
          (categoryForCount == "Important" && element.isUnderImportant)
        ) {
          count++;
        }
      }
    }
    return count;
  }

  function checkCategory(category) {
    return category != selectedCategory.name;
  }

  function makeImportant(event) {
    var target = event.target;
    var targetTaskId = target.attributes.taskId.value;
    if (target.id == "filled") {
      target.id = "";
      tasks[targetTaskId - 1].isUnderImportant = false;
    } else {
      target.id = "filled";
      tasks[targetTaskId - 1].isUnderImportant = true;
    }
    document.getElementById("side-menu").innerHTML = "";
    categoryRendering();
  }

  function makeTaskCompleted(event) {
    var target = event.target;
    var targetTaskId = target.attributes.taskId.value;
    if (target.id == "filled") {
      target.innerHTML = "radio_button_unchecked";
      target.id = "";
      tasks[targetTaskId - 1].isCompleted = false;
    } else {
      target.id = "filled";
      target.innerHTML = "check_circle";
      tasks[targetTaskId - 1].isCompleted = true;
    }
    document.getElementById("side-menu").innerHTML = "";
    categoryRendering();
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
    var contentIcon = document.getElementById("content-icon");
    contentIcon.innerHTML = selectedCategory.icon;
    hide.id = "show-menu";
  }

  function showRightSideMenu(event) {
    var rightHide = document.getElementById("hide-right-menu");
    if(rightHide != null) {
      rightHide.id = "show-right-menu";
    }
    taskName.innerHTML = "";
    renderTaskDetail(event);
  }

  function hideRightSideMenu() {
    var rightShow = document.getElementById("show-right-menu");
    if(rightShow != null) {
      rightShow.id = "hide-right-menu";    
    }
  } 
  init();
})();
