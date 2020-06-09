$( document ).ready(function() {
  var notcomp = [];
  var comp = [];
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
  // Manage tasks - delete -
  function dele(t) {
    console.log(t);
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
  };
  // Manage tasks - check -
  function checked(t) {
    console.log(t);
    t.fadeOut( function() {
      $(".comp").append(t);
      t.fadeIn();
    });
    comp.push({
      title: t[0].innerText
    });
    notcomp = JSON.parse(localStorage.getItem("NComp"));
    var index = notcomp.findIndex(x => x.title === t[0].innerText);
    notcomp.splice(index, 1);
    localStorage.setItem("NComp", JSON.stringify(notcomp));
    localStorage.setItem("Comp", JSON.stringify(comp));
  };
  // load local storage
  if (localStorage.getItem("NComp") != null){
    notcomp = JSON.parse(localStorage.getItem("NComp"));
    var del = $("<i class='fas fa-trash-alt'></i>");
    var check = $("<i class='fas fa-check'></i>");
    $.each(notcomp, function (i) {
      $.each(notcomp[i], function() {
        var task = $("<div class='task'></div>");
        var t= task.text(notcomp[i].title);
        t.append(del);
        t.append(check);
        $(".notcomp").append(t);
      });
    });
    // event listener
    check.click(function() {
      var t = $(this).parent();
      console.log(this);
      checked(t);
      $(this).remove();
    });    
    del.click(function() { 
      var t = $(this).parent();
      dele(t);
    });
  }
  if (localStorage.getItem("Comp") != null){
    comp = JSON.parse(localStorage.getItem("Comp"));
    $.each(comp, function (i) {
      $.each(comp[i], function() {
        var task = $("<div class='task'></div>");
        var del = $("<i class='fas fa-trash-alt'></i>");
        var t= task.text(comp[i].title);
        t.append(del);
        $(".comp").append(t);
      });
    }); 
    // event listener   
    var del = $("<i class='fas fa-trash-alt'></i>");
    del.click(function() { 
      var t = $(this).parent();
      dele(t);
    });
  }
  // create task
  $(".txt").on("keyup", function(e) {
    if (e.keyCode == 13 && $(".txt").val() != "") {
      var del = $("<i class='fas fa-trash-alt'></i>");
      var check = $("<i class='fas fa-check'></i>");
      var t = $("<div class='task'></div>");
      t.text($(".txt").val());  
      t.append(del,check);
      $(".notcomp").append(t);
      notcomp.push({
        title: $(".txt").val()
      });
      localStorage.setItem("NComp", JSON.stringify(notcomp));
      $(".txt").val("");
      // event listener
      check.click(function() {
        var t = $(this).parent();
        console.log(this);
        checked(t);
        $(this).remove();
      });    
      del.click(function() { 
        var t = $(this).parent();
        dele(t);
      });
    } 
  });
  
});