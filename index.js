// tablomuzun tbody etiketine verilmiş olan id'yi getirdik.
var kullanici=document.getElementById("kullanici");

// gecerliform fonksiyonunda yazdığımız kıstaslar sayesinde tablomuza veri ekleme ve veri düzenleme 
// işlemlerini yapabiliriz.
function gecerliform() {
    var ad,yas,adres,email;
    ad=document.getElementById("ad").value;
    yas=document.getElementById("yas").value;
    adres=document.getElementById("adres").value;
    email=document.getElementById("email").value;
    if (ad=="") {
        alert("Lütfen Bir Ad Giriniz");
        return false;
    }

    if (yas=="") {
        alert("Lütfen Bir Yaş Giriniz");
        return false;
    }

    else if(yas<1){
        alert("Yaş sıfır olmamalıdır ya da sıfırdan daha küçük olmamalıdır");
        return false;
    }


    if (adres=="") {
        alert("Lütfen Bir Adres Giriniz");
        return false;
    }

    if (email=="") {
        alert("Lütfen Bir Email Giriniz");
        return false;
    }

    else if(!email.includes("@")){

        alert("Geçersiz Email");
        return false;
    }
    return true;
    
}

// verigoster fonksiyonu sayfamız yüklendiğinde çalışacaktır. Öncelikle tablomuz bomboş gözükecektir, 
// lakin veri ekleme, düzenleme ve silme işlemleri yaptıktan sonra işlenmiş olan verileri güncel
// bir şekilde gösterecektir.
function verigoster() {
    var kulliste="";
    if (localStorage.getItem("kulliste")==null) {
        kulliste=[];
    }

    else{
    kulliste=JSON.parse(localStorage.getItem("kulliste"))
    }

    var tablosatir="";
    kulliste.forEach(function(item,i) {
        tablosatir+="<tr>";
        tablosatir+="<td>"+item.ad+"</td>";
        tablosatir+="<td>"+item.yas+"</td>";
        tablosatir+="<td>"+item.adres+"</td>";
        tablosatir+="<td>"+item.email+"</td>";
        tablosatir+='<td><button onclick="verisil('+i+')" class="btn btn-danger">Sil</button><button onclick="veriduzenle('+i+')" class="btn btn-warning">Düzenle</button></td>';

        tablosatir+="</tr>";
      

    });

    kullanici.innerHTML=tablosatir;
}

// gecerliform fonksiyonundaki kıstaslarımıza tamamen riayet edildiyse kullanıcı ekle isimli tuşa basıldıktan sonra
// veri ekleme işlemi yapar
function veriekle() {
    if (gecerliform()==true) {
        var ad,yas,adres,email;
        ad=document.getElementById("ad").value;
        yas=document.getElementById("yas").value;
        adres=document.getElementById("adres").value;
        email=document.getElementById("email").value;

        var kulliste="";
    if (localStorage.getItem("kulliste")==null) {
        kulliste=[];
    }

    else{
    kulliste=JSON.parse(localStorage.getItem("kulliste"))
    }

    kulliste.push({
        ad:ad,
        yas:yas,
        adres:adres,
        email:email
    });

    localStorage.setItem("kulliste",JSON.stringify(kulliste));
    verigoster();

        document.getElementById("ad").value="";
        document.getElementById("yas").value="";
        document.getElementById("adres").value="";
        document.getElementById("email").value="";


    }

}

// verisil fonksiyonu tablo içinde yer alan "Sil" ismindeki butonumuza basıldığında silinmek istenen satırı
// silmek için çalışacak olan fonksiyondur.
function verisil(i) {
    var kulliste="";
    if (localStorage.getItem("kulliste")==null) {
        kulliste=[];
    }

    else{
    kulliste=JSON.parse(localStorage.getItem("kulliste"))
    }
    kulliste.splice(i,1);
    localStorage.setItem("kulliste",JSON.stringify(kulliste));
    verigoster();
}


function ara() {
    var input,filtre,kullanici,tr,td,i;
    input=document.getElementById("veriara");
    filtre=input.value.toUpperCase()
    kullanici=document.getElementById("kullanici");
    tr=kullanici.getElementsByTagName("tr");

    for (var i = 0; i < tr.length; i++) {
        td=tr[i].getElementsByTagName("td")[0];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filtre)>-1) {
                tr[i].style.display="";
            }
            else{
                tr[i].style.display="none";

            }
        }
    }  
}
  






// veriduzenle fonksiyonu tablo içinde yer alan "Düzenle" ismindeki butonumuza basıldığında o satıra ait tüm veriler
// form elemanlarımızın ilgili yerlerine gelir. Değiştirilmek istenen veriler düzenlendikten sonra 
// "Güncelle" ismindeki butonumuza basılır, verigoster() fonksiyonumuzdaki kıstaslara da riayet edildiyse  
// o satırdaki değiştirilmek istenen veriler değiştirilir. 

function veriduzenle(i) {
    var kulliste="";
    if (localStorage.getItem("kulliste")==null) {
        kulliste=[];
    }

    else{
    kulliste=JSON.parse(localStorage.getItem("kulliste"))
    }

        document.getElementById("ad").value=kulliste[i].ad;
        document.getElementById("yas").value=kulliste[i].yas;
        document.getElementById("adres").value=kulliste[i].adres;
        document.getElementById("email").value=kulliste[i].email;

        document.querySelector("#guncelle").addEventListener("click",()=>{

            if (gecerliform()==true) {
                kulliste[i].ad=document.getElementById("ad").value;
                kulliste[i].yas=document.getElementById("yas").value;
                kulliste[i].adres=document.getElementById("adres").value;
                kulliste[i].email=document.getElementById("email").value;
    
                localStorage.setItem("kulliste",JSON.stringify(kulliste));
                verigoster(); 

                document.getElementById("ad").value="";
                document.getElementById("yas").value="";
                document.getElementById("adres").value="";
                document.getElementById("email").value="";
            }

            
        });


}