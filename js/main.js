var websiteNameInput=document.getElementById("name");
var websiteUrlInput=document.getElementById("url");
var website=[];
if(localStorage.getItem("website")!=null) {
  website=JSON.parse(localStorage.getItem("website"));
  Display();
}
function getvalues() {
  if (checkInputEmpty()) {
    return;
  }
  var bookMark = {
    WebsiteName: websiteNameInput.value.trim(),
    WebsiteUrl: websiteUrlInput.value.trim()
  };
  website.push(bookMark);
  localStorage.setItem("website", JSON.stringify(website));
  clearValues();
  Display();
}
function clearValues(){
  websiteNameInput.value="";
  websiteUrlInput.value="";
}
function Display(){
  var container="";
  for (let i = 0; i < website.length; i++) {
    container+=`
      <tr>
        <td>${i+1}</td>
        <td>${website[i].WebsiteName}</td>
        <td><button class="btn btn-warning" onclick="visitSite(${i})"><i class="fa-solid fa-eye"></i> Visit</button></td>
        <td><button class="btn btn-danger" onclick="deleteSite(${i})"><i class="fa-solid fa-trash"></i> Delete</button></td>
      </tr>`;
  }
  document.getElementById("demo").innerHTML=container;
}
function deleteSite(index){
  website.splice(index,1);
  localStorage.setItem("website",JSON.stringify(website));
  Display();
}
function checkInputEmpty() {
  const name = websiteNameInput.value.trim();
  const url = websiteUrlInput.value.trim();  
  const urlPattern = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-]*)*$/i; // chat gpt السطر ده جبته من 
  if (!name && !url) {
    alert("Please fill out the Website Name and URL.");
    return true; 
  }
  if (!urlPattern.test(url)) {
    alert("Please enter a valid URL");
    return true;
  }
  return false;
}
function visitSite(index) {
  const url = website[index].WebsiteUrl;
  window.open(url, '_blank');
}
