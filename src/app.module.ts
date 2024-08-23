import { Module } from "@nestjs/common";
import { ConfigurationModule } from "./commons/modules/configuration.module";
import { HealthCheckModule } from "./commons/modules/health-check.module";

@Module({
  imports: [ConfigurationModule, HealthCheckModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
