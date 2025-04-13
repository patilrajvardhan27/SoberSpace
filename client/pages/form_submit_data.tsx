import React, { JSX, useState } from "react";



export  const formatSubmittedData = (data: any): JSX.Element => {
    return (
      <div className="bg-purple-500 text-white p-4 rounded-xl text-sm space-y-2 max-w-md">
        <p>
          <strong>1. Name:</strong> {data.name}
        </p>
        <p>
          <strong>2. Age:</strong> {data.age}
        </p>
        <p>
          <strong>3. Gender:</strong> {data.gender}
        </p>
        <p>
          <strong>4. Email:</strong> {data.email}
        </p>
        <p>
          <strong>5. Occupation:</strong> {data.occupation}
        </p>
        <p>
          <strong>6. Location:</strong> {data.location}
        </p>

        <div>
          <strong>7. Addictions:</strong>
          <ul className="list-disc list-inside ml-4">
            {data.addictions.map((addiction: any, index: number) => (
              <li key={index}>
                {addiction.name}: {addiction.intake}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <strong>8. Lifestyle:</strong>
          <ul className="list-disc list-inside ml-4">
            <li>Sleep Hours: {data.lifestyle.sleepHours}</li>
            <li>Exercise Frequency: {data.lifestyle.exerciseFrequency}</li>
          </ul>
        </div>
      </div>
    );
  };

 