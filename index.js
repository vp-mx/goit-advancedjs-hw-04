import{a as p,S as b,i as o}from"./assets/vendor-DSfy1icH.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))g(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const m of a.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&g(m)}).observe(document,{childList:!0,subtree:!0});function r(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function g(t){if(t.ep)return;t.ep=!0;const a=r(t);fetch(t.href,a)}})();const h=s=>s.reduce((e,r)=>e+`
            <li class="gallery-card">
              <a class="gallery-img-orig" href="${r.largeImageURL}">
                <img class="gallery-img" src="${r.webformatURL}" alt="${r.tags}" />
                <div class="img-data">
                 <div class="img-data-column img-likes">
                  <p class="img-title">Likes</p>
                  <p class="img-value">${r.likes}</p>
                 </div>
                 <div class="img-data-column img-views">
                  <p class="img-title">Views</p>
                  <p class="img-value">${r.views}</p>
                 </div>
                 <div class="img-data-column img-comments">
                  <p class="img-title">Comments</p>
                  <p class="img-value">${r.comments}</p>
                 </div>
                  <div class="img-data-column img-downloads">
                  <p class="img-title">Downloads</p>
                  <p class="img-value">${r.downloads}</p>
                 </div>
                </div>
              </a>
            </li>
           `,"");p.defaults.baseURL="https://pixabay.com";const f=(s,e)=>{const r={q:s,page:e,key:"50950053-db3558a1af50bab2399c0c009",image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15};return p.get("/api/",{params:r})},u=document.querySelector(".js-search-form"),n=document.querySelector(".js-gallery"),d=document.querySelector(".loader"),i=document.querySelector(".load-more-btn");let y=new b(".gallery-card a",{captionsData:"alt",captionDelay:250}),c=1,l="";const w=async s=>{try{if(s.preventDefault(),l=s.currentTarget.elements.user_query.value.trim(),l===""){o.error({message:"Search value should not be empty!",position:"topRight"});return}u.reset(),n.innerHTML="",i.classList.add("is-hidden"),d.classList.remove("is-hidden"),c=1;const e=await f(l,c);if(d.classList.add("is-hidden"),e.data.totalHits===0){o.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),n.innerHTML="",u.reset();return}e.data.totalHits>15&&(i.classList.remove("is-hidden"),i.addEventListener("click",v)),n.innerHTML=h(e.data.hits),L(),y.refresh()}catch{o.error({message:"An error occurred. Please try again later.",position:"topRight"})}};u.addEventListener("submit",w);const v=async s=>{try{i.classList.add("is-hidden"),d.classList.remove("is-hidden"),c++;const e=await f(l,c);d.classList.add("is-hidden"),i.classList.remove("is-hidden"),n.insertAdjacentHTML("beforeend",h(e.data.hits)),L(),y.refresh(),e.data.totalHits<=c*15&&(i.classList.add("is-hidden"),i.removeEventListener("click",v),o.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch{o.error({message:"An error occurred. Please try again later.",position:"topRight"})}};function L(){const s=document.querySelector(".gallery-card");if(!s)return;const r=s.getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
