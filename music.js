function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return '';
    if (!results[2]) return '';
    return name+"="+decodeURIComponent(results[2].replace(/\+/g, " "));
}
var globalapidata;
var apistatus="off";
function load_api(){
    var apiurl='https://script.google.com/macros/s/AKfycbzCQSJ-7N4oCs6sAi63fJmbl9it2DEZbbP0drv20H3FtulEg6yGbFcsEuMY0WOD96t4XQ/exec?getdata=all';
    fetch(apiurl) // APIのURL
    .then(response => {
        return response.json();
    })
    .then(myJson => {
        let listtext="";
        for (i=0; i<myJson.length; i++){
            listtext+="<li>"+myJson[i]+"  <a href='./indexA.html?guideid="+(i+2)+"'>ガイド使用</a>  <a href='./indexA.html?id="+(i+2)+"'>ガイド編集</a></li>";
        }
        document.getElementById("listid").innerHTML=listtext;
    });
}
function load_api2(paramguidename){
    var apiurl='https://script.google.com/macros/s/AKfycbzCQSJ-7N4oCs6sAi63fJmbl9it2DEZbbP0drv20H3FtulEg6yGbFcsEuMY0WOD96t4XQ/exec?'+paramguidename;
    fetch(apiurl) // APIのURL
    .then(response => {
        return response.json();
    })
    .then(myJson => {
        var listtext="ガイド："+myJson[0][0];
        document.getElementById("listid").textContent=listtext;
        var listresult=(myJson[0][1]).split(',').map((num, index) => {
            if (index == 0) {
                return ;
            }else if (index == ((myJson[0][1]).split(',').length)-1) {
                return ;
            }else{
                return Number(num);
            }
          });
        window.myLineChart.data.datasets[0].data = listresult;
        window.myLineChart.data.datasets[2].data = listresult;
        globalapidata=listresult;
        apistatus="on";
        load_melo();


    });
}
function load_api3(paramname){
    var apiurl='https://script.google.com/macros/s/AKfycbzCQSJ-7N4oCs6sAi63fJmbl9it2DEZbbP0drv20H3FtulEg6yGbFcsEuMY0WOD96t4XQ/exec?get'+paramname;
    fetch(apiurl) // APIのURL
    .then(response => {
        return response.json();
    })
    .then(myJson => {
        document.getElementById("title").value=myJson[0][0];
        var textdata=myJson[0][1].slice(1, -1);
        console.log(textdata);
        document.getElementById('outputArea').value = textdata.replace(/,/g, '\n' );
        document.getElementById('outputArea').scrollTop = document.getElementById('outputArea').scrollHeight;
        createchart1(document.getElementById('outputArea').value.split(/\r\n|\n/).map(Number));
    });
}
function load_api4(paramguidename,paramname){
    var apiurl='https://script.google.com/macros/s/AKfycbzCQSJ-7N4oCs6sAi63fJmbl9it2DEZbbP0drv20H3FtulEg6yGbFcsEuMY0WOD96t4XQ/exec?get'+paramname+'&'+paramguidename;
    fetch(apiurl) // APIのURL
    .then(response => {
        return response.json();
    })
    .then(myJson => {
        document.getElementById("title").value=myJson[1][0];
        var textdata=myJson[1][1].slice(1, -1);
        document.getElementById('outputArea').value = textdata.replace(/,/g, '\n' );
        document.getElementById('outputArea').scrollTop = document.getElementById('outputArea').scrollHeight;

        var listtext="ガイド："+myJson[0][0];
        document.getElementById("listid").textContent=listtext;
        var listresult=(myJson[0][1]).split(',').map((num, index) => {
            if (index == 0) {
                return ;
            }else if (index == ((myJson[0][1]).split(',').length)-1) {
                return ;
            }else{
                return Number(num);
            }
          });
        window.myLineChart.data.datasets[0].data = listresult;
        window.myLineChart.data.datasets[2].data = listresult;
        globalapidata=listresult;
        apistatus="on";
        load_melo();

    });
}

function load_melo(){
    if(apistatus=="on"){
        if(melomode==1){
            window.myLineChart.data.datasets[1].data = globalapidata.map(i => [(i)*melodis/5, (i)*melodis/5+melodis-0.1]);
        }else{
            window.myLineChart.data.datasets[1].data = globalapidata.map(i => [parseInt(Math.log(i/27.5)/Math.log(2**(0.083)))*melodis, melodis-0.1+parseInt(Math.log(i/27.5)/Math.log(2**(0.083)))*melodis]);
        }
        window.myLineChart.update();
        createchart1(document.getElementById('outputArea').value.split(/\r\n|\n/).map(Number));
    }
}
//console.log(melodis);
//console.log(melolist.map(i => parseInt(Math.log(i/27.5)/Math.log(2**(0.083)))*melodis));
