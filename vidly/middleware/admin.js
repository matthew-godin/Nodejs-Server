module.exports = function(req, res, next) {
    // 401 Unauthorized (not legit JSON web token)
    // 403 Forbidden (legit JSON web token that isn't
    // admin for example)
    if (!req.user.isAdmin) return res.status(403)
        .send('Access denied.');
    next();
}