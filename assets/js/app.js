const products = [
  { id:"ambrosia", name:"Ambrosía", profile:"Maracuyá · frutal · tropical", description:"Ligera, refrescante y una de las favoritas.", price:49, color:"#e5a22a", bg:"#f8ebc9" },
  { id:"jengibre", name:"Jengibre & Té de Limón", profile:"Cítrica · especiada · fresca", description:"Una combinación brillante y estimulante.", price:49, color:"#e7c76a", bg:"#f4efd8" },
  { id:"rosa-miel", name:"Rosa Miel", profile:"Floral · suave · aromática", description:"Elegante, balanceada y delicada.", price:49, color:"#d26b79", bg:"#f5dfe0" },
  { id:"brisa-fresca", name:"Brisa Fresca", profile:"Herbal · fresca · ligera", description:"Un perfil limpio para acompañar cualquier momento.", price:49, color:"#85b68a", bg:"#dcebdc" }
];

let cart = JSON.parse(localStorage.getItem("probiotika-cart") || "[]");

const productGrid = document.querySelector("#productGrid");
const cartDrawer = document.querySelector("#cartDrawer");
const overlay = document.querySelector("#drawerOverlay");

function money(value){ return new Intl.NumberFormat("es-MX",{style:"currency",currency:"MXN",maximumFractionDigits:0}).format(value); }

function renderProducts(){
  productGrid.innerHTML = products.map((p,index)=>`
    <article class="product-card">
      <div class="product-image" style="--product-bg:${p.bg}">
        <div class="mini-bottle" style="--product-color:${p.color}"><span>${p.name}</span></div>
      </div>
      <div class="product-copy">
        ${index===0?'<p class="eyebrow">MÁS VENDIDO</p>':""}
        <h3>${p.name}</h3>
        <p><strong>${p.profile}</strong><br>${p.description}</p>
        <div class="product-bottom">
          <strong>${money(p.price)}</strong>
          <button class="add-button" data-add="${p.id}" aria-label="Agregar ${p.name}">+</button>
        </div>
      </div>
    </article>`).join("");
}

function saveCart(){ localStorage.setItem("probiotika-cart",JSON.stringify(cart)); renderCart(); }

function addProduct(id){
  const product = products.find(p=>p.id===id);
  if(!product) return;
  const item = cart.find(i=>i.id===id);
  item ? item.qty++ : cart.push({...product,qty:1});
  saveCart();
  showToast(`${product.name} se agregó al carrito`);
}

function renderCart(){
  const count = cart.reduce((s,i)=>s+i.qty,0);
  document.querySelector("#cartCount").textContent=count;
  const list = document.querySelector("#cartItems");
  list.innerHTML = cart.length ? cart.map(item=>`
    <div class="cart-item">
      <div><strong>${item.name}</strong><br><small>${item.qty} × ${money(item.price)}</small></div>
      <button data-remove="${item.id}">Eliminar</button>
    </div>`).join("") : "<p>Tu carrito está vacío.</p>";
  document.querySelector("#cartTotal").textContent=money(cart.reduce((s,i)=>s+i.price*i.qty,0));
}

function openCart(){
  cartDrawer.classList.add("is-open"); overlay.classList.add("is-open");
  cartDrawer.setAttribute("aria-hidden","false");
}
function closeCart(){
  cartDrawer.classList.remove("is-open"); overlay.classList.remove("is-open");
  cartDrawer.setAttribute("aria-hidden","true");
}
function showToast(text){
  const t=document.createElement("div"); t.className="toast"; t.textContent=text; document.body.append(t);
  setTimeout(()=>t.remove(),1800);
}

document.addEventListener("click",e=>{
  const add=e.target.closest("[data-add]");
  if(add) addProduct(add.dataset.add);
  const remove=e.target.closest("[data-remove]");
  if(remove){ cart=cart.filter(i=>i.id!==remove.dataset.remove); saveCart(); }
});
document.querySelector("#openCart").addEventListener("click",openCart);
document.querySelector("#closeCart").addEventListener("click",closeCart);
overlay.addEventListener("click",closeCart);

document.querySelector("[data-add-pack]").addEventListener("click",()=>{
  showToast("El armador del pack se conectará en la siguiente etapa");
  document.querySelector("#favoritos").scrollIntoView({behavior:"smooth"});
});
document.querySelector("#scobyto").addEventListener("click",()=>document.querySelector("#pack").scrollIntoView({behavior:"smooth"}));

const menuButton=document.querySelector("#menuButton");
const nav=document.querySelector("#mainNav");
menuButton.addEventListener("click",()=>{
  const open=nav.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded",String(open));
});
nav.addEventListener("click",()=>{nav.classList.remove("is-open");menuButton.setAttribute("aria-expanded","false");});

document.querySelector("#checkoutButton").addEventListener("click",()=>{
  showToast("Aquí se conectará Shopify Checkout");
});

document.querySelector("#newsletterForm").addEventListener("submit",e=>{
  e.preventDefault(); showToast("Formulario listo para conectar con email marketing"); e.target.reset();
});

renderProducts();
renderCart();
