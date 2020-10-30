(()=>{"use strict";(()=>{const e=(e,t)=>Math.floor(e+Math.random()*(t+1-e));window.util={getRatio:(e,t,n)=>(t-e)*n/100+e,getRandomInteger:e,getRandomArrayItem:t=>t[e(0,t.length-1)],clearElement:(e,t)=>{const n=e.children;for(let o=n.length-1;o>=0;o--)t&&t.includes(n[o].tagName.toLowerCase(),0)||e.removeChild(n[o])},shuffle:e=>{for(let t=e.length-1;t>0;t--){let n=Math.floor(Math.random()*(t+1));[e[t],e[n]]=[e[n],e[t]]}return e},debounce:(e,t)=>{let n=null;return(...o)=>{n&&window.clearTimeout(n),n=window.setTimeout((()=>{e(...o)}),t)}}}})(),window.load=(e,t,n,o,i,r)=>{const l=new XMLHttpRequest;l.responseType="json",l.timeout=i,l.addEventListener("load",(()=>{200===l.status?n(l.response):o("Статус ответа: "+l.status+" "+l.statusText)})),l.addEventListener("error",(()=>{o("Произошла ошибка соединения")})),l.addEventListener("timeout",(()=>{o("Запрос не успел выполниться за "+l.timeout+"мс")})),l.open(t,e),r?l.send(r):l.send()},(()=>{const e=document.querySelector(".big-picture"),t=e.querySelector(".big-picture__img img"),n=e.querySelector(".big-picture__cancel"),o=e.querySelector(".social__caption"),i=e.querySelector(".likes-count"),r=e.querySelector(".social__comment-count"),l=e.querySelector(".social__comments"),s=e.querySelector(".social__comment"),a=e.querySelector(".comments-loader"),c=document.querySelector("body");r.innerHTML="<span></span>"+r.innerHTML.slice(1);const d=r.querySelector("span"),u=r.querySelector(".comments-count"),m=e=>{const t=s.cloneNode(!0),n=t.querySelector("img");return n.src=e.avatar,n.alt=e.name,t.querySelector(".social__text").textContent=e.message,t},g=()=>{const e=Array.from(l.querySelectorAll(".hidden")),t=e.length<=5?e.length:5;for(let n=0;n<t;n++)e[n].classList.remove("hidden");e.splice(0,t),e.length||(a.classList.add("hidden"),a.removeEventListener("click",g)),d.textContent=+d.textContent+t},p=e=>{"Escape"===e.key&&(e.preventDefault(),w())},w=()=>{e.classList.add("hidden"),c.classList.remove("modal-open"),document.removeEventListener("keydown",p),n.removeEventListener("click",w),a.removeEventListener("click",g)};window.fullSizePicture={renderFullSizePicture:e=>{t.src=e.url,i.textContent=e.likes,u.textContent=e.comments.length,o.textContent=e.description,window.util.clearElement(l),(e=>{let t=e.length;for(let n=0;n<e.length;n++){let o=m(e[n]);l.appendChild(o),n>4&&(o.classList.add("hidden"),t-=1)}d.textContent=t})(e.comments),e.comments.length>5?(a.classList.remove("hidden"),a.addEventListener("click",g)):a.classList.add("hidden")},openFullSizePicture:()=>{e.classList.remove("hidden"),c.classList.add("modal-open"),document.addEventListener("keydown",p),n.addEventListener("click",w)}}})(),(()=>{const e=document.querySelector(".pictures"),t=document.querySelector("#picture").content.querySelector(".picture"),n=e=>{const n=t.cloneNode(!0);return n.querySelector(".picture__img").src=e.url,n.querySelector(".picture__comments").textContent=e.comments.length,n.querySelector(".picture__likes").textContent=e.likes,n.addEventListener("click",(t=>{t.preventDefault(),window.fullSizePicture.renderFullSizePicture(e),window.fullSizePicture.openFullSizePicture()})),n};window.picturesRendering={renderPictures:t=>{const o=document.createDocumentFragment(),i=t.length<=25?t.length:25;for(let e=0;e<i;e++)o.appendChild(n(t[e]));e.appendChild(o)}}})(),(()=>{const e=document.querySelector(".img-filters"),t=e.querySelectorAll(".img-filters__button"),n=document.querySelector(".pictures");window.picturesFilters={activateFilters:o=>{e.classList.remove("img-filters--inactive"),e.addEventListener("click",(e=>window.util.debounce((o=>{let i=e;o.target.matches("#filter-random")&&(i=(e=>window.util.shuffle(e).slice(0,10))(e)),o.target.matches("#filter-discussed")&&(i=(e=>e.slice(0).sort(((e,t)=>{let n=t.comments.length-e.comments.length;return 0===n&&(n=1),n})))(e)),window.util.clearElement(n,["h2","section"]),window.picturesRendering.renderPictures(i),(e=>{for(let e=0;e<t.length;e++)t[e].classList.remove("img-filters__button--active");e.classList.add("img-filters__button--active")})(o.target)}),500))(o))}}})(),(()=>{const e=document.querySelector("body");window.pictures={loadPictures:e=>{window.picturesRendering.renderPictures(e),window.picturesFilters.activateFilters(e)},errorLoadPictures:t=>{const n=document.createElement("div"),o=document.createElement("img"),i=document.createElement("span");o.src="img/icon-warning.svg",o.style="width: 30px; height: 30px; margin-right: 20px; vertical-align: bottom;",i.textContent=t,n.style='position: absolute; top: 10px; right: 0; left: 0; padding: 10px; font-family: "Open Sans", "Arial", sans-serif; text-align: center; font-weight: 700; font-size: 20px; color: #ffe753; background-color: #3c3614; border-radius: 10px;',n.classList.add("container"),n.appendChild(o),n.appendChild(i),e.appendChild(n)}}})(),(()=>{const e=document.querySelector("body").querySelector("main"),t=document.querySelector("#success").content.querySelector(".success"),n=document.querySelector("#error").content.querySelector(".error");let o;const i=()=>{o.remove(),document.removeEventListener("keydown",r),document.removeEventListener("click",l)},r=e=>{"Escape"===e.key&&(e.preventDefault(),i())},l=e=>{e.target.matches(`.${status}__inner`)||(e.preventDefault(),i())};window.uploadFormStatusMessage={openStatusMessage:s=>{"success"===s?o=t.cloneNode(!0):"error"===s&&(o=n.cloneNode(!0)),document.addEventListener("keydown",r),document.addEventListener("click",l),o.querySelector(`.${s}__button`).addEventListener("click",i),e.appendChild(o)}}})(),(()=>{const e={chrome:{minValue:0,maxValue:1,getLevel(e){return`grayscale(${window.util.getRatio(this.minValue,this.maxValue,e)})`}},sepia:{minValue:0,maxValue:1,getLevel(e){return`sepia(${window.util.getRatio(this.minValue,this.maxValue,e)})`}},marvin:{minValue:0,maxValue:1,getLevel(e){return`invert(${window.util.getRatio(this.minValue,this.maxValue,e)})`}},phobos:{minValue:0,maxValue:3,getLevel(e){return`blur(${window.util.getRatio(this.minValue,this.maxValue,e)}px)`}},heat:{minValue:1,maxValue:3,getLevel(e){return`brightness(${window.util.getRatio(this.minValue,this.maxValue,e)})`}}},t=document.querySelector(".img-upload__overlay"),n=t.querySelector(".img-upload__preview img"),o=t.querySelector(".effect-level"),i=o.querySelector(".effect-level__value"),r=o.querySelector(".effect-level__line"),l=r.querySelector(".effect-level__depth"),s=r.querySelector(".effect-level__pin"),a=t.querySelector(".scale__control--value");let c,d,u;const m=()=>{o.classList.add("hidden"),s.style.left="100%",l.style.width="100%",n.classList.remove(u),n.style.filter="",i.setAttribute("value",100)},g=t=>{n.style.filter=e[d].getLevel(t),s.style.left=t+"%",l.style.width=t+"%",i.setAttribute("value",t)};window.uploadFormImageSettings={onPlusScaleButtonClick:()=>{c<100&&(c+=25,a.setAttribute("value",c+"%"),n.style.transform=`scale(${c/100})`)},onMinusScaleButtonClick:()=>{c>25&&(c-=25,a.setAttribute("value",c+"%"),n.style.transform=`scale(${c/100})`)},getDefaultScaleSettings:()=>{c=100,a.setAttribute("value",c+"%"),n.style.transform=`scale(${c/100})`},getDefaultEffectSettings:m,onEffectChange:t=>{t.target.matches('input[type="radio"]')&&(m(),"none"!==t.target.value&&(d=t.target.value,u="effects__preview--"+d,n.classList.add(u),n.style.filter=e[d].getLevel(100),o.classList.remove("hidden")))},onEffectPinMouseDown:()=>{const e=e=>{const t=(e.clientX-r.getBoundingClientRect().left)/r.offsetWidth*100;g(t>100?100:t<0?0:t)},t=()=>{document.removeEventListener("mousemove",e),document.removeEventListener("mouseup",t)};document.addEventListener("mousemove",e),document.addEventListener("mouseup",t)},onEffectRangeClick:e=>{const t=(e.clientX-r.getBoundingClientRect().left)/r.offsetWidth*100;g(t)},onEffectPinKeydown:e=>{const t=+s.style.left.slice(0,-1);"ArrowLeft"===e.key?t>=1?g(t-1):t>0&&t<1&&g(0):"ArrowRight"===e.key&&(t<=99?g(t+1):t<100&&t>99&&g(100))}}})(),(()=>{const e=document.querySelector(".img-upload__overlay"),t=e.querySelector(".text__hashtags"),n=e.querySelector(".text__description"),o=/^#[a-zA-Zа-яА-Я0-9]*$/;window.uploadFormValidity={onHashtagInputInput:()=>{if(t.value){const e=t.value.toLowerCase().split(" ");for(let t=0;t<e.length;t++)""===e[t]&&e.splice(t,1);if(e.length>5)t.setCustomValidity("Нельзя указать больше 5 хэштегов");else for(let n=0;n<e.length;n++){if(e.includes(e[n],n+1)){t.setCustomValidity("Один и тот же хэштег не может быть использован дважды");break}if(e[n].length>20){t.setCustomValidity("Длина хэштега не должна превышать 20 симв.");break}if("#"!==e[n][0]){t.setCustomValidity("Хэштег должен начинаеться с символа решётки");break}if(1===e[n].length){t.setCustomValidity("Хэштег не должен состоять только из одной решётки");break}if(!o.test(e[n])){t.setCustomValidity("Хэштег не должен содержать специальных символов");break}t.setCustomValidity("")}}else t.setCustomValidity("");t.reportValidity(),""!==t.validationMessage?t.style.boxShadow="0 0 0 2px #ff4e4e":t.style.boxShadow="none"},onCommentInputInput:()=>{const e=n.value.length;e>140?n.setCustomValidity(`Удалите лишние ${e-140} симв.`):n.setCustomValidity(""),n.reportValidity(),""!==n.validationMessage?n.style.boxShadow="0 0 0 2px #ff4e4e":n.style.boxShadow="none"}}})(),(()=>{const e=["gif","jpg","jpeg","png"],t=document.querySelector(".img-upload__form"),n=t.querySelector(".img-upload__overlay"),o=t.querySelector(".img-upload__input"),i=n.querySelector(".img-upload__cancel"),r=n.querySelector(".img-upload__preview img"),l=n.querySelectorAll(".effects__preview"),s=n.querySelector(".effect-level").querySelector(".effect-level__line"),a=s.querySelector(".effect-level__pin"),c=t.querySelector(".scale__control--bigger"),d=t.querySelector(".scale__control--smaller"),u=t.querySelector(".text__hashtags"),m=t.querySelector(".text__description"),g=document.querySelector("body"),p=e=>{"Escape"===e.key&&document.activeElement!==u&&document.activeElement!==m&&(e.preventDefault(),y())},w=e=>{e.preventDefault(),window.load("https://21.javascript.pages.academy/kekstagram","POST",v,f,1e4,new FormData(t))},v=()=>{window.uploadFormStatusMessage.openStatusMessage("success"),y()},f=()=>{window.uploadFormStatusMessage.openStatusMessage("error"),y()},y=()=>{n.classList.add("hidden"),g.classList.remove("modal-open"),t.reset(),u.style.boxShadow="none",m.style.boxShadow="none",window.uploadFormImageSettings.getDefaultEffectSettings(),window.uploadFormImageSettings.getDefaultScaleSettings(),document.removeEventListener("keydown",p),i.removeEventListener("click",y),t.removeEventListener("change",window.uploadFormImageSettings.onEffectChange),s.removeEventListener("click",window.uploadFormImageSettings.onEffectRangeClick),a.removeEventListener("mousedown",window.uploadFormImageSettings.onEffectPinMouseDown),a.removeEventListener("keydown",window.uploadFormImageSettings.onEffectPinKeydown),c.removeEventListener("click",window.uploadFormImageSettings.onPlusScaleButtonClick),d.removeEventListener("click",window.uploadFormImageSettings.onMinusScaleButtonClick),u.removeEventListener("input",window.uploadFormValidity.onHashtagInputInput),m.removeEventListener("input",window.uploadFormValidity.onCommentInputInput),t.removeEventListener("submit",w)};window.uploadForm={renderUploadPopup:()=>{const t=o.files[0],n=t.name.toLowerCase();if(e.some((e=>n.endsWith(e)))){const e=URL.createObjectURL(t);r.src=e;for(let t=0;t<l.length;t++)l[t].style.backgroundImage=`url(${e})`}},openUploadPopup:()=>{n.classList.remove("hidden"),g.classList.add("modal-open"),document.addEventListener("keydown",p),i.addEventListener("click",y),t.addEventListener("change",window.uploadFormImageSettings.onEffectChange),s.addEventListener("click",window.uploadFormImageSettings.onEffectRangeClick),a.addEventListener("mousedown",window.uploadFormImageSettings.onEffectPinMouseDown),a.addEventListener("keydown",window.uploadFormImageSettings.onEffectPinKeydown),c.addEventListener("click",window.uploadFormImageSettings.onPlusScaleButtonClick),d.addEventListener("click",window.uploadFormImageSettings.onMinusScaleButtonClick),u.addEventListener("input",window.uploadFormValidity.onHashtagInputInput),m.addEventListener("input",window.uploadFormValidity.onCommentInputInput),t.addEventListener("submit",w)}}})(),(()=>{window.load("https://21.javascript.pages.academy/kekstagram/data","GET",window.pictures.loadPictures,window.pictures.errorLoadPictures,1e4);const e=document.querySelector(".img-upload__input");window.uploadFormImageSettings.getDefaultEffectSettings(),window.uploadFormImageSettings.getDefaultScaleSettings(),e.addEventListener("change",(()=>{window.uploadForm.renderUploadPopup(),window.uploadForm.openUploadPopup()}))})()})();