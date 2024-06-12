import connection from './connection'
import {
  MissingCat,
  SightedCat,
  NewMissingCat,
  NewSightedCat,
} from '../../models/cats'

export async function getAllMissingCatsDb(
  db = connection,
): Promise<MissingCat[]> {
  return await db('missing_cats').select(
    'cat_id as catId',
    'microchip',
    'microchip_number as microChipNumber',
    'user_id_mc as userIdMc',
    'cat_name as catName',
    'breed',
    'color',
    'description',
    'date_lost as dateLost',
    'location',
    'missing_cat_phone as missingCatPhone',
    'missing_cat_email as missingCatEmail',
    'missing_image_url as missingImageUrl',
    'cat_missing as catMissing',
  )
}

export async function getOneMissingCatDb(
  id: number,
  db = connection,
): Promise<MissingCat[]> {
  return await db('missing_cats')
    .select(
      'cat_id as catId',
      'microchip',
      'microchip_number as microChipNumber',
      'user_id_mc as userIdMc',
      'cat_name as catName',
      'breed',
      'color',
      'description',
      'date_lost as dateLost',
      'location',
      'missing_cat_phone as missingCatPhone',
      'missing_cat_email as missingCatEmail',
      'missing_image_url as missingImageUrl',
      'cat_missing as catMissing',
    )
    .where('cat_id', id)
    .first()
}

export async function deleteMissingCatDb(
  id: number,
  db = connection,
): Promise<void> {
  try {
    const result = await db('missing_cats').where({ cat_id: id }).delete()
    console.log(result)
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function addMissingCatDb(
  newCat: NewMissingCat,
): Promise<MissingCat[]> {
  try {
    const microchip = (newCat.microchip === 'yes') ? true : false
    const [{ cat_id: newCatId }] = await connection('missing_cats').insert({
      microchip: microchip,
      microchip_number: newCat.microChipNumber,
      user_id_mc: newCat.userIdMc,
      cat_name: newCat.catName,
      breed: newCat.breed,
      color: newCat.color,
      description: newCat.description,
      date_lost: newCat.dateLost,
      location: newCat.location,
      missing_cat_phone: newCat.missingCatPhone,
      missing_cat_email: newCat.missingCatEmail,
      missing_image_url: newCat.missingImageUrl,
      cat_missing: newCat.catMissing,
    }).returning('cat_id')
    //console.log("newCatId : ", newCatId)
    const newAddedCat = await getOneMissingCatDb(newCatId)
    return newAddedCat
  } catch (error) {
    console.error('Error in addCat:', error)
    throw error
  }
}

//SIGHTED CATS FROM HERE

export async function getAllSightedCatsDb(
  db = connection,
): Promise<SightedCat[]> {
  return await db('sighted_cats').select(
    'sighted_cat_id as sightedCatId',
    'user_id_sc as userIdSc',
    'cat_id_mc as catIdMc',
    'color',
    'description',
    'date_seen as dateSeen',
    'location',
    'lng',
    'lat',
    'string_location as stringLoaction',
    'sighted_cat_phone as sightedCatPhone',
    'sighted_cat_email as sightedCatEmail',
    'sighted_image_url as sightedImageUrl',
  )
}

export async function getOneSightedCatDb(
  id: number,
  db = connection,
): Promise<SightedCat[]> {
  return await db('sighted_cats')
    .select(
      'sighted_cat_id as sightedCatId',
      'user_id_sc as userIdSc',
      'cat_id_mc as catIdMc',
      'color',
      'description',
      'date_seen as dateSeen',
      'location',
      'lng',
      'lat',
      'string_location as stringLoaction',
      'sighted_cat_phone as sightedCatPhone',
      'sighted_cat_email as sightedCatEmail',
      'sighted_image_url as sightedImageUrl',
    )
    .where('sighted_cat_id', id)
    .first()
}

export async function addSightedCatDb(
  newCat: NewSightedCat
): Promise<SightedCat[]> {
  try {
    const [{sighted_cat_id: newCatId}] = await connection('sighted_cats').insert({
      user_id_sc: newCat.userIdSc,
      cat_id_mc: newCat.catIdMc,
      color: newCat.color,
      description: newCat.description,
      date_seen: newCat.dateSeen,
      location: newCat.location,
      lng: newCat.lng,
      lat: newCat.lat,
      string_location: newCat.stringLocation,
      sighted_cat_phone: newCat.sightedCatPhone,
      sighted_cat_email: newCat.sightedCatEmail,
      sighted_image_url: newCat.sightedImageUrl,
    }).returning('sighted_cat_id')

    const newAddedCat = await getOneSightedCatDb(newCatId)
    return newAddedCat
  } catch (error) {
    console.error('Error in addCat:', error)
    throw error
  }
}

export async function singleCatSightingsDb(
  cat_id_mc: number,
  db = connection,
): Promise<SightedCat[]> {
  try {
    const sightedCats = await db('sighted_cats')
      .select('sighted_cat_id as sightedCatId',
      'user_id_sc as userIdSc',
      'cat_id_mc as catIdMc',
      'color',
      'description',
      'date_seen as dateSeen',
      'location',
      'lng',
      'lat',
      'string_location as stringLocation',
      'sighted_cat_phone as sightedCatPhone',
      'sighted_cat_email as sightedCatEmail',
      'sighted_image_url as sightedImageUrl',)
      .where('cat_id_mc', cat_id_mc)

    return sightedCats || []
  } catch (error) {
    console.error('Error. No sightings for this cat:', error)
    throw error
  }
}

export async function FoundCatsDb(
  catId: number,
  catMissing: false,
  db = connection,
): Promise<void> {
  try {
    await db('missing_cats')
      .where({ cat_id: catId })
      .update({ cat_missing: catMissing })
  } catch (error) {
    console.error('Error. No cat is found:', error)
    throw error
  }
}

export function close(db = connection) {
  db.destroy
}
