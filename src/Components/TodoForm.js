import React, { Component } from 'react';
import { Container, Form, Row, Col, Button, FormGroup, Label, Input } from 'reactstrap';

class App extends Component {
    render() {
        return (
            <>
                <Container>
                    <Form onSubmit={this.props.onTodoSubmitHandler} >
                        <Row>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="todoName">
                                        Todo Name:
                                    </Label>
                                    <Input type="text" placeholder="Enter Todo Name..." name="todoName" onChange={this.props.onChangeHandler} value={this.props.todoName} required />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="priority">
                                        Priority:
                                    </Label>
                                    <Input type="number" placeholder="Enter Todo Priority..." name="priority" value={this.props.priority} onChange={this.props.onChangeHandler} required />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup className="mt-4">
                                    <Button color="success" type="submit">
                                        {this.props.isTodoUpdate ? 'Update Todo' : 'Add Todo'}
                                    </Button>
                                    {' '}
                                    <Button color="danger" onClick={this.props.onResetHandler} type="button">
                                        Reset
                                    </Button>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </>
        )
    }
}

export default App;
