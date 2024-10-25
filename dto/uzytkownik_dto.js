class Uzytkownik_dto{
    id;
    login;
    imie;
    nazwisko;
    email;

    constructor(dane) {
        this.id = dane.id;
        this.login = dane.login;
        this.imie = dane.imie;
        this.nazwisko = dane.nazwisko;
        this.email = dane.email;
    }
}
