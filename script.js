document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('year').textContent = new Date().getFullYear();

  const laravelBtn = document.getElementById('laravel-gallery-btn');
  const laravelModal = document.getElementById('laravel-gallery');
  const closeBtn = document.querySelector('.close-btn');
  const sliderTrack = document.querySelector('.slider-track');
  const slides = document.querySelectorAll('.slide');
  const prevArrow = document.querySelector('.prev-arrow');
  const nextArrow = document.querySelector('.next-arrow');
  const dotsContainer = document.querySelector('.slider-dots');

  let currentIndex = 0;
  let slideWidth;

  // Verificar existencia de dotsContainer
  if (!dotsContainer) {
    console.warn('Falta el contenedor .slider-dots en el HTML');
    return;
  }

  // Crear los dots
  slides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.dot');

  // Redimensionar el slider cuando cambie el tamaño
  window.addEventListener('resize', () => {
    slideWidth = slides[0].clientWidth;
    updateSliderPosition();
  });

  function updateSliderPosition() {
    sliderTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    updateDots();
  }

  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSliderPosition();
  }

  prevArrow.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
    updateSliderPosition();
  });

  nextArrow.addEventListener('click', () => {
    currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
    updateSliderPosition();
  });

  document.addEventListener('keydown', (e) => {
    if (laravelModal.style.display === 'flex') {
      if (e.key === 'ArrowLeft') {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
        updateSliderPosition();
      } else if (e.key === 'ArrowRight') {
        currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
        updateSliderPosition();
      } else if (e.key === 'Escape') {
        closeModal();
      }
    }
  });

  laravelBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);

  laravelModal.addEventListener('click', (e) => {
    if (e.target === laravelModal) {
      closeModal();
    }
  });

  function openModal() {
    laravelModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    slideWidth = slides[0].clientWidth; // calcular cuando es visible
    updateSliderPosition();
  }

  function closeModal() {
    laravelModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  // Scroll suave para anclas internas
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});

