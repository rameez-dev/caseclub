/* ==================================================
#Featured collection
#Featured promotions
#Slideshow
#Testimonials
#Gallery
#Video
#Cart
#Product
#Header
#Map
#Global accordions
#Global shortcodes

/*============================================================================
  Featured collection
==============================================================================*/

window.featuredCollection = {
  init() {
    $('.js-product-slider .products-slider').each((index, value) => {
      const productsPerSlide = $(value).data('products-per-slide');
      const productsLimit = $(value).data('products-limit');
      const productsAvailable = $(value).data('products-available');
      let cellAlign = '';
      let draggable = false;
      let prevNext = false;
      let wrapAround = false;
      let initialIndex = 0;

      // Ensure product media libraries are present
      window.Shopify.loadFeatures([
        {
          name: 'shopify-xr',
          version: '1.0',
        },
        {
          name: 'model-viewer-ui',
          version: '1.0',
        },
      ], window.productMedia.setupMedia);

      if (
        (
          productsPerSlide === '2'
          && productsAvailable > productsPerSlide
          && productsLimit > productsPerSlide
        )
        || (
          productsPerSlide === '4'
          && productsAvailable > productsPerSlide
          && productsLimit > productsPerSlide
        )
        || (
          productsPerSlide === '6'
          && productsAvailable > productsPerSlide
          && productsLimit > productsPerSlide
        )
      ) {
        cellAlign = 'left';
      } else {
        cellAlign = 'center';
      }

      if (productsAvailable > productsPerSlide && productsLimit > productsPerSlide) {
        draggable = true;
        prevNext = true;
        wrapAround = true;
      } else {
        draggable = false;
        prevNext = false;
        wrapAround = false;
      }

      if (
        (
          productsPerSlide === '2'
          && productsAvailable > productsPerSlide
        )
        || (
          productsPerSlide === '4'
          && productsAvailable > productsPerSlide
        )
        || (
          productsPerSlide === '6'
          && productsAvailable > productsPerSlide
        )
      ) {
        initialIndex = 0;
      } else if (productsPerSlide === '3' && productsAvailable) {
        initialIndex = 1;
      } else if (productsPerSlide === '5' && productsAvailable) {
        initialIndex = 2;
      } else if (productsPerSlide === '7' && productsAvailable) {
        initialIndex = 3;
      }

      if (window.Shopify.media_queries.medium.matches) {
        cellAlign = 'center';
        draggable = true;
        prevNext = true;
        wrapAround = true;
        initialIndex = 1;

        $(value).parents('.even-num-slides').removeClass('even-num-slides');
      }

      $(value).flickity({
        lazyLoad: 2,
        imagesLoaded: true,
        draggable,
        prevNextButtons: prevNext,
        wrapAround,
        cellAlign,
        pageDots: window.usePageDots,
        contain: true,
        freeScroll: true,
        arrowShape: window.arrowSize,
        initialIndex,
      });

      $(value).addClass('slider-initialized');
    });
  },
  unload($target) {
    const $slider = $target.find('.js-product-slider');

    if ($slider.hasClass('flickity-enabled')) {
      $slider.flickity('destroy');
    }
  },
};

/*============================================================================
  Featured promotions
==============================================================================*/
window.featuredPromotions = {
  init() {
    $('.feature-overlay').hover(function () {
      $(this).find('.feature-details').slideDown('100', function () {
        $(this).addClass('reveal-details');
      });
    }, function () {
      $(this).find('.feature-details').removeClass('reveal-details');
      $(this).find('.feature-details').slideUp('100');
    });

    $('.js-featured-promotions').each(function () {
      const $promos = $(this);
      const animationStyle = $(this).data('promo-animation');

      $promos.waypoint(function () {
        $(this.element).find('.feature-section').addClass(`animated ${animationStyle}`);
      }, { offset: '80%' });
    });
  },
};

/*============================================================================
  Slideshow
==============================================================================*/

window.slideshow = {
  init() {
    $('.js-homepage-slideshow').each(function () {
      const $homepageSlider = $(this);
      const settings = {
        slideshowSpeed: $homepageSlider.data('slideshow-speed') * 1000,
        slideshowTextAnimation: $homepageSlider.data('slideshow-text-animation'),
        adaptiveHeight: $homepageSlider.data('adaptive-height'),
      };

      // Initiate the slideshow
      if (!$homepageSlider.hasClass('flickity-enabled')) {
        const arrowShow = $homepageSlider.find('.gallery-cell').length === 1 ? false : true;
        $homepageSlider.flickity({
          adaptiveHeight: settings.adaptiveHeight,
          wrapAround: true,
          cellAlign: 'left',
          imagesLoaded: true,
          prevNextButtons: arrowShow,
          draggable: arrowShow,
          autoPlay: settings.slideshowSpeed,
        });

        if (settings.slideshowTextAnimation !== '') {
          const flkty = $homepageSlider.data('flickity');
          setTimeout(() => {
            $homepageSlider.find('.gallery-cell:nth-child(1) .caption-content').addClass(`animated ${settings.slideshowTextAnimation}`);
          }, 400);

          $homepageSlider.on('select.flickity', () => {
            if ($homepageSlider.is(':visible')) {
              const currentSlide = flkty.selectedIndex + 1;
              setTimeout(() => {
                $homepageSlider.find('.caption-content').removeClass(`animated ${settings.slideshowTextAnimation}`);
                $homepageSlider.find(`.gallery-cell:nth-child(${currentSlide}) .caption-content`).addClass(`animated ${settings.slideshowTextAnimation}`);
              }, 400);
            }
          });
        }
      }

      if ($homepageSlider.find('.gallery-cell').length > 1) {
        $homepageSlider.addClass('multi-image');
      } else {
        $homepageSlider.addClass('single-image');
      }
    });
  },
  unload($target) {
    const $slider = $target.find('.js-homepage-slideshow');
    $slider.flickity('destroy');
  },
};

/*============================================================================
  Testimonials
==============================================================================*/

window.testimonials = {
  init() {
    $('.js-testimonial').each(function () {
      const $testimonialSlider = $(this);
      const settings = {
        slideshowSpeed: $testimonialSlider.data('slideshow-speed') * 1000,
        slideshowTextAnimation: $testimonialSlider.data('slideshow-text-animation'),
        adaptiveHeight: $testimonialSlider.data('adaptive-height'),
      };

      if ($('.testimonial-image').length > 0) {
        $('.testimonial-block').each(function () {
          if ($(this).find('.testimonial-image').length === 0) {
            const theBlock = $(this).closest('.testimonial-block');
            $(theBlock).addClass('set-testimonial-height');
          }
        });
      }

      // Initiate the slideshow
      if (!$testimonialSlider.hasClass('flickity-enabled')) {
        const arrowShow = $testimonialSlider.find('.gallery-cell').length === 1 ? false : true;
        $testimonialSlider.flickity({
          adaptiveHeight: settings.adaptiveHeight,
          wrapAround: true,
          cellAlign: 'left',
          imagesLoaded: true,
          prevNextButtons: arrowShow,
          draggable: arrowShow,
          autoPlay: settings.slideshowSpeed,
        });

        if (settings.slideshowTextAnimation !== '') {
          const flkty = $testimonialSlider.data('flickity');
          setTimeout(() => {
            $testimonialSlider.find('.gallery-cell:nth-child(1) .caption-content').addClass(`animated ${settings.slideshowTextAnimation}`);
          }, 400);

          $testimonialSlider.on('select.flickity', () => {
            if ($testimonialSlider.is(':visible')) {
              const currentSlide = flkty.selectedIndex + 1;
              setTimeout(() => {
                $testimonialSlider.find('.caption-content').removeClass(`animated ${settings.slideshowTextAnimation}`);
                $testimonialSlider.find(`.gallery-cell:nth-child(${currentSlide}) .caption-content`).addClass(`animated ${settings.slideshowTextAnimation}`);
              }, 400);
            }
          });
        }
      }

      if ($testimonialSlider.find('.gallery-cell').length > 1) {
        $testimonialSlider.addClass('multi-image');
      } else {
        $testimonialSlider.addClass('single-image');
      }
    });
  },
  unload($target) {
    const $slider = $target.find('.js-testimonial');
    $slider.flickity('destroy');
  },
};

/*============================================================================
  Gallery
==============================================================================*/

window.gallery = {
  init() {
    $('.gallery-horizontal').find('.gallery-image-wrapper').each(function () {
      const wrapper = $(this);
      const images = $(this).find('img');
      let imgWidth;
      let imgHeight;

      $('<img />').attr('src', $(images).attr('src')).on('load', function () {
        imgWidth = this.width;
        imgHeight = this.height;

        $(wrapper).css('flex-basis', imgWidth * 200 / imgHeight);
        $(wrapper).css('flex-grow', imgWidth * 200 / imgHeight);
        $(wrapper).find('i').css('padding-bottom', `${imgHeight / imgWidth * 100}%`);
      });
    });

    if ($('[rel=gallery]').length) {
      $('[rel=gallery]').fancybox({
        baseClass: 'gallery-section__lightbox',
        clickContent: 'nextOrClose',
      });
    }
  },
};

/*============================================================================
  Video
==============================================================================*/
window.video = {
  init() {

    // Set up plyr for newly embedded video
    var featuredVideos = $('[data-video-element]').get();

    var featuredVideoPlayers = Plyr.setup(featuredVideos, {
      controls: window.videoControls,
      fullscreen: {
        enabled: true,
        fallback: true,
        iosNative: true
      },
      storage: {
        enabled: false
      }
    });

    // Adds plyr video id to video wrapper
    $.each(featuredVideoPlayers, function(index, player) {
      var id = player.id;
      var $video;

      if (player.isHTML5) {
        $video = $(player.elements.wrapper).find('video');
        $video.attr('data-plyr-video-id', id);
      }

      // When a video is playing, pause any other instances
      player.on('play', function(event) {
        var instance = event.detail.plyr;
        $.each(featuredVideoPlayers, function(index, player) {
          if (instance.id != player.id) {
            player.pause();
          }
        })
      })

      // Moves players from video section into global array
      if (window.globalVideoPlayers) {
        window.globalVideoPlayers.push(player);
      }
    })

    $('[data-video-element]').each(function(index, video) {

      // Variables
      var $video = $(video);
      var $section = $video.parents('.shopify-section').attr('id', id);
      var $videoElement = $section.find($video);
      var $videoWrapper = $videoElement.parents('.video-wrapper');
      var $playButton = $videoWrapper.find('[data-play-button]');
      var $secondaryButton = $videoWrapper.find('[data-secondary-button]');
      var $videoText = $videoWrapper.find('[data-video-text]');
      var $videoTextContainer = $videoWrapper.find('[data-video-text-container]');
      var $image = $videoWrapper.find('.video-wrapper__image');
      var $posterImage = $videoWrapper.data('poster-image-uploaded');
      var aspectRatio = $videoWrapper.data('aspect-ratio');
      var id = $videoWrapper.data('video-src');
      var isAutoplay = $videoWrapper.data('autoplay');
      var isLoopingEnabled = $videoWrapper.data('autoloop');
      var isMuted = $videoWrapper.data('mute-video');

      $.each(featuredVideoPlayers, function(index, player) {
        var videoID;
        var playerID;

        if (player.isYouTube || player.isVimeo) {
          var videoID = $videoWrapper.attr('id');
          var playerID = $(player.elements.original).attr('id');
        } else if (player.isHTML5) {
          var videoID = $videoWrapper.find('[data-plyr-video-id]').data('plyr-video-id');
          var playerID = player.id;
          $videoElement = $section.find('.plyr--video');
        }

        if (playerID == videoID) {

          // Reset play button icon
          $videoWrapper.removeClass('play-button-icon--visible');

          // Autoplay
          if (isAutoplay) {
            // If on desktop or player is YouTube/Vimeo
            if (window.Shopify.media_queries.large.matches || player.isYouTube || player.isVimeo) {

              player.autoplay = true;

              // Hide image
              $image.hide();

              // Show video
              $videoElement.show();

              // If display text over video unchecked
              if ($videoTextContainer.hasClass('display-text-over-video--false')) {
                $videoText.hide();
              } else {
                $videoText.show();
              }

              // Keep play button hidden
              $playButton.hide();

              // HTML5 Mobile Video
            } else if (window.Shopify.media_queries.medium.matches && player.isHTML5) {

              // Hide image
              $image.hide();

              // Show video
              $videoElement.show();

              // Display button so that video can be played
              $playButton.show();

              player.on('play', function() {
                // Show video
                $videoElement.show();

                // Hide play button
                $playButton.hide();
              })
            }
          } else { // If Autoplay disabled
            // If poster image, show image wrapper otherwise hide it
            if ($posterImage) {
              $image.show();
              $videoElement.hide();
            } else {
              $videoElement.show();
            }
          }

          // Clicking image will play video
          $image.on('click', function() {
            // Hide image
            $(this).hide();

            // Show video
            $videoElement.show();

            player.play();
          })

          // Muted
          if (isMuted) {
            player.muted = true;
          }

          // Aspect Ratio
          if (aspectRatio) {
            player.ratio = aspectRatio;
          }

          // Looping
          if (isLoopingEnabled) {
            player.loop = true;
          }

          // Show Video Controls
          // - video controls get hidden using a css class: '.video-controls-enabled--false'

          // If button exists, hide text and poster
          if ($playButton) {
            $playButton.on('click', function() {

              // Play video
              player.play();
            })
          }

          player.on('statechange', event => {
            //Check if unstarted when state changed and play if so
            if(event.detail.code == '-1') {
              player.play();
            }
          });

          player.on('play', function() {

            // Hide image
            $image.hide();

            // Reset play button icon
            $videoWrapper.removeClass('play-button-icon--visible');

            // Show video
            $videoElement.show();

            // If display text over video unchecked
            if ($videoTextContainer.hasClass('display-text-over-video--false')) {
              $videoTextContainer.hide();
            } else {
              $videoTextContainer.show();
            }

            // Hide play button
            if ($playButton) {
              $playButton.hide();
            }

            // Hide secondary button
            if ($secondaryButton) {
              $secondaryButton.hide();
            }
          })

          // If video is paused, show play button icon
          player.on('pause', function() {
            if ($playButton.is(':hidden') || $playButton.length == 0) {
              $videoWrapper.addClass('play-button-icon--visible');
            }
          })

          // If page loads with video paused and no button showing, show icon
          if (!player.playing && $playButton.is(':hidden') || $playButton.length == 0) {
            $videoWrapper.addClass('play-button-icon--visible');
          }

          return false;
        }
      })
    })
  },
};

