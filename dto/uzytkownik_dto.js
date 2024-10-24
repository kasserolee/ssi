class Uzytkownik_dto{
    id;
    login;
    haslo;
    stan_konta;
    imie;
    nazwisko;
    email;

    constructor(dane) {
        this.id = dane.id;
        this.login = dane.login;
        this.haslo = dane.haslo;
        this.stan_konta = dane.stan_konta;
        this.imie = dane.imie;
        this.nazwisko = dane.nazwisko;
        this.email = dane.email;
    }
}