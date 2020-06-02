// Manage Tasks
$(".txt").on("keyup", function(e) {
  if (e.keyCode == 13 && $(".txt").val() != "") {
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
      p.fadeOut( function() {
        $(".comp").css("display", "block");
        $(".comp").append(p);
        p.fadeIn();
      });
      $(this).remove();
    });
    task.append(del,check);
    $(".notcomp").append(task);
    $(".txt").val("");
  }
});
// Time
var dt = new Date();
var time = dt.getHours() + " : " + dt.getMinutes();
var date = dt.getDay() + " - " + dt.getMonth() + " - " +dt.getFullYear();
$("#time").append(time);
$("#date").append(date);