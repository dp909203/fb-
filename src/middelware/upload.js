const fs = require('fs').promises;
const path = require('path');

const uploadImage = async (req, res, next) => {
    try {

        if (!req.files.length) {
            return RESPONSE.success(res, 1018)
        }

        for (const file of req.files) {

            const uniqueFileName = Date.now() + '-' + file.fieldname + path.extname(file.originalname);
            const targetPath = path.join(__dirname, '..', 'public', 'post', uniqueFileName);

            req.photoPath = uniqueFileName;

            await fs.writeFile(targetPath, file.buffer);
        }


        next();
    } catch (error) {
        console.error(error);
        return RESPONSE.error(res, 1011)
    }
};



module.exports = uploadImage;






