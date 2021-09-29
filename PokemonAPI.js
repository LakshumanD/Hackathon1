
//let mainDiv = createElement("div", "container-fluid col-lg-11", "min-height:700px; text", "");
const PokeMonAPI = () => {
   let mainDiv = createElement("div", "container-fluid col-lg-11", "min-height:700px; text","");
    let h1 = document.createElement("H1");
    h1.className = "text-center bg-primary text-white p-2";
    let H1Text = document.createTextNode("PokemonAPI");
    h1.appendChild(H1Text);
    mainDiv.appendChild(h1);
const row = createElement("div", "row justify-content-center", "", "");
     const ul = createElement("ul", "pagination");
    for (let i = 1; i <= 5; i++)
    {
         const li = createElement("li", "page-item")

    const a = createElement("a", "page-link");
    const aText = document.createTextNode(i);
    a.appendChild(aText);
    a.addEventListener("click", linkClicked.bind(this,row));
        li.appendChild(a);
      
    ul.appendChild(li);
        }

    mainDiv.appendChild(ul);

    
    getPokeMon(row,0, 10);
   mainDiv.appendChild(row);
   
  document.body.appendChild(mainDiv);

   
};
const linkClicked = (row,val) => {
      while(row.firstChild) {
                row.removeChild(row.firstChild);
      }
    
    getPokeMon(row,((val.target.innerHTML-1)*10),10);
  
       
}
const createElement = (Tag,Classname,style,text) => {
    let tag = document.createElement(Tag);
    tag.className = Classname;
    if(style!="" && style !=null)
    tag.style.cssText = style;
    if(text!="")
        tag.value = text;
    return tag;
}

const getPokeMon = (row,offset,limit) =>
{
    fetchAPIData(row,offset, limit);    
}
    
async function fetchAPIData(row,offset,limit) {

    const response = await fetch("https://pokeapi.co/api/v2/pokemon?offset="+offset+"&limit="+limit)
        .then(resp => resp.json())
        .then(data => {
          //  console.log(data.results);
            for(let dat of data.results)
            createCard(row,dat);
        })
        .catch(err => console.log(err));
   
}
const createCard = (maindiv, data) => {
   // console.log(data.name);
    const div = createElement("div", "jumbotron col-lg-3 m-4  text-nowrap", "min-height:300px", "");
    const cardDiv = createElement("div", "container", "border:0", "");
    const h1Title = createElement("h3", "bg-white text-uppercase text-center p-2",",");
    const h1Content = document.createTextNode(data.name);
    h1Title.appendChild(h1Content);
    cardDiv.appendChild(h1Title);
    
  
    getAbility(cardDiv, data.url);
   
    div.appendChild(cardDiv);
    maindiv.appendChild(div);
}

const getAbility = (parent,data) => {
  //  console.log(data);
    fetchability(parent,data);
}
async function fetchability(parent,url)
{
     const response = await fetch(url)
        .then(resp => resp.json())
         .then(data => {

             // weight
             var pnlWeight = createElement("div", "p-3 mb-2 bg-info text-white");
             var pnlWeightText = document.createTextNode("Weight: " + data.weight);
             pnlWeight.appendChild(pnlWeightText);

             parent.appendChild(pnlWeight);
             
             var panel = createElement("div", "panel panel-success", "");
             var panelHeading = createElement("div", "panel-heading", "");
             var panelheadText = document.createTextNode("Abilities");
             panelHeading.appendChild(panelheadText);
             var panelcontent = createElement("div", "panel-body", "height:100px; overflow-y:scroll");
             panel.appendChild(panelHeading);
             var ulAbility = createElement("ul","","list-style:none;");
             
             for (let ability of data.abilities) {
                 let li = createElement("li", "text-left p-2", "", "");
                 li.innerHTML = ability.ability.name;
                 ulAbility.appendChild(li);
             }
             panelcontent.appendChild(ulAbility);
             panel.appendChild(panelcontent);
             parent.appendChild(panel);


             var panelmove = createElement("div", "panel panel-success", "");
             panelmove.title = "Scrolling Implemented";
             var panelmoveHeading = createElement("div", "panel-heading", "");
             var panelmoveheadText = document.createTextNode("Moves");
             panelmoveHeading.appendChild(panelmoveheadText);
             var panelmovecontent = createElement("div", "panel-body", "height:400px; overflow-y:scroll");
             panelmove.appendChild(panelmoveHeading);

              var ulMoves = createElement("ul","");
                    // ulMoves.innerHTML = "Moves:";
             for (let move of data.moves) {
                let limove = createElement("li", "text-left p-2", "", "");
                 limove.innerHTML = move.move.name;
                 ulMoves.appendChild(limove);
                 //console.log(move.move.name);
             }
              panelmovecontent.appendChild(ulMoves);
             panelmove.appendChild(panelmovecontent);
             parent.appendChild(panelmove);


             
        })
        .catch(err => console.log(err));
}
PokeMonAPI();
