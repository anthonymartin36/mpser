import { Router } from 'express'
import * as db from '../db/db-cats'

import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, 'server/images/missing_cats')
  },
  filename: function (req, file, cb) {
    return cb(null, `${file.originalname}`)
  },
})
const upload = multer({
  storage: storage,
  limits: {
    files: 5,
  },
})

const router = Router()

//GET localhost:5173/api/v1/missingcats/
router.get('/', async (req, res) => {
  try {
    const cats = await db.getAllMissingCatsDb()
    res.json(cats)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

//GET localhost:3000/api/v1/missingcats/singlecat/:id
router.get('/singlecat/:catId', async (req, res) => {
  try {
    const catId = Number(req.params.catId)
    const missingCats = await db.getOneMissingCatDb(catId)
    res.json(missingCats)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// DELETE localhost:5173/api/v1/missingcats/:id
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  if (isNaN(id)) {
    res.status(400).send('Bad Request: ID must be a number')
    return
  }

  try {
    await db.deleteMissingCatDb(id)
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    res.status(500).send('Could not delete cat')
  }
})

// POST localhost:5173/api/v1/missingcats/addcat
router.post('/addcat', upload.array('file', 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      res.status(400).json({ error: 'No files uploaded' })
      return
    }

    const missingImageUrls = (req.files ) //as Express.Multer.File[]
      .map((file:any) => 'server/images/missing_cats/' + file.filename)
      .join(',')

    const newCat = await db.addMissingCatDb({
      ...req.body,
      missingImageUrl: missingImageUrls,
    })
    res.status(201).json(newCat)
  } catch (err) {
    console.error('Error in POST /api/v1/addCat', err)
    res.status(500).json('Internal Server Error')
  }
})

// GET localhost:5173/api/v1/foundcats
router.get('/foundcats', async (req, res) => {
  try {
    // Perform logic to fetch information about found cats from the database
    // For example, you might have a function like db.getAllFoundCatsDb();
    const foundCats = await db.getAllMissingCatsDb()

    res.json(foundCats)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// PUT localhost:5173/api/v1/missingcats/singlecat/:id
router.put('/singlecat/:catId', async (req, res) => {
  const catId = Number(req.params.catId)
  const { catMissing } = req.body // Assuming you send a field like 'markAsFound' in the request body

  if (isNaN(catId)) {
    res.status(400).send('Bad Request: ID must be a number')
    return
  }

  try {
    if (catMissing !== undefined) {
      await db.FoundCatsDb(catId, catMissing)
      // Perform logic to mark the cat as found (update the database, change status, etc.)
      // For example, you might have a function like db.markCatAsFoundDb(catId);
    } else {
      // Perform logic to update general information about the cat
      // For example, you might have a function like db.updateCatInfoDb(catId, req.body);
    }

    // Send a success status back to the client
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

export default router
