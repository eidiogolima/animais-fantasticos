import outsideClick from './outsideclick.js';

export default class DropdownMenu {
  constructor(dropdownMenus, events) {
    this.dropdownMenus = document.querySelectorAll(dropdownMenus);

    // Define touchstart e clique argumento padão de events caso o usuario não defina.
    if (events === undefined) this.events = ['touchstart', 'click'];
    else this.events = events;

    this.activeClass = 'active';
    this.activeDropDownMenu = this.activeDropDownMenu.bind(this);
  }

  // Ativa o dropDownMenu e adiciona a função que observa o clique fora dele
  activeDropDownMenu(event) {
    event.preventDefault();
    const element = event.currentTarget;
    element.classList.add(this.activeClass);
    outsideClick(element, [], this.events, () => {
      element.classList.remove(this.activeClass);
    });
  }

  // Adiciona os eventos ao dropDownMenu
  addDropDownMenusEvent() {
    this.dropdownMenus.forEach((menu) => {
      this.events.forEach((userEvent) => {
        menu.addEventListener(userEvent, this.activeDropDownMenu);
      });
    });
  }

  init() {
    if (this.dropdownMenus.length) {
      this.addDropDownMenusEvent();
    }
    return this;
  }
}
