import { useState } from 'react';
import { ListGroup, InputGroup, Form, Button } from 'react-bootstrap'
import './index.css'

const Tasks = ({ tasks, editTask, deleteTask }) => {
  const [description, setDescription] = useState('')
  const [editingTaskId, setEditingTaskId] = useState()

  const handleEdit = (task) => {
    if (editingTaskId) {
      editTask({ ...task, description })
      setEditingTaskId()
      return
    }
    setDescription(task.description)
    setEditingTaskId(task._id)
  }

  return (
    <ListGroup style={{ width: '500px', margin: 'auto' }}>
      {tasks.map((task) => {
        const currentTaskEditing = editingTaskId === task._id
        return (
          <ListGroup.Item key={task._id}>
            <InputGroup>
              <Form.Control
                className="task-input"
                style={{ border: !currentTaskEditing ? 'none' : '' }}
                disabled={!currentTaskEditing}
                value={!currentTaskEditing ? task.description : description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Button
                variant="outline-secondary"
                onClick={() => handleEdit(task)}
              >
                {!currentTaskEditing ? '✏️' : '💾'}
              </Button>
              <Button variant="outline-secondary" onClick={() => deleteTask(task._id)}>🗑️</Button>
            </InputGroup>
          </ListGroup.Item>
        )
      }
      )}
    </ListGroup>
  );
}

export default Tasks;