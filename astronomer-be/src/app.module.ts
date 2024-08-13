import { Module } from "@nestjs/common";
import { CacheModule } from "@nestjs/cache-manager";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { EmployeeModule } from "./employee/employee.module";

@Module({
  imports: [CacheModule.register({ isGlobal: true }), EmployeeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
