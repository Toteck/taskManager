import Task from '#models/task'
import { createTaskValidator } from '#validators/task'
import type { HttpContext } from '@adonisjs/core/http'

export default class TasksController {
  async index({ auth, response }: HttpContext) {
    try {
      const user = auth.user

      if (!user) {
        throw new Error('User not authenticated')
      }

      await user.preload('tasks')

      return response.ok(user.tasks)
    } catch (error) {
      return response.status(401).json({ error: error.message })
    }
  }
  async store({ request, response, auth }: HttpContext) {
    try {
      const { title, description } = await request.validateUsing(createTaskValidator)

      const user = auth.user

      if (!user) {
        throw new Error('User not authenticated')
      }

      await user.related('tasks').create({
        title,
        description,
      })

      await user.load('tasks')
      return response.ok(user.tasks)
    } catch (error) {
      return response.status(401).json({ error: error.message })
    }
  }
  async show({ params, response }) {}
  async update() {}
  async destroy() {}
}
