import { AsyncStorage } from 'react-native';
import { APIEndpoints, tokens } from '@constants/';
import axios from 'axios';
import _ from 'lodash';

//endpoints list
const ENDPOINTS_NEWSAPI = APIEndpoints.newsapi_endpoints;

//host
const HOST = new Map([
  ['newsapi',ENDPOINTS_NEWSAPI],
])

async function fetcher (host,method,endpoint,parameter){
  //match the regex pattern
  _.map(parameter,(v,k)=>{
    const re = new RegExp(':'+k,'g');
    const res = re.test(endpoint);
    if( res === true ){
      endpoint = _.replace(endpoint,re,v)
    }
  })

  let config = {
    baseURL: APIEndpoints[host],
    method: method,
    url: endpoint,
  };

  if(typeof parameter.params === 'object'){
    parameter = {
      ...parameter,
      params : {
        'apiKey':tokens[host].apiKey,
        ...parameter.params
      },
    }
  }else{
    parameter = {
      ...parameter
    }
  }

  return axios({...config,...parameter})
}

const API = {};

HOST.forEach((value,host)=>{
  var child = {}

  value.forEach((endpoint,key)=>{
    child[key] = {
      post: (params) => fetcher(host,'POST',endpoint,params),
      get: (params) => fetcher(host,'GET',endpoint,params),
      put: (params) => fetcher(host,'PUT',endpoint,params)
    }
  })

  API[host] = child

  return API
})

export function Fetcher(obj)
{
  //var a = _.some(API, function(o) { return _.has(o, obj); })
  const object = _.split(obj,'.',3);
  this.host = object[0];
  this.endpointKey = object[1];
  this.method = object[2];

  if(object.length !== 3) {
    throw `You type a wrong structure, please check again!`
  }

  if(_.has(API,this.host) === false){
    throw `Unavailable host of ${this.host}`
  }
  else if(_.has(API[this.host],this.endpointKey) === false){
    throw `There isn't any endpoint '${this.endpointKey}' on ${this.host}`
  }else if(_.has(API[this.host][this.endpointKey],this.method) === false){
    throw `Unavailable method of '${this.method}' on ${this.host}`
  }

  this.param = function(params){
    try{
      return API[this.host][this.endpointKey][this.method](params)
    }catch(e){

    }
  }

  return this;
}

export default API;
