import './App.css';
import React, { useState } from 'react';
import { useStateWithCallbackLazy } from 'use-state-with-callback';


function App () {
  const [weeklyTaskAssignments, setWeeklyTaskAssignments] = useStateWithCallbackLazy([]);
  const [dailyWorkers, setDailyWorkers] = useStateWithCallbackLazy([]);
  const [dailyJobs, setDailyJobs] = useState(['HG', 'B1', 'B2', '#1']);


  const randomize = (arry) => {
    let j, x, index;
    for (index = arry.length - 1; index > 0; index--) {
      j = Math.floor(Math.random() * (index + 1));
      x = arry[index];
      arry[index] = arry[j];
      arry[j] = x;
    }
    return arry;
  }


  const assignJobs = () => {
    setWeeklyTaskAssignments([], () => {
      const randomizedJobs = randomize(dailyJobs);
      const randomizedWorkers = randomize(dailyWorkers)
      const container = [];
      for (let i = 0; i < randomizedJobs.length; i++) {
        let pair = `${randomizedWorkers[i]}: ${randomizedJobs[i]}`;
        container.push(pair);
      }
      const cleanedContainer = [...new Set(container)];
      setWeeklyTaskAssignments(cleanedContainer);
    });
  }

  const setEmployees = (e) => {
    e.preventDefault();
    const dailyEmployees = Array.from(document.querySelectorAll('.employee'));
    dailyEmployees.forEach((item) => dailyWorkers.push(item.value));
    const randomizedWorkers = randomize(dailyWorkers);
    const cleanRandomWorkers = [...new Set(randomizedWorkers)];
    setDailyWorkers(cleanRandomWorkers);
    console.log(dailyWorkers);
  }

  const clearEmployees = (e) => {
    e.preventDefault();
    setDailyWorkers([], () => {
      const dailyEmployees = Array.from(document.querySelectorAll('.employee'));
      dailyEmployees.forEach((item) => {
        item.value = '';
      });
    });
  }


  // const setJobs = (e) => {
  //   e.preventDefault();
  //   const dailyTasks = Array.from(document.querySelectorAll('.jobs'));
  //   dailyTasks.forEach((item) => dailyJobs.push(item.value));
  //   const randomizedJobs = randomize(dailyTasks);
  //   setDailyJobs(randomizedJobs);
  //   console.log('Randomized Jobs:', dailyJobs);
  // }

  const renderJobsList = () => {
    return dailyJobs.map((item, idx) => {
      return <li key={idx} >{item}</li>
    })
  }

  const renderAssignments = () => {
    return weeklyTaskAssignments.map((item, idx) => {
      return <li key={idx} >{item}</li>
    })
  }

  const addEmployee = (e) => {
    e.preventDefault();
    const newEmployeeLabel = document.createElement('label');
    newEmployeeLabel.classList.add('employee-field-label');
    newEmployeeLabel.textContent = 'Employee';
    const newEmployeeInput = document.createElement('input');
    newEmployeeInput.type = 'text';
    newEmployeeInput.classList.add('employee');

    newEmployeeLabel.appendChild(newEmployeeInput);

    const employeeForm = document.querySelector('.employee-form'); //Parent node
    const refNode = document.querySelector('.employee-form-controls'); //Reference node
    employeeForm.insertBefore(newEmployeeLabel, refNode);
  }

  const removeEmployeeField = (e) => {
    e.preventDefault();
    const employeeFields = Array.from(document.querySelectorAll('.employee-field-label'));
    const lastEmployeeField = employeeFields.pop();
    lastEmployeeField.remove();
  }

  return (
    <div className="App">
      <header className="App-header">
        <form className="employee-form">
          <label className="employee-field-label">
            Employee
            <input
              className="employee"
              type="text" />
          </label>
          <label className="employee-field-label">
            Employee
            <input
              className="employee"
              type="text" />
          </label>
          <label className="employee-field-label">
            Employee
            <input
              className="employee"
              type="text" />
          </label>
          <label className="employee-field-label">
            Employee
            <input
              className="employee"
              type="text" />
          </label>
          <label className="employee-field-label">
            Employee
            <input
              className="employee"
              type="text" />
          </label>
          <div className="employee-form-controls">
            <div className="add-and-remove">
              <button className="add-btn" onClick={addEmployee}>Add field</button>
              <button className="remove-btn" onClick={removeEmployeeField}>Remove last</button>
            </div>
            <div className="clear-and-set">
              <button className="set-employees-btn" onClick={setEmployees}>Set employees</button>
              <button className="clear-employees-btn" onClick={clearEmployees}>Reset</button>
            </div>
          </div>
        </form>


        <div className="job-assignments">
          <h3>Assignments</h3>
          <ul>
            {renderAssignments()}
          </ul>
        </div>

        <div className="jobs-list">
          <h3>Current Jobs List</h3>
          <ul>
            {renderJobsList()}
          </ul>
        </
        div>
        {/* <form className="jobs-form">
          <label>
            Job
            <input
              className="jobs"
              type="text" />
          </label>
          <button onClick={setJobs}>Add job</button>
        </form> */}
        <button
          className="assign-jobs-btn"
          onClick={assignJobs}>Assign Jobs</button>
      </header>
    </div>
  );
}

export default App;
