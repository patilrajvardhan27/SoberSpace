import React, { useState } from "react";

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
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [occupation, setOccupation] = useState("");
  const [location, setLocation] = useState("");
  const [selectedAddictions, setSelectedAddictions] = useState<string[]>([]);
  const [intake, setIntake] = useState<{ [key: string]: string }>({});
  const [medicalConditions, setMedicalConditions] = useState<string[]>([]);
  const [mentalHealthIssues, setMentalHealthIssues] = useState<string[]>([]);
  const [sleepHours, setSleepHours] = useState("");
  const [exerciseFrequency, setExerciseFrequency] = useState("");
  const [financialImpact, setFinancialImpact] = useState("");
  const [motivationLevel, setMotivationLevel] = useState("");
  const [rehabHistory, setRehabHistory] = useState("");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userData = {
      name,
      age,
      gender,
      occupation,
      location,
      addictions: selectedAddictions.map((addiction) => ({
        name: addiction,
        intake: intake[addiction] || "Not provided",
      })),
      medicalConditions,
      mentalHealthIssues,
      lifestyle: {
        sleepHours,
        exerciseFrequency,
        financialImpact,
      },
      motivationLevel,
      rehabHistory,
    };
    console.log(userData);
    alert(`Submitted! Check console for details.`);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[url('/background.png')] bg-cover bg-center">
      <div className="absolute inset-0 backdrop-blur-sm"></div>

      <div className="relative z-10 mt-10 mb-10 bg-[var(--background)] text-[var(--foreground)] p-6 md:p-10 rounded-2xl shadow-xl w-full max-w-lg border border-[var(--border)]">
        <h2 className="text-2xl font-bold text-[var(--special)] text-center mb-4">
          Addiction Report Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Personal Information */}
          <div>
            <label className="block text-sm text-[var(--special)] ">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full mt-1 p-2 border rounded-md text-[var(--muted-foreground)]"
              placeholder="Enter your name"
            />
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm text-[var(--special)]">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                min="12"
                className="w-full mt-1 p-2 border rounded-md text-[var(--muted-foreground)]"
                placeholder="Enter your age"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm text-[var(--special)]">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
                className="w-full mt-1 p-2 border rounded-md text-[var(--muted-foreground)]"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-[var(--special)]">
              Occupation
            </label>
            <input
              type="text"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md text-[var(--muted-foreground)]"
              placeholder="Enter your occupation"
            />
          </div>

          <div>
            <label className="block text-sm text-[var(--special)]">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md text-[var(--muted-foreground)]"
              placeholder="Enter your city/country"
            />
          </div>

          {/* Addiction Intake */}
          <div>
            <label className="block text-sm text-[var(--special)] ">
              Select Addictions
            </label>
            <div className="max-h-60 overflow-y-auto p-2 border rounded-lg  ">
              {addictions.map((addiction) => (
                <div key={addiction} className="p-2">
                  <label className="flex items-center space-x-2 ">
                    <input
                      type="checkbox"
                      value={addiction}
                      checked={selectedAddictions.includes(addiction)}
                      onChange={() => handleCheckboxChange(addiction)}
                      className="w-5 h-5 "
                    />
                    <span className="text-sm ">{addiction}</span>
                  </label>
                  {selectedAddictions.includes(addiction) && (
                    <input
                      type="number"
                      min="0"
                      value={intake[addiction] || ""}
                      onChange={(e) =>
                        handleIntakeChange(addiction, e.target.value)
                      }
                      className="mt-2 w-full p-2 border rounded-md text-[var(--muted-foreground)]"
                      placeholder={`Enter daily intake (${
                        addiction.split(" ")[1]
                      })`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Health & Lifestyle */}
          <div>
            <label className="block text-sm text-[var(--special)]">
              Sleep Hours Per Night
            </label>
            <input
              type="number"
              min="0"
              max="24"
              value={sleepHours}
              onChange={(e) => setSleepHours(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md text-[var(--muted-foreground)]"
              placeholder="Enter hours of sleep"
            />
          </div>

          <div>
            <label className="block text-sm text-[var(--special)]">
              Exercise Frequency (days/week)
            </label>
            <input
              type="number"
              min="0"
              max="7"
              value={exerciseFrequency}
              onChange={(e) => setExerciseFrequency(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md text-[var(--muted-foreground)]"
              placeholder="How often do you exercise?"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[var(--secondary)] text-[var(--primary)] py-2 rounded-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
