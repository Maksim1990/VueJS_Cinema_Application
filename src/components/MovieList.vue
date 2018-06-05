<template>
    <div id="movie-list">
        <div v-if="filteredMovies.length">
            <movie-item v-for="movie in filteredMovies" :movie="movie.movie">
                <div class="movie-sessions">
                    <div
                            v-for="session of filteredSession(movie.sessions)"
                            class="session-time-wrapper tooltip-wrapper"
                            v-tooltip="{seats:session.seats}"
                    >
                        <div class="session-time">{{formatSessionTime(session.time)}}</div>
                    </div>
                </div>
            </movie-item>
        </div>
        <div v-else-if="movies.length" class="no-results">
            No result found by following genre filters: {{convertGenresToString}}
        </div>
        <div v-else class="no-results">
            Loading ...
        </div>


    </div>
</template>
<script>
    import genres from '../util/genres';
    import times from '../util/times';
    import MovieItem from '../components/MovieItem.vue';

    export default {
        props: ['genre', 'time', 'movies', 'day'],
        data: function () {
            return {};
        },
        components: {
            MovieItem
        },
        methods: {
            moviePassedGenreFilter(movie) {
                if (!this.genre.length) {
                    return true;
                } else {
                    let movieGenres = movie.movie.Genre.split(", ");
                    let matched = true;
                    this.genre.forEach(genre => {
                        if (movieGenres.indexOf(genre) === -1) {
                            matched = false;
                        }
                    });
                    return matched;
                }
            },
            sessionPassesTimeFilter(session) {
                if (!this.day.isSame(this.$moment(session.time), 'day')) {
                    return false;
                } else if (this.time.length == 0 || this.time.length == 2) {
                    return true;
                } else if (this.time[0] === times.AFTER_6PM) {
                    return this.$moment(session.time).hour() >= 18;
                }else{
                    return this.$moment(session.time).hour() < 18;
                }

            },
            formatSessionTime(time){
                return this.$moment(time).format('h:mm A');
            },
            filteredSession(sessions){
                return sessions.filter(this.sessionPassesTimeFilter)
            }
        },
        computed: {
            filteredMovies() {
                return this.movies
                    .filter(this.moviePassedGenreFilter)
                    .filter(movie => movie.sessions.find(this.sessionPassesTimeFilter));
            },
            convertGenresToString() {
                let strGenres;
                if (this.genre.length > 0) {
                    strGenres = this.genre.join(",");
                }
                if (strGenres && this.time.length > 0) {
                    strGenres +=","+ this.time.join(",");
                }else if(this.time.length > 0){
                    strGenres = this.time.join(",");
                }
                return strGenres;
            }
        },
        created() {
            console.log(this.$moment);
        }
    }
</script>