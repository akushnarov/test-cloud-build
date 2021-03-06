/**
    Copyright 2022 Google LLC
    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at
        https://www.apache.org/licenses/LICENSE-2.0
    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
 */

import {Request, Response, Router} from 'express';
import * as AuthController from '../controllers/auth-controller';
import * as AccountController from '../controllers/account-controller';
import someController from '../controllers/some';
import pass from '../config/passport-setup';
import passport from 'passport';

// eslint-disable-next-line new-cap
const router = Router();

// Auth routes
router.get('/api/auth/login', AuthController.showLogin);
router.get(
    '/api/auth/google',
    passport.authenticate('google', {
        scope: ['email', 'profile'],
        failureRedirect: '/api/auth/login',
    })
);
router.get(
    '/api/auth/oauthcallback',
    passport.authenticate('google', {
        failureRedirect: '/api/auth/login',
        successRedirect: '/api/auth/done',
    })
);

router.get('/api/auth/done', AuthController.authDone);

// protected route
router.get('/api/account', pass.isAuthenticated, someController.hello);
router.get('/api/test', someController.hello);

// Account routes
router.get('/api/accounts', AccountController.listAccounts);
router.get('/api/accounts/:id', AccountController.get);
router.post('/api/accounts', AccountController.create);
router.post('/api/accounts/:id', AccountController.update);
router.delete('/api/accounts/:id', AccountController.remove);

// Default '/' route
router.get('/', (req: Request, res: Response) => {
    const name = process.env.NAME || 'World';
    res.send(`Hello ${name}! IFTTA`);
});

export default router;
