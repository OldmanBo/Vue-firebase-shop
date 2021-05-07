<template>
  <div class="blog_page">
      <div class="blog_card" v-for="blog in blogs" :key="blog.title">
          <img class="blog_card_img" :src="'/static/blog_img_' + blog.img + '.png'" alt="">
          <div class="blog_card_info">
              <router-link :to="{ name: 'BlogDetails', params: { blogSlug: blog.slug } }"><h3 class="blog_card_title">{{ blog.title }}</h3></router-link>
              <p class="blog_card_text">{{ blog.text[0].slice(0, 120) }}...</p>
              <router-link :to="{ name: 'BlogDetails', params: { blogSlug: blog.slug } }"><p class="blog_card_link">Read more</p></router-link>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            blogs: []
        }
    },
    created() {
        this.blogs = this.$store.getters.sendBlogs
    }
}
</script>

<style>
    .blog_page {
        padding: 0 20%;
    }
    .blog_card {
        margin: 30px auto;
        display: flex;
        padding: 35px;
        box-shadow: 0 0 4px hsl(0, 0%, 80%);
        border-radius: 5px;
    }
    .blog_card_img {
        width: 25%;
        height: auto;
    }
    .blog_card_info {
        width: 75%;
        margin-left: 35px;
    }
    .blog_card_title {
        font-size: 2rem;
        font-weight: 600;
        border-bottom: 1px solid lightgrey;
        margin-bottom: 10px;
    }
    .blog_card_text {
        font-size: 1rem;
        color: hsl(240, 18%, 38%);
        margin-bottom: 15px;
    }
    .blog_card_link {
        display: inline-block;
        font-size: 1rem;
        padding: 8px;
        box-shadow: 3px 3px 4px hsl(0, 0%, 80%);
        cursor: pointer;
    }
    .blog_card a {
        text-decoration: none;
        color: black;
        transition: color 150ms;
    }
    .blog_card a:hover {
        color:orange
    }
</style>