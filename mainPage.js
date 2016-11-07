$(document).ready(function () {
  // 'уже слишком поздно обнаружил баг, слайдер с открытой секцией "Companies partners" перелистывается не плавно'
  var companies;
  $.ajax({
      method: "GET",
      url: "http://codeit.pro/frontTestTask/company/getList",
    }).done(function (msg) {
      $('div.main_loader').css('display','none');
      $('div.carousel,article.total').css('display','block');
      companies = new Companies(msg);
      companies.totalCompanies();
      companies.listOfCompanies();
      $('ul.list_companies li').click(function (event) {
        $('ul.list_companies li').removeClass('chosed');
        $(event.target).addClass('chosed');
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

      companies.loadLocation();

      $('div.grafic').click(function (event) {
          var country = $(event.currentTarget).find('span.name_locarion_company').text();

          companies.showCompaniesInCountry(country);
      });
      $('button.back').click(function (item, i) {
          companies.backToGraphic();
      });


    });

    $.ajax({
      method: "GET",
      url: "http://codeit.pro/frontTestTask/news/getList",
    }).done(function (msg) {
        var news = new News(msg);

        $('.nav_slide').click(function (event) {

          news.slide($(event.currentTarget).index());
        });

        news.loadNews();
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



  this.loadLocation = function () {
    var a = {};
    var count = 0;
    this.comp.list.forEach(function (item , i) {
       a[item.location.name] = 0;

       //  a[item.location.name] = findAllCompanies(item.location.name);
     });

    var massCom = this.comp.list;
    for (key in a) {
      var count = 0;
      massCom.forEach(function (item, i) {
        if (item.location.name == key) {
            count++;
        }
      });
      a[key] = count;
    }
    loadCountriesInPercents(a, massCom.length);
  };

  function loadCountriesInPercents(obj, amountOfCompanies) {
    for (key in obj) {
      $('.companies_location').append(
        '<div class="grafic">' +
        '<span class="name_locarion_company">' + key + '</span>' +
          '<div class="container_location" style="height:' + ((obj[key]/amountOfCompanies * 100) + 40 )  +'px">' +
            '<span class="percent_company_location">'  + obj[key] + '%' + '</span>' +
          '</div>' +
        '</div>'
      )
    }
  }

  // этот алгоритм для поиска всех компаниый в каждом городе быстрее
  // но была ошибка, я не успел ее пофиксить
  // var companies = this.comp;
  // function findAllCompanies (nameCountry) {
  //   var count = 0;
  //   companies = companies.list;
  //
  //   companies.forEach(function (item, i) {
  //       if (item.location.name === nameCountry) {
  //         count++;
  //       }
  //   });
  //   return count;
  // };

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

  this.showCompaniesInCountry = function (country) {
    $('div.companies_location').css('display','none');
    $('ul.listOfComInCountries').css('display','block');
    $('button.back').css('display','block');
    var companies = this.comp.list;
    companies.forEach(function (item, i) {
      if (item.location.name === country) {
        $('ul.listOfComInCountries').append('<li>' + item.name + '</li>');
      }
    });
  };

  this.backToGraphic = function () {

    $('button.back').css('display','none');
    $('ul.listOfComInCountries').css('display','none');
    $('div.companies_location').css('display','flex');
  };



}

function News (obj) {
  this.news = obj;
  this.logAll = function () {
    console.log(this.news.list);
  };
  var active = 0;
  var lenthOfnews = this.news.list.length - 1;
  this.slide = function (direction) {
    if (direction == 1 && active !== lenthOfnews) {

        active++;
        $('.slides').animate({right: active * 100 + '%'},1000);
    } else if (direction == 0 && active != 0) {
        active--;
        $('.slides').animate({right: active * 100 + '%'},1000);
    }
  };
  this.loadNews = function () {
    var arrNews = this.news.list;

    $('div.slides').css('width', this.news.list.length * 100 + '%');
    $('div.news').css('width', 100 / this.news.list.length + '%' );
    var date;
    for (var i = 0, max = this.news.list.length; i < max; i++) {
    date = new Date(Number(arrNews[i].date));
      $('div.slides').append(
        '<div class="news">' +
          '<article class="news_content">'+
            '<figure>'+
              '<img src="' + arrNews[i].img + '" alt="" />'+
              '<figcaption>'+
                '<b>Author: </b>' + arrNews[i].author + '<br>'+
                '<b>Public: </b>' + date.getDate() + '.' + (date.getMonth()+1) + '.' + date.getFullYear() +
              '</figcaption>'+
            '</figure>'+
            '<article class="paragrapher">'+
            '<h1><a href=" ' + arrNews[i].link + ' "> Missed header in Object </a></h1>' +

              formatText(arrNews[i].description) +

            '</article>'+
          '</article>'+
        '</div>'
      );
    }


  };

  function formatText (text) {
    if (text.length < 228) {
      return text;
    }

    return text.slice(0, 228) + '...';
  }
}
