module.exports = {
  apps: [
    {
      name: 'client',
      exec_mode: 'cluster',
      port: '3000',
      instances: 1, // Or a number of instances
      script: '.output/server/index.mjs'
    }
  ]
}
