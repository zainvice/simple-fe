import React, { useState } from "react";

const HelpCenter = () => {
  const [activeTab, setActiveTab] = useState("faq");
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="flex w-full h-screen bg-gray-100">
      {/* Sidebar - Already Created */}
      <div className="w-1/4 bg-white p-6 shadow-md">
        <h2 className="text-xl font-semibold text-teal-600">Help Center</h2>
        <div className="flex border-b mt-4">
          <button
            className={`w-1/2 pb-2 border-b-2 ${activeTab === "faq" ? "border-black" : "border-transparent"}`}
            onClick={() => setActiveTab("faq")}
          >
            FAQ
          </button>
          <button
            className={`w-1/2 pb-2 border-b-2 ${activeTab === "contact" ? "border-black" : "border-transparent"}`}
            onClick={() => setActiveTab("contact")}
          >
            Contact Us
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {activeTab === "faq" ? (
          <div>
            <div className="flex space-x-4 mb-4">
              {['General', 'Account', 'Payment', 'Services'].map((category) => (
                <button key={category} className="px-4 py-2 rounded-full bg-gray-200 hover:bg-teal-500 hover:text-white">{category}</button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Search for help"
              className="w-full p-2 mb-4 border rounded-md"
            />
            <div className="space-y-4">
              {["How do I manage my notifications?", "How do I start a guided meditation session?", "How do I join a support group?", "Is my data safe and private?"].map((faq) => (
                <details key={faq} className="p-4 bg-white rounded-md shadow-md">
                  <summary className="font-semibold cursor-pointer">{faq}</summary>
                  <p className="mt-2 text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </details>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex">
            {/* Contact List */}
            <div className="w-1/3 space-y-2">
              {["Customer Services", "WhatsApp", "Facebook", "Twitter", "Instagram"].map((contact) => (
                <button key={contact} className="w-full p-4 bg-white rounded-md shadow-md text-left hover:bg-teal-500 hover:text-white" onClick={() => setChatOpen(true)}>
                  {contact}
                </button>
              ))}
            </div>

            {/* Chat Section */}
            {chatOpen && (
              <div className="flex-1 ml-4 p-4 bg-white rounded-lg shadow-lg relative">
                <div className="flex items-center justify-between border-b pb-2">
                  <button className="text-xl font-semibold">Customer Service</button>
                  <button onClick={() => setChatOpen(false)} className="text-gray-500">✖</button>
                </div>
                <div className="h-64 overflow-y-auto p-2 space-y-3">
                  <div className="p-3 bg-gray-200 rounded-lg w-max">Hi, how are you today?</div>
                  <div className="p-3 bg-teal-500 text-white rounded-lg w-max ml-auto">It's gotten worse, I keep thinking weird things</div>
                  <div className="p-3 bg-gray-200 rounded-lg w-max">Would you like to have a session?</div>
                  <div className="p-3 bg-teal-500 text-white rounded-lg w-max ml-auto">Yes please! I need help</div>
                  <div className="p-3 bg-gray-200 rounded-lg w-max">I have time at 4pm, does that work?</div>
                  <div className="p-3 bg-teal-500 text-white rounded-lg w-max ml-auto">Yes, thank you so much</div>
                </div>
                <div className="absolute bottom-2 left-0 right-0 flex p-2 border-t">
                  <input type="text" placeholder="Type a message" className="flex-1 p-2 border rounded-md" />
                  <button className="ml-2 p-2 bg-teal-500 text-white rounded-md">➤</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpCenter;
