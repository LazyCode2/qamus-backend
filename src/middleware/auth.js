export default function adminAuth(req, res, next) {
  const key = req.header('x-api-key');   
  if (key && key === process.env.ADMIN_KEY) {
    return next();
  }
  res.status(401).json({ error: 'Unauthorized' });
}