const CategorieModel = require("../domain/schemas/categorieSchema");
const ObjectID = require("mongoose").Types.ObjectId;




module.exports = {

    // Method: Create a categorie in Categorie collection in DB
	// Paramaters: Object Categorie Model
	// Return: Status(200) || error


    createCategorie(req, res) {
        const newCategorie = new CategorieModel({
            name: req.body.name

        })
        console.log(newCategorie);
        newCategorie.save((err, data) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(data);
            }
    });


    },

    // Method: Query all categories from collection 'categories'
	// Paramaters: Object Categorie Model
	// Return: Status(200)
    async getAllCategories(req, res) {
        const cat = await CategorieModel.find();
        if (cat.length == 0 ) {
            console.log('Aucune catégorie à afficher')
            res.status(400).send('Pas de catégorie à afficher')
        } else {
            // res.status(200).json(cat);
            res.status(200).send(cat);
        }
    },


    
    // Method: Update a categorie from collection 'categories'
	// Paramaters: Object Categorie Model
	// Return: Status(200)
    updateCategorie(req, res) {
        if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("ID unknown : " + req.params.id);
        } else {
            CategorieModel.findByIdAndUpdate(
                { _id: req.params.id },
                {
                    $set: {
                        name: req.body.name,
                    },
                },
                { new: true, upsert: true, setDefaultsOnInsert: true },

                (err, data) => {
                    if (err) {
                        console.log('Erreur MaJ Categorie');
                        res.status(400).send(err);
                    } else {
                        console.log('MaJ Categorie OK');
                        res.status(200).send(data);
                    }
                }
            )

    
         }
    },



    // Method: Delete a categorie from collection 'categories'
	// Paramaters: Object Categorie Model
	// Return: Status(200)

    deleteCategorie(req, res) {
            if (!ObjectID.isValid(req.params.id)) {
            res.status(400).send("ID unknow : " + req.params.id);
        } else {
            CategorieModel.deleteOne({ _id: req.params.id }).exec();
            res.status(200).json({ message: "Categorie supprimée"});
        }

    },
    




}