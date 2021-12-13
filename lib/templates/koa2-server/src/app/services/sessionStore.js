class RedisSessionStore {
  constructor(client) {
    this.client = client;
  }

  //获取Redis中存储的session数据
  async get(sid) {
    const id = getRedisSessionId(sid);
    const data = await this.client.get(id);

    if (!data) return null;

    try {
      const result = JSON.parse(data);
      return result;
    } catch (err) {
      console.error(err);
    }
  }

  // 存储session数据到redis
  /**
   * 
   * @param {string} sid 
   * @param {string} sess 
   * @param {number} ttl 过期时间
   */
  async set(sid, sess, ttl) {
    // console.log('set session', sid)
    const id = getRedisSessionId(sid);
    if (typeof ttl === 'number') {
      ttl = Math.ceil(ttl / 1000);
    }

    try {
      const sessStr = JSON.stringify(sess);
      if (ttl) {
        await this.client.setex(id, ttl, sessStr);
      } else {
        await this.client.set(id, sessStr);
      }
    } catch (err) {
      console.error(err);
    }
  }

  // 从reids当中删除某个session
  async destroy(sid) {
    const id = getRedisSessionId(sid);
    await this.client.del(id);
  }
}

function getRedisSessionId(sid) {
  return `ssid:${sid}`;
}

module.exports = RedisSessionStore;
