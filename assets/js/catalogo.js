const catalogo = [
  {id:"ambrosia",tipo:"cristal",name:"Ambrosía",profile:"Maracuyá · frutal · tropical",price:49,color:"#e5a22a",bg:"#f8ebc9"},
  {id:"jengibre",tipo:"cristal",name:"Jengibre & Té de Limón",profile:"Cítrica · especiada · fresca",price:49,color:"#e7c76a",bg:"#f4efd8"},
  {id:"rosa-miel",tipo:"cristal",name:"Rosa Miel",profile:"Floral · suave · aromática",price:49,color:"#d26b79",bg:"#f5dfe0"},
  {id:"brisa",tipo:"cristal",name:"Brisa Fresca",profile:"Herbal · fresca · ligera",price:49,color:"#85b68a",bg:"#dcebdc"},
  {id:"pocket-ambrosia",tipo:"pocket",name:"Pocket Ambrosía",profile:"Práctica · tropical",price:45,color:"#e5a22a",bg:"#f8ebc9"},
  {id:"pocket-brisa",tipo:"pocket",name:"Pocket Brisa Fresca",profile:"Práctica · refrescante",price:45,color:"#85b68a",bg:"#dcebdc"},
  {id:"tepache",tipo:"tepache",name:"Tepache",profile:"Piña · piloncillo · tradicional",price:31,color:"#d88b28",bg:"#f3dfbd"},
  {id:"pack-descubrimiento",tipo:"paquetes",name:"Pack Descubrimiento",profile:"Seis sabores para empezar",price:null,color:"#b9864e",bg:"#eadfc8"}
];

const grid = document.querySelector("#catalogGrid");
const filters = [...document.querySelectorAll("[data-filter]")];

function money(v){return v===null?"Precio por definir":new Intl.NumberFormat("es-MX",{style:"currency",currency:"MXN",maximumFractionDigits:0}).format(v);}

function render(tipo="todos"){
  const items = tipo==="todos" ? catalogo : catalogo.filter(p=>p.tipo===tipo || (tipo==="kombucha" && ["cristal","pocket"].includes(p.tipo)));
  grid.innerHTML = items.map(p=>`
    <article class="product-card">
      <div class="product-image" style="--product-bg:${p.bg}">
        <div class="mini-bottle" style="--product-color:${p.color}"><span>${p.name}</span></div>
      </div>
      <div class="product-copy">
        <p class="eyebrow">${p.tipo.toUpperCase()}</p>
        <h3>${p.name}</h3>
        <p>${p.profile}</p>
        <div class="product-bottom">
          <strong>${money(p.price)}</strong>
          <a class="add-button" href="index.html#favoritos" aria-label="Ver ${p.name}">+</a>
        </div>
      </div>
    </article>`).join("");
}

filters.forEach(btn=>btn.addEventListener("click",()=>{
  filters.forEach(b=>b.classList.remove("is-active"));
  btn.classList.add("is-active");
  render(btn.dataset.filter);
}));

const params = new URLSearchParams(location.search);
const requested = params.get("tipo");
if(requested){
  const target = filters.find(b=>b.dataset.filter===requested || (requested==="kombucha" && b.dataset.filter==="todos"));
  if(target){filters.forEach(b=>b.classList.remove("is-active"));target.classList.add("is-active");}
  render(requested);
}else{
  render();
}

const menuButton=document.querySelector("#menuButton");
const nav=document.querySelector("#mainNav");
menuButton.addEventListener("click",()=>{
  const open=nav.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded",String(open));
});
