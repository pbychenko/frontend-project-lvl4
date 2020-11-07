import React from 'react';
// import NewTaskForm from './NewTaskForm.jsx';
// import Tasks from './Tasks.jsx';

const App = ({data}) => (
  <div className="col-5">
    {data.channels[0].name}
    
    {console.log(data)}
  </div>
);
export default App;