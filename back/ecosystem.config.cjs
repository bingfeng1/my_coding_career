console.log("读取配置文件", __dirname)

module.exports = {
  apps: [
    {
      name: "back",
      script: "index.js",
      out_file: "./logs/back.log",
      error_file: "./logs/err.log",
      watch: true,
      ignore_watch: [
        "node_modules",
        "logs",
        "uploads",
        ".git",
        "static",
        "test"
      ],
      "watch_options": {
        "usePolling": true
      },
      env_production: {
        mariadb: "mariadb",
        dbName: "VISUAL",
        mongodb: "mongo"
      }
    }
  ],
  deploy: {
    production: {
      'post-deploy': "tyarn && pm2 startOrRestart ecosystem.config.js --env production"
    }
  }
}
