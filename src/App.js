
import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [inputValue, setInputValue] = useState('');

  const [pValue, setPValue] = useState([]); // this state will change based on what is clicked on the dropdown menu, this is the actual display state

  const [fetchValue, setFetchValue] = useState('');

  const [arrValue, setArrValue] = useState([]); // for all tasks, default view

  // const [displayFetchValue, setDisplayFetchValue] =
  // useState("");

  const [completeValue, setCompleteValue] = useState([]);// for my complete task tru false value

  const [incomopleteValue, setIncompleteValue] = useState([]);// for my incomplete tasks true false values

  const [checkedState, setCheckedState] = useState(
    [],
  );

  function handleChange(position) {
    const tasks = document.querySelectorAll('.tasks');
    const updatedCheckedState = checkedState.map((item, index) => (index === position ? !item : item));
    //if item === true add that css class to it?
    for(let i = 0; i < tasks.length; i++){

    }
    
    setCheckedState(updatedCheckedState);
  }
  // setPValue(..arrValue)

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=5')
      .then((res) => res.json())
      .then((parsed) => {
        console.log(parsed.results[0].name.first);
        const firstName = parsed.results[0].name.first;

        setFetchValue(firstName);
      })
      .catch((err) => console.log(err, 'err'));
  }, []);

  const inputFunctionHandler = (event) => {
    setInputValue(event.target.value);
  };

  const onCLickFunction = (event) => {
    event.preventDefault();
    const newArray = [...pValue, inputValue];
    setArrValue(newArray);
    setPValue(newArray);
    const testArray = [...checkedState];
    testArray.push(false);
    setCheckedState(testArray);
    console.log(pValue);
    console.log(checkedState);

    // call pvalue function
    // set the perameters to theinPUTvalue
  };
  function deleteFunction(element) {
    const newArray = pValue.filter((item) => item !== element);

    setPValue(newArray);
  }
  // function showData(){

  //   setDisplayFetchValue(fetchValue);

  // }
  function showIncomplete(e) {
    e.preventDefault();
    const tempCheckState = [...checkedState];
    const incompletedTasks = [];
    console.log('before', incompletedTasks, tempCheckState);

    for (let i = 0; i < tempCheckState.length; i++) {
      if (!tempCheckState[i]) {
        incompletedTasks.push(arrValue[i]);
      }
    }

    console.log(incompletedTasks, tempCheckState);
    setPValue(incompletedTasks);
    // so try to remove the checkBox all together on click. That will fix the problem
  }
  function showComplete(e) {
    e.preventDefault();
    const tempCheckState = [...checkedState];
    
    const completedTasks = [];

    for (let i = 0; i < tempCheckState.length; i++) {
      if (tempCheckState[i]) {
        completedTasks.push(arrValue[i]);
      }
    }
    setPValue(completedTasks);
  }
  function showAll(e) {
    e.preventDefault();
    setPValue(arrValue);
  }
  
  function viewOnClick(e) {
    e.preventDefault();
  }

  return (
    <div className="App">
      <h1>React day 1</h1>
      <form>
        <input value={inputValue} onChange={inputFunctionHandler} />
        <button onClick={onCLickFunction}>Submit</button>
        <div className="dropdown">
          <button className="dropbtn" onClick={viewOnClick}>View</button>
          <div className="dropdown-content">
            <button onClick={showAll}>All</button>
            <button onClick={showComplete}>Complete</button>
            <button onClick={showIncomplete}>Incomplete</button>
          </div>
        </div>
      </form>
      {/* <button onClick ={showData}> Display </button> */}
      <p />
      <p>{/* displayFetchValue */}</p>
      <ul id="list">
        {
    pValue.map((element, index) => (
      <li className = {`tasks${checkedState[index]  ? 'crossed': ''}`}>
        {' '}
        {' '}
        {/* why did i put these here?? */}
        <button onClick={() => deleteFunction(element)}>
          {' '}
          Delete
        </button>
        {' '}
        {element}
        {' '}
        <input type="checkbox" id={`checkBox${index}`} checked={checkedState[index]} className= 'checkbox'  onChange ={() => handleChange(index)} />
        <label htmlFor="checkbox">Completed</label>
      </li>
    ))
}
      </ul>
    </div>
  );
}
// export default App;
// add the crossed out class, remove the check mark boxes for 'complete' and 'incomplete' functions
// maybe when the all tab is clicked the checks marked ones will be crossed out, when the complete tap is clicked all are crossed out and there are no check mark buttons, whne the incomplete tab is clicked the checkmark boxes are removed
// OR alter the checked state so it is correct everytime.  

// 1. maybe make a copy if the checked State
// 2. remove the same indexes from the copy of the checked that were removed from the array.
// 3

// OR on click for complete set ALL values checked, onclick for incomeplete remove all checked values. 

// just like tou did with pValue, useing it as a temp state that changes, maybe try to do that with checkedState or some other one. 
// permCheckedState will be === to checkedState for All, then you can alter checkedSTate all you want and then do checkedSate === permaCheckedstate when the all tab is clicked
// will the true/false value actually change the checkmarks? How can I make that happen?



