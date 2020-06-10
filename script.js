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
  // load local storage
  if (localStorage.getItem("NComp") !== "[]" && localStorage.getItem("NComp") !== null) {
    notcomp = JSON.parse(localStorage.getItem("NComp"));
    $(".notcomp").css("display", "block");
    $.each(notcomp, function (i) {
      $.each(notcomp[i], function() {
        var t = $("<div class='task'></div>");
        var d = $("<i class='fas fa-trash-alt'></i>");
        var c = $("<i class='fas fa-check'></i>");
        t.text(notcomp[i].title);
        t.append(d, c);
        $(".notcomp").append(t);
        // event listener
        c.click(function() {
          let t = $(this).parent();
          checked(t);
          $(this).remove();
        });    
        d.click(function() { 
          let t = $(this).parent();
          dele(t);
        });
      });
    });    
  }
  if (localStorage.getItem("Comp") !== "[]" && localStorage.getItem("Comp") !== null){
    comp = JSON.parse(localStorage.getItem("Comp"));
    $(".comp").css("display", "block");
    $.each(comp, function (i) {
      $.each(comp[i], function() {
        var t = $("<div class='task'></div>");
        var d = $("<i class='fas fa-trash-alt'></i>");
        t.text(comp[i].title);
        t.append(d);
        $(".comp").append(t);
        // event listener   
        d.click(function() { 
          let t = $(this).parent();
          dele(t);
        });
      });
    }); 
  }
  // create task
  $(".txt").on("keyup", function(e) {
    if (e.keyCode == 13 && $(".txt").val() != "") {
      var t = $("<div class='task'></div>");
      var d = $("<i class='fas fa-trash-alt'></i>");
      var c = $("<i class='fas fa-check'></i>");
      $(".notcomp").css("display", "block");
      t.text($(".txt").val());  
      t.append(d,c);
      $(".notcomp").append(t);
      notcomp.push({
        title: $(".txt").val()
      });
      localStorage.setItem("NComp", JSON.stringify(notcomp));
      $(".txt").val("");
      // event listener
      c.click(function() {
        let t = $(this).parent();
        checked(t);
        $(this).remove();
      });    
      d.click(function() { 
        let t = $(this).parent();
        dele(t);
      });
    } 
  });
  // Manage tasks - delete -
  function dele(t) {
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
    if (notcomp.length === 0) {
      $(".notcomp").css("display", "none");
    }
    if (comp.length === 0) {
      $(".comp").css("display", "none");
    }
  };
  // Manage tasks - check -
  function checked(t) {
    t.fadeOut( function() {
      $(".comp").css("display", "block");
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
    if (notcomp.length === 0) {
      $(".notcomp").css("display", "none");
    }
  };
});