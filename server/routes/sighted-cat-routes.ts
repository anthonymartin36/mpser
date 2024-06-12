import { Router } from 'express'
import * as db from '../db/db-cats'
import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, 'server/images/sighted_cats')
  },
  filename: function (req, file, cb) {
    return cb(null, `${file.originalname}`)
  },
})
const upload = multer({
  storage: storage,
  limits: {
    files: 1,
  },
})
const router = Router()

// Post localhost:5173/api/v1/sightedcats/:catIdMc/add
router.post('/:catIdMc/add', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' })
      return
    }
    const { catIdMc } = req.params
    const newCat = await db.addSightedCatDb({
      ...req.body,
      catIdMc: Number(catIdMc),
      sightedImageUrl: 'server/images/sighted_cats/' + req.file.filename,
    })
    res.status(201).json(newCat)
  } catch (err) {
    console.error('Error in POST /api/v1/sightedcats/:catIdMc/add', err)
    res.status(500).json('Internal Server Error')
  }
})

// Get localhost:5173/api/v1/sightedcats/singlecat/sighting/:catIdMc
router.get('/singlecat/sighting/:catIdMc', async (req, res) => {
  try {
    const catIdMc = Number(req.params.catIdMc)
    const sightedCat = await db.singleCatSightingsDb(catIdMc)
    // console.log("Sighted Cat Date Route : " + typeof(sightedCat[0].dateSeen))
    // console.log("Sighted Cat Lat Route : " + typeof(sightedCat[0].lat))
    if (!sightedCat) {
      res.status(404).json({ error: 'id could not be found' })
      return
    }
    res.json(sightedCat)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
