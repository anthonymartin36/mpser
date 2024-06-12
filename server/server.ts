//server.ts
import express from 'express'
import * as Path from 'node:path'

import missingCatRoutes from './routes/missing-cat-routes'
import sightedCatRoutes from './routes/sighted-cat-routes'
import * as dotenv from 'dotenv'

const server = express()

dotenv.config()

server.use(express.json())
server.use('/api/v1/missingcats', missingCatRoutes)
server.use('/api/v1/sightedcats', sightedCatRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/uploads', express.static('server/uploads'))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

// New route to fetch Google Maps API key
server.get('/api/getGoogleMapsKey', (req, res) => {
  const googleMapsAPIKey = process.env.GOOGLE_MAPS_API_KEY

  if (googleMapsAPIKey) {
    res.json({ apiKey: googleMapsAPIKey })
  } else {
    res.status(500).json({ error: 'Google Maps API key not found.' })
  }
})

export default server
