function currentDate() {
    var today = new Date();
    var daylist = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday ",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var monthlist = [
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
