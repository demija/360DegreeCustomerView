import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

    constructor() { }

    validateRegister(user) {
        if(user.ime_prezime == undefined || user.email == undefined || user.korisnicko_ime == undefined || user.lozinka == undefined) {
            return false;
        } else {
            return true;
        }
    }

    //TODO
    // validirati format email adrese, dodati ponavljanje šifre

}
