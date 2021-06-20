<template>
  <footer>
      <div class="about_us_footer-container">
          <div class="basics_footer">
            <router-link :to="{name: 'Index'}">
                <div class="logo">
                    <p class="">Bobo</p>
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path></svg>
                </div>
            </router-link>
            <p class="logo_moto">Enriching your life with modern tech!</p>
            <ul>
                <li>BoboSystemsTech Ltd.</li>
                <li>Here goes our Adress</li>
                <li>And here goes more of our address</li>
            </ul>
          </div>
          <div class="links_footer">
              <h5>Info</h5>
              <ul>
                  <li>About Us</li>
                  <li>All about the shopping</li>
                  <li>Payment</li>
              </ul>
          </div>
          <div class="contact_footer">
              <h5>Contact Us</h5>
              <h6>Our Office</h6>
              <ul>
                  <li>111 / 123 123; <em>ourOffice-email</em></li>
                  <li>Working hours: monday-friday: 09-17h</li>
              </ul>
              <h6>Our Shop</h6>
              <ul>
                  <li>222 / 456 456: <em>ourShop-email</em></li>
                  <li>Working hours: monday-friday: 09-17h</li>
                  <li>Saturday: 09-15h</li>
              </ul>
              <h6>Maintenance</h6>
              <ul>
                  <li>333 / 789 789: <em>ourMaintenance-email</em></li>
                  <li>Working hours: monday-friday: 09-17h</li>
              </ul>
          </div>
          <div class="socials_footer">
              <h5>Our Socials</h5>
              <ul>
                  <a href=""><li>Facebook</li></a>
                  <a href=""><li>Instagram</li></a>
              </ul>
          </div>
      </div>
      <div class="info_footer">
            <p>The prices showed on the website serve the informational purpose. Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda harum asperiores alias? Omnis esse modi similique ducimus repellat accusamus ratione ipsa officiis quam nihil, reprehenderit optio, voluptates error eos asperiores?</p>
            <p>Copyright information. Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, eum eligendi facere id commodi illum exercitationem non repellat soluta nesciunt!</p>
      </div>
  </footer>
</template>

<script>
export default {

}
</script>

<style>
footer {
    background: #bfdcfd;
    color: hsl(210, 13%, 25%);
    padding: 50px 17% 25px 17%;
    margin-top: 40px;
}
.socials_footer a {
    text-decoration: none;
    color: rgb(121, 46, 16);
}
.about_us_footer-container {
    display: flex;
    justify-content: space-between;
}

.logo_moto {
    color: hsl(210, 13%, 25%);
    font-weight: 600;
    margin-left: 10px;
    margin-top: 10px;
    margin-bottom: 40px;
}
footer ul {
    list-style: none;
    margin: 5px 0;
}
footer li {
    margin: 7px 0;
}
footer h5 {
    color: black;
    font-size: 1.2rem;
    margin-bottom: 20px;
}
footer h6 {
    font-weight: 600;
    font-size: .9rem;
    margin-bottom: 10px;
}
footer h6 + ul {
    margin: 10px 0 20px 0;
}

.info_footer {
    margin-top: 40px;
    text-align: center;
}


@media only screen and (max-width: 1280px) {
    footer {
        padding: 50px 5% 25px 5%;
    }
}
@media only screen and (max-width: 1024px) {
    footer h5 {
        font-size: 1rem;
    }
    footer h6 {
        font-size: 0.75rem;
    }
    footer li {
        font-size: 0.85rem;
    }
    .logo_moto {
        font-size: 0.85rem;
        margin-top: 0;
    }
    .info_footer p {
        font-size: 0.85rem;
    }
}
@media only screen and (max-width: 500px) {
    .about_us_footer-container {
        display: grid;
        grid-template-rows: auto auto;
        grid-template-columns: 1fr 1fr 1fr;
    }
    .basics_footer {
        grid-row: 1 / 2;
        grid-column: 1 / 4;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto;
        justify-content: center;
        align-items: start;
        width: 100%;
        margin-bottom: 10px;
    }
    .basics_footer a, .basics_footer .logo_moto {
        grid-column: 1 / 2;
        grid-row: 1 / 2;
    }
    .basics_footer ul {
        grid-column: 2 / 3;
        grid-row: 1 / 2;
        text-align: center;
    }
    .links_footer, .contact_footer, .socials_footer {
        grid-row: 2 / 3;
        text-align: center;
    }
    footer h5 {
        font-size: 0.7rem;
    }
    footer h6 {
        font-size: 0.6rem;
    }
    footer li {
        font-size: 0.7rem;
    }
    .logo_moto {
        font-size: 0.7rem;
        margin-top: 38px;
        margin-bottom: 0;
    }
    .info_footer p {
        font-size: 0.7rem;
    }
    footer li {
        margin: 3px 0;
    }
    footer h6 + ul {
        margin: 5px 0 10px 0;
    }
    footer h5 {
        margin-bottom: 10px;
    }
}
</style>