import React, { useState } from "react";

const SurveyForm = () => {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("1");
  const [major, setMajor] = useState("");
  const [workYes, setWorkYes] = useState(false);
  const [workNo, setWorkNo] = useState(false);
  const [fieldOfWork, setFieldOfWork] = useState("");

  const toggleCheckboxes = (checkBox) => {
    if (checkBox === "yes") {
      setWorkNo(false);
    } else {
      setWorkYes(false);
    }
  };

  return (
    <main className="main">
      <div className="surveyForm">
        <div className="surveyFormItem">
          <label>Gender:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="surveyFormItem">
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min="14"
            max="100"
            required
          />
        </div>
        <div className="surveyFormItem">
          <label>Course:</label>
          <select value={course} onChange={(e) => setCourse(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div className="surveyFormItem">
          <label>Major:</label>
          <input
            type="text"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            required
          />
        </div>
        <div className="surveyFormItem">
          <label>Do you plan to work in your field of study?</label>
          <div className="sfcheckbox">
            <input
              type="checkbox"
              checked={workYes}
              onChange={() => {
                setWorkYes(!workYes);
                toggleCheckboxes("yes");
              }}
            />
            <label htmlFor="workyes">Yes</label>
          </div>
          <div className="sfcheckbox">
            <input
              type="checkbox"
              checked={workNo}
              onChange={() => {
                setWorkNo(!workNo);
                toggleCheckboxes("no");
              }}
            />
            <label htmlFor="workno">No</label>
          </div>
        </div>
        <div className="surveyFormItem">
          <label>If not, in which field do you plan to work?</label>
          <input
            type="text"
            value={fieldOfWork}
            onChange={(e) => setFieldOfWork(e.target.value)}
          />
        </div>
        <div className="surveyFormItem">
          <button className="surveysavebtn">Save</button>
        </div>
      </div>
    </main>
  );
};

export default SurveyForm;
