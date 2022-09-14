import { Injectable } from '@nestjs/common';
import { TaskDto } from '@task/dto';
import { ITask } from '@task/interfaces/task.interface';

@Injectable()
export class TaskMapper {
  /**
   * Map one Task
   * @param {TaskDto} task
   * @returns {ITask}
   */
  public mapTask(task: TaskDto): ITask {
    const { id, ...rest } = task;

    return { ...rest };
  }

  /**
   * Map array of Tasks
   * @param {TaskDto[]} tasks
   * @returns {ITask[]}
   */
  public mapTasks(tasks: TaskDto[]): ITask[] {
    return tasks.map((task: TaskDto) => {
      const { id, ...rest } = task;

      return { ...rest };
    });
  }
}
