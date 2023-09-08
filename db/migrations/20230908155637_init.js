/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
  .createTable('user', function (table) {
    table.string('id').primary();
    table.string('name');
    table.timestamps(true, true);
  })

  .createTable('project', function (table) {
    table.string('id').primary();
    table.text('description');
    table.string('tagline');
    table.string('user_id')
    table.foreign('user_id')
      .references('user.id');
    table.string('logo_font');
    table.string('logo_url');
    table.boolean('saved')
    table.string('name')
    table.string('timeline')
    table.integer('timeline_int')
    table.string('technologies')
    table.integer('collaborators')
    table.timestamps(true, true);
  })
  
  .createTable('feature', function (table) {
    table.string('id').primary();
    table.text('description');
    table.string('project_id')
    table.foreign('project_id')
      .references('project.id');
    table.timestamps(true, true);
  })

  .createTable('step', function (table) {
    table.string('id').primary();
    table.text('description');
    table.string('project_id')
    table.foreign('project_id')
      .references('project.id');
    table.timestamps(true, true);
  })

  .createTable('color', function (table) {
    table.string('id').primary();
    table.text('hex_code');
    table.string('project_id')
    table.foreign('project_id')
      .references('project.id');
    table.timestamps(true, true);
  })

  .createTable('user_interaction', function (table) {
    table.string('id').primary();
    table.text('description');
    table.string('project_id')
    table.foreign('project_id')
      .references('project.id');
    table.timestamps(true, true);
  })
}
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
  .dropTable('user_interaction')
  .dropTable('color')
  .dropTable('step')
  .dropTable('feature')
  .dropTable('project')
  .dropTable('user')
};
