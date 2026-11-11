export function registerUser(req, res, next) {
  const { username, telephone } = req.body;

  if(!username || !telephone){
    return res.status(400).json({
        status: 400,
        message: 'Usernam va telefon bolishi shart'
    })
  }
  next()
}


export function foundUserID(req, res, next) {
  const userId = Number(req.params.userId);

  if (Number.isNaN(userId)) {
    return res.status(400).json({ message: "userId raqam bo'lishi kerak" });
  }

  next();
}

