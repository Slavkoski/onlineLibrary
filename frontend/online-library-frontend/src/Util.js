export const checkUserHasRole = function (user, role) {
    if (user && user.roles) {
        return user.roles.includes(role)
    }
    return false
}
