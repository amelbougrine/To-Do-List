// Manage Tasks

var notComp = JSON.parse(localStorage.getItem("notComp"));
var compl = JSON.parse(localStorage.getItem("compl"));
var task = $("<div class='task'></div>");
var del = $("<i class='fas fa-trash-alt'></i>");
var check = $("<i class='fas fa-check'></i>");
$.each(notComp, function(i, item) {
  task.text(item.title);
  task.append(del,check);
  $(".notcomp").append(task);
  task.fadeIn();
  console.log($(".notcomp"));
})
$(".txt").on("keyup", function(e) {
  if (e.keyCode == 13 && $(".txt").val() != "") {
    $(".notcomp").css("display", "block");
    task.text($(".txt").val());
    del.click( function() {
      var p = $(this).parent();
      p.fadeOut(function(){
        p.remove();
      });
    });
    check.click( function(){
      var p = $(this).parent();
      // console.log (p[0].innerText);
      p.fadeOut( function() {
        $(".comp").css("display", "block");
        $(".comp").append(p);
        p.fadeIn();
      });
      // Local storage Compl
      compl.push({
        title: p[0].innerText
      });
      localStorage.setItem("Comp", JSON.stringify(compl));
      $(this).remove();
    });
    task.append(del,check);
    $(".notcomp").append(task);
    $(".txt").val("");
    notComp.push({
      title: $(".txt").val()
    });
    localStorage.setItem("notComp", JSON.stringify(notComp));
  }
});
// Time and Date
setInterval(() => {
  var dt = new Date();
  var time = dt.getHours() + " : " + dt.getMinutes();
  var date = dt.getDay() + " - " + dt.getMonth() + " - " +dt.getFullYear();
  $("#time").html(time);
  $("#date").html(date);
}, 1000);
// Music
$("#play").click(() => {
  $('#song').get(0).play();
});
$("#pause").click(() => {
  $('#song').get(0).pause();
});

