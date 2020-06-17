import axios from 'axios'

export const register = newUser => {
    return axios
    .post('https://berasku.herokuapp.com/api/v1/account', newUser, {
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => {
        console.log(res)
    })
    .catch(err=>{
        console.log(newUser)
        console.log(err)
    })
}

export const getAccount = id =>{
    return axios
    .get((`https://berasku.herokuapp.com/api/v1/account/${id}`), {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.usertoken}`
        }
    })
    .then(res=>{
        console.log(res.data)
        return(res.data)
    })
    .catch(err=>{
        console.log(err)
    })
}

export const login = user => {
    return axios
    .post('https://berasku.herokuapp.com/api/auth/login', {
        email: user.email,
        password: user.password
    },
    {
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => {
        localStorage.setItem('usertoken', res.data.access_token)
        console.log(res.data.access_token)
        return true
    })
    .catch(err=>{
        alert('Incorrect username or password')
        console.log(err)
    })
}

export const logout = () => {
    return axios
    .post(('https://berasku.herokuapp.com/api/auth/logout'), {}, {
        headers: {
            'Authorization': `Bearer ${localStorage.usertoken}`
        }
    })
    .then(res=>{
        console.log(res.data)
        localStorage.removeItem('usertoken')
    })
    .catch(err =>{
        console.log(err)
    })
}


export const getProfile = () => {
    return axios
    .post(('https://berasku.herokuapp.com/api/auth/me'), {}, {
        headers: {
            'Authorization': `Bearer ${localStorage.usertoken}`
        }
    })
    .then(res=>{
        console.log(res.data)
        return(res.data)
    })
    .catch(err =>{
        console.log(err)
    })
}

export const updateProfile = (newUser, id) => {
    return axios
    .put(`https://berasku.herokuapp.com/api/v1/account/${id}`, newUser, {
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => {
        console.log(res)
    })
    .catch(err=>{
        console.log(newUser)
        console.log(err)
    })
}

export const addprofileImage = image => {
    return axios
    .post('https://berasku.herokuapp.com/api/v1/accountImage', image, {
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => {
        console.log(res)
    })
    .catch(err=>{
        console.log(err)
    })
}

export const getProfilePic = id => {
    return axios
    .get((`https://berasku.herokuapp.com/api/v1/accountImage/${id}`), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res=>{
        console.log(res.data)
        return(res.data)
    })
    .catch(err =>{
        console.log(err)
    })
}

export const addProduct = products =>{
    return axios
    .post(('https://berasku-products.herokuapp.com/api/v1/product'), products, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res=>{
        console.log(res.data)
    })
    .catch(err=>{
        console.log(err)
    })
}

export const getProduct = id =>{
    return axios
    .get((`https://berasku-products.herokuapp.com/api/v1/product/${id}`), {
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(res=>{
        console.log(res.data)
        return(res.data)
    })
    .catch(err=>{
        console.log(err)
    })
}

export const getProducts = () =>{
    return axios
    .get((`https://berasku-produts.herokuapp.com/api/v1/products`), {
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(res=>{
        console.log(res.data)
        return(res.data)
    })
    .catch(err=>{
        console.log(err)
    })
}

export const addPost = post =>{
    return axios
    .post(('https://berasku-products.herokuapp.com/api/v1/post'), post, {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.usertoken}`
        }
    })
    .then(res=>{
        console.log(res)
    })
    .catch(err=>{
        console.log(err)
    })
}

export const getPost = id =>{
    return axios
    .get((`https://berasku-products.herokuapp.com/api/v1/post/${id}`), {
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(res=>{
        console.log(res.data)
        return(res.data)
    })
    .catch(err=>{
        console.log(err)
    })
}

export const getPosts = () =>{
    return axios
    .get((`https://berasku-products.herokuapp.com/api/v1/posts`), {
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(res=>{
        console.log(res.data)
        return(res.data)
    })
    .catch(err=>{
        console.log(err)
    })
}

export const addProductpic = image => {
    return axios
    .post('https://berasku-products.herokuapp.com/api/v1/productImage', image, {
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => {
        console.log(res)
    })
    .catch(err=>{
        console.log(err)
    })
}

export const getProductpic = id => {
    return axios
    .get((`https://berasku-products.herokuapp.com/api/v1/productImage/${id}`), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res=>{
        console.log(res.data)
        return(res.data)
    })
    .catch(err =>{
        console.log(err)
    })
}

export const productSearch = product =>{
    return axios
    .post(('https://berasku-products.herokuapp.com/api/v1/productSearch'), product, {
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(res=>{
        console.log(res.data)
        return(res.data)
    })
    .catch(err=>{
        console.log(err)
    })
}



export const addComment = comment =>{
    return axios
    .post(('https://berasku.herokuapp.com/api/v1/comment'), comment, {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.usertoken}`
        }
    })
    .then(res=>{
        console.log(res)
    })
    .catch(err=>{
        console.log(err)
    })
}

export const getComment = (accountID) =>{
    return axios
    .get((`https://berasku.herokuapp.com/api/v1/comment/${accountID}`), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res=>{
        console.log(res.data)
        return(res.data)
    })
    .catch(err=>{
        console.log(err)
    })
}

export const addtoWishlist = wishlist =>{
    return axios
    .post(('https://berasku.herokuapp.com/api/v1/wishlist'), wishlist, {
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(res=>{
        console.log(res)
    })
    .catch(err=>{
        console.log(err)
    })
}

export const getWishlist = (accountID) =>{
    return axios
    .get((`https://berasku.herokuapp.com/api/v1/wishlist/${accountID}`), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res=>{
        console.log(res.data)
        return(res.data)
    })
    .catch(err=>{
        console.log(err)
    })
}

export const deleteWishlist = (wishlistID) =>{
    return axios
    .delete((`https://berasku.herokuapp.com/api/v1/wishlist/${wishlistID}`), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res=>{
        console.log(res)
    })
    .catch(err=>{
        console.log(err)
    })
}

export const addtoCart = (productID, accountID) =>{
    return axios
    .post((`https://berasku-products.herokuapp.com/api/v1/addToCart/${productID}/${accountID}`), {}, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res=>{
        console.log(res.data)
    })
    .catch(err=>{
        console.log(err)
        alert('Denied')
    })
}

export const getCart = (accountID) =>{
    return axios
    .get((`https://berasku-products.herokuapp.com/api/v1/cart/${accountID}`), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res=>{
        console.log(res.data)
        return(res.data)
    })
    .catch(err=>{
        console.log(err)
    })
}

export const deleteCart = (productID,accountID) =>{
    return axios
    .delete((`https://berasku-products.herokuapp.com/api/v1/deleteCart/${productID}/${accountID}`), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res=>{
        console.log(res.data)
    })
    .catch(err=>{
        console.log(err)
    })
}

export const deleteCartAll = (productID,accountID) =>{
    return axios
    .delete((`https://berasku-products.herokuapp.com/api/v1/deleteCartAll/${productID}/${accountID}`), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res=>{
        console.log(res.data)
    })
    .catch(err=>{
        console.log(err)
    })
}

export const checkout = (token, id) =>{
    return axios
    .post((`https://berasku-transaction.herokuapp.com/api/v1/checkout/${id}`), token, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res=>{
        console.log(res.data.message)
    })
    .catch(err=>{
        console.log(err)
    })
}


export const isShop = data =>{
    if(data === "Shop"){
        return true
    }
    else{
        return false
    }
}

export const isLogin = data =>{
    if(data === "Shop" || data === "Customer"){
        return true
    }
    else{
        return false
    }
}