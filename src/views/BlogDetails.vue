<template>
  <div class="blog_details_page">
      <div class="blog_details" :class="{ blog_details_active: blog.slug == $route.params.blogSlug }" v-for="blog in blogs" :key="blog.title">
        <img class="blog_details_img" :src="'/static/blog_img_' + blog.img + '.png'" alt="">          
        <div class="blog_details_info">
            <h3 class="blog_card_title">{{ blog.title }}</h3>
            <p class="blog_card_text" v-for="(para, index) in blog.text" :key="index">{{ blog.text[index] }}</p>
            <br>
        </div>                     
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            blogs:[]
        }
    },
    created() {
        this.blogs = this.$store.getters.sendBlogs
    }
}
</script>

<style>
.blog_details_page {
    padding: 0 24%;
    margin-top: 50px;
}
.blog_details {
    display: none;
}
.blog_details.blog_details_active {
    display: flex;
}
.blog_details_img {
    width: 25%;
    height: auto;
    max-height: 150px;
    margin-right: 50px;
}
.blog_details_info {
    width: 75%;
}
</style>