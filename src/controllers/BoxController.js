const Box = require('../models/Box');

class BoxController {
    async store(require, response) {
        const box = await Box.create(require.body);

        return response.json(box);
    }
    async show(require, response) {
        const box = await Box.findById(require.params.id).populate({
            path: 'files',
            options: { sort: { createdAt: -1 } }
        });

        return response.json(box);
    }
}

module.exports = new BoxController();