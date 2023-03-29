const Picture = require("../models/Picture");

const fs = require("fs")

exports.create = async (req, res) => {
    try {
        const { name } = req.body;

        const file = req.file;

        const picture = new Picture({
            name,
            src: file.path,
        })

        await picture.save()

        res.json({ picture, msg: "Imagem salva" })

    } catch (error) {
        res.status(500).json({ message: "Erro ao salvar imagem." })
    }
}

exports.findAll = async (req, res) => {
    try {
        const pictures = await Picture.find()

        res.json(pictures);

    } catch (error) {
        res.status(500).json({message: "Erro ao buscar imagem"})
    }
}

exports.remove = async(req, res) => {
        try {
            const id = req.params.id

            const pictureId = await Picture.findById(id)

            if(!pictureId) {
                return res.status(404).json({message: "Imagem não encontrada"})
            }

            fs.unlinkSync(pictureId.src)

            const deletePicture =  await Picture.findByIdAndDelete(pictureId)

            res.status(200).json({deletePicture, message: "Imagem removida com sucesso"})

            
        } catch (error) {
            res.status(500).json({message: "Erro ao excluir imagem"})
        }
}