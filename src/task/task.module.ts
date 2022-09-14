import { Module } from '@nestjs/common';
import { TaskController } from '@task/task/task.controller';
import { TaskService } from '@task/task/task.service';
import { PrismaModule } from '@prisma/prisma.module';
import { TaskMapper } from '@task/services/task-mapper.service';

@Module({
  imports: [PrismaModule],
  controllers: [TaskController],
  providers: [TaskService, TaskMapper],
})
export class TaskModule {}
