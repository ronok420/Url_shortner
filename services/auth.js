const sessionIdToUserMap = new Map();

function setUser(id, user) {
  sessionIdToUserMap.set(id, user);
}

function getUser(id) {
    console.log("getUser id  to  show through map",sessionIdToUserMap.get(id))
  return sessionIdToUserMap.get(id);
}

module.exports = {
  setUser,
  getUser,
};