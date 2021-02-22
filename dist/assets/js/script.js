"use strict";var isSmartPhone,scrollFadeinContents,breakPoint="768";function init(){getScrollButton(),switchTab(),getDeviceWidth(),setAccordion(),getFadeinElement()}function getDeviceWidth(){isSmartPhone=!(!window.matchMedia||!window.matchMedia("(max-device-width:"+breakPoint+"px)").matches)}function getScrollButton(){for(var n=document.querySelectorAll('a[href^="#"]'),t=0;t<n.length;t++)!function(e){n[e].addEventListener("click",function(t){t.preventDefault();t=n[e].getAttribute("href"),t=+(document.getElementById(t.replace("#","")).getBoundingClientRect().top+window.pageYOffset);window.scrollTo({top:t,behavior:"smooth"})})}(t)}function switchTab(){for(var o=document.querySelectorAll(".js-tab-button"),r=document.querySelectorAll(".js-tab-block"),t=0;t<o.length;t++)!function(i){o[i].addEventListener("click",function(){for(var t=0;t<o.length;t++)o[t].setAttribute("aria-selected",!1);o[i].setAttribute("aria-selected",!0);for(var e=0;e<r.length;e++)r[e].setAttribute("aria-hidden",!0);var n=o[i].getAttribute("aria-controls");document.getElementById(n).setAttribute("aria-hidden",!1)})}(t)}function setAccordion(){if(isSmartPhone)for(var r=document.querySelectorAll(".js-accordion"),t=0;t<r.length;t++)!function(t){var e=r[t].querySelector(".js-accordion-button"),n=r[t].querySelector(".js-accordion-panel"),i=e.getAttribute("id"),t=n.getAttribute("id"),o=n.clientHeight;e.setAttribute("aria-expanded",!1),e.setAttribute("aria-controls",t),n.setAttribute("aria-hidden",!0),n.setAttribute("aria-labelledby",i),window.addEventListener("resize",function(){o=n.clientHeight}),e.addEventListener("click",function(){var t=e.getAttribute("aria-expanded");"true"===t?(e.setAttribute("aria-expanded",!1),n.setAttribute("aria-hidden",!0),n.style.maxHeight=0):"false"===t&&(e.setAttribute("aria-expanded",!0),n.setAttribute("aria-hidden",!1),n.style.maxHeight="".concat(o,"px"))})}(t)}function deleteLoadingContent(){document.getElementById("js-loading").classList.add("is-deleted")}function getFadeinElement(){scrollFadeinContents=document.querySelectorAll(".js-scroll-fadein")}function addAnimationFunction(t){var e=window.pageYOffset+window.innerHeight/1.5;t.offsetTop<e&&t.classList.add("is-show")}init(),window.addEventListener("resize",function(){getDeviceWidth()}),window.addEventListener("scroll",function(){for(var t=0;t<scrollFadeinContents.length;t++)addAnimationFunction(scrollFadeinContents[t])}),window.addEventListener("load",function(){deleteLoadingContent()});