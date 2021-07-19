import * as ActionTypes from './ActionTypes';
import {auth, firestore} from '../firebase/firebase';

export const addImage = (image) => ({
    type: ActionTypes.ADD_IMAGE,
    payload: image
});

export const postImage = (name, category, image) => (dispatch) => {
    if(!auth.currentUser) {
        console.log('User unavailable!');
        return;
    }

    return firestore.collection('images').add({
        name: name,
        category: category,
        image: image
    })
    .then(docRef => {
        firestore.collection('images').doc(docRef.id).get()
        .then(doc => {
            if(doc.exists) {
                const data = doc.data();
                const _id = doc.id;
                let image = {_id,...data};
                dispatch(addImage(image));
            } else {
                console.log('No such document');
            }
        });
    })
    .catch(error => {console.log(error.message)});
};

export const deleteImage = (id) => (dispatch) => {
    return firestore.collection('images').doc(id).delete()
    .then(() => {
        console.log("Deleted image:"+id);
    })
    .catch((error) => {
        console.log(error.message);
    });
}

export const addVideo = (video) => ({
    type: ActionTypes.ADD_VIDEO,
    payload: video
});

export const postVideo = (name, category, link) => (dispatch) => {
    if(!auth.currentUser) {
        console.log('No user logged in!');
        return;
    }
    return firestore.collection('videos').add({
        name: name,
        category: category,
        link: link
    })
    .then((docRef) => {
        firestore.collection('videos').doc(docRef.id).get()
        .then(doc => {
            if(doc.exists) {
                const _id = doc.id;
                const data = doc.data();
                let video = {_id,...data};
                dispatch(addVideo(video));
            } else {
                console.log('No such document!');
            }
        });
    })
    .catch((error) => console.log(error.message));
};

export const deleteVideo = (id) => (dispatch) => {
    return firestore.collection('videos').doc(id).delete()
    .then(() => {
        console.log('Deleted video:'+id);
    })
    .catch((error) => {
        console.log(error.message);
    });
}

export const fetchModels = () => (dispatch) => {
    dispatch(modelsLoading(true));

    return firestore.collection('models').get()
    .then(snapshot => {
        let models = [];
        snapshot.forEach(doc => {
            const data = doc.data()
            const _id = doc.id
            models.push({_id,...data});
        });
        return models;
    })
    .then(models => dispatch(addModels(models)))
    .catch(error => dispatch(modelsFailed(error.message)));
}

export const modelsLoading = () => ({
    type: ActionTypes.MODELS_LOADING
});

export const modelsFailed = (errMsg) => ({
    type: ActionTypes.MODELS_FAILED,
    payload: errMsg
});

export const addModels = (models) => ({
    type: ActionTypes.ADD_MODELS,
    payload: models
});

export const addModel = (model) => ({
    type: ActionTypes.ADD_MODEL,
    payload: model
});

export const postModel = (name, image) => (dispatch) => {
    if(!auth.currentUser){
        console.log('User unavailable!');
        return;
    }

    return firestore.collection('models').add({
        name: name,
        image: image
    })
    .then(docRef => {
        firestore.collection('models').doc(docRef.id).get()
        .then(doc => {
            if(doc.exists) {
                const data = doc.data();
                const _id = doc.id;
                let model = {_id, ...data};
                dispatch(addModel(model));
            } else {
                console.log("No such document!");
            }
        });
    })
    .catch(error => {console.log(error.message)});
}

export const deleteModel = (id) => (dispatch) => {
    return firestore.collection('models').doc(id).delete()
    .then(() => {
        console.log("Deleted model:"+id);
    })
    .catch((error) => {
        console.log(error.message);
    });
}

export const fetchCelebs = () => (dispatch) => {
    dispatch(celebsLoading(true));

    return firestore.collection('celebs').get()
    .then(snapshot => {
        let celebs = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            const _id = doc.id;
            celebs.push({_id,...data});
        });
        return celebs;
    })
    .then(celebs => dispatch(addCelebs(celebs)))
    .catch(error => dispatch(celebsFailed(error.message)));
}

export const celebsLoading = () => ({
    type: ActionTypes.CELEBS_LOADING
});

export const celebsFailed = () => ({
    type: ActionTypes.CELEBS_FAILED
});

export const addCelebs = (celebs) => ({
    type: ActionTypes.ADD_CELEBS,
    payload: celebs
});

export const addCeleb = (celeb) => ({
    type: ActionTypes.ADD_CELEB,
    payload: celeb
});

