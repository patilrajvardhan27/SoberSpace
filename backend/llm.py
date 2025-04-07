import os
from openai import OpenAI
from dotenv import load_dotenv
from models import UserData

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def get_llm_response(user_data: UserData) -> str:
    prompt = f"""
    Analyze the following user addiction data and provide detailed health insights in the following point-wise format:

    1. Daily Consumption Analysis
    - Breakdown of daily intake for each substance.
    - Comparison with standard consumption limits (if applicable).
    - Warning signs of excessive use.

    2. Health Risk Assessment
    - Short-term and long-term health risks based on intake levels.
    - Potential withdrawal symptoms if usage stops suddenly.
    - Impact on mental and physical health.

    3. Addiction Severity Score
    - Categorization into mild, moderate, or severe addiction based on reported consumption.
    - Risk of dependency and tolerance development.

    4. Usage Trends & Patterns
    - Weekly/monthly trend analysis (if historical data is available).
    - Identifying patterns (e.g., increase on weekends, decrease on workdays).
    - Predicting future risk based on trends.

    5. Comparison with Global/Regional Averages
    - How the user's consumption compares to national or global averages.
    - Insights from public health data sources.

    6. Recovery & Reduction Plan
    - Personalized step-down approach to reduce consumption.
    - Suggested alternative habits to replace substance use.
    - Timeline for safe withdrawal (if applicable).

    7. Co-Occurring Substance Use
    - Analysis of multiple substance use interactions (e.g., alcohol & sedatives).
    - Risks of combined substance effects.

    8. Psychological & Behavioral Insights
    - Potential underlying reasons for usage (stress, social factors, etc.).
    - AI-generated recommendations for behavioral therapy.

    9. Relapse Risk Prediction
    - Probability of relapse based on historical usage patterns.
    - Identifying high-risk triggers for relapse.

    10. Impact on Productivity & Lifestyle
    - How substance use might be affecting work, sleep, and daily activities.
    - Personalized recommendations for improving lifestyle balance.

    11. Estimated Life Expectancy
    - Approximate years of life expectancy based on current usage and lifestyle.
    - Comparison to average life expectancy of same age group.

    12. Organ Health Rating (Scale 0–10)
    - Liver health: ?
    - Lungs health: ?
    - Brain health: ?
    - Heart health: ?
    - Kidneys health: ?
    (Where 0 = extremely poor, 10 = excellent)

    User Information:
    Name: {user_data.name}
    Age: {user_data.age}
    Gender: {user_data.gender}
    Email: {user_data.email}
    Occupation: {user_data.occupation}
    Location: {user_data.location}

    Addictions:
    {user_data.addictions}

    Lifestyle:
    Sleep Hours: {user_data.lifestyle.sleepHours}
    Exercise Frequency: {user_data.lifestyle.exerciseFrequency}
    """

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a health and addiction analysis assistant."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7
    )

    return response.choices[0].message.content
