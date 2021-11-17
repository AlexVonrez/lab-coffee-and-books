const router = require("express").Router();

const places = require('../models/place.model')

router.get('/' , (req , res ) => {

  places
    .find()
    .then(allPlaces =>res.render('places/places-list', {allPlaces}))
    .catch(err => console.log(err))
})

router.get('/new-places', (req, res) => res.render('places/create-place'));
router.post('/create',(req,res,next)=> {
     const { name, type,} = req.body

    let location = {
        type: 'Point',
        coordinates: [req.body.latitude, req.body.longitude]
    }

    places.create({name,type})
    .then((place) => {
    console.log(place)
    res.redirect("/places");
})
    .catch(err => console.log(err))

})

router.get("/:id", (req, res) => {
  const placeId = req.params.id;
  places.findById(placeId)
    .then((place) => {
      res.render("/places", { place: place });
    });
});
router.get("/:id/delete", (req, res) =>{
    const { id } = req.params;
    places.findByIdAndRemove(id)
    .then(() =>{res.redirect("/places")
    })
});

router.get('/edit-places/:id', (req, res, next) => {

  const {id} = req.params;
console.log(id)
  places
    .findById(id)
    .then(newPlace => res.render('places/edit-places', newPlace))
    .catch(err => console.log(err))
})

router.post('/edit-places/:id', (req, res, next) => {

  const { id } = req.params
  const { name, type} = req.body

  places
    .findByIdAndUpdate(id, { name, type }, { new: true })
    .then( () => {res.redirect("/places")})
    .catch(err => console.log(err))
});





module.exports = router;