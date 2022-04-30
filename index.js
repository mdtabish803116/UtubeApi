
var utubeAPIKey = "AIzaSyCPjIznLydCZoKW_vpJS8VUVXvAb9Rc-nk";


document.getElementById("searchIcon").addEventListener("click",  () =>{ 
    var inputVal = document.getElementById("searchBox").value;

var myResponse = fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&key=${utubeAPIKey}&q=${inputVal}`)
  myResponse.then((result) => {
      result.json().then((data) => {
           var utubeData = data;
           console.log(utubeData)
           displayData(utubeData);
      })
  }).catch((err) =>{
      console.log(err);
  })

});


function displayData(data){
    document.getElementById("thumbContainer").innerHTML = "";
    data.items.forEach((each) => {
       var thumbBox = document.createElement('div');
          var imgDiv = document.createElement('div');
           var img = document.createElement('img');
             img.src = each.snippet.thumbnails.medium.url;
            imgDiv.append(img);
        var paraDiv = document.createElement('div');
          paraDiv.textContent = each.snippet.description;
          thumbBox.append(imgDiv ,paraDiv );
          thumbBox.addEventListener( "click", () => {
            localStorage.setItem("movieId" , each.id.videoId);
            window.location.href = "./video.html"
          })
    document.getElementById("thumbContainer").append(thumbBox);

    })
}





function displayVideo(data){
  document.getElementById("videoContainer").innerHTML = "";
  data.items.forEach((video) => {
    var movieId = video.id;
    var videoBox = document.createElement("div");
    videoBox.innerHTML =  `<iframe width="300" height="200" src="https://www.youtube.com/embed/${movieId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    document.getElementById("videoContainer").append(videoBox);
  })

}


 function getData(){ 
  var myResponse =  fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=30&key=${utubeAPIKey}`)
  myResponse.then((result) => {
    result.json().then((data) => {
         var utubeData = data;
         console.log(utubeData)
   displayVideo(utubeData)
  })
}).catch((error) =>{
    console.log(error);
})

}

getData();

