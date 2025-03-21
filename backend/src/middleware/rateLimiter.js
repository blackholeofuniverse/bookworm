import rateLimit from 'express-rate-limit';

export const loginLimiter = rateLimit({
    windowMs: 10 * 1000, // 10 seconds
    max: 5, // Limit each IP to 5 login attempts per window
    message: { message: "Too many login attempts, please try again after 10 seconds" },
    standardHeaders: true,
    legacyHeaders: false,
});

export const registerLimiter = rateLimit({
    windowMs: 10 * 1000, // 10 seconds
    max: 3, // Limit each IP to 3 registration attempts per window
    message: { message: "Too many registration attempts, please try again after 10 seconds" },
    standardHeaders: true,
    legacyHeaders: false,
});
