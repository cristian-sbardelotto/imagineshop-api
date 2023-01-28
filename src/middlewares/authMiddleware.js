export const authMiddleware = (req, res, next) => {
  const id = req.params.id;

  if (id === '63d3d9f5fd81a31f07367e76') {
    next();
  } else {
    res.status(401).json({ message: 'Não autorizado' });
  }
};
