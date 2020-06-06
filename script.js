// declaire variable
var notComp = JSON.parse(localStorage.getItem("notComp"));
var compl = JSON.parse(localStorage.getItem("Comp"));
var check = $("<i class='fas fa-check'></i>");
var del = $("<i class='fas fa-trash-alt'></i>");
var task = $("<div class='task'></div>");

$( document ).ready(function() {
  // Time and Date
  setInterval(() => {
    function addZero(i) {
      if (i < 10) { i = "0" + i;}
      return i;
    }
    var dt = new Date();
    var time = addZero(dt.getHours()) + " : " + addZero(dt.getMinutes());
    var date = addZero(dt.getDay()) + " - " + addZero(dt.getMonth()) + " - " +dt.getFullYear();
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
  // Load storage
  // $.each(notComp, function(i, item) {
  //   let t= $("<div class='task'></div>").text(item.title);
  //   t.append($("<i class='fas fa-trash-alt'></i>"));
  //   t.append($("<i class='fas fa-check'></i>"));
  //   $(".notcomp").append(t);
  // });
  // $.each(compl, function(i, item) {
  //   let t= $("<div class='task'></div>").text(item.title);
  //   t.append($("<i class='fas fa-trash-alt'></i>"));
  //   $(".comp").append(t);
  // });
  // Manage tasks - check -
  check.click( function(){
    var t = $(this).parent();
    t.fadeOut( function() {
      $(".comp").append(t);
      t.fadeIn();
      console.log(t,"to .comp");
    });
    $(this).remove();
    // compl.push({
    //   title: t[0].innerText
    // });
    // console.log("push", t[0].innerText);
    // localStorage.setItem("Comp", JSON.stringify(compl));
    
  });
  // Manage tasks - delete -
  del.click( function() {
    var t = $(this).parent();
    t.fadeOut(function(){
      t.remove();
      console.log(t,"removed");
    });
  });
  // create task
  $(".txt").on("keyup", function(e) {
    if (e.keyCode == 13 && $(".txt").val() != "") {
      task.text($(".txt").val());    
      task.append(del,check);
      $(".notcomp").append(task);
      $(".txt").val("");
      // notComp.push({
      //   title: $(".txt").val()
      // });
      // console.log("push", $(".txt").val());
      // localStorage.setItem("notComp", JSON.stringify(notComp));
    }
  });
});
