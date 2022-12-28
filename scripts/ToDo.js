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
  // console.log(date);
  document.getElementById("today-date").innerHTML = date;
}

function addTask() {
  document.querySelector("#tasks").innerHTML += `
     <div class="task">
     <span class="material-symbols-rounded"> list </span>
         <span id="task-name">
             ${document.querySelector("#newtask input").value}
         </span>
     </div>
 `;
}
