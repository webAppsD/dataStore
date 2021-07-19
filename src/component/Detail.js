import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Button, Label, Collapse, Input} from 'reactstrap';
import {Link} from 'react-router-dom';
import {LocalForm} from 'react-redux-form';
import {Stagger} from 'react-animation-components';

import {Loading} from './Loading';


class Detail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            images: this.props.image,
            videos: this.props.video,
            category: this.props.path,
            path: "/"+this.props.path,
            name: this.props.name,
            isImageOpen: false,
            isVideoOpen: false
        }
        this.handleImageSubmit = this.handleImageSubmit.bind(this);
        this.handleVideoSubmit = this.handleVideoSubmit.bind(this);
        this.handleImgDelete = this.handleImgDelete.bind(this);
        this.handleVidDelete = this.handleVidDelete.bind(this);
        this.toggleImage = this.toggleImage.bind(this);
        this.toggleVideo = this.toggleVideo.bind(this);
    }

    toggleImage() {
        this.setState({
            isImageOpen: !this.state.isImageOpen
        });
    }

    toggleVideo() {
        this.setState({
            isVideoOpen: !this.state.isVideoOpen
        });
    }

    handleImageSubmit(event) {
        //this.toggleImageModal();
        console.log(JSON.stringify(this.state.name, this.image.value, this.state.category));
        this.props.postImage(this.state.name, this.state.category, this.image.value);
    }

    handleVideoSubmit(event) {
        //this.toggleVideoModal();
        console.log(JSON.stringify(this.state.name, this.link.value, this.state.category));
        this.props.postVideo(this.state.name, this.state.category, this.link.value);
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
                <img className="img-fluid" src={image.image} alt={image.name} />
            </div>
            );
        })

        const videos = this.state.videos.map((video) => {
            return(
                <div className="">
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
                                <Button onClick={this.toggleImage}>Add Images</Button>
                                <Collapse isOpen={this.state.isOpen}>
                                    <LocalForm onSubmit={(values) => this.handleImageSubmit(values)}>
                                        <div className="row">
                                            <Label htmlFor="image"><h3>Add Image:</h3></Label>
                                            <Input type="text" id="image" name="image" innerRef={(input) => this.image = input} />
                                            <div className="col">
                                                <Button type="submit" value="submit">Submit</Button>
                                            </div>
                                        </div>
                                    </LocalForm>
                                </Collapse>
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
                                <Button onClick={this.toggleVideo}>Add Videos</Button>
                                <Collapse isOpen={this.state.isVideoOpen}>
                                    <LocalForm onSubmit={(values) => this.handleVideoSubmit(values)}>
                                         <div className="row">
                                            <Label htmlFor="link"><h3>Add Videos:</h3></Label>
                                            <Input type="text" id="link" name="link" innerRef={(input) => this.link = input} />
                                            <div className="col">
                                                <Button type="submit" value="submit">Submit</Button>
                                            </div>
                                        </div>
                                    </LocalForm>
                                </Collapse>
                            </div>
                        </div>
                        <div className="row">
                            {videos}
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Detail;