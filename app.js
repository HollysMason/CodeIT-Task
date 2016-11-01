function showError (container) {
  var divContainer = container.parentNode.childNodes[1];
  divContainer.classList.remove("correct_icon");
  divContainer.classList.add("error_icon");
  container.className = "error"

  return false;
}

function showCorrect (container) {
  container.parentNode.childNodes[1].classList.add("correct_icon");
  container.className = "correct";

  return true;
}

function check() {
  var form = document.forms.signUp;
  var firstInput =  form.elements.name;

  var a = !firstInput.value ? showError(firstInput) : showCorrect(firstInput);
  console.log(a);
}

$(document).ready(function(){

  $.ajax({
method: "POST",
url: "http://codeit.pro/frontTestTask/user/registration",
data: {
name: 'dasd',
secondname: 'dsda',
email: 'sadasd@dasda.da',
gender: 'male',
pass: "asdasdasd",
checkbox: true
}
})
.done(function( msg ) {
console.log(msg);
});

});
