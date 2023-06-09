import { Fragment, useContext } from "react";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import { TodoContext } from "../contexts/TodoContext";
import { Link } from "react-router-dom";

export default function Home() {
	const { todos, setTodos } = useContext(TodoContext);

	const handleDelete = (id) => {
		const updatedTodos = todos.filter((todo) => todo.id !== id);
		setTodos(updatedTodos);
	};

	return (
		<Container>
			<h1 className="my-3">Your To-Dos</h1>
			<Row>
				<CardGroup todos={todos} handleDelete={handleDelete} />
			</Row>
		</Container>
	);
}

function CardGroup({ todos, handleDelete }) {
	return todos.map((todo) => {
		const completed = todo.completed;
		const bg = completed ? "success" : "danger";

		const deleteTodo = () => {
			handleDelete(todo.id);
		};

		return (
			<Col md={4} key={todo.id}>
				<Card className="my-3">
					<Card.Body className="p-4">
						<Card.Title>{todo.title}</Card.Title>
						<Card.Text className="mt-3">
							{todo.description.split("\n").map((line, index) => (
								<Fragment key={index}>
									{index > 0 && <br />}
									{line}
								</Fragment>
							))}
						</Card.Text>
						<Badge bg={bg}>{!completed && "Not"} Completed</Badge>
						<div className="mt-4 mb-2">
							<Link
								to={`/edit/${todo.id}`}
								className="btn btn-outline-primary me-4"
							>
								Edit
							</Link>
							<Button
								variant="outline-danger"
								onClick={deleteTodo}
							>
								Delete
							</Button>
						</div>
					</Card.Body>
				</Card>
			</Col>
		);
	});
}
