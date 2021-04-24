const mongoose = require("mongoose");
const User = mongoose.model("Product", {
  passport_id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  isActive: {
    type: Boolean,
  },

  account: {
            account_id: {
            type: ObjectID,
            required: true,
            uniq: true,
            },

            cash: {
            type: Number,
            defaullt: 0,
            required: true,
            validate(value) {
                if (value < 0) {
                throw new Error("Must be positive value");
                }
            },
            },

            credit: {
            type: Number,
            defaullt: 0,
            required: true,
            validate(value) {
                if (value < 0) {
                throw new Error("Must be positive value");
                }
            },
            },
  },
});

module.exports = User;
