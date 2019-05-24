import axios from "axios";

export default class Search {
    constructor(query){
        this.query = query;
    }

    async getResults(){
        const key = "a0636e3b01a6847ac8dff32cc099428b";
        try{
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
            //console.log(this.result);
        }catch(error){
            alert(error);
        }
    }
};