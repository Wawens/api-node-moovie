let p = document.getElementById("liste-poke");
let tab = []; 
let tabTri =[];

async function debutApi(){ 

  let data= await fetch("http://localhost:3000/api/film",{
    method:'GET'
  })
  .then(res => {return(res.json())}) 
.then(res =>{ 
 console.log(res)
  res.data.forEach(film => {
    display(film)
   // console.log([11].name)
   
  });
  return res
})

}
 debutApi()
 
function display(film){ 
let filmFull ={};
//let url = film.url;

//console.log(film.dataGlobal)
//console.log(film.picture)
filmFull.id =  film.id;
filmFull.name = film.name;
filmFull.auteur = film.Auteur;
filmFull.yeas = film.Annees;
filmFull.timeh = film.Durée.heures;
filmFull.timem = film.Durée.minutes;
filmFull.descipt = film.Description;
filmFull.quip =film.equipe.map((equip)=> equip).join(" -  ");
filmFull.pic = film.Picture;
filmFull.typ =film.Type.map((typ)=> typ).join(" -  ");

tab.push(filmFull);
      console.log(filmFull.typ)
  
if(tab.length >= 13){
  tabTri= tab.slice(0,3);//ça fonctionne :)
  console.log(tabTri)
displayCards(tabTri)
}



}

function displayCards(moovieOne){
  for(let i=0; i< moovieOne.length; i++){ 
    const liFilm= document.createElement("li");
    // Nom du film
    const nameF = document.createElement("h3");
    nameF.innerHTML="Nom du Film: "+ moovieOne[i].name;

// Author
    const title = document.createElement("p");
    title.innerHTML ="Par : "+ moovieOne[i].auteur;
    //equipe
    const equip = document.createElement("p");
    equip.innerHTML ="Accompagné de :"+ moovieOne[i].quip;
    // Années
    const ans = document.createElement("i");
    ans.innerHTML ="Sortie :"+ moovieOne[i].yeas;
    //Temps
    const timeh = document.createElement("p");
    timeh.innerHTML ="Durée : "+ moovieOne[i].timeh +" H " +moovieOne[i].timem+" min";
    // Type
    const typ = document.createElement("p");
    typ.innerHTML ="Type :"+ moovieOne[i].typ;

    //Description 
    const des = document.createElement("strong");
    des.innerHTML ="Description :"+ moovieOne[i].descipt;
    //Image
    const img = document.createElement("img");
 img.src=moovieOne[i].pic;
 img.title="Image du film"+moovieOne[i].name;


 //

 liFilm.appendChild(img);
 liFilm.appendChild(nameF);
 liFilm.appendChild(title);
 liFilm.appendChild(equip);
 liFilm.appendChild(typ);
 liFilm.appendChild(ans);
 //
 liFilm.appendChild(timeh);
 liFilm.appendChild(des);
 p.appendChild(liFilm);
 // 
  }
}


