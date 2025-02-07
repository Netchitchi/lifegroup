document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navList = document.getElementById('nav-list');
  const body = document.getElementsByTagName('body')[0];
    
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation(); 
      if (navList.classList.contains('active')) {
        // If the menu is open, close it
        navList.classList.remove('active');
        navList.classList.add('desactive');
      } else {
        // If the menu is closed, open it
        navList.classList.remove('desactive');
        navList.classList.add('active');
      }
    });

  body.addEventListener('click', () => {
    navList.classList.add('active');
    navList.classList.add('desactive');
  });


  // slide show

  let currentIndex = 0;
  let autoSlideInterval;

  function showSlide(index) {
    const slides = document.querySelector('.slides');
    const sliderWidth = document.querySelector('.image').offsetWidth; 
    const totalSlides = slides.children.length;

    // Loop back to the first slide if the index is out of bounds
    if (index >= totalSlides) currentIndex = 0;
    else if (index < 0) currentIndex = totalSlides - 1;
    else currentIndex = index;

    // Move the slides
    const offset = -currentIndex * (sliderWidth + 60 ); 
    slides.style.transform = `translateX(${offset}px)`;
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // Detect manual scrolling and pause the auto-slide
  const slider = document.querySelector('.slides');

  let isScrolling;
  slider.addEventListener('scroll', () => {
    stopAutoSlide();
    clearTimeout(isScrolling);
    isScrolling = setTimeout(startAutoSlide, 2000); // Restart auto-slide after 2 sec
  });

  // Update the slider when the window is resized
  window.addEventListener('resize', () => {
    showSlide(currentIndex); 
  });

  // Show the first slide initially
  showSlide(currentIndex);
  startAutoSlide(); // Start auto sliding on page load
});
