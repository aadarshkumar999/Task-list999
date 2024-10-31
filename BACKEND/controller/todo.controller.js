// import Todo from "../model/todo.model.js";

// export const createTodo = async (req, res) => {
//   console.log(req.body);
  
//   const todo = new Todo({
//     text: req.body.text,
//     completed: req.body.completed,
//     //user: req.user._id, // associate todo with loggedin user
//   });

//   try {
//     const newTodo = await todo.save();
//     res.status(201).json({ message: "Todo Created Successfully", newTodo });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ message: "Error occuring in todo creation" });
//   }
// };

  import Todo from "../model/todo.model.js";

  // export const createTodo = async (req, res) => {

  //   const todo = new Todo({
  //     text: req.body.completed,
  //     completed:req.body.completed,
  //     user: req.user._id, //associcate todo with loggedin user
  //   })

  //   try {
  //     const { text, completed } = req.body; // Ensure `text` and `completed` are provided in the request body
      
  //     // Validate presence of both fields
  //     if (text == null || completed == null) {
  //       return res.status(400).json({ error: "Both text and completed fields are required." });
  //     }

  //     const newTodo = new Todo({ text, completed });
  //     await newTodo.save();
  //     res.status(201).json(newTodo);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: "An error occurred while creating the todo." });
  //   }
  // };
  
  //edit

  // todo.controller.js
export const createTodo = async (req, res) => {
  try {
      const userId = req.user._id; // Authentication middleware should populate req.user
      const { text, completed } = req.body;

      const newTodo = await Todo.create({ text, completed, user: userId });
      res.status(201).json(newTodo);
  } catch (error) {
      console.error("Failed to create todo:", error);
      res.status(400).json({ error: error.message });
  }
};

  export const getTodos =async(req, res) =>{
    try {
      const todos = await Todo.find({user: req.user._id});
      res.status(201).json({message: "Todo Featching successfully", todos})
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Errorin featching todo"})
      
    }
  }

  export const updateTodos = async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
  
      // Perform the update and convert the result to a plain object
      const updatedTodo = await Todo.findByIdAndUpdate(id, updates, { new: true }).lean();
  
      if (!updatedTodo) {
        return res.status(404).json({ message: "Todo not found" });
      }
  
      res.json(updatedTodo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while updating the todo." });
    }
  };
  
  export const deleteTodo = async (req, res) => {
    try {
        // Find and delete the todo by ID
        const todo = await Todo.findByIdAndDelete(req.params.id);

        // Check if the todo was not found
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        // Send success response if deletion was successful
        res.status(200).json({ message: "Todo deleted successfully", todo });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred while deleting the todo." });
    }
};

