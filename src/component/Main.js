import React, {Component} from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import Menu from './Menu';
import Detail from './Detail';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Celebs from './Celebs';
import Stars from './Stars';
import {connect} from 'react-redux';
import { addImage, addVideo, fetchModels, fetchCelebs, fetchImages, fetchVideos, fetchStars, postImage, postVideo, postModel, postCeleb, postStar, deleteImage, deleteModel, deleteCeleb, deleteVideo, deleteStar, loginUser, logoutUser } from '../redux/ActionCreator';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

const mapStateToProps = state => {
    return{
        models: state.models,
        celebs: state.celebs,
        images: state.images,
        videos: state.videos,
        stars: state.stars,
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => ({
    addImage: (name, category, image) => dispatch(addImage(name, category, image)),
    addVideo: (name, category, video) => dispatch(addVideo(name, category, video)),
    fetchModels: () => {dispatch(fetchModels())},
    fetchCelebs: () => {dispatch(fetchCelebs())},
    fetchImages: () => {dispatch(fetchImages())},
    fetchVideos: () => {dispatch(fetchVideos())},
    fetchStars: () => {dispatch(fetchStars())},
    postImage: (name, category, image) => dispatch(postImage(name, category, image)),
    postVideo: (name, category, video) => dispatch(postVideo(name, category, video)),
    postModel: (name, image) => dispatch(postModel(name,image)),
    postCeleb: (name, image) => dispatch(postCeleb(name,image)),
    postStar: (name, image) => dispatch(postStar(name, image)),
    deleteImage: (id) => dispatch(deleteImage(id)),
    deleteModel: (id) => dispatch(deleteModel(id)),
    deleteVideo: (id) => dispatch(deleteVideo(id)),
    deleteCeleb: (id) => dispatch(deleteCeleb(id)),
    deleteStar: (id) => dispatch(deleteStar(id)),
    loginUser: (creds) => dispatch(loginUser(creds)),
    logoutUser: () => dispatch(logoutUser())
});

class Main extends Component {

    componentDidMount() {
        this.props.fetchModels();
        this.props.fetchCelebs();
        this.props.fetchImages();
        this.props.fetchVideos();
        this.props.fetchStars();
    }

    onSelect(name) {
        this.setState({
            selected: name,
        });
    }

    render() {
        const Modeldetail = ({match}) => {
            return(
                <Detail image={this.props.images.images.filter((image) => image.name === match.params.model)}
                        video={this.props.videos.videos.filter((video) => video.name === match.params.model)}
                        addImage = {this.props.addImage} addVideo={this.props.addVideo}
                        isLoading = {this.props.models.isLoading}
                        errMsg = {this.props.models.errMsg}
                        postImage = {this.props.postImage}
                        deleteImage = {this.props.deleteImage}
                        postVideo = {this.props.postVideo}
                        deleteVideo = {this.props.deleteVideo}
                        path="models" name={match.params.model} />      
            );
        }
        const CelebDetail = ({match}) => {
            return(
                <Detail image={this.props.images.images.filter((image) => image.name === match.params.celeb)} 
                        video={this.props.videos.videos.filter((video) => video.name === match.params.celeb)}
                        addImage = {this.props.addImage} addVideo={this.props.addVideo}
                        isLoading = {this.props.models.isLoading}
                        errMsg = {this.props.models.errMsg}
                        postImage = {this.props.postImage}
                        deleteImage = {this.props.deleteImage}
                        postVideo = {this.props.postVideo}
                        path="celebs" name={match.params.celeb} />
            );
        }
        const StarDetail = ({match}) => {
            return(
                <Detail image={this.props.images.images.filter((image) => image.name === match.params.star)} 
                        video={this.props.videos.videos.filter((video) => video.name === match.params.star)}
                        addImage = {this.props.addImage} addVideo={this.props.addVideo}
                        isLoading = {this.props.stars.isLoading}
                        errMsg = {this.props.stars.errMsg}
                        postImage = {this.props.postImage}
                        deleteImage = {this.props.deleteImage}
                        postVideo = {this.props.postVideo}
                        deleteVideo = {this.props.deleteVideo}
                        path="pornstars" name={match.params.star} />
            );
        }
        return(
            (this.props.auth.isAuthenticated)?
            <div>
                <Header auth={this.props.auth} logoutUser={this.props.logoutUser} />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={250}>
                        <Switch location={this.props.location}>
                            <Route exact path="/models" component={()=> <Menu models={this.props.models.models} postModel={this.props.postModel} deleteModel={this.props.deleteModel} /> } />
                            <Route path="/models/:model" component={Modeldetail} />
                            <Route exact path="/celebs" component={()=><Celebs celebs={this.props.celebs.celebs} postCeleb={this.props.postCeleb} deleteCeleb={this.props.deleteCeleb} /> } />
                            <Route path="/celebs/:celeb" component={CelebDetail} />
                            <Route exact path="/pornstars" component={()=><Stars stars={this.props.stars.stars} postStar={this.props.postStar} deleteStar={this.props.deleteStar} />} />
                            <Route path="/pornstars/:star" component={StarDetail} />
                            <Redirect to="/models" />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div>
            :<Home loginUser={this.props.loginUser} />
        );
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));