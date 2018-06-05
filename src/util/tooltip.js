import {addClass, removeClass } from './helpers';

let mouseOnHandler=function(event){
    let span=event.target.parentNode.getElementsByTagName('span')[0];
    addClass(span,'tooltip-show');
};
let mouseOotHandler=function(event){
    let span=event.target.parentNode.getElementsByTagName('span')[0];
    removeClass(span,'tooltip-show');
};

export default {
    install(Vue){
        Vue.directive('tooltip',{
            bind(el,bindings){
                let span=document.createElement('span');
                let text=document.createTextNode(`Seats available:${bindings.value.seats}`);
                span.appendChild(text);
                addClass(span,'tooltip');
                el.appendChild(span);
                let div=el.getElementsByTagName('div')[0];
                div.addEventListener('mouseover',mouseOnHandler);
                div.addEventListener('mouseout',mouseOotHandler);
                div.addEventListener('touchstart',mouseOnHandler);
                div.addEventListener('touchend',mouseOotHandler);
            },
            unbind(el){
                let div=el.getElementsByTagName('div')[0];
                div.removeEventListener('mouseover',mouseOnHandler);
                div.removeEventListener('mouseout',mouseOotHandler);
                div.removeEventListener('touchstart',mouseOnHandler);
                div.removeEventListener('touchend',mouseOotHandler);
            }
        });
    }
}