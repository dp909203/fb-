const fs = require('fs').promises;
const path = require('path');

const register_uploadImage = async (req, res, next) => {
    try {

        if (!req.files.length) {
            return RESPONSE.success(res, 1018)
        }



        for (const file of req.files) {

            const registerfile = Date.now() + '-' + file.fieldname + path.extname(file.originalname);
            const targetPath_1 = path.join(__dirname, '..', 'public', 'register', registerfile);

            req.regispath = registerfile;

            await fs.writeFile(targetPath_1, file.buffer);
        }


        next();
    } catch (error) {
        console.error(error);
        return RESPONSE.error(res, 1011)
    }
};

module.exports = register_uploadImage;
