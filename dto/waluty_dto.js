class Waluty_dto{
    id;
    symbol;
    nazwa;
    kraj;

    constructor(dane) {
        this.id = dane.id;
        this.symbol = dane.symbol;
        this.nazwa = dane.nazwa;
        this.kraj = dane.kraj;
    }
}