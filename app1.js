const Joi = require('@hapi/joi');
const express = require('express');
const app = express();

app.use(express.json());

const ogrenciler = [
    { id: 1, isim: "Ahmet" },
    { id: 2, isim: "Ali" },
    { id: 3, isim: "Veli" },
    { id: 4, isim: "Ayşe" },
    { id: 5, isim: "Fatma" }
]

app.get("/api/ogrenciler", function(req, res) {
    res.send(ogrenciler);
});

app.get("/api/ogrenciler/:id", function(req, res) {
    const ogrenci = ogrenciler.find(ogrenci => ogrenci.id === parseInt(req.params.id));
    if (!ogrenci) res.status(404).send("Girdiğiniz ID'ye sahip öğrenci bulunamadı.");
    else {
        res.send(ogrenci);
    }
});

app.post("/api/ogrenciler", function(req, res) {
    const schema = Joi.object({
        isim_kontrol: Joi.string().min(3).required()
    })

    const result = schema.validate({ isim_kontrol: req.body.isim });
    console.log(result);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const ogrenci = {
        id: ogrenciler.length + 1,
        isim: req.body.isim
    };
    ogrenciler.push(ogrenci);
    res.send(ogrenci);
});

app.put("/api/ogrenciler/:id", function(req, res) {
    //böyle id ye sahip öğrenci var mı ? id kontrolü
    const ogrenci = ogrenciler.find(ogrenci => ogrenci.id === parseInt(req.params.id));
    if (!ogrenci) res.status(404).send("Girdiğiniz ID'ye sahip öğrenci bulunamadı.");

    //validation , veri kontrolü
    const schema = Joi.object({
        isim_kontrol: Joi.string().min(3).required()
    })

    const result = schema.validate({ isim_kontrol: req.body.isim });
    console.log(result);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    //update işlemi
    ogrenci.isim = req.body.isim;
    res.send(ogrenci);
});

app.delete("/api/ogrenciler/:id", function(req, res) {
    //böyle id ye sahip öğrenci var mı ? id kontrolü
    const ogrenci = ogrenciler.find(ogrenci => ogrenci.id === parseInt(req.params.id));
    if (!ogrenci) res.status(404).send("Girdiğiniz ID'ye sahip öğrenci bulunamadı.");

    //delete işlemi
    const index = ogrenciler.indexOf(ogrenci);
    ogrenciler.splice(index, 1);
    res.send(ogrenci);
})







const port = process.env.PORT || 8080;
app.listen(port);
console.log(`Sunucu ${port} portunda çalışıyor.`);