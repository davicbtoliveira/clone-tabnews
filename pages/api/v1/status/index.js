import database from "infra/database.js";
import { Connection } from "pg";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const postgresVersion = await database.query("SELECT Version();");
  const maxConnections = await database.query("SHOW max_connections;");
  const actualConnections = await database.query(
    "SELECT * FROM pg_stat_activity;",
  );

  response.status(200).json({
    updated_at: updatedAt,
    postgres_version: postgresVersion.rows[0].version,
    max_connections: maxConnections.rows[0].max_connections,
    actual_connctions: actualConnections.rowCount,
  });
}

export default status;
