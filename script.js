const grocerySubmit = document.getElementById('addGrocery');
const list = document.getElementById('list');
const clearBtn = document.getElementById('clear');

// Instantiate default state value:
const initialState = {
    groceries: []
};

// Establish the reducer. Takes initial state value and an action as arguments.
const groceryReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'grocery/add':
            return {
                ...state,
                groceries: [
                    ...state.groceries,
                    {
                        text: action.text
                    }
                ]
            };
        case 'grocery/clear':
            return {
                ...state,
                groceries: []
            };
        default:
            return state;
    }
};

// Create the Redux store
let store = Redux.createStore(groceryReducer);

// Function to clear the list
const clearList = () => {
    store.dispatch({
        type: 'grocery/clear'
    });
};

// Function to add a grocery item
const addGrocery = (text) => {
    store.dispatch({
        type: 'grocery/add',
        text
    });
};

// Render the grocery list
const renderList = () => {
    const state = store.getState();
    list.innerHTML = '';
    state.groceries.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item.text;
        list.appendChild(li);
    });
};

// Subscribe to store updates
store.subscribe(renderList);

// Event listener for adding groceries
grocerySubmit.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('groceryInput');
    const text = input.value.trim();
    if (text) {
        addGrocery(text);
        input.value = '';
    }
});

// Event listener for clearing the list
clearBtn.addEventListener('click', clearList);

// Additional function for adding groceries using another button or method
const newGrocery = (e) => {
    e.preventDefault();
    const groceryText = document.getElementById('newItem').value.trim();
    if (groceryText) {
        store.dispatch({
            type: 'grocery/add',
            text: groceryText
        });
        console.log(store.getState())
        document.getElementById('newItem').value = '';
    }
};

// Event listener for another form submission
document.getElementById('newGroceryForm').addEventListener('submit', newGrocery);
