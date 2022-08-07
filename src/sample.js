const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/post'
})

class Product extends Component{
 state = {
   product: [],
   isUpdating: false,
   newProduct: {
     name : '',
     items: '',
     price: ''
   }
}

 componentDidMount(){
   this.getProduct();
 }

getProduct = async () => {
   let res = await api.get('/');
   this.setState(prevState => {
     return {
       ...prevState,
       product: res.data
     }
   });
}

createProduct = async (e) => {
 e.preventDefault();
 if(!this.state.isUpdating){
   const res = await api.post('/', this.state.newProduct);
   this.getProduct();
   this.setState(prevState => ({
     ...prevState,
     newProduct:{
       name : '',
       items: '',
       price: ''
     }
   }))
 }else{
   this.updateProduct();
 }
}

updateProduct = async() =>{
 await api.put('/'+this.state.newProduct.id, this.state.newProduct);
 this.getProduct();  
 this.setState(prevState =>({
   ...prevState,
   isUpdating: false,
   newProduct:{
     name : '',
     items: '',
     price: ''
   }
 }))
}

getProductToUpdate = (id) => {
 const updateItem = this.state.product.filter(product => product.id === id);
 this.setState(prevState => ({
   ...prevState,
   isUpdating: true,
   newProduct: updateItem[0]
 }));
 console.log(updateItem);
}

deleteProduct = async(id) => {
 let data = await api.delete('/'+id)
 this.getProduct();
}

handleChange = (e)=>{
 this.setState(prevState => ({
   ...prevState,
   newProduct:{
     ...prevState.newProduct,
     [e.target.name]: e.target.value,
   }
 }))
 console.log(this.state);
}


isUpdating: false,

<button className={this.state.isUpdating ? "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" : "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}>
            {this.state.isUpdating ? 'Update' : 'Submit' }
            </button>