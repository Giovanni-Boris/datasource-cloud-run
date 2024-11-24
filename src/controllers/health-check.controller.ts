import { Controller, Get } from "@nestjs/common";
import { HealthCheck, HealthCheckResult, HealthCheckService, HealthIndicatorResult, MicroserviceHealthIndicator } from "@nestjs/terminus";
import { Transport } from "@nestjs/microservices";
import { DatabaseHealth } from "src/commons/healthchecks/database.health";

@Controller("healthcheck")
export class HealthCheckController {
  private port = process.env.PORT ?? 3000;

  constructor(
    private readonly health: HealthCheckService,
    private readonly microservice: MicroserviceHealthIndicator,
    private readonly databaseHealthCheck: DatabaseHealth
  ) {}

  @Get()
  @HealthCheck()
  check(): Promise<HealthCheckResult> {
    return this.health.check([
      async (): Promise<HealthIndicatorResult> =>
        this.microservice.pingCheck("tcp", {
          transport: Transport.TCP,
          options: { host: "localhost", port: this.port },
        }),
      async (): Promise<HealthIndicatorResult> => this.databaseHealthCheck.pingCheck("ecommerce-database"),
    ]);
  }
}