/*============================================================================
  Cart
==============================================================================*/
window.cart = {
  init() {
    if ($('#cart_form .tos_agree').length) {
      // Terms of service on cart page
      $('body').on('click', "#cart_form input[type='submit']", function () {
        if ($(this).parents('form').find('.tos_agree').is(':checked')) {
          $(this).submit();
        } else {
          const warning = `<p class="warning animated bounceIn">${Shopify.translation.agree_to_terms_warning}</p>`;
          if ($('p.warning').length === 0) {
            $(this).before(warning);
          }
          return false;
        }
      });
    }
  },
};

/*============================================================================
  Product
==============================================================================*/
window.selectCallback = function (variant, selector) {
  const evt = document.createEvent('HTMLEvents');
  const $product = $(`.product-${selector.product.id}`);
  const $notifyForm = $(`.notify-form-${selector.product.id}`);
  const $productForm = $('.product_form, .shopify-product-form', $product);
  const variantInventory = $productForm.data('variant-inventory');

  const $notifyFormInputs = $('.notify_form__inputs', $product);
  const notifyEmail = window.Shopify.translation.notify_email;
  const notifyEmailValue = '';
  const notifySend = window.Shopify.translation.notify_email_send;
  const notifyUrl = $notifyFormInputs.data('url');

  // Manually trigger change event so
  // pure JS listeners can receive it
  evt.initEvent('change', false, true);
  selector.variantIdField.dispatchEvent(evt);

  if (variant) {
    if (variant.title != null) {
      // Escape variant titles
      window.variantTitle = variant.title.replace(/"/g, '&quot;');
      window.notifyMessage = window.Shopify.translation.notify_message_first + window.variantTitle + window.Shopify.translation.notify_message_last + notifyUrl;
    }
  } else {
    window.notifyMessage = window.Shopify.translation.notify_message_first + window.Shopify.translation.notify_message_last + notifyUrl;
  }

  if ($notifyFormInputs.hasClass('customer--true')) {
    const notifyCustomerEmail = '';
    window.notifyEmailInput = `<input type="hidden" class="notify_email" name="contact[email]" id="contact[email]" value="${notifyCustomerEmail}" />`;
  } else {
    window.notifyEmailInput = `<input required type="email" class="notify_email" name="contact[email]" id="contact[email]" placeholder="${notifyEmail}" value="${notifyEmailValue}" />`;
  }
  window.notifyFormHTML = `${window.notifyEmailInput}<input type="hidden" name="challenge" value="false" /><input type="hidden" name="contact[body]" class="notify_form_message" data-body="${window.notifyMessage}" value="${window.notifyMessage}" /><input class="global-button global-button--primary" type="submit" value="${notifySend}" style="margin-bottom:0px" />`;

  // Image Variant feature
  if (variant && variant.featured_image && $product.is(':visible')) {
    const $sliders = $('.js-product-gallery', $product);
    $sliders.each((_, slider) => {
      const $slider = $(slider);
      const $sliderInstance = window.Flickity.data($slider[0]);
      if ($slider && $sliderInstance !== undefined) {
        const index = $(`[data-image-id="${variant.featured_media.id}"]`).data('index');
        $sliderInstance.select(index, false, true);
      }
    });
  }

  // Toggles images in product slider when inline quickshop and layout set to slider
  if (variant && variant.featured_image && $product.is(':visible')) {
    if (window.Shopify.theme_settings.product_form_style === 'dropdown' && window.Shopify.theme_settings.quick_shop_style === 'inline') {
      const $selectedVariants = $('.products-slider').find('select option:not(.selector-wrapper select option)').filter(':selected');
      $selectedVariants.each(function toggleImage() {
        if ($(this).data('featured-image')) {
          const swatchImage = $(this).data('image');
          const $quickShopElement = $(this).parents('.thumbnail').find('.image__container img');

          $quickShopElement.attr('src', swatchImage);
          $quickShopElement.attr('srcset', swatchImage);
        }
      });
    }
  }

  if (variant) {
    if (variantInventory) {
      variantInventory.forEach(v => {
        if (v.id === variant.id) {
          const currentVariant = variant;
          currentVariant.inventory_quantity = v.inventory_quantity;
          currentVariant.inventory_management = v.inventory_management;
          currentVariant.inventory_policy = v.inventory_policy;
        }
      });
    }

    $('.sku span', $product).text(variant.sku);

    if (window.Shopify.theme_settings.product_form_style === 'swatches') {
      const { length } = variant.options;
      for (let i = 0; i < length; i++) {
        const radioButton = $productForm.find(`.swatch[data-option-index="${escape(i)}"] :radio[value="${variant.options[i].replace(/"/g, '\\"')}"]`);
        if (radioButton.length) {
          radioButton.get(0).checked = true;
        }
      }
    } else {
      $('.notify_form_message', $product).attr('value', `${$('.notify_form_message', $product).data('body')} - ${window.variantTitle}`);
    }
  }

  if (variant && variant.available === true) {
    if (variant.inventory_management && variant.inventory_quantity > 0) {
      if (window.Shopify.theme_settings.display_inventory_left) {
        if (variant.inventory_quantity === 1) {
          window.itemsLeftText = window.Shopify.translation.one_item_left;
        } else {
          window.itemsLeftText = window.Shopify.translation.items_left_text;
        }

        const inventoryThreshold = parseInt(window.Shopify.theme_settings.inventory_threshold, 10);
        if (variant.inventory_quantity <= inventoryThreshold) {
          $('.items_left', $product).html(`${variant.inventory_quantity} ${window.itemsLeftText}`);
        } else {
          $('.items_left', $product).html('');
        }
      }
      if (window.Shopify.theme_settings.limit_quantity) {
        if (variant.inventory_policy === 'deny') {
          $('.quantity', $product).attr('max', variant.inventory_quantity);
        }
      }
    } else {
      $('.items_left', $product).text('');
      $('.quantity', $product).removeAttr('max');
    }

    $('.sold_out', $product).text('');
    $('.add_to_cart', $product).removeClass('disabled').removeAttr('disabled').find('span')
      .text($('.add_to_cart', $product).data('label'));
    $('.shopify-payment-button', $product).removeClass('disabled');
    $('.purchase-details__buttons', $product).removeClass('product-is-unavailable');
    $('.modal_price', $product).removeClass('variant-unavailable');
    $product.find($notifyForm).hide();
    $product.find($notifyFormInputs).empty();
  } else {
    // When product is sold out
    const message = variant ? window.Shopify.theme_settings.sold_out_text : window.Shopify.translation.unavailable_text;

    if (variant) {
      $('.modal_price', $product).removeClass('variant-unavailable');
    } else {
      // Add class to quickshop so we know variant is unavailable
      $('.modal_price', $product).addClass('variant-unavailable');
    }

    $('.items_left', $product).text('');
    $('.quantity', $product).removeAttr('max');
    $('.sold_out', $product).text(message);
    $('.purchase-details__buttons', $product).addClass('product-is-unavailable');
    $('.add_to_cart', $product).addClass('disabled').attr('disabled', 'disabled').find('span')
      .text(message);
    $('.shopify-payment-button', $product).addClass('disabled');
    $notifyForm.hide();
    $notifyFormInputs.empty();

    if (variant && !variant.available) {
      $notifyForm.fadeIn();
      $notifyFormInputs.empty();
      $notifyFormInputs.append(window.notifyFormHTML);
    }
  }

  if (window.Currency.show_multiple_currencies) {
    window.currencyConverter.convertCurrencies();
  }
};

window.productPage = {

  loadQuickshop(url) {
    return window.shopifyAsyncview.load(
      url, // Template name
      { view: '_quickshop' }, // View name (suffix)
    );
  },
  init() {
    window.Shopify.loadFeatures([
      {
        name: 'shopify-xr',
        version: '1.0',
      },
      {
        name: 'model-viewer-ui',
        version: '1.0',
      },
    ], window.productMedia.setupMedia);

    if ($('.js-full-width-product-images').length) {
      window.imageFunctions.fullWidth('.shopify-section--product-template .product .description img', '.js-full-width-product-images');
    }

    // Call enable gallery function for product galleries
    $('[data-product-gallery]:not(.product-recommendations [data-product-gallery])').each(function () {
      const $productGallery = $(this);
      window.productPage.enableGallery($productGallery);
    });

    if (window.location.search === '?contact_posted=true') {
      $('.notify_form .contact-form').hide();
      $('.notify_form .contact-form').prev('.message').html(window.Shopify.translation.notify_success_text);
    }

    if (window.Shopify.theme_settings.product_form_style === 'swatches') {
      $('body').on('change', '.swatch :radio', function swatchLogic() {
        const optionIndex = $(this).closest('.swatch').attr('data-option-index');
        const optionValue = $(this).val();
        const parentForm = $(this).closest('.product_form form');
        let notifyForm;

        if (parentForm.siblings('.notify_form').length) {
          window.notifyForm = parentForm.siblings('.notify_form');
        } else {
          window.notifyForm = $('.js-notify-form');
        }

        const option1 = parentForm.find('.swatch_options input:checked').eq(0).val();
        const option2 = parentForm.find('.swatch_options input:checked').eq(1).val() || '';
        const option3 = parentForm.find('.swatch_options input:checked').eq(2).val() || '';
        let notifyMessage;

        if (option1 && option2 && option3) {
          window.notifyMessage = `${option1} / ${option2} / ${option3}`;
        } else if (option1 && option2) {
          window.notifyMessage = `${option1} / ${option2}`;
        } else {
          window.notifyMessage = option1;
        }

        window.notifyForm.find('.notify_form_message').attr('value', `${window.notifyForm.find('.notify_form_message').data('body')} - ${window.notifyMessage}`);

        $(this)
          .closest('form')
          .find('.single-option-selector')
          .eq(optionIndex)
          .val(optionValue)
          .trigger('change');
      });
    }

    $('.js-product-gallery a').fancybox({
      width: 800,
      height: 800,
      baseClass: 'product-section__lightbox',
      clickContent: false,
      afterShow(instance) {
        const zoom = instance.$trigger.first().parents('.js-product-gallery').data('zoom');
        if (zoom) {
          $('.fancybox-image').last()
            .wrap('<span class="zoom-wrap" style="display:inline-block"></span>')
            .css('display', 'block')
            .parent()
            .zoom({
              touch: false,
              magnify: 1,
            });
        }
      },
      afterClose(instance) {
        const $instanceGallery = instance.$trigger.first().parents('.js-product-gallery');
        $instanceGallery.hide();
        setTimeout(() => {
          $instanceGallery.fadeIn(100);
          $('.js-product-gallery').find('.is-selected a').focus();
        }, 1);
      },
    });

    /*
    If the product recommendations section exists, run the loadProductRecommendations method
    The selectCallback within this method will only affect the products in the product recommendations section
    */

    if ($('.shopify-section--recommended-products').length) {
      window.productPage.loadProductRecommendations();
    }
  },
  runOptionSelector($element) {
    let $defaultSelector = $('.js-product_section [data-product-form]:not(.product-recommendations .js-product_section [data-product-form]');

    if ($element) {
      $defaultSelector = $element;
    }

    $defaultSelector.each((_, options) => {
      const $options = $(options);
      const $productDetails = $options.closest('.product__details');

      // Set up variables for price ui and surface pickup
      let priceUIEl;

      const paymentTerms = new window.PaymentTerms($productDetails[0]);

      // If smaller screen size and thumbnail hover enabled
      // use price ui element inside of caption instead
      if (window.Shopify.media_queries.medium.matches && window.Shopify.theme_settings.hover_enabled && window.Shopify.theme_settings.quick_shop_enabled && window.Shopify.theme_settings.quick_shop_style === 'inline') {
        priceUIEl = $productDetails.find('.product-info__caption [data-price-ui]')[0];
      } else {
        priceUIEl = $productDetails.find('[data-price-ui]')[0];
      }

      const priceUIBadgeEl = $productDetails.find('[data-price-ui-badge]')[0];
      const surfacePickUpEl = $productDetails.find('[data-surface-pick-up]')[0];
      const JSONData = $options.data('product');
      const isPriceSavingsEnabled = $options.hasClass('price-savings-enabled--true');
      const productTitle = $options.data('product-title');

      let priceUI;
      let priceUIBadge;
      let surfacePickUp;
      let currentVariant;

      if (priceUIEl) {
        priceUI = new window.ShopifyPriceUI.PriceUI(priceUIEl);
      }

      if (priceUIBadgeEl) {
        priceUIBadge = new window.ShopifyPriceUI.PriceUIBadge(priceUIBadgeEl);
      }

      if (surfacePickUpEl) {
        surfacePickUp = new window.ShopifySurfacePickUp(surfacePickUpEl);
        surfacePickUp.onModalRequest(contents => {
          const surfacePickUpModal = document.querySelector('[data-surface-pick-up-modal]');
          let fragment;
          if (currentVariant.title && productTitle) {
            fragment = document.createDocumentFragment();
            const header = document.createElement('div');
            const title = document.createElement('h2');
            header.classList.add('surface-pick-up__modal-header');
            title.classList.add('surface-pick-up__modal-title');
            title.innerHTML = productTitle;
            header.appendChild(title);
            if (currentVariant.title !== 'Default Title') {
              const subtitle = document.createElement('span');
              subtitle.classList.add('surface-pick-up__modal-subtitle');
              subtitle.innerHTML = currentVariant.title;
              header.appendChild(subtitle);
            }
            fragment.appendChild(header);
          }
          surfacePickUpModal.innerHTML = contents;
          surfacePickUpModal.insertBefore(fragment, surfacePickUpModal.firstChild);
          $.fancybox.open(
            surfacePickUpModal,
            {
              hash: false,
              infobar: false,
              toolbar: false,
              loop: true,
              smallBtn: true,
              touch: false,
              video: {
                autoStart: false,
              },
              mobile: {
                preventCaptionOverlap: false,
                toolbar: true,
              },
            },
          );
        });
      }

      new window.Shopify.OptionSelectors($options.data('select-id'), {
        product: $options.data('product'),
        onVariantSelected: (variant, selector) => {
          currentVariant = variant;

          paymentTerms.update(variant ? variant.id : null);
		  var curr_symbol = $('body').attr('data-shop-currency');
          if (priceUI) {
            priceUI.load(
              JSONData,
              {
                variant,
                formatter: price => window.Shopify.formatMoney(price, $('body').data('money-format')).replace('.00','').replace(',00',''),
                handler: (priceUIFragment, _product, { variant: v }) => {
                  if (isPriceSavingsEnabled && v) {
                    if (v.compare_at_price > v.price) {
                      const span = document.createElement('span');
                      span.classList.add('sale', 'savings');
                      const savings = v.compare_at_price - v.price;
                      const percentage = Math.round((savings / v.compare_at_price) * 100);
                      span.innerHTML = `${window.Shopify.translation.savings_text} ${percentage}% (<span class="money">${window.Shopify.formatMoney(v.compare_at_price - v.price, $('body').data('money-format'))}</span>)`;
 					  if( v.available==true ){
                        jQuery('.top-stock').html('<span class="in_stock">In stock</span>');
                      }else{
                        jQuery('.top-stock').html('<span class="sold_out">Sold Out</span>');
                      }	
                      priceUIFragment.appendChild(span);
                    }
                  }

                  if (v && v.available) {
                    if (v.price === 0) {
                      const fragment = document.createDocumentFragment();
                      const span = document.createElement('span');
                      span.classList.add('free-price-text');

                      if (window.Shopify.theme_settings.free_text !== '') {
                        span.innerHTML = window.Shopify.theme_settings.free_text;
                      } else {
                        span.innerHTML = `<span class="money">${window.Shopify.formatMoney(v.price, $('body').data('money-format'))}</span>`;
                      }

                      fragment.appendChild(span);

                      return fragment;
                    }

                    return priceUIFragment;
                  }

                  if (!window.Shopify.theme_settings.display_sold_out_price) {
                    const fragment = document.createDocumentFragment();
                    const soldOutText = document.createElement('span');
                    soldOutText.classList.add('sold_out');
                    soldOutText.innerHTML = v
                      ? window.Shopify.translation.sold_out_text
                      : window.Shopify.translation.unavailable_text;
                    fragment.appendChild(soldOutText);
                    return fragment;
                  }

                  // Displays sold out text beside price
                  if (window.Shopify.theme_settings.display_sold_out_price) {
                    const span = document.createElement('span');

                    span.classList.add('sold_out');
                    span.innerHTML = v
                      ? window.Shopify.translation.sold_out_text
                      : window.Shopify.translation.unavailable_text;

                    priceUIFragment.appendChild(span);
                  }

                  return priceUIFragment;
                },
              },
            );

            if (window.Shopify.theme_settings.display_sold_out_price && variant && variant.price === 0 && !variant.available) {
              const priceElement = priceUIEl.querySelector('[data-price]');
              if (!priceElement) { return; }
              if (window.Shopify.theme_settings.free_text !== '') {
                const span = document.createElement('span');
                span.classList.add('free-price-text');
                span.innerHTML = window.Shopify.theme_settings.free_text;
                priceElement.innerHTML = '';
                priceElement.appendChild(span);
              } else if (window.Shopify.theme_settings.free_text === '') {
                priceElement.classList.add('price--sale');
                return;
              }
            }
          }

          if (priceUIBadge) {
            priceUIBadge.load(
              JSONData,
              {
                variant,
                style: 'default',
                formatter: price => window.Shopify.formatMoney(price, $('body').data('money-format')),
                handler: (priceUIFragment, _product, { variant: v }) => {
                  if (v && v.available) {
                    if (!v.compare_at_price || v.compare_at_price <= v.price) {
                      return document.createDocumentFragment();
                    }
                    return priceUIFragment;
                  }

                  if ((v && !v.available) || !v) {
                    const fragment = document.createDocumentFragment();
                    let text;
                    const sticker = document.createElement('div');
                    sticker.classList.add('price-ui-badge__sticker');
                    const stickerText = document.createElement('span');
                    stickerText.classList.add('price-ui-badge__sticker-text');
                    stickerText.setAttribute('data-badge', '');

                    if (v && !v.available) {
                      text = window.Shopify.translation.sold_out_text;
                    }

                    if (!v) {
                      text = window.Shopify.translation.unavailable_text;
                    }

                    stickerText.innerHTML = text;
                    sticker.appendChild(stickerText);
                    fragment.appendChild(sticker);
                    return fragment;
                  }

                  return priceUIFragment;
                },
              },
            );
          }

          // Avoid loading surface pickup for the inline quick shop
          if (surfacePickUp && !$options.closest('.js-product_section').hasClass('inline-quickshop')) {
            surfacePickUp.load(variant ? variant.id : null);
          }

          window.selectCallback(variant, selector);
        },
        enableHistoryState: $options.data('enable-state'),
      });
    });
  },
  enableGallery(selector) {
    // Variables
    const $productGallery = $(selector);
    const $slides = $productGallery.find('.gallery-cell');
    const $thumbnailProductGallery = $productGallery.closest('.js-product_section').find('.product_gallery_nav');
    const $thumbnails = $thumbnailProductGallery.find('.gallery-cell');
    const zoom = $productGallery.data('zoom');
    const productLightbox = $productGallery.data('product-lightbox');
    const thumbnailsEnabled = $productGallery.data('thumbnails-enabled');
    const thumbnailsSliderEnabled = $productGallery.data('thumbnails-slider-enabled');
    const thumbnailsPosition = $productGallery.data('thumbnails-position');
    const thumbnailsArrows = $productGallery.data('gallery-arrows-enabled');
    const slideshowSpeed = $productGallery.data('slideshow-speed');

    // If zoom enabled
    if (zoom === true) {
      if (window.is_touch_device() && window.Shopify.media_queries.medium.matches) {
        // Lightbox has a built-in zoom feature, so check if lightbox is disabled
        if (productLightbox === 'false') {
          document.addEventListener('lazybeforeunveil', window.imageFunctions.zoom);
        }
      } else {
        document.addEventListener('lazybeforeunveil', window.imageFunctions.zoom);
      }
    }

    $productGallery.on('ready.flickity', () => {
      $slides.each((index, slide) => {
        // Determine media type
        const mediaType = $(slide).data('media-type') || $(slide).find('[data-media-type]').data('media-type');
        let videoID;

        switch (mediaType) {
          case 'external_video':

            videoID = $(slide).find('[data-plyr-video-id]').data('plyr-video-id');

            if (window.videoPlayers) {
              window.videoPlayers.forEach(player => {
                const currentPlayer = player;
                if (player.id === videoID || player.media.id === videoID) {
                  if (!$(slide).hasClass('is-selected')) {
                    currentPlayer.keyboard = {
                      focused: false,
                      global: false,
                    };
                  }
                }
              });
            }
            break;
          case 'video':

            videoID = $(slide).find('[data-plyr-video-id]').data('plyr-video-id');

            if (window.videoPlayers) {
              window.videoPlayers.forEach(player => {
                const currentPlayer = player;
                if (player.id === videoID || player.media.id === videoID) {
                  if (!$(slide).hasClass('is-selected')) {
                    currentPlayer.keyboard = {
                      focused: false,
                      global: false,
                    };
                  }
                }
              });
            }
            break;
          case 'model':
            if ($(slide).hasClass('is-selected')) { // When active slide
              if (mediaType === 'model' && window.isScreenSizeLarge()) {
                $(slide).on('mouseenter', () => {
                  $productGallery.flickity('unbindDrag');
                });
                $(slide).on('mouseleave', () => {
                  $productGallery.flickity('bindDrag');
                });
              }
            }
            break;
          default:
            break;
        }
      });

      // Video looping
      const loopingEnabled = $productGallery.data('video-loop');

      $.each(window.videoPlayers, (index, player) => {
        const videoPlayer = player;
        videoPlayer.loop = loopingEnabled;
      });
    });

    $productGallery.on('change.flickity', () => {
      $slides.each((index, slide) => {
        // Determine media type of current slide
        const mediaType = $(slide).data('media-type') || $(slide).find('[data-media-type]').data('media-type');

        if ($(slide).hasClass('is-selected')) { // When active slide
          switch (mediaType) {
            case 'model':

              /* On slide change, if active slide contains 3d model
              * If on desktop, on hover, unbind flickity, after hover bind flickity
              * On model play event, unbind flickity to ensure model can be interacted with
              * On model pause event, bind flickity so that slide can be swiped
              * Pause all model slides when hidden
              */

              if (window.isScreenSizeLarge()) {
                // On mouseenter event, unbind flickity
                $(slide).on('mouseenter', () => {
                  $productGallery.flickity('unbindDrag');
                });

                // On mouseleave event, bind flickity
                $(slide).on('mouseleave', () => {
                  $productGallery.flickity('bindDrag');
                });
              }

              // Listen for model pause/play events
              $(slide).find('model-viewer').on('shopify_model_viewer_ui_toggle_play', () => {
                $productGallery.flickity('unbindDrag');
              });

              $(slide).find('model-viewer').on('shopify_model_viewer_ui_toggle_pause', () => {
                $productGallery.flickity('bindDrag');
              });
              break;
            default:
              $productGallery.flickity('bindDrag');
              break;
          }
        } else {
          // When inactive slide
          switch (mediaType) {
            case 'external_video':
              // Youtube video pausing
              $.each(window.videoPlayers, (_index, player) => {
                player.pause();
              });
              break;
            case 'video':
              // HTML5 video pausing
              $.each(window.videoPlayers, (_index, player) => {
                player.pause();
              });
              break;
            default: break;
          }
        }
      });

      // Restore 3d model icons
      window.productMedia.showModelIcon($productGallery);
    });

    $productGallery.flickity({
      wrapAround: true,
      adaptiveHeight: true,
      dragThreshold: 10,
      imagesLoaded: true,
      pageDots: false,
      prevNextButtons: $productGallery.data('media-count') > 1 || $slides.length > 1,
      autoPlay: slideshowSpeed * 1000,
      watchCSS: false,
    });

    // Adjust arrows height if controls are hidden/shown
    $.each(window.videoPlayers, (index, player) => {
      // When controls are hidden, height should be auto
      player.on('controlshidden', () => {
        $productGallery.find('.flickity-prev-next-button').css('height', 'auto');
      });
      // When controls are shown, height should account for controls bar
      player.on('controlsshown', () => {
        $productGallery.find('.flickity-prev-next-button').css('height', 'calc(100% - 64px)');
      });
    });

    function autoplayVideo(videoID, $slide) {
      // Compare id to player object and only play that video
      $.each(window.videoPlayers, (index, player) => {
        if (parseInt(player.media.dataset.plyrVideoId, 10) === videoID) {
          player.play();

          // On fullscreen toggle, focus back on the slide itself
          player.on('exitfullscreen', () => {
            $slide.closest('.product-gallery').find('.product-gallery__thumbnails').focus();
          });
        }
      });
    }

    function autoplayYoutubeVideo(iframeID, $slide) {
      // compare id to player object and only play that video
      $.each(window.videoPlayers, (index, player) => {
        if (player.playing) {
          player.pause();
        }

        if (player.media.id === iframeID) {
          player.play();

          // On fullscreen toggle, focus back on the slide itself
          player.on('exitfullscreen', () => {
            $slide.closest('.product-gallery').find('.product-gallery__thumbnails').focus();
          });
        }
      });
    }

    function checkForVideos() {
      $slides.each((index, slide) => {
        // Variables
        const $slide = $(slide);
        const mediaType = $slide.data('media-type') || $slide.find('[data-media-type]').data('media-type');
        let videoID = $slide.find('video').data('plyr-video-id');
        const $iframeVideo = $slide.find('iframe');
        const iframeID = $iframeVideo.attr('id');

        if ($slide.hasClass('is-selected')) {
          if (mediaType === 'video') {
            videoID = $slide.find('video').data('plyr-video-id');
            if (videoID) {
              autoplayVideo(videoID, $slide);
            }
          } else if (mediaType === 'external_video' && iframeID) {
            autoplayYoutubeVideo(iframeID, $slide);
          }
        }
      });
    }

    // Checks for videos and plays them if they are the featured media
    // Autoplay logic only happens on desktop, autoplay set to off for mobile
    const $sliderArrows = $productGallery.find('.flickity-prev-next-button');

    if (($sliderArrows || $thumbnails) && window.isScreenSizeLarge()) {
      $sliderArrows.on('click', () => {
        const pId = $productGallery.data('product-id');

        $productGallery.on('settle.flickity', () => {
          // Find out media type of featured media slide
          const $selectedSlide = $productGallery.find('.gallery-cell.is-selected');
          const mediaType = $selectedSlide.data('media-type') || $selectedSlide.find('[data-media-type]').data('media-type');

          // Run video autoplay logic if featured media is a video
          if (mediaType === 'video' || mediaType === 'external_video') {
            checkForVideos();
          }

          // Autoplay model if featured media is a model
          if (mediaType === 'model') {
            // If model container has class is-selected then play the model
            const sortedModels = [];
            $.each(window.productMedia.models, model => {
              if ($(model.container).closest('.gallery-cell').data('product-id') === pId) {
                sortedModels.push(model);
              }
            });

            $.each(sortedModels, model => {
              const $slide = $(model.container).closest('.gallery-cell');
              if ($slide.hasClass('is-selected')) {
                model.play();
              }
            });
          }
          $productGallery.off('settle.flickity');
        });

        return false;
      });

      $thumbnails.on('click', event => {
        const index = $(event.currentTarget).index();
        const pId = $productGallery.data('product-id');
        $productGallery.flickity('select', index);

        $productGallery.on('settle.flickity', () => {
          // Find out media type of featured media slide
          const $selectedSlide = $productGallery.find('.gallery-cell.is-selected');
          const mediaType = $selectedSlide.data('media-type') || $selectedSlide.find('[data-media-type]').data('media-type');

          // Run video autoplay logic if featured media is a video
          if (mediaType === 'video' || mediaType === 'external_video') {
            checkForVideos();
          }

          // Autoplay model if featured media is a model
          if (mediaType === 'model') {
            // If model container has class is-selected then play the model
            const sortedModels = [];
            $.each(window.productMedia.models, (_index, model) => {
              if ($(model.container).closest('.gallery-cell').data('product-id') === pId) {
                sortedModels.push(model);
              }
            });

            $.each(sortedModels, (_index, model) => {
              const $slide = $(model.container).closest('.gallery-cell');
              if ($slide.hasClass('is-selected')) {
                model.play();
              }
            });
          }
          $productGallery.off('settle.flickity');
        });
        return false;
      });

      $thumbnails.keypress(event => {
        const index = $(event.currentTarget).index();
        const pId = $productGallery.data('product-id');
        if (event.which === 13) {
          $productGallery.flickity('select', index);

          const $selectedSlide = $productGallery.find('.gallery-cell.is-selected');

          $productGallery.on('settle.flickity', () => {
            $selectedSlide.find('[data-youtube-video]').attr('tabindex', '0');
            $selectedSlide.find('model-viewer, .plyr, a').focus();
            $productGallery.off('settle.flickity');
          });

          // Find out media type of featured media slide
          const mediaType = $selectedSlide.data('media-type') || $selectedSlide.find('[data-media-type]').data('media-type');

          // Run video autoplay logic if featured media is a video
          if (mediaType === 'video' || mediaType === 'external_video') {
            checkForVideos();
          }

          // Autoplay model if featured media is a model
          if (mediaType === 'model') {
            // If model container has class is-selected then play the model
            const sortedModels = [];
            $.each(window.productMedia.models, model => {
              if ($(model.container).closest('.gallery-cell').data('product-id') === pId) {
                sortedModels.push(model);
              }
            });

            $.each(sortedModels, model => {
              const $slide = $(model.container).closest('.gallery-cell');
              if ($slide.hasClass('is-selected')) {
                model.play();
              }
            });
          }
          return false;
        }
        return undefined;
      });
    }

    // Thumbnail gallery logic begins
    if (thumbnailsEnabled === true && thumbnailsSliderEnabled === true && $slides.length > 1) {
      // If desktop determine which slider we build
      if (window.Shopify.media_queries.large.matches) {
        // If thumbnail position is left/right then vertical slider gets enabled
        if (thumbnailsPosition === 'left' || thumbnailsPosition === 'right') {
          $thumbnailProductGallery.css('max-height', $productGallery.closest('.product-gallery').outerHeight());
          $thumbnailProductGallery.addClass('vertical-slider-enabled');

          $thumbnails.on('click', event => {
            const index = $(event.currentTarget).index();
            $productGallery.flickity('select', index);
          });

          const navCellHeight = $thumbnails.height();
          const navHeight = $thumbnailProductGallery.height();

          $productGallery.on('select.flickity', () => {
            // set selected nav cell
            const flkty = $productGallery.data('flickity');
            $thumbnailProductGallery.find('.is-nav-selected').removeClass('is-nav-selected');
            //const $selected = $thumbnails.eq(flkty.selectedIndex).addClass('is-nav-selected');

            // scroll nav
            //const scrollY = $selected.position().top + $thumbnailProductGallery.scrollTop() - (navHeight + navCellHeight) / 2;
            /*$thumbnailProductGallery.animate({
              scrollTop: scrollY,
            });*/
          });
        } else {
          $thumbnailProductGallery.flickity({
            cellAlign: 'center',
            contain: true,
            groupCells: '80%',
            imagesLoaded: true,
            pageDots: false,
            prevNextButtons: $thumbnails.length > 5 ? thumbnailsArrows : false,
            asNavFor: $productGallery[0],
          });

          $thumbnailProductGallery.on('settle.flickity', () => {
            $thumbnailProductGallery.flickity('resize');
          });

          $(window).on('load', () => {
            $thumbnailProductGallery.flickity('resize');
          });

          // Once thumbnail is focused, move carousel to that cell
          $.each($thumbnails, (index, thumbnail) => {
            const $thumbnail = $(thumbnail);
            if ($thumbnail.hasClass('is-selected')) {
              $thumbnail.on('focus', () => {
                $thumbnailProductGallery.flickity('selectCell', index);
              });
            }
          });
        }
      } else {
        // If not on desktop, create standard thumbnail slider
        $thumbnailProductGallery.flickity({
          cellAlign: 'center',
          contain: true,
          groupCells: '80%',
          imagesLoaded: true,
          pageDots: false,
          prevNextButtons: $thumbnails.length > 5 ? thumbnailsArrows : false,
          asNavFor: $productGallery[0],
        });
      }
    } else if (thumbnailsEnabled === true) {
      // If thumbnail slider is disabled, ensure thumbnails can still navigate product images
      $thumbnailProductGallery.find('.product-gallery__thumbnail').on('click', function () {
        const index = $(this).index();
        $productGallery.flickity('selectCell', index);
      });
    }

    $(window).on('load', () => {
      $productGallery.flickity().flickity('resize');
    });

    $productGallery.on('settle.flickity', () => {
      $productGallery.flickity().flickity('resize');
    });
  },
  loadProductRecommendations() {
    const $productRecommendations = $('.product-recommendations');
    const $productRecommendationsSection = $('.shopify-section--recommended-products');
    const $productRecommendationsContainer = $('[data-product-recommendations-container]');
    const $productRecommendationsDetailsBlock = $('.product-recommendations--details-block');
    const productID = $productRecommendations.data('product-id');
    const limit = $productRecommendations.data('limit');
    const recommendationsURL = $productRecommendations.data('recommendations-url');
    const sectionEnabled = $productRecommendationsSection.find($productRecommendations).data('enabled');
    const $recommendedProductSlider = $('.js-recommended-products-slider');

    function loadDynamicProducts() {
      // Build request URL
      const requestUrl = `${recommendationsURL}?section_id=product-recommendations&limit=${limit}&product_id=${productID}`;

      // Make ajax call to request information for window.Shopify's recommended products
      $.ajax({
        type: 'GET',
        url: requestUrl,
        success(data) {
          if (!sectionEnabled) {
            return;
          }

          const $recommendedProductsElement = $(data).find('.product-recommendations').html();

          // Insert product list into the product recommendations container
          $productRecommendationsContainer.html($recommendedProductsElement);

          // Hide product recommendations section
          $productRecommendationsSection.hide();

          // Initialize product slider if it exists on page
          if ($recommendedProductSlider.length) {
            window.productPage.recommendedProductsSlider();
          } else {
            // Call enable gallery function for product galleries
            $('[data-product-recommendations-container] [data-product-gallery]').each((_, gallery) => {
              const $productGallery = $(gallery);
              window.productPage.enableGallery($productGallery);
            });
          }

          // Re-link inline quickshop
          if (window.Shopify.theme_settings.quick_shop_style === 'inline') {
            window.productPage.runOptionSelector($('[data-product-recommendations-container] .js-product_section [data-product-form]'));
          }

          // Quickshop initialization
          window.quickShop.init();

          // Initialize product slider if it exists on page
          if ($recommendedProductSlider.length) {
            window.productPage.recommendedProductsSlider();
          }

          // Converting the currencies
          if (window.Currency.show_multiple_currencies) {
            window.currencyConverter.convertCurrencies();
          }

          // Initialize shopify payment buttons
          if (window.Shopify.PaymentButton) {
            window.Shopify.PaymentButton.init();
          }

          window.videoFeature.setupRecommendedVideoPlayer();

          if (window.Shopify.theme_settings.collection_secondary_image) {
            window.imageFunctions.showSecondaryImage();
          }

          window.hideNoScript();
        },
      });
    }

    if (!sectionEnabled) { return; }

    if ($('.shopify-section--product-details-template').length > 0) {
      if ($productRecommendationsDetailsBlock.length === 0) {
        return;
      }
    }

    // If meta collection, no need to run API request
    const metaCollection = $productRecommendations.hasClass('meta-related-recommended-collection');

    if (metaCollection) {
      // Takes care of moving content from Shopify section into block container
      const data = $productRecommendationsSection.find($productRecommendations).html();
      $productRecommendationsContainer.html(data);
      $productRecommendationsSection.hide();
      $productRecommendationsContainer.show();

      // Initialize product slider if it exists on page
      if ($recommendedProductSlider.length) {
        window.productPage.recommendedProductsSlider();
      } else {
        // Call enable gallery function for product galleries
        $('[data-product-recommendations-container] [data-product-gallery]').each(function () {
          const $productGallery = $(this);
          window.productPage.enableGallery($productGallery);
        });
      }

      // Re-link inline quickshop
      if (window.Shopify.theme_settings.quick_shop_style === 'inline') {
        window.productPage.runOptionSelector($('[data-product-recommendations-container] .js-product_section [data-product-form]'));
      }
    } else {
      loadDynamicProducts();
    }
  },
  productSwatches() {
    // Swatches linked with selected options
    if (window.Shopify.theme_settings.product_form_style === 'swatches') {
      if ($('.js-product_section').length) {
        const $productForms = $('.js-product_section').find('.product_form');

        $productForms.addClass('is-visible');

        // Loop through each product and set the initial option value state

        $productForms.each((_, productForm) => {
          const $productForm = $(productForm);
          const JSONData = $productForm.data('product');
          const productID = $productForm.data('product-id');
          const productSection = `.product-${productID} .js-product_section`;
          const swatchOptions = $productForm.find('.swatch_options .swatch');
          if (swatchOptions.length > 1) {
            window.Shopify.linkOptionSelectors(JSONData, productSection);
          }
        });
      }

      // Add click event when there is more than one product on the page (eg. Collection in Detail)
      if ($('.js-product_section').length > 1) {
        $('body').on('click', '.swatch-element', swatchElement => {
          const $swatchElement = $(swatchElement.currentTarget);
          const swatchValue = $swatchElement.data('value').toString();

          $swatchElement
            .siblings(`input[value="${swatchValue.replace(/"/g, '\\"')}"]`)
            .prop('checked', true)
            .trigger('change');

          const JSONData = $swatchElement.parents('.product_form').data('product');
          const productID = $swatchElement.parents('.product_form').data('product-id');
          const productSection = `.product-${productID} .js-product_section`;
          const swatchOptions = $swatchElement.parents('.product_form').find('.swatch_options .swatch');

          if (swatchOptions.length > 1) {
            window.Shopify.linkOptionSelectors(JSONData, productSection);
          }
        });
      }
    }
  },
  recommendedProductsSlider() {
    $('.js-recommended-products-slider .products-slider').each((_, productSlider) => {
      const $productSlider = $(productSlider);
      const productsPerSlide = $productSlider.data('products-per-slide');
      const productsLimit = $productSlider.data('products-limit');
      const productsAvailable = $productSlider.data('products-available');
      let cellAlign;
      let draggable;
      let prevNext;
      let wrapAround;
      let initialIndex;

      const lessSlidesThanProducts = productsAvailable > productsPerSlide;
      const limitGreaterThanSlide = productsLimit > productsPerSlide;
      const evenSlide = productsPerSlide % 2 === 0;

      if (evenSlide && lessSlidesThanProducts && limitGreaterThanSlide) {
        cellAlign = 'left';
      } else {
        cellAlign = 'center';
      }

      if (lessSlidesThanProducts && limitGreaterThanSlide) {
        draggable = true;
        prevNext = true;
        wrapAround = true;
      } else {
        draggable = false;
        prevNext = false;
        wrapAround = false;
      }

      if (evenSlide && lessSlidesThanProducts && limitGreaterThanSlide) {
        initialIndex = 0;
      } else if (productsPerSlide === '3' && productsAvailable) {
        initialIndex = 1;
      } else if (productsPerSlide === '5' && productsAvailable) {
        initialIndex = 2;
      } else if (productsPerSlide === '7' && productsAvailable) {
        initialIndex = 3;
      }

      if (window.Shopify.media_queries.medium.matches) {
        cellAlign = 'center';
        draggable = true;
        prevNext = true;
        wrapAround = true;
        initialIndex = 1;

        $productSlider.parents('.even-num-slides').removeClass('even-num-slides');
      }

      $productSlider.flickity({
        lazyLoad: 2,
        imagesLoaded: true,
        draggable,
        cellAlign,
        prevNextButtons: prevNext,
        wrapAround,
        contain: true,
        freeScroll: true,
        initialIndex,
      });
    });
  },
  initializeQuantityBox() {
    $('body').on('click', '.js-change-quantity', e => {
      const $this = $(e.currentTarget);
      const $input = $this.siblings('input');
      const val = parseInt($input.val(), 10);
      let valMax = 100000000000000000000000000000;
      const valMin = $input.attr('min') || 0;
      if ($input.attr('max') != null) {
        valMax = $input.attr('max');
      }
      if (isNaN(val) || val < valMin) {
        $input.val(valMin);
      } if (val > valMax) {
        $input.val(valMax);
      }
      if ($this.data('func') === 'plus') {
        if (val < valMax) $input.val(val + 1);
      } else {
        if (val > valMin) $input.val(val - 1);
        if ($this.parents('.cart_item').length) {
          if (val - 1 === 0) {
            $this.closest('.cart_item').addClass('animated fadeOutUp');
          }
        }
      }
      $input.trigger('change');
    });
  },
  unload($target) {
    const $slider = $target.find('.products-slider');
    $slider.flickity('destroy');
    $('body').off('click', '.js-change-quantity');
  },
};

/*============================================================================
  Header
==============================================================================*/

window.header = {
  init() {

    var closeDropdown = function() {
      $('body').removeClass('is-active');
      $('.dropdown_link').removeClass('active_link');
      $('.dropdown_container').hide();
      $('.mobile_nav').find('div').removeClass('open');
    };

    var closeMiniCart = function() {
      $('body').removeClass('is-active').removeClass('blocked-scroll');
      $('.dropdown_link').toggleClass('active_link');
      $('.cart-container').removeClass('active_link');
    };

    var openMiniCart = function($cart_container) {
      $('body').addClass('blocked-scroll');
      $('.mobile_nav div').removeClass('open');
      $('.dropdown_link').removeClass('active_link');
      $cart_container.addClass('active_link');
    };

    var closeAllSubSubmenus = function() {
      $('.vertical-menu_sub-submenu').removeClass('is-visible');
      $('.vertical-menu_sub-submenu').prev('a').attr('data-click-count', 0);
    }

    var closeAllSubmenus = function() {
      $('.vertical-menu_submenu').removeClass('is-visible');
      $('.vertical-menu_submenu').prev('a').attr('data-click-count', 0);
      $('.mega-menu-parent').attr('data-click-count', 0);
      closeAllSubSubmenus();
    }

    // Store link items with data attribute of 'data-show-dropdown-on-click' in a variable
    var $openDropdownOnClick = $('.main-nav__wrapper').find('[data-show-dropdown-on-click]');

    /*jQuery('body').on('click','.add-match-item a',function(){
            if( jQuery(this).hasClass('active') ){
                jQuery(this).removeClass('active');
                jQuery(this).children('span').text('-');
                jQuery('.mix-match-products').slideDown('slow');
            }else{
                jQuery(this).addClass('active');
                jQuery(this).children('span').text('+');
                jQuery('.mix-match-products').slideUp('slow');
            }
        });*/
		$('body').on('click', '.close-side-cart', function () {
          $('.active_link').removeClass('active_link');
           $('body').removeClass('is-active').removeClass('blocked-scroll');
          return false;
        });
        $('body').on('click', '.dropdown_link', function () {
          
          const $dropdown = $(this).parents('.main-nav').find(`[data-dropdown="${$(this).data('dropdown-rel')}"]`);

          $('.active_link').removeClass('active_link');

          if (!$(this).hasClass('active_link')) {
            $dropdown.show();

            if ($(this).hasClass('mini_cart')) {
              if (!$('body').hasClass('cart')) {
                $(this).parent('.cart-container').addClass('active_link');
              }
            } else {
              $(this).addClass('active_link');
              //$('.is-absolute').parent().removeClass('feature_image');
            }
          }
          return false;
        });
    //Vertical menu enabled
    if ($('.dropdown_link--vertical').length){
      $('.dropdown_link--vertical, .mega-menu-parent').attr('data-click-count', 0);

      if ($openDropdownOnClick.length == 0) {
        $('.dropdown_link--vertical, .vertical-menu_submenu').on('mouseover', function(e) {
          var $dropdown = $(this).parents('.main-nav').find('[data-dropdown="' + $(this).data('dropdown-rel') + '"]');

          $('.dropdown_container').hide();
          $('.active_link').removeClass('active_link');
          if(!$(this).hasClass('active_link')) {
            $('.dropdown_container').hide();
            $(this).children('a').addClass('active_link');
            $('.is-absolute').parent().addClass('feature_image');
          }
        });
      }

      //Enable touch on parent link if user is on a touch device and desktop menu is visible, OR if 'open dropdown on click' setting is enabled
      if (window.is_touch_device() || $openDropdownOnClick.length >= 1){
        $('body').on('touchstart click', '.vertical-menu .sublink a, .vertical-menu_submenu .sublink a', function(e) {

          var clicked;
          var verticalMenu = $(this);
          var $dropdownVertical = $(verticalMenu).next('.vertical-menu_submenu');
          var $dropdownVerticalSubMenu = $(verticalMenu).next('.vertical-menu_sub-submenu');

          var showMenu = function() {
            $dropdownVertical.removeClass('hidden');
            $dropdownVerticalSubMenu.removeClass('hidden');
            $dropdownVertical.addClass('is-visible');
            $dropdownVerticalSubMenu.addClass('is-visible')
          }

          if(e.type == "touchstart") {
            clicked = true;
            if($(this).attr('data-click-count') < 1) {
              openDropdown(verticalMenu, e.target);
              e.preventDefault();
              e.stopPropagation();
            }
          }
          else if(e.type == "click" && !clicked) {
            if($(this).attr('data-click-count') < 1) {
              openDropdown(verticalMenu, e.target);
              e.preventDefault();
              e.stopPropagation();
            }
          }
          else {
            clicked = false;
          }

          function openDropdown(verticalMenu, target) {

            var $dropdownMegaMenu = $(verticalMenu).parents('.main-nav').find('[data-dropdown="' + $(this).data('dropdown-rel') + '"]');

            var clickCount = $(verticalMenu).attr('data-click-count');

            $('.dropdown_link--vertical').not(verticalMenu).attr('data-click-count', 0);
            $('.mega-menu-parent').attr('data-click-count', 0);
            $('.dropdown_link--vertical').attr('data-no-instant', true);
            $('.dropdown_container').hide();

            $dropdownMegaMenu.show();
            // Conditional to not close the parent dropdown when selecting various sub menus in the same parent
            if ($(target).parents('.vertical-menu_submenu').hasClass('is-visible')) {
              closeAllSubSubmenus();
              $('.is-absolute').parent().addClass('feature_image');
            } else {
              closeAllSubmenus();
              $('.is-absolute').parent().addClass('feature_image');
            }

            showMenu();

            //capture touch event or click event
            clickCount++;
            $(verticalMenu).attr('data-click-count', clickCount);

            if (clickCount < 2){
              e.preventDefault();
              e.stopPropagation();
              return false;
            }

          }
          // Close dropdown if click anywhere outside dropdown menu
          $('html').on('click', function(event) {
            if (!$(event.target).closest('.dropdown_container').length && !$(event.target).hasClass('url-deadlink')) {
              closeAllSubmenus();
              $('.is-absolute').parent().addClass('feature_image');
            }
          });
        });
      }
    }

    if ($('.promo-banner').length) {
      const promoBanner = window.Cookies.get('promo-banner');

      if (promoBanner !== 'dismiss') {
        $('body').addClass('promo-banner--show');
        $('.promo-banner').on('click', '.promo-banner__close', () => {
          $('body').removeClass('promo-banner--show');
          window.Cookies.set('promo-banner', 'dismiss', {
            expires: 30, path: '', domain: '', sameSite: 'None', secure: true,
          });
        });
      }
    }

    //offscreen check for menu
    $('.vertical-menu_submenu, .vertical-menu_sub-submenu').each(function() {
      if($(this).is(':off-right')) {
        $(this).addClass('vertical-menu--align-right');
      }
    });

    //Click anywhere outside of dropdown to close
    $('html').on('click', function(event) {
      if (!$(event.target).closest('.cart-container').length && $('.cart_content').is(':visible')) {

        closeMiniCart();
      }

      if (!$(event.target).closest('.dropdown_container').length && $('.dropdown').is(':visible') && !$(event.target).hasClass('url-deadlink') && !$(event.target).hasClass('mega-menu-parent')) {
        $('.is-absolute').parent().addClass('feature_image');
        $('body').removeClass('is-active');
        closeDropdown();
        if ($openDropdownOnClick.length) {
          $('.dropdown_link').attr('data-click-count', 0);
        }
      }

    });

    //Only apply on larger screen sizes
    if (Shopify.media_queries.large.matches) {
      if ($('.header').hasClass('header-fixed--true')){

        //offset scroll position
        $('body').on('click', '.banner a[href^="#"]', function(e) {
            e.preventDefault();
            var anchorLink = $(this).attr('href');
            var headerHeight = $('.main-nav__wrapper.sticky_nav').outerHeight();
            $('html, body').animate({
              scrollTop: $(anchorLink).offset().top - headerHeight
            }, 2000);
        });

        if (!$('.main-nav__wrapper').hasClass('sticky_nav')) {
          var sticky_nav = new Headhesive('.main-nav__wrapper', {
            offset: 700,
            throttle: 300,
            classes: {
              clone: 'sticky_nav',
              stick: 'sticky_nav--stick',
              unstick: 'sticky_nav--unstick'
            },
            onInit: function() {
              $('.sticky_nav .secondary_logo').css('display', 'none');
              $('.sticky_nav .primary_logo').css('display', 'block');
              $('.sticky_nav .icon-search').css('display', 'block');
              $('.sticky_nav .search__form').css('display', 'none');
              $('.sticky_nav .search-link').css('display', 'block');
              $('.sticky_nav .main-nav').append($(".header .cart-container").clone());
            },
            onStick: function() {
              var maxHeight = 0;
              var $targetHeightElement = $('.sticky_nav .main-nav');

              $targetHeightElement.each(function() {
                maxHeight = maxHeight > $(this).outerHeight() ? maxHeight : $(this).outerHeight();
              });

              $('.sticky_nav .mini_cart').css('height', maxHeight);
              $('.sticky_nav .cart_content').css('top', maxHeight);
            },
            onUnstick: function() {
              $('.cart-container').removeClass('active_link');
            }
          });
        }
      } else {
        $('.header-fixed--true').removeClass('header-fixed--true');
        if ($('.main-nav__wrapper').length > 1) {
          $('.main-nav__wrapper').first().remove();
        }
      }

      if ($('img.primary_logo:visible')){
        $('.logo img', $(".feature_image .header")).attr('src', $('.logo img').data('src-home'));
      } else {
        $('.logo img').attr('src', $('.logo img').data('src'));
      }
    //Mobile menu
    } else {
      if ($('#header').hasClass('mobile_nav-fixed--true')){
        $('body').addClass('mobile_nav-fixed--true');

        //offset scroll position
        $('body').on('click', '.banner a[href^="#"]', function(e) {
            e.preventDefault();
            var anchorLink = $(this).attr('href');
            var headerHeight = $('#header').outerHeight();
            $('html, body').animate({
              scrollTop: $(anchorLink).offset().top - headerHeight
            }, 2000);
        });
      } else {
        $('body').addClass('mobile_nav-fixed--false');
      }
    }

    // Avoid cart_content duplicating for mobile screen sizes
    if ($('#header .cart_content').length < 1) {
      $('#header .cart-container').append($('.header .cart_content').clone());
    }

    if (window.is_touch_device() && Shopify.media_queries.medium.matches || Shopify.media_queries.medium.matches) {
      $('.dropdown_link').attr('data-no-instant', true);

      $('body').on('click', '.dropdown_link, .vertical--dropdown', function (e) {
        $('.nav a').removeClass('active_link');

        if ($('#header').is(':visible')) {
          window.$dropdown = $(this).parents('#header').find(`[data-dropdown="${$(this).data('dropdown-rel')}"]`);

          if (!$(this).hasClass('mini_cart')) {
            $('.cart-container').removeClass('active_link');
          }
        } else {
          if ($(this).hasClass('icon-search')) {
            window.location = $(this).attr('href');
            return false;
          }

          window.$dropdown = $(this).parents('.main-nav').find(`[data-dropdown="${$(this).data('dropdown-rel')}"]`);
        }

        if (window.$dropdown.is(':visible') || window.$dropdown.attr('class') === undefined) {
          window.$dropdown.hide();
          $('body').removeClass('is-active');
        } else {
          $('.dropdown_container').hide();
          if (!$(this).hasClass('cart-container')) {
            $('.is-absolute').parent().removeClass('feature_image');
          }
          window.$dropdown.show();
          $('body').addClass('is-active');
        }

        if (window.$dropdown.is(':visible')) {
          e.stopPropagation();
          return false;
        }
      });

      $('body').on('click', '.mobile_nav', function () {
        $(this).find('div').toggleClass('open');
      });

      // Toggle mini-cart with menu icon
      if (Shopify.theme_settings.cart_action !== 'redirect_cart') {
        $('.mini_cart').on('click', function (e) {
          const $cartContainer = $(this).parent();
          if ($cartContainer.hasClass('active_link')) {
            closeMiniCart();
            $('body').removeClass('blocked-scroll');
          } else {
            openMiniCart($cartContainer);
            $('body').addClass('blocked-scroll');
          }
          if (window.is_touch_device() || Shopify.media_queries.medium.matches) {
            e.preventDefault();
          }
        });
      }

      $('.cart_content__continue-shopping').on('click', () => {
        closeMiniCart();
      });
    } else {
      // Enable touch on parent link if on touch device and desktop menu is visible
      if ($openDropdownOnClick.length || window.is_touch_device()) {
        $('.dropdown_link').attr('data-click-count', 0);

        $('.dropdown_link').on('click', function (e) {
          const $dropdown = $(this).parents('.main-nav').find(`[data-dropdown="${$(this).data('dropdown-rel')}"]`);

          let clickCount = $(this).attr('data-click-count');
          closeAllSubmenus();
          closeDropdown();

          $('.dropdown_link').not(this).attr('data-click-count', 0);
          $('.dropdown_link').attr('data-no-instant', true);

          $('.active_link').removeClass('active_link');

          if (!$(this).hasClass('active_link')) {
            $dropdown.show();

            if ($(this).hasClass('mini_cart')) {
              if (!$('body').hasClass('cart')) {
                $(this).parent('.cart-container').addClass('active_link');
              }
            } else {
              $(this).addClass('active_link');
              $('.is-absolute').parent().removeClass('feature_image');
            }
          }

          // Capture touch event
          if (e.type === 'click') {
            clickCount++;
            $(this).attr('data-click-count', clickCount);

            if (clickCount < 2) {
              e.preventDefault();
              e.stopPropagation();
              return false;
            }
          }
        });
      }

      if ($openDropdownOnClick.length === 0) {
        $('.nav a, .logo a').not('.cart_content a').on('mouseenter', function () {
          if (!$(this).hasClass('active_link')) {
            $('.dropdown_container').hide();
            $('.active_link').removeClass('active_link');
            $('.is-absolute').parent().addClass('feature_image');
          }
        });

        /*$('.main-nav, .top-bar, .cart-container').on('mouseleave', () => {
          $('.dropdown_container').hide();
          $('.active_link').removeClass('active_link');
          $('.is-absolute').parent().addClass('feature_image');
          $('body').removeClass('is-active');
        });*/
		
      }
    }
  },
  removeDataAttributes(target) {
    if($(target).length){
      var i,
          $target = $(target),
          attrName,
          dataAttrsToDelete = [],
          dataAttrs = $target.get(0).attributes,
          dataAttrsLen = dataAttrs.length;

      for (i=0; i<dataAttrsLen; i++) {
        if ( 'data-' === dataAttrs[i].name.substring(0,5) ) {
          dataAttrsToDelete.push(dataAttrs[i].name);
        }
      }
      $.each( dataAttrsToDelete, function( index, attrName ) {
        $target.removeAttr( attrName );
      })
    }
  },
  loadMegaMenu() {

    //Remove old mega-menus so that theme-editor works properly
    $('.sticky_nav .mega-menu').remove();
    $('.header .mega-menu').remove();

    //Clone the mega menu from section into sticky_nav
    $('.mega-menu-container .mega-menu')
      .clone()
      .appendTo('.sticky_nav .main-nav');
    //Remove theme-editor data-attributes
    header.removeDataAttributes('.sticky_nav .mega-menu.dropdown_container .dropdown_column');

    //Loop through mega-menus to add arrow to parent
    $('.mega-menu-container .mega-menu').each(function(index){
      var megaMenuValue = $(this).data("dropdown");
      $('[data-dropdown-rel="' + megaMenuValue + '"]')
        .find('span')
        .remove();

      $('[data-dropdown-rel="' + megaMenuValue + '"]')
        .not('.icon-search')
        .append(' <span class="icon-down-arrow"></span>')
        .addClass('mega-menu-parent')
        .addClass('dropdown_link')
        .removeClass('top_link');

      $('[data-dropdown="' + megaMenuValue + '"]').each(function(index){
        if (!$(this).hasClass('mega-menu')) {
          $(this).remove();
        }
      });

      $(this).clone().appendTo('.header .main-nav');
    });

    //Remove default mega menus if vertical menus are selected
    if ($('.dropdown_link--vertical').length){
      $('.dropdown_link--vertical.mega-menu-parent + .vertical-menu_submenu').remove();
      $('.dropdown_link--vertical:not(.mega-menu-parent)').each(function(index){
        var megaMenuValue = $(this).data('dropdown-rel');
        $('[data-dropdown="' + megaMenuValue + '"]').remove();
      })
    }
    var $openDropdownOnClick = $('.main-nav__wrapper').find('[data-show-dropdown-on-click]');

    if ($openDropdownOnClick.length) {
      $('.mega-menu-parent').on('click', function(e) {

        if(!$(this).hasClass('active_link')) {
          $('.dropdown_container').hide();
          $(this).parents('.main-nav').find('[data-dropdown="' + $(this).data('dropdown-rel') + '"]').toggle();

          $(this).addClass('active_link');
          $('.is-absolute').parent().removeClass('feature_image');
        }
      });
    }

    //Remove theme-editor data-attributes
    header.removeDataAttributes('.header .mega-menu.dropdown_container .dropdown_column');

    if (window.is_touch_device() || Shopify.media_queries.medium.matches) {
      $('.dropdown_link').attr('data-no-instant', true);
    }

    header.loadMobileMegaMenu();
  },
  loadMobileMegaMenu() {

    //Loop through mega menus and add to mobile menu
    $('.mega-menu-container .mobile-mega-menu').each(function(index){
      $('[data-mobile-dropdown-rel="' + $(this).data("mobile-dropdown") + '"]').find('span').remove();
      $('[data-mobile-dropdown-rel="' + $(this).data("mobile-dropdown") + '"] > a').append(' <span class="right icon-down-arrow"></span>').attr('data-no-instant', 'true');
      $('[data-mobile-dropdown-rel="' + $(this).data("mobile-dropdown") + '"]').addClass('mobile-mega-menu-parent sublink');
      $('[data-mobile-dropdown-rel="' + $(this).data("mobile-dropdown") + '"]').append(this);
      $('[data-mobile-dropdown-rel="' + $(this).data("mobile-dropdown") + '"] > ul').each(function(index){
        if (!$(this).hasClass('mobile-mega-menu')) {
          $(this).remove();
        }
      });
    });
  },
  unloadMegaMenu() {
    $('.header .mega-menu').remove();
    $('.mega-menu-container .mega-menu').each(function(index){
      var menuParent = $(this).data('dropdown');
      $('.mega-menu-parent[data-dropdown-rel="' + $(this).data("dropdown") + '"]').find('.icon-down-arrow').remove();
    });
  },
  unload() {
    $('body').off('click', '.mobile_nav');
    $('body').off('click', '.dropdown_link');
    $('html').off('click');
    $('.mini_cart').off('click');
    $('.cart_content__continue-shopping').off('click');
    $('body').off('click', '.banner a[href^="#"]');
    $('.main-nav__wrapper.sticky_nav').remove();
  }
}

/*============================================================================
  Map
==============================================================================*/
window.map = {
  init() {
    if ($('.lazymap').length > 0) {
      lazyframe('.lazymap');
    }

    if ($('.maps').hasClass('js-api-map')) {
      const mapsToLoad = [];
      // Create map settings array
      $('.map').each(function (i) {
        mapsToLoad.push(this);
        mapsToLoad[i].sectionid = $(this).data('id');
        mapsToLoad[i].address = $(this).data('address');
        mapsToLoad[i].directions = $(this).data('directions-address');
        mapsToLoad[i].zoom = $(this).data('zoom');
        mapsToLoad[i].mapstyle = $(this).data('style');
        mapsToLoad[i].showpin = $(this).data('pin');
        mapsToLoad[i].apikey = $(this).data('api-key');
      });
      $.each(mapsToLoad, i => {
        // Enable caching to avoid duplicate google maps files
        $.ajaxSetup({ cache: true });
        // Load maps script and find location coordinates
        $.getScript(
          `https://maps.googleapis.com/maps/api/js?key=${mapsToLoad[i].apikey}`,
        ).then(() => {
          mapFunction.findLocation(mapsToLoad[i]);
          $.ajaxSetup({ cache: false });
        });
      });
    }
  },
  findLocation(mapArray) {
    let geoLat;
    let geoLng;
    const geocoder = new google.maps.Geocoder();
    // Find and set coordinates
    geocoder.geocode({ address: mapArray.address }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        geoLat = results[0].geometry.location.lat();
        geoLng = results[0].geometry.location.lng();
        // Create map
        mapFunction.initMap(geoLat, geoLng, mapArray);
      } else {
        console.log(`Error:${status}`);
      }
    });
  },
  initMap(lat, lng, mapArray) {
    const location = { lat, lng };
    let styleJson = [];
    // Set style JSON
    if (mapArray.mapstyle === 'aubergine') {
      styleJson = [{ elementType: 'geometry', stylers: [{ color: '#1d2c4d' }] }, { elementType: 'labels.text.fill', stylers: [{ color: '#8ec3b9' }] }, { elementType: 'labels.text.stroke', stylers: [{ color: '#1a3646' }] }, { featureType: 'administrative.country', elementType: 'geometry.stroke', stylers: [{ color: '#4b6878' }] }, { featureType: 'administrative.land_parcel', elementType: 'labels.text.fill', stylers: [{ color: '#64779e' }] }, { featureType: 'administrative.province', elementType: 'geometry.stroke', stylers: [{ color: '#4b6878' }] }, { featureType: 'landscape.man_made', elementType: 'geometry.stroke', stylers: [{ color: '#334e87' }] }, { featureType: 'landscape.natural', elementType: 'geometry', stylers: [{ color: '#023e58' }] }, { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#283d6a' }] }, { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#6f9ba5' }] }, { featureType: 'poi', elementType: 'labels.text.stroke', stylers: [{ color: '#1d2c4d' }] }, { featureType: 'poi.park', elementType: 'geometry.fill', stylers: [{ color: '#023e58' }] }, { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#3C7680' }] }, { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#304a7d' }] }, { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#98a5be' }] }, { featureType: 'road', elementType: 'labels.text.stroke', stylers: [{ color: '#1d2c4d' }] }, { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#2c6675' }] }, { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#255763' }] }, { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#b0d5ce' }] }, { featureType: 'road.highway', elementType: 'labels.text.stroke', stylers: [{ color: '#023e58' }] }, { featureType: 'transit', elementType: 'labels.text.fill', stylers: [{ color: '#98a5be' }] }, { featureType: 'transit', elementType: 'labels.text.stroke', stylers: [{ color: '#1d2c4d' }] }, { featureType: 'transit.line', elementType: 'geometry.fill', stylers: [{ color: '#283d6a' }] }, { featureType: 'transit.station', elementType: 'geometry', stylers: [{ color: '#3a4762' }] }, { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0e1626' }] }, { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#4e6d70' }] }];
    } else if (mapArray.mapstyle === 'retro') {
      styleJson = [{ elementType: 'geometry', stylers: [{ color: '#ebe3cd' }] }, { elementType: 'labels.text.fill', stylers: [{ color: '#523735' }] }, { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f1e6' }] }, { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#c9b2a6' }] }, { featureType: 'administrative.land_parcel', elementType: 'geometry.stroke', stylers: [{ color: '#dcd2be' }] }, { featureType: 'administrative.land_parcel', elementType: 'labels.text.fill', stylers: [{ color: '#ae9e90' }] }, { featureType: 'landscape.natural', elementType: 'geometry', stylers: [{ color: '#dfd2ae' }] }, { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#dfd2ae' }] }, { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#93817c' }] }, { featureType: 'poi.park', elementType: 'geometry.fill', stylers: [{ color: '#a5b076' }] }, { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#447530' }] }, { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#f5f1e6' }] }, { featureType: 'road.arterial', elementType: 'geometry', stylers: [{ color: '#fdfcf8' }] }, { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#f8c967' }] }, { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#e9bc62' }] }, { featureType: 'road.highway.controlled_access', elementType: 'geometry', stylers: [{ color: '#e98d58' }] }, { featureType: 'road.highway.controlled_access', elementType: 'geometry.stroke', stylers: [{ color: '#db8555' }] }, { featureType: 'road.local', elementType: 'labels.text.fill', stylers: [{ color: '#806b63' }] }, { featureType: 'transit.line', elementType: 'geometry', stylers: [{ color: '#dfd2ae' }] }, { featureType: 'transit.line', elementType: 'labels.text.fill', stylers: [{ color: '#8f7d77' }] }, { featureType: 'transit.line', elementType: 'labels.text.stroke', stylers: [{ color: '#ebe3cd' }] }, { featureType: 'transit.station', elementType: 'geometry', stylers: [{ color: '#dfd2ae' }] }, { featureType: 'water', elementType: 'geometry.fill', stylers: [{ color: '#b9d3c2' }] }, { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#92998d' }] }];
    } else if (mapArray.mapstyle === 'silver') {
      styleJson = [{ elementType: 'geometry', stylers: [{ color: '#f5f5f5' }] }, { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] }, { elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] }, { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f5f5' }] }, { featureType: 'administrative.land_parcel', elementType: 'labels.text.fill', stylers: [{ color: '#bdbdbd' }] }, { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#eeeeee' }] }, { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] }, { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#e5e5e5' }] }, { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#9e9e9e' }] }, { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] }, { featureType: 'road.arterial', elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] }, { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#dadada' }] }, { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] }, { featureType: 'road.local', elementType: 'labels.text.fill', stylers: [{ color: '#9e9e9e' }] }, { featureType: 'transit.line', elementType: 'geometry', stylers: [{ color: '#e5e5e5' }] }, { featureType: 'transit.station', elementType: 'geometry', stylers: [{ color: '#eeeeee' }] }, { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#c9c9c9' }] }, { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#9e9e9e' }] }];
    } else if (mapArray.mapstyle === 'night') {
      styleJson = [{ elementType: 'geometry', stylers: [{ color: '#242f3e' }] }, { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] }, { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] }, { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] }, { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] }, { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#263c3f' }] }, { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#6b9a76' }] }, { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#38414e' }] }, { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#212a37' }] }, { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#9ca5b3' }] }, { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#746855' }] }, { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#1f2835' }] }, { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#f3d19c' }] }, { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#2f3948' }] }, { featureType: 'transit.station', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] }, { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#17263c' }] }, { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#515c6d' }] }, { featureType: 'water', elementType: 'labels.text.stroke', stylers: [{ color: '#17263c' }] }];
    } else { styleJson = []; }
    // Create google maps link
    $('.js-map-link').attr(
      'href',
      `https://www.google.com/maps/place/${
        mapArray.directions
      }/@${
        lat
      },${
        lng}`,
    );
    // Set map options
    const mapOptions = {
      zoom: mapArray.zoom,
      center: location,
      styles: styleJson,
      disableDefaultUI: false,
    };
    // Create map
    const map = new google.maps.Map(
      document.getElementById(mapArray.sectionid),
      mapOptions,
    );
    // Show pin
    if (mapArray.showpin === true) {
      const marker = new google.maps.Marker({
        position: location,
        map,
      });
    }
  }
}

