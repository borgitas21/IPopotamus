import Vue from 'vue';
import Login from '@/components/Login';
import firebase from 'firebase';

import router from '@/router/index';

describe('Login.vue', () => {
  beforeEach(() => {
    spyOn(router, 'push').and.callThrough();
    spyOn(firebase, 'auth').and.callFake(() => {
      return {
        signInWithEmailAndPassword: (user, password) => {
          return new Promise((resolve, reject) => {
            return (user === 'alice@example.com' && password === 'secret') ? 
              resolve() : reject();
          });
        }
      };
    });
  });

  // Evaluate the results of functions in
  // the raw component options
  it('sets the correct default data', () => {
    const Constructor = Vue.extend(Login);
    const LoginComponent = new Constructor().$mount();
    
    // set value of new item
    expect(LoginComponent.user.password).toBe('');
    expect(LoginComponent.user.email).toBe('');
    expect(LoginComponent.hasError).toBeFalsy();
  });

  describe('signIn', () => {

    describe('onSuccess', () => {
      it('redirects to home page', (done) => {
        const Constructor = Vue.extend(Login);
        const LoginComponent = new Constructor({
          router: router
        }).$mount();

        LoginComponent.user.email = 'alice@example.com';
        LoginComponent.user.password = 'secret';
        
        LoginComponent.signIn();

        setTimeout(() => {
          expect(router.push).toHaveBeenCalledWith({ path: 'home' });
          done();
        });
      });
    });

    describe('onError', () => {
      it('resets data ', (done) => {
        const Constructor = Vue.extend(Login);
        const LoginComponent = new Constructor().$mount();

        LoginComponent.user.email = 'alice@example.com';
        LoginComponent.user.password = 'wrongPassword';
        
        LoginComponent.signIn();

        setTimeout(() => {
          expect(LoginComponent.user.password).toBe('');
          expect(LoginComponent.user.email).toBe('');
          done();
        });
      });

      it('shows error message', (done) => {
        const Constructor = Vue.extend(Login);
        const LoginComponent = new Constructor().$mount();
        
        LoginComponent.signIn();

        setTimeout(() => {
          expect(LoginComponent.hasError).toBeTruthy();
          done();
        });
      });
    });
  });  
});
