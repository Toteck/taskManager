import Task from '#models/task'
import { createTaskValidator, updateTaskValidator } from '#validators/task'
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
      return response.created(user.tasks)
    } catch (error) {
      return response.status(401).json({ error: error.message })
    }
  }
  async show({ params, response }: HttpContext) {
    try {
      const task = await Task.findByOrFail('id', params.id)
      return response.ok(task)
    } catch (error) {
      return response.status(401).json({ error: 'Task not found' })
    }
  }
  async update({ request, params, response }: HttpContext) {
    try {
      const task = await Task.findByOrFail('id', params.id)
      const { title, description, done } = await request.validateUsing(updateTaskValidator)
      task.merge({ title, description, done })
      await task.save()
      return response.ok(task)
    } catch (error) {
      return response.status(401).json({ error: 'Task not found' })
    }
  }
  async destroy({ params, response }: HttpContext) {
    try {
      const task = await Task.findByOrFail('id', params.id)
      task.delete()
      return response.status(203)
    } catch (error) {
      return response.status(401).json({ error: 'Task not found' })
    }
  }
}
