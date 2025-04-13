import React from "react";
import SubscriptionCard from "../../common/provider/subscriptionCard";
import { Sparkles } from "lucide-react"; // Optional: A little icon magic ✨

const Subscriptions = ({ handleViewSubscriptionOpen, subscriptions }) => {
  return (
    <div className="p-6 bg-white shadow-md rounded-[10px] mt-8 mx-8 overflow-y-auto max-h-[84%] h-[84%]">
      <div className="mb-6 flex items-center justify-center gap-2">
        <Sparkles className="text-[#1EBDB8]" size={24} />
        <h2 className="text-2xl font-bold text-[#1EBDB8]">Subscription Plans</h2>
      </div>

      {subscriptions.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
          {subscriptions.map((plan, index) => (
            <SubscriptionCard
              key={index}
              index={index}
              plan={plan}
              view={handleViewSubscriptionOpen}
            />
          ))}
        </div>
      ) : (
        <div className="flex w-full text-center">
          <p className="font-semibold text-xl text-[#1EBDB8] m-auto my-16">
            😢 No active subscriptions yet. Explore and upgrade to unlock more!
          </p>
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
