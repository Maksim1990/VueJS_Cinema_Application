<template>
    <div class="check-filter " :class="{active:checked}" @click="checkFilter">
        <span class="checkbox"></span>
        <span class="check-filter-title">{{title}}</span>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                checked: false
            }
        },
        props: ['title','type'],
        methods: {
            checkFilter() {
                this.checked = !this.checked;
                this.$bus.$emit('check-filter', this.type, this.title, this.checked);
            }
        }
    }
</script>

<style scoped>

</style>