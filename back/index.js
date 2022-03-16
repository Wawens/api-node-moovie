const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const fs = require('firebase-admin')
const serviceAccount = require('./api-created-film-firebase-firebase-adminsdk-vcir6-810d8b9d97.json')
app.use(express.json());
app.use(cors());
const port = 3000

/* ************************* CONFIGURATION **************************** */
fs.initializeApp({
    credential: fs.credential.cert(serviceAccount)
})
const db = fs.firestore();
//On créer une collection qui fait office de table et qui va apparaitre dans la base de donnée
const filmUse = db.collection("moovie-collection")

/*************************** MIDDLWARE *************************************/

app
    .use(bodyParser.json())
    .use(morgan('dev'))

/* *************************  LIRE UNE RESSOURCE  **************************** */

//Lire l'intégralité des ressources
app.get('/api/film', async(req, res) => {
    //true 
    const readAll = await filmUse.get();
    const list = readAll.docs.map(doc => { return ({...doc.data(), id: doc.id }) });

    // Vérification
    if (list.length === 0) {
        let message = `Aucune donnée n'a été trouvée veuillez recommencer ! ou Vérifié que vous êtes sur la bonne BDD ou que des informations y s'y trouvent`
        res.status(404)
        res.json({ message, data: list }) // true

    } else {
        let message = `Une liste de ${list.length} films a été trouvée dans la base de donnée`
        res.status(200)
        res.json({ message, data: list }) // true
    }
})

//Lire une ressource bien précise grâce à l'id
app.get('/api/film/:id', async(req, res) => {
    // true 
    try {
        const readAll = await filmUse.doc(req.params.id).get()
        let dataRead = readAll.data()
        let message = `Le film ${dataRead.name} a été trouvée dans la base de donnée`
        res.status(200)
        res.json({ message, data: dataRead }) // true
    } catch (error) {
        let message = `Une erreur s'est produite dans votre recherche spécifique. 
    Vérifier que le id ou le chemon correspondes et recommencé.:--> Vous pouvez aussi utilsez la methode get afin
    de voir si Ce que vous rechercher est bien dans la base de donnée`
        res.status(400) // Ce code est pour les mauvaise quetes etc 
        res.json({ message, data: dataRead }) // true
    }
})

/************************** AJOUTER UNE RESSOURCE **************************** */
app.post('/api/film', async(req, res) => {
        // true
        const dataGlobal = req.body
        await filmUse.add(dataGlobal)
        let message = `Le film ${dataGlobal.name} a été ajoutée dans la base de donnée comportant l'id :${dataGlobal.id}`
        res.status(201) //Code pour confirmer la création de la requêtes 
        res.json({ message, data: dataGlobal }) // true 

    })
    /**************************  METTRE à JOUR UNE RESSOURCE   ********************* */
app.put('/api/film/:id', async(req, res) => {
    //  True
    try {
        const dataGlobal = req.body
        const readA = await filmUse.doc(req.params.id).update({...dataGlobal });
        let message = `Votre demande de modification a bien été pris en compte !`
        res.status(200) // ok
        res.json({ message, data: dataGlobal }) //True 
    } catch (error) {
        let message = `Une erreur s'est produite,votre demande de modification n'a pas été pris en compte. 
    Vérifié bien que le document existe bien dans la base de donnée`
        res.status(400)
        res.json({ message }) // TRUE 
    }
})

/**************************  SUPPRIMER UNE RESSOURCE **************************** */
app.delete('/api/film/:id', async(req, res) => {
    try {
        const dataGlobal = req.body
        const readA = await filmUse.doc(req.params.id).delete({...dataGlobal });
        let message = `Votre demande de suppression du film ${dataGlobal.name} a bien été pris en compte`
        res.status(202) // Accepter
        res.json({ message }) // True 
    } catch (error) {

    }

})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})