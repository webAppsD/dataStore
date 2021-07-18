import React, {Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardFooter, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, FormGroup, Label } from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm} from 'react-redux-form';

import {Loading} from './Loading';

function RenderStars({star, onClick, deleteStar}) {
    return(
        <Card style={{backgroundColor:"#000"}}>
            <Link to={`/pornstars/${star.name}`} >
                <CardImgOverlay><Button className="delete" outline onClick={()=>deleteStar(star._id)}><span className="fa fa-trash" /></Button></CardImgOverlay>
                <CardImg src={star.image} alt={star.name} />
                <CardFooter>{star.name.toUpperCase()}</CardFooter>
            </Link> 
        </Card>
    );
}

class Stars extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stars: this.props.stars,
            starModalOpen: false
        }
        this.toggleStarModal = this.toggleStarModal.bind(this);
        this.handleStarSubmit = this.handleStarSubmit.bind(this);
    }

    toggleStarModal() {
        this.setState ({
            starModalOpen: !this.state.starModalOpen
        });
    }

    handleStarSubmit(values) {
        this.toggleStarModal();
        console.log(JSON.stringify(values));
        this.props.postStar(values.name,values.image);
    }

    render() {
        const menu = this.state.stars.map((star) => {
            return(
                <div className="col-12 col-sm-3 m-1">
                    <RenderStars star={star} deleteStar={this.props.deleteStar} />
                </div>
            );
        });
        if(this.props.stars.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            )
        }
        else if(this.props.stars.errMsg) {
            return(
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h3>{this.props.models.errMsg}</h3>
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
                            <BreadcrumbItem active>Stars</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div className="row">
                        <div className="col-12 col-sm-4">
                            <h3>Stars</h3>
                        </div>
                        <div className="col-12 col-sm  offset-sm-4">
                            <Button onClick={this.toggleStarModal}><span className="fa fa-plus" /></Button>
                        </div>
                    </div>
                    <div className="row">
                        {menu}
                    </div>
                    <Modal isOpen={this.state.starModalOpen} toggle={this.starModalOpen}>
                        <ModalHeader toggle={this.toggleStarModal}>Add Model</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleStarSubmit(values)}>
                                <FormGroup>
                                    <Label htmlFor="name">Name</Label>
                                    <Control.Text model=".name" id="starName" name="starName" placeholder="Name" />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="image">Image</Label>
                                    <Control.Text model=".image" id="starImg" name="starImg" placeholder="Image" />
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

export default Stars;