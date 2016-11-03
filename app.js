$(document).ready(function(){
  $('button').click(function () {
    var form = new Form();
    form.checkAll();
  });
});

function Rules () {
  this.name = {
    validate: function (input) {
      var value  = $(input).val();
      return value.length < 4 ?
       showError(input, "Username must be at least 4 characters long") : showCorrect(input);
    }
  },
  this.secondname = {
    validate: function (input) {
      var value  = $(input).val();
      return  value.length < 4 ?
      showError(input, "User secondname must be at least 4 characters long") : showCorrect(input);
    }
  },
  // начало строки, английские буквы от одной до бесконечности,
  // собака, опять буквы от одной до бесконечности, точка, буквы
  // от двух до четырёх (если почта где-нибудь на .info), конец строки.
  // Регистр букв не учитывается.
  this.email = {
    validate: function (input) {
      return /^\w+@\w+\.\w{2,4}$/i.test($(input).val()) ?
       showCorrect(input) : showError(input, "Must be a valid email address: handle@domain.com format");
    }
  },
  this.gender = {
    validate : function (input) {
      return $(input).find("option:selected").text() === "Select gender" ?
      showError(input, "Please chose gender") : showCorrect(input);
    }
  },
  this.password = {
    validate : function (input) {
     return /(?=.*\d)((?=.*[a-z])|(?=.*[A-Z]){4,}).{8,20}/.test($(input).val()) ?
     showCorrect(input) : showError(input,
      "requirements : 1)At least 8 characters" +
      "2) Only Latins, Upper and Lower case characters" +
      "3)At least 4 numbers"
      );
    }
  },
  this.checkbox = {
    validate : function (input) {
      return $(input).prop("checked") ? showCorrect(input) : showError(input, "You should agree with conditions");
    }
  }

  function showError (container, message) {
    $(container).addClass('error');
    $(container).siblings().addClass('error_icon');
    showErrorMessage(container, message);

    return false;
  }

  function showCorrect (container) {
    $(container).addClass('correct');
    $(container).siblings().addClass('correct_icon');
    showErrorMessage (container, "");

    return true;
  }

  function showErrorMessage (input, message) {
    $("span[data-name='" + $(input).data('name') + "']").text(message);
  }
}



function Form() {
  var rules = new Rules();
  var user = {
    name: undefined,
    secondname: undefined,
    email: undefined,
    gender: undefined,
    password: undefined,
    checkbox : undefined
  };
  var dataName;
  this.allinputs = $('input,select[data-name]');


  this.checkAll = function () {
    this.allinputs.each(function (index, item) {
      dataName = $(item).attr('data-name');
      if (rules[dataName].validate(item)) {
        user[dataName] = $(item).val();
      }
    });
    if (checkObj (user)) {
      createUser(user);
    }
  };

  function checkObj (obj) {
    for (key in obj) {
      if (obj[key] == undefined) {
        return false;
      }
    }

    return true;
  }

  function createUser (obj) {
    var request = $.ajax({
      method: "POST",
      url: "http://codeit.pro/frontTestTask/user/registration",
      data: {
      name: obj.name,
      secondname: obj.secondname,
      email: obj.email,
      gender: obj.gender,
      pass: obj.password,
      checkbox: obj.checkbox
      }
      })
      request.done(function( msg ) {

        if (msg.status == "OK") {
          window.location.replace("/mainPage.html");
        } else {
          $('h5').text(msg.message);
        }
      })

  }

}
