import React, { useState } from "react";
import "./App.css";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "",
  dob: "",
  password: "",
  confirmPassword: "",
  terms: false,
};

function App() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value, allValues = formData) => {
    switch (name) {
      case "firstName":
        if (!value.trim()) return "First name is required";
        return "";
      case "lastName":
        if (!value.trim()) return "Last name is required";
        return "";
      case "email":
        if (!value) return "Email ID is required";
        if (!/^\S+@\S+\.\S+$/.test(value)) return "Invalid email address";
        return "";
      case "phone":
        if (!value.trim()) return "Phone number is required";
        if (!/^\d{10}$/.test(value)) return "Phone must be 10 digits";
        return "";
      case "country":
        if (!value) return "Please select country";
        return "";
      case "dob":
        if (!value) return "Date of birth required";
        return "";
      case "password":
        if (!value) return "Password is required";
        if (value.length < 8) return "Password must be 8+ chars";
        return "";
      case "confirmPassword":
        if (!value) return "Confirm Password is required";
        if (value !== allValues.password) return "Passwords do not match";
        return "";
      case "terms":
        if (!value) return "Accept terms to proceed";
        return "";
      default:
        return "";
    }
  };

  const validateForm = () => {
    const nextErrors = {};
    Object.keys(formData).forEach((key) => {
      const msg = validateField(key, formData[key], formData);
      if (msg) nextErrors[key] = msg;
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    const updated = { ...formData, [name]: newValue };
    setFormData(updated);

    if (touched[name]) {
      const msg = validateField(name, newValue, updated);
      setErrors((prev) => ({ ...prev, [name]: msg || undefined }));
    }
  };

  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const msg = validateField(name, val);
    setErrors((prev) => ({ ...prev, [name]: msg || undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      country: true,
      dob: true,
      password: true,
      confirmPassword: true,
      terms: true,
    });

    if (validateForm()) {
      alert("Account Created Successfully ✅");
      setFormData(initialForm);
      setErrors({});
      setTouched({});
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit} noValidate className="form-grid">
          {/* First Name */}
          <div className="form-group">
            <label htmlFor="firstName">First Name *</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.firstName}
            />
            {errors.firstName && <span className="error">{errors.firstName}</span>}
          </div>

          {/* Last Name */}
          <div className="form-group">
            <label htmlFor="lastName">Last Name *</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.lastName}
            />
            {errors.lastName && <span className="error">{errors.lastName}</span>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.email}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          {/* Phone */}
          <div className="form-group">
            <label htmlFor="phone">Phone *</label>
            <input
              id="phone"
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.phone}
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>

          {/* Country */}
          <div className="form-group">
            <label htmlFor="country">Country *</label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.country}
            >
              <option value="">Select…</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
            </select>
            {errors.country && <span className="error">{errors.country}</span>}
          </div>

          {/* DOB */}
          <div className="form-group">
            <label htmlFor="dob">Date of Birth *</label>
            <input
              id="dob"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.dob}
            />
            {errors.dob && <span className="error">{errors.dob}</span>}
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.password}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password *</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.confirmPassword}
            />
            {errors.confirmPassword && (
              <span className="error">{errors.confirmPassword}</span>
            )}
          </div>

          {/* Terms */}
          <div className="form-group full-width">
            <label>
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              I agree to Terms & Conditions
            </label>
            {errors.terms && <span className="error">{errors.terms}</span>}
          </div>

          {/* Submit */}
          <div className="form-group full-width">
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
