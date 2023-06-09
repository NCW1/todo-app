import { useContext, useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { TodoContext } from "../contexts/TodoContext";
import { useNavigate, useParams } from "react-router-dom";

export default function EditTodo() {
	const { id } = useParams();
	const { todos, setTodos } = useContext(TodoContext);
	const navigate = useNavigate();

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [completed, setCompleted] = useState(false);

	useEffect(() => {
		const todo = todos.find((todo) => todo.id === Number(id));
		if (todo) {
			setTitle(todo.title);
			setDescription(todo.description);
			setCompleted(todo.completed);
		}
	}, [todos, id]);

	const handleUpdate = () => {
		const updatedTodos = todos.map((todo) => {
			if (todo.id === Number(id)) {
				return {
					...todo,
					title: title,
					description: description,
					completed: completed,
				};
			}
			return todo;
		});

		setTodos(updatedTodos);
		navigate("/");
	};

	return (
		<Container>
			<h1 className="my-3">Edit To-Do</h1>
			<Form onSubmit={handleUpdate}>
				<Form.Group className="mb-3" controlId="title">
					<Form.Label>Title: </Form.Label>
					<Form.Control
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						type="text"
						placeholder="Get software developer job"
						required
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="description">
					<Form.Label>Description: </Form.Label>
					<Form.Control
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						as="textarea"
						rows={3}
						placeholder="1. Create amazing project\n2. Apply to Google & Netflix\n3. Crush interview"
						required
					/>
				</Form.Group>
				<Form.Check
					type="checkbox"
					id="completed"
					label="Mark as completed"
					checked={completed}
					onChange={(e) => setCompleted(e.target.checked)}
					className="mb-3"
				/>
				<Button variant="primary" type="submit">
					Update
				</Button>
			</Form>
		</Container>
	);
}
