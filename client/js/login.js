$(document).ready(function(){
  $("#btn-login").click(function(){
    var username = $('#inputUsername').val();
    var password = $('#inputPassword').val();
    var reg = new RegExp(/\b(select|insert\s+into|update|delete\s+from|create\s+(table|view|index|database)|alter\s+table|drop\s+(table|view|index|database)|truncate\s+table|from|where|group\s+by|having|order\s+by|join|inner\s+join|left\s+join|right\s+join|full\s+join|union\s+(all)?|distinct|count|sum|avg|min|max|case\s+when|when|then|else|end|like|in|between|is\s+(not\s+)?null|and|or|not|exists|values|set|primary\s+key|foreign\s+key|references|default|check|unique|index|commit|rollback|begin\s+transaction|grant|revoke|exec(ute)?|declare|cursor|fetch|open|close|with\s+recursive?)\b/i);

    if (reg.test(username) || reg.test(password)) {
      $('#inputUsername').addClass("error");
      $('#inputPassword').addClass("error");
    } else {
      var payload = {username: username, password: password};

      $.ajax({
        type: 'POST',
        url: "http://176.108.253.3:8080/login",
        data: JSON.stringify(payload),
        dataType: "json",
        contentType: "application/json"
      })
      .fail(function(data){
        alert("Whoops, try again");
      })
      .done(function(data){
        localStorage.jwt = data.token;
        var username = JSON.parse(atob(data.token.split('.')[1]))['sub'];
        localStorage.username = username;
        window.location.replace("index.html");
      })
    }
  });
});