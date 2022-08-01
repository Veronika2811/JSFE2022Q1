import './controlButtons.scss';
import createBtn from '../../helpers/createBtn';
import createDomNode from '../../helpers/createDomNode';
import createInput from '../../helpers/createInput';
import { Loader } from '../../controller/loader';
import { CarsItem } from '../carsItem/CarsItem';
import { cars } from '../containerGarage/ContainerGarage';
import { pageNum } from '../pagination/pagination';
import loadPagination from '../../helpers/paginationLoad';
import createRandomCar from '../../helpers/generateRandomCars';
import { getCarsOnThePage, startDriving, stopDriving } from '../../helpers/controlCars';

export const carNameUpdate = createInput(['car-name-update'], [{ 'type': 'text' }, { 'placeholder': 'Update name car' }, { 'disabled': 'true' }]);
export const carColorUpdate = createInput(['car-color'], [{ 'type': 'color' }, { 'value': '#ffffff' }, { 'disabled': 'true' }]);
export const btnUpdateCar = createBtn(['btn', 'btn-update'], 'update');
btnUpdateCar.disabled = true;

export class ControlBtn {
  sectionGarage;

  controlButtons;

  createCarForm;

  updateCarForm;

  controlRaceButtons;

  carNameInput;

  carColorInput;

  btnCreateCar;

  carNameUpdate = carNameUpdate;

  carColorUpdate = carColorUpdate;

  btnUpdateCar = btnUpdateCar;

  btnRace;

  btnReset;

  btnGenerateCar;

  loader = new Loader();

  cars = cars;
  
  pageNum = pageNum;

  constructor(sectionGarage: HTMLElement) {
    this.sectionGarage = sectionGarage;

    this.controlButtons = createDomNode('div', ['control-btn'], this.sectionGarage);
    this.createCarForm = createDomNode('div', ['create-car'],  this.controlButtons);
    this.updateCarForm = createDomNode('div', ['update-car'],  this.controlButtons);
    this.controlRaceButtons = createDomNode('div', ['control-race-buttons'],  this.controlButtons);

    this.carNameInput = createInput(['car-name-create'], [{ 'type': 'text' }, { 'placeholder': 'Enter name car' }], this.createCarForm);
    this.carColorInput = createInput(['car-color'], [{ 'type': 'color' }, { 'value': '#ffffff' }], this.createCarForm);
    this.btnCreateCar = createBtn(['btn', 'btn-create'], 'create', this.createCarForm);
    this.btnCreateCar.addEventListener('click', () => this.creatNewCar());

    this.updateCarForm.append(this.carNameUpdate, this.carColorUpdate, this.btnUpdateCar);

    this.btnRace = createBtn(['btn', 'green', 'btn-race'], 'race', this.controlRaceButtons);
    this.btnRace.addEventListener('click', () => this.startRace());

    this.btnReset = createBtn(['btn', 'btn-reset'], 'reset', this.controlRaceButtons, [{ 'disabled': 'true' }]);
    this.btnReset.addEventListener('click', () => this.resetRace());
    
    this.btnGenerateCar = createBtn(['btn', 'btn-generate'], 'generate cars', this.controlRaceButtons);
    this.btnGenerateCar.addEventListener('click', () => this.generateCars());
  }

  async creatNewCar() {
    if (this.carNameInput.value === '') {
      alert('Enter the make of the car, please!');
    } else {
      await this.loader.createCar({ name: this.carNameInput.value, color: this.carColorInput.value });

      this.carNameInput.value = '';
      this.carColorInput.value = '#ffffff';

      new CarsItem(this.cars, pageNum).createCars();

      loadPagination(pageNum);
    }
  }

  async generateCars() {
    for (let i = 1; i <= 100; i++) {
      await this.loader.createCar(createRandomCar());
    }
    new CarsItem(this.cars, pageNum).createCars();

    loadPagination(pageNum);
  }

  startRace() {
    this.btnReset.disabled = false;
    this.btnRace.disabled = true;
    getCarsOnThePage().forEach((el) => startDriving(el));
  }

  resetRace() {
    this.btnRace.disabled = false;
    this.btnReset.disabled = true;
    getCarsOnThePage().forEach((el) => stopDriving(el));
  }
}

