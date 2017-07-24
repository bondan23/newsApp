import axios from 'axios';

const baseURL = 'https://icons.better-idea.org/allicons.json';

export default function logoParser(url){
    return new Promise((resolve,reject)=>{
      axios.get(`${baseURL}?url=${url}`).then(({data})=>{
        const { icons } = data;
        const uri = icons[0].url;
        const width = icons[0].width;
        const height = icons[0].height;
        const returningData = {success:true,uri,width,height,source:url};
        resolve(returningData)
      }).catch((res)=>{
        resolve({success:false,uri:'https://indiecrowdfunder.azureedge.net/content/images/no-logo.png',width:null,height:null,source:url})
      })
    })
}
