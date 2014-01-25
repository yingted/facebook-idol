$(document).ready(function(){
  var curr_color = "blue";
  $(".pix").bind('click', function(){
    $(this).attr("color", curr_color);
  });

  $(".swatch").bind('click', function(){
    curr_color = $(this).attr("color");
  });

  
});