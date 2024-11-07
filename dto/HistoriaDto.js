class HistoriaDto {
    id;
    id_waluty;
    data;
    kurs;

    constructor(dane) {
        this.id = dane.id;
        this.id_waluty = dane.id_waluty;
        this.data = dane.data;
        this.kurs = dane.kurs;
    }
}

module.exports = HistoriaDto;