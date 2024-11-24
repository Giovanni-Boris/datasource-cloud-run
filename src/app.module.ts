import { Module } from "@nestjs/common";
import { ConfigurationModule } from "./commons/modules/configuration.module";
import { HealthCheckModule } from "./commons/modules/health-check.module";
import { DatabaseConfigModule } from "./commons/modules/database-config.module";
import { EntitiesModule } from "./commons/modules/entities.module";

@Module({
  imports: [ConfigurationModule, HealthCheckModule, DatabaseConfigModule, EntitiesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
