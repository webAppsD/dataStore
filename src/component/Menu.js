import React, {Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardFooter, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, FormGroup, Label } from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm} from 'react-redux-form';
import {FadeTransform} from 'react-animation-components';
import {Loading} from './Loading';

function RenderModels({model, onClick, deleteModel}) {
    return(
        <FadeTransform in 
            transformProms={{
                exitTransform: 'scale(0.5) translateY(-50%)' 
            }}>
            <Card style={{backgroundColor:"#000"}}>
                <Link to={`/models/${model.name}`} >
                    <CardImgOverlay><Button className="delete" outline onClick={()=>deleteModel(model._id)}><span className="fa fa-trash" /></Button></CardImgOverlay>
                    <CardImg src={model.image} alt={model.name} />
                    <CardFooter>{model.name.toUpperCase()}</CardFooter>
                </Link> 
            </Card>
        </FadeTransform>
    );
}

class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            models: this.props.models,
            modelModalOpen: false
        }
        this.toggleModelModal = this.toggleModelModal.bind(this);
        this.handleModelSubmit = this.handleModelSubmit.bind(this);
    }

    toggleModelModal() {
        this.setState ({
            modelModalOpen: !this.state.modelModalOpen
        });
    }

    handleModelSubmit(values) {
        this.toggleModelModal();
        console.log(JSON.stringify(values));
        this.props.postModel(values.name,values.image);
    }

    render() {
        const menu = this.state.models.map((model) => {
            return(
                <div className="col-12 col-sm-3 m-1">
                    <RenderModels model={model} deleteModel={this.props.deleteModel} />
                </div>
            );
        });
        if(this.props.models.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            )
        }
        else if(this.props.models.errMsg) {
            return(
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h4>{this.props.models.errMsg}</h4>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem active>Models</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div className="row">
                        <div className="col-12 col-sm-4">
                            <h3>Models</h3>
                        </div>
                        <div className="col-12 col-sm offset-sm-4">
                            <Button onClick={this.toggleModelModal}><span className="fa fa-plus" /></Button>
                        </div>
                    </div>
                    <div className="row">
                        {menu}
                    </div>
                    <Modal isOpen={this.state.modelModalOpen} toggle={this.modelModalOpen}>
                        <ModalHeader toggle={this.toggleModelModal}>Add Model</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleModelSubmit(values)}>
                                <FormGroup>
                                    <Label htmlFor="name">Name</Label>
                                    <Control.Text model=".name" id="modelName" name="modelName" placeholder="Name" />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="image">Image</Label>
                                    <Control.Text model=".image" id="modelImg" name="modelImg" placeholder="Image" />
                                </FormGroup>
                                <Button type="submit" value="submit" color="info">Submit</Button>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
            );
        }
    }
}

export default Menu;