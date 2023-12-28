module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        firstName: String,
        lastName: String,
        description: String,
        valid: Boolean,
        email: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object} = this.toObject();
      object.id = _id;
      return object;
    });
    
    const Employees = mongoose.model("employees", schema);
    return Employees;
  };