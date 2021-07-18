import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardFooter, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, FormGroup, Label} from 'reactstrap';
import { Control, LocalForm } from 'react-redux-form';
import {Link} from 'react-router-dom';

import {Loading} from './Loading';

function RenderCelebs({celeb, deleteCeleb, onClick}) {
    return(
        <Card style={{backgroundColor:"#000"}}>
            <Link to={`/celebs/${celeb.name}`}>
                <CardImgOverlay><Button className="delete" outline onClick={()=>deleteCeleb(celeb._id)}><span className="fa fa-trash" /></Button></CardImgOverlay>
                <CardImg src={celeb.image} alt={celeb.name} />
                <CardFooter>{celeb.name.toUpperCase()}</CardFooter>
            </Link>
        </Card>
    );
}

class Celebs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            celebs: this.props.celebs,
            celedModalOpen: false
        }

        this.toggleCelebModal = this.toggleCelebModal.bind(this);
        this.handleCelebSubmit = this.handleCelebSubmit.bind(this);
    }

    toggleCelebModal() {
        this.setState({
            celedModalOpen: !this.state.celedModalOpen
        })
    }

    handleCelebSubmit(values) {
        this.toggleCelebModal();
        console.log(JSON.stringify(values));
        this.props.postCeleb(values.name,values.image);
    }

    render() {
        const menu = this.state.celebs.map((celeb) => {
            return(
                <div className="col-12 col-sm-3 m-1">
                    <RenderCelebs celeb={celeb} deleteCeleb={this.props.deleteCeleb} />
                </div>
            );
        })
        
        if(this.props.celebs.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if(this.props.celebs.errMsg) {
            return(
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h4>{this.props.celebs.errMsg}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem active>Celebs</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div className="row">
                        <div className="col-12 col-sm-4">
                            <h3>Celebs</h3>
                        </div>
                        <div className="col-12 col-sm offset-sm-4">
                            <Button onClick={this.toggleCelebModal}><span className="fa fa-plus" /></Button>
                        </div>
                    </div>
                    <div className="row">
                        {menu}
                    </div>
                    <Modal isOpen={this.state.celedModalOpen} toggle={this.state.toggleCelebModal}>
                        <ModalHeader toggle={this.state.toggleCelebModal}>Add Celeb</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleCelebSubmit(values)}>
                                <FormGroup>
                                    <Label htmlFor="name">Name</Label>
                                    <Control.Text model=".name" id="celebName" name="celebName" placeholder="Name" />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="image">Image</Label>
                                    <Control.Text model=".image" id="celebImg" name="celebImg" placeholder="Image" />
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

export default Celebs;