export const postCeleb = (name, image) => (dispatch) => {
    if(!auth.currentUser) {
        console.log('No user logged in!');
        return;
    }

    return firestore.collection('celebs').add({
        name: name,
        image: image
    })
    .then(docRef => {
        firestore.collection('celebs').doc(docRef.id).get()
        .then(doc => {
            if(doc.exists) {
                const data = doc.data();
                const _id = doc.id;
                let celeb = {_id,...data};
                dispatch(addCeleb(celeb));
            } else {
                console.log("No such document!");
            }
        });
    })
    .catch(error => console.log(error.message));
}

export const deleteCeleb = (id) => (dispatch) => {
    return firestore.collection('celebs').doc(id).delete()
    .then(() => {
        console.log('Deleted celeb:'+id);
    })
    .catch((error) => {
        console.log(error.message);
    });
}

export const fetchImages = () => (dispatch) => {
    return firestore.collection('images').get()
    .then(snapshot => {
        let images = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            const _id = doc.id;
            images.push({_id, ...data});
        });
        return images;
    })
    .then(images => dispatch(addImages(images)))
    .catch(error => console.log(error.message));
}

export const addImages = (images) => ({
    type: ActionTypes.ADD_IMAGES,
    payload: images
});

export const imagesFailed = (errMsg) => ({
    type: ActionTypes.IMAGES_FAILED,
    payload: errMsg
});

export const fetchVideos = () => (dispatch) => {
    return firestore.collection('videos').get()
    .then(snapshot => {
        let videos = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            const _id = doc.id;
            videos.push({_id,...data});
        });
        return videos;
    })
    .then(videos => dispatch(addVideos(videos)))
    .catch(error => {console.log(error.message)});
}

export const addVideos = (videos) => ({
    type: ActionTypes.ADD_VIDEOS,
    payload: videos
});

export const videosFailed = (errMsg) => ({
    type: ActionTypes.VIDEOS_FAILED,
    payload: errMsg
});

export const fetchStars = () => (dispatch) => {
    dispatch(starsLoading(true));

    return firestore.collection('pornstars').get()
    .then(snapshot => {
        let stars = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            const _id = doc.id;
            stars.push({_id,...data});
        });
        return stars;
    })
    .then(stars => dispatch(addStars(stars)))
    .catch(error => dispatch(starsFailed(error.message)));
}

export const starsLoading = () => ({
    type: ActionTypes.STARS_LOADING
});

export const starsFailed = (errMsg) => ({
    type: ActionTypes.STARS_FAILED,
    payload: errMsg
});

export const addStars = (stars) => ({
    type: ActionTypes.ADD_STARS,
    payload: stars
});

export const addStar = (star) => ({
    type: ActionTypes.ADD_STAR,
    payload: star
});

export const postStar = (name, image) => (dispatch) => {
    if(!auth.currentUser) {
        console.log('No user logged in!');
        return;
    }

    return firestore.collection('pornstars').add({
        name: name,
        image: image
    })
    .then(docRef => {
        firestore.collection('pornstars').doc(docRef.id).get()
        .then(doc => {
            if(doc.exists) {
                const data = doc.data();
                const _id = doc.id;
                let star = {_id,...data};
                dispatch(addStar(star));
            } else {
                console.log('No such document!');
            }
        });
    })
    .catch(error => console.log(error));
}

export const deleteStar = (id) => (dispatch) => {
    return firestore.collection('pornstars').doc(id).delete()
    .then(() => {
        console.log('Deleted star:'+id);
    })
    .catch((error) => {
        console.log(error.message);
    })
}

export const requestLogin = () => ({
    type: ActionTypes.LOGIN_REQUEST
});

export const recieveLogin = (user) => ({
    type: ActionTypes.LOGIN_SUCCESS,
    user
});

export const loginError = (message) => ({
    type: ActionTypes.LOGIN_FAILURE,
    message
});

export const loginUser = (creds) => (dispatch) => {
    dispatch(requestLogin(creds));

    return auth.signInWithEmailAndPassword(creds.username, creds.password)
    .then(() => {
        var user = auth.currentUser;
        localStorage.setItem('user',JSON.stringify(user));
        dispatch(fetchModels());
        dispatch(fetchCelebs());
        dispatch(fetchImages());
        dispatch(fetchVideos());
        dispatch(fetchStars());
        dispatch(recieveLogin(user));
    })
    .catch(error => dispatch(loginError(error.message)))
};

export const requestLogout = () => ({
    type: ActionTypes.LOGOUT_REQUEST
});

export const recieveLogout = () => ({
    type: ActionTypes.LOGOUT_SUCCESS
});

export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout());
    auth.signOut().then(() => {

    }).catch((error) => {
        
    });
    localStorage.removeItem('user');
    dispatch(recieveLogout())
}