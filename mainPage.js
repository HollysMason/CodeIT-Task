$(document).ready(function () {
  var companies;
  var comp =  $.ajax({
      method: "GET",
      url: "http://codeit.pro/frontTestTask/company/getList",
    }).done(function (msg) {
      $('div.main_loader').css('display','none');
      companies = new Companies(msg);
      companies.totalCompanies();
      companies.listOfCompanies();
      $('ul.list_companies li').click(function (event) {

        companies.lisPartners($(event.target).text());
      });

      $('div.by_percent_up').click(function () {
        companies.compare('<');
      });
      $('div.by_percent_down').click(function () {
        companies.compare('>');
      });
      $('div.by_name_up').click(function () {
        companies.compare('A');
      });
      $('div.by_name_down').click(function () {
        companies.compare('a');
      });
    });


});


function Companies (obj) {
  this.comp = obj;
  this.currentPartners;
  this.lastSort = function () {
    return this.compare('>');
  };


  this.totalCompanies = function () {
    var companies = this.comp.list;
    var totalComp = 0;
    for (key in companies) {
      totalComp++;
    }

    $('article.total').text(totalComp);
  };

  this.listOfCompanies = function () {
    var companies = this.comp.list;
    for (key in companies) {
      $('.list_companies').append('<li class="list_companies_item">' + companies[key].name + '</li>');
    }
  };

  this.lisPartners = function (eventLi) {
    var companies = this.comp.list;
    for (key in companies) {
      if (companies[key].name === eventLi) {
        this.currentPartners = companies[key].partners;
      }
    }
    this.lastSort();
  };



  function showPartners (arrPartners, char) {
    $('span.sorted_by').text(char);
    $('div.mid').css('display','block');
    $('ul.parter_list_container').empty();

    for (var key in arrPartners) {
      $('ul.parter_list_container').append(
        '<li class="partner_container">' +
          '<div class="partner_content">' +
            '<article class="percent">' +
              arrPartners[key].value + '%' +
            '</article>' +
            '<div class="stand">'+

            '</div>' +
            '<article class="name_partner_company">' +
              arrPartners[key].name +
            '</article>' +
          '</div>' +
        '</li>'
      );
    }
  }

  function compareValueUp(itemA, itemB) {
    if (itemA.value > itemB.value) return -1;
    if (itemA.value < itemB.value) return 1;
  }
  function compareValueDown (itemA, itemB) {
    if (itemA.value > itemB.value) return 1;
    if (itemA.value < itemB.value) return -1;
  }
  function compareNameUp (itemA, itemB) {
    if (itemA.name > itemB.name) return -1;
    if (itemA.name < itemB.name) return 1;
  }
  function compareNameDown (itemA, itemB) {
    if (itemA.name > itemB.name) return 1;
    if (itemA.name < itemB.name) return -1;
  }
  this.compare = function (char) {
    var arr = this.currentPartners;
    if (char == '<') {
      arr.sort(compareValueDown);
      showPartners(arr, char);
      this._newLasSort(char)

      return;
    } else  if (char == '>') {
      arr.sort(compareValueUp);
      showPartners(arr, char);
      this._newLasSort(char);

      return;
    } else if (char == 'A') {
      arr.sort(compareNameUp);
      showPartners(arr, char);
      this._newLasSort(char);

      return;
    } else if (char == 'a') {
      arr.sort(compareNameDown);
      showPartners(arr, char);
      this._newLasSort(char);

      return;
    }
  }

  this._newLasSort = function (char){
    this.lastSort = function () {
      return this.compare(char);
    };
  };

}






var getNews = function () {
  $.ajax({
    method: "GET",
    url: "http://codeit.pro/frontTestTask/news/getList",
  }).done(function (msg) {
      console.log(msg);
  });
};
