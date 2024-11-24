import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { HealthCheckController } from "../../controllers/health-check.controller";
import { DatabaseHealth } from "../healthchecks/database.health";

@Module({
  imports: [TerminusModule],
  controllers: [HealthCheckController],
  providers: [DatabaseHealth],
})
export class HealthCheckModule {}
