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

  profile(user: User) {
    return this.supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single()
  }

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
}