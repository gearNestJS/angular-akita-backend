import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { TaskService } from '@task/task/task.service';
import { ITask } from '@task/interfaces/task.interface';
import { TaskDto } from '@task/dto/task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getAllTasks(): Promise<TaskDto[]> {
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  getTask(@Param('id', ParseIntPipe) id: number): Promise<TaskDto> {
    return this.taskService.getTask(id);
  }

  @Post()
  createTask(@Body() task: TaskDto): Promise<TaskDto> {
    return this.taskService.createTask(task);
  }

  @Delete(':id')
  removeTask(@Param('id', ParseIntPipe) id: number): Promise<TaskDto> {
    return this.taskService.removeTask(id);
  }
}
