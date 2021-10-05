---
layout: null
---
$(document).ready(function () {
  $('a.blog-button').click(function (e) {
        currentWidth = $(window).width()
    if (currentWidth < 960) {
      $('.panel-cover').addClass('panel-cover--collapsed')
    } else {
      $('.about-wrapper').removeClass('animated slideInLeft')
      $('.content-wrapper').addClass('animated slideInRight')
      $('.panel-cover').removeClass('panel-cover--collapsed-right')
      $('.panel-cover').animate({'right': '62%', 'width': '40%'}, 400, swing = 'swing', function () {})
      $('.panel-cover').addClass('panel-cover--collapsed-left')
    }
  })

  $('a.about-button').click(function (e) {
    currentWidth = $(window).width()
    if (currentWidth < 960) {
      $('.panel-cover').addClass('panel-cover--collapsed')
    } else {
      $('.content-wrapper').removeClass('animated slideInRight')
      $('.about-wrapper').addClass('animated slideInLeft')
      $('.panel-cover').removeClass('panel-cover--collapsed-left')
      $('.panel-cover').animate({'right': '0', 'width': '67%'}, 400, swing = 'swing', function () {})
      $('.panel-cover').addClass('panel-cover--collapsed-right')
    }
  })

  if (window.location.hash && window.location.hash == '#blog') {
    currentWidth = $(window).width()
    if (currentWidth < 960) {
      $('.panel-cover').addClass('panel-cover--collapsed')
    } else {
      $('.panel-cover').addClass('panel-cover--collapsed-left')
    }
  }

  if (window.location.hash && window.location.hash == '#about') {
    currentWidth = $(window).width()
    if (currentWidth < 960) {
      $('.panel-cover').addClass('panel-cover--collapsed')
    } else {
      $('.panel-cover').addClass('panel-cover--collapsed-right')
    }
  }

  if (window.location.pathname !== '{{ site.baseurl }}/' && window.location.pathname !== '{{ site.baseurl }}/index.html') {
    $('.panel-cover').addClass('panel-cover--collapsed-left')
  }

  $('.btn-mobile-menu').click(function () {
    $('.navigation-wrapper').toggleClass('visible animated bounceInDown')
    $('.btn-mobile-menu__icon').toggleClass('icon-list icon-x-circle animated fadeIn')
  })

  $('.navigation-wrapper .blog-button').click(function () {
    $('.navigation-wrapper').toggleClass('visible')
    $('.btn-mobile-menu__icon').toggleClass('icon-list icon-x-circle animated fadeIn')
  })

  $('.navigation-wrapper .about-button').click(function () {
    $('.navigation-wrapper').toggleClass('visible')
    $('.btn-mobile-menu__icon').toggleClass('icon-list icon-x-circle animated fadeIn')
  })

})
