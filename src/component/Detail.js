import React, {Component} from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, FormGroup, Label} from 'reactstrap';
import {Link} from 'react-router-dom';
import {LocalForm, Control} from 'react-redux-form';
import {Stagger} from 'react-animation-components';

import {Loading} from './Loading';


class Detail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            images: this.props.image,
            videos: this.props.video,
            imageModalOpen: false,
            videoModalOpen: false,
            path: "/"+this.props.path,
            name: this.props.name,
        }
        this.toggleImageModal = this.toggleImageModal.bind(this);
        this.toggleVideoModal = this.toggleVideoModal.bind(this);
        this.handleImageSubmit = this.handleImageSubmit.bind(this);
        this.handleVideoSubmit = this.handleVideoSubmit.bind(this);
        this.handleImgDelete = this.handleImgDelete.bind(this);
        this.handleVidDelete = this.handleVidDelete.bind(this);
    }

    handleImageSubmit(values) {
        this.toggleImageModal();
        alert("New Image: "+JSON.stringify(values));
        this.props.postImage(values.name, values.category, values.link);
    }

    handleVideoSubmit(values) {
        this.toggleVideoModal();
        console.log("New Video: "+JSON.stringify(values));
        this.props.postVideo(values.name, values.category, values.link);
    }

    toggleImageModal() {
        this.setState({
            imageModalOpen: !this.state.imageModalOpen
        })
    }

    toggleVideoModal() {
        this.setState({
            videoModalOpen: !this.state.videoModalOpen
        })
    }

    handleImgDelete(image) {
        console.log(image._id);
        this.props.deleteImage(image._id);
    }

    handleVidDelete(video) {
        console.log(video._id);
        this.props.deleteVideo(video._id);
    }

    render() {
        if(this.state.images == null) {
            return(<div></div>);
        }
        
        /*let images = [];
        this.state.images.forEach((image) => {
            const src = image.image;
            images.push({src:src});
        })*/

        const images = this.state.images.map((image) => {
            return(
            <div className="gallery">
                <img src={image.image} alt={image.name} />
            </div>
            );
        })

        const videos = this.state.videos.map((video) => {
            return(
                <div className="col-12 col-sm-3 m-1">
                    <iframe src={video.link} width="960" height="640" allowFullScreen title={video.name} /><br />
                    <div className="align-center">
                        <Button onClick={()=>this.handleVidDelete(video)}><span><i className="fa fa-trash-o" color="primary" /></span></Button>
                    </div>
                </div>
            );
        })

        if(this.props.isLoading) {
            return(
                <div className="container">
                    <Loading />
                </div>
            )
        }
        else if(this.props.errMsg) {
            return(
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h4>{this.props.models.errMsg}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return(
                <div>
                    <div className="container">
                        <div className="row">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to={this.state.path}>{this.props.path}</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{this.state.name}</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                        <div className="App">
                            <h2>{this.state.name.toUpperCase()}</h2>
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-2">
                                <h3>Images</h3>
                            </div>
                            <div className="col-12 col-sm offset-sm-2">
                                <Button onClick={this.toggleImageModal}><span className="fa fa-plus" /></Button>
                            </div>
                        </div>
                        <div className="row">
                            <Stagger in>
                                {images}
                            </Stagger>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-12 col-sm-2">
                                <h3>Videos</h3>
                            </div>
                            <div className="col-12 col-sm offset-sm-3">
                                <Button onClick={this.toggleVideoModal}><span className="fa fa-plus" /></Button>
                            </div>
                        </div>
                        <div className="row">
                            {videos}
                        </div>
                    </div>
                    <Modal isOpen={this.state.imageModalOpen} toggle={this.imageModalOpen}>
                        <ModalHeader toggle={this.toggleImageModal}>Add Images</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values)=>this.handleImageSubmit(values)}>
                                <FormGroup>
                                    <Label htmlFor="name">Name</Label>
                                    <Control.Text model=".name" id="imgName" name="imgName"
                                        placeholder="Name" />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="category">Category</Label>
                                    <Control.Text model=".category" id="imgCat" name="imgCat"
                                        placeholder="Category" />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="image">Link</Label>
                                    <Control.Text model=".image" id="imgLink" name="imgLink"
                                        placeholder="Image" />
                                </FormGroup>
                                <Button type="submit" value="submit" color="info">Submit</Button>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                    <Modal isOpen={this.state.videoModalOpen} toggle={this.videoModalOpen}>
                        <ModalHeader toggle={this.toggleVideoModal}>Add Videos</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleVideoSubmit(values)}>
                                <FormGroup>
                                    <Label htmlFor="name">Name</Label>
                                    <Control.Text model=".name" id="vidName" name="vidName"
                                        placeholder="Name" />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="category">Category</Label>
                                    <Control.Text model=".category" id="vidCat" name="vidCat"
                                    placeholder="Category" />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="link">Link</Label>
                                    <Control.Text model=".link" id="vidLink" name="vidLink"
                                    placeholder="Link" />
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

export default Detail;