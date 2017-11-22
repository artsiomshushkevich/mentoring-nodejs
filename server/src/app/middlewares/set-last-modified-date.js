export default async (req, res) => {
    const updatedModel= req.updatedModel;
    const documentId = req.documentId;
    const currentDate = new Date();

    try {
        const result = await updatedModel.findByIdAndUpdate(documentId, {
            lastModifiedDate: currentDate
        }, {
            new: true
        });
        res.json({message: 'document successfully created/updated'});
    } catch(err) {
        res.status(500).json(err);
    }
};