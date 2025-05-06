export const handleValidationError = (error, res) => {
  if (error.name === "ZodError") {
    return res.status(400).json({
      message: "Validation error",
      errors: error.errors.map((e) => ({
        field: e.path[0],
        message: e.message,
      })),
    });
  }

  return null;
};
