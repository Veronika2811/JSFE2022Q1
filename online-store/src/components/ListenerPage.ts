/* eslint-disable @typescript-eslint/no-non-null-assertion */
import FilterSort from './filterSorting';
import { sortingSelect } from './sortingCards';
import * as noUiSlider from 'nouislider';
import { searchCard } from './search';


export class Listener {
  listenerRange() {
    const rangeSliderPrice = document.getElementById('range-slider') as noUiSlider.target;
    const rangeSliderYear = document.getElementById('range-slider-2') as noUiSlider.target;

    // Price
    const minPrice = document.getElementById('input-1') as HTMLInputElement;
    const maxPrice = document.getElementById('input-2') as HTMLInputElement;
    const inputsPrice = [minPrice, maxPrice];
    
    let currentRangePrice: string[] = [];
    let currentRangeYear: string[] = [];

    rangeSliderPrice.noUiSlider?.on('update', (values, handle) =>  {
      currentRangePrice = [];
      for (let i = 0; i < values.length; i++) {
        currentRangePrice.push(String(Math.round(Number(values[i]))));
      }

      inputsPrice[handle].value = currentRangePrice[handle] as string;
      localStorage.setItem('price', JSON.stringify(currentRangePrice));
      new FilterSort().sorting(currentRangePrice, currentRangeYear);
    });

    // Year
    const minYear = document.getElementById('input-3') as HTMLInputElement;
    const maxYear = document.getElementById('input-4') as HTMLInputElement;
    const inputsYear = [minYear, maxYear];

    rangeSliderYear.noUiSlider?.on('update', (values, handle) =>  {
      currentRangeYear = [];
      for (let i = 0; i < values.length; i++) {
        currentRangeYear.push(String(Math.round(Number(values[i]))));
      }

      inputsYear[handle].value = currentRangeYear[handle] as string;
      localStorage.setItem('year', JSON.stringify(currentRangeYear));
      new FilterSort().sorting(currentRangePrice, currentRangeYear);
    });

    const filterChek = document.querySelector('.filter') as HTMLDivElement;
    const currentCheckbox = filterChek.querySelectorAll('input');
    
    currentCheckbox.forEach((el) => {
      el.oninput = () => {
        new FilterSort().sorting(currentRangePrice, currentRangeYear);
        localStorage.setItem(el.id, JSON.stringify(el.checked));
      };
      el.checked = localStorage.getItem(el.id) === 'true';
    });
  }

  listenerSort() {
    const select = document.querySelector('select') as HTMLSelectElement;

    let value = 'value1';
    if (localStorage.getItem('option') !== null) {
      value = localStorage.getItem('option')!;
    }

    select.onchange = function () {

      const indexSelected = select.selectedIndex;
      const option = select.querySelectorAll('option')[indexSelected];
      value = option.getAttribute('value')!;
      sortingSelect(value!);
    };

    document.querySelector('.sort-params > option[selected]')?.removeAttribute('selected');
    document.querySelector(`.sort-params > option[value=${value}]`)?.setAttribute('selected', 'selected');
    sortingSelect(value);
  }

  listenerSearch() {
    const inputSearch = document.querySelector('.search') as HTMLInputElement;
    const elastic = document.querySelector('.search') as HTMLInputElement;

    let value = '';
    if (localStorage.getItem('search') != null) {
      value = JSON.parse(localStorage.getItem('search')!);
    }

    elastic?.addEventListener('input', (ev) => {
      inputSearch.addEventListener('search', () => {
        (document.querySelector('.warning') as HTMLHeadElement).style.display = 'none';
      });
      value = (ev.target! as HTMLInputElement).value.trim();
      localStorage.setItem('search', JSON.stringify(value));
      searchCard(value);
    });

    // inputSearch.oninput = function () {
    //   value = inputSearch.value.replace(/\s/g, '');
    //   localStorage.setItem('search', JSON.stringify(value));
    //   searchCard(value);
    // };

    inputSearch.value = value;
    searchCard(value);
  }

  listenerButton() {
    // Clear Local Storage
    const btnClearStorage = document.querySelector('.btn_reset') as HTMLButtonElement;

    btnClearStorage.addEventListener('click', () => {
      localStorage.clear();
    });

    // Clear filter
    const btnClearFilter = document.querySelector('.btn_view') as HTMLButtonElement;
    btnClearFilter.addEventListener('click', () => {
      const filterChek = document.querySelector('.filter') as HTMLDivElement;
      const currentCheckbox = filterChek.querySelectorAll('input');
      
      currentCheckbox.forEach((el) => {
        if (el.checked) {
          el.checked = localStorage.getItem(el.id) === 'false';
          localStorage.setItem(el.id, JSON.stringify(el.checked));
        }
      });

      const rangeSliderPrice = document.getElementById('range-slider') as noUiSlider.target;
      const rangeSliderYear = document.getElementById('range-slider-2') as noUiSlider.target;
      rangeSliderPrice.noUiSlider!.set(['20', '200']);
      rangeSliderYear.noUiSlider!.set(['2010', '2022']);


      const inputSearch = document.querySelector('.search') as HTMLInputElement;
      const value = inputSearch.value = '';
      localStorage.setItem('search', JSON.stringify(value));
      searchCard(value);
    });
  }

  listenerCart() {
    const cart = document.querySelectorAll('.block-cart');
    const itemcart = document.querySelector('.items-the-cart') as HTMLSpanElement;

    if (localStorage.getItem('cart') !== null) {
      itemcart.innerHTML = JSON.parse(localStorage.getItem('cart')!);
    }

    let activeCardName: string[] = [];

    if (localStorage.getItem('activeCard') !== null) {
      activeCardName = JSON.parse(localStorage.getItem('activeCard')!);
      // const cart = document.querySelectorAll('.block-cart');
      cart.forEach((el) => {
        if (activeCardName.includes(el.parentElement?.dataset.name as string)) {
          el.classList.add('active-card');
        }
      });
    }

    cart.forEach((el) => {
  
      el.addEventListener('click', () => {
        const nameCard = el.parentElement?.dataset.name as string;
    
        if (el.classList.contains('active-card')) {
          el.classList.remove('active-card');
    
          if (activeCardName.length > 0) {
            activeCardName = activeCardName.filter(function (f) { 
              return f !== nameCard;
            });
          } 
          itemcart.innerHTML = String(activeCardName.length);
          localStorage.setItem('cart', JSON.stringify(itemcart.innerHTML));
          localStorage.setItem('activeCard', JSON.stringify(activeCardName));
        } else {
          el.classList.add('active-card');
          activeCardName.push(nameCard);
          itemcart.innerHTML = String(activeCardName.length);
          localStorage.setItem('cart', JSON.stringify(itemcart.innerHTML));
          localStorage.setItem('activeCard', JSON.stringify(activeCardName));
        }
      });
    });
  }

  listenerAll() {
    this.listenerRange();
    this.listenerSort();
    this.listenerButton();
    this.listenerSearch();
    this.listenerCart();
  }
}
