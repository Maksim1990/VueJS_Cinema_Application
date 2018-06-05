import './style.scss';
import Vue from 'vue';
import VueResource from 'vue-resource';
import moment from 'moment-timezone';

moment.tz.setDefault("UTC");



Object.defineProperty(Vue.prototype, '$moment', {
    get() {
        return this.$root.moment;
    }
});
import {checkFilter,setDay} from './util/bus';

const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', {
    get() {
        return this.$root.bus;
    }
});
import VueRouter from 'vue-router';


Vue.use(VueResource);
Vue.use(VueRouter);
import routes from './util/routes';
import tooltip from './util/tooltip';
Vue.use(tooltip);
const router=new VueRouter({
    routes
});

new Vue({
    el: "#app",
    data: {
        genre: [],
        time: [],
        movies: [],
        moment,
        bus,
        day: moment()
    },
    created() {
        this.$http.get('/api').then(response => {
            this.movies = response.data;
        });
        this.$bus.$on('check-filter', checkFilter.bind(this));
        this.$bus.$on('set-day', setDay.bind(this));
    },
    router

});


