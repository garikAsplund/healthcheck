module.exports = {
  apps: [
    {
      name: "healthcheck",
      script: "./build/index.js",
      cwd: "/home/garik/projects/healthcheck",
      env: {
        NODE_ENV: "production",
	PORT: 3001,
        TURSO_DATABASE_URL: "libsql://healthcheck-garikasplund.aws-us-west-2.turso.io",
        TURSO_AUTH_TOKEN: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NjEzNDg1OTMsImlkIjoiZjZlYmYxOTItYzY0NS00YzNlLWI3MzctZjM2ZDdhZmM0MjVhIiwicmlkIjoiODk4NWFmYzUtYTJhMS00ZjA5LWIzZmMtZTE5NWI0Njk0ZDAyIn0.vqkqh9iyAd-Iu4OVqKX6NO6lcabnG3xtP18CqDl6mvFuscpK7FA3_DqbyW0dkeOQF4hEO8Jacb0cHpzgBpgpBA"
      },
      watch: false,
      max_memory_restart: "300M",
      error_file: "/home/garik/projects/healthcheck/logs/error.log",
      out_file: "/home/garik/projects/healthcheck/logs/out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss"
    }
  ]
};
