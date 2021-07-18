import React, {Component} from 'react';
import {Button, FormGroup, Label,Input} from 'reactstrap';
import {LocalForm} from 'react-redux-form';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        }

        this.handleLogin = this.handleLogin.bind(this);
        this.toggleLoginModal = this.toggleLoginModal.bind(this);
    }

    handleLogin(event) {
        this.toggleLoginModal();
        this.props.loginUser({username: this.username.value, password: this.password.value});
    }


    toggleLoginModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render() {
        return(
            <div className="container">
                <div className="row align-center">
                    <h2>Login</h2>
                </div>
                <div className="form">
                    <LocalForm onSubmit={(values) => {this.handleLogin(values)}}>
                            <FormGroup>
                                <Label htmlFor="username"><h3>Username:</h3></Label>
                                <Input type="text" id="username" name="username"
                                  innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password"><h3>Password:</h3></Label>
                                <Input type="password" id="password" name="password"
                                  innerRef={(input) => this.password = input} />
                            </FormGroup>
                            <Button color="primary" type="submit" value="submit">Submit</Button>
                        </LocalForm>
                </div>
            </div>
        );
    }
}

/*<Modal isOpen={this.state.isModalOpen} toggle={this.toggleLoginModal}>
                    <ModalHeader toggle={this.toggleLoginModal}>Login</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => {this.handleLogin(values)}}>
                            <FormGroup>
                                <Label htmlFor="username">Username:</Label>
                                <Input type="text" id="username" name="username"
                                  innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password:</Label>
                                <Input type="password" id="password" name="password"
                                  innerRef={(input) => this.password = input} />
                            </FormGroup>
                            <Button type="submit" value="submit">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>*/
export default Home;