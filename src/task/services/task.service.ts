import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TaskDto } from '@task/dto/task.dto';
import { PrismaService } from '@prisma/prisma.service';
import { generateSlug } from '@services/helpers';
import { CreateTaskDto, UpdateTaskDto } from '@task/dto';

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Get all Tasks
   * @returns {TaskDto[]}
   */
  async getAllTasks(): Promise<TaskDto[]> {
    return await this.prismaService.task.findMany();
  }

  /**
   * Get unique Task
   * @returns {TaskDto}
   * @param {string} slug
   */
  async getUniqueTask(slug: string): Promise<TaskDto> {
    const task: TaskDto = await this.prismaService.task.findUnique({
      where: {
        slug,
      },
    });

    if (!task) {
      throw new HttpException(`Task not found!`, HttpStatus.NOT_FOUND);
    } else {
      return task;
    }
  }

  /**
   * Create new Task
   * @param {TaskDto} task
   * @returns {TaskDto}
   */
  async createTask(task: CreateTaskDto): Promise<TaskDto> {
    const { title } = task;
    const slug: string = generateSlug(title);
    const findTask: TaskDto = await this.prismaService.task.findUnique({
      where: {
        slug,
      },
    });

    if (findTask) {
      throw new HttpException('Task already exists!', HttpStatus.FOUND);
    } else {
      return await this.prismaService.task.create({ data: { ...task, slug } });
    }
  }

  /**
   * Update Task
   * @param {string} slug
   * @param {UpdateTaskDto} updateTask
   * @returns {Promise<TaskDto>}
   */
  async updateTask(slug: string, updateTask: UpdateTaskDto): Promise<TaskDto> {
    const task: TaskDto = await this.prismaService.task.findUnique({
      where: {
        slug,
      },
    });

    if (!task) {
      throw new HttpException(
        `Task with slug ${slug} not found!`,
        HttpStatus.NOT_FOUND,
      );
    } else {
      const { status } = updateTask;

      return this.prismaService.task.update({
        where: { slug },
        data: {
          status,
        },
      });
    }
  }

  /**
   * Delete Task
   * @param {string} slug
   * @returns {TaskDto}
   */
  async removeTask(slug: string): Promise<TaskDto> {
    const task: TaskDto = await this.prismaService.task.findUnique({
      where: {
        slug,
      },
    });

    if (!task) {
      throw new HttpException(
        `Task with slug "${slug}" not found!`,
        HttpStatus.NOT_FOUND,
      );
    } else {
      return await this.prismaService.task.delete({
        where: { slug },
      });
    }
  }
}