/*============================================================================
  Global accordions
==============================================================================*/
window.accordion = {
  init() {
    let flg = 0;
    const $faqHeading = $('.faqAccordion > dt > button, .accordion > dt > a');
    $('.faqAccordion > dd, .accordion > dd').attr('aria-hidden', true);
    $faqHeading.attr('aria-expanded', false);
    $faqHeading.on('click activate', function () {
      if (flg) return false;
      flg = 1;
      const state = $(this).attr('aria-expanded') === 'false' ? true : false;
      $(this).attr('aria-expanded', state);
      $(this).parent().next().slideToggle(() => {
        flg = 0;
      });
      $(this).parent().next().attr('aria-hidden', !state);
      return false;
    });
    $faqHeading.on('keydown', function (event) {
      const keyCode = event.keyCode || event.which;
      if (keyCode === 13) {
        $(this).trigger('activate');
      }
    });
  }
}

/*============================================================================
  Global shortcodes
==============================================================================*/
class ProductCTA extends HTMLElement {
  static get shortcode() {
    return 'product-cta';
  }

  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    this.attachShadow({ mode: 'open' }); // sets and returns 'this.shadowRoot'
    this.events = [];

    const forAttr = this.getAttribute('for');
    const variants = forAttr ? document.querySelector(`#${forAttr} [data-variants]`) : null;
    const variantId = this.getAttribute('variantid');
    const appendto = document.querySelector(this.getAttribute('appendto'));

