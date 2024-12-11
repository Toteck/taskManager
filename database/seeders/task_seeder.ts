import Task from '#models/task'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Task.createMany([
      {
        title: 'Estudar ReactJS',
        description: 'Estudar fundamentos de React',
        userId: 1,
      },
      {
        title: 'Estudar NodeJS',
        description: 'Estudar fundamentos de Node',
        userId: 1,
      },
      {
        title: 'Estudar Direito do Trabalho',
        description: 'Estudar fundamentos do direito trabalhista',
        userId: 2,
      },
    ])
  }
}
