"use strict";
/**
 * Lab: Bayer
 * Agency: ÜlaIdeas
 * Created by: Julio Calderón
 * Developed By: Julio Calderón
 * Modified By: Julio Calderón
 * last modified: 2025-02-27
 */
let global = {
   slides: [],
   currentSlideIndex: 0,
   currentSpecialNav: 0,

   renderNavigation: function () {

      // Renderizar navegación del header
      const headerNavList = document.querySelector('#header-nav .nav-list');
      if (headerNavList && veeva.navigationHeader) {
         headerNavList.innerHTML = '';
         veeva.navigationHeader.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = `nav-item ${item.active ? 'active' : ''}`;
            const a = document.createElement('a');
            a.textContent = item.name;
            li.addEventListener('click', function (e) {
               e.preventDefault();
               // Verificar si goToSlide es numérico o una función
               if (/^\d+$/.test(item.goToSlide)) {
                  slideUno.jumpToSlide(item.goToSlide);
               }
            });
            li.appendChild(a);
            headerNavList.appendChild(li);
         });
      }

      // Renderizar navegación del footer
      const footerNavList = document.querySelector('#footer-nav .footer-nav-list');
      if (footerNavList && veeva.navigationFooter) {
         footerNavList.innerHTML = '';
         veeva.navigationFooter.forEach(item => {
            const li = document.createElement('li');
            li.className = `footer-nav-item ${item.active ? 'active' : ''}`;
            const a = document.createElement('a');
            if (item.name === "Menú") {
               a.innerHTML = `
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-7">
                     <path fill-rule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
                  </svg>`;
            } else {
               a.textContent = item.name;
            }
            li.addEventListener('click', function (e) {
               e.preventDefault();
               // Manejar diferentes tipos de acciones según el goToSlide
               if (item.goToSlide === "fn_menu") {// mostrar el menú
                  global.togleMenu();
               } else if (item.goToSlide === "fn_referencias") {// mostrar referencias
                  global.togleReferences();
               } else if (item.goToSlide.includes("fn_link")) {// Extraer URL del string "link('URL', '_blank')"
                  const urlMatch = item.goToSlide.match(/fn_link\('([^']+)'.*\)/);
                  if (urlMatch && urlMatch[1]) {
                     window.open(urlMatch[1], '_blank');
                  }
               } else if (/^\d+$/.test(item.goToSlide)) {// Si es un número de slide, navegar a él
                  slideUno.jumpToSlide(item.goToSlide);
               }
            });
            li.appendChild(a);
            footerNavList.appendChild(li);
         });
      }

      // Renderizar menú
      const menuNavList = document.querySelector('#menu-nav .menu-nav-list');
      if(menuNavList && veeva.navigationMenu) {
         menuNavList.innerHTML = '';
         veeva.navigationMenu.forEach(item => {
            const li = document.createElement('li');
            li.className = `menu-nav-item ${item.active ? 'active' : ''}`;
            const a = document.createElement('a');
            a.textContent = item.name;
            li.addEventListener('click', function (e) {
               e.preventDefault();
               slideUno.jumpToSlide(item.goToSlide);
            });
            li.appendChild(a);
            menuNavList.appendChild(li);
         });
      }

      // Renderizar navegación special
      const specialNavList = document.querySelector('#special-nav .special-nav-list');
      let contenidoSlide = document.querySelector('.contenido img');
      if (!contenidoSlide) {
   console.error('No se pudo encontrar el elemento de imagen');
}
      if(specialNavList && veeva.navigationMenu) {
         specialNavList.innerHTML = '';
         veeva.navigationslide13.forEach(item => {
            const li = document.createElement('li');
            li.className = `special-nav-item ${item.active ? 'active' : ''}`;
            const a = document.createElement('a');
            a.textContent = item.name;
            li.addEventListener('click', function (e) {
               e.preventDefault();
               const allItems = specialNavList.querySelectorAll('.special-nav-item');
               allItems.forEach(el => el.classList.remove('active'));
               li.classList.add('active');
               if (item.goToSlide === "fn_estudio") {
                  global.currentSpecialNav = 1;
                  contenidoSlide.src = "images/contenido.png";
               }
               if (item.goToSlide === "fn_medicamentos") {
                  global.currentSpecialNav = 2;
                  contenidoSlide.src = "images/contenido2.png";
               }
               if (item.goToSlide === "fn_reduccion") {
                  global.currentSpecialNav = 3;
                  contenidoSlide.src = "images/contenido3.png";
               }
               if (item.goToSlide === "fn_seguridad") {
                  global.currentSpecialNav = 4;
                  contenidoSlide.src = "images/contenido4.png";
               }
            });
            li.appendChild(a);
            specialNavList.appendChild(li);
         });
         this.initCarusel();
      }

   },

   togleMenu: function () {
      const menu = document.querySelector('#menu-nav');
      const menu_btn = document.querySelector('.footer-nav-item:nth-child(1)');
      if (menu) {
         menu.classList.toggle('hidden');
         menu_btn.classList.toggle('active');
      }
   },

   togleReferences: function () {
      const pop = document.querySelector('#pop-ref');
      const popConten = document.querySelector('#pop-ref .pop-content img')
      const pop_close_btn = document.querySelector('.footer-nav-item:nth-child(5)');
      if (global.currentSpecialNav === 1) {
         popConten.src = "images/referencias1.png";
      } else if (global.currentSpecialNav === 2) {
         popConten.src = "images/referencias2.png";
      } else if (global.currentSpecialNav === 3) {
         popConten.src = "images/referencias3.png";
      } else if (global.currentSpecialNav === 4) {
         popConten.src = "images/referencias4.png";
      }
      if (pop) {
         pop.classList.toggle('hidden');
         pop.classList.toggle('grid');
         pop_close_btn.classList.toggle('active');
      }
   },

   initCarusel: function() {
      this.slides = [];
      let totalSlides = 0;
      if (veeva.slide === "13") {
         console.log('si señor', global.currentSpecialNav);
         if (global.currentSpecialNav === 1) {
            totalSlides = veeva.navigationslide13[0].carusel || 0;
            this.slides.push('images/pop1.png');
         }
         else if(global.currentSpecialNav === 2) {
            this.slides.push('images/contenido2.png');
         }
         else if(global.currentSpecialNav === 3) {
            this.slides.push('images/contenido3.png');
         }
         else if(global.currentSpecialNav === 4) {
            this.slides.push('images/contenido4.png');
         }
      }
      else {
         totalSlides = veeva.carusel || 0;
         for(let i = 1; i <= totalSlides; i++) {
            this.slides.push(`images/pop${i}.png`);
         }
      }
      console.log(this.slides);
      console.log(`Carrusel inicializado con ${this.slides.length} imágenes`);
      this.updateButtonVisibility();
   },

   togleCarrusel: function () {
      const pop = document.querySelector('#pop-carusel');
      if (pop) {
         pop.classList.toggle('hidden');
         pop.classList.toggle('grid');
      }
   },
   prevSlide: function() {
      this.currentSlideIndex--;
      if (this.currentSlideIndex < 0) {
         this.currentSlideIndex = this.slides.length - 1;
      }
      this.updateCarusel();
   },

   nextSlide: function () {
      this.currentSlideIndex++;
      if (this.currentSlideIndex >= this.slides.length) {
         this.currentSlideIndex = 0;
      }
      this.updateCarusel();
   },

   updateCarusel: function() {
      const imgElement = document.querySelector('.pop-carusel .pop-content img');
      if (imgElement && this.slides.length > 0) {
         console.log(this.slides[this.currentSlideIndex]);
         imgElement.src = this.slides[this.currentSlideIndex];
      }
      this.updateButtonVisibility();
   },

   updateButtonVisibility: function() {
      const prevButton = document.querySelector('.pop-carusel .prev-btn');
      const nextButton = document.querySelector('.pop-carusel .next-btn');
      if (prevButton) {
         // Hide prev button if we're at the first slide
         if (this.currentSlideIndex === 0) {
            prevButton.classList.add('hidden');
         } else {
            prevButton.classList.remove('hidden');
         }
      }
      if (nextButton) {
         // Hide next button if we're at the last slide
         if (this.currentSlideIndex === this.slides.length - 1) {
            nextButton.classList.add('hidden');
         } else {
            nextButton.classList.remove('hidden');
         }
      }
   }



}