import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { CacheModule } from "@nestjs/cache-manager";
import { join } from "path";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { EmployeeModule } from "./employee/employee.module";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "uploads"),
      serveRoot: "/uploads",
    }),
    CacheModule.register({ isGlobal: true }),
    EmployeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
