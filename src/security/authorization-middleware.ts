
export function authMiddleware(...roleIds: number[]) {
    return (req, resp, next) => {
      const user = req.session.user;
      if (!user) {
        resp.sendStatus(401);
        return;
      }
      const hasPermission = roleIds.some(roleId => {
        if (user.roleId === roleId) {
          return true;
        } else {
          return false;
        }
      })
      if (hasPermission) {
        next();
      } else {
        resp.sendStatus(403);
      }
    }
  }