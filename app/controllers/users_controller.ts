import User from '#models/user'
import { createUserValidator, updateUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async index() {
    const users = await User.query().preload('tasks')

    return users
  }

  async store({ request, response }: HttpContext) {
    const { name, email, password } = await request.validateUsing(createUserValidator)

    const user = await User.create({ name, email, password })

    return response.ok(user)
  }

  async show({ params, response }: HttpContext) {
    try {
      //const user = await User.query().where('id', params.id).preload('tasks')
      const user = await User.findByOrFail('id', params.id)
      await user.load('tasks')
      return response.ok(user)
    } catch (error) {
      return response.status(404).json({ error: 'User not found' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      //const user = await User.query().where('id', params.id).preload('tasks')
      const user = await User.findBy('id', params.id)

      if (!user) {
        throw new Error('User not found')
      }

      const { name, password } = await request.validateUsing(updateUserValidator)

      user.merge({ name, password })

      await user.save()

      return response.ok(user)
    } catch (error) {
      return response.status(404).json({ error: 'User not found' })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const user = await User.findByOrFail('id', params.id)
      await user.delete()
      return response.status(203)
    } catch (error) {
      return response.status(404).json({ error: 'User not found' })
    }
  }
}
