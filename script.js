// Manage Tasks
var notComp = [];
var compl = [];
$(".txt").on("keyup", function(e) {
  if (e.keyCode == 13 && $(".txt").val() != "") {
    // Local storage notComp
    notComp.push({
      title: $(".txt").val()
    });
    localStorage.setItem("notComp", JSON.stringify(notComp));

    $(".notcomp").css("display", "block");
    var task = $("<div class='task'></div>").text($(".txt").val());
    var del = $("<i class='fas fa-trash-alt'></i>").click( function() {
      var p = $(this).parent();
      p.fadeOut(function(){
        p.remove();
      });
    });
    var check = $("<i class='fas fa-check'></i>").click( function(){
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

