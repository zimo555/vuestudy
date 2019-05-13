<template>
    <div>
        <cmtbox :id="$route.params.id"></cmtbox>
    </div>


</template>
<script>
import cmtbox from './commen.vue'
export default {
    data(){

    },
    components:{
        cmtbox
    }
}
</script>
<style lang="scss" scoped>

</style>
