// Better to test this function using an integration test
// or the unit test will be fat because
// of mocks needed for req, res, etc. (not recommended)
// Test functions with unit test that are algorithmic
// and have zero to no dependency on external resources
// Avoid writing too many mocks. If you write too many
// mocks, it's better to write an integration test
module.exports = function(req, res, next) {
    // 401 Unauthorized (not legit JSON web token)
    // 403 Forbidden (legit JSON web token that isn't
    // admin for example)
    if (!req.user.isAdmin) return res.status(403)
        .send('Access denied.');
    next();
}