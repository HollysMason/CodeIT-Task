//
// function showError (container) {
//   var divContainer = container.parentNode.childNodes[1];
//   divContainer.classList.remove("correct_icon");
//   divContainer.classList.add("error_icon");
//   container.className = "error"
//
//   return false;
// }
//
// function showCorrect (container) {
//   container.parentNode.childNodes[1].classList.add("correct_icon");
//   container.className = "correct";
//
//   return true;
// }
//
//
//
// function check() {
//   var form = document.forms.signUp;
//   var firstInput =  form.elements.name;
//
//   var a = !firstInput.value ? showError(firstInput) : showCorrect(firstInput);
//   console.log(a);
// }
//
// $(document).ready(function(){
//
//   $.ajax({
// method: "POST",
// url: "http://codeit.pro/frontTestTask/user/registration",
// data: {
// name: 'dasd',
// secondname: 'dsda',
// email: 'sadasd@dasda.da',
// gender: 'male',
// pass: "asdasdasd",
// checkbox: true
// }
// })
// .done(function( msg ) {
// console.log(msg);
// });
//
// });
(function () {
  'use strict';

  angular.module('FormApp', [])
  .controller('formController', formController)
  .service('formService', formService);

  formController.$inject = ['formService'];
  function formController (formService) {
    var reg = this;

    reg.complited = false;
    reg.errorCondition = "";

    reg.logSMT = function () {
      var promise = formService.registraiteUser();

      promise.then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    };

    // reg.submit = function () {
    //   var count = 1;
    //     for (item in reg.user) {
    //       count++;
    //     }
    //     if (count === 7) {
    //       var promise = formService.registraiteUser();
    //
    //       promise.then(function (response) {
    //         console.log(response.data);
    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //       });
    //
    //     } else if (count < 7 ) {
    //       reg.errorCondition = "Please fill the inputs."
    //     } else {
    //       reg.errorCondition = "Please accept condition."
    //     }
    //
    // };

  }

  formService.$inject = ['$http'];
  function formService ($http) {
      var service = this;

    service.registraiteUser = function () {
      var response = $http({
        method: "GET",
        url: ("http://codeit.pro/frontTestTask/user/registration"),
        params: {
          name: 'dasd',
          secondname: 'dsda',
          email: 'sadasd@daasda.da',
          gender: 'male',
          pass: "123457846",
          checkbox: true
        }
      });

        return response;
    };
  }
})()
