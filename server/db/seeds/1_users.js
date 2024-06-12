export async function seed(knex) {
  await knex('users_table').insert([{
      user_id: 1,
      username: 'john_doe',
      password: 'hashed_password_1',
      email: 'john.doe@example.com',
      auth0_id: 'auth0_id_1',
      given_name: 'John',
      family_name: 'Doe',
    },
    {
      user_id: 2,
      username: 'jane_smith',
      password: 'hashed_password_2',
      email: 'jane.smith@example.com',
      auth0_id: 'auth0_id_2',
      given_name: 'Jane',
      family_name: 'Smith',
    },
    {
      user_id: 3,
      username: 'bob_jackson',
      password: 'hashed_password_3',
      email: 'bob.jackson@example.com',
      auth0_id: 'auth0_id_3',
      given_name: 'Bob',
      family_name: 'Jackson',
    },
    {
      user_id: 4,
      username: 'alice_miller',
      password: 'hashed_password_4',
      email: 'alice.miller@example.com',
      auth0_id: 'auth0_id_4',
      given_name: 'Alice',
      family_name: 'Miller',
    
  }])
}
