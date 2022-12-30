currentDate();
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

function addTask() {
  var input = document.getElementById("task-input");
  input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      var list = document.createElement("li");
      var div = document.createElement("div");
      list.innerHTML = '<span class="material-symbols-rounded"> list </span>';
      var inputFromUser = document.createTextNode(
        document.getElementById("task-input").value
      );
      if (inputFromUser == "") {
        div.appendChild("Untitled");
      } else {
        div.appendChild(inputFromUser);
      }
      list.appendChild(div);
      var newTask = document.getElementById("task-list");
      newTask.appendChild(list);
      newTask.insertBefore(list, newTask.children[6]);
    }
  });
}

function task(id) {
  document.getElementById('menu').innerHTML = id.innerHTML;
}
