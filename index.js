// import axios from "axios";

var baseURL = "https://restcountries.eu"

var gettext = document.querySelector("#gettext")
var head = document.querySelector("head")
var countrytag = document.querySelector("#countries")
var detailtag = document.querySelector("#detail")
var optiontext = document.querySelector("#optiontext")
var searchtag = document.querySelector("#searchcount")
var litag = document.querySelectorAll("li");
var bortag = document.querySelector(".bor")
var optionscroll = document.querySelector("#optionvalues")
var icontag = document.querySelector("#srcicon")
var listag = [...litag]
var darktag = document.querySelector(".mode1");
var spantag = document.querySelector("span");
var lighttag = document.querySelector(".mode2");
var divno = 0;
var bordchild = 0;
var j=0;
var headertag = document.querySelector("header");

function checkValidhash() {
    if (window.location.hash !== "#home" && window.location.hash !== "#individual") {
        window.location.hash = "#home"
    }

}

function init() {
    checkValidhash()
    if (window.location.hash !== "#individual") {
        document.querySelector("#home").style.display = "block";
        document.querySelector("#individual").style.display = "none";
    }
    else {
        document.querySelector("#individual").style.display = "block";
    }
}
function bordername(borarr)
{
     if(bordchild>0)
     {
         bortag.lastElementChild.remove()
     }
     console.log(bordchild)
    var arr = []
    fetch(`${baseURL}/rest/v2/all`).then(function(res){
         return res.json()
    }).then(function(res){
        var divt = document.createElement("div")
        var spantit = document.createElement("span");
        spantit.textContent ="Border Countries :"
        spantit.classList ="ra"
       for(var i=0;i<borarr.length;i++)
       {
           for(var j=0;j<res.length;j++)
           {
              
               if(borarr[i] == res[j].alpha3Code)
               {
                
                var lit = document.createElement("span")
                divt.classList="ja"
                lit.textContent = res[j].name
                lit.classList ="ha"
                divt.prepend(lit)
                divt.prepend(spantit)
                bortag.prepend(divt)
                arr[i] = res[j].name
               }
           }
       }
       var hatags = document.querySelectorAll(".ha");
       var hatag =[...hatags]
       for(var i=0;i<hatag.length;i++)
       {
          hatag[i].addEventListener("click",function(){
              var remp = this.textContent
              indifunc(remp)
          })
       }

    //    document.querySelector(".ha").addEventListener("click",function(){
    //        console.log(this.textContent)
    //    })
       bordchild = bortag.childElementCount;
     console.log(bortag)
    }).catch(function(err)
    {
        console.log(err)
    })
    console.log(arr)
   
}
function indifunc(temp) {
    console.log(divno)
    if(divno>0)
    {
        detailtag.lastElementChild.remove()
    }
    fetch(`${baseURL}/rest/v2/name/${temp}`).then(function (res) {
        console.log(res)
        return res.json()
    }).then(function (res) {
        console.log(res)
        if(res.length>1 && temp=="India")
        {
             j=1;
        }
        else
        {
            j=0;
        }
        var templang=[];
        var bord=[];
        for(var i=0;i<res[j].languages.length;i++)
        {
          templang.push(res[j].languages[i].name)
        }
        for(var i=0;i<res[j].borders.length;i++)
        {
           bord.push(res[j].borders[i]);
        }
         
        var ele = `
        <div id="ree">
        <div class="country_img">
        <img src=${res[j].flag}>
      </div>
      <div class="country_details" >
        <p id="country_title">${temp}</p>
        <table id="country_tab" cellspacing="5" cellpadding="15">
          <tr>
              <td>
              <span class="country-info">Native Name:</span> ${res[j].nativeName}
              </td>
              <td>
              <span class="country-info">Top Level Domain:</span> ${res[j].topLevelDomain[0]}
              </td>
          </tr>
          <tr>
              <td>
              <span class="country-info">Population:</span> ${res[j].population}
              </td>
              <td>
              <span class="country-info">Currencies:</span> ${res[j].currencies[0].name}
              </td>
          </tr>
          <tr>
              <td>
              <span class="country-info">Region:</span> ${res[j].region}
              </td>
              <td>
              <span class="country-info">Language:</span> ${templang}
              </td>
          </tr>
          <tr>
              <td>
              <span class="country-info">Sub Region:</span> ${res[0].subregion}
              </td> 
          </tr>
          <tr>
              <td>
              <span class="country-info">Capital:</span> ${res[0].capital}
              </td>
          </tr>
        </table>
      </div>
        </div>
        
        `
        bordername(bord);
        detailtag.insertAdjacentHTML("afterbegin", ele)
         divno = detailtag.childElementCount;

    }).catch(function (err) {
        console.log(err);
    })
}

