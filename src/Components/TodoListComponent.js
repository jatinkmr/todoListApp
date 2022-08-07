import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Badge, Button, Row, Col, Input } from 'reactstrap';

class TodoListComponent extends Component {
    render() { 
        const { todoList } = this.props;

        if (!todoList.length) {
            return (
                <>
                    <Container>
                        <h4>Todo/Task List :-</h4>
                        <h3>
                            <Badge color="info">No Data Found...</Badge>
                        </h3>
                    </Container>
                </>
            )
        }

        return (
            <>
                <Container>
                    <h4>Todo/Task List :-</h4>
                    <ListGroup>
                        {todoList.map((todo, index) => <ListGroupItem className="justify-content-between" key={todo._id}>
                            <Row>
                                <Col xs="1">
                                    <Input type="checkbox" name="isCompleted" checked={todo.completed} onChange={() => this.props.onTodoCompletionHandler(todo._id, index)} />
                                </Col>
                                <Col xs="5">
                                    { todo.completed ? <span style={{"textDecorationLine": "line-through"}}>{todo.taskName}</span> : <span>{todo.taskName}</span> }
                                </Col>
                                <Col xs="6" className="align-items-end">
                                    <Button color="info" type="button" onClick={() => this.props.onUpdateTodoHandler(todo._id)} >
                                        Update
                                    </Button>
                                    {' '}
                                    <Button color="danger" type="button" onClick={() => this.props.onRemoveTodoHandler(todo._id)} disabled={todo.completed} >
                                        Delete
                                    </Button>
                                </Col>
                            </Row>
                            
                        </ListGroupItem>)}
                    </ListGroup>
                </Container>
            </>
            
        )
    }
}

export default TodoListComponent;
