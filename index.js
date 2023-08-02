let id =-1;
const productdata = (e) => {
    e.preventDefault();

    let value = document.getElementById("btn").value
    console.log(value,id);

    let product = {
        img: document.getElementById("img").value,
        title: document.getElementById("title").value,
        cate: document.getElementById("cate").value,
        price: document.getElementById("price").value,

    }
    if(value =="post"){
        fetch ("http://localhost:3000/product",{
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(product),
        })
    }
    else{
        fetch (`http://localhost:3000/product/${id}`,{
            method:"PATCH",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(product),
        })
    }
   
}
document.querySelector("form").addEventListener("submit", productdata)

const display = (data) => {
    data.map((product) => {
        let div = document.createElement("div")
        let img = document.createElement("img")
        img.src = product.img
        let cate=document.createElement("h2")
        cate.innerHTML=product.cate
        let title = document.createElement("h2")
        title.innerHTML = product.title
        let price = document.createElement("h3")
        price.innerHTML = product.price

        let btn1 = document.createElement("button")
        btn1.innerHTML ="update" 
        btn1.addEventListener("click",()=>{
            document.getElementById("img").value=product.img;
            document.getElementById("title").value=product.title;
            document.getElementById("cate").value=product.cate;
            document.getElementById("price").value=product.price;
            document.getElementById("btn").value="update";
            id=product.id;
        })

        let btn2 = document.createElement("button")
        btn2.innerHTML = "delete"
        btn2.addEventListener("click",()=>{
            fetch (`http://localhost:3000/product/${product.id}`,{
            method:"DELETE",
        })
        })
        div.append(img, title, cate,price,btn1,btn2);
        document.getElementById("output").append(div)
    })
}

let get = async () =>{
    let res = await fetch ("http://localhost:3000/product")
    let data = await res.json()

    display(data);
}
get();