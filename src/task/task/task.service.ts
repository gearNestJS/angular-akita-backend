import { Injectable } from '@nestjs/common';
import { TaskDto } from '@task/dto/task.dto';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Get all tasks
   * @returns {TaskDto[]}
   */
  async getAllTasks(): Promise<TaskDto[]> {
    return await this.prismaService.task.findMany();
  }

  /**
   * Get unique task
   * @returns {TaskDto}
   * @param id
   */
  async getTask(id: number): Promise<TaskDto> {
    // TODO: add exception
    return await this.prismaService.task.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * Create new task
   * @param {TaskDto} task
   * @returns {TaskDto}
   */
  async createTask(task: TaskDto): Promise<TaskDto> {
    return await this.prismaService.task.create({ data: task });
  }

  /**
   * Delete task
   * @param {number} id
   * @returns {TaskDto}
   */
  async removeTask(id: number): Promise<TaskDto> {
    return await this.prismaService.task.delete({
      where: { id },
    });
  }
}
