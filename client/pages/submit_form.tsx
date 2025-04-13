// components/SoberspaceForm.tsx
import React, { useState } from "react";

export const addictions = [
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

const SoberspaceForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [occupation, setOccupation] = useState("");
  const [location, setLocation] = useState("");
  const [selectedAddictions, setSelectedAddictions] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [intake, setIntake] = useState<{ [key: string]: string }>({});
  const [sleepHours, setSleepHours] = useState("");
  const [exerciseFrequency, setExerciseFrequency] = useState("");
  const [chatVisible, setChatVisible] = useState(false);
  const [chatMessages, setChatMessages] = useState<
    { type: "user" | "ai"; content: string }[]
  >([]);
  const [emailError, setEmailError] = useState("");

  const handleCheckboxChange = (addiction: string) => {
    setSelectedAddictions((prev) =>
      prev.includes(addiction)
        ? prev.filter((item) => item !== addiction)
        : [...prev, addiction]
    );

    if (selectedAddictions.includes(addiction)) {
      setIntake((prev) => {
        const updated = { ...prev };
        delete updated[addiction];
        return updated;
      });
    }
  };

  const handleIntakeChange = (addiction: string, amount: string) => {
    setIntake((prev) => ({ ...prev, [addiction]: amount }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (!value.endsWith("@gmail.com")) {
      setEmailError("Email must end with @gmail.com");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setChatVisible(true);

    const userData = {
      name,
      age,
      gender,
      email,
      occupation,
      location,
      addictions: selectedAddictions.map((addiction) => ({
        name: addiction,
        intake: intake[addiction] || "Not provided",
      })),
      lifestyle: {
        sleepHours,
        exerciseFrequency,
      },
    };

    setChatMessages((prev) => [
      ...prev,
      {
        type: "user",
        content: JSON.stringify(userData),
      },
    ]);

    try {
      const response = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      setChatMessages((prev) => [...prev, { type: "ai", content: data.result }]);
    } catch (error) {
      console.error("Submission Error:", error);
      setChatMessages((prev) => [
        ...prev,
        {
          type: "ai",
          content: "Error submitting form. Please try again later.",
        },
      ]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-lg text-[var(--special)]">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full mt-2 p-3 border rounded-md text-[var(--muted-foreground)]"
          placeholder="Enter your name"
        />
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          <label className="block text-lg text-[var(--special)]">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            min="12"
            className="w-full mt-2 p-3 border rounded-md text-[var(--muted-foreground)]"
            placeholder="Enter your age"
          />
        </div>
        <div className="flex-1">
          <label className="block text-lg text-[var(--special)]">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            className="w-full mt-2 p-3 border rounded-md text-[var(--muted-foreground)]"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label className="text-lg text-[var(--special)]">Email</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
          className="w-full mt-2 p-3 border rounded-md text-[var(--muted-foreground)]"
          placeholder="Enter your email (must be @gmail.com)"
        />
        {emailError && <p className="text-sm text-red-500">{emailError}</p>}
      </div>

      <div>
        <label className="block text-lg text-[var(--special)]">Occupation</label>
        <input
          type="text"
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
          className="w-full mt-2 p-3 border rounded-md text-[var(--muted-foreground)]"
          placeholder="Enter your occupation"
        />
      </div>

      <div>
        <label className="block text-lg text-[var(--special)]">Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full mt-2 p-3 border rounded-md text-[var(--muted-foreground)]"
          placeholder="Enter your city/country"
        />
      </div>

      <div>
        <label className="block text-lg text-[var(--special)]">Select Addictions</label>
        <div className="max-h-80 overflow-y-auto p-3 border rounded-lg">
          {addictions.map((addiction) => (
            <div key={addiction} className="p-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  value={addiction}
                  checked={selectedAddictions.includes(addiction)}
                  onChange={() => handleCheckboxChange(addiction)}
                  className="w-6 h-6"
                />
                <span className="text-lg">{addiction}</span>
              </label>
              {selectedAddictions.includes(addiction) && (
                <input
                  type="number"
                  min="0"
                  value={intake[addiction] || ""}
                  onChange={(e) =>
                    handleIntakeChange(addiction, e.target.value)
                  }
                  className="mt-2 w-full p-3 border rounded-md text-[var(--muted-foreground)]"
                  placeholder={`Enter daily intake (${addiction.split(" ")[1]})`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-lg text-[var(--special)]">Sleep Hours Per Night</label>
        <input
          type="number"
          min="0"
          max="24"
          value={sleepHours}
          onChange={(e) => setSleepHours(e.target.value)}
          className="w-full mt-2 p-3 border rounded-md text-[var(--muted-foreground)]"
          placeholder="Enter hours of sleep"
        />
      </div>

      <div>
        <label className="block text-lg text-[var(--special)]">Exercise Frequency (days/week)</label>
        <input
          type="number"
          min="0"
          max="7"
          value={exerciseFrequency}
          onChange={(e) => setExerciseFrequency(e.target.value)}
          className="w-full mt-2 p-3 border rounded-md text-[var(--muted-foreground)]"
          placeholder="How often do you exercise?"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[var(--secondary)] text-[var(--primary)] py-3 rounded-lg text-lg font-semibold"
      >
        Submit
      </button>
    </form>
  );
};

export default SoberspaceForm;
