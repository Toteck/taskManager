import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        name: 'Mateus Weslley',
        email: 'mateus@email.com',
        password: 'secret',
      },
      {
        name: 'Gabriel Lucas',
        email: 'gabriel@email.com',
        password: 'secret',
      },
    ])
  }
}
