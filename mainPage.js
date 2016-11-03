$(document).ready(function () {
  $.ajax({
    method: "GET",
    url: "http://codeit.pro/frontTestTask/company/getList",
  }).done(function (msg) {
    console.log(msg);
  });
  $.ajax({
    method: "GET",
    url: "http://codeit.pro/frontTestTask/news/getList",
  }).done(function (msg) {
    console.log(msg);
  });
});
