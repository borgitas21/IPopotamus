<template>
  <div class="login">
    <section class="section login-banner">
      <h1 class="title is-3">Welcome to IPopotamus</h1>
      <h2 class="title is-4">It enables you to organize, manage and monitoring networks easily and effortless.</h2>
    </section>
    <section class="section login-form">
      <div class="container is-fluid">
        <form class="is-clearfix" v-on:submit.prevent="signIn">
          <div class="field">
            <div class="control">
              <input class="input" type="email" v-model="user.email" placeholder="bob@example.com">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input class="input" type="password" v-model="user.password" placeholder="Password">
            </div>
          </div>
          <div class="field" v-if="hasError">
            <div class="control">
              <p class="help is-danger">Wrong email or password!</p>
            </div>
          </div>
          <div class="control">
            <button class="button is-dark is-pulled-right" type="submit">Log In</button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
  import firebase from 'firebase';

  export default {
    name: 'login',
    data: function() {
      return {
        user: {
          email: '',
          password: '',
        },
        hasError: false
      };
    },
    methods: {
      signIn: function() {        
        firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password).then(
          () => {
            this.$router.push({ path: 'home' });
          }, () => {
            this.user = {
              email: '',
              password: ''
            };

            this.hasError = true;
          }
        );
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">

  @import "../../node_modules/bulma/sass/utilities/mixins" 

  .login-banner,
  .login-form,
  .login
    height: 100%

  .login-banner
    display: none
    background-color: #FDEC9B
  
  .login-form__profile-image
    margin: 2rem auto 5rem auto

  +desktop
    .login-banner,
    .login-form
      display: block
      float: left

    .login-banner
      width: 65%
    
    .login-form
      width: 35%

</style>
