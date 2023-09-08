/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 * 
 * 
 */

const {users, projects, features, steps, colors, userInteractions} = require('../../../data')

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  try {
    await knex('user_interaction').del()
    await knex('step').del() 
    await knex('color').del()
    await knex('feature').del()
    await knex('project').del()
    await knex('user').del()

    await knex('user').insert(users).returning('*')
    await knex('project').insert(projects).returning('*')
    await knex('feature').insert(features).returning('*')
    await knex('color').insert(colors).returning('*')
    await knex('step').insert(steps).returning('*')
    await knex('user_interaction').insert(userInteractions).returning('*')

  } catch (error) {
    console.log(`Error seeding data: ${error}`)
  }
};
