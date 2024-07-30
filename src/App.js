import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    height: '',
    weight: '',
    family_history_with_overweight: '',
    FAVC: '',
    FCVC: '',
    NCP: '',
    CAEC: '',
    SMOKE: '',
    CH2O: '',
    FAF: '',
    TUE: '',
    CALC: '',
    MTRANS: '',
  });

  const [result, setResult] = useState('');
  const [fact, setFact] = useState('');

  const facts = [
    "It takes the brain 20 minutes to sense that a person is full.",
    "Women with post-traumatic stress disorder are more likely to be overweight or obese.",
    "One in three U.S. children and teens are overweight or obese.",
    "Childhood obesity affects self-esteem, which can affect employment and higher education later in life.",
    "Obesity prevalence was highest among U.S. adults with a high school diploma or some college education."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomFact = facts[Math.floor(Math.random() * facts.length)];
      setFact(randomFact);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResult(`Prediction: ${data.prediction}`);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setResult('An error occurred while fetching the prediction.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Obesity Risk Prediction</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="form-column">
            <div>
              <label>Gender:</label>
              <select name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label>Age:</label>
              <input 
                type="number" 
                name="age" 
                value={formData.age} 
                onChange={handleChange} 
                min="0" 
                required 
              />
            </div>
            <div>
              <label>Height (meters):</label>
              <input 
                type="number" 
                step="0.01" 
                name="height" 
                value={formData.height} 
                onChange={handleChange} 
                min="0" 
                required 
              />
            </div>
            <div>
              <label>Weight (kg):</label>
              <input 
                type="number" 
                step="0.1" 
                name="weight" 
                value={formData.weight} 
                onChange={handleChange} 
                min="0" 
                required 
              />
            </div>
            <div>
              <label>Family History with Overweight:</label>
              <select name="family_history_with_overweight" value={formData.family_history_with_overweight} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
            <div>
              <label>Frequent Consumption of High-Caloric Food (FAVC):</label>
              <select name="FAVC" value={formData.FAVC} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
            <div>
              <label>Frequency of Vegetable Consumption (FCVC):</label>
              <input 
                type="number" 
                step="0.1" 
                name="FCVC" 
                value={formData.FCVC} 
                onChange={handleChange} 
                min="1" 
                max="3" 
                required 
              />
            </div>
            <div>
              <label>Number of Main Meals (NCP):</label>
              <input 
                type="number" 
                step="0.1" 
                name="NCP" 
                value={formData.NCP} 
                onChange={handleChange} 
                min="0" 
                required 
              />
            </div>
          </div>
          <div className="form-column">
            <div>
              <label>Consumption of Food Between Meals (CAEC):</label>
              <select name="CAEC" value={formData.CAEC} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="no">No</option>
                <option value="Sometimes">Sometimes</option>
                <option value="Frequently">Frequently</option>
                <option value="Always">Always</option>
              </select>
            </div>
            <div>
              <label>Smoking Habit (SMOKE):</label>
              <select name="SMOKE" value={formData.SMOKE} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
            <div>
              <label>Daily Water Intake (liters) (CH2O):</label>
              <input 
                type="number" 
                step="0.1" 
                name="CH2O" 
                value={formData.CH2O} 
                onChange={handleChange} 
                min="0" 
                required 
              />
            </div>
            <div>
              <label>Physical Activity Frequency (FAF):</label>
              <input 
                type="number" 
                step="0.1" 
                name="FAF" 
                value={formData.FAF} 
                onChange={handleChange} 
                min="0" 
                required 
              />
            </div>
            <div>
              <label>Time Using Technology Devices (hours) (TUE):</label>
              <input 
                type="number" 
                step="0.1" 
                name="TUE" 
                value={formData.TUE} 
                onChange={handleChange} 
                min="0" 
                required 
              />
            </div>
            <div>
              <label>Alcohol Consumption (CALC):</label>
              <select name="CALC" value={formData.CALC} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="no">No</option>
                <option value="Sometimes">Sometimes</option>
                <option value="Frequently">Frequently</option>
                <option value="Always">Always</option>
              </select>
            </div>
            <div>
              <label>Transportation Used (MTRANS):</label>
              <select name="MTRANS" value={formData.MTRANS} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="Automobile">Automobile</option>
                <option value="Motorbike">Motorbike</option>
                <option value="Bicycle">Bicycle</option>
                <option value="Walking">Walking</option>
                <option value="Public Transportation">Public Transportation</option>
              </select>
            </div>
          </div>
        </div>
        <button type="submit">Predict</button>
      </form>
      <div className="result">
        <h2>{result}</h2>
        <p>{fact}</p>
      </div>
    </div>
  );
}

export default App;
