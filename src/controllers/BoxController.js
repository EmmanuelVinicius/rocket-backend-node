const Box = require('../models/Box');

class BoxController {
    async store(require, response) {
        try {
            const box = await Box.create(require.body);

            return response.json(box);
        } catch (error) {
            console.error('Erro', error);

        }
    }
    async show(require, response) {
        try {
            const box = await Box.findById(require.params.id).populate({
                path: 'files',
                options: { sort: { createdAt: -1 } }
            });

            return response.json(box);
        } catch (error) {
            console.error('Erro', error);

        }
    }
}

module.exports = new BoxController();