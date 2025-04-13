import React from "react";
import { BadgeCheck, Star, Crown } from "lucide-react";

const tierIcon = {
  Starter: <BadgeCheck className="text-[#1EBDB8]" />,
  Trusted: <Star className="text-yellow-500" />,
  Elite: <Crown className="text-purple-600" />,
};

const tierColor = {
  Starter: "bg-[#E0F7F6]",
  Trusted: "bg-yellow-100",
  Elite: "bg-purple-100",
};

const SubscriptionCard = ({ plan, view }) => {
  const tier =
    plan.title.includes("Elite") ? "Elite" :
    plan.title.includes("Trusted") ? "Trusted" :
    "Starter";

  return (
    <div
      className={`relative p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between ${tierColor[tier]}`}
    >
      <div onClick={() => view(plan)}>
        <div className="flex items-center gap-2 mb-3">
          {tierIcon[tier]}
          <h3 className="text-xl font-bold text-gray-800">{plan.title}</h3>
        </div>

        <p className="text-[15px] text-gray-700 leading-relaxed mb-4">
            <span className="font-medium text-gray-800">{plan.description}</span>
            </p>

            <ul className="text-[14.5px] text-gray-800 list-disc ml-5 space-y-2 tracking-normal leading-snug">
            {plan.features.map((feat, i) => (
                <li key={i}>
                <span className="text-gray-700">{feat}</span>
                </li>
            ))}
            </ul>

            <p className="mt-5 font-bold text-xl text-gray-900 tracking-wide">
            ${plan.price} <span className="text-[15px] font-medium text-gray-600">/month</span>
            </p>

      </div>

      <button
        onClick={() => view(plan)}
        className="mt-6 bg-[#1EBDB8] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#17a39e] transition duration-200"
      >
        Subscribe Now
      </button>
    </div>
  );
};

export default SubscriptionCard;
