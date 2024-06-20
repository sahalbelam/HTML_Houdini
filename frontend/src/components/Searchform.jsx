import axios from "axios";
import { useState } from "react";
import 'C:/cohort2.0/projects/cvmu_scrapper/frontend/src/App.css'


export const Searchform = () => {
  const [seatno, setSeatno] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get("http://localhost:3000/result/"+seatno);
      setResult(response.data);
    } catch (error) {
      console.error("Error fetching the result:", error);
    }
  };

  return (
    <div className="container">
      <input
        className="input"
        type="number"
        value={seatno}
        onChange={(e) => {
          setSeatno(e.target.value);
        }}
        placeholder="Enter the seat no"
      />
      <button className="button" onClick={handleSearch}>Search</button>
      {result && (
        <div className="result-container">
          <h3 className="title">Results for Seat No: {seatno}</h3>
          <p className="paragraph"><strong>Student Name:</strong> {result.studentName}</p>
          <p className="paragraph"><strong>College Name:</strong> {result.collegeName}</p>
          <p className="paragraph"><b /><strong>SGPA:</strong> {result.SGPA}</p>
        </div>
      )}
    </div>
  );
};

