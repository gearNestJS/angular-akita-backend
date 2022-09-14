import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from '@task/task/task.service';
import { ITask } from '@task/interfaces/task.interface';
import { TaskDto } from '@task/dto/task.dto';
import { CreateTaskDto, UpdateTaskDto } from '@task/dto';
import { TaskMapper } from '@task/services/task-mapper.service';

@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly mapper: TaskMapper,
  ) {}

  @Get()
  async getAllTasks(): Promise<ITask[]> {
    const tasksDto: TaskDto[] = await this.taskService.getAllTasks();
    return this.mapper.mapTasks(tasksDto);
  }

  @Get(':slug')
  async getUniqueTask(@Param('slug') slug: string): Promise<ITask> {
    const taskDto: TaskDto = await this.taskService.getUniqueTask(slug);
    return this.mapper.mapTask(taskDto);
  }

  @Post()
  async createTask(@Body() task: CreateTaskDto): Promise<ITask> {
    const taskDto: TaskDto = await this.taskService.createTask(task);
    return this.mapper.mapTask(taskDto);
  }

  @Put(':slug')
  async updateTask(
    @Body() updateTask: UpdateTaskDto,
    @Param('slug') slug: string,
  ): Promise<ITask> {
    const taskDto: TaskDto = await this.taskService.updateTask(
      slug,
      updateTask,
    );
    return this.mapper.mapTask(taskDto);
  }

  @Delete(':slug')
  async removeTask(@Param('slug') slug: string): Promise<ITask> {
    const taskDto: TaskDto = await this.taskService.removeTask(slug);
    return this.mapper.mapTask(taskDto);
  }
}
