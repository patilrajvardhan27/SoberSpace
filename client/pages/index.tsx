// index.tsx
import React, { JSX, useState } from "react";
import { formatSubmittedData } from "./form_submit_data";
import SoberspaceForm from "./submit_form";

const addictions = [
  "Alcohol (ml per day)",
  "Nicotine (cigarettes/vapes per day)",
  "Caffeine (cups per day)",
  "Cannabis (grams per day)",
  "Opioids (mg per day)",
  "Stimulants (mg per day)",
  "Hallucinogens (times per week)",
  "Sedatives (mg per day)",
  "Inhalants (times per week)",
];

export default function AddictionForm() {
  const [chatVisible, setChatVisible] = useState(false);
  const [chatMessages, setChatMessages] = useState<
    { type: "user" | "ai"; content: string }[]
  >([]);

  const isJSONString = (str: string) => {
    try {
      const parsed = JSON.parse(str);
      return parsed && typeof parsed === "object";
    } catch (e) {
      return false;
    }
  };

  const formatLLMResponse = (text: string): JSX.Element[] => {
    if (!text) {
      return [<div key="empty" className="text-red-500">No response from AI.</div>];
    }
    const lines = text.split(/\d+\.\s/).filter(Boolean);

    return lines.map((block, idx) => {
      const [titleLine, ...rest] = block.split(" - ");
      const content = rest.join(" - ").split(" - ");

      return (
        <div key={idx} className="mb-4">
          <h3 className="font-semibold text-purple-700 mb-1">
            {idx + 1}. {titleLine.trim()}
          </h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
            {content.map((point, i) => (
              <li key={i}>{point.trim()}</li>
            ))}
          </ul>
        </div>
      );
    });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[url('/background.png')] bg-cover bg-center px-6">
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      <div className="relative z-10 flex justify-center items-start w-full max-w-4xl">
        {!chatVisible ? (
          <div className="bg-[var(--background)] text-[var(--foreground)] p-8 md:p-12 rounded-2xl shadow-xl w-full max-w-2xl border border-[var(--border)]">
            <h2 className="text-3xl font-bold text-[var(--special)] text-center mb-6">
              Addiction Report Form
            </h2>
            <SoberspaceForm
              setChatVisible={setChatVisible}
              chatMessages={chatMessages}
              setChatMessages={setChatMessages}
            />
          </div>
        ) : (
          <div className="bg-[var(--background)] text-[var(--foreground)] p-8 rounded-2xl shadow-xl w-full max-w-2xl border border-[var(--border)]">
            <h3 className="text-2xl font-bold text-[var(--special)] mb-4">
              Chat
            </h3>
            <div className="h-80 overflow-y-auto p-3 border rounded-lg space-y-4 bg-white">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] p-3 rounded-xl text-sm leading-relaxed shadow-md ${
                      msg.type === "user"
                        ? "bg-purple-600 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {msg.type === "ai"
                      ? formatLLMResponse(msg.content)
                      : isJSONString(msg.content)
                      ? formatSubmittedData(JSON.parse(msg.content))
                      : msg.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
