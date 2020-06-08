$( document ).ready(function() {
  // Time and Date
  setInterval(() => {
    function addZero(i) {
      if (i < 10) { i = "0" + i;}
      return i;
    }
    var dt = new Date();
    var time = addZero(dt.getHours()) + " : " + addZero(dt.getMinutes());
    var date = addZero(dt.getDate()) + " - " + addZero(dt.getMonth()) + " - " +dt.getFullYear();
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
  // create task
  var notcomp = [];
  // JSON.parse(localStorage.getItem("notComp"));
  var comp = [];
  // JSON.parse(localStorage.getItem("Comp"));
  $(".txt").on("keyup", function(e) {
    if (e.keyCode == 13 && $(".txt").val() != "") {
      var task = $("<div class='task'></div>");
      var check = $("<i class='fas fa-check'></i>");
      var del = $("<i class='fas fa-trash-alt'></i>");
      task.text($(".txt").val());    
      task.append(del,check);
      $(".notcomp").append(task);
      notcomp.push({
        title: $(".txt").val()
      });
      console.log("push", $(".txt").val(), "to NComp local storage");
      localStorage.setItem("NComp", JSON.stringify(notcomp));
      $(".txt").val("");
      // Manage tasks - check -
      check.click( function(){
        var t = $(this).parent();
        t.fadeOut( function() {
          $(".comp").append(t);
          t.fadeIn();
        });
        $(this).remove();
        comp.push({
          title: t[0].innerText
        });
        notcomp = JSON.parse(localStorage.getItem("NComp"));
        var index = notcomp.findIndex(x => x.title === t[0].innerText);
        notcomp.splice(index, 1);
        localStorage.setItem("NComp", JSON.stringify(notcomp));
        localStorage.setItem("Comp", JSON.stringify(comp));
      });
      // Manage tasks - delete -
      del.click( function() {
        var t = $(this).parent();
        t.fadeOut(function(){
          t.remove();
        });
        if($('div.notcomp').has(t).length) {
          var index1 = notcomp.findIndex(x => x.title === t[0].innerText);
          notcomp.splice(index1, 1);
          localStorage.setItem("NComp", JSON.stringify(notcomp));
        } else {
          var index2 = comp.findIndex(x => x.title === t[0].innerText);
          comp.splice(index2, 1);
          localStorage.setItem("Comp", JSON.stringify(comp));
        }
      });
    }
  });
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
  
  

