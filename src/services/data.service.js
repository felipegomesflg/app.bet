const headers = {
    "Accept" : "application/json",
    "Content-type": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo3LCJlbWFpbCI6ImJhYmlAY3JpYXRpdmFydmQuY29tLmJyIiwiZXhwIjoxNjQzMTgwNTUzfQ.nY0RuLgdjlsk96D6scQzI6ZeUis0qYa7aOnejucP5Dg"
} 
function joinURL(baseURL, url){
    return `${baseURL}/${url}`;
}
class DataService{
    constructor(){
        this.domain = "http://127.0.0.1:8000"
    }

    request(url, method="POST", data=null){
        url = joinURL(this.domain,url);
        const options= {
            headers,
            method,            
        }
        if(data){
            options.body = JSON.stringify({...data});
        }
        return fetch(url,options);
    }

    post(url,data){
        const method = 'POST';
        return this.request(url,method,data).then(res=> res.json());
    }

    get(url,id){
        const method = 'GET';
        if(id){
            url = `${url}/${id}`;
        }
        return this.request(url,method).then(res=>res.json());
    }

    delete(url,id){
        const method = 'DELETE';
        if(id){
            url = `${url}/${id}`;
        }
        return this.request(url,method).then(res=>res.json());
    }
    
}

export default DataService;