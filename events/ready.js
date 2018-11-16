const Event = require('../base/events/Event.js')

class Ready extends Event {
  constructor(client) {
    super(client)
  }

  async run() {
    await this.client.wait(1000)

    this.client.log('log', `${this.client.user.tag}, ready to serve ${this.client.users.size} users in ${this.client.guilds.size} servers.`, 'Ready!')

    // We check for any guilds added while the bot was offline, if any were, they get a default configuration.
    this.client.guilds.filter(g => !this.client.settings.has(g.id)).forEach(g => this.client.settings.set(g.id, this.client.settings.get('default')))

    this.client.user.setPresence({ game: { name: 'designhub.fun', type: 0 } })

    require('../functions/twitter.js')(this.client)
    require('../functions/dashboard.js')(this.client)
  }
}

module.exports = Ready
