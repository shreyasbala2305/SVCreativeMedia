document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  const selectBody = document.querySelector('body');
  const selectHeader = document.querySelector('#header');

  function toggleScrolled() {
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Scroll up sticky header to headers with .scroll-up-sticky class
   */
  let lastScrollTop = 0;
  window.addEventListener('scroll', function() {
    if (!selectHeader.classList.contains('scroll-up-sticky')) return;

    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > selectHeader.offsetHeight) {
      selectHeader.style.setProperty('position', 'sticky', 'important');
      selectHeader.style.top = `-${header.offsetHeight + 50}px`;
    } else if (scrollTop > selectHeader.offsetHeight) {
      selectHeader.style.setProperty('position', 'sticky', 'important');
      selectHeader.style.top = "0";
    } else {
      selectHeader.style.removeProperty('top');
      selectHeader.style.removeProperty('position');
    }
    lastScrollTop = scrollTop;
  });

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .has-dropdown i').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      if (document.querySelector('.mobile-nav-active')) {
        e.preventDefault();
        this.parentNode.classList.toggle('active');
        this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
        e.stopImmediatePropagation();
      }
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  function initIsotopeLayout() {
    document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
      let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
      let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
      let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

      let initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });

      isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
        filters.addEventListener('click', function() {
          isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          initIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aosInit === 'function') {
            aosInit();
          }
        }, false);
      });

    });
  }
  window.addEventListener('load', initIsotopeLayout);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll('.swiper').forEach(function(swiper) {
      let config = JSON.parse(swiper.querySelector('.swiper-config').innerHTML.trim());
      new Swiper(swiper, config);
    });
  }
  window.addEventListener('load', initSwiper);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

});

//Client Slider
$(document).ready(function(){
  $(".client-logos").slick({
    dots: false,
    infinite: true,
    autoplay: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
    focusOnSelect:true,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });
});

// show and hide div according to a link
var li_elements = document.querySelectorAll(".services-list ul li");
var item_elements = document.querySelectorAll(".right-wrap .item");
for(var i = 0; i < li_elements.length; i++){
  li_elements[i].addEventListener("click", function(){
    li_elements.forEach(function(li){
      li.classList.remove("active");
    })
    this.classList.add("active");
    var li_value = this.getAttribute("data-li");

    item_elements.forEach(function(item){
      item.style.display = "none";
    })
    
    if(li_value == "graphic"){
      document.getElementById(li_value).style.display = "block";
    }
    else if(li_value == "product"){
      document.getElementById(li_value).style.display = "block";
    }
    else if(li_value == "digital"){
      document.getElementById(li_value).style.display = "block";
    }
    else if(li_value == "social-media"){
      document.getElementById(li_value).style.display = "block";
    }
    else if(li_value == "web-design"){
      document.getElementById(li_value).style.display = "block";
    }
    else if(li_value == "photography"){
      document.getElementById(li_value).style.display = "block";
    }
    else{
      console.log("");
    }

  });

}
const boxes = document.querySelectorAll('.cshape');

function HideLogo(){
  // var idname = this.getAttribute(id);
  var x = document.getElementById('logo');
  if(x.style.display == 'none'){
    x.style.display = 'block';
  }
  else{
    x.style.display = 'none';
  }
}

function HideBroucher(){
  // var idname = this.getAttribute(id);
  var x = document.getElementById('broucher');
  if(x.style.display == 'none'){
    x.style.display = 'block';
  }
  else{
    x.style.display = 'none';
  }
}

function HideMenu(){
  // var idname = this.getAttribute(id);
  var x = document.getElementById('menu');
  if(x.style.display == 'none'){
    x.style.display = 'block';
  }
  else{
    x.style.display = 'none';
  }
}

function HideFlyers(){
  // var idname = this.getAttribute(id);
  var x = document.getElementById('flyers');
  if(x.style.display == 'none'){
    x.style.display = 'block';
  }
  else{
    x.style.display = 'none';
  }
}

function HideSocial(){
  // var idname = this.getAttribute(id);
  var x = document.getElementById('social');
  if(x.style.display == 'none'){
    x.style.display = 'block';
  }
  else{
    x.style.display = 'none';
  }
}

function HideIllustration(){
  // var idname = this.getAttribute(id);
  var x = document.getElementById('illustration');
  if(x.style.display == 'none'){
    x.style.display = 'block';
  }
  else{
    x.style.display = 'none';
  }
}

function HideBuisnessCard(){
  // var idname = this.getAttribute(id);
  var x = document.getElementById('buisness-card');
  if(x.style.display == 'none'){
    x.style.display = 'block';
  }
  else{
    x.style.display = 'none';
  }
}

function HideVistingCard(){
  // var idname = this.getAttribute(id);
  var x = document.getElementById('visiting-card');
  if(x.style.display == 'none'){
    x.style.display = 'block';
  }
  else{
    x.style.display = 'none';
  }
}

var onScrollHandler = function() {
  var newImageUrl = yourImageElement.src;
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  if (scrollTop > 10) {
     newImageUrl = "assets\img\logo\SV Creative Media logo-2.png"
  }
  if (scrollTop > 200) {
     newImageUrl = "assets\img\logo\SV Creative Media logo-1.png"
  }
  yourImageElement.src = newImageUrl;
};
object.addEventListener ("scroll", onScrollHandler);
