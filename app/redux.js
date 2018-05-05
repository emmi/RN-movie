// import { Platform } from 'react-native';
//
// const API = Platform.OS === 'android'
//   ? 'http://10.0.3.2:3000/v1' // works for Genymotion
//   : 'https://api.themoviedb.org/3/movie';
//
// export const apiMiddleware = store => next => action => {
//   next(action);
//   switch (action.type) {
//     case 'GET_POPULAR_MOVIES':
//       store.dispatch({type: 'GET_POPULAR_MOVIES_LOADING'});
//       fetch(`${API}/popular?api_key=bccab329a352ae667d89051331ee8a7c&language=en-US&page=1`)
//         .then(response => response.json())
//         .then(data => next({
//           type: 'GET_POPULAR_MOVIES_RECEIVED',
//           data
//         }))
//         .catch(error => next({
//           type: 'GET_POPULAR_MOVIES_ERROR',
//           error
//         }));
//       break;
//     default:
//       break;
//   }
// };
//
// export const reducer = (state = { movies: [], loading: true }, action) => {
//   switch (action.type) {
//     case 'GET_POPULAR_MOVIES_LOADING':
//       return {
//         ...state,
//         loading: true,
//       };
//     case 'GET_POPULAR_MOVIES_RECEIVED':
//       console.log('acae ' + JSON.stringify(action.data.results[0].title));
//       return {
//         loading: false,
//         movies: action.data.results,
//       };
//     case 'GET_POPULAR_MOVIES_ERROR':
//       return state;
//     default:
//       return state;
//     }
// };
