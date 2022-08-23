$(document).ready(function(){
    $('.slider__photos').slick({
        speed: 1200,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/chevron-left-solid.svg" alt="left"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/chevron-right-solid.svg" alt="right"></button>',
        responsive: [
            {
              breakpoint: 992,
              settings: {
                arrows: false,
                dots: true
              }
            }
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    // $('.catalog-item__link').each(function(i) {
    //   $(this).on('click', function(e) {
    //     e.preventDefault();
    //     $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
    //     $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    //   });
    // });

    // $('.catalog-item__back').each(function(i) {
    //   $(this).on('click', function(e) {
    //     e.preventDefault();
    //     $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
    //     $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    //   });
    // });

    function toggleSlide(item) {
      $(item).each(function(i) {
        $(this).on('click', function(e) {
          e.preventDefault();
          $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
          $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        });
      });
    }
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');
    
    //Modal
    $('[data-modal=consult]').on('click', function(){
      $('.overlay, #consult').fadeIn();
    });

    $('.modal-close').on('click', function() {
      $('.overlay, #consult, #buy, #thanks').fadeOut();
    });

    $('.catalog-item__btn').each(function(i) {
      $(this).on('click', function() {
        $('#buy .modal-subtitle').text($('.catalog-item__title').eq(i).text());
        $('.overlay, #buy').fadeIn();
      });
    });
   
    function validForm(item) {
      $(item).validate({
        rules: {
          name: {
            required: true,
            minlength: 2
          },
          phone: "required",
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          name: {
            required: "Введите ваше имя",
            minlength: "Введите минимум 2 символа"
          },
          phone: "Введите ваш номер телефона",
          email: {
            required: "Введите вашу почту",
            email: "Ваша почта введена неверно"
  
          }
        }
      });
    }

    validForm('#buy form');
    validForm('#consult form');
    validForm('.consult__form');
  
    $('input[name=phone]').mask("+375 (99) 999-99-99");

    $('form').submit(function(e) {
      e.preventDefault();
      $.ajax({
          type: "POST",
          url: "mailer/smart.php",
          data: $(this).serialize()
      }).done(function() {
          $(this).find("input").val("");
          $('#consult, #buy').fadeOut();
          $('.overlay, #thanks').fadeIn('slow');

          $('form').trigger('reset');
      });
      return false;
  });

  });

