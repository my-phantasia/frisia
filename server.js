const express = require('express');
const app = express();
const PORT = 9000;

app.use(express.json());

let biodatas = [];
let nextId = 1;

app.get('/api/biodata', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Berhasil mengambil seluruh data biodata',
        data: biodatas
    });
});

app.get('/api/biodata/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const biodata = biodatas.find(b => b.id === id);

    if (!biodata) {
        return res.status(404).json({
            status: 'fail',
            message: `Biodata dengan ID ${id} tidak ditemukan`,
            data: null
        });
    }

    res.status(200).json({
        status: 'success',
        message: 'Berhasil mengambil detail biodata',
        data: biodata
    });
});

app.post('/api/biodata', (req, res) => {
    const { nama, umur, alamat, pekerjaan } = req.body;

    if (!nama || !umur || !alamat || !pekerjaan) {
        return res.status(400).json({
            status: 'fail',
            message: 'Semua field (nama, umur, alamat, pekerjaan) wajib diisi',
            data: null
        });
    }

    const newBiodata = {
        id: nextId++,
        nama,
        umur,
        alamat,
        pekerjaan
    };

    biodatas.push(newBiodata);

    res.status(201).json({
        status: 'success',
        message: 'Berhasil menambahkan biodata baru',
        data: newBiodata
    });
});

app.put('/api/biodata/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = biodatas.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({
            status: 'fail',
            message: `Biodata dengan ID ${id} tidak ditemukan`,
            data: null
        });
    }

    const { nama, umur, alamat, pekerjaan } = req.body;

    biodatas[index] = {
        ...biodatas[index],
        nama: nama || biodatas[index].nama,
        umur: umur || biodatas[index].umur,
        alamat: alamat || biodatas[index].alamat,
        pekerjaan: pekerjaan || biodatas[index].pekerjaan
    };

    res.status(200).json({
        status: 'success',
        message: 'Berhasil memperbarui data biodata',
        data: biodatas[index]
    });
});

app.delete('/api/biodata/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = biodatas.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({
            status: 'fail',
            message: `Biodata dengan ID ${id} tidak ditemukan`,
            data: null
        });
    }

    const deletedData = biodatas.splice(index, 1);

    res.status(200).json({
        status: 'success',
        message: 'Berhasil menghapus biodata',
        data: deletedData[0]
    });
});

app.listen(PORT, () => {
    console.log(`Server API berjalan di http://localhost:${PORT}`);
});
