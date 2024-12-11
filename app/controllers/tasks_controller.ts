import User from '#models/user'
import { createSessionValidator } from '#validators/session'
import type { HttpContext } from '@adonisjs/core/http'

export default class TasksController {
  async index({ auth, response }: HttpContext) {
    try {
      const user = auth.user

      if (!user) {
        throw new Error('User not authenticated')
      }

      await user.preload('tasks')

      return response.ok(user)
    } catch (error) {
      return response.status(401).json({ error: error.message })
    }
  }
  async store({ request, auth }: HttpContext) {}
  async show() {}
  async update() {}
  async destroy() {}
}
