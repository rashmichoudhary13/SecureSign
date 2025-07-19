import jwt from "jsonwebtoken";

// Authenticate users
export const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({
      success: false,
      message: "Not Authorized, Login Again.",
    });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id && tokenDecode.role) {
      req.user = tokenDecode;
    } else {
      return res.status(401).json({
        success: false,
        message: "Not Authorized, Login Again.",
      });
    }

    next();
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

export const authorizeRoles = (...allowedRole) => {
  return (req, res, next) => {
  
    if(!allowedRole.includes(req.user.role)){
      return res.status(403).json({success: false, message: 'Access denied'});
    }

    next();
  };
};