    if (!variants || !variantId) {
      this._setVisible(false);
      return;
    }

    if (appendto) {
      appendto.appendChild(this);
    }

    // Remove element from DOM and insert new element into position
    this._registerEvent({ el: variants, event: 'change', listener: e => this._onVariantChange(e, variantId) });
    this._setVisible(variants.value === this.variantId);
  }

  connectedCallback() {
    const href = this.getAttribute('href') || '#';
    const target = this.getAttribute('target');
    const style = document.createElement('style');
    const a = document.createElement('a');
    const slot = document.createElement('slot');

    style.innerHTML = `
      a {
        color: inherit;
        cursor; inherit;
        text-decoration: inherit;
      }
    `;

    a.href = href;
    a.target = target;
    a.appendChild(slot);

    if (target === '_blank') {
      const icon = document.createElement('span');
      icon.classList.add('button-icon');
      icon.setAttribute('aria-label', '(New window)');
      icon.innerHTML = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.81792 2.29812L5.68732 5.42884L6.57121 6.3127L9.70198 3.18183L9.70227 5.51933L10.9523 5.51917L10.9518 1.67302L10.9517 1.0481L10.3268 1.0481L6.48062 1.04815L6.48064 2.29815L8.81792 2.29812ZM1.67297 1.04817H1.04797V1.67317V10.327V10.952H1.67297H10.3268H10.9518V10.327V8.13026H9.70175V9.70195H2.29797V2.29817H3.83642V1.04817H1.67297Z" fill="currentColor"/></svg>';

      // attach the created elements to the shadow DOM
      a.appendChild(icon);
    }

    this.shadowRoot.append(style, a);
  }

  disconnectedCallback() {
    this.events.forEach(({ el, event, listener }) => el.removeEventListener(event, listener));
    this.shadowRoot.innerHTML = '';
    this._setVisible(true);
  }

  _registerEvent({ el, event, listener }) {
    this.events.push({ el, event, listener });

    el.addEventListener(event, listener);

    return { el, event, listener };
  }

  _setVisible(visible) {
    this.toggleAttribute('hidden', !visible);
  }

  _onVariantChange(e, variantId) {
    this._setVisible(e.currentTarget.value === variantId);
  }
}

