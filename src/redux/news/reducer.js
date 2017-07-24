import { news } from '@constants/types';
import _ from 'lodash';

export default function newsReducer(state={},action){
  switch(action.type){
    case news.GET_ALL_NEWS :
      return {
        ...state,
        articles:{
          ...action.payload
        }
      }
    case news.GET_ALL_NEWS_SOURCE :
      const page = action.page - 1;
      const limit = 10;
      const offset = limit * page;
      const count = Math.ceil(action.payload.sources.length/limit);

      if(page === 0){
        return {
          ...state,
          sources:{
            ...action.payload,
            sources:_.slice(action.payload.sources,offset,limit),
            page:action.page,
            allLoaded:false
          }
        }
      }else if(action.page <= count){
        return {
          ...state,
          sources:{
            ...action.payload,
            sources:[
              ...state.sources,
              ..._.slice(action.payload.sources,offset,limit*action.page)
            ],
            page:action.page,
            allLoaded:(count === action.page)?true:false
          }
        }
      }
    default:
      return state;
  }
}
