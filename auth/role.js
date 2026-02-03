const Permissions = require('./permissions')

module.exports = {
   owner : [
    Permissions.ADD_MEMBER,
    Permissions.CHANGE_ROLE,
    Permissions.CREATE_PROJECT,
    Permissions.DELETE_PROJECT,
    Permissions.REMOVE_MEMBER,
    Permissions.UPDATE_PROJECT
   ],
   admin:[
    Permissions.CREATE_PROJECT,
    Permissions.DELETE_PROJECT,
    Permissions.UPDATE_PROJECT
   ],
   member:[]
}