import * as actionTypes from '../actions/actionTypes';

const initialState = {
  tasks: [],
  loading: false,
  failureMessage: ''
};

const updateTasksArrayOnPurchase = (tasksArray, taskId) => {
  const tasks = [...tasksArray];
  const targetTask = tasks.find(task => parseInt(task.id) === parseInt(taskId));
  targetTask['status'] = 'Loading';
  return tasks;
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.START_PURCHASE_AND_SPINNER:
      const newTasks = updateTasksArrayOnPurchase(state.tasks, action.taskId);
      console.log(newTasks);
      return { ...state, loading: false, tasks: newTasks  };

    case actionTypes.FETCH_TASKS_START:
      return { ...state, loading: true };

    case actionTypes.FETCH_TASKS_SUCCESS:
      return { ...state, tasks: action.tasks, loading: false };
      
    case actionTypes.FETCH_TASKS_FAILURE:
      return { ...state, loading: false, failureMessage: action.message };

    default: return state;
  }
};

export default reducer;