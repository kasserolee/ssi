class UzytkownikDto {
    id;
    login;
    stan_konta;
    imie;
    nazwisko;
    email;

    constructor(dane) {
        this.id = dane.id;
        this.login = dane.login;
        this.login = dane.stan_konta;
        this.imie = dane.imie;
        this.nazwisko = dane.nazwisko;
        this.email = dane.email;
    }
}

module.exports = UzytkownikDto;
