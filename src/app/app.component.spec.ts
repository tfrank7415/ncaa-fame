import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService } from './services/auth/auth.service';
import { DebugElement, Component } from '@angular/core';
import { of } from 'rxjs';
import { by } from 'protractor';


describe('AppComponent', () => {
  // include the below three lines at top of describe so you don't have to initialize in each spec.
  // let component: AppComponent;
  // let fixture: ComponentFixture<AppComponent>;
  // let de: DebugElement;

  // needed when mocking a service via creating a stub.
  // let serviceStub: any;

  // needed when testing with live service and spy.
  // let service: AuthService;
  // let spy: jasmine.Spy;

  // let fixture: ComponentFixture<AppComponent>;
  // let de: DebugElement;
  beforeEach(async(() => {


    // This is how you instantiate your service for the test.
    // service = de.injector.get(AuthService);

    // mocking a serivice.  Configure the method to return what the service would return
    // for instance, getContent() could be login() or logout()
    // Below is when using a stub
    // serviceStub = {
    //   getContent: () => of('You have been warned'),
    // };
    // Below is when using the actual service
    // getContent will be the name of the function that you want to monitor
    // so for us it would be login or logout.
    // spy = spyOn(service, 'getContent').and.returnValue(of('Whatever you expect'));

    TestBed.configureTestingModule({
      // How to correctly add a service/stub to provider for testing
      // Below is example of stub.
      // providers: [ { provide: AuthService, useValue: serviceStub} ],
      // providers: [ { AuthService } ],
      imports: [
        RouterTestingModule,
        MatMenuModule,
        MatToolbarModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule
      ],
      declarations: [
        AppComponent
      ]
      // Compiles the components html and css
    }).compileComponents();
  }));

  // I am going to explain the different elements below.
  // Each test is refered to as a 'spec'
  it('should create the app', () => {
    // fixture is the test environment for this component
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    // rendered html.
    // const de = DebugElement;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ncaa-fame'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('ncaa-fame');
  });

  // See the stub above to make sense of the test.  I will need to model the test to my service
  // it('should return user login status from an observable', () => {
  //   component.content.subscribe(content => {
  //     expect(content).toBeDefined();
  //     expect(content).toBe('You have been warned');
  //   });
  // });

  // below is an example of how to toggle a button
  // You could replace hide content with a function name like logout or login
  // it('should toggle the button', () => {
  //   expect(component.hideContent).toBeTruthy();
  //   component.toggle();
  //   expect(component.hideContent).toBeFalsy();
  // });

  // below is an example of how to toggle a button async
  // You could replace hide content with a function name like logout or login
  // it('should toggle the button asynchronously', fakeAsync() => {
  //   expect(component.hideContent).toBeTruthy();
  //   component.toggleAsync();
  //   expect(component.hideContent).toBeFalsy();
  // });

  // below is an example of how to test a service from a component with spy
  // it('should call "put function name" one time and update the view', () => {
    // fixture is the test environment for this component
    // const fixture = TestBed.createComponent(AppComponent);
    // const app = fixture.debugElement.componentInstance;
    // rendered html.
    // const de = DebugElement;
    // Calls the spy and the method you set in the spy constructor
    // expect(spy).toHaveBeenCalled();

    // .calls.all tells how many times the spy is called.
    // expect(spy.calls.all.length).toEqual(1);

    // Below is how you look into an html element at the inner text.
    // expect(de.query(by.css('.message-body')).nativeElement.innerText)
    //   .toContain('warn');
  // });
});
