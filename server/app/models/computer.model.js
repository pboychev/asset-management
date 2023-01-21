module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      model: String,
      serial_number: String,
      purchase_date: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Computer = mongoose.model("computer", schema);
  return Computer;
};
