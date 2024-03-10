import { Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
 const _Router=Inject(Router)

  if (localStorage.getItem('eToken')!=null) {
    return true;
  }
  else{
    _Router.navigate(['./login'])
    return false;
  }

};
