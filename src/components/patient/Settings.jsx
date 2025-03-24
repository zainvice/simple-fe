import React from "react";

const Settings = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-teal-600">Settings</h2>
      <p className="mt-1 text-gray-700 font-medium">
        Zain Ul Hassan, <span className="text-gray-500">zainvoice@om.me</span> -
        <a href="#" className="text-teal-500 font-semibold ml-1">
          Go to profile
        </a>
      </p>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {settingsOptions.map((option, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-5 hover:shadow-lg transition"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{option.icon}</span>
              <h3 className="text-lg font-semibold text-gray-800">
                {option.title}
              </h3>
            </div>
            <p className="text-gray-600 text-sm mt-2">{option.description}</p>
          </div>
        ))}
      </div>

      {/* Deactivate Account */}
      <p className="text-center text-gray-600 text-sm mt-10">
        Need to deactivate your account? <br />
        <a href="#" className="text-teal-500 font-medium">
          Take care of that now
        </a>
      </p>
    </div>
  );
};

const settingsOptions = [
  {
    title: "Personal info",
    description: "Provide personal details and how we can reach you",
    icon: "📄",
  },
  {
    title: "Login & security",
    description: "Update your password and secure your account",
    icon: "🔒",
  },
  {
    title: "Payments & payouts",
    description: "Review payments, payouts, coupons, and gift cards",
    icon: "💳",
  },
  {
    title: "Taxes",
    description: "Manage taxpayer information and tax documents",
    icon: "📑",
  },
  {
    title: "Notifications",
    description: "Choose notification preferences and how you want to be contacted",
    icon: "🔔",
  },
  {
    title: "Privacy & sharing",
    description: "Manage your personal data, connected services, and data sharing settings",
    icon: "🔒",
  },
  {
    title: "Global preferences",
    description: "Set your default language, currency, and timezone",
    icon: "🌍",
  },
  {
    title: "Referral credit & coupon",
    description: "You have 50 referral credits and coupon. Learn more.",
    icon: "🎟️",
  },
];

export default Settings;
