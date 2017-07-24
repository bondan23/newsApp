import API,{ Fetcher } from '@libs/api';
import { news } from '@constants/types';

export function getNewsSource(page=1,language='en'){
  const parameter = {
    params:{
      language
    }
  }

  const req = Fetcher('newsapi.sources.get').param(parameter)

  return (dispatch) => {
    return req.then(({data})=>{
      dispatch({
        type:news.GET_ALL_NEWS_SOURCE,
        payload:data,
        page
      })
    }).catch((res)=>{
      console.log('error',res);
    })
  }
}

export function getNewsList(source,sortBy){

  const parameter = {
    params:{source,sortBy}
  }

  const req = Fetcher('newsapi.articles.get').param(parameter)

  return (dispatch) => {
    return req.then(({data})=>{
      dispatch({
        type:news.GET_ALL_NEWS,
        payload:data
      })
    }).catch((res)=>{
      console.log('error',res)
    })
  }

}
