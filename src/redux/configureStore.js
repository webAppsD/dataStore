import { createStore, combineReducers, applyMiddleware } from 'redux';
import {Models} from './models';
import {Images} from './images';
import {Videos} from './videos';
import {Celebs} from './celebs';
import {Stars} from './stars';
import {Auth} from './auth';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            models: Models,
            images: Images,
            videos: Videos,
            celebs: Celebs,
            stars: Stars,
            auth: Auth
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}