lighttag.addEventListener("click", function () {
    lighttag.style.display = "none"
    darktag.style.display = "block"
    var col = `<style>
    *
    {
        background-color: hsl(0, 0%, 98%);
        color:hsl(200, 15%, 8%);
    }
    .ha
    {
        box-shadow : 2px 2px 2px 2px #e0dede;
    }
    .back
    {
        box-shadow : 2px 2px 2px 2px #e0dede;
    }
    header
       {
           box-shadow : 2px 2px 2px 2px #e0dede;
       }
       #optionvalues
       {
           box-shadow : 2px 2px 2px 2px #e0dede;
       }
       #searchbar
       {
         box-shadow : 2px 2px 2px 2px #e0dede;
       }
       #optiontext
       {
        box-shadow : 2px 2px 2px 2px #e0dede;
       }
       .countrydata
       {
        box-shadow : 2px 2px 2px 2px #e0dede;
       }
    </style>`
    head.insertAdjacentHTML("beforeend", col)
})
darktag.addEventListener("click", function () {
    darktag.style.display = "none";
    lighttag.style.display = "block";
    var col = `<style>
       *
       {
        background-color: hsl(207, 26%, 17%);
        color:white;
       }
       .ha
       {
        box-shadow : 2px 2px 2px 2px black;
       }
       .back
       {
        box-shadow : 2px 2px 2px 2px black;
       }
       header
       {
           box-shadow : 2px 2px 2px 2px black;
       }
       #optionvalues
       {
           box-shadow : 2px 2px 2px 2px black
       }
       #searchbar
       {
         box-shadow : 2px 2px 2px 2px black
       }
       #optiontext
       {
        box-shadow : 2px 2px 2px 2px black
       }
       .countrydata
       {
        box-shadow : 2px 2px 2px 2px black
       }
    </style>`
    head.insertAdjacentHTML("beforeend", col)
})
fetch(`${baseURL}/rest/v2/all`).then(function(res){
    return res.json()
}).then(function (res) {
    console.log(res)
    console.log(res[0].name)

    for (var i = 0; i < res.length; i++) {
        var country = `
        <div class="countrydata" id="${res[i].name}">
           <div class="countryimg">
           <img src=${res[i].flag}>
           </div>
           <div class="countrytext">
           <div class="countryname">
           <p class="countryname_name">${res[i].name}</p>
           </div>
            <p><b>Population:</b> ${res[i].population}</p>
            <p><b>Region:</b> ${res[i].region}</p>
            <p><b>Capital:</b> ${res[i].capital}</p>
           </div>
        </div>
         `
        countrytag.insertAdjacentHTML("beforeend", country);

    }
    var countriestag = document.querySelectorAll(".countrydata")
    var con = [...countriestag]
    for (var i = 0; i < con.length; i++) {
        con[i].addEventListener("click", function () {
            window.location.hash = "#individual"
            //    checkValidhash()
            var temp = this.querySelector(".countryname_name").textContent;
            console.log(temp)
            indifunc(temp);
        })
    }
    icontag.addEventListener("click", function (event) {
        if (optionscroll.style.display == "none") {
            optionscroll.style.display = "inline-block"
        }
        else {
            optionscroll.style.display = "none"
        }
    })
    searchtag.addEventListener("keyup", function (event) {
        if (event.keyCode == 13) {
            var temp = this.value;
            temp = temp[0].toUpperCase() + temp.slice(1)
            console.log(temp)
            for (var i = 0; i < res.length; i++) {
                if (temp == res[i].name) {
                    var country = document.getElementById(`${res[i].name}`)
                    countrytag.insertAdjacentElement("afterbegin", country)
                    break;
                }
            }
            this.value = ""
        }
        
    })


    for (var i = 0; i < listag.length; i++) {
        listag[i].addEventListener("click", function (event) {
            gettext.value = this.textContent;
            for (var i = 0; i < res.length; i++) {
                if (gettext.value == res[i].region) {
                    var country = document.getElementById(`${res[i].name}`)
                    countrytag.insertAdjacentElement("afterbegin", country)
                }
            }
        })
    }


}).catch(function (err) {
    console.log(err)
});

document.querySelector(".back").addEventListener("click",function(){
    window.location.hash = "#home"
})


window.addEventListener("hashchange", function () {
    checkValidhash()
    if (window.location.hash == "#home") {
        document.querySelector("#home").style.display = "block";
        document.querySelector("#individual").style.display = "none"
    }
    else if (window.location.hash == "#individual") {
        document.querySelector("#home").style.display = "none";
        document.querySelector("#individual").style.display = "block"
    }
})

init()

