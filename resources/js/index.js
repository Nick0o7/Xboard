magazines = [
    "https://flipboard.com/@thenewsdesk/the-latest-on-coronavirus-covid-19-t82no8kmz.rss",
    "https://flipboard.com/@dfletcher/india-tech-b2meqpd6z.rss",
    "https://flipboard.com/@thehindu/sportstarlive-rj3ttinvz.rss"
  ]

  ///let apiUrl = fetch("https://api.rss2json.com/v1/api.json?rss_url="+magazines[1]).then((res)=> res.json()).catch((err)=>null);
  //apiUrl.then((user)=> console.log(user))  


  function createAccordianData(data,number){
    //   let accordionInnerHtml ="";
   // console.log(number);
    data = data.then((resource) =>{
    let newstitle = resource.feed.title;
    let item = resource.items;

    let accordianCard =  document.createElement('div');
    accordianCard.setAttribute('class','card');
    accordianContent = `<div class="card-header" id="accordian-${number}">
    <h5 class="mb-0">
      <button class="btn btn-link" data-toggle="collapse" data-target="#collapse${number}" aria-expanded="true" aria-controls="collapseOne">
      <span class="acordin-arrow${number}"><i class="arrow-icon fa fa-angle-down"></i><span>  ${newstitle}
      </button>
    </h5>
  </div>
  <div id="collapse${number}" class="collapse" aria-labelledby="accordian-${number}" data-parent="#accordion">
    <div class="card-body">


  <div id="carousel${number}" class="carousel slide" data-interval="false">

  

  <a class="carousel-control-prev" href="#carousel${number}" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  </a>
  <a class="carousel-control-next" href="#carousel${number}" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
  </a>
    </div>
    </div>`;
    accordianCard.innerHTML = accordianContent;
    document.getElementById('accordion').append(accordianCard);
// console.log(number)
    createcarousel(item,number);

    });
    // document.querySelector('.collapse').classList.add('active');


   // return data
  }

  function createcarousel(data,number){
    let carouselinnerContainer = document.createElement('div');
    carouselinnerContainer.setAttribute('class','carousel-inner');
    let carouselInnerElement ="";
    data.forEach(element => {
      let title = element.title;
      let author = element.author;
      let pubDate = element.pubDate;
      let link = element.link;
      let description = element.description;
      let image = element.enclosure.link;

      carouselInnerElement =  carouselInnerElement + `<div class="carousel-item">
          <a href="${link}"><img class="d-block w-100" src="${image}">
          <div class="content">
          <h5 class="heading">${title}</h5>
          <div class="credit">
          <div>${author}</div>
          <div class="middle-dot">.</div>
          <div>${new Date(pubDate).toLocaleString("en-IN")}</div>
          </div>
          <p class="para">${description}</p>
          </div></a>

        </div>`;

    });

    //console.log(carouselInnerElement);
    carouselinnerContainer.innerHTML = carouselInnerElement;
    let appendCarouselContainer = document.getElementById('carousel'+number);
    appendCarouselContainer.prepend(carouselinnerContainer);
    document.querySelector(`#carousel${number} .carousel-item`).classList.add('active');
    document.querySelector('.collapse').classList.add('show');


  }

  
//get magazine Data
let count = 0;
  magazines.forEach(element => {
    let data = fetch("https://api.rss2json.com/v1/api.json?rss_url="+element)
    .then((result)=>result.json())
    .catch((err)=>console.log("error while fetching the data"));
    createAccordianData(data,count);
    count ++;
  });