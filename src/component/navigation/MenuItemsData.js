/**
 * Przechowywane są tu elementy menu
 * @type {*[]} - Tablica zawierająca informacje o elementach menu
 */
const MenuItemsData = [
  {
    id: 0,
    text: "Profil",
    page: "",
    button: false,
    loggedIn: true
  },
  {
    id: 1,
    text: "Gry",
    page: "games",
    button: false,
    loggedIn: true
  },
  {
    id: 2,
    text: "Wydarzenia",
    page: "events",
    button: false,
    loggedIn: true
  },
  {
    id: 3,
    text: "Dodaj grę",
    button: true,
    buttonName: 'addGame',
    loggedIn: true
  },
  {
    id: 4,
    text: "Wyloguj się",
    buttonName: "signOut",
    button: true,
    loggedIn: true
  },
  {
    id: 5,
    text: "Zaloguj się",
    page: "",
    button: false,
    loggedIn: false
  },
];

export default MenuItemsData;
