const ValidateRiquest = (schema) => {
  return (req, res, next) => {
    const body = req.body;
    const result = schema.safeParse(body);

    if (!result.success) {
      const errorMessages = result.error.issues.map((err) => err.message);

      const error = errorMessages.join(", ");

      return res.status(400).json({
        success: false,
        msg: error,
      });
    }
    next();
  };
};
export default ValidateRiquest;
