/* empty css                      */import{i,S as h,a as L}from"./assets/vendor-Be8boZEL.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))u(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&u(c)}).observe(document,{childList:!0,subtree:!0});function t(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function u(e){if(e.ep)return;e.ep=!0;const s=t(e);fetch(e.href,s)}})();const v="47185863-23d7cbe33afa61790ac726fc1",b="https://pixabay.com/api/",S=document.querySelector("#search-form"),p=document.querySelector("#gallery"),$=document.querySelector("#search-input"),y=document.querySelector("#loading"),a=document.querySelector("#load-more-container"),w=document.querySelector("#load-more"),l=document.querySelector("#end-message");let n=1,m="",d=0,f=null;document.addEventListener("DOMContentLoaded",()=>{a.style.display="none",l.style.display="none",S.addEventListener("submit",async o=>{o.preventDefault();const r=$.value.trim();if(!r){i.error({title:"Error",message:"Please enter a search term"});return}n=1,m=r,p.innerHTML="",a.style.display="none",l.style.display="none",await g()}),w.addEventListener("click",async()=>{n+=1,await g()}),f=new h(".gallery a",{captionsData:"alt",captionDelay:250,nav:!0,loop:!0})});async function g(){y.style.display="flex";try{const o=`${b}?key=${v}&q=${m}&image_type=photo&orientation=horizontal&safesearch=true&page=${n}&per_page=40`,t=(await L.get(o)).data;if(t.hits.length===0){i.error({title:"Error",message:"No images found, please try again."}),a.style.display="none",l.style.display="none";return}d=t.totalHits,q(t.hits),O(),n===1&&i.success({title:"Success",message:`Found ${d} images!`}),f.refresh(),n>1&&E()}catch{i.error({title:"Error",message:"Failed to fetch images, please try again."})}finally{y.style.display="none"}}function q(o){const r=o.map(t=>`
    <div class="image-card">
      <a href="${t.largeImageURL}" data-lightbox="gallery">
        <img src="${t.webformatURL}" alt="${t.tags}" loading="lazy" />
      </a>
      <div class="image-info">
        <p class="tags">${t.tags}</p>
        <p><strong>Likes:</strong> ${t.likes}</p>
        <p><strong>Views:</strong> ${t.views}</p>
        <p><strong>Comments:</strong> ${t.comments}</p>
        <p><strong>Downloads:</strong> ${t.downloads}</p>
      </div>
    </div>
  `).join("");p.insertAdjacentHTML("beforeend",r)}function E(){const o=document.querySelector(".image-card");if(o){const{height:r}=o.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}}function O(){n*40>=d?(a.style.display="none",l.style.display="block"):(a.style.display="flex",l.style.display="none")}
//# sourceMappingURL=index.js.map