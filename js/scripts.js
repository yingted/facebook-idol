$(document).ready(function(){
  $("#cs350notes").bind('click', function(){
    mixpanel.track("viewed cs350notes");
  });

  $("#cs341notes").bind('click', function(){
    mixpanel.track("viewed cs341notes");
  });

  $("#co331notes").bind('click', function(){
    mixpanel.track("viewed co331notes");
  });
});