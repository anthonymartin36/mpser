export async function seed(knex) {
  await knex('missing_cats').insert([
    {
      microchip: true,
      microchip_number: '21535884',
      user_id_mc: 1,
      cat_name: 'Creed',
      breed: 'Domestic',
      color: 'Grey/White',
      description:
        'Creed is new to the area (5 Weeks) and was only let out last week, he’s never gone missing before. He’s very vocal and friendly. He has a distinctive trail of white fur running from his mouth to his tuxedo on his chest',
      date_lost: '2021-06-12',
      location: 'Beach Haven, Auckland',
      missing_cat_phone: '022-021-2355',
      missing_cat_email: 'daniel@kingston.com',
      missing_image_url:
        'server/images/missing_cats/creed-1.jpg,server/images/missing_cats/creed-2.jpg,server/images/missing_cats/creed-3.jpg,server/images/missing_cats/creed-4.jpg,server/images/missing_cats/creed-5.jpg',
      cat_missing: true,
    },
    {
      microchip: true,
      microchip_number: '21535884',
      user_id_mc: 2,
      cat_name: 'Edward',
      breed: 'Persian',
      color: 'White/Brown',
      description:
        "Edward, a charming Persian cat with a luxurious white and brown coat, has gone missing. Known for his regal appearance and friendly demeanor, Edward was last seen in the Parkside neighborhood.",
      date_lost: '2022-02-20',
      location: 'Ponsonby, Auckland',
      missing_cat_phone: '022-987-6543',
      missing_cat_email: 'owner@email.com',
      missing_image_url:
        'server/images/missing_cats/edward-1.jpeg,server/images/missing_cats/edward-2.jpeg,server/images/missing_cats/edward-3.jpeg,server/images/missing_cats/edward-4.jpeg,server/images/missing_cats/edward-5.jpeg',
      cat_missing: true,
    },
    {
      microchip: false,
      microchip_number: null,
      user_id_mc: null,
      cat_name: 'Chaddles',
      breed: 'Domestic',
      color: 'Black',
      description:
        "Chaddles, a sleek and mysterious black Domestic cat, has gone missing in the Willowdale area. Chaddles is known for being both independent and affectionate. If you have any information about Chaddles' whereabouts.",
      date_lost: '2022-08-05',
      location: 'Kilbirnie, Wellington',
      missing_cat_phone: '022-555-1234',
      missing_cat_email: 'chaddles.owner@email.com',
      missing_image_url:
        'server/images/missing_cats/chaddles-1.jpg,server/images/missing_cats/chaddles-2.jpg,server/images/missing_cats/chaddles-3.jpg,server/images/missing_cats/chaddles-4.jpeg,server/images/missing_cats/chaddles-5.jpg',
      cat_missing: true,
    },
    {
      microchip: true,
      microchip_number: '73218956',
      user_id_mc: 3,
      cat_name: 'Butters',
      breed: 'Domestic',
      color: 'Ginger',
      description:
        "Butters, an adorable ginger Domestic cat, is currently missing in the Riverside neighborhood. Butters is known for being playful and friendly, with a distinctive orange fur coat. If you have any information about Butters' location.",
      date_lost: '2022-11-10',
      location: 'Tui Park, Beach Haven',
      missing_cat_phone: '022-333-7890',
      missing_cat_email: 'butters.owner@email.com',
      missing_image_url:
        'server/images/missing_cats/butters-1.jpg,server/images/missing_cats/butters-2.jpg,server/images/missing_cats/butters-3.jpg,server/images/missing_cats/butters-4.jpg,server/images/missing_cats/butters-5.jpeg',
      cat_missing: true,
    },
  ])
}
