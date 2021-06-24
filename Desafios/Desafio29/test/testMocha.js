const request = require('supertest');

describe('/productos GET', () => {
    it('Deberia retornar status 200', async () => {
        let response = await request.get('/productos');
        expect(response.status).to.eql(200);
    })

    it('Deberia retornar un objeto', async () => {
        let response = await request.get('/productos');
        expect(typeof(response.body)).to.eql('object');
    })
})

describe('/productos POST', () => {
    it('Deberia retornar status 200', async () => {
        let response = await request.post('/productos');
        expect(response.status).to.eql(200);
    })

    it('Deberia retornar un objeto', async () => {
        let response = await request.post('/productos');
        expect(typeof(response.body)).to.eql('object');
    })
})

describe('/productos/vista GET', () => {
    it('Deberia retornar status 200', async () => {
        let response = await request.get('/productos/vista');
        expect(response.status).to.eql(200);
    })
})

describe('/productos/:id GET', (id) => {
    it('Deberia retornar status 200', async () => {
        let response = await request.get(`/productos/${id}`);
        expect(response.status).to.eql(200);
    })

    it('Deberia retornar un objeto', async () => {
        let response = await request.get(`/productos/${id}`);
        expect(typeof(response.body)).to.eql('object');
    })
})

describe('/productos/:id PUT', (id) => {
    it('Deberia retornar status 200', async () => {
        let response = await request.put(`/productos/${id}`);
        expect(response.status).to.eql(200);
    })

    it('Deberia retornar un objeto', async () => {
        let response = await request.put(`/productos/${id}`);
        expect(typeof(response.body)).to.eql('object');
    })
})

describe('/productos/:id DELETE', (id) => {
    it('Deberia retornar status 200', async () => {
        let response = await request.delete(`/productos/${id}`);
        expect(response.status).to.eql(200);
    })

    it('Deberia retornar un objeto', async () => {
        let response = await request.delete(`/productos/${id}`);
        expect(typeof(response.body)).to.eql('object');
    })
})