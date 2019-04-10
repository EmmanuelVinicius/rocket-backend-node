const Box = require('./../models/Box')
const File = require('./../models/File');

class FileController {
    async store(require, response) {
        const box = await Box.findById(require.params.id);
        const file = await File.create({
            title: require.file.originalname,
            path: require.file.key
        });

        box.files.push(file);
        await box.save();
        require.io.sockets.in(box._id).emit('file', file);
        
        return response.json(file);
    }
}

module.exports = new FileController();