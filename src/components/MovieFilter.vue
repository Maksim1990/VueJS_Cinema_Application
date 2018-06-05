<template>
    <div id="movie-filter">
        <h2>Filter Results</h2>
        <h3>By time of day</h3>
        <div class="filter-group">
            <check-filter v-for="time of times" type="time" :title="time" ></check-filter>
        </div>
        <h3>By genre</h3>
        <div class="filter-group">
            <check-filter v-for="genre of genres" type="genre" :title="genre" ></check-filter>
        </div>

    </div>
</template>

<script>
    import genres from '../util/genres';
    import times from '../util/times';
    import CheckFilter from '../components/CheckFilter.vue';
    export default {
        data() {
            return {
                genres,
                times
            }
        },
        components: {
            CheckFilter
        }
    }
</script>

<style scoped>

</style>