import { Injectable } from '@angular/core'
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js'
import { environment } from '../../environments/environment'
import { SignUpCredentials, LoginCredentials } from '../login-component/models/auth.model'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient
  _session: AuthSession | null = null

  private _session$ = new BehaviorSubject<Session | null | undefined>(undefined);

  //Observable for other components to subscribe to session changes
  public session$: Observable<Session | null | undefined> = this._session$.asObservable();

  test: string = "Hello Supabase Service";

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

    this.supabase.auth.onAuthStateChange((event, session) => {
      this._session$.next(session);
    });
  }

  // get session() {
  //   this.supabase.auth.getSession().then(({ data }) => {
  //     this._session = data.session
  //   })
  //   return this._session
  // }

  // public async getSession(){
  //   const {data} = await this.supabase.auth.getSession();
  //   this._session = data.session;
  //   return this._session;
  // }

  profile(user: User) {
    return this.supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single()
  }

  // authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
  //   return this.supabase.auth.onAuthStateChange(callback)
  // }

  // async signIn(LoginCredentials: LoginCredentials) {
  //   const userExists = await this.supabase.from('login_table').select('username, email').eq('username', LoginCredentials.userNameorEmail).or(email.eq.LoginCredentials.userNameorEmail);

  //   if(userExists != null){
  //     console.log("User exists, proceeding to sign in.");
  //   } else {
  //     console.log("User does not exist.");
  //   }  
  // }

  signUp(credentials: SignUpCredentials) {
    return this.supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        data:{
          userName: credentials.userName
        }
      }
    });
  }

  signIn(credentials: LoginCredentials) {
    return this.supabase.auth.signInWithPassword({
      email: credentials.userNameorEmail,
      password: credentials.password,
    });
  }

  signOut() {
    return this.supabase.auth.signOut()
  }

  // updateProfile(profile: Profile) {
  //   const update = {
  //     ...profile,
  //     updated_at: new Date(),
  //   }

  //   return this.supabase.from('profiles').upsert(update)
  // }

  // downLoadImage(path: string) {
  //   return this.supabase.storage.from('avatars').download(path)
  // }

  // uploadAvatar(filePath: string, file: File) {
  //   return this.supabase.storage.from('avatars').upload(filePath, file)
  // }
}