customElements.define(ProductCTA.shortcode, ProductCTA);

var ptype;
var pagenm = window.location.pathname;
function inti_call(){
   setTimeout(function(){
     if( jQuery('.product_form').length>0 ){
      var data_product = jQuery('.product_form').attr('data-product');
	  data_product = jQuery.parseJSON(data_product);
      ptype = data_product.type.toLowerCase().replace(/ /g, "-");
      }
      
      var html ='<div class="tc-logo"><span class="gold-logo" style="background-image:url(https://cdn.shopify.com/s/files/1/0595/8192/3483/t/2/assets/tccwearlogo.png)"></span><span class="silver-logo active" style="background-image:url(https://cdn.shopify.com/s/files/1/0595/8192/3483/t/2/assets/tccwearlogo-silver.png)"></span></div>';
      //if( pagenm == "/collections/all" ){
      jQuery('#quickshop .flickity-slider .gallery-cell.is-selected').append('<span class="initials"></span>'+html);
      jQuery('.product .flickity-slider .gallery-cell.is-selected').append('<span class="initials"></span>'+html); 
      jQuery('.product #pwzrswiper-slide-0').append('<span class="initials"></span>'+html); 
      
      jQuery('.matching-products ul li.product a .img-wrap').append(html);
      if( getCookie("tccinitials")!='' ){
	    tccinitials = getCookie("tccinitials");
	    jQuery('.tcc-initial-input').val(tccinitials);
	  }
      if( getCookie("tcccolor")!='' ){
          tcccolor = getCookie("tcccolor");
          jQuery('.tcc-color-select[value="'+tcccolor+'"]').prop('checked',true);
      }
      jQuery('.tcc-initial-input').keyup();
    },500);
}
jQuery(document).ready(function(){
    jQuery("#mobile_menu2").simpleMobileMenu({
            onMenuLoad: function(menu) {
                console.log(menu)
                console.log("menu loaded")
            },
            onMenuToggle: function(menu, opened) {
                console.log(opened)
            },
            "menuStyle": "slide"
        });
    var logotxt = '<div class="tc-mobile-logo"><img src="//cdn.shopify.com/s/files/1/0595/8192/3483/files/tccshopify_410x.png?v=1630611915"></div><div class="tc-menu-close"><svg height="30px" width="30px" fill="#000000" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve"><style type="text/css"> 	.st0{fill:#000000;} </style><path class="st0" d="M56.5,47.5L78.9,25c1.2-1.2,1.2-3.1,0-4.2c-1.2-1.2-3.1-1.2-4.2,0L52.3,43.3L29.8,20.8c-1.2-1.2-3.1-1.2-4.2,0  c-1.2,1.2-1.2,3.1,0,4.2L48,47.5L25.6,70c-1.2,1.2-1.2,3.1,0,4.2c0.6,0.6,1.4,0.9,2.1,0.9s1.5-0.3,2.1-0.9l22.5-22.5l22.5,22.5  c0.6,0.6,1.4,0.9,2.1,0.9s1.5-0.3,2.1-0.9c1.2-1.2,1.2-3.1,0-4.2L56.5,47.5z"></path></svg></div><div class="mm-navbar__title">Menu</div>';
    jQuery('.sm_menu_outer').prepend(logotxt);
  	jQuery('.tc-menu-close').click(function(){
		jQuery('.sm_menu_outer').toggleClass('active');
      	jQuery('header#header > .top-bar > .mobile_nav > div').toggleClass('not-active');
    });
  
	jQuery('header#header > .top-bar > .mobile_nav > div').addClass('not-active');
    jQuery('header#header > .top-bar > .mobile_nav').on('click',function(){
     	jQuery('.sm_menu_outer').toggleClass('active');
      	//jQuery('header#header > .top-bar > .mobile_nav > div').toggleClass('active');
      	//jQuery('header#header > .top-bar > .mobile_nav > div').toggleClass('not-active');
    });
    inti_call();
    jQuery('.quick_shop').on('click',function(){
     	inti_call();
    });
    jQuery(document).on('keyup','.tcc-initial-input',function(e){
      var val = jQuery(this).val().replace(/[^a-zA-Z .,'‘&-]/gi, '').replace(/[_\s]/g, '-');
      jQuery(this).val( val );
    });
    jQuery(document).on('keyup','.tcc-initial-input',function(){
        //jQuery(this).val( jQuery(this).val().replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-') );
	    var tccinitials = jQuery('.tcc-initial-input').val();
      	var ckp = jQuery('.tcc-initial-input').closest('.product_form').hasClass('small-leather-goods');
        if( ckp==true ){
          $this = jQuery('.tcc-initial-input');
          var v = $this.val().replace('.','');
          if( tccinitials.length>=1 ){
            $this.val(v.substring(0,1));
          }
        }
      	initial_fun();
	    setCookie("tccinitials", tccinitials, 30);
	});
    jQuery(document).on('click','.tcc-initial-input',function(){
    	jQuery( ".product_gallery_nav .gallery-cell:first").click();
	});
  
    jQuery(document).on('change','.tcc-color-select',function(){
	    var tcccolor = jQuery('.tcc-color-select:checked').val();
	    setCookie("tcccolor", tcccolor, 30);
	    initial_fun();
	});
    jQuery('.add-cart-btn').on('click',function(){
	    jQuery('.add_to_cart.ajax-submit').trigger('click');
	    return false;
	});
  	jQuery(document).on('click','.tcc-mobile-buttons .personalize-btn',function(e){
        e.preventDefault();
        jQuery('html, body').animate({
            scrollTop: jQuery(".new-tcc-design").offset().top-450
        }, 2000);
        return false;
    });
  	jQuery(document).on('change','.single-option-selector',function(){
      setTimeout(function(){
        if( jQuery('.product #pwzrswiper-slide-0 .initials').length==0 ){
      		var html ='<div class="tc-logo"><span class="gold-logo" style="background-image:url(https://cdn.shopify.com/s/files/1/0595/8192/3483/t/2/assets/tccwearlogo.png)"></span><span class="silver-logo active" style="background-image:url(https://cdn.shopify.com/s/files/1/0595/8192/3483/t/2/assets/tccwearlogo-silver.png)"></span></div>';
      		jQuery('.product #pwzrswiper-slide-0').append('<span class="initials"></span>'+html); 
            initial_fun();
        }
      },500);
      
      var color_nm = jQuery(this).val();
       jQuery('.matching-products ul li.product').each(function(){
            var cnm = jQuery(this).find('.match-colors[data-color="'+color_nm+'"]').attr('data-href');
            var cid = jQuery(this).find('.match-colors[data-color="'+color_nm+'"]').attr('data-vid');
            if( cnm!='' ) jQuery(this).find('img').attr( 'src',cnm );
            if( cid!='' ) jQuery(this).closest('li').find('[name="id"]').val( cid );
        });
       $('[data-thumb-color]').hide();
       $('[data-thumb-color="'+color_nm+'"]').show();
     });

      var stickyNavTop = jQuery('#header.mobile_nav-fixed--true').offset().top;
      var stickyNav = function(){
        var scrollTop = jQuery(window).scrollTop();
        if (scrollTop > stickyNavTop) { 
          jQuery('#header.mobile_nav-fixed--true').parent().addClass('sticky');
        } else {
          jQuery('#header.mobile_nav-fixed--true').parent().removeClass('sticky'); 
        }
      };
      stickyNav();
      jQuery(window).scroll(function() {
        stickyNav();
      });
  	jQuery('.faq-heading').click(function(){
        jQuery('.faq-block').removeClass('open');
        jQuery(this).parent('.faq-block').addClass('open');
    });
  
  	jQuery('.insta-carousel').slick({
      infinite: true,
      slidesToShow: 6,
      slidesToScroll: 1,
      arrow:true,
      autoplay: true,
  	  autoplaySpeed: 3000,
      responsive: [
        {
          breakpoint: 798,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 425,
          settings: {
            slidesToShow: 2
          }
        }
      ]
	});
});

jQuery(window).scroll(function(event) {
    var scroll = jQuery(window).scrollTop();
    if (scroll <= 500) {
      jQuery(".tcc-mobile-buttons").addClass("hidden"); 
    } else {
      jQuery(".tcc-mobile-buttons").removeClass("hidden");
    }
});

var curinitial = 'initials';
function initial_fun(){				
  var tccinitials = jQuery('.tcc-initial-input').val();
  var tcccolor = jQuery('.tcc-color-select:checked').val();

  if( tcccolor=='gold' ){
    jQuery('.tc-logo span').removeClass('active');
    jQuery('.tc-logo .gold-logo').addClass('active');
  }else{
    jQuery('.tc-logo span').removeClass('active');
    jQuery('.tc-logo .silver-logo').addClass('active');
  }
  
  if( tccinitials=='' ){
      jQuery('.tcc-mobile-buttons .tcc-pre-1').show();
      jQuery('.add-cart-btn').hide();
  }else{
      jQuery('.tcc-mobile-buttons .tcc-pre-1').hide();
      jQuery('.add-cart-btn').show();
   }
  
  var cu_val = jQuery('.tcc-initial-input').val();
  
  if( jQuery('body' ).hasClass('product-sling-bag')==true ){
    var tccinitials = cu_val.substr(0,2);
    jQuery('.tcc-initial-input').val(tccinitials);
    jQuery('.max-words').text(tccinitials.length+'/2');
  }else{
    var tccinitials = cu_val.substr(0,8);
    jQuery('.tcc-initial-input').val(tccinitials);
    jQuery('.max-words').text(tccinitials.length+'/8');
  }
  
  var ckp = jQuery('.tcc-initial-input').closest('.product_form').hasClass('small-leather-goods');
  if( ckp==true && tccinitials.length>0 ){
  	tccinitials = tccinitials+'.';
  }

  jQuery('.curr_letter').val(tccinitials);
  jQuery('.curr_color').val(tcccolor);
  jQuery('.flickity-slider .initials').text(tccinitials);
  jQuery('.matching-products .initials').text(tccinitials);
  jQuery('.tcc-per-txt').text(tccinitials);
  jQuery('.flickity-slider .initials').attr('class','').addClass(curinitial+' '+ptype);
  jQuery('.matching-products .initials').attr('class','').addClass(curinitial);
  jQuery('.flickity-slider .initials').addClass(tcccolor);  
  jQuery('.matching-products .initials').addClass(tcccolor); 
  
  jQuery('.product #pwzrswiper-slide-0 .initials').attr('class','').addClass(curinitial+' '+ptype);
  jQuery('.product #pwzrswiper-slide-0 .initials').addClass(tcccolor);
  if (tccinitials.length > 5){
    jQuery('.product #pwzrswiper-slide-0 .initials').addClass('five_plus_characters');
    jQuery('.product #pwzrswiper-slide-0 .initials').text(tccinitials);
  } else {
    jQuery('.product #pwzrswiper-slide-0 .initials').removeClass('five_plus_characters');
    jQuery('.product #pwzrswiper-slide-0 .initials').text(tccinitials);
  }
}
function setCookie(cname,cvalue,exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

jQuery('.store-product').slick({
  dots: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 810,
      settings: { slidesToShow: 2,slidesToScroll: 1,infinite: true,dots: false , arrows: false }
    },
    {
      breakpoint: 431,
      settings: { slidesToShow: 1,slidesToScroll: 1,infinite: true,dots: false , arrows: false  }
    }
  ]
});

jQuery('#text-to-print').on('input propertychange paste', function(){
  jQuery('.initials').text(jQuery(this).val())
});

jQuery(document).on('click', '.color-swatch-option .color-swatch', function(){
  var color = jQuery(this).attr('title');
  jQuery('.color-swatch').removeClass('active');
  jQuery(this).addClass('active');
  jQuery('.single-option-selector').val(color);
  jQuery('.single-option-selector').change();
  
  setTimeout(function(){
  var html ='<div class="tc-logo"><span class="gold-logo" style="background-image:url(https://cdn.shopify.com/s/files/1/0595/8192/3483/t/2/assets/tccwearlogo.png)"></span><span class="silver-logo active" style="background-image:url(https://cdn.shopify.com/s/files/1/0595/8192/3483/t/2/assets/tccwearlogo-silver.png)"></span></div>';
  jQuery('#quickshop .flickity-slider .gallery-cell.is-selected').append('<span class="initials"></span>'+html);
  jQuery('.product .flickity-slider .gallery-cell.is-selected').append('<span class="initials"></span>'+html);
  jQuery('.tcc-initial-input').keyup();
  },500);
});

jQuery(document).on('click', '.store-change-color', function(){
  var src = jQuery(this).attr('data-href');
  jQuery(this).closest('.store-color-option').find('.store-change-color').removeClass('active');
  jQuery(this).addClass('active');
  jQuery(this).closest('.single-product').find('.product-image img').attr('src',src);
});

jQuery(document).ready(function(){
 

  if( getCookie("tcc_country")=='' ){
    $.get("https://ipinfo.io/json", function (response) {
        setCookie("tcc_country", response.country, 30);
        $('[name="country_code"]').val(response.country);
        $('#localization_form').submit();
    }, "jsonp");
  }
	if( getCookie("tcc_country_nm")=='' ){
  	$.get("https://ipwhois.app/json/", function (response) {
      	setCookie("tcc_country_nm", response.country, 30);
        setCookie("tcc_country_flag", response.country_flag, 30);
    }, "jsonp");
  }
  
  if( getCookie("tcc_country_nm")!='' ){
  	jQuery('.country-info').html( '<img src="'+getCookie("tcc_country_flag")+'" width="28px">'+' <b>'+getCookie("tcc_country_nm")+'</b>' );
  }
  
  setTimeout(function(){
  	var rcnt = jQuery('.jdgm-prev-badge').attr('data-number-of-reviews');
  	jQuery('.top-reviews .jdgm-prev-badge__text').text(rcnt+' Reviews');
  },500);
  
  jQuery('.brought-product ul').slick({
    arrows: false,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1
  });
  
  jQuery('.top-notify-bar').slick({
      speed:500,
      slidesToShow: 1,
      vertical: true,
      arrows: false,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 5000,
    });
  jQuery('.mini_cart').on('click', function() {
    jQuery('.mix-match-products > ul').not('.slick-initialized').slick({
      speed:500,
      slidesToShow: 1,
      dots: true,
      arrows: false,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 5000,
    });
    jQuery('.mix-match-products ul.slick-slider').slick('refresh');
    setTimeout(function(){
      jQuery('.mix-match-products ul.slick-slider').slick('refresh');
    },1000);
});
  
    jQuery(document).on('click', '.cart__remove-btn',function(event) {
      setTimeout(function(){
        jQuery('.mix-match-products ul.slick-slider').slick('refresh');
      },2200);  
    });
  
    jQuery('.cart-container').on('classChanged', function(event) {
     jQuery('.mix-match-products > ul').not('.slick-initialized').slick({
      speed:500,
      slidesToShow: 1,
      dots: true,
      arrows: false,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 5000,
    });
      jQuery('.mix-match-products ul.slick-slider').slick('refresh');
      setTimeout(function(){
      jQuery('.mix-match-products ul.slick-slider').slick('refresh');
    },1000);
});
});